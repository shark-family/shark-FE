"use client";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full">
      <div className="flex flex-wrap gap-5 justify-between self-stretch mr-5 ml-4 w-full text-2xl font-bold text-black max-w-[1359px] max-md:mr-2.5 max-md:max-w-full">
        <h2 className="gap-4 self-stretch text-black">Sensor Control</h2>
        <time className="gap-4 self-stretch text-black whitespace-nowrap">
          2025.05.02
        </time>
      </div>
      <div className="flex shrink-0 self-stretch mt-3.5 h-px bg-black bg-opacity-10 max-md:max-w-full" />
    </header>
  );
};

export default Header;
