import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useWatchlist } from "../features/watchlist/useWatchlist";
import { useWatched } from "../features/watched/useWatched";
import EmptyStateIcon from "@mui/icons-material/PlaylistAddCheck";
import { useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal";

const Watchlist = () => {
  const { watchlist, removeMovie } = useWatchlist();
  const { addMovie: addToWatched, isInWatched } = useWatched();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieToRemove, setMovieToRemove] = useState<number | null>(null);
  const [modalAction, setModalAction] = useState<"remove" | "markAsWatched">("remove");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const handleRemoveClick = (movieId: number) => {
    setMovieToRemove(movieId);
    setModalAction("remove");
    setModalTitle("Remove from Watchlist");
    setModalMessage("Are you sure you want to remove this item from your watchlist?");
    setIsModalOpen(true);
  };

  const handleMarkWatchedClick = (movieId: number) => {
    setMovieToRemove(movieId);
    setModalAction("markAsWatched");
    setModalTitle("Mark as Watched");
    setModalMessage("Are you sure you want to mark this movie as watched?");
    setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (movieToRemove !== null) {
      const movie = watchlist.find(m => m.id === movieToRemove);
      
      if (modalAction === "remove") {
        removeMovie(movieToRemove);
      } else if (modalAction === "markAsWatched" && movie) {
        addToWatched({
          id: movie.id,
          title: movie.title,
          posterUrl: movie.posterUrl,
        });
        removeMovie(movieToRemove);
      }
    }
    setIsModalOpen(false);
    setMovieToRemove(null);
  };

  const handleCancelAction = () => {
    setIsModalOpen(false);
    setMovieToRemove(null);
  };

  return (
    <Box className="p-6 min-h-screen flex flex-col items-center">
      <Typography
        variant="h4"
        className="font-bold mb-8 pb-8 text-center text-gray-900 dark:text-white tracking-wide"
      >
        My Watchlist
      </Typography>

      {watchlist.length === 0 ? (
        <Box className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <EmptyStateIcon className="text-[100px] text-gray-500 mb-4" />
          <Typography
            variant="h5"
            className="mb-2 font-semibold text-gray-800 dark:text-gray-300"
          >
            Your watchlist is empty!
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-600 dark:text-gray-400 max-w-lg"
          >
            Start adding movies to curate your personal collection. Discover
            your next favorite film now!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="mt-6 px-6 py-2 text-lg normal-case shadow-md hover:shadow-lg"
            href="/"
          >
            Browse Movies
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4} className="px-4">
          {watchlist.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Card className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <CardMedia
                  component="img"
                  height="400"
                  image={movie.posterUrl}
                  alt={movie.title}
                  className="object-cover rounded-t-xl"
                />
                <CardContent className="flex-grow flex flex-col justify-between p-4">
                  <Typography
                    variant="h6"
                    className="font-semibold mb-3 leading-snug h-12 overflow-hidden text-gray-900 dark:text-white"
                  >
                    {movie.title}
                  </Typography>
                  <Stack spacing={2}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleMarkWatchedClick(movie.id)}
                      startIcon={<CheckCircleIcon />}
                      fullWidth
                      className="normal-case rounded-md py-2 transition-colors"
                      disabled={isInWatched(movie.id)}
                    >
                      {isInWatched(movie.id) ? "Already Watched" : "Mark as Watched"}
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveClick(movie.id)}
                      startIcon={<DeleteIcon />}
                      fullWidth
                      className="normal-case rounded-md py-2 border-2 transition-colors hover:bg-red-100 dark:hover:bg-red-900"
                    >
                      Remove
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <ConfirmationModal
        open={isModalOpen}
        title={modalTitle}
        message={modalMessage}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </Box>
  );
};

export default Watchlist;
