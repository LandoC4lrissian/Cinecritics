import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  addToWatched,
  removeFromWatched,
  saveWatched,
  fetchWatched,
} from "./watchedSlice";
import { useAuth } from "../auth/useAuth";
import { AppDispatch } from "../../store";
import { useEffect } from "react";

interface WatchedItem {
  id: number;
  title: string;
  posterUrl: string;
  watchedDate: string;
}

export const useWatched = () => {
  const dispatch = useDispatch<AppDispatch>();
  const watched = useSelector((state: RootState) => state.watched.items);
  const status = useSelector((state: RootState) => state.watched.status);
  const { user } = useAuth();

  // Fetch watched movies when hook is initialized and user changes
  useEffect(() => {
    if (user && status === "idle") {
      dispatch(fetchWatched(user.uid));
    }
  }, [dispatch, user, status]);

  const addMovie = (movie: Omit<WatchedItem, "watchedDate">) => {
    if (!user) return;
    
    const watchedMovie = {
      ...movie,
      watchedDate: new Date().toISOString(),
    };
    
    dispatch(addToWatched(watchedMovie));
    dispatch(saveWatched(user.uid, [...watched, watchedMovie]));
  };

  const removeMovie = (id: number) => {
    if (!user) return;
    dispatch(removeFromWatched(id));
    const updatedWatched = watched.filter((movie) => movie.id !== id);
    dispatch(saveWatched(user.uid, updatedWatched));
  };

  const isInWatched = (id: number) => {
    return watched.some((movie) => movie.id === id);
  };

  return { watched, addMovie, removeMovie, isInWatched, status };
};
