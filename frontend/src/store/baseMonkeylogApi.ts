import { emptyMonkeylogApi as api } from './emptyMonkeylogApi';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProgram: build.query<GetProgramResponse, GetProgramArg>({
      query: (queryArg) => ({ url: `/programs/${queryArg.id}` }),
    }),
    updateProgram: build.mutation<UpdateProgramResponse, UpdateProgramArg>({
      query: (queryArg) => ({
        url: `/programs/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.programUpdateRequest,
      }),
    }),
    deleteProgram: build.mutation<DeleteProgramResponse, DeleteProgramArg>({
      query: (queryArg) => ({ url: `/programs/${queryArg.id}`, method: 'DELETE' }),
    }),
    allWorkouts: build.query<AllWorkoutsResponse, AllWorkoutsArg>({
      query: (queryArg) => ({ url: `/workouts`, params: { type: queryArg.type } }),
    }),
    createWorkout: build.mutation<CreateWorkoutResponse, CreateWorkoutArg>({
      query: (queryArg) => ({
        url: `/workouts`,
        method: 'POST',
        body: queryArg.workoutCreateRequest,
      }),
    }),
    saveExerciseGroup: build.mutation<SaveExerciseGroupResponse, SaveExerciseGroupArg>({
      query: (queryArg) => ({
        url: `/workouts/${queryArg.workoutId}/exercise-groups`,
        method: 'POST',
        body: queryArg.exerciseGroupCreateRequest,
      }),
    }),
    startWorkout: build.mutation<StartWorkoutResponse, StartWorkoutArg>({
      query: (queryArg) => ({ url: `/workouts/${queryArg.id}/start`, method: 'POST' }),
    }),
    duplicateWorkout: build.mutation<DuplicateWorkoutResponse, DuplicateWorkoutArg>({
      query: (queryArg) => ({ url: `/workouts/${queryArg.id}/duplicate`, method: 'POST' }),
    }),
    startEmptyWorkout: build.mutation<StartEmptyWorkoutResponse, StartEmptyWorkoutArg>({
      query: () => ({ url: `/workouts/start`, method: 'POST' }),
    }),
    completeWorkout: build.mutation<CompleteWorkoutResponse, CompleteWorkoutArg>({
      query: () => ({ url: `/workouts/complete`, method: 'POST' }),
    }),
    allPrograms: build.query<AllProgramsResponse, AllProgramsArg>({
      query: () => ({ url: `/programs` }),
    }),
    createProgram: build.mutation<CreateProgramResponse, CreateProgramArg>({
      query: (queryArg) => ({
        url: `/programs`,
        method: 'POST',
        body: queryArg.programCreateRequest,
      }),
    }),
    createProgramWeek: build.mutation<CreateProgramWeekResponse, CreateProgramWeekArg>({
      query: (queryArg) => ({
        url: `/programs/${queryArg.id}/program-weeks`,
        method: 'POST',
        body: queryArg.programWeekCreateRequest,
      }),
    }),
    allMeasurements: build.query<AllMeasurementsResponse, AllMeasurementsArg>({
      query: () => ({ url: `/measurements` }),
    }),
    createMeasurement: build.mutation<CreateMeasurementResponse, CreateMeasurementArg>({
      query: (queryArg) => ({
        url: `/measurements`,
        method: 'POST',
        body: queryArg.measurementCreateRequest,
      }),
    }),
    createPoint: build.mutation<CreatePointResponse, CreatePointArg>({
      query: (queryArg) => ({
        url: `/measurements/${queryArg.id}/measurement-points`,
        method: 'POST',
        body: queryArg.measurementPointCreateRequest,
      }),
    }),
    allExercises: build.query<AllExercisesResponse, AllExercisesArg>({
      query: () => ({ url: `/exercises` }),
    }),
    saveExercise: build.mutation<SaveExerciseResponse, SaveExerciseArg>({
      query: (queryArg) => ({
        url: `/exercises`,
        method: 'POST',
        body: queryArg.exerciseCreateRequest,
      }),
    }),
    addRow: build.mutation<AddRowResponse, AddRowArg>({
      query: (queryArg) => ({ url: `/exercise-groups/${queryArg.id}/add-row`, method: 'POST' }),
    }),
    deleteMeasurement: build.mutation<DeleteMeasurementResponse, DeleteMeasurementArg>({
      query: (queryArg) => ({ url: `/measurements/${queryArg.id}`, method: 'DELETE' }),
    }),
    updateMeasurement: build.mutation<UpdateMeasurementResponse, UpdateMeasurementArg>({
      query: (queryArg) => ({
        url: `/measurements/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.measurementUpdateRequest,
      }),
    }),
    deletePoint: build.mutation<DeletePointResponse, DeletePointArg>({
      query: (queryArg) => ({ url: `/measurement-points/${queryArg.id}`, method: 'DELETE' }),
    }),
    updatePoint: build.mutation<UpdatePointResponse, UpdatePointArg>({
      query: (queryArg) => ({
        url: `/measurement-points/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.measurementPointUpdateRequest,
      }),
    }),
    getExercise: build.query<GetExerciseResponse, GetExerciseArg>({
      query: (queryArg) => ({ url: `/exercises/${queryArg.id}` }),
    }),
    deleteExercise: build.mutation<DeleteExerciseResponse, DeleteExerciseArg>({
      query: (queryArg) => ({ url: `/exercises/${queryArg.id}`, method: 'DELETE' }),
    }),
    updateExercise: build.mutation<UpdateExerciseResponse, UpdateExerciseArg>({
      query: (queryArg) => ({
        url: `/exercises/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.exerciseUpdateRequest,
      }),
    }),
    deleteRow: build.mutation<DeleteRowResponse, DeleteRowArg>({
      query: (queryArg) => ({ url: `/exercise-rows/${queryArg.id}`, method: 'DELETE' }),
    }),
    updateRow: build.mutation<UpdateRowResponse, UpdateRowArg>({
      query: (queryArg) => ({
        url: `/exercise-rows/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.exerciseRowUpdateRequest,
      }),
    }),
    updateRowField: build.mutation<UpdateRowFieldResponse, UpdateRowFieldArg>({
      query: (queryArg) => ({
        url: `/exercise-row-fields/${queryArg.exerciseRowFieldId}`,
        method: 'PATCH',
        body: queryArg.exerciseRowFieldUpdateRequest,
      }),
    }),
    getWorkout: build.query<GetWorkoutResponse, GetWorkoutArg>({
      query: (queryArg) => ({ url: `/workouts/${queryArg.id}` }),
    }),
    deleteWorkout: build.mutation<DeleteWorkoutResponse, DeleteWorkoutArg>({
      query: (queryArg) => ({ url: `/workouts/${queryArg.id}`, method: 'DELETE' }),
    }),
    getActiveWorkout: build.query<GetActiveWorkoutResponse, GetActiveWorkoutArg>({
      query: () => ({ url: `/workouts/active` }),
    }),
    getExerciseTypes: build.query<GetExerciseTypesResponse, GetExerciseTypesArg>({
      query: () => ({ url: `/exercise-types` }),
    }),
    deleteProgramWeek: build.mutation<DeleteProgramWeekResponse, DeleteProgramWeekArg>({
      query: (queryArg) => ({ url: `/program-weeks/${queryArg.id}`, method: 'DELETE' }),
    }),
    deleteExerciseGroup: build.mutation<DeleteExerciseGroupResponse, DeleteExerciseGroupArg>({
      query: (queryArg) => ({ url: `/exercise-groups/${queryArg.id}`, method: 'DELETE' }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as baseMonkeylogApi };
export type GetProgramResponse = /** status 200 OK */ ProgramResponse;
export type GetProgramArg = {
  id: number;
};
export type UpdateProgramResponse = /** status 200 OK */ ProgramResponse;
export type UpdateProgramArg = {
  id: number;
  programUpdateRequest: ProgramUpdateRequest;
};
export type DeleteProgramResponse = unknown;
export type DeleteProgramArg = {
  id: number;
};
export type AllWorkoutsResponse = /** status 200 OK */ WorkoutFullResponse[];
export type AllWorkoutsArg = {
  type: 'TEMPLATE' | 'ACTIVE' | 'COMPLETED';
};
export type CreateWorkoutResponse = /** status 200 OK */ WorkoutResponse;
export type CreateWorkoutArg = {
  workoutCreateRequest: WorkoutCreateRequest;
};
export type SaveExerciseGroupResponse = unknown;
export type SaveExerciseGroupArg = {
  workoutId: number;
  exerciseGroupCreateRequest: ExerciseGroupCreateRequest;
};
export type StartWorkoutResponse = /** status 200 OK */ WorkoutResponse;
export type StartWorkoutArg = {
  id: number;
};
export type DuplicateWorkoutResponse = /** status 200 OK */ WorkoutResponse;
export type DuplicateWorkoutArg = {
  id: number;
};
export type StartEmptyWorkoutResponse = /** status 200 OK */ WorkoutResponse;
export type StartEmptyWorkoutArg = void;
export type CompleteWorkoutResponse = /** status 200 OK */ WorkoutResponse;
export type CompleteWorkoutArg = void;
export type AllProgramsResponse = /** status 200 OK */ ProgramResponse[];
export type AllProgramsArg = void;
export type CreateProgramResponse = /** status 200 OK */ ProgramResponse;
export type CreateProgramArg = {
  programCreateRequest: ProgramCreateRequest;
};
export type CreateProgramWeekResponse = /** status 200 OK */ ProgramWeekResponse;
export type CreateProgramWeekArg = {
  id: number;
  programWeekCreateRequest: ProgramWeekCreateRequest;
};
export type AllMeasurementsResponse = /** status 200 OK */ MeasurementFullResponse[];
export type AllMeasurementsArg = void;
export type CreateMeasurementResponse = /** status 200 OK */ MeasurementResponse;
export type CreateMeasurementArg = {
  measurementCreateRequest: MeasurementCreateRequest;
};
export type CreatePointResponse = /** status 200 OK */ MeasurementPointResponse;
export type CreatePointArg = {
  id: number;
  measurementPointCreateRequest: MeasurementPointCreateRequest;
};
export type AllExercisesResponse = /** status 200 OK */ ExerciseResponse[];
export type AllExercisesArg = void;
export type SaveExerciseResponse = /** status 200 OK */ ExerciseResponse;
export type SaveExerciseArg = {
  exerciseCreateRequest: ExerciseCreateRequest;
};
export type AddRowResponse = /** status 200 OK */ ExerciseGroupResponse;
export type AddRowArg = {
  id: number;
};
export type DeleteMeasurementResponse = unknown;
export type DeleteMeasurementArg = {
  id: number;
};
export type UpdateMeasurementResponse = /** status 200 OK */ MeasurementResponse;
export type UpdateMeasurementArg = {
  id: number;
  measurementUpdateRequest: MeasurementUpdateRequest;
};
export type DeletePointResponse = unknown;
export type DeletePointArg = {
  id: number;
};
export type UpdatePointResponse = /** status 200 OK */ MeasurementPointResponse;
export type UpdatePointArg = {
  id: number;
  measurementPointUpdateRequest: MeasurementPointUpdateRequest;
};
export type GetExerciseResponse = /** status 200 OK */ ExerciseResponse;
export type GetExerciseArg = {
  id: number;
};
export type DeleteExerciseResponse = unknown;
export type DeleteExerciseArg = {
  id: number;
};
export type UpdateExerciseResponse = /** status 200 OK */ ExerciseResponse;
export type UpdateExerciseArg = {
  id: number;
  exerciseUpdateRequest: ExerciseUpdateRequest;
};
export type DeleteRowResponse = unknown;
export type DeleteRowArg = {
  id: number;
};
export type UpdateRowResponse = /** status 200 OK */ ExerciseRowResponse;
export type UpdateRowArg = {
  id: number;
  exerciseRowUpdateRequest: ExerciseRowUpdateRequest;
};
export type UpdateRowFieldResponse = /** status 200 OK */ ExerciseRowFieldResponse;
export type UpdateRowFieldArg = {
  exerciseRowFieldId: number;
  exerciseRowFieldUpdateRequest: ExerciseRowFieldUpdateRequest;
};
export type GetWorkoutResponse = /** status 200 OK */ WorkoutFullResponse;
export type GetWorkoutArg = {
  id: number;
};
export type DeleteWorkoutResponse = unknown;
export type DeleteWorkoutArg = {
  id: number;
};
export type GetActiveWorkoutResponse = /** status 200 OK */ WorkoutResponse;
export type GetActiveWorkoutArg = void;
export type GetExerciseTypesResponse = /** status 200 OK */ ExerciseTypeResponse[];
export type GetExerciseTypesArg = void;
export type DeleteProgramWeekResponse = unknown;
export type DeleteProgramWeekArg = {
  id: number;
};
export type DeleteExerciseGroupResponse = unknown;
export type DeleteExerciseGroupArg = {
  id: number;
};
export type ProgramWeekResponse = {
  id: number;
  name: string;
};
export type ProgramResponse = {
  id: number;
  name: string;
  description: string;
  programWeeks: ProgramWeekResponse[];
};
export type ProgramUpdateRequest = {
  name: string;
  description: string;
};
export type ExerciseFieldResponse = {
  id: number;
  type: string;
};
export type ExerciseTypeResponse = {
  id: number;
  name: string;
  exerciseFields: ExerciseFieldResponse[];
};
export type ExerciseResponse = {
  id: number;
  name: string;
  exerciseType: ExerciseTypeResponse;
};
export type ExerciseRowFieldResponse = {
  id: number;
  value?: string;
  exerciseField: ExerciseFieldResponse;
};
export type ExerciseRowResponse = {
  id: number;
  exerciseRowFields: ExerciseRowFieldResponse[];
  isLifted: boolean;
};
export type ExerciseGroupResponse = {
  id: number;
  exercise: ExerciseResponse;
  exerciseRows: ExerciseRowResponse[];
};
export type WorkoutFullResponse = {
  id: number;
  name: string;
  note: string;
  type: 'TEMPLATE' | 'ACTIVE' | 'COMPLETED';
  startDate?: string;
  endDate?: string;
  exerciseGroups: ExerciseGroupResponse[];
};
export type WorkoutResponse = {
  id: number;
  name: string;
  note: string;
  type: 'TEMPLATE' | 'ACTIVE' | 'COMPLETED';
  startDate?: string;
  endDate?: string;
};
export type WorkoutCreateRequest = {
  name: string;
  programWeekId?: number;
};
export type ExerciseGroupCreateRequest = {
  exerciseIds: number[];
};
export type ProgramCreateRequest = {
  name: string;
  description: string;
};
export type ProgramWeekCreateRequest = {
  name: string;
};
export type MeasurementPointResponse = {
  id: number;
  value: number;
  createdAt: string;
};
export type MeasurementFullResponse = {
  id: number;
  name: string;
  unit: string;
  measurementPoints: MeasurementPointResponse[];
};
export type MeasurementResponse = {
  id: number;
  name: string;
  unit: string;
};
export type MeasurementCreateRequest = {
  name: string;
  unit: string;
};
export type MeasurementPointCreateRequest = {
  value: number;
};
export type ExerciseCreateRequest = {
  name: string;
  exerciseTypeId: number;
};
export type MeasurementUpdateRequest = {
  name: string;
  unit: string;
};
export type MeasurementPointUpdateRequest = {
  value: number;
};
export type ExerciseUpdateRequest = {
  name: string;
};
export type ExerciseRowUpdateRequest = {
  isLifted: boolean;
};
export type ExerciseRowFieldUpdateRequest = {
  value?: string;
};
