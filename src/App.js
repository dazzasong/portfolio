import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import TheButton from "./TheButton";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thebutton" element={<TheButton />} />
      </Routes>
    </Router>
  );
}

export default App;
