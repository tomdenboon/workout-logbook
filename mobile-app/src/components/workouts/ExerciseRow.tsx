import React, { useCallback, useState, memo } from 'react';
import { View } from 'react-native';
import WlbButton from 'components/WlbButton';
import WlbDropdown from 'components/WlbDropdown';
import { VALID_FIELDS } from 'const';
import { ExerciseField } from 'db/types';
import { WorkoutForm } from 'hooks/useWorkout';
import ExerciseRowField from 'components/workouts/ExerciseRowField';
import { keyboardEmitter } from 'context/keyboard';

interface ExerciseRowProps {
  workoutType: ReturnType<typeof import('hooks/useWorkout').default>['type'];
  exerciseRow: WorkoutForm['exerciseGroups'][0]['exerciseRows'][0];
  exerciseType: keyof typeof VALID_FIELDS;
  exerciseGroupIndex: number;
  exerciseRowIndex: number;
  updateExerciseRow: ReturnType<
    typeof import('hooks/useWorkout').default
  >['updateExerciseRow'];
  deleteExerciseRow: ReturnType<
    typeof import('hooks/useWorkout').default
  >['deleteExerciseRow'];
  isLastRow: boolean;
  isLastGroup: boolean;
}

const ExerciseRow = function ExerciseRow({
  exerciseRow,
  exerciseType,
  exerciseGroupIndex,
  exerciseRowIndex,
  updateExerciseRow,
  deleteExerciseRow,
  isLastRow,
  isLastGroup,
  workoutType,
}: ExerciseRowProps) {
  const fields = VALID_FIELDS[exerciseType];
  const [errorFields, setErrorFields] = useState<ExerciseField[]>([]);

  const saveExerciseRow = useCallback(
    ({
      isLifted,
      validate = false,
      exerciseRowValues = {},
    }: {
      isLifted?: boolean;
      validate?: boolean;
      exerciseRowValues?: Record<string, number | null>;
    }) => {
      let finalIsLifted =
        isLifted !== undefined ? isLifted : Boolean(exerciseRow.isLifted);

      const newRow = {
        ...exerciseRow,
        ...exerciseRowValues,
        isLifted: finalIsLifted,
      };

      const emptyFields = fields.filter((field) => !newRow[field]);

      if (emptyFields.length > 0) {
        newRow.isLifted = false;
        if (validate) {
          setErrorFields(emptyFields);
          return;
        }
      }

      updateExerciseRow(exerciseGroupIndex, exerciseRowIndex, {
        ...newRow,
      });
      if (finalIsLifted) {
        setErrorFields([]);
      }
    },
    [exerciseRow, fields],
  );

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
        <ExerciseRowField
          key={field}
          exerciseGroupIndex={exerciseGroupIndex}
          exerciseRowIndex={exerciseRowIndex}
          fieldIndex={fieldIndex}
          isLastRow={isLastRow}
          isLastGroup={isLastGroup}
          isLastField={fieldIndex === fields.length - 1}
          field={field}
          error={errorFields.includes(field)}
          value={exerciseRow[field]}
          saveExerciseRow={saveExerciseRow}
        />
      ))}
      {workoutType === 'template' ? (
        <View style={{ width: 36 }} />
      ) : (
        <WlbButton
          size="small"
          color={exerciseRow.isLifted ? 'main' : 'subAlt'}
          onPress={() =>
            saveExerciseRow({
              isLifted: exerciseRow.isLifted ? false : true,
              validate: true,
            })
          }
          icon={'check'}
        />
      )}
    </View>
  );
};

export default memo(ExerciseRow);
