import React from 'react';
import { X } from 'lucide-react';

interface LogEntry {
  sensor_type: string;     // 서버에서 ph / do_val / turbidity 등 코드값
  user_name: string;
  started_at: string;
  stopped_at: string | null;
}

interface LogModalProps {
  logs: LogEntry[];
  onClose: () => void;
  tankName: string;
}

// 코드값 → 화면 라벨
const SENSOR_LABEL_MAP: Record<string, string> = {
  ph: 'PH',
  orp: 'ORP',
  ec: 'EC',
  tds: '전기전도도',
  turbidity: '탁도',
  do_val: '용존 산소',
  // 과거/별칭 하위호환
  do: '용존 산소',
  // salt: 'EC',
  // turbi: '탁도',
};

// 날짜 포맷 (한국형)
const formatKoreanDateTime = (iso: string) => {
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso; // 날짜 파싱 실패 시 원본 표시
    return d
      .toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      .replace(/\. /g, '.')
      .replace(/\.$/, '');
  } catch {
    return iso;
  }
};

const LogModal: React.FC<LogModalProps> = ({ logs, onClose, tankName }) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[600px] max-h-[80vh] shadow-xl overflow-hidden">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
            🐟 {tankName} 수조 센서 사용 로그
          </h2>
          <button onClick={onClose} aria-label="닫기">
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
              {logs.map((log, idx) => {
                const code = (log.sensor_type || '').toLowerCase();
                const label = SENSOR_LABEL_MAP[code] || log.sensor_type || '-';
                return (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="p-2">{label}</td>
                    <td className="p-2">{log.user_name || '-'}</td>
                    <td className="p-2">{formatKoreanDateTime(log.started_at)}</td>
                    <td className="p-2">
                      {log.stopped_at ? formatKoreanDateTime(log.stopped_at) : '—'}
                    </td>
                  </tr>
                );
              })}
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
