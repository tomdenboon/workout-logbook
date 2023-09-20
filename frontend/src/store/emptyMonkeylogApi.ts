import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const emptyMonkeylogApi = createApi({
  reducerPath: 'monkeylogApi',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_HOST_API }),
  endpoints: () => ({}),
});

export default emptyMonkeylogApi;
