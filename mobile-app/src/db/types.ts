import { InferSelectModel } from 'drizzle-orm';
import * as schema from './schema';

export type Exercise = InferSelectModel<typeof schema.exercises>;
export type Workout = InferSelectModel<typeof schema.workouts>;
export type ExerciseGroup = InferSelectModel<typeof schema.exerciseGroups>;
export type ExerciseRow = InferSelectModel<typeof schema.exerciseRows>;

export type ExerciseCategory = Exercise['type'];
export type ExerciseField = 'reps' | 'weight' | 'time' | 'distance';

export type ExerciseGroupFull = ExerciseGroup & {
  exercise: Exercise;
  exerciseRows: ExerciseRow[];
};
