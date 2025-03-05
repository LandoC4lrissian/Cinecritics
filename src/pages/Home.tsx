import { useState } from "react";
import {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
  useGetPopularTVShowsQuery,
  useSearchTVShowsQuery,
} from "../features/api/tmdbApi";
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
  Tabs,
  Tab,
  Stack,
} from "@mui/material";
import { useWatchlist } from "../features/watchlist/useWatchlist";
import { useWatched } from "../features/watched/useWatched";
import ConfirmationModal from "../components/ConfirmationModal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Home = () => {
  const [query, setQuery] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);
  const [itemToWatch, setItemToWatch] = useState<{id: number, title: string, posterUrl: string} | null>(null);
  const [modalAction, setModalAction] = useState<"remove" | "markAsWatched">("remove");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const { data: popularMovies, isLoading: isPopularMoviesLoading } =
    useGetPopularMoviesQuery();
  const { data: searchedMovies, isLoading: isSearchMoviesLoading } =
    useSearchMoviesQuery(query, {
      skip: query.length < 3,
    });

  const { data: popularTVShows, isLoading: isPopularTVShowsLoading } =
    useGetPopularTVShowsQuery();
  const { data: searchedTVShows, isLoading: isSearchTVShowsLoading } =
    useSearchTVShowsQuery(query, {
      skip: query.length < 3,
    });

  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();
  const { addMovie: addToWatched, isInWatched } = useWatched();

  const movies = query.length >= 3 ? searchedMovies : popularMovies;
  const tvShows = query.length >= 3 ? searchedTVShows : popularTVShows;

  const isLoading =
    query.length >= 3
      ? isSearchMoviesLoading || isSearchTVShowsLoading
      : isPopularMoviesLoading || isPopularTVShowsLoading;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleRemoveClick = (itemId: number) => {
    setItemToRemove(itemId);
    setModalAction("remove");
    setModalTitle("Remove from Watchlist");
    setModalMessage("Are you sure you want to remove this item from your watchlist?");
    setIsModalOpen(true);
  };

  const handleMarkWatchedClick = (id: number, title: string, posterPath: string) => {
    setItemToWatch({
      id,
      title,
      posterUrl: `https://image.tmdb.org/t/p/w500${posterPath}`
    });
    setModalAction("markAsWatched");
    setModalTitle("Mark as Watched");
    setModalMessage(`Are you sure you want to mark "${title}" as watched?`);
    setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (modalAction === "remove" && itemToRemove !== null) {
      removeMovie(itemToRemove);
    } else if (modalAction === "markAsWatched" && itemToWatch !== null) {
      addToWatched(itemToWatch);
    }
    
    setIsModalOpen(false);
    setItemToRemove(null);
    setItemToWatch(null);
  };

  const handleCancelAction = () => {
    setIsModalOpen(false);
    setItemToRemove(null);
    setItemToWatch(null);
  };

  return (
    <Box className="p-6 min-h-screen">
      <Box className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          className="flex-grow"
          sx={{
            "& .MuiTab-root": {
              color: "rgba(255, 255, 255, 0.7)",
              "&.Mui-selected": {
                color: "#fff",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#ffeb3b",
            },
          }}
        >
          <Tab label="Movies" />
          <Tab label="TV Shows" />
        </Tabs>

        <TextField
          fullWidth
          variant="outlined"
          placeholder={`Search ${tabValue === 0 ? "movies" : "TV shows"}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-[400px]"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255, 255, 255, 0.7)",
            },
          }}
        />
      </Box>

      {isLoading && (
        <Box className="flex justify-center mt-6">
          <CircularProgress size={60} />
        </Box>
      )}

      {tabValue === 0 && movies && (
        <Grid container spacing={6} className="px-4 mt-4">
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Card className="h-full flex flex-col">
                <CardMedia
                  component="img"
                  height="400"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent className="flex-grow">
                  <Typography variant="h6" className="font-semibold mb-3">
                    {movie.title}
                  </Typography>
                  <Box className="flex items-center mb-4">
                    <Rating
                      value={movie.vote_average ? movie.vote_average / 2 : 0}
                      precision={0.5}
                      readOnly
                      className="mr-1"
                    />
                    <Typography variant="body2" className="text-gray-600">
                      {movie.vote_average
                        ? movie.vote_average.toFixed(1)
                        : "N/A"}
                    </Typography>
                  </Box>
                  <Stack spacing={1}>
                    {isInWatched(movie.id) ? (
                      <Button
                        variant="outlined"
                        color="success"
                        fullWidth
                        disabled
                      >
                        Already Watched
                      </Button>
                    ) : (
                      <>
                        {isInWatchlist(movie.id) ? (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleRemoveClick(movie.id)}
                            fullWidth
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
                          >
                            Add to Watchlist
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => 
                            handleMarkWatchedClick(
                              movie.id, 
                              movie.title, 
                              movie.poster_path
                            )
                          }
                          startIcon={<CheckCircleIcon />}
                          fullWidth
                        >
                          Mark as Watched
                        </Button>
                      </>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 1 && tvShows && (
        <Grid container spacing={6} className="px-4 mt-4">
          {tvShows.map((tvShow) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tvShow.id}>
              <Card className="h-full flex flex-col">
                <CardMedia
                  component="img"
                  height="400"
                  image={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                  alt={tvShow.name}
                />
                <CardContent className="flex-grow">
                  <Typography variant="h6" className="font-semibold mb-3">
                    {tvShow.name}
                  </Typography>
                  <Box className="flex items-center mb-4">
                    <Rating
                      value={tvShow.vote_average ? tvShow.vote_average / 2 : 0}
                      precision={0.5}
                      readOnly
                      className="mr-1"
                    />
                    <Typography variant="body2" className="text-gray-600">
                      {tvShow.vote_average
                        ? tvShow.vote_average.toFixed(1)
                        : "N/A"}
                    </Typography>
                  </Box>
                  {isInWatchlist(tvShow.id) ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRemoveClick(tvShow.id)}
                      fullWidth
                    >
                      Remove from Watchlist
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        addMovie({
                          id: tvShow.id,
                          title: tvShow.name,
                          posterUrl: `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`,
                        })
                      }
                      fullWidth
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

export default Home;
