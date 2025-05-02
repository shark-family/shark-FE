import React from "react";
import TankCard from "./TankCard";

interface Sensor {
  icon: string;
  name: string;
}

interface TankRowProps {
  tankData: Record<string, Sensor[]>;
}

const TankRow: React.FC<TankRowProps> = ({ tankData }) => {
  const tankIds = Object.keys(tankData);

  return (
    <div className="flex flex-wrap gap-6 mt-10 justify-center">
      {tankIds.map((id) => (
        <TankCard
          key={id}
          tankId={id}
          status="가동중"
          sensors={tankData[id]}
          fishType="연어"
        />
      ))}
    </div>
  );
};

export default TankRow;