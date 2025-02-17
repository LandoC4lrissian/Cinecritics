import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/watchlist">
            Watchlist
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;
