"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import SensorAvailability from "./SensorAvailability";
import TankRow from "./TankRow";

const SmartAquarium: React.FC = () => {
  return (
    <main className="flex overflow-hidden flex-wrap gap-10 pr-14 bg-stone-50 max-md:pr-5">
      <Sidebar />
      <section className="flex flex-col grow shrink-0 items-center my-auto basis-0 w-fit max-md:max-w-full">
        <Header />
        <h1 className="mt-16 text-3xl font-semibold leading-none text-black max-md:mt-10 max-md:max-w-full">
          공주대학교 스마트양식장 대쉬보드
        </h1>
        <SensorAvailability />
        <div className="mt-14 max-w-full w-[1172px] max-md:mt-10">
          <TankRow tanks={["A", "B", "C", "D"]} />
        </div>
        <div className="flex flex-wrap gap-10 items-center mt-10 max-md:max-w-full">
          <TankRow tanks={["E", "F", "G", "H"]} />
        </div>
      </section>
    </main>
  );
};

export default SmartAquarium;
