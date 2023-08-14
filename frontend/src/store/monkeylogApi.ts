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
        { type: 'Workout', id: `${arg.workoutType}_LIST` },
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
      invalidatesTags: () => [
        { type: 'Workout', id: 'ACTIVE' },
        { type: 'Workout', id: `COMPLETED_LIST` },
      ],
    },
    createExerciseGroup: {
      invalidatesTags: (result, error, args) => [{ type: 'Workout', id: args.workoutId }],
    },
    createExerciseRow: {
      onQueryStarted: async ({ workoutId, exerciseGroupId }, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(
            monkeyLogApi.util.updateQueryData('getWorkout', { id: workoutId }, (draft) => {
              const exerciseGroup = draft.exerciseGroups.find((eg) => eg.id === exerciseGroupId);
              if (exerciseGroup) {
                Object.assign(exerciseGroup, result.data);
              }
            })
          );
        });
      },
    },
    updateExerciseRow: {
      onQueryStarted: async (
        { workoutId, exerciseGroupId, exerciseRowId, exerciseRowUpdateRequest },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          monkeyLogApi.util.updateQueryData('getWorkout', { id: workoutId }, (draft) => {
            const exerciseRow = draft.exerciseGroups
              .find((eg) => eg.id === exerciseGroupId)
              ?.exerciseRows.find((er) => er.id === exerciseRowId);
            if (exerciseRow) {
              Object.assign(exerciseRow, exerciseRowUpdateRequest);
            }
          })
        );

        queryFulfilled.catch(patchResult.undo);
      },
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
  useUpdateExerciseRowFieldMutation,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
  useDuplicateWorkoutMutation,
  useStartEmptyWorkoutMutation,
  useStartWorkoutMutation,
  useCreateMeasurementPointMutation,
  useGetExerciseTypesQuery,
  useGetExerciseCategoriesQuery,
} = monkeyLogApi;
