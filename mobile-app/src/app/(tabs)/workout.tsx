import { FlatList, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import WlbButton from 'components/WlbButton';
import WlbCard from 'components/WlbCard';
import { WlbScreenPage, WlbHeader } from 'components/WlbPage';
import WlbText from 'components/WlbText';
import db from 'db';
import * as schema from 'db/schema';
import { isNull } from 'drizzle-orm';
import WlbDropdown from 'components/WlbDropdown';
import {
  createWorkout,
  deleteWorkout,
  duplicateWorkout,
  getActiveWorkout,
} from 'db/mutation';
import WlbEmptyState from 'components/WlbEmptyState';
import WlbSection from 'components/WlbSection';
import ActiveWorkoutModal from 'components/ActiveWorkoutModal';

export default function WorkoutTab() {
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const { data: workouts } = useLiveQuery(
    db.query.workouts.findMany({
      where: isNull(schema.workouts.startedAt),
      with: {
        exerciseGroups: {
          with: {
            exercise: true,
          },
        },
      },
    }),
  );

  const handleStartWorkout = async (
    startAction: () => Promise<number | undefined>,
  ) => {
    const activeWorkout = await getActiveWorkout();
    const executeAction = () =>
      startAction().then((id) => id && router.push(`/workouts/${id}`));

    if (activeWorkout) {
      setPendingAction(() => executeAction);
    } else {
      executeAction();
    }
  };

  return (
    <WlbScreenPage header={<WlbHeader title="Workout" />}>
      <WlbButton
        onPress={() => {
          handleStartWorkout(createWorkout);
        }}
        title="Start an empty workout"
      />
      <WlbSection title="Templates">
        <WlbButton
          size="small"
          icon="folder"
          onPress={() => {}}
          color="subAlt"
        />
        <WlbButton
          size="small"
          title="Template"
          icon="plus"
          onPress={() => router.push('workouts/new')}
          color="subAlt"
        />
      </WlbSection>
      {workouts?.length === 0 && (
        <WlbEmptyState
          onPress={() => router.push('workouts/new')}
          description="Add a template"
        />
      )}
      {workouts?.map((workout) => (
        <WlbCard
          key={workout.id}
          title={workout.name}
          titleRight={
            <WlbDropdown
              triggerComponent={({ onPress }) => (
                <WlbButton
                  onPress={onPress}
                  icon="dots-horizontal"
                  size="small"
                />
              )}
              options={[
                {
                  icon: 'pencil',
                  label: 'Edit Template',
                  onPress: () => router.push(`/workouts/${workout.id}`),
                },
                {
                  icon: 'content-copy',
                  label: 'Duplicate Template',
                  onPress: () => duplicateWorkout(workout.id),
                },
                {
                  icon: 'delete',
                  label: 'Delete Template',
                  onPress: () => deleteWorkout(workout.id),
                },
              ]}
            />
          }
          onPress={() =>
            handleStartWorkout(() => duplicateWorkout(workout.id, true))
          }
        >
          {workout.exerciseGroups.length > 0 ? (
            <WlbText>
              {workout.exerciseGroups
                .map((exerciseGroups) => exerciseGroups.exercise.name)
                .join(', ')}
            </WlbText>
          ) : (
            <WlbText>No exercises</WlbText>
          )}
        </WlbCard>
      ))}

      {pendingAction && (
        <ActiveWorkoutModal
          visible={!!pendingAction}
          close={() => setPendingAction(null)}
          onConfirm={pendingAction}
        />
      )}
    </WlbScreenPage>
  );
}
