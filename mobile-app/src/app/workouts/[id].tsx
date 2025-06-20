import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import WlbInput from 'components/WlbInput';
import { WlbScreenPage } from 'components/WlbPage';
import useWorkout, { WorkoutForm } from 'hooks/useWorkout';
import WlbDropdown from 'components/WlbDropdown';
import WlbText from 'components/WlbText';
import { formatTime, useTimer } from 'hooks/useTimer';
import { deleteWorkout, finishWorkout } from 'db/mutation';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'context/theme';
import WlbTimer from 'components/WlbTimer';
import ExercisePage from 'components/exercises/ExercisePage';
import RestTimerModal from 'components/RestTimerModal';
import {
  KeyboardContext,
  KeyboardData,
  useKeyboardContext,
} from 'context/keyboard';
import { useUnit } from 'context/unit';
import { ExerciseField } from 'db/types';
import { VALID_FIELDS } from 'const';
import WlbButton from 'components/WlbButton';
import { WlbHeader } from 'components/WlbPage';

function ExerciseRowFieldComponent({
  field,
  error,
  exerciseGroupIndex,
  exerciseRowIndex,
  fieldIndex,
  inputValues,
  setInputValues,
  saveExerciseRow,
}: {
  field: ExerciseField;
  error: boolean;
  fieldIndex: number;
  exerciseRow: WorkoutForm['exerciseGroups'][0]['exerciseRows'][0];
  exerciseGroupIndex: number;
  exerciseRowIndex: number;
  inputValues: Record<string, string>;
  setInputValues: Dispatch<SetStateAction<Record<string, string>>>;
  saveExerciseRow: (isLifted?: boolean) => void;
}) {
  const { keyboardData, connectKeyboard } = useKeyboardContext();
  const inputRef = useRef<TextInput>(null);
  const [selection, setSelection] = useState({
    start: 0,
    end: 0,
  });

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

  useEffect(() => {
    inputRef.current?.setSelection(selection.start, selection.end);
  }, [selection]);

  const onChangeText = useCallback(
    (value: string) =>
      setInputValues((values) => {
        let x = cleanText(values[field]);

        x = x.slice(0, selection.start) + value + x.slice(selection.end);

        if (selection.start === selection.end && value === '') {
          x = x.slice(0, selection.start - 1) + x.slice(selection.start);
        }
        x = cleanText(x);

        setSelection({
          start: x.length,
          end: x.length,
        });

        return {
          ...values,
          [field]: x,
        };
      }),
    [selection],
  );

  const connect = useCallback(() => {
    connectKeyboard({
      inputRef,
      field,
      exerciseGroupIndex,
      exerciseRowIndex,
      fieldIndex,
      onChangeText,
      saveExerciseRow,
    });
  }, [
    onChangeText,
    field,
    exerciseGroupIndex,
    exerciseRowIndex,
    fieldIndex,
    saveExerciseRow,
  ]);

  const isActive = useMemo(() => {
    return (
      keyboardData?.exerciseGroupIndex === exerciseGroupIndex &&
      keyboardData?.exerciseRowIndex === exerciseRowIndex &&
      keyboardData?.fieldIndex === fieldIndex
    );
  }, [keyboardData, exerciseGroupIndex, exerciseRowIndex, fieldIndex]);

  const onFocus = () => {
    setSelection({
      start: 0,
      end: inputValues[field].length,
    });
    connect();
  };

  useEffect(() => {
    if (isActive) {
      connect();
    }
  }, [isActive, connect]);

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus();
    }
  }, [isActive]);

  return (
    <WlbInput
      key={field}
      ref={inputRef}
      error={error && inputValues[field] === ''}
      size="small"
      style={{ flex: 1, textAlign: 'center' }}
      value={inputValues[field]}
      showSoftInputOnFocus={false}
      onChangeText={(value) => {
        setInputValues((values) => ({
          ...values,
          [field]: cleanText(value),
        }));
      }}
      onFocus={onFocus}
      onBlur={() => saveExerciseRow()}
      placeholder=""
      onSelectionChange={(e) => setSelection(e.nativeEvent.selection)}
    />
  );
}

