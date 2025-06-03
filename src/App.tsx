import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmartAquarium from './components/shark/SmartAquarium';
import DashboardPage from './components/shark/DashboardPage';
import DetailMap from './components/shark/DetailMap';
import Sidebar from './components/shark/LeftSidebar';
import MeasuredResult from './components/shark/MeasuredResult';

function App() {
  return (
    <div className="min-h-screen bg-white text-black flex">
      <Router>
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-8">
          <Routes>
            <Route path="/" element={<SmartAquarium />} />
            <Route path="/measuredresult" element={<MeasuredResult />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/detailmap" element={<DetailMap />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
