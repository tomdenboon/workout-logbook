import { ExerciseCategory, ExerciseField, ExerciseRow } from 'db/types';
import { SQL, sql } from 'drizzle-orm';
import * as schema from 'db/schema';

export const EXERCISE_CATEGORIES: Record<ExerciseCategory, string> = {
  reps: 'Reps',
  weighted: 'Weighted',
  duration: 'Duration',
  distance: 'Distance',
};

export const VALID_FIELDS: Record<ExerciseCategory, ExerciseField[]> = {
  reps: ['reps'],
  weighted: ['weight', 'reps'],
  duration: ['time'],
  distance: ['time', 'distance'],
};

export interface CalculationType {
  label: string;
  sqlValue: SQL;
  field: string;
  getValue: (row: ExerciseRow) => number;
}

export type AggregationFields =
  | 'weight'
  | 'reps'
  | 'oneRm'
  | 'volume'
  | 'time'
  | 'distance'
  | 'pace';

export const CALCULATION_TYPES: Record<AggregationFields, CalculationType> = {
  weight: {
    label: 'Weight',
    field: 'weight',
    sqlValue: sql<number>`${schema.exerciseRows.weight}`,
    getValue: (row) => row.weight || 0,
  },
  reps: {
    label: 'Reps',
    field: 'reps',
    sqlValue: sql<number>`${schema.exerciseRows.reps}`,
    getValue: (row) => row.reps || 0,
  },
  oneRm: {
    label: '1RM',
    field: 'weight',
    sqlValue: sql<number>`${schema.exerciseRows.weight} * (1 + ${schema.exerciseRows.reps} / 30.0)`,
    getValue: (row) => (row.weight || 0) * (1 + (row.reps || 0) / 30.0),
  },
  volume: {
    label: 'Volume',
    field: 'weight',
    sqlValue: sql<number>`${schema.exerciseRows.weight} * ${schema.exerciseRows.reps}`,
    getValue: (row) => (row.weight || 0) * (row.reps || 0),
  },
  time: {
    label: 'Time',
    field: 'time',
    sqlValue: sql<number>`${schema.exerciseRows.time}`,
    getValue: (row) => row.time || 0,
  },
  distance: {
    label: 'Distance',
    field: 'distance',
    sqlValue: sql<number>`${schema.exerciseRows.distance}`,
    getValue: (row) => row.distance || 0,
  },
  pace: {
    label: 'Pace',
    field: 'distance',
    sqlValue: sql<number>`${schema.exerciseRows.distance} / ${schema.exerciseRows.time}`,
    getValue: (row) => (row.distance || 0) / (row.time || 1),
  },
};
