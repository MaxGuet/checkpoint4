import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Collection from "./components/Collection";
import Add from "./components/Add";
import Artist from "./components/Artist";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/Add" element={<Add />} />
          <Route path="/artist" element={<Artist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
