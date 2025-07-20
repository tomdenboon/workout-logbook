import React, { useCallback, useState, memo } from 'react';
import { View } from 'react-native';
import WlbButton from 'components/WlbButton';
import WlbDropdown from 'components/WlbDropdown';
import { VALID_FIELDS } from 'const';
import {
  ExerciseCategory,
  ExerciseField,
  ExerciseRow as ExerciseRowType,
} from 'db/types';
import { WorkoutForm } from 'hooks/useWorkout';
import ExerciseRowField from 'components/workouts/ExerciseRowField';
import { keyboardEmitter } from 'context/keyboard';
import WlbText from 'components/WlbText';
import { useUnit } from 'context/unit';

interface ExerciseRowProps {
  workoutType: ReturnType<typeof import('hooks/useWorkout').default>['type'];
  exerciseRow: WorkoutForm['exerciseGroups'][0]['exerciseRows'][0];
  previousExerciseRow?: ExerciseRowType;
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
  previousExerciseRow,
}: ExerciseRowProps) {
  const fields = VALID_FIELDS[exerciseType];
  const [errorFields, setErrorFields] = useState<ExerciseField[]>([]);
  const { formatValueWithUnit } = useUnit();

  function exerciseRowToText(
    exerciseCategory: ExerciseCategory,
    row: ExerciseRowType,
  ) {
    const fields = VALID_FIELDS[exerciseCategory];

    const formattedFields = fields.map((field) =>
      formatValueWithUnit(row[field] ?? 0, field === 'reps' ? '' : field),
    );

    const joiner = exerciseCategory === 'weighted' ? ' x ' : ' in ';

    return formattedFields.join(joiner);
  }

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
    [exerciseRow, exerciseGroupIndex, exerciseRowIndex, fields],
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
              width: 32,
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
      <View style={{ flex: 2, alignItems: 'center' }}>
        <WlbButton
          title={
            previousExerciseRow
              ? exerciseRowToText(exerciseType, previousExerciseRow)
              : '-'
          }
          onPress={() => {
            previousExerciseRow &&
              saveExerciseRow({
                exerciseRowValues: {
                  weight: previousExerciseRow?.weight,
                  reps: previousExerciseRow?.reps,
                  distance: previousExerciseRow?.distance,
                  time: previousExerciseRow?.time,
                },
              });
          }}
          variant="ghost"
          color="text"
        />
      </View>
      {fields.map((field, fieldIndex) => (
        <View key={field} style={{ flex: 1, alignItems: 'center' }}>
          <ExerciseRowField
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
        </View>
      ))}
      {workoutType === 'template' ? (
        <View style={{ width: 32 }} />
      ) : (
        <WlbButton
          size="small"
          color={exerciseRow.isLifted ? 'main' : 'subAlt'}
          style={{
            width: 32,
          }}
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
