import React from "react";

interface Sensor {
  icon: string;
  name: string;
}

interface TankCardProps {
  tankId: string;
  status: string;
  sensors: Sensor[];
  fishType: string;
}

const TankCard: React.FC<TankCardProps> = ({ tankId, status, sensors, fishType }) => {
  return (
    <article className="w-[257px] p-6 bg-white border border-gray-200 rounded-[35px] shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-4xl text-slate-500 font-semibold">{tankId}수조</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-400 text-sm rounded-xl">{status}</span>
      </div>

      <hr className="my-4 border-t border-gray-200" />

      <div className="text-sm font-semibold text-black mb-2">가동 센서</div>

      <div className="flex justify-between items-center">
        {sensors.map((sensor) => (
          <div key={sensor.name} className="text-center text-xs font-semibold text-black">
            <img src={sensor.icon} alt={sensor.name} className="w-8 h-8 mx-auto" />
            <div className="mt-1">{sensor.name}</div>
          </div>
        ))}
      </div>

      <hr className="my-4 border-t border-gray-200" />

      <div className="flex justify-between items-center">
        <div className="text-slate-500 text-base">어종: {fishType}</div>
        <button className="bg-yellow-50 text-red-400 text-sm px-4 py-1 rounded-xl">
          로그보기
        </button>
      </div>
    </article>
  );
};

export default TankCard;