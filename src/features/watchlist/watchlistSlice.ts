import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { AppDispatch } from "../../store";

interface WatchlistItem {
  id: number;
  title: string;
  posterUrl: string;
}

interface WatchlistState {
  items: WatchlistItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: WatchlistState = {
  items: [],
  status: "idle",
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    setWatchlist: (state, action: PayloadAction<WatchlistItem[]>) => {
      state.items = action.payload;
      state.status = "succeeded";
    },
    addToWatchlist: (state, action: PayloadAction<WatchlistItem>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state) => {
      state.status = "failed";
    },
  },
});

export const {
  setWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  setLoading,
  setError,
} = watchlistSlice.actions;

export const fetchWatchlist =
  (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading());
    try {
      const docRef = doc(db, "watchlists", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch(setWatchlist(docSnap.data().items));
      }
    } catch (error) {
      console.error(error);
      dispatch(setError());
    }
  };

export const saveWatchlist =
  (userId: string, items: WatchlistItem[]) => async () => {
    try {
      await setDoc(doc(db, "watchlists", userId), { items });
    } catch (error) {
      console.error("Error saving watchlist: ", error);
    }
  };

export default watchlistSlice.reducer;

// Selector
export const selectWatchlist = (state: { watchlist: WatchlistState }) =>
  state.watchlist.items;
