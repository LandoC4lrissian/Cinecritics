import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../../utils/api";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
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
  }),
});

export const { useGetPopularMoviesQuery } = tmdbApi;
