import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useWatched } from "../features/watched/useWatched";
import EmptyStateIcon from "@mui/icons-material/LocalMovies";
import { useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Watched = () => {
  const { watched, removeMovie } = useWatched();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieToRemove, setMovieToRemove] = useState<number | null>(null);

  const handleRemoveClick = (movieId: number) => {
    setMovieToRemove(movieId);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (movieToRemove !== null) {
      removeMovie(movieToRemove);
    }
    setIsModalOpen(false);
    setMovieToRemove(null);
  };

  const handleCancelRemove = () => {
    setIsModalOpen(false);
    setMovieToRemove(null);
  };

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box className="p-6 min-h-screen flex flex-col items-center">
      <Typography
        variant="h4"
        className="font-bold mb-8 pb-8 text-center text-gray-900 dark:text-white tracking-wide"
      >
        My Watched Movies
      </Typography>

      {watched.length === 0 ? (
        <Box className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <EmptyStateIcon className="text-[100px] text-gray-500 mb-4" />
          <Typography
            variant="h5"
            className="mb-2 font-semibold text-gray-800 dark:text-gray-300"
          >
            You haven't watched any movies yet!
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-600 dark:text-gray-400 max-w-lg"
          >
            Start marking movies as watched to keep track of what you've seen.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="mt-6 px-6 py-2 text-lg normal-case shadow-md hover:shadow-lg"
            href="/watchlist"
          >
            Go to Watchlist
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4} className="px-4">
          {watched.map((movie) => (
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
                  <div>
                    <Typography
                      variant="h6"
                      className="font-semibold mb-3 leading-snug overflow-hidden text-gray-900 dark:text-white"
                    >
                      {movie.title}
                    </Typography>
                    <Box className="mb-4 flex items-center">
                      <CalendarMonthIcon
                        fontSize="small"
                        className="mr-1 text-gray-500"
                      />
                      <Typography
                        variant="body2"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Watched on: {formatDate(movie.watchedDate)}
                      </Typography>
                    </Box>
                  </div>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveClick(movie.id)}
                    startIcon={<DeleteIcon />}
                    fullWidth
                    className="normal-case rounded-md py-2 border-2 transition-colors hover:bg-red-100 dark:hover:bg-red-900 mt-2"
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <ConfirmationModal
        open={isModalOpen}
        title="Remove from Watched List"
        message="Are you sure you want to remove this movie from your watched list?"
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
      />
    </Box>
  );
};

export default Watched;