function ExerciseRowComponent({
  exerciseRow,
  exerciseType,
  exerciseGroupIndex,
  exerciseRowIndex,
  updateExerciseRow,
  deleteExerciseRow,
  workoutType,
}: {
  workoutType: ReturnType<typeof useWorkout>['type'];
  exerciseRow: WorkoutForm['exerciseGroups'][0]['exerciseRows'][0];
  exerciseType: keyof typeof VALID_FIELDS;
  exerciseGroupIndex: number;
  exerciseRowIndex: number;
  updateExerciseRow: ReturnType<typeof useWorkout>['updateExerciseRow'];
  deleteExerciseRow: ReturnType<typeof useWorkout>['deleteExerciseRow'];
}) {
  const fields = VALID_FIELDS[exerciseType];
  const { convertToDisplayUnit, convertToStorageUnit } = useUnit();

  const inputValuesFromExerciseRow = useMemo(() => {
    return fields.reduce((acc, field) => {
      const toInputValue = (value: number | null) => {
        if (value === null) {
          return '';
        } else if (field === 'time') {
          return formatTime(value, 'digital');
        }

        return parseFloat(
          convertToDisplayUnit(value, field).toFixed(2),
        ).toString();
      };

      acc[field] = toInputValue(exerciseRow[field]);
      return acc;
    }, {} as Record<string, string>);
  }, [exerciseRow]);

  const [inputValues, setInputValues] = useState(inputValuesFromExerciseRow);
  const [errorFields, setErrorFields] = useState<ExerciseField[]>([]);

  useEffect(() => {
    setInputValues(inputValuesFromExerciseRow);
  }, [exerciseRow]);

  const newExerciseRow = useCallback(
    (isLifted?: boolean) => {
      const exerciseRowValues = Object.entries(inputValues).reduce(
        (acc, [field, value]) => {
          const toStorageValue = (value: string) => {
            if (value === '') {
              return null;
            } else if (field === 'time') {
              return value
                .split(':')
                .reverse()
                .reduce((acc, part, i) => {
                  const multiplier = [1, 60, 3600][i] * 1000;
                  return acc + parseInt(part, 10) * multiplier;
                }, 0);
            } else {
              return convertToStorageUnit(parseFloat(value), field);
            }
          };

          acc[field] = toStorageValue(value);
          return acc;
        },
        {} as Record<string, number | null>,
      );

      return {
        ...exerciseRow,
        ...exerciseRowValues,
        isLifted: isLifted !== undefined ? isLifted : exerciseRow.isLifted,
      };
    },
    [exerciseRow, inputValues, convertToStorageUnit],
  );

  const saveExerciseRow = useCallback(
    (defaultIsLifted?: boolean) => {
      const newRow = newExerciseRow();
      const emptyFields = fields.filter((field) => !newRow[field]);

      let isLifted =
        defaultIsLifted !== undefined ? defaultIsLifted : newRow.isLifted;
      if (emptyFields.length > 0) {
        isLifted = false;
      }

      updateExerciseRow(exerciseGroupIndex, exerciseRowIndex, {
        ...newRow,
        isLifted,
      });
    },
    [exerciseGroupIndex, exerciseRowIndex, newExerciseRow],
  );

  const setLifted = (isLifted: boolean) => {
    const newRow = newExerciseRow();
    const emptyFields = fields.filter((field) => !newRow[field]);

    if (emptyFields.length > 0 && isLifted) {
      setErrorFields(emptyFields);
      return;
    }

    updateExerciseRow(exerciseGroupIndex, exerciseRowIndex, {
      ...newRow,
      isLifted,
    });
    setErrorFields([]);
  };

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <WlbDropdown
        triggerComponent={({ onPress }) => (
          <WlbButton
            onPress={onPress}
            color="subAlt"
            size="small"
            title={`${exerciseRowIndex + 1}`}
            style={{
              width: 36,
            }}
          />
        )}
        options={[
          {
            label: 'Delete',
            onPress: () => {
              deleteExerciseRow(exerciseGroupIndex, exerciseRowIndex);
            },
          },
        ]}
      />
      {fields.map((field, fieldIndex) => (
        <ExerciseRowFieldComponent
          key={field}
          field={field}
          error={errorFields.includes(field)}
          inputValues={inputValues}
          setInputValues={setInputValues}
          fieldIndex={fieldIndex}
          exerciseRow={exerciseRow}
          exerciseGroupIndex={exerciseGroupIndex}
          exerciseRowIndex={exerciseRowIndex}
          saveExerciseRow={saveExerciseRow}
        />
      ))}
      {workoutType === 'template' ? (
        <View style={{ width: 36 }} />
      ) : (
        <WlbButton
          size="small"
          color={exerciseRow.isLifted ? 'main' : 'subAlt'}
          onPress={() => setLifted(exerciseRow.isLifted ? false : true)}
          icon={'check'}
        />
      )}
    </View>
  );
}

