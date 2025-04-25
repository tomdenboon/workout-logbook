import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import db, { expo } from 'db';
import migrations from '../../drizzle/migrations';
import { ThemeProvider } from 'context/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { seedData } from 'db/seed';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';

const App = () => {
  useDrizzleStudio(expo);
  const { success } = useMigrations(db, migrations);

  useEffect(() => {
    if (!success) {
      return;
    }

    seedData();
  }, [success]);

  return (
    <ThemeProvider>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="workouts/[id]" options={{ headerShown: false }} />
          <Stack.Screen
            name="exercises/[id]"
            options={{ headerShown: false }}
          />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export default App;
