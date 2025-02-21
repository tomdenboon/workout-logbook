import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
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

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'workout_logbook',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: true /* Platform.OS === 'ios' */,
  // (optional, but you should implement this method)
  onSetUpError: (error) => {
    // Database failed to load -- offer the user to reload the app or log out
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Workout, ExerciseGroup, ExerciseRow, Exercise],
});
