import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Snake2 from "./Snake2/Snake2";
import TheButton from "./TheButton/TheButton";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/snake2" element={<Snake2 />} />
        <Route path="/thebutton" element={<TheButton />} />
      </Routes>
    </Router>
  );
}

export default App;
