import React, { useEffect, useMemo, useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import WlbInput from 'components/WlbInput';
import WlbModal from 'components/WlbModal';
import WlbPage, { WlbHeader } from 'components/WlbPage';
import WlbView from 'components/WlbView';
import useWorkout, { WorkoutForm } from 'hooks/useWorkout';
import WlbButton from 'components/WlbButton';
import WlbDropdown from 'components/WlbDropdown';
import WlbText from 'components/WlbText';
import { formatTime, useTimer } from 'hooks/useTimer';
import { deleteWorkout, finishWorkout } from 'db/mutation';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'context/theme';
import WlbTimer from 'components/WlbTimer';
import ExercisePage from 'components/exercises/ExercisePage';
import {
  KeyboardContext,
  KeyboardData,
  useKeyboardContext,
} from 'context/keyboard';

const VALID_FIELDS = {
  reps: ['reps'] as const,
  weighted: ['reps', 'weight'] as const,
  duration: ['time'] as const,
  distance: ['time', 'distance'] as const,
} as const;

function ExerRowFieldComponent({
  field,
  exerciseRow,
  exerciseGroupIndex,
  exerciseRowIndex,
  updateExerciseRow,
}: {
  field: 'reps' | 'weight' | 'time' | 'distance';
  exerciseRow: WorkoutForm['exerciseGroups'][0]['exerciseRows'][0];
  exerciseGroupIndex: number;
  exerciseRowIndex: number;
  updateExerciseRow: ReturnType<typeof useWorkout>['updateExerciseRow'];
}) {
  const toInputValue = (value: number | null) => {
    if (value === null) {
      return '';
    }

    return value.toString();
  };

  const { keyboardData, connectKeyboard, disconnectKeyboard } =
    useKeyboardContext();
  const inputRef = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState(
    toInputValue(exerciseRow[field]),
  );
  const selection = useRef({
    start: 0,
    end: 0,
  });

  useEffect(() => {
    setInputValue(toInputValue(exerciseRow[field]));
  }, [exerciseRow[field]]);

  const cleanText = (value: string) => {
    return value.replace(/[^0-9]/g, '');
  };

  const onBlur = () => {
    disconnectKeyboard();
    updateExerciseRow(exerciseGroupIndex, exerciseRowIndex, {
      ...exerciseRow,
      [field]: inputValue ? parseInt(inputValue) : null,
    });
  };

  const onFocus = () => {
    selection.current = {
      start: 0,
      end: inputValue.length,
    };
    inputRef.current?.setSelection(
      selection.current.start,
      selection.current.end,
    );
    connectKeyboard({
      inputRef,
      exerciseGroupIndex,
      exerciseRowIndex,
      field,
      onChangeText: (value) => {
        setInputValue((val) => {
          let x: string;
          if (selection.current.start === selection.current.end) {
            x = value === '' ? val.slice(0, -1) : val + value;
          } else {
            x =
              val.slice(0, selection.current.start) +
              value +
              val.slice(selection.current.end);
          }
          x = cleanText(x);

          selection.current = {
            start: x.length,
            end: x.length,
          };

          return x;
        });
      },
    });
  };

  useEffect(() => {
    if (
      keyboardData?.exerciseGroupIndex === exerciseGroupIndex &&
      keyboardData?.exerciseRowIndex === exerciseRowIndex &&
      keyboardData?.field === field
    ) {
      inputRef.current?.focus();
    }
  }, [keyboardData]);

  return (
    <WlbInput
      key={field}
      ref={inputRef}
      size="small"
      style={{ flex: 1, textAlign: 'center' }}
      value={inputValue}
      showSoftInputOnFocus={false}
      onChangeText={(value) => {
        setInputValue(cleanText(value));
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder=""
      onSelectionChange={(e) => {
        selection.current = {
          start: e.nativeEvent.selection.start,
          end: e.nativeEvent.selection.end,
        };
      }}
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
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <WlbDropdown
        triggerProps={{
          variant: 'secondary',
          size: 'small',
          title: `${exerciseRowIndex + 1}`,
          style: {
            width: 36,
          },
        }}
        options={[
          {
            label: 'Delete',
            onPress: () => {
              deleteExerciseRow(exerciseGroupIndex, exerciseRowIndex);
            },
          },
        ]}
        align="right"
      />
      {VALID_FIELDS[exerciseType].map((field) => (
        <ExerRowFieldComponent
          key={field}
          field={field}
          exerciseRow={exerciseRow}
          exerciseGroupIndex={exerciseGroupIndex}
          exerciseRowIndex={exerciseRowIndex}
          updateExerciseRow={updateExerciseRow}
        />
      ))}
      {workoutType === 'template' ? (
        <View style={{ width: 36 }} />
      ) : (
        <WlbButton
          size="small"
          variant={exerciseRow.isLifted ? 'primary' : 'secondary'}
          onPress={() =>
            updateExerciseRow(exerciseGroupIndex, exerciseRowIndex, {
              ...exerciseRow,
              isLifted: !exerciseRow.isLifted,
            })
          }
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
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <WlbButton
          variant="text"
          title={exerciseGroup.exercise.name}
          size="small"
          onPress={() => {}}
        />
        <WlbDropdown
          triggerProps={{
            variant: 'primary',
            icon: 'keyboard-control',
            size: 'small',
          }}
          options={[
            { label: 'Edit', onPress: () => {} },
            {
              label: 'Delete',
              onPress: () => {
                deleteExerciseGroup(exerciseGroupIndex);
              },
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
            <WlbText fontWeight="700">{field}</WlbText>
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
        variant="secondary"
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
        <WlbButton
          title="Finish"
          onPress={() =>
            finishWorkout(workout.id as number).then(() => {
              router.dismissTo('/history');
            })
          }
        />
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
      headerRight={headerRight}
      headerLeft={
        <WlbButton
          onPress={() => router.back()}
          variant="secondary"
          icon="close"
        />
      }
    />
  );
}

function WorkoutKeyboard() {
  const theme = useTheme();
  const { keyboardData, onNext, disconnectKeyboard } = useKeyboardContext();

  const inputs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', ''];

  return keyboardData ? (
    <SafeAreaView
      edges={['bottom']}
      style={{
        padding: 8,
        gap: 8,
        flexDirection: 'row',
        borderTopWidth: 2,
        borderTopColor: theme.subAlt,
      }}
    >
      <View style={{ gap: 8, flex: 5 }}>
        {[0, 1, 2, 3].map((row) => (
          <View key={row} style={{ flexDirection: 'row', gap: 8 }}>
            {inputs.slice(row * 3, row * 3 + 3).map((digit) => (
              <WlbButton
                key={digit}
                size="small"
                style={{ height: 48, flex: 1 }}
                variant="transparent"
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
      </View>
      <View style={{ gap: 8, flex: 2 }}>
        <WlbButton
          variant="secondary"
          icon="keyboard"
          size="small"
          style={{ flex: 1 }}
          onPress={() => disconnectKeyboard()}
        />
        <WlbButton
          variant="secondary"
          icon="line-weight"
          size="small"
          style={{ flex: 1 }}
          onPress={() => onNext()}
        />
        <View style={{ flex: 1 }} />
        <WlbButton
          variant="primary"
          style={{ flex: 1 }}
          title="Next"
          onPress={() => onNext()}
        />
      </View>
    </SafeAreaView>
  ) : null;
}

function useWorkoutKeyboard(
  workout: WorkoutForm,
  updateExerciseRow: ReturnType<typeof useWorkout>['updateExerciseRow'],
) {
  const [keyboardData, setKeyboardData] = useState<KeyboardData | undefined>(
    undefined,
  );
  const timeOutId = useRef<NodeJS.Timeout | null>(null);

  const connectKeyboard = (data: KeyboardData) => {
    if (timeOutId.current) {
      clearTimeout(timeOutId.current);
    }
    setKeyboardData(data);
  };

  const disconnectKeyboard = () => {
    timeOutId.current = setTimeout(() => {
      keyboardData?.inputRef.current?.blur();
      setKeyboardData(undefined);
    }, 50);
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
        field: currentField,
      } = keyboardData;

      const exerciseGroup = workout.exerciseGroups[currentGroupIndex];
      const exerciseRow = exerciseGroup.exerciseRows[currentRowIndex];
      const fields = VALID_FIELDS[exerciseGroup.exercise.type];
      const fieldIndex = fields.findIndex((field) => field === currentField);

      if (fieldIndex === -1) {
        return;
      }

      let newGroupIndex = currentGroupIndex;
      let newRowIndex = currentRowIndex;
      let newFieldIndex = fieldIndex;

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
        updateExerciseRow(currentGroupIndex, currentRowIndex, {
          ...exerciseRow,
          isLifted: 1,
        });
      }

      if (isLastGroup && isLastRow && isLastField) {
        disconnectKeyboard();
      } else {
        setKeyboardData({
          ...keyboardData,
          exerciseGroupIndex: newGroupIndex,
          exerciseRowIndex: newRowIndex,
          field: VALID_FIELDS[exerciseGroup.exercise.type][newFieldIndex],
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
  } = useWorkout();
  const keyboardContext = useWorkoutKeyboard(workout, updateExerciseRow);

  return (
    <KeyboardContext.Provider value={keyboardContext}>
      <WlbView>
        <WorkoutHeader workout={workout} type={type} flush={flush} />
        <ScrollView>
          <View style={{ gap: 20, padding: 16, paddingBottom: 32 }}>
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

            <WlbModal
              visible={addExerciseModalVisible}
              close={() => setAddExerciseModalVisible(false)}
            >
              <ExercisePage
                addExercises={addExerciseGroups}
                onClose={() => setAddExerciseModalVisible(false)}
              />
            </WlbModal>
            {workout.id && (
              <WlbButton
                title={
                  {
                    active: 'Cancel workout',
                    completed: 'Delete workout',
                    template: 'Delete template',
                  }[type]
                }
                variant="error"
                onPress={() => {
                  deleteWorkout(workout.id as number).then(() => {
                    router.back();
                  });
                }}
              />
            )}
          </View>
        </ScrollView>
        <WorkoutKeyboard />
      </WlbView>
    </KeyboardContext.Provider>
  );
}
