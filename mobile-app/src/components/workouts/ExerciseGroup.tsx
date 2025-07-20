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
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import db from 'db';
import * as schema from 'db/schema';
import { and, asc, desc, eq, isNotNull } from 'drizzle-orm';

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
  const { data: lastCompletedExerciseGroup } = useLiveQuery(
    db
      .select({ id: schema.exerciseGroups.id })
      .from(schema.exerciseGroups)
      .innerJoin(
        schema.workouts,
        eq(schema.exerciseGroups.workoutId, schema.workouts.id),
      )
      .where(
        and(
          eq(schema.exerciseGroups.exerciseId, exerciseGroup.exercise.id),
          isNotNull(schema.workouts.completedAt),
        ),
      )
      .orderBy(desc(schema.workouts.completedAt))
      .limit(1),
  );
  const lastCompletedExerciseGroupIndex = lastCompletedExerciseGroup?.[0]?.id;
  const previousExerciseGroup = useLiveQuery(
    db.query.exerciseGroups.findFirst({
      where: eq(schema.exerciseGroups.id, lastCompletedExerciseGroupIndex),
      with: {
        exerciseRows: true,
      },
    }),
    [lastCompletedExerciseGroupIndex],
  );

  const { weightUnit, distanceUnit } = useUnit();

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
        <View style={{ width: 32, alignItems: 'center' }}>
          <WlbText fontWeight="500">Set</WlbText>
        </View>
        <View style={{ flex: 2, alignItems: 'center' }}>
          <WlbText fontWeight="500">Previous</WlbText>
        </View>
        {VALID_FIELDS[exerciseGroup.exercise.type].map((field) => (
          <View style={{ flex: 1, alignItems: 'center' }} key={field}>
            <WlbText fontWeight="500">
              {field === 'weight' && weightUnit}
              {field === 'distance' && distanceUnit}
              {field !== 'weight' && field !== 'distance' && field}
            </WlbText>
          </View>
        ))}
        <View style={{ width: 32, alignItems: 'center' }}>
          <MaterialIcons name="check" size={20} color={theme.text} />
        </View>
      </View>

      {exerciseGroup.exerciseRows.map(
        (exerciseRow, exerciseRowIndex: number) => (
          <ExerciseRow
            key={exerciseRowIndex}
            previousExerciseRow={
              previousExerciseGroup?.data?.exerciseRows?.[exerciseRowIndex]
            }
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
