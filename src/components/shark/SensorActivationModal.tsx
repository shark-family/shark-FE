import React, { useState } from 'react';
import axios from 'axios';

interface SensorActivationModalProps {
  tankName: string;
  onClose: () => void;
  onConfirm: (managerId: string, selectedSensors: string[], tankName: string) => void;
}

const AVAILABLE_SENSORS = [
  '용존산소', 'PH', '온도', '암모니아', '염도', '탁도',
];

const SENSOR_TYPE_MAP: Record<string, number> = {
  '용존산소': 1,
  'PH': 2,
  '온도': 3,
  '암모니아': 4,
  '염도': 5,
  '탁도': 6,
};

const TANK_NAME_TO_ID: Record<string, number> = {
  'A수조': 1,
  'B수조': 2,
  'C수조': 3,
  'D수조': 4,
  'E수조': 5,
  'F수조': 6,
  'G수조': 7,
  'H수조': 8,
};

const SensorActivationModal: React.FC<SensorActivationModalProps> = ({ tankName, onClose, onConfirm }) => {
  const [managerId, setManagerId] = useState('');
  const [selectedSensor, setSelectedSensor] = useState('');
  const [sensorList, setSensorList] = useState<string[]>([]);

  const handleAddSensor = () => {
    if (selectedSensor && !sensorList.includes(selectedSensor) && sensorList.length < 3) {
      setSensorList([...sensorList, selectedSensor]);
      setSelectedSensor('');
    }
  };

  const handleConfirm = async () => {
    if (managerId && sensorList.length > 0) {
      onConfirm(managerId, sensorList, tankName);

      const aquariumId = TANK_NAME_TO_ID[tankName];
      const userId = parseInt(managerId, 10);
      const sensorIds = sensorList.map(sensor => SENSOR_TYPE_MAP[sensor]);

      try {
        await axios.post('/api/activate-sensor', {
          user_id: userId,
          aquarium_id: aquariumId,
          sensor_ids: sensorIds, // 리스트로 전송
        });
      } catch (err) {
        console.error('❌ 센서 등록 실패:', err);
      }

      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6">Sensor 가동 설정 - {tankName}</h2>

        <label className="block text-sm mb-2">관리자 ID를 입력하세요.</label>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
            className="border rounded-md flex-1 px-3 py-2"
          />
          <button className="text-sm text-blue-600 bg-blue-100 px-4 py-2 rounded-md">인증</button>
        </div>

        <label className="block text-sm mb-2">사용할 센서를 입력하세요.</label>
        <div className="flex items-center gap-2 mb-4">
          <select
            value={selectedSensor}
            onChange={(e) => setSelectedSensor(e.target.value)}
            className="border rounded-md px-3 py-2 flex-1"
          >
            <option value="">선택하기</option>
            {AVAILABLE_SENSORS.map((sensor) => (
              <option key={sensor} value={sensor}>{sensor}</option>
            ))}
          </select>
          <button
            onClick={handleAddSensor}
            className="text-xl bg-gray-200 px-3 py-1 rounded-md"
          >+
          </button>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">선택된 센서:</div>
          <div className="flex gap-2 flex-wrap">
            {sensorList.map((sensor, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
              >
                {sensor}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md text-sm">취소</button>
          <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SensorActivationModal;