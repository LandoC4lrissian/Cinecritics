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
import { useWatchlist } from "../features/watchlist/useWatchlist";
import EmptyStateIcon from "@mui/icons-material/PlaylistAddCheck";

const Watchlist = () => {
  const { watchlist, removeMovie } = useWatchlist();

  return (
    <Box className="p-6 min-h-screen flex flex-col items-center">
      <Typography
        variant="h4"
        className="font-bold mb-8 pb-8 text-center text-gray-900 dark:text-white tracking-wide"
      >
        My Watchlist
      </Typography>

      {watchlist.length === 0 ? (
        /** EMPTY STATE TASARIMI */
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
        /** MOVIE GRID */
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
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeMovie(movie.id)}
                    startIcon={<DeleteIcon />}
                    fullWidth
                    className="normal-case rounded-md py-2 border-2 transition-colors hover:bg-red-100 dark:hover:bg-red-900"
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Watchlist;