function ExerciseGroupComponent({
  exerciseGroup,
  exerciseGroupIndex,
  addExerciseRow,
  updateExerciseRow,
  deleteExerciseRow,
  deleteExerciseGroup,
  workoutType,
}: {
  workoutType: ReturnType<typeof useWorkout>['type'];
  exerciseGroup: WorkoutForm['exerciseGroups'][0];
  exerciseGroupIndex: number;
  addExerciseRow: ReturnType<typeof useWorkout>['addExerciseRow'];
  updateExerciseRow: ReturnType<typeof useWorkout>['updateExerciseRow'];
  deleteExerciseRow: ReturnType<typeof useWorkout>['deleteExerciseRow'];
  deleteExerciseGroup: ReturnType<typeof useWorkout>['deleteExerciseGroup'];
}) {
  const theme = useTheme();
  const { weightUnit } = useUnit();

  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <WlbButton
          variant="ghost"
          title={exerciseGroup.exercise.name}
          size="small"
          onPress={() => {}}
        />
        <WlbDropdown
          triggerComponent={({ onPress }) => (
            <WlbButton
              onPress={onPress}
              color="main"
              icon="keyboard-control"
              size="small"
            />
          )}
          options={[
            { label: 'Edit', onPress: () => {}, icon: 'edit' },
            {
              label: 'Delete',
              onPress: () => {
                deleteExerciseGroup(exerciseGroupIndex);
              },
              icon: 'delete',
            },
          ]}
        />
      </View>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={{ width: 34, alignItems: 'center' }}>
          <WlbText fontWeight="700">Set</WlbText>
        </View>
        {VALID_FIELDS[exerciseGroup.exercise.type].map((field) => (
          <View style={{ flex: 1, alignItems: 'center' }} key={field}>
            <WlbText fontWeight="700">
              {field === 'weight' ? weightUnit : field}
            </WlbText>
          </View>
        ))}
        <View style={{ width: 36, alignItems: 'center' }}>
          <MaterialIcons name="check" size={20} color={theme.text} />
        </View>
      </View>
      {exerciseGroup.exerciseRows.map(
        (exerciseRow, exerciseRowIndex: number) => (
          <ExerciseRowComponent
            key={exerciseRowIndex}
            exerciseType={exerciseGroup.exercise.type}
            exerciseRow={exerciseRow}
            exerciseGroupIndex={exerciseGroupIndex}
            exerciseRowIndex={exerciseRowIndex}
            updateExerciseRow={updateExerciseRow}
            deleteExerciseRow={deleteExerciseRow}
            workoutType={workoutType}
          />
        ),
      )}
      <WlbButton
        variant="ghost"
        size="small"
        title="+ Add set"
        onPress={() => addExerciseRow(exerciseGroupIndex)}
      />
    </View>
  );
}

