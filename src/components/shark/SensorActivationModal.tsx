import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance'; 

interface SensorActivationModalProps {
  tankName: string;
  onClose: () => void;
  onConfirm: (managerId: string, selectedSensors: string[], tankName: string) => void;
  allSensors: { type: string; id: number }[];
  currentTankSensors: string[];
  userId: number;
  aquariumId: number;
}

const SensorActivationModal: React.FC<SensorActivationModalProps> = ({
  tankName,
  onClose,
  onConfirm,
  allSensors,
  currentTankSensors,
  userId,
  aquariumId,
}) => {
  const [managerId] = useState(userId.toString());
  const [selectedSensor, setSelectedSensor] = useState('');
  const [sensorList, setSensorList] = useState<string[]>([]);

  const filteredAvailableSensors = allSensors.filter(
    (sensor) => !sensorList.includes(sensor.type)
  );

  const handleAddSensor = () => {
    if (selectedSensor && !sensorList.includes(selectedSensor) && sensorList.length < 3) {
      setSensorList([...sensorList, selectedSensor]);
      setSelectedSensor('');
    }
  };

  const handleConfirm = async () => {
    if (!managerId || sensorList.length === 0) return;
    onConfirm(managerId, sensorList, tankName);
  
    try {
      for (const sensorType of sensorList) {
        const sensorId = allSensors.find(s => s.type === sensorType)?.id;
        if (sensorId) {
          const res = await axiosInstance.post('/api/start-sensor', {
            user_id: Number(managerId),
            aquarium_id: aquariumId,
            sensor_id: sensorId,
          });
          console.log('✅ 등록 성공 응답:', res.data);
        }
      }
      onClose();
    } catch (err: any) {
      console.error('❌ 등록 실패 응답:', err?.response);
      const msg = err?.response?.data?.status || '❌ 센서 등록 중 오류가 발생했습니다.';
      alert(msg);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6">Sensor 가동 설정 - {tankName}</h2>

        <label className="block text-sm mb-2">관리자 ID</label>
        <input
          type="text"
          value={managerId}
          disabled
          className="border rounded-md px-3 py-2 mb-4 w-full bg-gray-100 text-gray-500"
        />

        <label className="block text-sm mb-2">사용할 센서</label>
        <div className="flex items-center gap-2 mb-4">
          <select
            value={selectedSensor}
            onChange={(e) => setSelectedSensor(e.target.value)}
            className="border rounded-md px-3 py-2 flex-1"
          >
            <option value="">선택하기</option>
            {filteredAvailableSensors.map((sensor) => (
              <option key={sensor.type} value={sensor.type}>{sensor.type}</option>
            ))}
          </select>
          <button
            onClick={handleAddSensor}
            className="text-xl bg-gray-200 px-3 py-1 rounded-md"
          >
            +
          </button>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">선택된 센서</div>
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
          <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">확인</button>
        </div>
      </div>
    </div>
  );
};

export default SensorActivationModal;
