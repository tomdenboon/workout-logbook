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
    getWorkouts: build.query<GetWorkoutsResponse, GetWorkoutsArg>({
      query: (queryArg) => ({
        url: `/workouts`,
        params: {
          page: queryArg.page,
          size: queryArg.size,
          sort: queryArg.sort,
          type: queryArg.type,
          after: queryArg.after,
        },
      }),
    }),
    createWorkout: build.mutation<CreateWorkoutResponse, CreateWorkoutArg>({
      query: (queryArg) => ({
        url: `/workouts`,
        method: 'POST',
        body: queryArg.workoutCreateRequest,
      }),
    }),
    createExerciseGroup: build.mutation<CreateExerciseGroupResponse, CreateExerciseGroupArg>({
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
    getPrograms: build.query<GetProgramsResponse, GetProgramsArg>({
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
    getMeasurements: build.query<GetMeasurementsResponse, GetMeasurementsArg>({
      query: () => ({ url: `/measurements` }),
    }),
    createMeasurement: build.mutation<CreateMeasurementResponse, CreateMeasurementArg>({
      query: (queryArg) => ({
        url: `/measurements`,
        method: 'POST',
        body: queryArg.measurementCreateRequest,
      }),
    }),
    createMeasurementPoint: build.mutation<
      CreateMeasurementPointResponse,
      CreateMeasurementPointArg
    >({
      query: (queryArg) => ({
        url: `/measurements/${queryArg.id}/measurement-points`,
        method: 'POST',
        body: queryArg.measurementPointCreateRequest,
      }),
    }),
    getExercises: build.query<GetExercisesResponse, GetExercisesArg>({
      query: () => ({ url: `/exercises` }),
    }),
    createExercise: build.mutation<CreateExerciseResponse, CreateExerciseArg>({
      query: (queryArg) => ({
        url: `/exercises`,
        method: 'POST',
        body: queryArg.exerciseCreateRequest,
      }),
    }),
    createExerciseRow: build.mutation<CreateExerciseRowResponse, CreateExerciseRowArg>({
      query: (queryArg) => ({
        url: `/exercise-groups/${queryArg.id}/exercise-rows`,
        method: 'POST',
      }),
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
    deleteMeasurementPoint: build.mutation<
      DeleteMeasurementPointResponse,
      DeleteMeasurementPointArg
    >({
      query: (queryArg) => ({ url: `/measurement-points/${queryArg.id}`, method: 'DELETE' }),
    }),
    updateMeasurementPoint: build.mutation<
      UpdateMeasurementPointResponse,
      UpdateMeasurementPointArg
    >({
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
    deleteExerciseRow: build.mutation<DeleteExerciseRowResponse, DeleteExerciseRowArg>({
      query: (queryArg) => ({ url: `/exercise-rows/${queryArg.id}`, method: 'DELETE' }),
    }),
    updateExerciseRow: build.mutation<UpdateExerciseRowResponse, UpdateExerciseRowArg>({
      query: (queryArg) => ({
        url: `/exercise-rows/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.exerciseRowUpdateRequest,
      }),
    }),
    updateExerciseRowField: build.mutation<
      UpdateExerciseRowFieldResponse,
      UpdateExerciseRowFieldArg
    >({
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
export type GetWorkoutsResponse = /** status 200 OK */ PageWorkoutFullResponse;
export type GetWorkoutsArg = {
  /** Zero-based page index (0..N) */
  page?: number;
  /** The size of the page to be returned */
  size?: number;
  /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
  sort?: string[];
  type: 'TEMPLATE' | 'ACTIVE' | 'COMPLETED';
  after?: string;
};
export type CreateWorkoutResponse = /** status 200 OK */ WorkoutResponse;
export type CreateWorkoutArg = {
  workoutCreateRequest: WorkoutCreateRequest;
};
export type CreateExerciseGroupResponse = unknown;
export type CreateExerciseGroupArg = {
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
export type GetProgramsResponse = /** status 200 OK */ ProgramResponse[];
export type GetProgramsArg = void;
export type CreateProgramResponse = /** status 200 OK */ ProgramResponse;
export type CreateProgramArg = {
  programCreateRequest: ProgramCreateRequest;
};
export type CreateProgramWeekResponse = /** status 200 OK */ ProgramWeekResponse;
export type CreateProgramWeekArg = {
  id: number;
  programWeekCreateRequest: ProgramWeekCreateRequest;
};
export type GetMeasurementsResponse = /** status 200 OK */ MeasurementFullResponse[];
export type GetMeasurementsArg = void;
export type CreateMeasurementResponse = /** status 200 OK */ MeasurementResponse;
export type CreateMeasurementArg = {
  measurementCreateRequest: MeasurementCreateRequest;
};
export type CreateMeasurementPointResponse = /** status 200 OK */ MeasurementPointResponse;
export type CreateMeasurementPointArg = {
  id: number;
  measurementPointCreateRequest: MeasurementPointCreateRequest;
};
export type GetExercisesResponse = /** status 200 OK */ ExerciseResponse[];
export type GetExercisesArg = void;
export type CreateExerciseResponse = /** status 200 OK */ ExerciseResponse;
export type CreateExerciseArg = {
  exerciseCreateRequest: ExerciseCreateRequest;
};
export type CreateExerciseRowResponse = /** status 200 OK */ ExerciseGroupResponse;
export type CreateExerciseRowArg = {
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
export type DeleteMeasurementPointResponse = unknown;
export type DeleteMeasurementPointArg = {
  id: number;
};
export type UpdateMeasurementPointResponse = /** status 200 OK */ MeasurementPointResponse;
export type UpdateMeasurementPointArg = {
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
export type DeleteExerciseRowResponse = unknown;
export type DeleteExerciseRowArg = {
  id: number;
};
export type UpdateExerciseRowResponse = /** status 200 OK */ ExerciseRowResponse;
export type UpdateExerciseRowArg = {
  id: number;
  exerciseRowUpdateRequest: ExerciseRowUpdateRequest;
};
export type UpdateExerciseRowFieldResponse = /** status 200 OK */ ExerciseRowFieldResponse;
export type UpdateExerciseRowFieldArg = {
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
export type PageWorkoutFullResponse = {
  number: number;
  size: number;
  numberOfElements: number;
  content: WorkoutFullResponse[];
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
