import WlbPage, { WlbHeader } from 'components/WlbPage';
import WlbView from 'components/WlbView';
import { View, Text, SectionList } from 'react-native';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import db from 'db';
import WlbCard from 'components/WlbCard';
import WlbText from 'components/WlbText';
import { isNotNull } from 'drizzle-orm';
import * as schema from 'db/schema';
import groupBy from 'groupBy';
import WlbDropdown from 'components/WlbDropdown';
import { deleteWorkout } from 'db/mutation';
import { router } from 'expo-router';

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
    }),
  );

  const groupedWorkouts = groupBy(
    workouts?.data ?? [],
    (workout) =>
      new Date(workout.completedAt as number).toISOString().split('T')[0],
  );

  return (
    <WlbView>
      <WlbHeader title="History" />
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
                triggerProps={{
                  variant: 'primary',
                  size: 'small',
                  icon: 'keyboard-control',
                }}
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
    </WlbView>
  );
}
