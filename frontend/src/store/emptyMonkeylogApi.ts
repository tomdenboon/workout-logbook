import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const emptyMonkeylogApi = createApi({
  reducerPath: 'monkeylogApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: () => ({}),
});

export default emptyMonkeylogApi;
