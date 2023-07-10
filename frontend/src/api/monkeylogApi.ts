import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ExerciseGroup,
  ExerciseRow,
  ExerciseRowFieldPatch,
  ExerciseRowPatch,
  Workout,
  WorkoutSmall,
  WorkoutType,
} from '../types/Workout';

export const monkeylogApi = createApi({
  reducerPath: 'monkeylogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: ['Exercise', 'Workout', 'ExerciseGroup', 'ExerciseRow', 'Measurement'],
  endpoints: (builder) => ({
    getWorkouts: builder.query<Array<Workout>, { type: WorkoutType }>({
      query: (arg) => ({
        url: `workout`,
        params: arg,
      }),
      providesTags: (result, errors, arg) => [
        ...(result?.map((workout) => ({ type: 'Workout' as const, id: workout.id })) ?? []),
        { type: 'Workout', id: `${arg.type}_LIST` },
      ],
    }),
    getWorkout: builder.query<Workout, Workout['id']>({
      query: (id) => `workout/${id}`,
      providesTags: (result, error, id) => [{ type: 'Workout', id }],
    }),
    getActiveWorkout: builder.query<WorkoutSmall, void>({
      query: () => `workout/active`,
      providesTags: (result) => [
        { type: 'Workout', id: result?.id },
        { type: 'Workout', id: 'ACTIVE' },
      ],
    }),
    addWorkout: builder.mutation<WorkoutSmall, Partial<WorkoutSmall>>({
      query: (body) => ({
        url: `workout`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Workout', id: `${WorkoutType.Template}_LIST` }],
    }),
    deleteWorkout: builder.mutation<void, Workout['id']>({
      query: (id) => ({
        url: `workout/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Workout', id }],
    }),
    cloneWorkout: builder.mutation<WorkoutSmall, number>({
      query: (id) => ({
        url: `workout/${id}/clone`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Workout', id: `${WorkoutType.Template}_LIST` }],
    }),
    startWorkout: builder.mutation<WorkoutSmall, number>({
      query: (id) => ({
        url: `workout/${id}/start`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Workout', id: 'ACTIVE' }],
    }),
    startEmptyWorkout: builder.mutation<WorkoutSmall, void>({
      query: () => ({
        url: `workout/start`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Workout', id: 'ACTIVE' }],
    }),
    completeWorkout: builder.mutation<WorkoutSmall, void>({
      query: () => ({
        url: `workout/complete`,
        method: 'POST',
      }),
      invalidatesTags: (result) => [
        { type: 'Workout', id: result?.id },
        { type: 'Workout', id: `${WorkoutType.Complete}_LIST` },
      ],
    }),
    addExerciseGroups: builder.mutation<
      void,
      { workoutId: number; body: { exerciseIds: number[] } }
    >({
      query: (request) => ({
        url: `workout/${request.workoutId}/exercise_group`,
        method: 'POST',
        body: request.body,
      }),
      invalidatesTags: (result, error, request) => [{ type: 'Workout', id: request.workoutId }],
    }),
    getExerciseGroup: builder.query<ExerciseGroup, ExerciseGroup['id']>({
      query: (id) => `exercise_group/${id}`,
      providesTags: (result, error, id) => [{ type: 'ExerciseGroup', id }],
    }),
    getExerciseRow: builder.query<ExerciseRow, ExerciseRow['id']>({
      query: (id) => `exercise_row/${id}`,
      providesTags: (result, error, id) => [{ type: 'ExerciseRow', id }],
    }),
    addExerciseRow: builder.mutation<
      ExerciseGroup,
      { id: ExerciseGroup['id']; workoutId: number; exerciseGroupIndex: number }
    >({
      query: ({ id }) => ({
        url: `exercise_group/${id}/add_row`,
        method: 'POST',
      }),
      async onQueryStarted({ workoutId, exerciseGroupIndex }, { dispatch, queryFulfilled }) {
        const { data: addedRow } = await queryFulfilled;
        dispatch(
          monkeylogApi.util.updateQueryData('getWorkout', workoutId, (draft) => {
            Object.assign(draft.exerciseGroups[exerciseGroupIndex], addedRow);
          })
        );
      },
    }),
    swapExerciseRow: builder.mutation<
      void,
      {
        id: ExerciseGroup['id'];
        workoutId: number;
        exerciseGroupIndex: number;
        oldIndex: number;
        newIndex: number;
      }
    >({
      query: ({ id, oldIndex, newIndex }) => ({
        url: `exercise_group/${id}/swap_row`,
        method: 'POST',
        body: { oldIndex, newIndex },
      }),
      async onQueryStarted(
        { workoutId, exerciseGroupIndex, oldIndex, newIndex },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          monkeylogApi.util.updateQueryData('getWorkout', workoutId, (draft) => {
            const row = draft.exerciseGroups[exerciseGroupIndex].exerciseRows[oldIndex];
            draft.exerciseGroups[exerciseGroupIndex].exerciseRows.splice(oldIndex, 1);
            draft.exerciseGroups[exerciseGroupIndex].exerciseRows.splice(newIndex, 0, row);
          })
        );

        queryFulfilled.catch(patchResult.undo);
      },
    }),
    updateExerciseRow: builder.mutation<
      void,
      {
        patch: ExerciseRowPatch;
        workoutId: number;
        exerciseGroupIndex: number;
        exerciseRowIndex: number;
      }
    >({
      query: ({ patch }) => ({
        url: `exercise_row/${patch.id}`,
        method: 'PATCH',
        body: patch,
      }),
      onQueryStarted(
        { patch, workoutId, exerciseGroupIndex, exerciseRowIndex },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          monkeylogApi.util.updateQueryData('getWorkout', workoutId, (draft) => {
            Object.assign(
              draft.exerciseGroups[exerciseGroupIndex].exerciseRows[exerciseRowIndex],
              patch
            );
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    deleteExerciseRow: builder.mutation<
      { success: boolean; id: number },
      {
        id: ExerciseRow['id'];
        workoutId: number;
        exerciseGroupIndex: number;
        exerciseRowIndex: number;
      }
    >({
      query({ id }) {
        return {
          url: `exercise_row/${id}`,
          method: 'DELETE',
        };
      },
      onQueryStarted(
        { workoutId, exerciseGroupIndex, exerciseRowIndex },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          monkeylogApi.util.updateQueryData('getWorkout', workoutId, (draft) => {
            if (draft.exerciseGroups[exerciseGroupIndex].exerciseRows.length === 1) {
              draft.exerciseGroups.splice(exerciseGroupIndex, 1);
            } else {
              draft.exerciseGroups[exerciseGroupIndex].exerciseRows.splice(exerciseRowIndex, 1);
            }
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    updateExerciseRowField: builder.mutation<
      void,
      {
        patch: ExerciseRowFieldPatch;
        workoutId: number;
        exerciseGroupIndex: number;
        exerciseRowIndex: number;
        exerciseRowFieldIndex: number;
      }
    >({
      query: ({ patch }) => ({
        url: `exercise_row_field/${patch.id}`,
        method: 'PATCH',
        body: patch,
      }),
      onQueryStarted(
        { patch, workoutId, exerciseGroupIndex, exerciseRowIndex, exerciseRowFieldIndex },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          monkeylogApi.util.updateQueryData('getWorkout', workoutId, (draft) => {
            Object.assign(
              draft.exerciseGroups[exerciseGroupIndex].exerciseRows[exerciseRowIndex]
                .exerciseRowFields[exerciseRowFieldIndex],
              patch
            );
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

export const {
  useGetWorkoutsQuery,
  useGetWorkoutQuery,
  useLazyGetWorkoutQuery,
  useGetActiveWorkoutQuery,
  useAddWorkoutMutation,
  useDeleteWorkoutMutation,
  useCloneWorkoutMutation,
  useStartWorkoutMutation,
  useStartEmptyWorkoutMutation,
  useCompleteWorkoutMutation,
  useAddExerciseGroupsMutation,
  useGetExerciseGroupQuery,
  useGetExerciseRowQuery,
  useAddExerciseRowMutation,
  useSwapExerciseRowMutation,
  useUpdateExerciseRowMutation,
  useDeleteExerciseRowMutation,
  useUpdateExerciseRowFieldMutation,
} = monkeylogApi;
