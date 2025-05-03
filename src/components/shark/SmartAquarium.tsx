// SmartAquarium.tsx
import React from 'react';
import {
  Home,
  Map,
  Settings,
  Zap,
  HelpCircle,
} from 'lucide-react';

interface SensorBoxProps {
  name: string;
  sensors: string[];
}

const iconMap: Record<string, { label: string; icon: string }> = {
  '온도': { label: '온도', icon: '🌡️' },
  '용존 산소': { label: '용존 산소', icon: '🫧' },
  '염도': { label: '염도', icon: '🧂' },
  'PH': { label: 'PH', icon: '🧪' },
  '암모니아': { label: '암모니아', icon: '🧬' },
  '탁도': { label: '탁도', icon: '💧' },
};

const tankData: SensorBoxProps[] = [
  { name: 'A수조', sensors: ['온도', '용존 산소', '염도'] },
  { name: 'B수조', sensors: ['PH', '암모니아', '탁도'] },
  { name: 'C수조', sensors: ['온도', '암모니아', '용존 산소'] },
  { name: 'D수조', sensors: ['염도', '탁도', '용존 산소'] },
  { name: 'E수조', sensors: ['온도', '용존 산소', '염도'] },
  { name: 'F수조', sensors: ['PH', '암모니아', '탁도'] },
  { name: 'G수조', sensors: ['온도', '암모니아', '용존 산소'] },
  { name: 'H수조', sensors: ['염도', '탁도', '용존 산소'] },
];

const SensorBox: React.FC<SensorBoxProps> = ({ name, sensors }) => (
  <div className="bg-white rounded-3xl p-5 shadow-sm w-full max-w-[370px] flex flex-col items-start">
    <div className="flex justify-between items-center w-full mb-2">
      <h2 className="text-xl font-bold text-blue-900">{name}</h2>
      <span className="text-xs bg-blue-100 text-blue-600 rounded-md px-2 py-0.5 font-medium">가동중</span>
    </div>
    <hr className="w-full mb-3 border-gray-200" />
    <div className="text-sm text-gray-500 mb-2">가동 센서</div>
    <div className="flex justify-start gap-4 mb-4">
      {sensors.map((sensor, idx) => (
        <div key={idx} className="flex flex-col items-center gap-1 text-sm">
          <span className="text-5xl">{iconMap[sensor]?.icon}</span>
          <span className="text-gray-700 text-xs whitespace-nowrap">{sensor}</span>
        </div>
      ))}
    </div>
    <div className="flex justify-between items-center w-full">
      <div className="text-sm text-gray-600">어종 : <span className="font-semibold text-gray-800">연어</span></div>
      <button className="text-xs text-orange-500 bg-orange-50 px-3 py-1 rounded-full font-semibold">로그보기</button>
    </div>
  </div>
);

const SmartAquarium: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-extrabold px-6 py-6 text-blue-600">Smart Aquarium</h1>
          <nav className="flex flex-col gap-2 px-4">
            <a href="#" className="flex items-center gap-2 p-2 rounded-lg text-gray-600 hover:bg-blue-50">
              <Home size={18} /> Measured Result
            </a>
            <a href="#" className="flex items-center gap-2 p-2 rounded-lg text-blue-600 font-semibold bg-blue-100">
              <Zap size={18} /> Sensor Control
            </a>
            <a href="#" className="flex items-center gap-2 p-2 rounded-lg text-gray-600 hover:bg-blue-50">
              <Map size={18} /> Detail Map
            </a>
          </nav>
          <div className="mt-8 px-4 text-sm text-gray-500">Support</div>
          <nav className="flex flex-col gap-2 px-4 mt-2">
            <a href="#" className="flex items-center gap-2 p-2 rounded-lg text-gray-600 hover:bg-blue-50">
              <HelpCircle size={18} /> Get Started
            </a>
            <a href="#" className="flex items-center gap-2 p-2 rounded-lg text-gray-600 hover:bg-blue-50">
              <Settings size={18} /> Settings
            </a>
          </nav>
        </div>
        <div className="px-6 py-4 text-xs text-gray-400 border-t">
          <img src="https://upload.wikimedia.org/wikipedia/ko/6/66/Kongju.png" alt="공주대학교" className="w-8 h-8 mb-2" />
          공주대학교
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Sensor Control</h2>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).replace(/\. /g, '.').replace(/\.$/, '')}
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4">공주대학교 스마트양식장 대시보드</h1>

        {/* 센서 현황 */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="text-sm text-gray-700 mb-2">가용 센서 현황</h3>
          <div className="flex gap-4 flex-wrap">
            {['염도', '탁도', '용존 산소', '암모니아', '온도', 'PH'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="bg-orange-100 px-2 py-0.5 rounded-md text-orange-500 font-semibold">{item}</span>
                <span className="text-xs text-gray-500">1개</span>
              </div>
            ))}
          </div>
        </div>

        {/* 수조 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tankData.map((tank, idx) => (
            <SensorBox key={idx} name={tank.name} sensors={tank.sensors} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default SmartAquarium;