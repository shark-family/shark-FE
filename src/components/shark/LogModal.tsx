import React from 'react';
import { X } from 'lucide-react'; // 상단 닫기 아이콘용

interface LogEntry {
  sensor_type: string;
  user_name: string;
  started_at: string;
  stopped_at: string | null;
}

interface LogModalProps {
  logs: LogEntry[];
  onClose: () => void;
  tankName: string;
}

const LogModal: React.FC<LogModalProps> = ({ logs, onClose, tankName }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[600px] max-h-[80vh] shadow-xl overflow-hidden">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
            🐟 {tankName} 수조 센서 사용 로그
          </h2>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-gray-600" size={20} />
          </button>
        </div>

        {/* 테이블 */}
        <div className="overflow-y-auto max-h-[60vh]">
          <table className="w-full text-sm table-fixed border-collapse">
            <thead className="text-left bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-2 font-semibold w-[20%]">센서</th>
                <th className="p-2 font-semibold w-[20%]">관리자</th>
                <th className="p-2 font-semibold w-[30%]">시작 시각</th>
                <th className="p-2 font-semibold w-[30%]">중지 시각</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-2">{log.sensor_type}</td>
                  <td className="p-2">{log.user_name}</td>
                  <td className="p-2">{new Date(log.started_at).toLocaleString()}</td>
                  <td className="p-2">
                    {log.stopped_at ? new Date(log.stopped_at).toLocaleString() : '—'}
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-6">
                  📭 사용 기록이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogModal;
