import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmartAquarium from './components/shark/SmartAquarium';
import DashboardPage from './components/shark/DashboardPage';
import Sidebar from './components/shark/LeftSidebar';

function App() {
  return (
    <div className="min-h-screen bg-white text-black flex">
      <Router>
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-8">
          <Routes>
            <Route path="/" element={<SmartAquarium />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
