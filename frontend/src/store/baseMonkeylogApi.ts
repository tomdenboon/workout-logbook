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
          workoutType: queryArg.workoutType,
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
    createExerciseRow: build.mutation<CreateExerciseRowResponse, CreateExerciseRowArg>({
      query: (queryArg) => ({
        url: `/workouts/${queryArg.workoutId}/exercise-groups/${queryArg.exerciseGroupId}/exercise-rows`,
        method: 'POST',
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
    updateExerciseRow: build.mutation<UpdateExerciseRowResponse, UpdateExerciseRowArg>({
      query: (queryArg) => ({
        url: `/workouts/${queryArg.workoutId}/exercise-groups/${queryArg.exerciseGroupId}/exercise-rows/${queryArg.exerciseRowId}`,
        method: 'PATCH',
        body: queryArg.exerciseRowUpdateRequest,
      }),
    }),
    updateExerciseRowField: build.mutation<
      UpdateExerciseRowFieldResponse,
      UpdateExerciseRowFieldArg
    >({
      query: (queryArg) => ({
        url: `/workouts/${queryArg.workoutId}/exercise-groups/${queryArg.exerciseGroupId}/exercise-rows/${queryArg.exerciseRowId}/exercise-row-fields/${queryArg.exerciseRowFieldId}`,
        method: 'PATCH',
        body: queryArg.exerciseRowFieldUpdateRequest,
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
      query: () => ({ url: `/exercises/types` }),
    }),
    getExerciseCategories: build.query<GetExerciseCategoriesResponse, GetExerciseCategoriesArg>({
      query: () => ({ url: `/exercises/categories` }),
    }),
    deleteExerciseGroup: build.mutation<DeleteExerciseGroupResponse, DeleteExerciseGroupArg>({
      query: (queryArg) => ({
        url: `/workouts/${queryArg.workoutId}/exercise-groups/${queryArg.exerciseGroupId}`,
        method: 'DELETE',
      }),
    }),
    deleteExerciseRow: build.mutation<DeleteExerciseRowResponse, DeleteExerciseRowArg>({
      query: (queryArg) => ({
        url: `/workouts/${queryArg.workoutId}/exercise-group/${queryArg.exerciseGroupId}/exercise-rows/${queryArg.exerciseRowId}`,
        method: 'DELETE',
      }),
    }),
    deleteProgramWeek: build.mutation<DeleteProgramWeekResponse, DeleteProgramWeekArg>({
      query: (queryArg) => ({ url: `/program-weeks/${queryArg.id}`, method: 'DELETE' }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as baseMonkeylogApi };
export type GetProgramResponse = /** status 200 OK */ ProgramResponse;
export type GetProgramArg = {
  id: string;
};
export type UpdateProgramResponse = /** status 200 OK */ ProgramResponse;
export type UpdateProgramArg = {
  id: string;
  programUpdateRequest: ProgramUpdateRequest;
};
export type DeleteProgramResponse = unknown;
export type DeleteProgramArg = {
  id: string;
};
export type GetWorkoutsResponse = /** status 200 OK */ PageWorkoutFullResponse;
export type GetWorkoutsArg = {
  /** Zero-based page index (0..N) */
  page?: number;
  /** The size of the page to be returned */
  size?: number;
  /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
  sort?: string[];
  workoutType: 'TEMPLATE' | 'ACTIVE' | 'COMPLETED';
  after?: string;
};
export type CreateWorkoutResponse = /** status 200 OK */ WorkoutResponse;
export type CreateWorkoutArg = {
  workoutCreateRequest: WorkoutCreateRequest;
};
export type CreateExerciseGroupResponse = unknown;
export type CreateExerciseGroupArg = {
  workoutId: string;
  exerciseGroupCreateRequest: ExerciseGroupCreateRequest;
};
export type CreateExerciseRowResponse = /** status 200 OK */ ExerciseGroupResponse;
export type CreateExerciseRowArg = {
  workoutId: string;
  exerciseGroupId: string;
};
export type StartWorkoutResponse = /** status 200 OK */ WorkoutResponse;
export type StartWorkoutArg = {
  id: string;
};
export type DuplicateWorkoutResponse = /** status 200 OK */ WorkoutResponse;
export type DuplicateWorkoutArg = {
  id: string;
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
  id: string;
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
  id: string;
  measurementPointCreateRequest: MeasurementPointCreateRequest;
};
export type GetExercisesResponse = /** status 200 OK */ ExerciseResponse[];
export type GetExercisesArg = void;
export type CreateExerciseResponse = /** status 200 OK */ ExerciseResponse;
export type CreateExerciseArg = {
  exerciseCreateRequest: ExerciseCreateRequest;
};
export type UpdateExerciseRowResponse = /** status 200 OK */ ExerciseRowResponse;
export type UpdateExerciseRowArg = {
  workoutId: string;
  exerciseGroupId: string;
  exerciseRowId: string;
  exerciseRowUpdateRequest: ExerciseRowUpdateRequest;
};
export type UpdateExerciseRowFieldResponse = /** status 200 OK */ ExerciseRowFieldResponse;
export type UpdateExerciseRowFieldArg = {
  workoutId: string;
  exerciseGroupId: string;
  exerciseRowId: string;
  exerciseRowFieldId: string;
  exerciseRowFieldUpdateRequest: ExerciseRowFieldUpdateRequest;
};
export type DeleteMeasurementResponse = unknown;
export type DeleteMeasurementArg = {
  id: string;
};
export type UpdateMeasurementResponse = /** status 200 OK */ MeasurementResponse;
export type UpdateMeasurementArg = {
  id: string;
  measurementUpdateRequest: MeasurementUpdateRequest;
};
export type DeleteMeasurementPointResponse = unknown;
export type DeleteMeasurementPointArg = {
  id: string;
};
export type UpdateMeasurementPointResponse = /** status 200 OK */ MeasurementPointResponse;
export type UpdateMeasurementPointArg = {
  id: string;
  measurementPointUpdateRequest: MeasurementPointUpdateRequest;
};
export type GetExerciseResponse = /** status 200 OK */ ExerciseResponse;
export type GetExerciseArg = {
  id: string;
};
export type DeleteExerciseResponse = unknown;
export type DeleteExerciseArg = {
  id: string;
};
export type UpdateExerciseResponse = /** status 200 OK */ ExerciseResponse;
export type UpdateExerciseArg = {
  id: string;
  exerciseUpdateRequest: ExerciseUpdateRequest;
};
export type GetWorkoutResponse = /** status 200 OK */ WorkoutFullResponse;
export type GetWorkoutArg = {
  id: string;
};
export type DeleteWorkoutResponse = unknown;
export type DeleteWorkoutArg = {
  id: string;
};
export type GetActiveWorkoutResponse = /** status 200 OK */ WorkoutFullResponse;
export type GetActiveWorkoutArg = void;
export type GetExerciseTypesResponse = /** status 200 OK */ ExerciseTypeResponse[];
export type GetExerciseTypesArg = void;
export type GetExerciseCategoriesResponse = /** status 200 OK */ ExerciseCategoryResponse[];
export type GetExerciseCategoriesArg = void;
export type DeleteExerciseGroupResponse = unknown;
export type DeleteExerciseGroupArg = {
  workoutId: string;
  exerciseGroupId: string;
};
export type DeleteExerciseRowResponse = unknown;
export type DeleteExerciseRowArg = {
  workoutId: string;
  exerciseGroupId: string;
  exerciseRowId: string;
};
export type DeleteProgramWeekResponse = unknown;
export type DeleteProgramWeekArg = {
  id: string;
};
export type ProgramWeekResponse = {
  id: string;
  name: string;
};
export type ProgramResponse = {
  id: string;
  name: string;
  description: string;
  weeks: ProgramWeekResponse[];
};
export type ProgramUpdateRequest = {
  name: string;
  description: string;
};
export type ExerciseTypeResponse = {
  id: 'REPS' | 'TIME' | 'DISTANCE' | 'WEIGHT';
  name: string;
  metricFormat: 'WEIGHT' | 'DISTANCE' | 'TIME' | 'NUMBER' | 'PERCENTAGE';
};
export type ExerciseCategoryResponse = {
  id: 'REPS' | 'WEIGHTED' | 'DURATION' | 'DISTANCE';
  name: string;
  exerciseTypes: ExerciseTypeResponse[];
};
export type ExerciseResponse = {
  id: string;
  name: string;
  exerciseCategory: ExerciseCategoryResponse;
};
export type ExerciseRowFieldResponse = {
  id: string;
  value: number;
  exerciseType: 'REPS' | 'TIME' | 'DISTANCE' | 'WEIGHT';
};
export type ExerciseRowResponse = {
  id: string;
  exerciseRowFields: ExerciseRowFieldResponse[];
  isLifted: boolean;
};
export type ExerciseGroupResponse = {
  id: string;
  exercise: ExerciseResponse;
  exerciseRows: ExerciseRowResponse[];
};
export type WorkoutFullResponse = {
  id: string;
  name: string;
  note?: string;
  workoutType: 'TEMPLATE' | 'ACTIVE' | 'COMPLETED';
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
  id: string;
  name: string;
  note?: string;
  workoutType: 'TEMPLATE' | 'ACTIVE' | 'COMPLETED';
  startDate?: string;
  endDate?: string;
};
export type WorkoutCreateRequest = {
  name: string;
  programWeekId?: string;
};
export type ExerciseGroupCreateRequest = {
  exerciseIds: string[];
};
export type ProgramCreateRequest = {
  name: string;
  description: string;
};
export type ProgramWeekCreateRequest = {
  name: string;
};
export type MeasurementPointResponse = {
  id: string;
  value: number;
  createdAt: string;
};
export type MeasurementFullResponse = {
  id: string;
  name: string;
  metric: 'WEIGHT' | 'DISTANCE' | 'TIME' | 'NUMBER' | 'PERCENTAGE';
  points: MeasurementPointResponse[];
};
export type MeasurementResponse = {
  id: string;
  name: string;
  metric: 'WEIGHT' | 'DISTANCE' | 'TIME' | 'NUMBER' | 'PERCENTAGE';
};
export type MeasurementCreateRequest = {
  name: string;
  metric: 'WEIGHT' | 'DISTANCE' | 'TIME' | 'NUMBER' | 'PERCENTAGE';
};
export type MeasurementPointCreateRequest = {
  value: number;
};
export type ExerciseCreateRequest = {
  name: string;
  exerciseCategory: 'REPS' | 'WEIGHTED' | 'DURATION' | 'DISTANCE';
};
export type ExerciseRowUpdateRequest = {
  isLifted: boolean;
};
export type ExerciseRowFieldUpdateRequest = {
  value: number;
};
export type MeasurementUpdateRequest = {
  name: string;
  metric: 'WEIGHT' | 'DISTANCE' | 'TIME' | 'NUMBER' | 'PERCENTAGE';
};
export type MeasurementPointUpdateRequest = {
  value: number;
};
export type ExerciseUpdateRequest = {
  name: string;
};
