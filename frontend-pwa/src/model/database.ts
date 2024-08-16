import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import { Database, appSchema } from '@nozbe/watermelondb';
import { Workout, workoutSchema } from './Workout';
import { schemaMigrations } from '@nozbe/watermelondb/Schema/migrations';
import { Exercise, exerciseSchema } from './Exercise';
import { ExerciseGroup, exerciseGroupSchema } from './ExerciseGroup';
import { ExerciseRow, exerciseRowSchema } from './ExerciseRow';

const schema = appSchema({
  version: 1,
  tables: [
    workoutSchema,
    exerciseGroupSchema,
    exerciseRowSchema,
    exerciseSchema,
  ],
});

const migrations = schemaMigrations({
  migrations: [],
});

const adapter = new LokiJSAdapter({
  schema,
  migrations,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
  dbName: 'workout_logbook',

  // --- Optional, but recommended event handlers:

  onQuotaExceededError: () => {
    // Browser ran out of disk space -- offer the user to reload the app or log out
  },
  onSetUpError: () => {
    // Database failed to load -- offer the user to reload the app or log out
  },
  extraIncrementalIDBOptions: {
    onDidOverwrite: () => {
      // Called when this adapter is forced to overwrite contents of IndexedDB.
      // This happens if there's another open tab of the same app that's making changes.
      // Try to synchronize the app now, and if user is offline, alert them that if they close this
      // tab, some data may be lost
    },
    onversionchange: () => {
      // database was deleted in another browser tab (user logged out), so we must make sure we delete
      // it in this tab as well - usually best to just refresh the page
    },
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Workout, ExerciseGroup, ExerciseRow, Exercise],
});
