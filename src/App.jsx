import { Container, CssBaseline } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Analysis from "./pages/Analysis";
import HomePage from "./pages/HomePage";
import OlympicFacts from "./pages/OlympicFacts";
import Predictions from "./pages/Predictions";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Container
        sx={{ width: "100%", maxWidth: "none" }}
        xl={{ maxWidth: "none" }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/facts" element={<OlympicFacts />} />
          <Route path="/predictions" element={<Predictions />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
