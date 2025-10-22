import React from "react";
import { Tank } from "./types";
import TankCard from "./TankCard";

type TankGridProps = {
  tanks: Tank[];
  layoutCols: 2 | 3;
  onPiP: (id: string) => void;
  onFullscreen: (id: string) => void;
  setVideoRef: (id: string, el: HTMLVideoElement | null) => void;
};

const TankGrid: React.FC<TankGridProps> = ({ tanks, layoutCols, onPiP, onFullscreen, setVideoRef }) => {
  return (
    <div
      className={`grid gap-4 auto-rows-fr ${layoutCols === 3 ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}
    >
      {tanks.map((tank) => (
        <TankCard
          key={tank.id}
          tank={tank}
          onPiP={onPiP}
          onFullscreen={onFullscreen}
          videoRef={(el) => setVideoRef(tank.id, el)}
        />
      ))}
    </div>
  );
};

export default TankGrid;
