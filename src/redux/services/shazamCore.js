import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1', // base query
    // baseUrl: 'shazam-core.p.rapidapi.com', // base query
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'd5e8ab4d01msh6675cc694fa90fep1b132ajsn02860e387c0d');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/world' }),
    getSongsByGenre: builder.query({query: (genre) => `/charts/genre-world?genre_code=${genre}&country_code=DZ`}),
    getSongDetails: builder.query({query: ({songid}) => `/tracks/details?track_id=${songid}`}),
    getSongRelated: builder.query({query: ({songid}) => `/tracks/related?track_id=${songid}`}),
    getArtistDetails: builder.query({query: ({artistId}) => `/artists/details?artist_id=${artistId}`}),
    getSongsByCountry: builder.query({query: (countryCode) => `/charts/country?country_code=${countryCode}`}),
    getSongsBySearch: builder.query({query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`})
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsByGenreQuery,
  useGetSongsBySearchQuery

} = shazamCoreApi;
