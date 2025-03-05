import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { AppDispatch } from "../../store";

interface WatchedItem {
  id: number;
  title: string;
  posterUrl: string;
  watchedDate: string;
}

interface WatchedState {
  items: WatchedItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: WatchedState = {
  items: [],
  status: "idle",
};

const watchedSlice = createSlice({
  name: "watched",
  initialState,
  reducers: {
    setWatched: (state, action: PayloadAction<WatchedItem[]>) => {
      state.items = action.payload;
      state.status = "succeeded";
    },
    addToWatched: (state, action: PayloadAction<WatchedItem>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWatched: (state, action: PayloadAction<number>) => {
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
  setWatched,
  addToWatched,
  removeFromWatched,
  setLoading,
  setError,
} = watchedSlice.actions;

export const fetchWatched = 
  (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading());
    try {
      const docRef = doc(db, "watched", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch(setWatched(docSnap.data().items));
      } else {
        // Initialize with empty array if document doesn't exist
        dispatch(setWatched([]));
      }
    } catch (error) {
      console.error(error);
      dispatch(setError());
    }
  };

export const saveWatched =
  (userId: string, items: WatchedItem[]) => async () => {
    try {
      await setDoc(doc(db, "watched", userId), { items });
    } catch (error) {
      console.error("Error saving watched list: ", error);
    }
  };

export default watchedSlice.reducer;

// Selector
export const selectWatched = (state: { watched: WatchedState }) =>
  state.watched.items;
