import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import NoPage from "./NoPage";
import Snake2 from "./Snake2/Snake2";
import Chess from "./Chess/Chess";
import BrainSkills from "./BrainSkills/BrainSkills";
import CookieClicker from "./CookieClicker/CookieClicker";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="snake2" element={<Snake2 />} />
        <Route path="chess" element={<Chess />} />
        <Route path="brainskills" element={<BrainSkills />} />
        <Route path="cookieclicker" element={<CookieClicker />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
