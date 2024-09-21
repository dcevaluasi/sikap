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
import { LucideSchool } from "lucide-react";
import { IoMdSchool } from "react-icons/io";

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
                top &&
                (usePathname() == "/" ||
                  usePathname() == "/lembaga/p2mkp" ||
                  usePathname().includes("bppp") ||
                  usePathname() == "/lembaga/dpkakp" ||
                  usePathname() == "/dashboard" ||
                  usePathname().includes("program") ||
                  usePathname().includes("registrasi") ||
                  usePathname().includes("login"))
                  ? "text-gray-200 hover:text-white hover:scale-105"
                  : top && usePathname().includes("layanan")
                  ? "text-gray-600 hover:text-gray-900 hover:scale-105"
                  : (top && usePathname().includes("pelatihan")) ||
                    usePathname().includes("sertifikasi") ||
                    usePathname().includes("users")
                  ? "text-gray-900 hover:text-gray-900 hover:scale-105"
                  : usePathname().includes("complete-profile")
                  ? "text-gray-600 hover:text-gray-900 hover:scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:scale-105"
              }  px-2 py-3 flex items-center transition  duration-150 ease-in-out font-medium`}
            >
              {name} <HiMiniChevronDown className="text-lg" />
            </div>
          </li>
        </PopoverTrigger>
        {name == currentName && (
          <PopoverContent
            onMouseLeave={() => setOpenModal(false)}
            className={`w-80 flex flex-col z-[1000000] gap-1 ${
              top ? "mt-7" : "mt-7"
            }`}
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
          target={`${name == "Pelatihan Aparatur" ? "_target" : "_self"}`}
          onClick={(e) => setOpenModal(false)}
          className={`font-medium ${
            top && usePathname().includes("layanan")
              ? "text-gray-600 hover:text-gray-900 hover:scale-105"
              : top && usePathname().includes("program")
              ? "text-gray-600 hover:text-gray-900 hover:scale-105"
              : (top && usePathname().includes("pelatihan")) ||
                usePathname().includes("sertifikasi") ||
                usePathname().includes("users")
              ? "text-gray-900 hover:text-gray-900 hover:scale-105"
              : usePathname().includes("complete-profile") ||
                usePathname().includes("layanan")
              ? "text-gray-600 hover:text-gray-900 hover:scale-105"
              : "text-gray-600 hover:text-gray-900 hover:scale-105"
          }  px-5 py-3 flex items-center transition duration-150 ease-in-out font-medium`}
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
          className={`font-medium ${
            top &&
            (usePathname() == "/" ||
              usePathname() == "/lembaga/p2mkp" ||
              usePathname().includes("bppp") ||
              usePathname() == "/lembaga/dpkakp" ||
              usePathname() == "/dashboard" ||
              usePathname().includes("program") ||
              usePathname().includes("registrasi") ||
              usePathname().includes("login"))
              ? "text-gray-200 hover:text-white hover:scale-105"
              : top && usePathname().includes("layanan")
              ? "text-gray-600 hover:text-gray-900 hover:scale-105"
              : (top && usePathname().includes("pelatihan")) ||
                usePathname().includes("sertifikasi") ||
                usePathname().includes("users")
              ? "text-gray-900 hover:text-gray-900 hover:scale-105"
              : usePathname().includes("complete-profile") ||
                usePathname().includes("layanan")
              ? "text-gray-600 hover:text-gray-900 hover:scale-105"
              : "text-gray-600 hover:text-gray-900 hover:scale-105"
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
        usePathname().includes("/dpkakp/user") ||
        usePathname().includes("/dpkakp/penguji") ||
        usePathname().includes("/komite-approval")
          ? "hidden"
          : "block"
      } w-full z-[150] md:bg-opacity-90 transition duration-300 ease-in-out ${
        (top && usePathname().includes("layanan")) ||
        usePathname() == "/dashboard" ||
        usePathname() == "/registrasi" ||
        usePathname() == "/login"
          ? "pt-0"
          : top && "pt-6"
      }  ${
        !top
          ? `bg-white backdrop-blur-sm shadow-lg`
          : usePathname().includes("layanan")
          ? "bg-white backdrop-blur-sm shadow-lg pt-0"
          : usePathname().includes("pelatihan") ||
            usePathname().includes("sertifikasi") ||
            usePathname().includes("users")
          ? `bg-white backdrop-blur-sm shadow-lg !pt-0`
          : usePathname().includes("complete-profile")
          ? "bg-white backdrop-blur-sm shadow-lg"
          : ""
      } ${
        top && usePathname().includes("layanan/program") && "bg-transparent"
      }`}
    >
      <div className=" mx-auto  max-w-7xl ">
        <div className="flex items-center justify-between h-24 md:h-24 py-3">
          <div className="shrink-0 mr-4 flex items-center gap-4">
            <Logo />
          </div>

          <nav className="hidden md:flex md:grow">
            <ul className="flex grow gap-0 justify-end flex-wrap items-center w-fit">
              <>
                {" "}
                <NavLinkDefault href="/" name="Beranda" top={top} />
                {/* <NavLinkDefault href="/" name="Tentang E-LAUT" top={top} /> */}
                <NavDropDown href="#" name="Layanan" top={top}>
                  <NavLink
                    href="/layanan/pelatihan"
                    name="Pelatihan Masyarakat"
                    top={top}
                  >
                    <div className="flex gap-2 items-center">
                      <HiMiniUserGroup className="text-xl" />{" "}
                      <span>Pelatihan dan Sertiffikasi</span>
                    </div>
                  </NavLink>

                  <NavLink
                    href="https://elearning.kkp.go.id/"
                    name="Pelatihan Aparatur"
                    top={top}
                  >
                    <div className="flex gap-2 items-center">
                      <RiGovernmentFill className="text-xl" />{" "}
                      <span>Pelatihan Aparatur</span>
                    </div>
                  </NavLink>
                </NavDropDown>
                <NavDropDown href="#" name="Lembaga Pelatihan" top={top}>
                  <NavLink href="/lembaga/bppp" name="DPKAKP" top={top}>
                    <div className="flex gap-2 items-center">
                      <IoMdSchool className="text-4xl" />{" "}
                      <span>
                        BPPP - Balai Pelatihan dan Sertifiaksi Kelautan dan
                        Perikanan
                      </span>
                    </div>
                  </NavLink>
                  <NavLink href="/lembaga/dpkakp" name="DPKAKP" top={top}>
                    <div className="flex gap-2 items-center">
                      <BiSolidShip className="text-4xl" />{" "}
                      <span>
                        DPKAKP - Dewan Penguji Keahlian Awak Kapal Perikanan
                      </span>
                    </div>
                  </NavLink>
                  <NavLink href="/lembaga/p2mkp" name="P2MKP" top={top}>
                    <div className="flex gap-2 items-center">
                      <AiFillShop className="text-4xl" />{" "}
                      <span>
                        P2MKP - Pelaksana Pelatihan Mandiri Kelautan dan
                        Perikanan
                      </span>
                    </div>
                  </NavLink>
                  {/* <NavLink
                    href="/lembaga/komite-approval"
                    name="Komite Approval"
                    top={top}
                  >
                    <div className="flex gap-2 items-center">
                      <HiMiniUserGroup className="text-3xl" />{" "}
                      <span>Komite Approval Diklat Awak Kapal Perikanan</span>
                    </div>
                  </NavLink> */}
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
                            ? usePathname().includes("pelatihan") ||
                              usePathname().includes("searching")
                              ? "text-blue-500 hover:text-white"
                              : "text-gray-200"
                            : "text-blue-500 hover:text-white"
                        } bg-transparent border border-blue-500 hover:bg-blue-500 ml-3`}
                      >
                        <span>Masuk</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/registrasi"
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
            </ul>
          </nav>

          <MobileMenu isTop={top} />
        </div>
      </div>
    </header>
  );
}
