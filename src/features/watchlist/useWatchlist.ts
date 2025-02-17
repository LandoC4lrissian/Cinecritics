import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addToWatchlist, removeFromWatchlist } from "./watchlistSlice";

export const useWatchlist = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector(
    (state: RootState) => state.watchlist.watchlist
  );

  const addMovie = (movie: {
    id: number;
    title: string;
    posterUrl: string;
  }) => {
    dispatch(addToWatchlist(movie));
  };

  const removeMovie = (id: number) => {
    dispatch(removeFromWatchlist(id));
  };

  const isInWatchlist = (id: number) => {
    return watchlist.some((movie) => movie.id === id);
  };

  return { watchlist, addMovie, removeMovie, isInWatchlist };
};
