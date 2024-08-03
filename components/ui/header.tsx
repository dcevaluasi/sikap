"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import { usePathname } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  HiCalendar,
  HiMiniChevronDown,
  HiMiniUserGroup,
} from "react-icons/hi2";
import Cookies from "js-cookie";
import DropdownUser from "../dashboard/Header/DropdownUser";
import DropdownUserPelatihan from "../dashboard/Header/DropdownUserPelatihan";
import { Dropdown } from "flowbite-react";
import {
  RiGovernmentFill,
  RiSchoolFill,
  RiVerifiedBadgeFill,
} from "react-icons/ri";
import { BiSolidShip } from "react-icons/bi";
import { AiFillShop } from "react-icons/ai";
import { BsFillPatchCheckFill } from "react-icons/bs";

export default function Header() {
  const [top, setTop] = React.useState<boolean>(true);

  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  const [openModal, setOpenModal] = React.useState(false);
  const [currentName, setCurrentName] = React.useState("");

  const NavDropDown = ({
    href,
    name,
    top,
    children,
  }: {
    href: string;
    name: string;
    top: boolean;
    children: any;
  }) => {
    return (
      <Popover open={openModal}>
        <PopoverTrigger asChild>
          <li
            className="cursor-pointer"
            onClick={(e) => {
              setCurrentName(name);
              setOpenModal(!openModal);
            }}
          >
            <div
              className={`font-medium ${
                !top || usePathname().includes("bppp")
                  ? "text-gray-600 hover:text-gray-900 hover:scale-105"
                  : (top && usePathname().includes("pelatihan")) ||
                    usePathname().includes("sertifikasi") ||
                    usePathname().includes("users")
                  ? "text-gray-900 hover:text-gray-900 hover:scale-105"
                  : usePathname().includes("complete-profile")
                  ? "text-gray-600 hover:text-white hover:scale-105"
                  : "text-gray-200 hover:text-white hover:scale-105"
              }  px-5 py-3 flex items-center transition duration-150 ease-in-out font-semibold`}
            >
              {name} <HiMiniChevronDown className="text-lg" />
            </div>
          </li>
        </PopoverTrigger>
        {name == currentName && (
          <PopoverContent
            className={`w-80 flex flex-col gap-1 ${top ? "" : "mt-7"}`}
          >
            <ul>{children}</ul>
          </PopoverContent>
        )}
      </Popover>
    );
  };

  const NavLink = ({
    href,
    name,
    top,
    children,
  }: {
    href: string;
    name: string;
    top: boolean;
    children?: any;
  }) => {
    return (
      <li>
        <Link
          href={href}
          onClick={(e) => setOpenModal(false)}
          className={`font-medium ${
            !top || usePathname().includes("bppp")
              ? "text-gray-600 hover:text-gray-900 hover:scale-105"
              : (top && usePathname().includes("pelatihan")) ||
                usePathname().includes("sertifikasi") ||
                usePathname().includes("users")
              ? "text-gray-900 hover:text-gray-900 hover:scale-105"
              : usePathname().includes("complete-profile")
              ? "text-gray-600 hover:text-gray-900 hover:scale-105"
              : "text-gray-600 hover:text-gray-900 hover:scale-105"
          }  px-5 py-3 flex items-center transition duration-150 ease-in-out font-semibold`}
        >
          {children}
        </Link>
      </li>
    );
  };

  const NavLinkDefault = ({
    href,
    name,
    top,
  }: {
    href: string;
    name: string;
    top: boolean;
  }) => {
    return (
      <li>
        <Link
          href={href}
          className={`font-semibold ${
            !top || usePathname().includes("bppp")
              ? "text-gray-600 hover:text-gray-900 hover:scale-105"
              : (top && usePathname().includes("pelatihan")) ||
                usePathname().includes("sertifikasi") ||
                usePathname().includes("users")
              ? "text-gray-900 hover:text-gray-900 hover:scale-105"
              : usePathname().includes("complete-profile")
              ? "text-gray-600 hover:text-gray-900 hover:scale-105"
              : "text-gray-200 hover:text-white hover:scale-105"
          }  px-5 py-3 flex items-center transition duration-150 ease-in-out`}
        >
          {name}
        </Link>
      </li>
    );
  };

  React.useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed ${
        usePathname().includes("pre-test") ||
        usePathname().includes("post-test") ||
        usePathname().includes("/dpkakp/admin") ||
        usePathname().includes("/dpkakp/user")
          ? "hidden"
          : "block"
      } w-full z-[150] md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top
          ? `bg-white backdrop-blur-sm shadow-lg`
          : usePathname().includes("pelatihan") ||
            usePathname().includes("sertifikasi") ||
            usePathname().includes("users")
          ? `bg-white backdrop-blur-sm shadow-lg`
          : usePathname().includes("complete-profile")
          ? "bg-white backdrop-blur-sm shadow-lg"
          : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-24 md:h-24 py-3">
          <div className="shrink-0 mr-4 flex items-center gap-4">
            <Logo />
          </div>

          <nav className="hidden md:flex md:grow">
            <ul className="flex grow gap-0 justify-end flex-wrap items-center w-fit">
              {usePathname().includes("dpkakp") ? (
                <>
                  {" "}
                  <NavLinkDefault href="/dpkakp" name="Beranda" top={top} />
                  <NavDropDown href="#" name="Layanan" top={top}>
                    <NavLink
                      href="/bppp/medan"
                      name="Balai Pelatihan"
                      top={top}
                    >
                      <div className="flex gap-2 items-center">
                        <BiSolidShip className="text-2xl" />{" "}
                        <span>Sertifikasi Awak Kapal Perikanan</span>
                      </div>
                    </NavLink>
                    <NavLink href="/dpkakp" name="DPKAKP" top={top}>
                      <div className="flex gap-2 items-center">
                        <HiCalendar className="text-3xl" />{" "}
                        <span>
                          Jadwal Pelaksanaan Ujian Awak Kapal Perikanan
                        </span>
                      </div>
                    </NavLink>
                    <NavLink href="/bppp/bitung" name="P2MKP" top={top}>
                      <div className="flex gap-2 items-center">
                        <BsFillPatchCheckFill className="text-2xl" />{" "}
                        <span>Cek Sertifikat Awak Kapal Perikanan</span>
                      </div>
                    </NavLink>
                  </NavDropDown>
                  <NavLinkDefault href="" name="Tentang DPKAKP" top={top} />
                  {Cookies.get("XSRF081") ? (
                    <div className="flex items-center gap-3 2xsm:gap-7">
                      <DropdownUserPelatihan top={top} />
                    </div>
                  ) : (
                    <div className="flex">
                      <li>
                        <Link
                          href="/login"
                          className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                        >
                          <span>Layanan</span>
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
                    </div>
                  )}
                </>
              ) : (
                <>
                  {" "}
                  <NavLinkDefault href="/" name="Beranda" top={top} />
                  {/* <NavLinkDefault href="/" name="Tentang E-LAUT" top={top} /> */}
                  <NavDropDown href="#" name="Layanan" top={top}>
                    <NavLink
                      href="/layanan/pelatihan-masyarakat"
                      name="BPPP Tegal"
                      top={top}
                    >
                      <div className="flex gap-2 items-center">
                        <HiMiniUserGroup className="text-xl" />{" "}
                        <span>Pelatihan Masyarakat</span>
                      </div>
                    </NavLink>
                    <NavLink href="/bppp/ambon" name="BPPP Ambon" top={top}>
                      <div className="flex gap-2 items-center">
                        <RiVerifiedBadgeFill className="text-xl" />{" "}
                        <span>Sertifikasi atau Uji Kompetensi</span>
                      </div>
                    </NavLink>
                    <NavLink href="/bppp/medan" name="BPPP Medan" top={top}>
                      <div className="flex gap-2 items-center">
                        <RiGovernmentFill className="text-xl" />{" "}
                        <span>Pelatihan Aparatur</span>
                      </div>
                    </NavLink>
                  </NavDropDown>
                  <NavDropDown href="#" name="Lembaga Pelatihan" top={top}>
                    <NavLink href="/dpkakp" name="DPKAKP" top={top}>
                      <div className="flex gap-2 items-center">
                        <BiSolidShip className="text-4xl" />{" "}
                        <span>
                          DPKAKP - Dewang Penguji Keahlian Awak Kapal Perikanan
                        </span>
                      </div>
                    </NavLink>
                    <NavLink href="/bppp/bitung" name="P2MKP" top={top}>
                      <div className="flex gap-2 items-center">
                        <AiFillShop className="text-4xl" />{" "}
                        <span>
                          P2MKP - Pelaksana Pelatihan Mandiri Kelautan dan
                          Perikanan
                        </span>
                      </div>
                    </NavLink>
                    <NavLink
                      href="/komite-approval"
                      name="Komite Approval"
                      top={top}
                    >
                      <div className="flex gap-2 items-center">
                        <HiMiniUserGroup className="text-3xl" />{" "}
                        <span>Komite Approval Diklat Awak Kapal Perikanan</span>
                      </div>
                    </NavLink>
                  </NavDropDown>
                  <NavLinkDefault
                    href="/#cek-sertifikat"
                    name="Cek Sertifikat"
                    top={top}
                  />
                  {Cookies.get("XSRF081") ? (
                    <div className="flex items-center gap-3 2xsm:gap-7">
                      {/* <!-- User Area --> */}
                      <DropdownUserPelatihan top={top} />
                      {/* <!-- User Area --> */}
                    </div>
                  ) : (
                    <div className="flex">
                      <li>
                        <Link
                          href="/login"
                          className={`btn-sm ${
                            top
                              ? "text-gray-200"
                              : "text-blue-500 hover:text-white"
                          } bg-transparent border border-blue-500 hover:bg-blue-500 ml-3`}
                        >
                          <span>Masuk</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/login"
                          className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                        >
                          <span>Registrasi</span>
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
                    </div>
                  )}
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
