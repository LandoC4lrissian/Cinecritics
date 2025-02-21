import { useGetPopularMoviesQuery } from "../features/api/tmdbApi";
import {
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
} from "@mui/material";
import { useWatchlist } from "../features/watchlist/useWatchlist";

const Home = () => {
  const { data: movies, error, isLoading } = useGetPopularMoviesQuery();
  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();

  if (isLoading)
    return (
      <Box className="flex justify-center mt-6">
        <CircularProgress size={60} />
      </Box>
    );

  if (error)
    return (
      <Typography variant="h6" color="error" className="text-center mt-6">
        Failed to load movies. Please try again later.
      </Typography>
    );

  return (
    <Grid container spacing={6} className="px-4">
      {movies?.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <Card className="h-full flex flex-col bg-white rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <CardMedia
              component="img"
              height="400"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="object-cover rounded-t-xl"
            />
            <CardContent className="flex-grow p-4">
              <Typography
                variant="h6"
                className="font-semibold mb-3 leading-snug h-12 overflow-hidden"
              >
                {movie.title}
              </Typography>

              <Box className="flex items-center mb-4 bg-gradient-to-r from-gray-100 to-gray-50 px-2 py-1 rounded">
                <Rating
                  value={movie.vote_average / 2}
                  precision={0.5}
                  readOnly
                  className="mr-1"
                />
                <Typography variant="body2" className="text-gray-600">
                  {movie.vote_average.toFixed(1)}
                </Typography>
              </Box>

              {isInWatchlist(movie.id) ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeMovie(movie.id)}
                  fullWidth
                  className="normal-case rounded-md py-2 transition-colors hover:bg-red-700"
                >
                  Remove from Watchlist
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    addMovie({
                      id: movie.id,
                      title: movie.title,
                      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    })
                  }
                  fullWidth
                  className="normal-case rounded-md py-2 transition-colors hover:bg-blue-700"
                >
                  Add to Watchlist
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
