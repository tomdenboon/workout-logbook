import { monkeylogApi } from "services/monkeylogApi"


monkeylogApi.injectEndpoints({
    endpoints: (builder) => ({
    export const getExerciseTypes = (builder: any) => builder.query<Array<ExerciseType>, void>({
      query: () => `exercise_types`,
    })

    getExercises: builder.query<Array<Exercise>, void>({
      query: () => `exercises`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Exercise' as const, id })),
              { type: 'Exercise', id: 'LIST' },
            ]
          : [{ type: 'Exercise', id: 'LIST' }],
    }),
    getExercise: builder.query<Exercise, Exercise['id']>({
      query: (id) => `exercises/${id}`,
      providesTags: (result, error, id) => [{ type: 'Exercise', id }],
    }),
    addExercise: builder.mutation<Exercise, ExercisePost>({
      query: (body) => ({
        url: `exercises`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Exercise', id: 'LIST' }],
    }),
    updateExercise: builder.mutation<void, ExercisePatch>({
      query: (patch) => ({
        url: `exercises/${patch.id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Exercise', id }],
    }),
    deleteExercise: builder.mutation<{ success: boolean; id: number }, Exercise['id']>({
      query(id) {
        return {
          url: `exercises/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'Exercise', id }],
    }),