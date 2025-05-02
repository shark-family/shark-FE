"use client";
import React from "react";

interface SensorIconProps {
  icon: string;
  name: string;
  className?: string;
}

const SensorIcon: React.FC<SensorIconProps> = ({
  icon,
  name,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col text-xs font-semibold tracking-normal text-center text-black ${className}`}
    >
      <img
        src={icon}
        className="object-contain aspect-square w-[35px]"
        alt={name}
      />
      <div className="self-center mt-1.5">{name}</div>
    </div>
  );
};

export default SensorIcon;
