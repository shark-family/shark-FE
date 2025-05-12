import React from 'react';

interface SensorBoxProps {
  name: string;
  sensors: { type: string; value: string }[];
  status: string;
  onClick?: () => void;
  onLogClick?: () => void;
}


const colorMap: Record<string, string> = {
  '온도': 'text-red-500',
  '용존 산소': 'text-blue-500',
  '염도': 'text-yellow-500',
  'PH': 'text-green-500',
  '암모니아': 'text-purple-500',
  '탁도': 'text-gray-500',
};

const SensorBox: React.FC<SensorBoxProps> = ({ name, sensors, status, onClick, onLogClick }) => (
  <div
    onClick={status !== '가동중' ? onClick : undefined}
    className={`bg-white rounded-3xl p-5 shadow-sm w-full max-w-[370px] flex flex-col items-start cursor-${status !== '가동중' ? 'pointer' : 'default'} transition hover:shadow-md`}
  >
    {/* 제목 영역 */}
    <div className="flex justify-between items-center w-full mb-2">
      <h2 className="text-3xl font-bold text-blue-900">{name}</h2>
      <span className="text-xs bg-blue-100 text-blue-600 rounded-md px-2 py-0.5 font-medium">{status}</span>
    </div>

    <hr className="w-full mb-3 border-gray-200" />

    {/* 센서 값 표시 */}
    <div className="text-sm text-gray-500 mb-2">가동 센서</div>
    <div className="flex justify-center gap-8 mb-4 w-full">
      {sensors.length > 0 ? (
        sensors.map((sensor, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className={`font-bold text-xl ${colorMap[sensor.type] || 'text-gray-600'}`}>{sensor.value || '-'}</div>
            <div className="text-sm text-gray-500 mt-1">{sensor.type}</div>
          </div>
        ))
      ) : (
        <div className="text-center w-full text-gray-400">센서 없음</div>
      )}
    </div>

    <hr className="w-full mb-3 border-gray-200" />

    {/* 어종 + 버튼 */}
    <div className="flex justify-between items-center w-full">
      <div className="text-sm text-[#4E6890]">
        어종 : <span className="font-semibold text-[#4E6890]">연어</span>
      </div>
      <button
        onClick={onLogClick}
        className="text-xs text-[#FF6065] bg-[#FFF7E4] px-3 py-1 rounded-full font-semibold"
      >
        로그보기
      </button>
    </div>
  </div>
);

export default SensorBox;
