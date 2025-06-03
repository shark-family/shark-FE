// components/shark/Sidebar.tsx

import React from 'react';
import { Home, Map, Zap } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-60 bg-white shadow-md flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-extrabold px-6 py-6 text-blue-600">Smart Aquarium</h1>
        <nav className="flex flex-col gap-2 px-4">
          <a className="flex items-center gap-2 p-2 rounded-lg text-gray-600 hover:bg-blue-50" href="/">
            <Home size={18} /> Measured Result
          </a>
          <a className="flex items-center gap-2 p-2 rounded-lg text-blue-600 font-semibold bg-blue-100">
            <Zap size={18} /> Sensor Control
          </a>
          <a className="flex items-center gap-2 p-2 rounded-lg text-gray-600 hover:bg-blue-50" href="#">
            <Map size={18} /> Detail Map
          </a>
          <a className="flex items-center gap-2 p-2 rounded-lg text-gray-600 hover:bg-blue-50" href="/dashboard">
            📊 Dash Board
          </a>
        </nav>
      </div>
      <div className="px-6 py-4 text-xs text-gray-400 border-t">
        <img
          src="https://ipsi.kongju.ac.kr/images/core/logo2.png"
          alt="공주대학교"
          className="w-8 h-8 mb-2"
        />
        공주대학교
      </div>
    </aside>
  );
};

export default Sidebar;
