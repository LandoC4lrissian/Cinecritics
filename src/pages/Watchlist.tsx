import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useWatchlist } from "../features/watchlist/useWatchlist";

const Watchlist = () => {
  const { watchlist, removeMovie } = useWatchlist();

  return (
    <Grid container spacing={2}>
      {watchlist.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
          Your watchlist is empty.
        </Typography>
      ) : (
        watchlist.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={movie.posterUrl}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeMovie(movie.id)}
                  fullWidth
                  sx={{ marginTop: 1 }}
                >
                  Remove from Watchlist
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Watchlist;
