import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  addToWatchlist,
  removeFromWatchlist,
  saveWatchlist,
} from "./watchlistSlice";
import { useAuth } from "../auth/useAuth";
import { AppDispatch } from "../../store";

interface WatchlistItem {
  id: number;
  title: string;
  posterUrl: string;
}

export const useWatchlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const watchlist = useSelector((state: RootState) => state.watchlist.items);
  const { user } = useAuth();

  const addMovie = (movie: WatchlistItem) => {
    if (!user) return;
    dispatch(addToWatchlist(movie));
    dispatch(saveWatchlist(user.uid, [...watchlist, movie]));
  };

  const removeMovie = (id: number) => {
    if (!user) return;
    dispatch(removeFromWatchlist(id));
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== id);
    dispatch(saveWatchlist(user.uid, updatedWatchlist));
  };

  const isInWatchlist = (id: number) => {
    return watchlist.some((movie) => movie.id === id);
  };

  return { watchlist, addMovie, removeMovie, isInWatchlist };
};
