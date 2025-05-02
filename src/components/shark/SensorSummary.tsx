import React from "react";

interface Sensor {
  icon: string;
  name: string;
  count: number;
}

interface SensorSummaryProps {
  sensors: Sensor[];
}

const SensorSummary: React.FC<SensorSummaryProps> = ({ sensors }) => {
  return (
    <section className="flex flex-col px-6 pt-6 mt-12 text-xl font-semibold text-black bg-white border border-gray-100 rounded-[47px] shadow-md w-full max-w-[719px]">
      <h3 className="self-start tracking-tight">가용 센서 현황</h3>
      <div className="flex flex-wrap gap-6 items-center mt-5">
        {sensors.map(({ icon, name, count }) => (
          <div key={name} className="flex flex-col items-center text-sm">
            <div className="relative">
              <img src={icon} alt={name} className="w-10 h-10" />
              <div className="absolute -top-2 -right-2 bg-yellow-200 text-red-600 text-xs px-2 py-0.5 rounded-full">
                {count}개
              </div>
            </div>
            <span className="mt-1">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SensorSummary;
