import React, { useEffect, useState } from 'react';
import { Download, Info } from 'lucide-react';
import AGVVideo from '../../assets/AGV.mp4';

const CardItem = ({
  title,
  value,
  hasChart = false,
  className = '',
}: {
  title: string;
  value: string;
  hasChart?: boolean;
  className?: string;
}) => (
  <div className={`bg-white rounded-2xl shadow p-4 relative ${className}`}>
    <div className="flex justify-between items-center mb-1">
      <p className="text-sm text-gray-500">{title}</p>
      {hasChart && <Info size={14} className="text-gray-400" />}
    </div>
    <p className="text-2xl font-bold text-[#303030]">{value}</p>
    {hasChart && (
      <div className="mt-2">
        {/* 간단한 미니 차트 (SVG 대체 가능) */}
        <svg height="30" width="100%" viewBox="0 0 100 30" className="text-blue-500">
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            points="0,20 10,25 20,15 30,18 40,10 50,12 60,20 70,18 80,22 90,17 100,20"
          />
        </svg>
      </div>
    )}
  </div>
);

const MeasuredResult: React.FC = () => {
  const [barHeights, setBarHeights] = useState<number[]>(Array(10).fill(0));
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/SmartAquarium_DB_report.xlsx'; // public 폴더 기준
    link.download = 'SmartAquarium_DB_report.xlsx';
    link.click();
  };

  useEffect(() => {
    // mount 시 랜덤 높이로 전환 → 트랜지션 발생
    const newHeights = Array.from({ length: 10 }).map(() =>
      Math.floor(Math.random() * 80 + 10)
    );
    setBarHeights(newHeights);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Measured Result</h2>
        <button
          className="text-sm text-gray-500 flex items-center gap-1"
          onClick={handleDownload}
        >
          <Download size={16} /> Download
        </button>

      </div>

      {/* 필터 선택 */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select className="p-2 rounded-md border text-sm">
          <option>Date : 2025/06/13</option>
        </select>
        <select className="p-2 rounded-md border text-sm">
          <option>AGV : AGV1</option>
        </select>
      </div>

      {/* 좌우 레이아웃 */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 왼쪽 영역 */}
        <div className="flex-1 space-y-6">
          {/* 메인 카드들 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <CardItem title="가동중인 AGV" value="7/10" className="min-h-[120px]" />
            <CardItem title="AGV1 배터리" value="75%" className="min-h-[120px]" />
            <CardItem title="AGV1 가동 가능 시간" value="2h 34m" className="min-h-[120px]" />
            <CardItem title="양식장 내부 온도" value="21°C" hasChart />
            <CardItem title="양식장 내부 습도" value="86%" hasChart />
            <CardItem title="AGV1 측정 수조 번호" value="3번 수조" />
          </div>

          {/* 실시간 어류 카메라 영상 */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="font-semibold mb-2">AGV1 실시간 측정 영상</h3>
            <video
              src={AGVVideo}
              autoPlay
              loop
              muted
              playsInline
              className="rounded-md w-full"
            />
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="w-full lg:w-1/2 space-y-6">
          {/* AGV 상태 차트 */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">AGV State</h3>
              <span className="text-sm text-gray-500">Battery</span>
            </div>
            <hr className="mb-3" />
            <div className="flex gap-4 mb-2 text-xs text-gray-600">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-blue-500"></div> 작동중</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-yellow-400"></div> 충전중</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-gray-300"></div> 비활성</div>
            </div>
            <div className="relative h-40 pl-6 flex items-end gap-2">
              {/* 왼쪽 눈금 */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between h-full text-xs text-gray-400">
                {[100, 75, 50, 25, 0].map((val) => (
                  <span key={val}>{val}</span>
                ))}
              </div>

              {/* 막대들 */}
              {barHeights.map((height, idx) => {
                const status = idx <= 4 ? 'active' : idx <= 6 ? 'charging' : 'inactive';
                const barColor =
                  status === 'active'
                    ? 'bg-blue-500'
                    : status === 'charging'
                      ? 'bg-yellow-400'
                      : 'bg-gray-300';

                return (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-3 ${barColor} rounded-t transition-all duration-1000`}
                      style={{ height }}
                    />
                    <p className="text-xs mt-1 text-gray-600">AGV{idx + 1}</p>
                  </div>
                );
              })}

            </div>
          </div>

          {/* 이상 감지 현황 */}
          <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">이상 감지 현황</h3>
              <select className="text-sm text-gray-500">
                <option>정렬 기준</option>
                <option>온도</option>
                <option>DO 수치</option>
                <option>이상 항목 수</option>
              </select>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                {
                  tank: '수조3',
                  agv: 'AGV1',
                  status: '정상 작동',
                  sensor: '온도',
                  value: '14°C',
                  badge: 'green',
                },
                {
                  tank: '수조6',
                  agv: 'AGV6',
                  status: '이상 감지 : NH4 농도 높음',
                  sensor: 'NH4',
                  value: '2.8ppm',
                  badge: 'red',
                },
                {
                  tank: '수조1',
                  agv: 'AGV3',
                  status: '정상 작동',
                  sensor: '온도',
                  value: '11°C',
                  badge: 'green',
                },
                {
                  tank: '수조2',
                  agv: 'AGV2',
                  status: '주의 : DO 수치 낮음',
                  sensor: 'DO',
                  value: '2.1mg/L',
                  badge: 'yellow',
                },
                {
                  tank: '수조8',
                  agv: 'AGV8',
                  status: '데이터 없음',
                  sensor: '',
                  value: '',
                  badge: 'gray',
                },
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
                >
                  <div className="flex gap-2 items-start">
                    <div
                      className={`w-3 h-3 mt-1 rounded-full ${item.badge === 'green'
                          ? 'bg-green-500'
                          : item.badge === 'red'
                            ? 'bg-red-500'
                            : item.badge === 'yellow'
                              ? 'bg-yellow-400'
                              : 'bg-gray-400'
                        }`}
                    />
                    <div>
                      <p className="font-medium">
                        {item.tank} - {item.agv}
                      </p>
                      <p className="text-sm text-gray-600">{item.status}</p>
                      {item.value && (
                        <p className="text-xs text-gray-400">
                          {item.sensor}: {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasuredResult;
