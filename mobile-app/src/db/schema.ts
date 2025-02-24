import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const exercises = sqliteTable('exercises', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  type: text().$type<'reps' | 'weighted' | 'duration' | 'distance'>().notNull(),
});

export const exercisesRelations = relations(exercises, ({ many }) => ({
  exerciseGroups: many(exerciseGroups),
}));

export const workouts = sqliteTable('workouts', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  startedAt: integer('started_at'),
  completedAt: integer('completed_at'),
});

export const workoutsRelations = relations(workouts, ({ many }) => ({
  exerciseGroups: many(exerciseGroups),
}));

export const exerciseGroups = sqliteTable('exercise_groups', {
  id: integer().primaryKey({ autoIncrement: true }),
  exerciseId: integer('exercise_id')
    .notNull()
    .references(() => exercises.id, { onDelete: 'cascade' }),
  workoutId: integer('workout_id')
    .notNull()
    .references(() => workouts.id, { onDelete: 'cascade' }),
});

export const exerciseGroupsRelations = relations(
  exerciseGroups,
  ({ one, many }) => ({
    exercise: one(exercises, {
      fields: [exerciseGroups.exerciseId],
      references: [exercises.id],
    }),
    workout: one(workouts, {
      fields: [exerciseGroups.workoutId],
      references: [workouts.id],
    }),
    exerciseRows: many(exerciseRows),
  }),
);

export const exerciseRows = sqliteTable('exercise_rows', {
  id: integer().primaryKey({ autoIncrement: true }),
  exerciseGroupId: integer('exercise_group_id')
    .notNull()
    .references(() => exerciseGroups.id, { onDelete: 'cascade' }),
  isLifted: integer('is_lifted').notNull(),
  reps: integer(),
  weight: integer(),
  time: integer(),
  distance: integer(),
  rpe: integer(),
});

export const exerciseRowsRelations = relations(exerciseRows, ({ one }) => ({
  exerciseGroup: one(exerciseGroups, {
    fields: [exerciseRows.exerciseGroupId],
    references: [exerciseGroups.id],
  }),
}));
