import { Exercise, ExerciseField } from './Exercise';

export type WorkoutSmall = {
  id: number;
  name: string;
  note: string;
  startDate: string;
  endDate: string;
  type: WorkoutType;
};

export type Workout = WorkoutSmall & {
  exerciseGroups: Array<ExerciseGroup>;
};

export enum WorkoutType {
  Template = 'TEMPLATE',
  Active = 'ACTIVE',
  Complete = 'COMPLETED',
}

export type ExerciseGroup = {
  id: number;
  exercise: Exercise;
  exerciseRows: Array<ExerciseRow>;
};

export type ExerciseRow = {
  id: number;
  exerciseRowFields: Array<ExerciseRowField>;
  isLifted: boolean;
};

export type ExerciseRowPatch = {
  id: number;
  isLifted: boolean;
};

export type ExerciseRowField = {
  id: number;
  exerciseField: ExerciseField;
  value: string | null;
};

export type ExerciseRowFieldPatch = {
  id: number;
  value: string | null;
};
