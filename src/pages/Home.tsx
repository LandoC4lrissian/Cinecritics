import { useGetPopularMoviesQuery } from "../features/api/tmdbApi";
import {
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const Home = () => {
  const { data: movies, error, isLoading } = useGetPopularMoviesQuery();

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
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
