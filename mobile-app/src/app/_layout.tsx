import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import * as schema from 'db/schema';
import db from 'db';
import migrations from '../../drizzle/migrations';
import { ThemeProvider } from 'context/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const { success, error } = useMigrations(db, migrations);

  const tt = async () => {
    await db.delete(schema.workouts);
    await db.delete(schema.exerciseGroups);
    await db.delete(schema.exerciseRows);
    await db.delete(schema.measurements);
    await db.delete(schema.measurementPoints);
    await db.delete(schema.exercises);
    await db.insert(schema.exercises).values([
      {
        name: 'Bench Press',
        type: 'weighted',
      },
      {
        name: 'Squat',
        type: 'weighted',
      },
      {
        name: 'Deadlift',
        type: 'weighted',
      },
      {
        name: 'Pull-Up',
        type: 'reps',
      },
      {
        name: 'Push-Up',
        type: 'reps',
      },
    ]);
  };

  useEffect(() => {
    if (!success) {
      return;
    }

    tt();
  }, []);

  return (
    <ThemeProvider>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="workouts/[id]" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export default App;
