import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Collection from "./components/Collection";
import Add from "./components/Add";
import Artist from "./components/Artist";
import Genre from "./components/Genre";
import Connexion from "./components/Connexion";
import { AuthProvider } from "../context/authContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/Add" element={<Add />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/genre" element={<Genre />} />
            <Route path="/connexion" element={<Connexion />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
