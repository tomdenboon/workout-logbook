import { Q } from '@nozbe/watermelondb';
import React, { useCallback, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { database } from '../model/database';
import { Exercise } from '../model/Exercise';
import { TableName } from '../model/tables';
import { Stack } from 'expo-router';

const DEFAULT_EXERCISES = [
  { name: 'Bench Press', type: 'WEIGHTED', defaultId: '1' },
  { name: 'Squat', type: 'WEIGHTED', defaultId: '2' },
] as const;

const usePopulateDatabase = () => {
  const populateDatabase = useCallback(async () => {
    const exerciseCollection = database.get<Exercise>(TableName.Exercise);
    const defaultExercises = await exerciseCollection
      .query(Q.where('default_id', Q.notEq(null)))
      .fetch();

    database.write(() =>
      database.batch(
        DEFAULT_EXERCISES.map((defaultExercise) => {
          const existingDefaultExercise = defaultExercises.find(
            (e) => e.defaultId === defaultExercise.defaultId,
          );
          if (existingDefaultExercise) {
            return existingDefaultExercise.prepareUpdate((exercise) => {
              exercise.name = defaultExercise.name;
            });
          }

          return exerciseCollection.prepareCreate((exercise) => {
            exercise.name = defaultExercise.name;
            exercise.type = defaultExercise.type;
            exercise.defaultId = defaultExercise.defaultId;
          });
        }),
      ),
    );
  }, []);

  useEffect(() => {
    populateDatabase();
  }, [populateDatabase]);
};

export default function App() {
  usePopulateDatabase();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
