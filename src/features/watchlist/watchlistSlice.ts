import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WatchlistItem {
  id: number;
  title: string;
  posterUrl: string;
}

interface WatchlistState {
  watchlist: WatchlistItem[];
}

const initialState: WatchlistState = {
  watchlist: [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<WatchlistItem>) => {
      const exists = state.watchlist.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.watchlist = state.watchlist.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;

// Selector
export const selectWatchlist = (state: { watchlist: WatchlistState }) =>
  state.watchlist.watchlist;
