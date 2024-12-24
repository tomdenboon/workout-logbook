import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/react';
import { Exercise } from '../../model/Exercise';
import useSubscribe from '../../hooks/useSubscribe';
import { Tabs } from 'expo-router';
import Button from '../../components/Button';
import ModalForm from '../../components/ModalForm';

export default function ExercisesTab() {
  const database = useDatabase();
  const exercises = useSubscribe(
    database.get<Exercise>('exercises').query().observe(),
  );
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );

  return (
    <View style={styles.container}>
      <Tabs.Screen
        options={{
          headerTitle: 'Exercises',
          headerRight: () => (
            <Button
              title="Add"
              variant="text"
              onPress={() => {
                console.log('Add');
              }}
            />
          ),
        }}
      />
      <ModalForm
        visible={!!selectedExercise}
        close={() => setSelectedExercise(null)}
      >
        <Text>{selectedExercise?.name}</Text>
      </ModalForm>
      {exercises?.map((exercise) => (
        <Pressable
          key={exercise.id}
          onPress={() => setSelectedExercise(exercise)}
        >
          <View style={styles.exerciseItem}>
            <Text key={exercise.id}>{exercise.name}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    gap: 8,
  },
  exerciseItem: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
});
