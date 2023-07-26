import { baseMonkeylogApi } from 'store/baseMonkeylogApi';

export * from 'store/baseMonkeylogApi';

export const monkeyLogApi = baseMonkeylogApi.enhanceEndpoints({
  addTagTypes: ['Exercise', 'Measurement', 'Program', 'Workout'],
  endpoints: {
    // EXERCISES
    allExercises: {
      providesTags: (result) => [
        ...(result ?? []).map(({ id }) => ({ type: 'Exercise' as const, id })),
        { type: 'Exercise', id: 'LIST' },
      ],
    },
    getExercise: {
      providesTags: (result) => [{ type: 'Exercise', id: result?.id }],
    },
    saveExercise: {
      invalidatesTags: [{ type: 'Exercise', id: 'LIST' }],
    },
    deleteExercise: {
      invalidatesTags: (result, error, args) => [{ type: 'Exercise', id: args.id }],
    },
    updateExercise: {
      invalidatesTags: (result, error, args) => [{ type: 'Exercise', id: args.id }],
    },
    // MEASUREMENTS
    allMeasurements: {
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
    // PROGRAMS
    // WORKOUTS
    allWorkouts: {
      providesTags: (result, errors, arg) => [
        ...(result ?? []).map((workout) => ({ type: 'Workout' as const, id: workout.id })),
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
    saveExerciseGroup: {
      invalidatesTags: (result, error, args) => [{ type: 'Workout', id: args.workoutId }],
    },
  },
});

export const {
  useAllWorkoutsQuery,
  useAddRowMutation,
  useDeleteWorkoutMutation,
  useDeleteExerciseMutation,
  useGetActiveWorkoutQuery,
  useLazyGetWorkoutQuery,
  useCompleteWorkoutMutation,
  useUpdateRowMutation,
  useDeleteRowMutation,
  useCreateWorkoutMutation,
  useAllExercisesQuery,
  useSaveExerciseGroupMutation,
  useAllMeasurementsQuery,
  useCreateMeasurementMutation,
  useGetExerciseTypesQuery,
  useUpdateRowFieldMutation,
  useSaveExerciseMutation,
  useUpdateExerciseMutation,
  useDuplicateWorkoutMutation,
  useStartEmptyWorkoutMutation,
  useStartWorkoutMutation,
  useCreatePointMutation,
} = monkeyLogApi;
