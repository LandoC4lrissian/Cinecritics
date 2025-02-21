import { useState } from "react";
import { useGetPopularMoviesQuery, useSearchMoviesQuery } from "../features/api/tmdbApi";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useWatchlist } from "../features/watchlist/useWatchlist";

const Home = () => {
  const [query, setQuery] = useState("");
  const { data: popularMovies, isLoading: isPopularLoading, error: popularError } = useGetPopularMoviesQuery();
  const { data: searchedMovies, isLoading: isSearchLoading, isError: isSearchError } = useSearchMoviesQuery(query, {
    skip: query.length < 3,
  });
  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();

  const movies = query.length >= 3 ? searchedMovies : popularMovies;
  const isLoading = query.length >= 3 ? isSearchLoading : isPopularLoading;
  const isError = query.length >= 3 ? isSearchError : popularError;

  return (
    <Box className="p-6 min-h-screen">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 4 }}
        className="bg-white opacity-60 rounded-3xl"
      />

      {isLoading && (
        <Box className="flex justify-center mt-6 text-amber-50">
          <CircularProgress size={60} />
        </Box>
      )}

      {isError && (
        <Typography variant="h6" color="error" className="text-center mt-6 text-white">
          Failed to load movies. Please try again later.
        </Typography>
      )}

      {movies && (
        <Grid container spacing={6} className="px-4">
          {movies.map((movie) => (
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
                      value={movie.vote_average ? movie.vote_average / 2 : 0}
                      precision={0.5}
                      readOnly
                      className="mr-1"
                    />
                    <Typography variant="body2" className="text-gray-600">
                      {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
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
      )}
    </Box>
  );
};

export default Home;
