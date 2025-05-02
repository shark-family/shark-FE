import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full px-4 py-4 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center text-2xl font-bold text-black">
        <h2>Sensor Control</h2>
        <time className="whitespace-nowrap">2025.05.02</time>
      </div>
      <div className="mt-4 h-px bg-black bg-opacity-10 w-full" />
    </header>
  );
};

export default Header;