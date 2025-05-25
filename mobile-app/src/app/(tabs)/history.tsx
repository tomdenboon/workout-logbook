import { WlbHeader, WlbScreenPage } from 'components/WlbPage';
import { View, Text, SectionList } from 'react-native';
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

type Workout = InferSelectModel<typeof schema.workouts>;

function WorkoutCard({ workout }: { workout: Workout }) {
  const workoutDetails = useLiveQuery(
    db.query.workouts.findFirst({
      where: eq(schema.workouts.id, workout.id),
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

  if (!workoutDetails?.data) {
    return (
      <WlbCard title={workout.name}>
        <WlbText>Loading...</WlbText>
      </WlbCard>
    );
  }

  const totalVolume = calculateTotalVolume(workoutDetails.data.exerciseGroups);

  return (
    <WlbCard
      title={workout.name}
      onPress={() => {}}
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
              onPress: () => router.push(`/workouts/${workout.id}`),
            },
            {
              label: 'Delete',
              onPress: () => deleteWorkout(workout.id),
            },
          ]}
        />
      }
    >
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <WlbText color="sub">
            {new Date(workout.completedAt as number).toLocaleTimeString(
              'en-US',
              {
                hour: 'numeric',
                minute: '2-digit',
              },
            )}
          </WlbText>
          {workout.startedAt && (
            <WlbTimer start={workout.startedAt} end={workout.completedAt} />
          )}
        </View>

        {totalVolume > 0 && (
          <WlbText>Total Volume: {Math.round(totalVolume)} kg</WlbText>
        )}

        <View style={{ gap: 4 }}>
          {workoutDetails.data.exerciseGroups.map((group) => (
            <View
              key={group.id}
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <WlbText>{group.exercise.name}</WlbText>
              <WlbText color="sub">{group.exerciseRows.length} sets</WlbText>
            </View>
          ))}
        </View>
      </View>
    </WlbCard>
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
          renderItem={({ item }) => <WorkoutCard workout={item} />}
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
