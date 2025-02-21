import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../../utils/api";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
}

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: TMDB_BASE_URL }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<Movie[], void>({
      query: () =>
        `/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
      transformResponse: (response: { results: Movie[] }) => response.results,
    }),
    getPopularTVShows: builder.query<TVShow[], void>({
      query: () =>
        `/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
      transformResponse: (response: { results: TVShow[] }) => response.results,
    }),
    searchMovies: builder.query<Movie[], string>({
      query: (query) =>
        `/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
      transformResponse: (response: { results: Movie[] }) => response.results,
    }),
    searchTVShows: builder.query<TVShow[], string>({
      query: (query) =>
        `/search/tv?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
      transformResponse: (response: { results: TVShow[] }) => response.results,
    }),
  }),
});

export const { 
  useGetPopularMoviesQuery, 
  useSearchMoviesQuery,
  useGetPopularTVShowsQuery,
  useSearchTVShowsQuery
} = tmdbApi;
