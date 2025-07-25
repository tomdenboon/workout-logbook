import { relations } from 'drizzle-orm';
import {
  integer,
  real,
  sqliteTable,
  text,
  index,
  unique,
} from 'drizzle-orm/sqlite-core';

export const exercises = sqliteTable('exercises', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  type: text().$type<'reps' | 'weighted' | 'duration' | 'distance'>().notNull(),
});

export const exercisesRelations = relations(exercises, ({ many }) => ({
  exerciseGroups: many(exerciseGroups),
}));

export const workouts = sqliteTable(
  'workouts',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    startedAt: integer('started_at'),
    completedAt: integer('completed_at'),
    templateFolderId: integer('template_folder_id').references(
      () => templateFolders.id,
    ),
    photo: text(),
    note: text(),
  },
  (table) => [
    index('started_at_index').on(table.startedAt),
    index('completed_at_index').on(table.completedAt),
  ],
);

export const workoutsRelations = relations(workouts, ({ one, many }) => ({
  exerciseGroups: many(exerciseGroups),
  templateFolder: one(templateFolders, {
    fields: [workouts.templateFolderId],
    references: [templateFolders.id],
  }),
}));

export const exerciseGroups = sqliteTable(
  'exercise_groups',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    exerciseId: integer('exercise_id')
      .notNull()
      .references(() => exercises.id, { onDelete: 'cascade' }),
    workoutId: integer('workout_id')
      .notNull()
      .references(() => workouts.id, { onDelete: 'cascade' }),
  },
  (table) => [
    index('exercise_id_index').on(table.exerciseId),
    index('workout_id_index').on(table.workoutId),
  ],
);

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

export const exerciseRows = sqliteTable(
  'exercise_rows',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    exerciseGroupId: integer('exercise_group_id')
      .notNull()
      .references(() => exerciseGroups.id, { onDelete: 'cascade' }),
    isLifted: integer('is_lifted').notNull(),
    reps: real(),
    weight: real(),
    time: real(),
    distance: real(),
    rpe: real(),
  },
  (table) => [index('exercise_group_id_index').on(table.exerciseGroupId)],
);

export const exerciseRowsRelations = relations(exerciseRows, ({ one }) => ({
  exerciseGroup: one(exerciseGroups, {
    fields: [exerciseRows.exerciseGroupId],
    references: [exerciseGroups.id],
  }),
}));

export const templateFolders = sqliteTable('template_folders', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});

export const templateFoldersRelations = relations(
  templateFolders,
  ({ many }) => ({
    workouts: many(workouts),
  }),
);

export const measurements = sqliteTable('measurements', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  field: text().notNull(),
});

export const measurementsRelations = relations(measurements, ({ many }) => ({
  measurementPoints: many(measurementPoints),
}));

export const measurementPoints = sqliteTable(
  'measurement_points',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    measurementId: integer('measurement_id')
      .notNull()
      .references(() => measurements.id, { onDelete: 'cascade' }),
    date: integer('date').notNull(),
    dateKey: text('date_key').notNull(),
    value: real().notNull(),
  },
  (table) => [unique().on(table.measurementId, table.dateKey)],
);

export const measurementPointsRelations = relations(
  measurementPoints,
  ({ one }) => ({
    measurement: one(measurements, {
      fields: [measurementPoints.measurementId],
      references: [measurements.id],
    }),
  }),
);

export const settings = sqliteTable('settings', {
  id: integer().primaryKey({ autoIncrement: true }),
  key: text().notNull().unique(),
  value: text().notNull(),
});

export const progressPhotos = sqliteTable('progress_photos', {
  id: integer().primaryKey({ autoIncrement: true }),
  photo: text().notNull(),
  date: integer('date').notNull(),
  dateKey: text('date_key').notNull(),
});
