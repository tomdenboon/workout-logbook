import { WlbHeader, WlbScreenPage } from 'components/WlbPage';
import { View, Text, SectionList } from 'react-native';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import db from 'db';
import WlbCard from 'components/WlbCard';
import WlbText from 'components/WlbText';
import { desc, isNotNull } from 'drizzle-orm';
import * as schema from 'db/schema';
import groupBy from 'groupBy';
import WlbDropdown from 'components/WlbDropdown';
import { deleteWorkout } from 'db/mutation';
import { router } from 'expo-router';
import WlbButton from 'components/WlbButton';

export default function History() {
  const workouts = useLiveQuery(
    db.query.workouts.findMany({
      where: isNotNull(schema.workouts.completedAt),
      with: {
        exerciseGroups: {
          with: {
            exercise: true,
          },
        },
      },
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
          renderItem={({ item }) => (
            <WlbCard
              title={item.name}
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
                      onPress: () => router.push(`/workouts/${item.id}`),
                    },
                    {
                      label: 'Delete',
                      onPress: () => deleteWorkout(item.id),
                    },
                  ]}
                />
              }
            >
              <WlbText>{item.exerciseGroups.length} exercises</WlbText>
            </WlbCard>
          )}
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
