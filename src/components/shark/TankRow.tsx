"use client";
import React from "react";
import TankCard from "./TankCard";

interface TankRowProps {
  tanks: string[];
}

const TankRow: React.FC<TankRowProps> = ({ tanks }) => {
  // Define sensor configurations for each tank
  const tankSensors = {
    A: [
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7a7a686b06e93cf0053c191da9623f546be09f14?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "온도",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/696c67456400a7eb32e512c7b649952ff8616927?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "용존 산소",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/45f407d0a6abed8188c4a05023ea71b5e21d788d?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "염도",
      },
    ],
    B: [
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/089bf9061d30a719bfdc9210b770411f4c8da952?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "PH",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b02006bea0ddefcad7714389900f05216ee56eb5?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "암모니아",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e003b101e24717552e5e4bd209cf78811ea9a53?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "탁도",
      },
    ],
    C: [
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7a7a686b06e93cf0053c191da9623f546be09f14?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "온도",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/829d73e7b39c725bb94c08503e6e26cad9479cdd?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "암모니아",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/696c67456400a7eb32e512c7b649952ff8616927?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "용존 산소",
      },
    ],
    D: [
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/45f407d0a6abed8188c4a05023ea71b5e21d788d?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "염도",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e003b101e24717552e5e4bd209cf78811ea9a53?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "탁도",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/696c67456400a7eb32e512c7b649952ff8616927?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "용존 산소",
      },
    ],
    E: [
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7a7a686b06e93cf0053c191da9623f546be09f14?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "온도",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/696c67456400a7eb32e512c7b649952ff8616927?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "용존 산소",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/45f407d0a6abed8188c4a05023ea71b5e21d788d?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "염도",
      },
    ],
    F: [
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/089bf9061d30a719bfdc9210b770411f4c8da952?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "PH",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b02006bea0ddefcad7714389900f05216ee56eb5?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "암모니아",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e003b101e24717552e5e4bd209cf78811ea9a53?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "탁도",
      },
    ],
    G: [
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7a7a686b06e93cf0053c191da9623f546be09f14?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "온도",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/829d73e7b39c725bb94c08503e6e26cad9479cdd?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "암모니아",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/696c67456400a7eb32e512c7b649952ff8616927?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "용존 산소",
      },
    ],
    H: [
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/45f407d0a6abed8188c4a05023ea71b5e21d788d?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "염도",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e003b101e24717552e5e4bd209cf78811ea9a53?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "탁도",
      },
      {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/696c67456400a7eb32e512c7b649952ff8616927?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532",
        name: "용존 산소",
      },
    ],
  };

  // First row has a special layout
  if (tanks.includes("A")) {
    return (
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-[74%] max-md:ml-0 max-md:w-full">
          <div className="flex z-10 flex-wrap gap-10 items-center mr-0">
            {tanks.map((tankId) => (
              <TankCard
                key={tankId}
                tankId={tankId}
                sensors={tankSensors[tankId as keyof typeof tankSensors]}
              />
            ))}
          </div>
        </div>
        <div className="ml-5 w-[26%] max-md:ml-0 max-md:w-full">
          <div className="shrink-0 mt-20 max-w-full h-px border border-gray-200 border-solid w-[418px] max-md:mt-10" />
        </div>
      </div>
    );
  }

  // Regular row layout
  return (
    <>
      {tanks.map((tankId) => (
        <TankCard
          key={tankId}
          tankId={tankId}
          sensors={tankSensors[tankId as keyof typeof tankSensors]}
        />
      ))}
    </>
  );
};

export default TankRow;
