import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import WatchlistIcon from "@mui/icons-material/PlaylistAdd";
import WatchedIcon from "@mui/icons-material/CheckCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Watched from "./pages/Watched";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { useAuth } from "./features/auth/useAuth";
import { signInWithGoogle, signOut } from "./features/auth/authActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { useState } from "react";

function App() {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleSignOut = async () => {
    try {
      await dispatch(signOut());
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Router>
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(45deg, #1a237e 30%, #283593 90%)",
          boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
          mb: 4,
        }}
      >
        <Container maxWidth={false}>
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: { xs: 1, sm: 1.5 },
            }}
          >
            <Box 
              className="flex items-center" 
              sx={{ flexGrow: isMobile ? 1 : 0 }}
            >
              <MovieFilterIcon
                sx={{
                  color: "#ffeb3b",
                  fontSize: { xs: 28, sm: 36 },
                  mr: { xs: 1, sm: 2 },
                }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  letterSpacing: { xs: 1, sm: 2 },
                  textTransform: "uppercase",
                  fontSize: { xs: "0.9rem", sm: "1.25rem" },
                }}
              >
                CineCritics
              </Typography>
            </Box>

            {isMobile ? (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                  sx={{ color: "white" }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      backgroundColor: "#1a237e",
                      color: "white",
                      minWidth: 180,
                    },
                  }}
                >
                  <MenuItem 
                    component={Link} 
                    to="/"
                    onClick={handleClose}
                    sx={{ py: 1.5 }}
                  >
                    <HomeIcon sx={{ mr: 1.5 }} />
                    Home
                  </MenuItem>
                  
                  {user ? (
                    <>
                      <MenuItem 
                        component={Link} 
                        to="/watchlist"
                        onClick={handleClose}
                        sx={{ py: 1.5 }}
                      >
                        <WatchlistIcon sx={{ mr: 1.5 }} />
                        Watchlist
                      </MenuItem>
                      <MenuItem 
                        component={Link} 
                        to="/watched"
                        onClick={handleClose}
                        sx={{ py: 1.5 }}
                      >
                        <WatchedIcon sx={{ mr: 1.5 }} />
                        Watched
                      </MenuItem>
                      <MenuItem 
                        onClick={() => {
                          handleClose();
                          handleSignOut();
                        }}
                        sx={{ py: 1.5 }}
                      >
                        <LogoutIcon sx={{ mr: 1.5 }} />
                        Logout
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem 
                      onClick={() => {
                        handleClose();
                        signInWithGoogle();
                      }}
                      sx={{ py: 1.5 }}
                    >
                      Login with Google
                    </MenuItem>
                  )}
                </Menu>
              </>
            ) : (
              <Box 
                className="flex items-center gap-2"
              >
                <Button
                  component={Link}
                  to="/"
                  sx={{
                    color: "#fff",
                    fontSize: { sm: "0.9rem", md: "1.1rem" },
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    px: { sm: 2, md: 3 },
                    py: 1,
                    borderRadius: 2,
                  }}
                >
                  Home
                </Button>
                {user ? (
                  <>
                    <Button
                      component={Link}
                      to="/watchlist"
                      sx={{
                        color: "#fff",
                        fontSize: { sm: "0.9rem", md: "1.1rem" },
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                        px: { sm: 2, md: 3 },
                        py: 1,
                        borderRadius: 2,
                      }}
                    >
                      Watchlist
                    </Button>
                    <Button
                      component={Link}
                      to="/watched"
                      sx={{
                        color: "#fff",
                        fontSize: { sm: "0.9rem", md: "1.1rem" },
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                        px: { sm: 2, md: 3 },
                        py: 1,
                        borderRadius: 2,
                      }}
                    >
                      Watched
                    </Button>
                    <Button
                      onClick={handleSignOut}
                      sx={{
                        color: "#fff",
                        fontSize: { sm: "0.9rem", md: "1.1rem" },
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                        px: { sm: 2, md: 3 },
                        py: 1,
                        borderRadius: 2,
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={signInWithGoogle}
                    sx={{
                      color: "#fff",
                      fontSize: { sm: "0.9rem", md: "1.1rem" },
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                      px: { sm: 2, md: 3 },
                      py: 1,
                      borderRadius: 2,
                    }}
                  >
                    Login with Google
                  </Button>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth={false} disableGutters className="py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/watched" element={<Watched />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
