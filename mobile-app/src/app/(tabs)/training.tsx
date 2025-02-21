import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';
import { router, Tabs } from 'expo-router';
import WlbButton from '../../components/WlbButton';
import { database } from '../../model/database';
import useSubscribe from '../../hooks/useSubscribe';
import WlbCard from '../../components/WlbCard';
import { Workout } from '../../model/Workout';
import WlbText from '../../components/WlbText';
import WlbView from '../../components/WlbView';
import WlbPage from '../../components/WlbPage';

export default function TrainingTab() {
  const [active, setActive] = useState(false);

  const workouts = useSubscribe(
    database.get<Workout>('workouts').query().observe(),
  );

  return (
    <WlbView>
      <WlbPage title="Start workout">
        <View style={{ gap: 12 }}>
          <WlbButton
            onPress={() => router.push('workouts/new')}
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
                onPress={() => setActive(!active)}
                variant="secondary"
              />
              <WlbButton
                size="small"
                title="Template"
                icon="add"
                onPress={() => setActive(!active)}
                variant="secondary"
              />
            </View>
          </View>
          {workouts?.map((workout) => (
            <WlbCard
              key={workout.id}
              title={workout.name}
              content={''}
              onPress={() => router.push(`/workouts/${workout.id}`)}
            />
          ))}
        </View>
      </WlbPage>
    </WlbView>
  );
}