function WorkoutHeader({
  workout,
  type,
  flush,
}: {
  workout: ReturnType<typeof useWorkout>['workout'];
  type: ReturnType<typeof useWorkout>['type'];
  flush: ReturnType<typeof useWorkout>['flush'];
}) {
  const timer = useTimer(workout.startedAt, workout.completedAt);

  const title = useMemo(() => {
    if (type === 'active') {
      return formatTime(timer as number, 'digital');
    }
    if (type === 'completed') {
      return 'Edit workout';
    }

    return workout.id ? 'Edit template' : 'New template';
  }, [type, timer, workout.id]);

  const headerRight = useMemo(() => {
    if (type === 'active') {
      return (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <RestTimerModal />
          <WlbButton
            title="Finish"
            onPress={() =>
              finishWorkout(workout.id as number).then(() => {
                router.dismissTo('/history');
              })
            }
          />
        </View>
      );
    }

    return (
      <WlbButton
        title="Save"
        onPress={() => {
          flush();
          router.back();
        }}
      />
    );
  }, [type, flush]);

  return (
    <WlbHeader
      title={title}
      headerLeft={
        <WlbButton onPress={() => router.back()} color="subAlt" icon="close" />
      }
      headerRight={headerRight}
    />
  );
}

function WorkoutKeyboard() {
  const theme = useTheme();
  const [isRpeMode, setIsRpeMode] = useState(false);
  const { keyboardData, onNext, disconnectKeyboard } = useKeyboardContext();

  const inputs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', ''];

  return keyboardData ? (
    <SafeAreaView
      edges={['bottom']}
      style={{
        padding: 8,
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: theme.subAlt,
        backgroundColor: theme.bg,
      }}
    >
      <View style={{ gap: 8, flexDirection: 'row' }}>
        <WlbButton
          color="subAlt"
          icon="keyboard"
          size="small"
          style={{ flex: 1, height: 40 }}
          onPress={() => disconnectKeyboard()}
        />
        {keyboardData.field === 'weight' && (
          <WlbButton
            color="subAlt"
            size="small"
            icon="line-weight"
            style={{ flex: 1, height: 40 }}
            onPress={() => onNext()}
          />
        )}
        {keyboardData.field === 'reps' && (
          <WlbButton
            color="subAlt"
            title={'RPE'}
            size="small"
            style={{ flex: 1, height: 40 }}
            onPress={() => setIsRpeMode((prev) => !prev)}
          />
        )}
        <WlbButton
          color="main"
          title="Next"
          size="small"
          style={{ flex: 1, height: 40 }}
          onPress={() => onNext()}
        />
      </View>

      {[0, 1, 2, 3].map((row) => (
        <View key={row} style={{ flexDirection: 'row', gap: 8 }}>
          {inputs.slice(row * 3, row * 3 + 3).map((digit) => (
            <WlbButton
              key={digit}
              size="small"
              style={{ height: 48, flex: 1 }}
              variant="ghost"
              color="text"
              {...(digit === ''
                ? {
                    icon: 'backspace',
                  }
                : {
                    title: digit,
                  })}
              onPress={() => keyboardData.onChangeText(digit)}
            />
          ))}
        </View>
      ))}
    </SafeAreaView>
  ) : null;
}

