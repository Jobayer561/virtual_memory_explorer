import { BrowserRouter, Routes, Route } from "react-router";
import Simulator from "../pages/Simulator";
import History from "../pages/History";
import Analytics from "../pages/Analytics";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Simulator />} />
        <Route path="/history" element={<History />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
