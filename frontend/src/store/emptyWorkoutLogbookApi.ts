import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const emptyWorkoutLogbookApi = createApi({
  reducerPath: 'workoutLogbookApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_HOST_API }),
  endpoints: () => ({}),
});

export default emptyWorkoutLogbookApi;
