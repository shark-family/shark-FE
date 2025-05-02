import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="text-sm font-medium text-black shadow-lg">
      <nav className="flex flex-col pt-7 pb-2.5 pl-5 w-full bg-white rounded-3xl border border-solid border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-blue-500">
          Smart<br />Aquarium
        </h2>

        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/84a2a7c123588e7f31281645a0500ad58b18c953?placeholderIfAbsent=true"
          text="Measured Result"
          className="mt-6 w-[145px]"
        />

        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/103a02f41abfa03c0a8c007b4514f7ecc9bee2ef?placeholderIfAbsent=true"
          text="Sensor Control"
          className="mt-9 w-[138px] text-blue-600"
        />

        <div className="flex gap-4 self-start mt-9 ml-5 text-gray-600">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a68a0c8a5f4d1b0c647b15b0441efcdbff9df6d?placeholderIfAbsent=true"
            className="object-contain w-[21px] h-[21px]"
            alt="Detail map icon"
          />
          <div>
            <div>Detail Map</div>
            <div className="z-10 mt-0">Detail Map</div>
          </div>
        </div>

        <h3 className="mt-10 ml-6 text-base font-semibold">Support</h3>
        <div className="self-center mt-8">Get Started</div>

        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/ec982cab74b9cf8bb71b160d617b412522d9e77c?placeholderIfAbsent=true"
          text="Settings"
          className="mt-9"
        />

        <hr className="border-t mt-10 border-gray-200" />

        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1cf48144bea83ea37c2b571ebba59044304c6bf9?placeholderIfAbsent=true"
          className="mt-4 ml-6 w-14 h-14 rounded-full"
          alt="Profile"
        />

        <div className="ml-5 font-semibold">공주대학교</div>
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
    <div className={`flex gap-4 items-center ${className}`}>
      <img src={icon} alt="" className="w-6 h-6" />
      <span>{text}</span>
    </div>
  );
};

export default Sidebar;
