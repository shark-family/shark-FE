"use client";
import React from "react";

interface TankCardProps {
  tankId: string;
  sensors: Array<{
    icon: string;
    name: string;
  }>;
}

const TankCard: React.FC<TankCardProps> = ({ tankId, sensors }) => {
  // Special case for H tank which has different styling
  const isHTank = tankId === "H";

  return (
    <article className="self-stretch my-auto rounded-none min-w-60 w-[257px]">
      <div
        className={`flex flex-col ${isHTank ? "items-start px-4" : "px-6"} py-6 w-full bg-white border ${isHTank ? "border-gray-100 shadow-[0px_5px_20px_rgba(0,0,0,0.05)] stroke-gray-100" : "border-solid shadow-lg border-[color:var(--Stroke-Color,#EFF0F6)]"} rounded-[35px] max-md:${isHTank ? "pl-5" : "px-5"}`}
      >
        <div
          className={`flex gap-${tankId === "A" ? "5" : "10"} ${tankId !== "A" ? "self-start ml-" + (isHTank ? "4" : "2.5") : ""} font-semibold whitespace-nowrap ${tankId === "A" ? "max-md:ml-1" : "max-md:ml-2.5"}`}
        >
          <h3 className="text-4xl leading-none text-slate-500">{tankId}수조</h3>
          <div className="self-start px-3.5 py-2 text-sm leading-none text-blue-400 bg-blue-100 rounded-xl">
            가동중
          </div>
        </div>

        {isHTank ? (
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a82a6eddad2f3f8e959ef06265bb5c4f817cac6?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532"
            className="object-contain self-stretch mt-7 w-full aspect-[200] max-md:mr-1 max-md:ml-2"
            alt="Divider"
          />
        ) : (
          <hr
            className={`shrink-0 mt-${tankId === "E" || tankId === "F" || tankId === "G" ? "8" : "7"} h-px border border-gray-200 border-solid ${tankId !== "A" && tankId !== "E" ? "w-[212px] max-md:mr-1" : ""}`}
          />
        )}

        <div
          className={`${isHTank ? "" : "self-start"} mt-3.5 ${tankId !== "A" && tankId !== "E" ? "ml-" + (isHTank ? "4" : "2.5") : ""} text-sm font-semibold tracking-normal text-black ${tankId === "A" || tankId === "E" ? "max-md:ml-1" : "max-md:ml-2.5"}`}
        >
          가동 센서{tankId === "G" ? " " : ""}
        </div>

        <RenderSensors tankId={tankId} sensors={sensors} />

        {isHTank ? (
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/939ef0e26ce3ca7b5a0db0f6350037dab3657ca5?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532"
            className="object-contain mt-4 aspect-[200] w-[212px]"
            alt="Divider"
          />
        ) : (
          <hr
            className={`shrink-0 mt-3.5 h-px border border-gray-200 border-solid ${tankId !== "A" && tankId !== "E" ? "w-[212px] max-md:mr-" + (tankId === "D" ? "2" : "1") : ""}`}
          />
        )}

        <div
          className={`flex gap-${tankId === "A" || tankId === "D" || tankId === "G" ? "5" : "10"} ${tankId !== "A" && tankId !== "G" ? "self-start" : ""} mt-${tankId === "E" || tankId === "F" || tankId === "G" ? "3.5" : "4"} ${tankId !== "A" ? "ml-" + (tankId === "H" ? "3.5" : tankId === "F" ? "3" : "4") : ""} font-semibold ${tankId === "A" ? "max-md:ml-1.5" : "max-md:ml-2.5"} ${tankId === "D" ? "max-md:mr-1" : ""}`}
        >
          <div
            className={`${tankId === "E" ? "my-auto" : tankId === "G" ? "" : "self-start"} text-base tracking-normal text-slate-500`}
          >
            어종 : 연어
          </div>
          <div
            className={`px-${tankId === "E" || tankId === "F" || tankId === "G" ? "5" : "6"} py-2 text-sm leading-none text-red-400 whitespace-nowrap bg-yellow-50 rounded-xl ${tankId !== "E" ? "max-md:px-5" : ""}`}
          >
            로그보기
          </div>
        </div>
      </div>
    </article>
  );
};

