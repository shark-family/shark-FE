import React from 'react';
import axiosInstance from '../../axiosInstance';

interface SensorBoxProps {
  name: string;
  sensors: { type: string; value: string }[];
  status: string;
  aquariumId: number;
  fish_type: string;
  onClick?: () => void;
  onLogClick?: () => void;
  onSensorStop?: (sensorType: string) => void;
}

const colorMap: Record<string, string> = {
  '전기전도도': 'text-red-500',
  '용존 산소': 'text-blue-500',
  'EC': 'text-yellow-500',
  'PH': 'text-green-500',
  'ORP': 'text-purple-500',
  '탁도': 'text-gray-500',
};

const SensorBox: React.FC<SensorBoxProps> = ({ name, sensors, status, fish_type, onClick, onLogClick }) => {
  const handleSensorStop = async (e: React.MouseEvent, sensorType: string) => {
    e.stopPropagation();
    if (!confirm(`${sensorType} 센서를 정말 작동 중지하시겠습니까?`)) return;

    try {
      const reverseTypeMap: Record<string, string> = {
        'PH': 'ph',
        '전기전도도': 'tds',
        '용존 산소': 'do_val',
        'ORP': 'orp',
        'EC': 'ec',
        '탁도': 'turbidity',
      };

      const mappedType = reverseTypeMap[sensorType] || sensorType;
      const sensorIdResponse = await axiosInstance.get(`/api/user-info/관리자A`);
      const sensor = sensorIdResponse.data.sensors.find((s: any) => s.type.toLowerCase() === mappedType.toLowerCase());

      if (!sensor) throw new Error('센서 ID 조회 실패');

      const res = await axiosInstance.post('/api/stop-sensor', {
        sensor_id: sensor.id,
      });

      alert(res.data.status || '센서 작동 중지 완료');
    } catch (err: any) {
      console.error('❌ 작동 중지 실패:', err.response?.data || err);
      alert(err?.response?.data?.status || '❌ 작동 중지 실패');
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl p-5 shadow-sm w-full max-w-[370px] flex flex-col items-start cursor-pointer transition hover:shadow-md"
    >
      <div className="flex justify-between items-center w-full mb-2">
        <h2 className="text-3xl font-bold text-blue-900">{name}</h2>
        <span className="text-xs bg-blue-100 text-blue-600 rounded-md px-2 py-0.5 font-medium">{status}</span>
      </div>

      <hr className="w-full mb-3 border-gray-200" />

      <div className="text-sm text-gray-500 mb-2">가동 센서</div>
      <div className="flex flex-col gap-2 mb-4 w-full">
        {sensors.length > 0 ? (
          sensors.map((sensor, idx) => (
            <div key={idx} className="flex justify-between items-center w-full px-2">
              <div className="flex items-center gap-2">
                <div className={`font-bold text-xl ${colorMap[sensor.type] || 'text-gray-600'}`}>
                  {sensor.value || '-'}
                </div>
                <div className="text-sm text-gray-500">{sensor.type}</div>
              </div>
              {status === '가동중' && (
                <button
                  onClick={(e) => handleSensorStop(e, sensor.type)}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  중지
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center w-full text-gray-400">센서 없음</div>
        )}
      </div>

      <hr className="w-full mb-3 border-gray-200" />

      <div className="flex justify-between items-center w-full">
        <div className="text-sm text-[#4E6890]">
          <p className="text-sm text-gray-600 mt-1">어종 : {fish_type}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLogClick?.();
          }}
          className="text-xs text-[#FF6065] bg-[#FFF7E4] px-3 py-1 rounded-full font-semibold"
        >
          로그보기
        </button>
      </div>
    </div>
  );
};

export default SensorBox;
