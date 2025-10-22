import React, { useMemo, useRef, useState } from "react";
import { Tank } from "./cameraView/types";
import CameraViewHeader from "./cameraView/CameraViewHeader";
import TankGrid from "./cameraView/TankGrid";
import EmptyState from "./cameraView/EmptyState";

const initialTanks: Tank[] = [
  { id: "t1", name: "Tank A", streamUrl: "https://example.com/stream/tankA.m3u8", status: "online", fishCount: 24, lastUpdated: "Just now" },
  { id: "t2", name: "Tank B", streamUrl: "https://example.com/stream/tankB.m3u8", status: "online", fishCount: 19, lastUpdated: "1 min ago" },
  { id: "t3", name: "Tank C", streamUrl: "https://example.com/stream/tankC.m3u8", status: "warning", fishCount: 21, lastUpdated: "2 mins ago" },
  { id: "t4", name: "Tank D", streamUrl: "https://example.com/stream/tankD.m3u8", status: "offline", fishCount: 18, lastUpdated: "—" },
  { id: "t5", name: "Tank E", streamUrl: "https://example.com/stream/tankE.m3u8", status: "online", fishCount: 22, lastUpdated: "Just now" },
  { id: "t6", name: "Tank F", streamUrl: "https://example.com/stream/tankF.m3u8", status: "online", fishCount: 20, lastUpdated: "3 mins ago" },
];

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

  const setVideoRef = (id: string, el: HTMLVideoElement | null) => {
    tankRefs.current[id] = el;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      <CameraViewHeader
        query={query}
        setQuery={setQuery}
        showOffline={showOffline}
        setShowOffline={setShowOffline}
        layoutCols={layoutCols}
        setLayoutCols={setLayoutCols}
      />

      {filtered.length > 0 ? (
        <TankGrid
          tanks={filtered}
          layoutCols={layoutCols}
          onPiP={handlePiP}
          onFullscreen={handleFullscreen}
          setVideoRef={setVideoRef}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default CameraView;
