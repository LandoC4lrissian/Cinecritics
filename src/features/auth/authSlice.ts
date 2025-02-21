import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.status = "succeeded";
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = "failed";
    },
    logout: (state) => {
      state.user = null;
      state.status = "idle";
    },
  },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;
