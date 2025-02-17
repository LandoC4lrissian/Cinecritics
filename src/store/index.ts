import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import watchlistReducer from "../features/watchlist/watchlistSlice";
import { tmdbApi } from "../features/api/tmdbApi";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    watchlist: watchlistReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

// RootState ve AppDispatch tiplerini oluştur
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
