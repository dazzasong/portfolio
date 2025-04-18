import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import NoPage from "./NoPage";
import Snake2 from "./Snake2/Snake2";
import Chess from "./Chess/Chess";
import PizzaHelp from "./PizzaHelp/PizzaHelp";
import LevelSelection from "./PizzaHelp/LevelSelection";
import Settings from "./PizzaHelp/Settings";
import TheButton from "./TheButton/TheButton";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="snake2" element={<Snake2 />} />
        <Route path="chess" element={<Chess />} />
        <Route path="pizzahelp" element={<PizzaHelp />} />
        <Route path="pizzahelp/levelselection" element={<LevelSelection />} />
        <Route path="pizzahelp/settings" element={<Settings />} />
        <Route path="thebutton" element={<TheButton />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
