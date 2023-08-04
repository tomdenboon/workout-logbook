import { baseMonkeylogApi } from 'store/baseMonkeylogApi';

export * from 'store/baseMonkeylogApi';

export const monkeyLogApi = baseMonkeylogApi.enhanceEndpoints({
  addTagTypes: ['Exercise', 'Measurement', 'Program', 'Workout'],
  endpoints: {
    // EXERCISES
    getExercises: {
      providesTags: (result) => [
        ...(result ?? []).map(({ id }) => ({ type: 'Exercise' as const, id })),
        { type: 'Exercise', id: 'LIST' },
      ],
    },
    getExercise: {
      providesTags: (result) => [{ type: 'Exercise', id: result?.id }],
    },
    createExercise: {
      invalidatesTags: [{ type: 'Exercise', id: 'LIST' }],
    },
    deleteExercise: {
      invalidatesTags: (result, error, args) => [{ type: 'Exercise', id: args.id }],
    },
    updateExercise: {
      invalidatesTags: (result, error, args) => [{ type: 'Exercise', id: args.id }],
    },
    // MEASUREMENTS
    getMeasurements: {
      providesTags: (result) => [
        ...(result ?? []).map(({ id }) => ({ type: 'Exercise' as const, id })),
        { type: 'Measurement', id: 'LIST' },
      ],
    },
    createMeasurement: {
      invalidatesTags: () => [{ type: 'Measurement', id: 'LIST' }],
    },
    deleteMeasurement: {
      invalidatesTags: (result, error, args) => [{ type: 'Measurement', id: args.id }],
    },
    createMeasurementPoint: {
      invalidatesTags: () => [{ type: 'Measurement', id: 'LIST' }],
    },
    // WORKOUTS
    getWorkouts: {
      providesTags: (result, errors, arg) => [
        ...(result?.content ?? []).map((workout) => ({ type: 'Workout' as const, id: workout.id })),
        { type: 'Workout', id: `${arg.type}_LIST` },
      ],
    },
    getWorkout: {
      providesTags: (result) => [{ type: 'Workout', id: result?.id }],
    },
    getActiveWorkout: {
      providesTags: (result) => [
        { type: 'Workout', id: result?.id },
        { type: 'Workout', id: 'ACTIVE' },
      ],
    },
    createWorkout: {
      invalidatesTags: () => [{ type: 'Workout', id: `TEMPLATE_LIST` }],
    },
    deleteWorkout: {
      invalidatesTags: (result, error, args) => [{ type: 'Workout', id: args.id }],
    },
    duplicateWorkout: {
      invalidatesTags: () => [{ type: 'Workout', id: 'TEMPLATE_LIST' }],
    },
    startEmptyWorkout: {
      invalidatesTags: () => [{ type: 'Workout', id: 'ACTIVE' }],
    },
    startWorkout: {
      invalidatesTags: () => [{ type: 'Workout', id: 'ACTIVE' }],
    },
    completeWorkout: {
      invalidatesTags: (result) => [
        { type: 'Workout', id: result?.id },
        { type: 'Workout', id: `COMPLETED_LIST` },
      ],
    },
    createExerciseGroup: {
      invalidatesTags: (result, error, args) => [{ type: 'Workout', id: args.workoutId }],
    },
  },
});

export const {
  useGetWorkoutsQuery,
  useCreateExerciseRowMutation,
  useDeleteWorkoutMutation,
  useDeleteExerciseMutation,
  useGetActiveWorkoutQuery,
  useLazyGetWorkoutQuery,
  useLazyGetWorkoutsQuery,
  useCompleteWorkoutMutation,
  useUpdateExerciseRowMutation,
  useDeleteExerciseRowMutation,
  useCreateWorkoutMutation,
  useGetExercisesQuery,
  useCreateExerciseGroupMutation,
  useGetMeasurementsQuery,
  useCreateMeasurementMutation,
  useGetExerciseTypesQuery,
  useUpdateExerciseRowFieldMutation,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
  useDuplicateWorkoutMutation,
  useStartEmptyWorkoutMutation,
  useStartWorkoutMutation,
  useCreateMeasurementPointMutation,
} = monkeyLogApi;
