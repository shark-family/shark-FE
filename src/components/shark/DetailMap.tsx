import React from 'react';
import Map from '../../assets/map.png';

const DetailMap: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">
        Smart Aquarium Detail Map
      </h1>

      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg border bg-white">
        <img
          src={Map}
          alt="Aquarium Map"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default DetailMap;
