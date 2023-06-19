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
