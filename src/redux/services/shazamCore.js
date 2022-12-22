import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1', // base query
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'd5e8ab4d01msh6675cc694fa90fep1b132ajsn02860e387c0d');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/world' }),
  }),
});

export const {
  useGetTopChartsQuery,

} = shazamCoreApi;
