import React from "react";

type CameraViewHeaderProps = {
  query: string;
  setQuery: (query: string) => void;
  showOffline: boolean;
  setShowOffline: (show: boolean) => void;
  layoutCols: 2 | 3;
  setLayoutCols: (cols: 2 | 3) => void;
};

const CameraViewHeader: React.FC<CameraViewHeaderProps> = ({
  query,
  setQuery,
  showOffline,
  setShowOffline,
  layoutCols,
  setLayoutCols,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
      <div>
        <h1 className="text-2xl font-bold text-blue-600">Camera View</h1>
        <p className="text-gray-500 text-sm">수조 별 어류 상태를 실시간으로 모니터링합니다.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tanks…"
            className="w-56 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setShowOffline(!showOffline)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-100"
        >
          {showOffline ? "Hide Offline" : "Show Offline"}
        </button>
        <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1">
          <button
            onClick={() => setLayoutCols(2)}
            className={`px-3 py-1.5 text-sm rounded-lg ${layoutCols === 2 ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
          >
            2×3
          </button>
          <button
            onClick={() => setLayoutCols(3)}
            className={`px-3 py-1.5 text-sm rounded-lg ${layoutCols === 3 ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
          >
            3×2
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraViewHeader;
