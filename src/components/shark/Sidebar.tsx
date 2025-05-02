"use client";
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="text-sm font-medium text-black shadow-lg">
      <nav className="flex overflow-hidden flex-col pt-7 pb-2.5 pl-5 w-full bg-white rounded-3xl border border-solid border-[color:var(--Stroke-Color,#EFF0F6)]">
        <h2 className="text-3xl font-extrabold text-center text-blue-500">
          Smart
          <br />
          Aquarium
        </h2>

        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/84a2a7c123588e7f31281645a0500ad58b18c953?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532"
          text="Measured Result"
          className="mt-6 w-[145px]"
        />
        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/103a02f41abfa03c0a8c007b4514f7ecc9bee2ef?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532"
          text="Sensor Control"
          className="mt-9 w-[138px] text-blue-600"
        />

        <div className="flex gap-4 self-start mt-9 ml-5 tracking-normal text-neutral-600 max-md:ml-2.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a68a0c8a5f4d1b0c647b15b0441efcdbff9df6d?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532"
            className="object-contain shrink-0 aspect-square w-[21px]"
            alt="Detail map icon"
          />
          <div className="my-auto">
            <div>Detail Map</div>
            <div className="z-10 mt-0">Detail Map</div>
          </div>
        </div>

        <h3 className="self-start mt-10 ml-6 text-base font-semibold tracking-normal leading-none max-md:ml-2.5">
          Support
        </h3>

        <div className="self-center mt-8 tracking-normal">Get Started</div>

        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/ec982cab74b9cf8bb71b160d617b412522d9e77c?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532"
          text="Settings"
          className="mt-9"
        />

        <hr className="shrink-0 h-px border border-solid border-neutral-200 mt-[594px] max-md:mt-10" />

        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1cf48144bea83ea37c2b571ebba59044304c6bf9?placeholderIfAbsent=true&apiKey=aafa9524681042eeaab3415769a35532"
          className="object-contain mt-2.5 ml-6 w-14 rounded-full aspect-square max-md:ml-2.5"
          alt="Profile"
        />

        <div className="self-start mt-2.5 ml-5 font-semibold leading-none text-black max-md:ml-2.5">
          공주대학교
        </div>
      </nav>
    </aside>
  );
};

interface NavItemProps {
  icon: string;
  text: string;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, className = "" }) => {
  return (
    <div className={`flex gap-4 self-center tracking-normal ${className}`}>
      <img
        src={icon}
        className="object-contain shrink-0 my-auto w-6 aspect-square"
        alt={`${text} icon`}
      />
      <div className="my-auto">{text}</div>
    </div>
  );
};

export default Sidebar;
