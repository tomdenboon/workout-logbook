import React, { memo } from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import WlbButton from 'components/WlbButton';
import WlbDropdown from 'components/WlbDropdown';
import WlbText from 'components/WlbText';
import { VALID_FIELDS } from 'const';
import { useTheme } from 'context/theme';
import { useUnit } from 'context/unit';
import { WorkoutForm } from 'hooks/useWorkout';
import ExerciseRow from 'components/workouts/ExerciseRow';

interface ExerciseGroupProps {
  workoutType: ReturnType<typeof import('hooks/useWorkout').default>['type'];
  exerciseGroup: WorkoutForm['exerciseGroups'][0];
  exerciseGroupIndex: number;
  addExerciseRow: ReturnType<
    typeof import('hooks/useWorkout').default
  >['addExerciseRow'];
  updateExerciseRow: ReturnType<
    typeof import('hooks/useWorkout').default
  >['updateExerciseRow'];
  deleteExerciseRow: ReturnType<
    typeof import('hooks/useWorkout').default
  >['deleteExerciseRow'];
  deleteExerciseGroup: ReturnType<
    typeof import('hooks/useWorkout').default
  >['deleteExerciseGroup'];
  isLastGroup: boolean;
}

const ExerciseGroup = function ExerciseGroup({
  exerciseGroup,
  exerciseGroupIndex,
  addExerciseRow,
  updateExerciseRow,
  deleteExerciseRow,
  deleteExerciseGroup,
  workoutType,
  isLastGroup,
}: ExerciseGroupProps) {
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
          <ExerciseRow
            key={exerciseRow.id}
            exerciseType={exerciseGroup.exercise.type}
            exerciseRow={exerciseRow}
            exerciseGroupIndex={exerciseGroupIndex}
            exerciseRowIndex={exerciseRowIndex}
            updateExerciseRow={updateExerciseRow}
            deleteExerciseRow={deleteExerciseRow}
            isLastRow={
              exerciseRowIndex === exerciseGroup.exerciseRows.length - 1
            }
            isLastGroup={isLastGroup}
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
};

export default memo(ExerciseGroup);
