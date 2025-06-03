import React, { useState } from 'react';
import Map from '../../assets/map.png';

const DetailMap: React.FC = () => {
  const [selectedTank, setSelectedTank] = useState<number | null>(null);

  const handleTankClick = (tankNumber: number) => {
    setSelectedTank(tankNumber);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      {/* 제목 */}
      <h1 className="text-2xl font-bold text-blue-600 mb-2">
        📍 Smart Aquarium Detail Map
      </h1>
      <p className="text-gray-500 mb-4 text-sm text-center">
        AGV의 이동 경로 및 수조 위치 정보를 확인할 수 있는 상세 지도입니다.
      </p>

      {/* 선택된 수조 상태 표시 */}
      {selectedTank && (
        <div className="mb-4 text-base font-semibold text-green-600">
          🚗 AGV가 <span className="font-bold">{selectedTank}번 수조</span>로 이동 중입니다!
        </div>
      )}

      {/* 지도 영역 */}
      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
        <img
          src={Map}
          alt="Aquarium Map"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* 수조 선택 버튼 */}
      <div className="mt-8 w-full max-w-4xl">
        <p className="text-gray-500 mb-4 text-sm">
          AGV를 원하는 수조로 이동시켜보세요!
        </p>
        <h2 className="text-lg font-semibold mb-3">수조 선택</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {Array.from({ length: 10 }, (_, i) => (
            <button
              key={i}
              onClick={() => handleTankClick(i + 1)}
              className={`py-2 rounded-lg transition text-sm font-medium ${
                selectedTank === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-100 hover:bg-blue-500 hover:text-white text-blue-800'
              }`}
            >
              수조 {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailMap;
