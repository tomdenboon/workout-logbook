import { Workout } from './Workout';

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