interface RenderSensorsProps {
  tankId: string;
  sensors: Array<{
    icon: string;
    name: string;
  }>;
}

const RenderSensors: React.FC<RenderSensorsProps> = ({ tankId, sensors }) => {
  // Special layouts for C and G tanks
  if (tankId === "C" || tankId === "G") {
    return (
      <div className="flex gap-5 justify-between items-start self-center mt-4 max-w-full w-[177px]">
        <div className="flex flex-col text-xs font-semibold tracking-normal text-center text-black whitespace-nowrap">
          <img
            src={sensors[0].icon}
            className="object-contain aspect-square w-[35px]"
            alt={sensors[0].name}
          />
          <div className="self-center mt-1.5">{sensors[0].name}</div>
        </div>
        <div>
          <div className="flex gap-5 justify-between max-md:mr-1">
            <img
              src={sensors[1].icon}
              className="object-contain shrink-0 aspect-square w-[31px]"
              alt={sensors[1].name}
            />
            <img
              src={sensors[2].icon}
              className="object-contain shrink-0 self-start aspect-square w-[30px]"
              alt={sensors[2].name}
            />
          </div>
          <div className="flex gap-5 justify-between mt-1.5 text-xs font-semibold tracking-normal text-center text-black">
            <div>{sensors[1].name}</div>
            <div>{sensors[2].name}</div>
          </div>
        </div>
      </div>
    );
  }

  // For tanks A, E
  if (tankId === "A" || tankId === "E") {
    return (
      <>
        <div className="flex gap-5 justify-between items-center self-center mt-4 max-w-full w-[174px]">
          {sensors.map((sensor) => (
            <img
              key={sensor.name}
              src={sensor.icon}
              className="object-contain shrink-0 self-stretch aspect-square w-[35px]"
              alt={sensor.name}
            />
          ))}
        </div>
        <div className="flex gap-5 justify-between self-center mt-1.5 max-w-full text-xs font-semibold tracking-normal text-center text-black w-[159px]">
          {sensors.map((sensor) => (
            <div key={sensor.name}>{sensor.name}</div>
          ))}
        </div>
      </>
    );
  }

  // For tanks B, F
  if (tankId === "B" || tankId === "F") {
    return (
      <>
        <div className="flex gap-5 justify-between items-start self-center mt-2.5 max-w-full w-[175px]">
          {sensors.map((sensor, index) => (
            <img
              key={sensor.name}
              src={sensor.icon}
              className={`object-contain shrink-0 ${index === 0 ? "mt-2" : index === 1 ? "mt-1.5" : ""} aspect-square w-[${index === 2 ? "8" : index === 1 ? "33" : "31"}px]`}
              alt={sensor.name}
            />
          ))}
        </div>
        <div className="flex gap-5 justify-between self-center mt-2 max-w-full text-xs font-semibold tracking-normal text-center text-black whitespace-nowrap w-[156px]">
          {sensors.map((sensor) => (
            <div key={sensor.name}>{sensor.name}</div>
          ))}
        </div>
      </>
    );
  }

  // For tanks D, H
  return (
    <>
      <div className="flex gap-5 justify-between items-start self-center mt-4 max-w-full w-[179px]">
        {sensors.map((sensor) => (
          <img
            key={sensor.name}
            src={sensor.icon}
            className={`object-contain shrink-0 ${sensor.name === "탁도" ? "self-stretch w-8" : "aspect-square w-[30px]"}`}
            alt={sensor.name}
          />
        ))}
      </div>
      <div className="flex gap-5 justify-between self-center mt-2 w-44 max-w-full text-xs font-semibold tracking-normal text-center text-black">
        {sensors.map((sensor) => (
          <div key={sensor.name}>{sensor.name}</div>
        ))}
      </div>
    </>
  );
};

export default TankCard;
