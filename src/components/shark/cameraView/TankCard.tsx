import React from "react";
import { Tank, TankStatus } from "./types";

const statusStyles: Record<TankStatus, string> = {
  online: "bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/20",
  offline: "bg-rose-500/15 text-rose-600 ring-1 ring-rose-500/20",
  warning: "bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/20",
};

type TankCardProps = {
  tank: Tank;
  onPiP: (id: string) => void;
  onFullscreen: (id: string) => void;
  videoRef: (el: HTMLVideoElement | null) => void;
};

const TankCard: React.FC<TankCardProps> = ({ tank, onPiP, onFullscreen, videoRef }) => {
  return (
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
            onClick={() => onPiP(tank.id)}
            title="Picture-in-Picture"
            className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs hover:bg-gray-100"
          >
            PiP
          </button>
          <button
            onClick={() => onFullscreen(tank.id)}
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
            ref={videoRef}
            className="h-full w-full object-cover"
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
  );
};

export default TankCard;
