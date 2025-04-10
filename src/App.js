import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import NoPage from "./NoPage";
import Snake2 from "./Snake2/Snake2";
import PizzaHelp from "./PizzaHelp/PizzaHelp";
import LevelSelection from "./PizzaHelp/LevelSelection";
import TheButton from "./TheButton/TheButton";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="snake2" element={<Snake2 />} />
        <Route path="pizzahelp" element={<PizzaHelp />} />
        <Route path="pizzahelp/levelselection" element={<LevelSelection />} />
        <Route path="thebutton" element={<TheButton />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
