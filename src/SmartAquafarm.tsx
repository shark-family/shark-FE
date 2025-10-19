import { useState } from 'react';
import { create } from 'zustand';

interface SensorLog {
  manager: string;
  sensors: string[];
}

interface TankState {
  logs: Record<number, SensorLog | null>;
  setLog: (tankId: number, log: SensorLog) => void;
}

const useTankStore = create<TankState>((set) => ({
  logs: {
    1: null, 2: null, 3: null, 4: null, 5: null, 6: null
  },
  setLog: (tankId, log) => set((state) => ({
    logs: { ...state.logs, [tankId]: log },
  })),
}));

// const sensors = ['PH', '용존 산소', '탁도', '온도', '암모니아'];
const sensors = ['PH', '용존 산소', 'EC', '탁도', '전기전도도', 'ORP']

export default function SmartAquafarm() {
  const { logs, setLog } = useTankStore();
  const [managerId, setManagerId] = useState('');
  const [selectedTank, setSelectedTank] = useState<number | null>(null);
  const [selectedSensors, setSelectedSensors] = useState<string[]>([]);

  const handleSensorToggle = (sensor: string) => {
    setSelectedSensors((prev) =>
      prev.includes(sensor) ? prev.filter((s) => s !== sensor) : [...prev, sensor]
    );
  };

  const handleSubmit = () => {
    if (!managerId || selectedTank === null || selectedSensors.length === 0) {
      alert('모든 항목을 입력해 주세요.');
      return;
    }
    setLog(selectedTank, { manager: managerId, sensors: selectedSensors });
    alert('입력되었습니다.');
    setManagerId('');
    setSelectedTank(null);
    setSelectedSensors([]);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">스마트 양식장 센서 입력</h1>
      <input
        type="text"
        placeholder="관리자 ID 입력"
        value={managerId}
        onChange={(e) => setManagerId(e.target.value)}
        className="border px-4 py-2 rounded w-full mb-4"
      />

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <button
            key={id}
            onClick={() => setSelectedTank(id)}
            className={`py-2 px-4 rounded border ${selectedTank === id ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          >
            {id}번 수조
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {sensors.map((sensor) => (
          <button
            key={sensor}
            onClick={() => handleSensorToggle(sensor)}
            className={`py-1 px-3 rounded border ${selectedSensors.includes(sensor) ? 'bg-green-500 text-white' : 'bg-white text-black'}`}
          >
            {sensor}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        확인
      </button>

      <h2 className="text-lg font-semibold mt-8 mb-2">수조별 센서 입력 로그</h2>
      <div className="grid grid-cols-1 gap-2">
        {Object.entries(logs).map(([id, log]) => (
          <div key={id} className="border rounded p-4 bg-white">
            <p className="font-medium">{id}번 수조</p>
            {log ? (
              <>
                <p>관리자: {log.manager}</p>
                <p>센서: {log.sensors.join(', ')}</p>
              </>
            ) : (
              <p className="text-gray-500">입력 없음</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
