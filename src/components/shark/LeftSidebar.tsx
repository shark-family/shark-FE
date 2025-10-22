// components/shark/Sidebar.tsx

import React from 'react';
import { Home, Map, Zap, Activity, Camera } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: 'Measured Result', icon: <Home size={18} />, href: '/measuredresult' },
    { label: 'Sensor Control', icon: <Zap size={18} />, href: '/' },
    { label: 'Detail Map', icon: <Map size={18} />, href: '/detailmap' },
    { label: 'Dash Board', icon: <Activity size={18} />, href: '/dashboard' },
    { label: 'Camera View', icon: <Camera size={18} />, href: '/cameraview' },
  ];

  return (
    <aside className="w-60 bg-white shadow-md flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-extrabold px-6 py-6 text-blue-600">Smart Aquarium</h1>
        <nav className="flex flex-col gap-2 px-4">
          {navItems.map(({ label, icon, href }) => {
            const isActive = currentPath === href;

            return (
              <a
                key={label}
                href={href}
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isActive
                    ? 'text-blue-600 font-semibold bg-blue-100'
                    : 'text-gray-600 hover:bg-blue-50'
                }`}
              >
                {icon} {label}
              </a>
            );
          })}
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
