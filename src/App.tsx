import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Typography,
} from "@mui/material";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";

function App() {
  return (
    <Router>
      <AppBar
        position="sticky"
        sx={{
          background: 'linear-gradient(45deg, #1a237e 30%, #283593 90%)',
          boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
          mb: 4,
          py: { xs: 1, sm: 2 },
          px: { xs: 2, sm: 0 , lg: 4}
        }}
      >
        <Container maxWidth={false} disableGutters>
          <Toolbar disableGutters>
            <Box className="flex items-center" sx={{ mr: { xs: 2, sm: 6 } }}>
              <MovieFilterIcon sx={{ 
                color: '#ffeb3b', 
                fontSize: { xs: 28, sm: 36 }, 
                mr: { xs: 1, sm: 2 } 
              }} />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  color: '#fff',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}
              >
                CineCritics
              </Typography>
            </Box>
            <Box className="flex-grow flex gap-4" sx={{ justifyContent: 'flex-end' }}>
              <Button
                component={Link}
                to="/"
                sx={{
                  color: '#fff',
                  fontSize: { xs: '0.9rem', sm: '1.1rem' },
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  },
                  px: { xs: 1, sm: 3 },
                  py: { xs: 0.5, sm: 1 },
                  borderRadius: 2,
                  minWidth: { xs: 'auto', sm: 'unset' }
                }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/watchlist"
                sx={{
                  color: '#fff',
                  fontSize: { xs: '0.9rem', sm: '1.1rem' },
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  },
                  px: { xs: 1, sm: 3 },
                  py: { xs: 0.5, sm: 1 },
                  borderRadius: 2,
                  minWidth: { xs: 'auto', sm: 'unset' }
                }}
              >
                Watchlist
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth={false} disableGutters className="py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
