"use client";
import React from "react";

const SensorAvailability: React.FC = () => {
  return (
    <section className="flex flex-col px-16 pt-6 mt-12 max-w-full text-xl font-semibold text-black bg-white border border-gray-100 border-solid rounded-[47px] shadow-[0px_7px_27px_rgba(0,0,0,0.05)] stroke-gray-100 w-[719px] max-md:px-5 max-md:mt-10">
      <h3 className="self-start tracking-tight">가용 센서 현황</h3>
      <div className="flex flex-wrap gap-6 items-center mt-5 ml-2.5 leading-none text-red-400 whitespace-nowrap min-h-[43px] max-md:max-w-full">
        <SensorWithCount
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/a143520b893c657b634307a20c8bcfd0dcbc9bbd?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532"
          count={1}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b4eae734ee1b2cf203ef74bfaeb25e9a1734863?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532"
          className="object-contain shrink-0 self-stretch my-auto w-20 rounded-none aspect-[1.82]"
          alt="Sensor icon"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/af8ac98a227664c796d92279aafbb48aba29837a?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532"
          className="object-contain shrink-0 self-stretch my-auto rounded-none aspect-[1.93] w-[77px]"
          alt="Sensor icon"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9a3185650c23243bfa15e7354bd787d2b83ba313?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532"
          className="object-contain shrink-0 self-stretch my-auto w-20 rounded-none aspect-[1.9]"
          alt="Sensor icon"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/50e5146673ac5de9299723540b5329b9fa03723d?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532"
          className="object-contain shrink-0 self-stretch my-auto rounded-none aspect-[1.91] w-[84px]"
          alt="Sensor icon"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/66eb8cd9b37264dc9ccf0c9ec69c2d4ef31fdcc0?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532"
          className="object-contain shrink-0 self-stretch my-auto rounded-none aspect-[1.88] w-[79px]"
          alt="Sensor icon"
        />
      </div>
      <div className="flex flex-wrap gap-10 items-center mx-5 mt-1.5 text-sm tracking-tight text-center min-h-[31px] max-md:mr-2.5">
        <div className="grow shrink self-stretch my-auto w-[45px]">EC</div>
        <div className="grow shrink self-stretch my-auto w-11">탁도</div>
        <div className="grow shrink self-stretch my-auto w-11">용존 산소</div>
        <div className="grow shrink self-stretch my-auto w-[45px]">
          전기전도도
        </div>
        <div className="grow shrink self-stretch my-auto w-11"> ORP</div>
        <div className="grow shrink self-stretch my-auto w-11"> PH</div>
      </div>
    </section>
  );
};

interface SensorWithCountProps {
  icon: string;
  count: number;
}

const SensorWithCount: React.FC<SensorWithCountProps> = ({ icon, count }) => {
  return (
    <div className="grow shrink self-stretch my-auto w-[60px]">
      <div className="flex relative justify-between items-start min-h-[41px]">
        <div className="flex absolute right-0 bottom-0 z-0 flex-col self-start rounded-3xl h-[41px] w-[76px]">
          <div className="px-2 py-3 bg-yellow-50 rounded-3xl max-md:pl-5">
            {count}개
          </div>
        </div>
        <img
          src={icon}
          className="object-contain z-0 shrink-0 my-auto w-10 aspect-square"
          alt="Sensor icon"
        />
      </div>
    </div>
  );
};

export default SensorAvailability;
