"use client";

import Toast from "@/components/toast";
import { dpkakpBaseUrl } from "@/constants/urls";
import { UserInformationDPKAKP } from "@/types/dpkakp";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaChevronLeft, FaChevronRight, FaSignOutAlt } from "react-icons/fa";



export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPUKAKP, setIsPUKAKP] = useState<string>("false");
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const [dataAdmin, setDataAdmin] =
    React.useState<UserInformationDPKAKP | null>(null);

  const isPenguji = Cookies.get("IsPUKAKP") == "penguji";

  const handleLogOut = async () => {
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
      const { data } = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getAdminPusat`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      setDataAdmin(data.data);
      Cookies.set("PUKAKP", data.data.Nama);
    } catch (error) {
      console.error("Failed to fetch admin data", error);
    }
  };

  const fetchDataPenguji = async () => {
    try {
      const { data } = await axios.get(
        `${dpkakpBaseUrl}/penguji/getUsersDewan`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );

      Cookies.set("NamaUsersDpkakp", data?.data?.NamaUsersDpkakp);
      Cookies.set("IdUsersDpkakp", data?.data?.IdUsersDpkakp!);
      console.log("PENGUJI", data);
    } catch (error) {
      console.error("Failed to fetch admin data", error);
    }
  };

  useEffect(() => {
    if (isPenguji) {
      fetchDataPenguji();
    } else {
      fetchAdminData();
    }

    setIsPUKAKP(Cookies.get("IsPUKAKP")!);
  }, []);

  const navItems =
    isPUKAKP == "true" || isPUKAKP == "penguji"
      ? [
        {
          title: "Pelaksanaan Ujian",
          href: "/lembaga/pukakp/admin/dashboard/ujian",
          iconPath:
            "M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z",
          active: true,
        },
      ]
      : [
        {
          title: "Pelaksanaan Ujian",
          href: "/lembaga/dpkakp/admin/dashboard/ujian",
          iconPath:
            "M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z",
          active: true,
        },
        {
          title: "Bank Soal Ujian",
          href: "/lembaga/dpkakp/admin/dashboard/bank-soal",
          iconPath:
            "M18.546 3h-13.069l-5.477 8.986v9.014h24v-9.014l-5.454-8.986zm-3.796 12h-5.5l-2.25-3h-4.666l4.266-7h10.82l4.249 7h-4.669l-2.25 3zm-9.75-4l.607-1h12.787l.606 1h-14zm12.18-3l.607 1h-11.573l.607-1h10.359zm-1.214-2l.606 1h-9.144l.607-1h7.931z",
        },

        {
          title: "Tim Penguji",
          href: "/lembaga/dpkakp/admin/dashboard/penguji",
          iconPath:
            "M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z",
        },
      ];

  const [isPelaksanaanOpen, setIsPelaksanaanOpen] = useState(true);
  const isPUKAKPNegated = isPUKAKP !== "true" && isPUKAKP !== "penguji";


  return (
    <div className="h-screen w-full flex text-gray-800 bg-white">
      {/* Sidebar */}
      <nav
        className={`flex-none flex flex-col bg-blue-950 text-white transition-all duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-64"
          } border-r`}
      >
        {/* Logo / Toggle */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-blue-900">
          {!isCollapsed ? (
            <div className="flex gap-2 items-center my-4">
              <Image
                src="/lembaga/logo/logo-sertifikasi-akp.png"
                alt="Logo"
                width={48}
                height={48}
              />
              <p className='leading-none font-semibold'>Sistem Informasi Ujian Keahlian Awak Kapal Perikanan</p>
            </div>

          ) : <Image
            src="/lembaga/logo/logo-sertifikasi-akp.png"
            alt="Logo"
            width={48}
            height={48}
          />}
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-blue-300 transition"
          >
            {isCollapsed ? <FaChevronRight size={18} /> : <FaChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col mt-4 space-y-1">
          {/* Conditional rendering of PUKAKP sidebar item */}
          {isPUKAKP === "true" || isPUKAKP === "penguji" ? (
            <li>
              <a
                href="/lembaga/pukakp/admin/dashboard/ujian"
                className={`flex items-center gap-3 px-6 py-4 text-sm font-medium w-full border-l-4 transition-all duration-150 
          ${pathname.includes("/ujian")
                    ? "bg-blue-800 text-white border-blue-400"
                    : "text-blue-200 hover:bg-blue-800 hover:text-white border-transparent"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z" />
                </svg>
                {!isCollapsed && <span>Pelaksanaan Ujian</span>}
              </a>
            </li>
          ) : (
            <>
              {/* Parent Pelaksanaan Ujian with submenu */}
              <li>
                <button
                  onClick={() => setIsPelaksanaanOpen(!isPelaksanaanOpen)}
                  className={`flex items-center justify-between px-6 py-4 w-full text-sm font-medium border-l-4 transition-all duration-150 
            ${pathname.includes("/ujian") || pathname.includes("/tryout")
                      ? "bg-blue-800 text-white border-blue-400"
                      : "text-blue-200 hover:bg-blue-800 hover:text-white border-transparent"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z" />
                    </svg>
                    {!isCollapsed && <span>Pelaksanaan Ujian</span>}
                  </div>
                  {!isCollapsed && (
                    <FaChevronRight
                      className={`transition-transform ${isPelaksanaanOpen ? "rotate-90" : ""
                        }`}
                    />
                  )}
                </button>
              </li>

              {/* Submenus */}
              {isPelaksanaanOpen && !isCollapsed && (
                <div className="ml-12 flex flex-col space-y-1">
                  <a
                    href="/lembaga/dpkakp/admin/dashboard/ujian"
                    className={`px-2 py-2 text-sm font-medium rounded-md transition 
              ${pathname.includes("/ujian") && !pathname.includes("/tryout")
                        ? "text-white bg-blue-700"
                        : "text-blue-200 hover:text-white hover:bg-blue-800"
                      }`}
                  >
                    Ujian
                  </a>
                  <a
                    href="/lembaga/dpkakp/admin/dashboard/tryout"
                    className={`px-2 py-2 text-sm font-medium rounded-md transition 
              ${pathname.includes("/tryout")
                        ? "text-white bg-blue-700"
                        : "text-blue-200 hover:text-white hover:bg-blue-800"
                      }`}
                  >
                    Tryout
                  </a>
                </div>
              )}
            </>
          )}

          {/* Other nav items if !PUKAKP */}
          {isPUKAKPNegated && (
            <>
              <li>
                <a
                  href="/lembaga/dpkakp/admin/dashboard/bank-soal"
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-medium w-full border-l-4 transition-all duration-150 
            ${pathname.includes("/bank-soal")
                      ? "bg-blue-800 text-white border-blue-400"
                      : "text-blue-200 hover:bg-blue-800 hover:text-white border-transparent"
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.546 3h-13.069l-5.477 8.986v9.014h24v-9.014l-5.454-8.986zm-3.796 12h-5.5l-2.25-3h-4.666l4.266-7h10.82l4.249 7h-4.669l-2.25 3zm-9.75-4l.607-1h12.787l.606 1h-14zm12.18-3l.607 1h-11.573l.607-1h10.359zm-1.214-2l.606 1h-9.144l.607-1h7.931z" />
                  </svg>
                  {!isCollapsed && <span>Bank Soal Ujian</span>}
                </a>
              </li>

              <li>
                <a
                  href="/lembaga/dpkakp/admin/dashboard/penguji"
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-medium w-full border-l-4 transition-all duration-150 
            ${pathname.includes("/penguji")
                      ? "bg-blue-800 text-white border-blue-400"
                      : "text-blue-200 hover:bg-blue-800 hover:text-white border-transparent"
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" />
                  </svg>
                  {!isCollapsed && <span>Tim Penguji</span>}
                </a>
              </li>
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
      <main className="flex-grow overflow-y-scroll scrollbar-hide">
        <div className="flex flex-1 flex-col">
          {/* section body top nav */}
          <nav
            aria-label="top bar"
            className="flex-none flex justify-between bg-white h-16"
          >
            {/* top bar left */}
            <ul
              aria-label="top bar left"
              aria-orientation="horizontal"
              className="flex"
            ></ul>
            {/* to bar right  */}
            <ul
              aria-label="top bar right"
              aria-orientation="horizontal"
              className="px-8 flex items-center"
            >
              <div className="flex gap-2 items-center">
                {dataAdmin != null ? (
                  <div className="flex flex-col items-end">
                    <h1 className="font-semibold text-sm">{dataAdmin!.Nama}</h1>
                    <p className="text-xs font-normal"> {dataAdmin!.Status != '' ? dataAdmin!.Status + ' | ' : ''} {dataAdmin!.Nip != '' ? dataAdmin!.Nip : dataAdmin!.Email}</p>
                  </div>
                ) : (
                  <></>
                )}

                <li className="h-10 w-10 ml-3">
                  <button
                    title="Page Menu"
                    aria-label="page menu"
                    className="h-full w-full rounded-full border focus:outline-none focus:shadow-outline"
                  >
                    <img
                      className="h-full w-full rounded-full mx-auto"
                      src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/me.jpg"
                    />
                  </button>
                </li>
              </div>
            </ul>
          </nav>
          {/* section body header */}
          {children}
        </div>
      </main>
    </div>
  );
}
