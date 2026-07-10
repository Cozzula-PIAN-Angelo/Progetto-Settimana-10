import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeMeteo from "./pages/HomeMeteo.jsx";
import DettagliMeteo from "./pages/DettagliMeteo.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeMeteo />} />
      <Route path="/citta/:nome" element={<DettagliMeteo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
