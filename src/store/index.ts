import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import watchlistReducer from "../features/watchlist/watchlistSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    watchlist: watchlistReducer,
  },
});

// RootState ve AppDispatch tiplerini oluştur
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
