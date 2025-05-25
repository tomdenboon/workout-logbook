import React, { useState } from 'react';
import { WlbModalPage, WlbScreenPage } from 'components/WlbPage';
import { SectionList, View, ScrollView } from 'react-native';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import db from 'db';
import WlbCard from 'components/WlbCard';
import WlbText from 'components/WlbText';
import { desc, isNotNull, eq } from 'drizzle-orm';
import * as schema from 'db/schema';
import groupBy from 'groupBy';
import WlbDropdown from 'components/WlbDropdown';
import { deleteWorkout } from 'db/mutation';
import { router } from 'expo-router';
import WlbButton from 'components/WlbButton';
import WlbTimer from 'components/WlbTimer';
import { InferSelectModel } from 'drizzle-orm';
import { ExerciseRow } from 'db/types';
import { ExerciseCategory } from 't';

type Workout = InferSelectModel<typeof schema.workouts>;

function exerciseRowToText(
  exerciseCategory: ExerciseCategory,
  row: ExerciseRow,
) {
  if (exerciseCategory === 'weighted') {
    return `${row.weight} kg x ${row.reps} reps`;
  }
  if (exerciseCategory === 'duration') {
    return `${row.time}s`;
  }
  if (exerciseCategory === 'distance') {
    return `${row.distance}m in ${row.time}s`;
  }
  if (exerciseCategory === 'reps') {
    return `${row.reps} reps`;
  }
  return '';
}

function WorkoutCard({ workoutId }: { workoutId: number }) {
  const [showDetails, setShowDetails] = useState(false);
  const { data: workoutDetails } = useLiveQuery(
    db.query.workouts.findFirst({
      where: eq(schema.workouts.id, workoutId),
      with: {
        exerciseGroups: {
          with: {
            exercise: true,
            exerciseRows: true,
          },
        },
      },
    }),
  );

  const calculateTotalVolume = (exerciseGroups: any[]) => {
    return exerciseGroups.reduce((total, group) => {
      if (group.exercise.type === 'weighted') {
        const groupVolume = group.exerciseRows.reduce(
          (sum: number, row: any) => {
            if (row.weight && row.reps) {
              return sum + row.weight * row.reps;
            }
            return sum;
          },
          0,
        );
        return total + groupVolume;
      }
      return total;
    }, 0);
  };

  if (!workoutDetails) {
    return (
      <WlbCard title="Loading...">
        <WlbText>Loading...</WlbText>
      </WlbCard>
    );
  }

  const totalVolume = calculateTotalVolume(workoutDetails.exerciseGroups);
  const completedDate = new Date(workoutDetails.completedAt as number);
  const currentYear = new Date().getFullYear();
  const isCurrentYear = completedDate.getFullYear() === currentYear;

  const formatDate = () => {
    return completedDate.toLocaleTimeString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: isCurrentYear ? undefined : 'long',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <>
      <WlbCard
        title={workoutDetails.name}
        onPress={() => setShowDetails(true)}
        titleRight={
          <WlbDropdown
            triggerComponent={({ onPress }) => (
              <WlbButton
                onPress={onPress}
                variant="primary"
                size="small"
                icon="keyboard-control"
              />
            )}
            options={[
              {
                label: 'Edit',
                onPress: () => router.push(`/workouts/${workoutId}`),
              },
              {
                label: 'Delete',
                onPress: () => deleteWorkout(workoutId),
              },
            ]}
          />
        }
      >
        <View style={{ gap: 8 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <WlbText color="sub">{formatDate()}</WlbText>
            {workoutDetails.startedAt && (
              <WlbTimer
                start={workoutDetails.startedAt}
                end={workoutDetails.completedAt}
              />
            )}
          </View>

          {totalVolume > 0 && (
            <WlbText>Total Volume: {Math.round(totalVolume)} kg</WlbText>
          )}

          <View style={{ gap: 4 }}>
            {workoutDetails.exerciseGroups.map((group) => (
              <View
                key={group.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <WlbText>{group.exercise.name}</WlbText>
                <WlbText color="sub">{group.exerciseRows.length} sets</WlbText>
              </View>
            ))}
          </View>
        </View>
      </WlbCard>

      <WlbModalPage
        visible={showDetails}
        close={() => setShowDetails(false)}
        headerLeft={
          <WlbButton
            variant="secondary"
            icon="close"
            size="small"
            onPress={() => setShowDetails(false)}
          />
        }
        headerBottom={
          <View style={{ gap: 8 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <WlbText color="sub">{formatDate()}</WlbText>
              {workoutDetails.startedAt && (
                <WlbTimer
                  start={workoutDetails.startedAt}
                  end={workoutDetails.completedAt}
                />
              )}
            </View>

            {totalVolume > 0 && (
              <WlbText>Total Volume: {Math.round(totalVolume)} kg</WlbText>
            )}
          </View>
        }
        title={workoutDetails.name}
      >
        <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
          {workoutDetails.exerciseGroups.map((group) => (
            <View key={group.id} style={{ gap: 8 }}>
              <WlbText fontWeight="bold">{group.exercise.name}</WlbText>
              <View style={{ gap: 4 }}>
                {group.exerciseRows.map((row, index) => (
                  <View
                    key={row.id}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <WlbText color="sub">Set {index + 1}</WlbText>
                    <WlbText>
                      {exerciseRowToText(group.exercise.type, row)}
                    </WlbText>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </WlbModalPage>
    </>
  );
}

export default function History() {
  const workouts = useLiveQuery(
    db.query.workouts.findMany({
      where: isNotNull(schema.workouts.completedAt),
      orderBy: desc(schema.workouts.completedAt),
    }),
  );

  const groupedWorkouts = groupBy(workouts?.data ?? [], (workout) =>
    new Date(workout.completedAt as number).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    }),
  );

  return (
    <WlbScreenPage title="History">
      {groupedWorkouts.length > 0 ? (
        <SectionList
          style={{
            padding: 16,
          }}
          sections={groupedWorkouts}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => <WorkoutCard workoutId={item.id} />}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }) => (
            <WlbText color="sub">{section.title}</WlbText>
          )}
        />
      ) : (
        <View style={{ padding: 16, alignItems: 'center', gap: 16 }}>
          <WlbText>You haven't completed any workouts yet.</WlbText>
          <WlbButton
            title="Add Workout"
            onPress={() => router.push('/workouts')}
          />
        </View>
      )}
    </WlbScreenPage>
  );
}
