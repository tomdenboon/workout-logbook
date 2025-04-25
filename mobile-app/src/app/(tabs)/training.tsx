import { FlatList, View } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import WlbButton from 'components/WlbButton';
import WlbCard from 'components/WlbCard';
import WlbPage from 'components/WlbPage';
import WlbText from 'components/WlbText';
import WlbView from 'components/WlbView';
import db from 'db';
import * as schema from 'db/schema';
import { isNull } from 'drizzle-orm';
import WlbDropdown from 'components/WlbDropdown';
import { createWorkout, deleteWorkout, duplicateWorkout } from 'db/mutation';
import WlbModal from 'components/WlbModal';
import { Workout } from 'db/types';

export default function TrainingTab() {
  const [selectedTemplate, setSelectedTemplate] = useState<Workout>();
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

  return (
    <WlbView>
      <WlbPage title="Start workout">
        <View style={{ gap: 12 }}>
          <WlbButton
            onPress={() => {
              createWorkout().then((id) => {
                router.push(`/workouts/${id}`);
              });
            }}
            variant={'primary'}
            title="Start an empty workout"
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <WlbText>Templates</WlbText>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <WlbButton
                size="small"
                icon="folder"
                onPress={() => {}}
                variant="secondary"
              />
              <WlbButton
                size="small"
                title="Template"
                icon="add"
                onPress={() => router.push('workouts/new')}
                variant="secondary"
              />
            </View>
          </View>

          {workouts?.map((workout) => (
            <WlbCard
              key={workout.id}
              title={workout.name}
              titleRight={
                <WlbDropdown
                  triggerComponent={({ onPress }) => (
                    <WlbButton
                      onPress={onPress}
                      variant="primary"
                      icon="keyboard-control"
                      size="small"
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
              onPress={() => setSelectedTemplate(workout)}
            >
              <WlbText>{workout.exerciseGroups.length} exercises</WlbText>
            </WlbCard>
          ))}
        </View>
        {selectedTemplate && (
          <WlbModal
            visible={!!selectedTemplate}
            close={() => setSelectedTemplate(undefined)}
          >
            <WlbPage title={selectedTemplate?.name}>
              <WlbButton
                title="Start workout"
                onPress={() => {
                  if (!selectedTemplate) {
                    return;
                  }

                  duplicateWorkout(selectedTemplate.id, true).then((id) => {
                    if (!id) {
                      return;
                    }

                    setSelectedTemplate(undefined);
                    router.push(`/workouts/${id}`);
                  });
                }}
              />
            </WlbPage>
          </WlbModal>
        )}
      </WlbPage>
    </WlbView>
  );
}
