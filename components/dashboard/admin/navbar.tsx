import Image from "next/image";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdOutlineNotificationsActive } from "react-icons/md";

const NavbarAdminELAUT = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menus = ["Dashboard", "Pelatihan", "Uji Kompetensi", "Fasilitas"];

  return (
    <nav className="w-full flex justify-around items-center">
      <div className="w-fit">
        <Image
          src={"/images/logo/logo-elaut-color.png"}
          alt="Logo Elektronik Layanan Pelatihan Utama Terpadu"
          width={0}
          height={0}
          className="h-20 w-30 object-contain"
        />
      </div>

      <section className="flex justify-center h-fit py-5 items-center w-fit px-10 bg-gray-100 rounded-full shadow-custom">
        {menus.map((menu) => (
          <button
            key={menu}
            onClick={() => setActiveMenu(menu)}
            className={`px-4 text-sm font-medium ${
              activeMenu === menu
                ? "text-black font-semibold"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {menu === activeMenu && (
              <span className="text-blue-500 pr-2">•</span>
            )}
            {menu}
          </button>
        ))}
      </section>

      <section className="flex items-center justify-end w-fit space-x-4  p-4 rounded-lg">
        {/* Search Icon */}
        <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow hover:shadow-lg">
          <FiSearch />
        </button>

        {/* Notification Icon */}
        <button className="relative w-10 h-10 flex items-center justify-center bg-white rounded-full shadow hover:shadow-lg">
          <MdOutlineNotificationsActive />
          {/* Notification Badge */}
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center bg-white rounded-full shadow px-3 py-2 space-x-3 hover:shadow-lg cursor-pointer">
          <img
            src="https://via.placeholder.com/40"
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-700">Emery Dias</p>
            <p className="text-xs text-gray-500">Account Executive</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </section>
    </nav>
  );
};

export default NavbarAdminELAUT;
