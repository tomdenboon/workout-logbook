export type Exercise = {
  id: number;
  name: string;
  exerciseType: ExerciseType;
};

export type ExerciseType = {
  id: number;
  name: string;
  exerciseFields: Array<ExerciseField>;
};

export type ExerciseField = {
  id: number;
  type: ExerciseFieldType;
};

export enum ExerciseFieldType {
  Weight = 'WEIGHT',
  Reps = 'REPS',
  Time = 'TIME',
  Distance = 'DISTANCE',
}

export type ExercisePost = {
  name: string;
  exerciseTypeId: ExerciseType['id'];
};

export type ExercisePatch = {
  id: number;
  name?: string;
};

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

export type ProgramResponse = {
  id: number;
  name: string;
  description: string;
  weeks: ProgramWeekResponse[];
};

export type ProgramWeekResponse = {
  id: number;
  workouts: Workout[];
};
