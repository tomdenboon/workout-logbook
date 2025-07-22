import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from 'react';
import { TextInput, View } from 'react-native';
import WlbInput from 'components/WlbInput';
import { keyboardEmitter, useKeyboardEvent } from 'context/keyboard';
import { useUnit } from 'context/unit';
import { ExerciseField } from 'db/types';
import { formatTime } from 'hooks/useTimer';

interface ExerciseRowFieldProps {
  field: ExerciseField;
  error: boolean;
  value: number | null;
  exerciseGroupIndex: number;
  exerciseRowIndex: number;
  fieldIndex: number;
  isLastRow: boolean;
  isLastGroup: boolean;
  isLastField: boolean;
  saveExerciseRow: ({
    isLifted,
    validate,
    exerciseRowValues,
  }: {
    isLifted?: boolean;
    validate?: boolean;
    exerciseRowValues?: Record<string, number | null>;
  }) => void;
}

const generateId = (...numbers: number[]) => {
  return numbers.join('-');
};

function ExerciseRowField({
  field,
  error,
  value,
  exerciseGroupIndex,
  exerciseRowIndex,
  fieldIndex,
  isLastRow,
  isLastGroup,
  isLastField,
  saveExerciseRow,
}: ExerciseRowFieldProps) {
  const currentId = useMemo(
    () => generateId(exerciseGroupIndex, exerciseRowIndex, fieldIndex),
    [exerciseGroupIndex, exerciseRowIndex, fieldIndex],
  );

  const { convertToDisplayUnit, convertToStorageUnit } = useUnit();
  const toInputFormat = (value: number | null) => {
    if (value === null) {
      return '';
    } else if (field === 'time') {
      return formatTime(value, 'digital');
    }

    return parseFloat(convertToDisplayUnit(value, field).toFixed(2)).toString();
  };
  const toStorageValue = (value: string) => {
    if (value === '') {
      return null;
    }

    if (field === 'time') {
      return value
        .split(':')
        .reverse()
        .reduce((acc, part, i) => {
          const multiplier = [1, 60, 3600][i] * 1000;
          return acc + parseInt(part, 10) * multiplier;
        }, 0);
    }

    return convertToStorageUnit(parseFloat(value), field);
  };

  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [selection, setSelection] = useState({
    start: 0,
    end: 0,
  });
  const [inputValue, setInputValue] = useState(toInputFormat(value));

  useEffect(() => {
    if (value !== toStorageValue(inputValue)) {
      setInputValue(toInputFormat(value));
    }
  }, [value]);

  const save = useCallback(
    (v: string) => {
      const storageValue = toStorageValue(v);
      saveExerciseRow({ exerciseRowValues: { [field]: storageValue } });
    },
    [saveExerciseRow, field],
  );

  const cleanText = (value: string) => {
    switch (field) {
      case 'weight':
      case 'distance':
        const parts = value.split('.');
        if (parts.length > 2) {
          return parts[0] + ',' + parts.slice(1).join('');
        }
        return value.replace(/[^0-9.]/g, '');
      case 'time':
        const numbers = parseInt(value.replace(/[^0-9]/g, ''), 10).toString();
        let final = numbers.slice(0, 2);
        if (numbers.length > 2) {
          final += ':' + numbers.slice(2, 4);
        }
        if (numbers.length > 4) {
          final += ':' + numbers.slice(4, 6);
        }
        return final;
      default:
        return value.replace(/[^0-9]/g, '');
    }
  };

  const onChangeText = useCallback(
    (c: string) =>
      setInputValue((value) => {
        let newValue = cleanText(value);
        newValue =
          newValue.slice(0, selection.start) +
          c +
          newValue.slice(selection.end);
        if (selection.start === selection.end && c === '') {
          newValue =
            newValue.slice(0, selection.start - 1) +
            newValue.slice(selection.start);
        }
        newValue = cleanText(newValue);

        save(newValue);
        return newValue;
      }),
    [selection, save],
  );

  useEffect(() => {
    setSelection({
      start: inputValue.length,
      end: inputValue.length,
    });
  }, [inputValue]);

  useEffect(() => {
    inputRef.current?.setSelection(selection.start, selection.end);
  }, [selection]);

  useEffect(() => {
    if (isFocused) {
      setSelection({
        start: 0,
        end: inputValue.length,
      });
      keyboardEmitter.emit('focusKeyboard', field);
    }
  }, [isFocused, field]);

  const onNext = () => {
    let newGroupIndex = exerciseGroupIndex;
    let newRowIndex = exerciseRowIndex;
    let newFieldIndex = fieldIndex;

    if (isLastField) {
      newFieldIndex = 0;
      saveExerciseRow({ isLifted: true });

      if (isLastRow) {
        newRowIndex = 0;

        if (isLastGroup) {
          keyboardEmitter.emit('onBlur');
          return;
        } else {
          newGroupIndex += 1;
        }
      } else {
        newRowIndex += 1;
      }
    } else {
      newFieldIndex += 1;
    }

    keyboardEmitter.emit(
      'focusExerciseField',
      generateId(newGroupIndex, newRowIndex, newFieldIndex),
    );
  };

  const onBlur = () => {
    inputRef.current?.blur();
    keyboardEmitter.emit('focusKeyboard');
  };

  const onFocusExerciseField = useCallback(
    (id: string) => {
      if (id === currentId) {
        inputRef.current?.focus();
      }
    },
    [currentId],
  );

  useKeyboardEvent('focusExerciseField', onFocusExerciseField);
  useKeyboardEvent('onBlur', onBlur, isFocused);
  useKeyboardEvent('onNext', onNext, isFocused);
  useKeyboardEvent('onKeyPress', onChangeText, isFocused);

  return (
    <WlbInput
      key={field}
      ref={inputRef}
      error={error}
      size="small"
      style={{
        width: '100%',
        textAlign: 'center',
      }}
      value={inputValue}
      showSoftInputOnFocus={false}
      onChangeText={(value) => {
        const cleanedValue = cleanText(value);
        setInputValue(cleanedValue);
        save(cleanedValue);
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder=""
      onSelectionChange={(e) => setSelection(e.nativeEvent.selection)}
    />
  );
}

export default memo(ExerciseRowField);
