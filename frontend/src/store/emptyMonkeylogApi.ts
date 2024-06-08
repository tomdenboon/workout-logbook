import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const emptyMonkeylogApi = createApi({
  reducerPath: 'monkeylogApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_HOST_API }),
  endpoints: () => ({}),
});

export default emptyMonkeylogApi;
