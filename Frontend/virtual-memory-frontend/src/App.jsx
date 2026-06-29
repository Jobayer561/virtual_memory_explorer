import { BrowserRouter, Routes, Route } from "react-router";
import Simulator from "./pages/Simulator";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import MainLayout from "./layouts/MainLayout";
import PageTablePage from "./pages/PageTablePage";
import AddressTranslation from "./pages/AddressTranslation";
import PhysicalMemory from "./pages/Physical Memory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Simulator />} />
          <Route path="/history" element={<History />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/page-table" element={<PageTablePage />} />
          <Route path="/translation" element={<AddressTranslation />} />
          <Route path="/physical-memory" element={<PhysicalMemory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