function useWorkoutKeyboard(workout: WorkoutForm) {
  const [keyboardData, setKeyboardData] = useState<KeyboardData | undefined>(
    undefined,
  );
  const timeOutId = useRef<number | null>(null);

  const connectKeyboard = (data: KeyboardData) => {
    if (timeOutId.current) {
      clearTimeout(timeOutId.current);
    }
    setKeyboardData(data);
  };

  const disconnectKeyboard = () => {
    keyboardData?.inputRef.current?.blur();
    setKeyboardData(undefined);
  };

  return {
    keyboardData,
    onNext: () => {
      if (!keyboardData) {
        return;
      }

      const {
        exerciseGroupIndex: currentGroupIndex,
        exerciseRowIndex: currentRowIndex,
        fieldIndex: currentFieldIndex,
      } = keyboardData;

      const exerciseGroup = workout.exerciseGroups[currentGroupIndex];
      const fields = VALID_FIELDS[exerciseGroup.exercise.type];

      let newGroupIndex = currentGroupIndex;
      let newRowIndex = currentRowIndex;
      let newFieldIndex = currentFieldIndex;

      const isLastField = newFieldIndex === fields.length - 1;
      const isLastRow = newRowIndex === exerciseGroup.exerciseRows.length - 1;
      const isLastGroup = newGroupIndex === workout.exerciseGroups.length - 1;

      if (isLastField) {
        newFieldIndex = 0;

        if (isLastRow) {
          newRowIndex = 0;

          if (!isLastGroup) {
            newGroupIndex += 1;
          }
        } else {
          newRowIndex += 1;
        }
      } else {
        newFieldIndex += 1;
      }

      if (isLastField) {
        keyboardData.saveExerciseRow(true);
      }

      if (isLastGroup && isLastRow && isLastField) {
        disconnectKeyboard();
      } else {
        setKeyboardData({
          ...keyboardData,
          exerciseGroupIndex: newGroupIndex,
          exerciseRowIndex: newRowIndex,
          fieldIndex: newFieldIndex,
        });
      }
    },
    connectKeyboard,
    disconnectKeyboard,
  };
}

export default function Workout() {
  const [addExerciseModalVisible, setAddExerciseModalVisible] = useState(false);
  const {
    workout,
    type,
    setWorkout,
    addExerciseRow,
    addExerciseGroups,
    deleteExerciseRow,
    deleteExerciseGroup,
    updateExerciseRow,
    flush,
    waitForData,
  } = useWorkout();
  const theme = useTheme();
  const keyboardContext = useWorkoutKeyboard(workout);

  if (waitForData) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.bg,
        }}
      >
        <WlbText>Loading...</WlbText>
      </View>
    );
  }

  return (
    <KeyboardContext.Provider value={keyboardContext}>
      <WlbScreenPage
        header={<WorkoutHeader workout={workout} type={type} flush={flush} />}
      >
        {type === 'completed' && (
          <WlbTimer start={workout.startedAt} end={workout.completedAt} />
        )}
        <WlbInput
          value={workout.name}
          onChangeText={(value) => setWorkout({ ...workout, name: value })}
          placeholder="Workout name"
        />
        {workout.exerciseGroups.map((exerciseGroup, index: number) => (
          <ExerciseGroupComponent
            key={index}
            workoutType={type}
            exerciseGroupIndex={index}
            exerciseGroup={exerciseGroup}
            addExerciseRow={addExerciseRow}
            updateExerciseRow={updateExerciseRow}
            deleteExerciseRow={deleteExerciseRow}
            deleteExerciseGroup={deleteExerciseGroup}
          />
        ))}
        <WlbButton
          title="Add exercises"
          onPress={() => setAddExerciseModalVisible(true)}
        />

        <ExercisePage
          modal={{
            addExercises: addExerciseGroups,
            visible: addExerciseModalVisible,
            close: () => setAddExerciseModalVisible(false),
          }}
        />

        {workout.id && (
          <WlbButton
            title={
              {
                active: 'Cancel workout',
                completed: 'Delete workout',
                template: 'Delete template',
              }[type]
            }
            color="error"
            onPress={() => {
              deleteWorkout(workout.id as number).then(() => {
                router.back();
              });
            }}
          />
        )}
      </WlbScreenPage>
      <WorkoutKeyboard />
    </KeyboardContext.Provider>
  );
}
