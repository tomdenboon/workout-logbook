import { TextField } from '@mui/material';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { WorkoutKeyboardContext } from 'src/features/workout/components/WorkoutKeyboard';
import { digitalTimerToMilliseconds, formatTime } from 'src/hooks/useTimer';
import { ExerciseRowResponse } from 'src/store/baseMonkeylogApi';

interface ExerciseRowFieldProps {
  onBlur: (key: keyof ExerciseRowResponse, value: number | undefined | boolean) => void;
  exerciseRow: ExerciseRowResponse;
  type: keyof Pick<ExerciseRowResponse, 'reps' | 'weight' | 'time' | 'distance'>;
  workoutType: 'COMPLETED' | 'TEMPLATE' | 'ACTIVE';
}

function ExerciseRowFieldForm(props: ExerciseRowFieldProps) {
  const { exerciseRow, onBlur, type, workoutType } = props;

  const [input, setInput] = useState<string>('');
  const val = exerciseRow[type];
  const { exerciseRowId, exerciseRowType, connectKeyboard, disconnectKeyboard } =
    useContext(WorkoutKeyboardContext);
  const customKeyboardRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let input = val ? String(val) : '';
    if (val && type === 'time') {
      input = formatTime(val, 'digital');
    }

    setInput(input);
  }, [val, type]);

  const removeNonNumber = (newInput: string) => {
    return newInput.replace(/\D/g, '').replace(/^0+/, '');
  };

  const cleanFieldInput = useCallback(
    (newInput: string) => {
      if (type === 'time') {
        const numbers = removeNonNumber(newInput.replace(':', '')).padStart(4, '0').split('');
        if (numbers.length == 4) {
          numbers.splice(2, 0, ':');
        } else {
          numbers.splice(numbers.length - 2, 0, ':');
          numbers.splice(numbers.length - 5, 0, ':');
        }

        return numbers.join('');
      }

      return removeNonNumber(newInput);
    },
    [type]
  );

  const onNext = useCallback(
    () => (workoutType === 'ACTIVE' ? onBlur('lifted', true) : undefined),
    [workoutType, onBlur]
  );

  const insertTextAtCursor = useCallback(
    (text: string) => {
      const element = customKeyboardRef.current;

      if (!element) {
        return;
      }

      const startPos = element.selectionStart;
      const endPos = element.selectionEnd;

      if (startPos === null || endPos === null) {
        return;
      }

      if (text == '' && startPos === endPos) {
        element.value = cleanFieldInput(
          element.value.substring(0, startPos - 1) +
            element.value.substring(endPos, element.value.length)
        );
      } else {
        element.value = cleanFieldInput(
          element.value.substring(0, startPos) +
            text +
            element.value.substring(endPos, element.value.length)
        );
      }

      element.selectionStart = element.selectionEnd = element.value.length;
      setInput(element.value);
    },
    [cleanFieldInput]
  );

  useEffect(() => {
    if (type == exerciseRowType && exerciseRowId == exerciseRow.id) {
      customKeyboardRef.current?.focus();
      connectKeyboard(exerciseRow.id, type, insertTextAtCursor, onNext);
    }
  }, [
    exerciseRowId,
    exerciseRow.id,
    exerciseRowType,
    type,
    onNext,
    insertTextAtCursor,
    connectKeyboard,
  ]);

  return (
    <TextField
      sx={{
        '& .MuiInputBase-root': {
          '& input': {
            textAlign: 'center',
          },
          height: 24,
        },
      }}
      fullWidth
      hiddenLabel
      inputMode="none"
      inputProps={{
        inputMode: 'none',
      }}
      inputRef={customKeyboardRef}
      value={input}
      onChange={(e) => setInput(cleanFieldInput(e.target.value))}
      onFocus={(e) => {
        e.target.select();
        connectKeyboard(exerciseRow.id, type, insertTextAtCursor, onNext);
      }}
      onBlur={() => {
        if (type === 'time') {
          onBlur(type, digitalTimerToMilliseconds(input));
        } else {
          onBlur(type, input ? Number(input) : undefined);
        }
        disconnectKeyboard();
      }}
    />
  );
}

const ExerciseRowFieldFormMemo = React.memo(ExerciseRowFieldForm);
export default ExerciseRowFieldFormMemo;
