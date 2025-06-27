import { FlatList, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import WlbButton from 'components/WlbButton';
import WlbCard from 'components/WlbCard';
import { WlbModalPage, WlbScreenPage, WlbHeader } from 'components/WlbPage';
import WlbText from 'components/WlbText';
import db from 'db';
import * as schema from 'db/schema';
import { isNull } from 'drizzle-orm';
import WlbDropdown from 'components/WlbDropdown';
import { createWorkout, deleteWorkout, duplicateWorkout } from 'db/mutation';
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
    <WlbScreenPage header={<WlbHeader title="Start workout" />}>
      <WlbButton
        onPress={() => {
          createWorkout().then((id) => {
            router.push(`/workouts/${id}`);
          });
        }}
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
            color="subAlt"
          />
          <WlbButton
            size="small"
            title="Template"
            icon="add"
            onPress={() => router.push('workouts/new')}
            color="subAlt"
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
                  icon="keyboard-control"
                  size="small"
                />
              )}
              options={[
                {
                  icon: 'edit',
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
          onPress={() => setSelectedTemplate(workout)}
        >
          <WlbText>
            {workout.exerciseGroups
              .map((exerciseGroups) => exerciseGroups.exercise.name)
              .join(', ')}
          </WlbText>
        </WlbCard>
      ))}
      {selectedTemplate && (
        <WlbModalPage
          visible={!!selectedTemplate}
          close={() => setSelectedTemplate(undefined)}
          header={<WlbHeader title={selectedTemplate.name} />}
        >
          <WlbButton
            title="Start workout"
            onPress={() => {
              duplicateWorkout(selectedTemplate.id, true).then((id) => {
                if (!id) {
                  return;
                }

                setSelectedTemplate(undefined);
                router.push(`/workouts/${id}`);
              });
            }}
          />
        </WlbModalPage>
      )}
    </WlbScreenPage>
  );
}
