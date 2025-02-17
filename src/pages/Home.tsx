import { useGetPopularMoviesQuery } from "../features/api/tmdbApi";
import {
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useWatchlist } from "../features/watchlist/useWatchlist";

const Home = () => {
  const { data: movies, error, isLoading } = useGetPopularMoviesQuery();
  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Failed to load movies.</Typography>;

  return (
    <Grid container spacing={2}>
      {movies?.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <CardContent>
              <Typography variant="h6">{movie.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                ⭐ {movie.vote_average}
              </Typography>
              {isInWatchlist(movie.id) ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeMovie(movie.id)}
                  fullWidth
                  sx={{ marginTop: 1 }}
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
                  sx={{ marginTop: 1 }}
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
