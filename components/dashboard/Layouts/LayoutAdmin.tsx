"use client";

import Toast from "@/components/toast";
import { dpkakpBaseUrl } from "@/constants/urls";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPUKAKP, setIsPUKAKP] = useState<string>("false");
  const router = useRouter();

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
            title: "Pelaksanaan Ujian AKP",
            href: "/lembaga/pukakp/admin/dashboard/ujian",
            iconPath:
              "M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z",
            active: true,
          },
        ]
      : [
          {
            title: "Pelaksanaan Ujian AKP",
            href: "/lembaga/dpkakp/admin/dashboard/ujian",
            iconPath:
              "M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z",
            active: true,
          },
          {
            title: "Bank Soal Ujian AKP",
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

  return (
    <div className="h-screen w-full flex text-gray-800 bg-white">
      {/* Sidebar */}
      <nav className="flex-none flex flex-col items-center bg-blue-950 text-gray-400 border-r h-screen">
        <div className="h-16 flex items-center w-full">
          <Image
            src="/lembaga/logo/logo-sertifikasi-akp.png"
            alt="Logo"
            width={40}
            height={40}
            className="mx-auto"
          />
        </div>
        <ul className="w-full">
          {navItems.map(({ title, href, iconPath, active }) => (
            <li key={title}>
              <a
                href={href}
                title={title}
                className={`h-16 px-6 flex items-center w-full ${
                  active
                    ? "text-white bg-blue-500"
                    : "hover:text-white hover:bg-blue-500"
                } group`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mx-auto fill-gray-300 duration-700 group-hover:fill-white"
                  viewBox="0 0 24 24"
                  fill=""
                >
                  <path d={iconPath} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
        <div
          className="mt-auto h-16 flex items-center w-full cursor-pointer"
          onClick={() => handleLogOut()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 mx-auto text-gray-200 hover:text-blue-500 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 17v-4H7v-2h9V7l5 5-5 5zm-2 3H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h9v2H5v12h9v2z"
            />
          </svg>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow overflow-y-scroll scrollbar-hide">
        {children}
      </main>
    </div>
  );
}
