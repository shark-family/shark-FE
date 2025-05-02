import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import SensorSummary from "./SensorSummary";
import TankRow from "./TankRow";

const SmartAquarium: React.FC = () => {
  return (
    <main className="flex flex-wrap bg-stone-50 min-h-screen">
      <div className="w-full md:w-1/5 p-4">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5 p-4">
        <Header />
        <h1 className="mt-10 text-3xl font-semibold text-black">공주대학교 스마트양식장 대시보드</h1>
        <SensorSummary sensors={[
          { icon: "/염도.png", name: "염도", count: 1 },
          { icon: "/암모니아.png", name: "암모니아", count: 1 },
          { icon: "/용존산소.png", name: "용존 산소", count: 1 },
          { icon: "/PH.png", name: "PH", count: 1 },
          { icon: "/탁도.png", name: "탁도", count: 1 },
          { icon: "/온도.png", name: "온도", count: 1 },
        ]} />
        <TankRow tankData={{
          A: [
            { icon: "/온도.png", name: "온도" },
            { icon: "/용존산소.png", name: "용존 산소" },
            { icon: "/염도.png", name: "염도" },
          ],
          B: [
            { icon: "/PH.png", name: "PH" },
            { icon: "/암모니아.png", name: "암모니아" },
            { icon: "/탁도.png", name: "탁도" },
          ],
          C: [
            { icon: "/온도.png", name: "온도" },
            { icon: "/암모니아.png", name: "암모니아" },
            { icon: "/용존산소.png", name: "용존 산소" },
          ],
          D: [
            { icon: "/염도.png", name: "염도" },
            { icon: "/탁도.png", name: "탁도" },
            { icon: "/용존산소.png", name: "용존 산소" },
          ],
          E: [
            { icon: "/온도.png", name: "온도" },
            { icon: "/용존산소.png", name: "용존 산소" },
            { icon: "/염도.png", name: "염도" },
          ],
          F: [
            { icon: "/PH.png", name: "PH" },
            { icon: "/암모니아.png", name: "암모니아" },
            { icon: "/탁도.png", name: "탁도" },
          ],
          G: [
            { icon: "/온도.png", name: "온도" },
            { icon: "/암모니아.png", name: "암모니아" },
            { icon: "/용존산소.png", name: "용존 산소" },
          ],
          H: [
            { icon: "/염도.png", name: "염도" },
            { icon: "/탁도.png", name: "탁도" },
            { icon: "/용존산소.png", name: "용존 산소" },
          ],
        }} />
      </div>
    </main>
  );
};

export default SmartAquarium;