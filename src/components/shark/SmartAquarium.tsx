// ✅ SmartAquarium.tsx

import React, { useEffect, useState } from 'react';
import PHIcon from '../../assets/PH.svg';
// import TemperatureIcon from '../../assets/Temperature.svg';
// import AmmoniaIcon from '../../assets/ammonia.svg';
import OxygenIcon from '../../assets/oxygen.svg';
import SalinityIcon from '../../assets/EC.svg';
import TurbidityIcon from '../../assets/turbidity.svg';

// 새 아이콘 추가
import OrpIcon from '../../assets/ORP.svg';
import TdsIcon from '../../assets/TDS.svg';

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

// 화면 라벨 → 아이콘 매핑 (아이콘이 없는 라벨은 나중에 기본 배지로 표시)
const sensorIconMap: Record<
  string,
  { label: string; icon: string; bgColor: string }
> = {
  'EC': { label: 'EC', icon: SalinityIcon, bgColor: 'bg-[#FFF6D4]' },
  '탁도': { label: '탁도', icon: TurbidityIcon, bgColor: 'bg-[#E6D8CD]' },
  '용존 산소': { label: '용존 산소', icon: OxygenIcon, bgColor: 'bg-[#E1F3FF]' },
  '전기전도도': { label: '전기전도도', icon: TdsIcon, bgColor: 'bg-[#DFFFEF]' },
  'ORP': { label: 'ORP', icon: OrpIcon, bgColor: 'bg-[#E5F5FF]' },
  'PH': { label: 'PH', icon: PHIcon, bgColor: 'bg-[#F1FFE3]' },

  // 새 아이콘
  //'ORP': { label: 'ORP', icon: OrpIcon, bgColor: 'bg-[#EFEFFF]' },
  //'TDS': { label: 'TDS', icon: TdsIcon, bgColor: 'bg-[#F0F7FF]' },
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

      // DB/백엔드 타입 → 화면 라벨
      const typeMap: Record<string, string> = {
        // 현재 DB 컬럼명 기준
        ph: 'PH',
        do_val: '용존 산소',
        do: '용존 산소',
        ec: 'EC',
        turbidity: '탁도',
        tds: '전기전도도',
        orp: 'ORP',

        // (있을 수 있는 과거 키 하위호환)
        // do: '용존 산소',
        // salt: '염도',
        // turbi: '탁도',
        // nh4: '암모니아',
        // temp: '온도',
      };

      // 상단 “가용 센서 현황”
      const sensors = res.data.sensors.map((s: any) => ({
        type: typeMap[s.type?.toLowerCase?.()] || s.type,
        id: s.id,
      }));
      setAllSensors(sensors);
      setUserId(res.data.user_id);

      // 값 포맷: 소수점 2자리
      // 값 포맷: 소수점 2자리 (값이 없으면 그대로 null 반환)
      const fmt = (v: any) => {
        if (v === null || v === undefined) return v;
        const n = Number(v);
        if (!Number.isFinite(n)) return v;       // 숫자가 아니면 원본 그대로
        return n % 1 === 0                       // 정수면 그대로
          ? String(n)
          : n.toFixed(2).replace(/\.?0+$/, '');  // 소수점 2자리, 끝 0 제거
      };

      // 수조 카드용 데이터
      const aquariums: SensorBoxProps[] = res.data.aquariums.map((tank: any) => {
        const sensors = (tank.activeSensors || []).map((sensor: any) => ({
          type: typeMap[sensor.type?.toLowerCase?.()] || sensor.type,
          value: fmt(sensor.value),
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
    }, 1 * 60 * 1000); // 1분
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

  // 기본 아이콘(없을 때) – 둥근 테두리에 텍스트만
  const FallbackIcon: React.FC<{ text: string }> = ({ text }) => (
    <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-[10px] font-semibold text-gray-600">
      {text}
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 bg-gray-50 p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Sensor Control</h2>
          <div className="text-sm text-gray-500">
            {new Date()
              .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
              .replace(/\. /g, '.')
              .replace(/\.$/, '')}
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-center">공주대학교 스마트양식장 대시보드</h1>

        {/* ✅ 가용 센서 현황 */}
        <div className="bg-white rounded-3xl p-4 mb-6 shadow-sm mx-auto w-fit">
          <h3 className="text-xl text-gray-700 mb-6 font-semibold text-[#303030]">가용 센서 현황</h3>
          <div className="flex gap-6 flex-wrap justify-center">
            {Array.from(new Set(allSensors.map((s) => s.type))).map((type, i) => {
              const meta = sensorIconMap[type];
              const count = allSensors.filter((s) => s.type === type).length;

              return (
                <div key={i} className="flex flex-col items-center text-sm text-gray-700 w-24">
                  <div className="flex items-center justify-center gap-2">
                    {meta?.icon ? (
                      <img src={meta.icon} alt={meta.label} className="w-8 h-8" />
                    ) : (
                      <FallbackIcon text={type} />
                    )}
                    <span className="text-xs text-[#FF6065] bg-[#FFF7E4] px-2 py-0.5 rounded-full font-semibold">
                      {count}개
                    </span>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[#303030]">
                    {meta?.label || type}
                  </div>
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
              <div key={idx} className={isAnomalous ? 'border-2 border-red-500 rounded-2xl' : ''}>
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
          currentTankSensors={selectedTank.sensors.map((s) => s.type)}
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
