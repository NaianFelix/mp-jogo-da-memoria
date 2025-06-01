import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";

function App() {
  return (
    <div className="flex flex-col items-center w-full h-full min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
