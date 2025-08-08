"use client";

import Toast from "@/components/toast";
import { dpkakpBaseUrl } from "@/constants/urls";
import { UserInformationDPKAKP } from "@/types/dpkakp";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
  FaHome,
  FaQuestionCircle,
  FaUserFriends,
  FaChalkboardTeacher,
} from "react-icons/fa";

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPelaksanaanOpen, setIsPelaksanaanOpen] = useState(true);
  const [dataAdmin, setDataAdmin] = useState<UserInformationDPKAKP | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const isPenguji = Cookies.get("IsPUKAKP") === "penguji";
  const isPUKAKP = Cookies.get("IsPUKAKP") ?? "false";
  const isPUKAKPNegated = isPUKAKP !== "true" && isPUKAKP !== "penguji";

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleLogOut = () => {
    Cookies.remove("XSRF095");
    Cookies.remove("IsPUKAKP");
    Cookies.remove("PUKAKP");
    Cookies.remove("IdUsersDpkakp");
    Cookies.remove("NamaUsersDpkakp");

    Toast.fire({
      icon: "success",
      title: `Berhasil logout dari admin DPKAKP!`,
    });

    router.replace("/lembaga/dpkakp/admin/auth/login");
  };

  const fetchAdminData = async () => {
    try {
      const { data } = await axios.get(`${dpkakpBaseUrl}/adminPusat/getAdminPusat`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("XSRF095")}`,
        },
      });
      setDataAdmin(data.data);
      Cookies.set("PUKAKP", data.data.Nama);
    } catch (error) {
      console.error("Failed to fetch admin data", error);
    }
  };

  const fetchDataPenguji = async () => {
    try {
      const { data } = await axios.get(`${dpkakpBaseUrl}/penguji/getUsersDewan`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("XSRF095")}`,
        },
      });

      Cookies.set("NamaUsersDpkakp", data?.data?.NamaUsersDpkakp);
      Cookies.set("IdUsersDpkakp", data?.data?.IdUsersDpkakp!);
    } catch (error) {
      console.error("Failed to fetch penguji data", error);
    }
  };

  useEffect(() => {
    isPenguji ? fetchDataPenguji() : fetchAdminData();
  }, []);

  const NavItem = ({
    href,
    icon,
    label,
    active,
  }: {
    href: string;
    icon: JSX.Element;
    label: string;
    active?: boolean;
  }) => (
    <a
      href={href}
      className={`flex items-center gap-3 px-6 py-3 text-sm font-medium border-l-4 transition-all duration-150 ${active
          ? "bg-blue-800 text-white border-blue-400"
          : "text-blue-200 hover:bg-blue-800 hover:text-white border-transparent"
        }`}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </a>
  );

  return (
    <div className="h-screen w-full flex text-gray-800 bg-white">
      {/* Sidebar */}
      <nav
        className={`flex-none flex flex-col bg-blue-950 text-white transition-all duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-64"
          } border-r`}
      >
        {/* Logo + Toggle */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-blue-900">
          <div className="flex gap-2 items-center">
            <Image src="/lembaga/logo/logo-sertifikasi-akp.png" alt="Logo" width={40} height={40} />
            {!isCollapsed && (
              <p className="text-sm font-semibold leading-tight">
                Sistem Informasi Ujian Keahlian Awak Kapal Perikanan
              </p>
            )}
          </div>
          <button onClick={toggleSidebar} className="text-white hover:text-blue-300">
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        {/* Navigation */}
        <ul className="flex flex-col mt-4 space-y-1">
          {/* PUKAKP View */}
          {isPUKAKP === "true" || isPUKAKP === "penguji" ? (
            <li>
              <NavItem
                href="/lembaga/pukakp/admin/dashboard/ujian"
                icon={<FaHome className="w-5 h-5" />}
                label="Pelaksanaan Ujian"
                active={pathname.includes("/ujian")}
              />
            </li>
          ) : (
            <>
              <li>
                <button
                  onClick={() => setIsPelaksanaanOpen(!isPelaksanaanOpen)}
                  className={`flex items-center justify-between px-6 py-3 w-full text-sm font-medium border-l-4 transition-all duration-150 ${pathname.includes("/ujian") || pathname.includes("/tryout")
                      ? "bg-blue-800 text-white border-blue-400"
                      : "text-blue-200 hover:bg-blue-800 hover:text-white border-transparent"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <FaHome className="w-5 h-5" />
                    {!isCollapsed && <span>Pelaksanaan Ujian</span>}
                  </div>
                  {!isCollapsed && (
                    <FaChevronRight
                      className={`transition-transform ${isPelaksanaanOpen ? "rotate-90" : ""}`}
                    />
                  )}
                </button>
              </li>
              {isPelaksanaanOpen && !isCollapsed && (
                <div className="ml-12 flex flex-col space-y-1">
                  <NavItem
                    href="/lembaga/dpkakp/admin/dashboard/ujian"
                    icon={<FaQuestionCircle className="w-4 h-4" />}
                    label="Ujian"
                    active={pathname.includes("/ujian") && !pathname.includes("/tryout")}
                  />
                  <NavItem
                    href="/lembaga/dpkakp/admin/dashboard/tryout"
                    icon={<FaQuestionCircle className="w-4 h-4" />}
                    label="Tryout"
                    active={pathname.includes("/tryout")}
                  />
                </div>
              )}
              <NavItem
                href="/lembaga/dpkakp/admin/dashboard/bank-soal"
                icon={<FaChalkboardTeacher className="w-5 h-5" />}
                label="Bank Soal Ujian"
                active={pathname.includes("/bank-soal")}
              />
              <NavItem
                href="/lembaga/dpkakp/admin/dashboard/penguji"
                icon={<FaUserFriends className="w-5 h-5" />}
                label="Tim Penguji"
                active={pathname.includes("/penguji")}
              />
            </>
          )}
        </ul>

        {/* Logout */}
        <div className="mt-auto mb-6 px-4">
          <button
            onClick={handleLogOut}
            className="flex items-center gap-3 w-full text-sm font-medium text-red-400 hover:text-red-200 transition-colors"
          >
            <FaSignOutAlt className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <nav className="flex justify-between items-center h-16 px-6 border-b bg-white shadow-sm">
          <div></div>
          <div className="flex items-center gap-3">
            {dataAdmin && (
              <div className="text-right">
                <h1 className="font-semibold text-sm">{dataAdmin.Nama}</h1>
                <p className="text-xs text-gray-500">
                  {dataAdmin.Status && `${dataAdmin.Status} | `}
                  {dataAdmin.Nip || dataAdmin.Email}
                </p>
              </div>
            )}
            <img
              src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/me.jpg"
              alt="avatar"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </nav>
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
