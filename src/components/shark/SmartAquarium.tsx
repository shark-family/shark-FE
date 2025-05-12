import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Home,
  Map,
  Settings,
  Zap,
  HelpCircle,
} from 'lucide-react';
import PHIcon from '../../assets/PH.svg';
import TemperatureIcon from '../../assets/Temperature.svg';
import AmmoniaIcon from '../../assets/ammonia.svg';
import OxygenIcon from '../../assets/oxygen.svg';
import SalinityIcon from '../../assets/salinity.svg';
import TurbidityIcon from '../../assets/turbidity.svg';
import SensorBox from './SensorBox';
import SensorActivationModal from './SensorActivationModal';

interface SensorBoxProps {
  name: string;
  sensors: string[];
  status: string;
}

const sensorIconMap: Record<string, { label: string; icon: string; bgColor: string }> = {
  '염도': { label: '염도', icon: SalinityIcon, bgColor: 'bg-[#FFF6D4]' },
  '탁도': { label: '탁도', icon: TurbidityIcon, bgColor: 'bg-[#E6D8CD]' },
  '용존 산소': { label: '용존 산소', icon: OxygenIcon, bgColor: 'bg-[#E1F3FF]' },
  '암모니아': { label: '암모니아', icon: AmmoniaIcon, bgColor: 'bg-[#DFFFEF]' },
  '온도': { label: '온도', icon: TemperatureIcon, bgColor: 'bg-[#E5F5FF]' },
  'PH': { label: 'PH', icon: PHIcon, bgColor: 'bg-[#F1FFE3]' },
};

const SmartAquarium: React.FC = () => {
  const [tankData, setTankData] = useState<SensorBoxProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTank, setSelectedTank] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/user-info/your_username');
        interface Tank {
          name: string;
          activeSensors: string[];
          status: string;
        }

        const aquariums = res.data.aquariums.map((tank: Tank) => ({
          name: tank.name,
          sensors: tank.activeSensors.map((type: string) => {
            switch (type.toLowerCase()) {
              case 'ph': return 'PH';
              case 'nh4': return '암모니아';
              default: return type;
            }
          }),
          status: tank.status,
        }));
        setTankData(aquariums);
      } catch (err) {
        console.error('Error fetching tank data:', err);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (tankName: string, status: string) => {
    if (status === '가동중') {
      const confirmed = window.confirm('이 센서 박스를 중지하시겠습니까?');
      if (confirmed) {
        setTankData((prev) =>
          prev.map((tank) =>
            tank.name === tankName ? { ...tank, status: '비가동' } : tank
          )
        );
      }
    } else {
      setSelectedTank(tankName);
      setShowModal(true);
    }
  };
  

  const handleCloseModal = () => {
    setSelectedTank(null);
    setShowModal(false);
  };

  const handleSensorConfirm = (managerId: string, selectedSensors: string[], tankName: string) => {
    console.log('✅ 센서 설정 확인됨!');
    console.log('관리자 ID:', managerId);
    console.log('선택된 센서:', selectedSensors);
    console.log('대상 수조:', tankName);
  
    // TODO: 여기에 실제 서버 전송 로직을 추가할 수 있어요.
    // 예: axios.post('/api/sensor-activate', { managerId, selectedSensors, tankName });
  };
  

  return (
    <div className="flex min-h-screen">
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
        <h1 className="text-2xl font-bold mb-4 text-center">공주대학교 스마트양식장 대시보드</h1>

        <div className="bg-white rounded-3xl p-4 mb-6 shadow-sm mx-auto w-fit">
          <h3 className="text-xl text-gray-700 mb-6 font-semibold text-[#303030] ">가용 센서 현황</h3>
          <div className="flex gap-6 flex-wrap justify-center ">
            {['염도', '탁도', '용존 산소', '암모니아', '온도', 'PH'].map((item, i) => {
              const sensor = sensorIconMap[item];
              return (
                <div key={i} className="flex flex-col items-center text-sm text-gray-700 w-24">
                  <div className="flex items-center justify-center gap-2">
                    <img src={sensor.icon} alt={sensor.label} className="w-8 h-8" />
                    <span className="text-xs text-[#FF6065] bg-[#FFF7E4] px-2 py-0.5 rounded-full font-semibold">
                      1개
                    </span>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[#303030]">{sensor.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tankData.map((tank, idx) => (
            <SensorBox
              key={idx}
              name={tank.name}
              sensors={tank.sensors}
              status={tank.status}
              onClick={() => handleOpenModal(tank.name, tank.status)}
            />
          ))}
        </div>
      </main>

      {showModal && selectedTank && (
        <SensorActivationModal
        tankName={selectedTank}
        onClose={handleCloseModal}
        onConfirm={handleSensorConfirm}
        />
      )}
    </div>
  );
};

export default SmartAquarium;
