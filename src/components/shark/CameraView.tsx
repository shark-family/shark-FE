import React, { useMemo, useRef, useState } from "react";
export type TankStatus = "online" | "offline" | "warning";

type Tank = {
  id: string;
  name: string;
  streamUrl: string;
  status: TankStatus;
  fishCount?: number;
  lastUpdated?: string; 
};

const initialTanks: Tank[] = [
  { id: "t1", name: "Tank A", streamUrl: "https://example.com/stream/tankA.m3u8", status: "online", fishCount: 24, lastUpdated: "Just now" },
  { id: "t2", name: "Tank B", streamUrl: "https://example.com/stream/tankB.m3u8", status: "online", fishCount: 19, lastUpdated: "1 min ago" },
  { id: "t3", name: "Tank C", streamUrl: "https://example.com/stream/tankC.m3u8", status: "warning", fishCount: 21, lastUpdated: "2 mins ago" },
  { id: "t4", name: "Tank D", streamUrl: "https://example.com/stream/tankD.m3u8", status: "offline", fishCount: 18, lastUpdated: "—" },
  { id: "t5", name: "Tank E", streamUrl: "https://example.com/stream/tankE.m3u8", status: "online", fishCount: 22, lastUpdated: "Just now" },
  { id: "t6", name: "Tank F", streamUrl: "https://example.com/stream/tankF.m3u8", status: "online", fishCount: 20, lastUpdated: "3 mins ago" },
];

const statusStyles: Record<TankStatus, string> = {
  online: "bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/20",
  offline: "bg-rose-500/15 text-rose-600 ring-1 ring-rose-500/20",
  warning: "bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/20",
};

const CameraView: React.FC = () => {
  const [query, setQuery] = useState("");
  const [showOffline, setShowOffline] = useState(true);
  const [layoutCols, setLayoutCols] = useState<2 | 3>(3);
  const tankRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const tanks = useMemo(() => initialTanks, []);

  const filtered = useMemo(() => {
    return tanks.filter((t) => {
      if (!showOffline && t.status === "offline") return false;
      if (query && !t.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [tanks, showOffline, query]);

  const handleFullscreen = (id: string) => {
    const video = tankRefs.current[id];
    if (!video) return;
    const container = video.parentElement?.parentElement;
    const el: any = container || video;
    if (el.requestFullscreen) el.requestFullscreen();
  };

  const handlePiP = async (id: string) => {
    const video = tankRefs.current[id] as any;
    if (!video) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (video.requestPictureInPicture) {
        await video.requestPictureInPicture();
      }
    } catch (e) {
      console.warn("PiP not supported or blocked:", e);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      {/* Header */}
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
            onClick={() => setShowOffline((v) => !v)}
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

      {/* Grid */}
      <div
        className={`grid gap-4 auto-rows-fr ${layoutCols === 3 ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}
      >
        {filtered.map((tank) => (
          <div key={tank.id} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Card header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[tank.status]}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${tank.status === "online" ? "bg-emerald-500" : tank.status === "warning" ? "bg-amber-500" : "bg-rose-500"}`} />
                  {tank.status.toUpperCase()}
                </span>
                <h3 className="font-semibold text-gray-800">{tank.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePiP(tank.id)}
                  title="Picture-in-Picture"
                  className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs hover:bg-gray-100"
                >
                  PiP
                </button>
                <button
                  onClick={() => handleFullscreen(tank.id)}
                  title="Fullscreen"
                  className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs hover:bg-gray-100"
                >
                  Fullscreen
                </button>
              </div>
            </div>

            {/* Video area */}
            <div className="relative aspect-video bg-black">
              {tank.status === "offline" ? (
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div className="rounded-xl bg-gray-900/70 px-4 py-3 text-gray-100">
                    <p className="text-sm font-medium">Stream Unavailable</p>
                    <p className="text-xs text-gray-300">Camera is offline or not reachable.</p>
                  </div>
                </div>
              ) : (
                <video
                  ref={(el) => (tankRefs.current[tank.id] = el)}
                  className="h-full w-full object-cover"
                  // NOTE: For HLS in browsers that require MediaSource Extension handling, use hls.js
                  // For WebRTC, mount your player component here instead of <video>.
                  src={tank.streamUrl}
                  muted
                  controls
                  playsInline
                />
              )}

              {/* Overlay chips */}
              <div className="pointer-events-none absolute left-3 top-3 flex gap-2">
                <div className="rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-white">Live</div>
                {tank.fishCount !== undefined && (
                  <div className="rounded-md bg-black/60 px-2 py-1 text-[10px] text-white">Fish: {tank.fishCount}</div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Bitrate: ~2.5 Mbps
                </span>
                <span className="hidden sm:inline">•</span>
                <span>Updated: {tank.lastUpdated ?? "—"}</span>
              </div>
              <div className="text-gray-400">ID: {tank.id}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-16 grid place-items-center">
          <div className="text-center">
            <p className="text-sm text-gray-500">No tanks match your filters.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraView;