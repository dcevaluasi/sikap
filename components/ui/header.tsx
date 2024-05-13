"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import { usePathname } from "next/navigation";


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoMdSchool } from "react-icons/io";
import { ArrowDown } from "lucide-react";
import { HiMiniChevronDown } from "react-icons/hi2";
import { TbCalendarSearch } from "react-icons/tb";
import Image from "next/image";
import { FaAnchor, FaUserTie } from "react-icons/fa6";
import { GiDoubleFish } from "react-icons/gi";

export default function Header() {
  const [top, setTop] = useState<boolean>(true);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  const isRegisteredDummy = false;

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-[999999] md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top
          ? "bg-white backdrop-blur-sm shadow-lg"
          : usePathname().includes("pelatihan") ||
            usePathname().includes("sertifikasi") ||
            usePathname().includes("users")
          ? "bg-white backdrop-blur-sm shadow-lg"
          : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-24 md:h-24 py-3">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/"
                  className={`font-medium ${
                    !top
                      ? "text-gray-600"
                      : (top && usePathname().includes("pelatihan")) ||
                        usePathname().includes("sertifikasi") ||
                        usePathname().includes("cek-sertifikat") ||
                        usePathname().includes("users")
                      ? "text-gray-600"
                      : "text-gray-200"
                  } hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out`}
                >
                  Beranda
                </Link>
              </li>

              <Popover>
                <PopoverTrigger asChild>
                  <li className="cursor-pointer">
                    <div
                      className={`font-medium ${
                        !top
                          ? "text-gray-600"
                          : (top && usePathname().includes("pelatihan")) ||
                            usePathname().includes("sertifikasi") ||
                            usePathname().includes("cek-sertifikat") ||
                            usePathname().includes("users")
                          ? "text-gray-600"
                          : "text-gray-200"
                      } hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out`}
                    >
                      Pelatihan <HiMiniChevronDown className="text-lg" />
                    </div>
                  </li>
                </PopoverTrigger>
                <PopoverContent className="w-80 flex flex-col gap-1 ">
                  <ul className="">
                    <li className="">
                      <Link
                        href="/pelatihan"
                        className={`font-medium ${
                          !top
                            ? "text-gray-600"
                            : (top && usePathname().includes("pelatihan")) ||
                              usePathname().includes("sertifikasi") ||
                              usePathname().includes("cek-sertifikat") ||
                              usePathname().includes("users")
                            ? "text-gray-600"
                            : "text-gray-200"
                        } hover:text-gray-900 px-5 py-3 gap-2 flex items-center transition duration-150 ease-in-out`}
                      >
                        <IoMdSchool />
                        Pelatihan Masyarakat
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://elearning.kkp.go.id/"
                        className={`font-medium ${
                          !top
                            ? "text-gray-600"
                            : (top && usePathname().includes("pelatihan")) ||
                              usePathname().includes("sertifikasi") ||
                              usePathname().includes("cek-sertifikat") ||
                              usePathname().includes("users")
                            ? "text-gray-600"
                            : "text-gray-200"
                        } hover:text-gray-900 px-5 py-3 gap-2 flex items-center transition duration-150 ease-in-out`}
                      >
                        <FaUserTie />
                        Pelatihan ASN
                      </Link>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <li className="cursor-pointer">
                    <div
                      className={`font-medium ${
                        !top
                          ? "text-gray-600"
                          : (top && usePathname().includes("pelatihan")) ||
                            usePathname().includes("sertifikasi") ||
                            usePathname().includes("cek-sertifikat") ||
                            usePathname().includes("users")
                          ? "text-gray-600"
                          : "text-gray-200"
                      } hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out`}
                    >
                      Sertifikasi <HiMiniChevronDown className="text-lg" />
                    </div>
                  </li>
                </PopoverTrigger>
                <PopoverContent className="w-80 flex flex-col gap-1 ">
                  <ul className="">
                    <li className="">
                      <Link
                        href="/sertifikasi"
                        className={`font-medium ${
                          !top
                            ? "text-gray-600"
                            : (top && usePathname().includes("pelatihan")) ||
                              usePathname().includes("sertifikasi") ||
                              usePathname().includes("cek-sertifikat") ||
                              usePathname().includes("users")
                            ? "text-gray-600"
                            : "text-gray-200"
                        } hover:text-gray-900 px-5 py-3 gap-2 flex items-center transition duration-150 ease-in-out`}
                      >
                        <GiDoubleFish />
                        Sertifikasi Non-Konvensi
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://akapi.kkp.go.id/"
                        className={`font-medium ${
                          !top
                            ? "text-gray-600"
                            : (top && usePathname().includes("pelatihan")) ||
                              usePathname().includes("sertifikasi") ||
                              usePathname().includes("cek-sertifikat") ||
                              usePathname().includes("users")
                            ? "text-gray-600"
                            : "text-gray-200"
                        } hover:text-gray-900 px-5 py-3 gap-2 flex items-center transition duration-150 ease-in-out`}
                      >
                        <FaAnchor />
                        Sertifikasi Konvensi Kepelautan
                      </Link>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>

              <li>
                <Link
                  href="/cek-sertifikat"
                  className={`font-medium ${
                    !top
                      ? "text-gray-600"
                      : (top && usePathname().includes("pelatihan")) ||
                        usePathname().includes("sertifikasi") ||
                        usePathname().includes("cek-sertifikat") ||
                        usePathname().includes("users")
                      ? "text-gray-600"
                      : "text-gray-200"
                  } hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out`}
                >
                  Cek Sertifikat
                </Link>
              </li>

              {isRegisteredDummy ? (
                <li className="w-fit">
                  <Link
                    href="/signin"
                    className={`font-medium hover:text-gray-900 px-5 py-3 flex items-center justify-center`}
                  >
                    <Image
                      src={"/dummies/profile-user.png"}
                      width={10}
                      height={10}
                      className="w-10 h-10 rounded-full duration-1000"
                      alt=""
                    />
                  </Link>
                </li>
              ) : (
                <>
                  {" "}
                  <li>
                    <Link
                      href="/signin"
                      className={`font-medium ${
                        !top
                          ? "text-gray-600"
                          : (top && usePathname().includes("pelatihan")) ||
                            usePathname().includes("sertifikasi") ||
                            usePathname().includes("cek-sertifikat") ||
                            usePathname().includes("users")
                          ? "text-gray-600"
                          : "text-gray-200"
                      } hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out`}
                    >
                      Masuk
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                    >
                      <span>Buat Akun</span>
                      <svg
                        className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <MobileMenu isTop={top} />
        </div>
      </div>
    </header>
  );
}
