import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { setUser, setLoading } from "./authSlice";
import { AppDispatch, RootState } from "../../store";
import { fetchWatchlist } from "../watchlist/watchlistSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        dispatch(fetchWatchlist(user.uid));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading());
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { user, status };
};
