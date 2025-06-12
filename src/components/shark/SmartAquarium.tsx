// ✅ SmartAquarium.tsx

import React, { useEffect, useState } from 'react';
import PHIcon from '../../assets/PH.svg';
import TemperatureIcon from '../../assets/Temperature.svg';
import AmmoniaIcon from '../../assets/ammonia.svg';
import OxygenIcon from '../../assets/oxygen.svg';
import SalinityIcon from '../../assets/salinity.svg';
import TurbidityIcon from '../../assets/turbidity.svg';
import SensorBox from './SensorBox';
import SensorActivationModal from './SensorActivationModal';
import axiosInstance from '../../axiosInstance';
import LogModal from './LogModal';

interface LogEntry {
  sensor_type: string;
  user_name: string;
  started_at: string;
  stopped_at: string | null;
}

interface SensorBoxProps {
  name: string;
  sensors: { type: string; value: string }[];
  status: string;
  aquarium_id: number;
  fish_type: string;
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
  const [allSensors, setAllSensors] = useState<{ type: string; id: number }[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedTank, setSelectedTank] = useState<SensorBoxProps | null>(null);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [selectedLogs, setSelectedLogs] = useState<LogEntry[]>([]);
  const [selectedTankName, setSelectedTankName] = useState<string>('');
  const [anomalyMap, setAnomalyMap] = useState<Record<number, boolean>>({});

  const fetchAnomalies = async () => {
    try {
      const res = await axiosInstance.get('/api/anomaly-recent');
      const map: Record<number, boolean> = {};
      res.data.forEach((item: any) => {
        map[item.aquarium_id] = true;
      });
      setAnomalyMap(map);
    } catch (err) {
      console.error('❌ 이상치 데이터 불러오기 실패:', err);
    }
  };

  
  const refetchData = async () => {
    try {
      const res = await axiosInstance.get('/api/user-info/관리자A');
      const typeMap: Record<string, string> = {
        ph: 'PH', nh4: '암모니아', do: '용존 산소', temp: '온도', salt: '염도', turbi: '탁도'
      };

      const sensors = res.data.sensors.map((s: any) => ({
        type: typeMap[s.type?.toLowerCase?.()] || s.type,
        id: s.id,
      }));
      setAllSensors(sensors);
      setUserId(res.data.user_id);

      const aquariums = res.data.aquariums.map((tank: any) => {
        const sensors = (tank.activeSensors || []).map((sensor: any) => ({
          type: typeMap[sensor.type?.toLowerCase?.()] || sensor.type,
          value: sensor.value,
        }));      

        return {
          name: tank.name,
          sensors,
          status: tank.status,
          aquarium_id: tank.aquarium_id || tank.id,
          fish_type: tank.fish_type,
        };
      });
      setTankData(aquariums);
      await fetchAnomalies();
    } catch (err) {
      console.error('❌ 데이터 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    refetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('🔄 5분 간격 자동 새로고침 중...');
      refetchData();
    }, 1 * 60 * 1000); // 5분 = 300,000ms

    // 컴포넌트 언마운트 시 인터벌 제거
    return () => clearInterval(intervalId);
  }, []);

  const handleOpenModal = (tank: SensorBoxProps) => {
    setSelectedTank(tank);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTank(null);
    setShowModal(false);
  };

  const handleSensorConfirm = (managerId: string, selectedSensors: string[], tankName: string) => {
    console.log('✅ 센서 설정 완료:', { managerId, selectedSensors, tankName });
  };

  const handleLogClick = async (aquariumId: number, tankName: string) => {
    try {
      const res = await axiosInstance.get(`/api/aquarium-log/${aquariumId}`);
      setSelectedLogs(res.data.logs);
      setSelectedTankName(tankName);
      setLogModalOpen(true);
    } catch (err) {
      console.error('❌ 로그 불러오기 실패:', err);
    }
  };

  const handleSensorStop = async (sensorType: string) => {
    try {
      const sensor = allSensors.find((s) => s.type === sensorType);
      if (!sensor) return alert('센서 정보를 찾을 수 없습니다.');

      const res = await axiosInstance.post('/api/stop-sensor', {
        sensor_id: sensor.id,
      });
      alert(res.data.status || '센서 작동 중지 완료');
      await refetchData();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.status || '❌ 작동 중지 실패');
    }
  };

  return (
    <div className="flex min-h-screen">

      <main className="flex-1 bg-gray-50 p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Sensor Control</h2>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('ko-KR', {
              year: 'numeric', month: '2-digit', day: '2-digit'
            }).replace(/\. /g, '.').replace(/\.$/, '')}
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-center">공주대학교 스마트양식장 대시보드</h1>

        {/* ✅ 센서 현황 */}
        <div className="bg-white rounded-3xl p-4 mb-6 shadow-sm mx-auto w-fit">
          <h3 className="text-xl text-gray-700 mb-6 font-semibold text-[#303030]">가용 센서 현황</h3>
          <div className="flex gap-6 flex-wrap justify-center">
            {Array.from(new Set(allSensors.map(s => s.type))).map((type, i) => {
              const sensor = sensorIconMap[type];
              if (!sensor) return null; // 보호 코드

              return (
                <div key={i} className="flex flex-col items-center text-sm text-gray-700 w-24">
                  <div className="flex items-center justify-center gap-2">
                    <img src={sensor.icon} alt={sensor.label} className="w-8 h-8" />
                    <span className="text-xs text-[#FF6065] bg-[#FFF7E4] px-2 py-0.5 rounded-full font-semibold">
                      {allSensors.filter(s => s.type === type).length}개
                    </span>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[#303030]">{sensor.label}</div>
                </div>
              );
            })}
          </div>
        </div>

            {/* ✅ 수조 카드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tankData.map((tank, idx) => {
          const isAnomalous = anomalyMap[tank.aquarium_id];
          return (
            <div
              key={idx}
              className={isAnomalous ? 'border-2 border-red-500 rounded-2xl' : ''}
            >
              <SensorBox
                name={tank.name}
                sensors={tank.sensors}
                status={tank.status}
                aquariumId={tank.aquarium_id}
                fish_type={tank.fish_type}
                onClick={() => handleOpenModal(tank)}
                onLogClick={() => handleLogClick(tank.aquarium_id, tank.name)}
                onSensorStop={handleSensorStop}
              />
            </div>
          );
        })}
      </div>
    </main>

      {/* ✅ 모달 */}
      {showModal && selectedTank && (
        <SensorActivationModal
          tankName={selectedTank.name}
          onClose={handleCloseModal}
          onConfirm={handleSensorConfirm}
          allSensors={allSensors}
          currentTankSensors={selectedTank.sensors.map(s => s.type)}
          userId={userId}
          aquariumId={selectedTank.aquarium_id}
        />
      )}

      {logModalOpen && (
        <LogModal
          logs={selectedLogs}
          tankName={selectedTankName}
          onClose={() => setLogModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SmartAquarium;