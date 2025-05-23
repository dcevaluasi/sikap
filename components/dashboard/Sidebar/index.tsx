"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { FaBoxOpen, FaRupiahSign } from "react-icons/fa6";
import { IoMdSchool } from "react-icons/io";
import LogoFooter from "@/components/ui/logo-footer";
import { RiQuillPenLine } from "react-icons/ri";

import {
  RiFilePaperLine,
  RiShakeHandsLine,
  RiShipLine,
  RiVerifiedBadgeLine,
} from "react-icons/ri";
import { HiMiniComputerDesktop, HiOutlineUserGroup } from "react-icons/hi2";
import {
  TbBroadcast,
  TbBuildingSkyscraper,
  TbCalendarPin,
  TbDatabaseEdit,
  TbFileCertificate,
  TbSchool,
} from "react-icons/tb";
import Cookies from "js-cookie";
import { checkOperatorPusat } from "@/lib/role";
import { generateRandomId } from "@/lib/utils";
import { GrSend } from "react-icons/gr";
import { HiOutlineDownload } from "react-icons/hi";
import { PiImageBroken } from "react-icons/pi";
import { IoFileTrayStackedOutline } from "react-icons/io5";
import { FiBox } from "react-icons/fi";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-67 flex-col overflow-y-hidden ${
        pathname.includes("/dpkakp") || pathname.includes("/pukakp")
          ? "bg-darkDPKAKP"
          : "bg-gray-900"
      } duration-300 ease-linear  lg:static lg:translate-x-0 scrollbar-hide ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 pb-10 lg:pb-12">
        <Link
          href="/"
          className="flex gap-2 mt-10 flex-col items-center justify-center"
        >
          <LogoFooter />
          <div className="flex flex-col gap-0 mt-3 w-full items-center justify-center">
            <p className="font-bold text-4xl leading-none font-calsans text-center text-white">
              {pathname.includes("/akp")
                ? "AKAPI"
                : pathname.includes("/dpkakp")
                ? "DPKAKP"
                : pathname.includes("/pukakp")
                ? "PUKAKP"
                : ""}
            </p>
            <p className="font-medium text-white text-sm text-center">
              {pathname.includes("/akp")
                ? "Dashboard Sertifikasi Awak Kapal Perikanan Badan Penyuluhan dan Pengembangan Sumber Daya Manusia"
                : pathname.includes("/dpkakp")
                ? "Dashboard Dewan Penguji Keahlian Awak Kapal Perikanan Badan Penyuluhan dan Pengembangan Sumber Daya Manusia"
                : pathname.includes("/pukakp")
                ? "Dashboard Pelaksana Ujian Keahlian Awak Kapal Perikanan Badan Penyuluhan dan Pengembangan Sumber Daya Manusia"
                : "Dashboard Elektronik Layanan Pelatihan Kelautan dan Perikanan Utama Terpadu"}
            </p>
          </div>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="scrollbar-hide flex flex-col overflow-y-auto duration-300 ease-linear -mt-7">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5  py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5 text-sm">
              {pathname.includes("/akp") ? (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/" || pathname.includes("dashboard")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="/akp/pusat/dashboard"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-2  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                            (pathname === "/" ||
                              pathname.includes("dashboard")) &&
                            "bg-graydark "
                          }`}
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                              fill=""
                            />
                            <path
                              d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                              fill=""
                            />
                            <path
                              d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                              fill=""
                            />
                            <path
                              d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                              fill=""
                            />
                          </svg>
                          Dashboard
                        </Link>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ) : (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/" || pathname.includes("dashboard")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href={
                            Cookies.get("XSRF093") == "adminPusat"
                              ? `/${generateRandomId()}/pusat/dashboard`
                              : "admin/pusat/lemdiklat"
                          }
                          className={`group relative flex items-center gap-2.5 rounded-sm px-2  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                            (pathname === "/" ||
                              pathname.includes("dashboard")) &&
                            "bg-graydark "
                          }`}
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                              fill=""
                            />
                            <path
                              d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                              fill=""
                            />
                            <path
                              d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                              fill=""
                            />
                            <path
                              d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                              fill=""
                            />
                          </svg>
                          Dashboard
                        </Link>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}

              {pathname.includes("/akp") && (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/" || pathname.includes("dashboard")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="/akp/pusat/awak-kapal-perikanan"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-2  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                            (pathname === "/" ||
                              pathname.includes("awak-kapal-perikanan")) &&
                            "bg-graydark "
                          }`}
                        >
                          <HiOutlineUserGroup className="text-xl" />
                          Awak Kapal Perikanan
                        </Link>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}

              {pathname.includes("akp") && (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/akp" || pathname.includes("akp")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm  py-2 px-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                            (pathname === "/forms" ||
                              pathname.includes("forms")) &&
                            "bg-graydark "
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <RiShipLine className="text-xl" />
                          Layanan AKAPI
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && "rotate-180"
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </Link>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && "hidden"
                          }`}
                        >
                          <ul className="mb-5.5 mt-0 flex flex-col gap-1 pl-6">
                            <li>
                              <SidebarLinkGroup
                                activeCondition={pathname == "akp/pusat/blanko"}
                              >
                                {(handleClick, open) => {
                                  return (
                                    <React.Fragment>
                                      <Link
                                        href="/akp/pusat/blanko"
                                        className={`group relative flex items-center gap-2.5 rounded-sm px-2  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                                          pathname == "akp/pusat/blanko" &&
                                          "bg-graydark "
                                        }`}
                                      >
                                        <TbBuildingSkyscraper className="text-xl" />
                                        Pengesahan Program
                                      </Link>
                                    </React.Fragment>
                                  );
                                }}
                              </SidebarLinkGroup>
                            </li>
                            <li>
                              <SidebarLinkGroup
                                activeCondition={pathname.includes(
                                  "akp/pusat/blanko/blanko-keluar"
                                )}
                              >
                                {(handleClick, open) => {
                                  return (
                                    <React.Fragment>
                                      <Link
                                        href="/akp/pusat/blanko/blanko-keluar"
                                        className={`group relative flex items-center gap-2.5 rounded-sm px-2  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                                          pathname.includes(
                                            "akp/pusat/blanko/blanko-keluar"
                                          ) && "bg-graydark "
                                        }`}
                                      >
                                        <TbCalendarPin className="text-xl" />
                                        Pelaksanaan Diklat
                                      </Link>
                                    </React.Fragment>
                                  );
                                }}
                              </SidebarLinkGroup>
                            </li>
                            <li>
                              <SidebarLinkGroup
                                activeCondition={pathname.includes(
                                  "akp/pusat/blanko/blanko-keluar"
                                )}
                              >
                                {(handleClick, open) => {
                                  return (
                                    <React.Fragment>
                                      <Link
                                        href="/akp/pusat/blanko/blanko-keluar"
                                        className={`group relative flex items-center gap-2.5 rounded-sm px-2  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                                          pathname.includes(
                                            "akp/pusat/blanko/blanko-keluar"
                                          ) && "bg-graydark "
                                        }`}
                                      >
                                        <RiQuillPenLine className="text-xl" />
                                        Pelaksanaan Ujian
                                      </Link>
                                    </React.Fragment>
                                  );
                                }}
                              </SidebarLinkGroup>
                            </li>
                            <li>
                              <SidebarLinkGroup
                                activeCondition={pathname.includes(
                                  "akp/pusat/blanko/blanko-rusak"
                                )}
                              >
                                {(handleClick, open) => {
                                  return (
                                    <React.Fragment>
                                      <Link
                                        href="/akp/pusat/blanko/blanko-rusak"
                                        className={`group relative flex items-center gap-2.5 rounded-sm px-2  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                                          pathname.includes(
                                            "akp/pusat/blanko/blanko-rusak"
                                          ) && "bg-graydark "
                                        }`}
                                      >
                                        <TbFileCertificate className="text-xl" />
                                        Penerbitan Sertifikat
                                      </Link>
                                    </React.Fragment>
                                  );
                                }}
                              </SidebarLinkGroup>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}

              {pathname.includes("akp") && (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/akp" || pathname.includes("akp")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm  py-2 px-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                            (pathname === "/forms" ||
                              pathname.includes("forms")) &&
                            "bg-graydark "
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <IoFileTrayStackedOutline className="text-xl" />
                          Blanko
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && "rotate-180"
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </Link>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && "hidden"
                          }`}
                        >
                          <ul className="mb-5.5 mt-0 flex flex-col gap-1 pl-6">
                            <li>
                              <SidebarLinkGroup
                                activeCondition={pathname == "akp/pusat/blanko"}
                              >
                                {(handleClick, open) => {
                                  return (
                                    <React.Fragment>
                                      <Link
                                        href="/akp/pusat/blanko"
                                        className={`group relative flex items-center gap-2.5 rounded-sm px-2  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                                          pathname == "akp/pusat/blanko" &&
                                          "bg-graydark "
                                        }`}
                                      >
                                        <RiFilePaperLine className="text-xl" />
                                        Persediaan Blanko
                                      </Link>
                                    </React.Fragment>
                                  );
                                }}
                              </SidebarLinkGroup>
                            </li>
                            <li>
                              <SidebarLinkGroup
                                activeCondition={pathname.includes(
                                  "akp/pusat/blanko/blanko-keluar"
                                )}
                              >
                                {(handleClick, open) => {
                                  return (
                                    <React.Fragment>
                                      <Link
                                        href="/akp/pusat/blanko/blanko-keluar"
                                        className={`group relative flex items-center gap-2.5 rounded-sm px-2  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                                          pathname.includes(
                                            "akp/pusat/blanko/blanko-keluar"
                                          ) && "bg-graydark "
                                        }`}
                                      >
                                        <HiOutlineDownload className="text-xl" />
                                        Penggunaan Blanko
                                      </Link>
                                    </React.Fragment>
                                  );
                                }}
                              </SidebarLinkGroup>
                            </li>
                            <li>
                              <SidebarLinkGroup
                                activeCondition={pathname.includes(
                                  "akp/pusat/blanko/blanko-rusak"
                                )}
                              >
                                {(handleClick, open) => {
                                  return (
                                    <React.Fragment>
                                      <Link
                                        href="/akp/pusat/blanko/blanko-rusak"
                                        className={`group relative flex items-center gap-2.5 rounded-sm px-2  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                                          pathname.includes(
                                            "akp/pusat/blanko/blanko-rusak"
                                          ) && "bg-graydark "
                                        }`}
                                      >
                                        <PiImageBroken className="text-xl" />
                                        Blanko Rusak
                                      </Link>
                                    </React.Fragment>
                                  );
                                }}
                              </SidebarLinkGroup>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}

              {pathname.includes("akp") && (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/akp" || pathname.includes("akp")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm  py-2 px-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                            (pathname === "/forms" ||
                              pathname.includes("forms")) &&
                            "bg-graydark "
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <FiBox className="text-xl" />
                          Distribusi Sertifikat
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && "rotate-180"
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </Link>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && "hidden"
                          }`}
                        >
                          <ul className="mb-5.5 mt-0 flex flex-col gap-1 pl-6">
                            <li>
                              <SidebarLinkGroup
                                activeCondition={pathname.includes(
                                  "penyerahan-sertifikat"
                                )}
                              >
                                {(handleClick, open) => {
                                  return (
                                    <React.Fragment>
                                      <Link
                                        href="/akp/pusat/distribusi/penyerahan-sertifikat"
                                        className={`group relative flex items-center gap-2.5 rounded-sm px-2  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                                          pathname.includes(
                                            "penyerahan-sertifikat"
                                          ) && "bg-graydark "
                                        }`}
                                      >
                                        <RiShakeHandsLine className="text-xl" />
                                        Penyerahan Sertifikat
                                      </Link>
                                    </React.Fragment>
                                  );
                                }}
                              </SidebarLinkGroup>
                            </li>
                            <li>
                              <SidebarLinkGroup
                                activeCondition={pathname.includes(
                                  "pengiriman-sertifikat"
                                )}
                              >
                                {(handleClick, open) => {
                                  return (
                                    <React.Fragment>
                                      <Link
                                        href="/akp/pusat/distribusi/pengiriman-sertifikat"
                                        className={`group relative flex items-center gap-2.5 rounded-sm px-2  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                                          pathname.includes(
                                            "pengiriman-sertifikat"
                                          ) && "bg-graydark "
                                        }`}
                                      >
                                        <GrSend className="text-xl" />
                                        Pengiriman Sertifikat
                                      </Link>
                                    </React.Fragment>
                                  );
                                }}
                              </SidebarLinkGroup>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}

              {pathname.includes("/akp") ? (
                <></>
              ) : (
                <>
                  {pathname.includes("lemdiklat") ? (
                    <SidebarLinkGroup
                      activeCondition={
                        pathname === "/pelatihan" ||
                        pathname.includes("pelatihan")
                      }
                    >
                      {(handleClick, open) => {
                        return (
                          <React.Fragment>
                            <Link
                              href="#"
                              className={`group relative flex items-center gap-2.5 rounded-sm  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                                (pathname === "/pelatihan" ||
                                  pathname.includes("pelatihan")) &&
                                "bg-graydark "
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              <IoMdSchool className="text-xl" />
                              Pelatihan dan Sertifikasi
                              <svg
                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                  open && "rotate-180"
                                }`}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                  fill=""
                                />
                              </svg>
                            </Link>
                            {/* <!-- Dropdown Menu Start --> */}
                            <div
                              className={`translate transform overflow-hidden ${
                                !open && "hidden"
                              }`}
                            >
                              <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                                <li>
                                  <Link
                                    href={`/${generateRandomId()}/lemdiklat/pelatihan`}
                                    className={`group relative flex items-center gap-2.5 rounded-md  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                      pathname ===
                                        "/admin/lemdiklat/pelatihan" &&
                                      "text-white"
                                    }`}
                                  >
                                    • Database Pelatihan Masyarakat
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={`/${generateRandomId()}/lemdiklat/uji-kompetensi`}
                                    className={`group relative flex items-center gap-2.5 rounded-md  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                      pathname ===
                                        "/admin/lemdiklat/pelatihan" &&
                                      "text-white"
                                    }`}
                                  >
                                    • Database Uji Kompetensi
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            {/* <!-- Dropdown Menu End --> */}
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                  ) : pathname.includes("/dpkakp") ? (
                    <>
                      {" "}
                      <SidebarLinkGroup
                        activeCondition={
                          pathname === "/pelatihan" ||
                          pathname.includes("pelatihan")
                        }
                      >
                        {(handleClick, open) => {
                          return (
                            <React.Fragment>
                              <Link
                                href="#"
                                className={`group relative flex items-center gap-2.5 rounded-sm  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                                  (pathname === "/admin/pusat/pelatihan" ||
                                    pathname.includes("pelatihan")) &&
                                  "bg-graydark "
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  sidebarExpanded
                                    ? handleClick()
                                    : setSidebarExpanded(true);
                                }}
                              >
                                <HiMiniComputerDesktop className="text-xl" />
                                Ujian Keahlian
                                <svg
                                  className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                    open && "rotate-180"
                                  }`}
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                    fill=""
                                  />
                                </svg>
                              </Link>
                              {/* <!-- Dropdown Menu Start --> */}
                              <div
                                className={`translate transform overflow-hidden ${
                                  !open && "hidden"
                                }`}
                              >
                                <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                                  <li>
                                    <Link
                                      href="/lembaga/dpkakp/admin/dashboard/ujian"
                                      className={`group relative flex items-center gap-2.5 rounded-md  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                        pathname ===
                                          "/lembaga/dpkakp/admin/dashboard/ujian" &&
                                        "text-white"
                                      }`}
                                    >
                                      • Ujian Keahlian
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              {/* <!-- Dropdown Menu End --> */}
                            </React.Fragment>
                          );
                        }}
                      </SidebarLinkGroup>{" "}
                      <SidebarLinkGroup
                        activeCondition={
                          pathname === "/pelatihan" ||
                          pathname.includes("pelatihan")
                        }
                      >
                        {(handleClick, open) => {
                          return (
                            <React.Fragment>
                              <Link
                                href="#"
                                className={`group relative flex items-center gap-2.5 rounded-sm  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                                  (pathname === "/admin/pusat/pelatihan" ||
                                    pathname.includes("pelatihan")) &&
                                  "bg-graydark "
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  sidebarExpanded
                                    ? handleClick()
                                    : setSidebarExpanded(true);
                                }}
                              >
                                <TbDatabaseEdit className="text-xl" />
                                Bank Soal
                                <svg
                                  className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                    open && "rotate-180"
                                  }`}
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                    fill=""
                                  />
                                </svg>
                              </Link>
                              {/* <!-- Dropdown Menu Start --> */}
                              <div
                                className={`translate transform overflow-hidden ${
                                  !open && "hidden"
                                }`}
                              >
                                <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                                  <li>
                                    <Link
                                      href="/lembaga/dpkakp/admin/dashboard/bank-soal"
                                      className={`group relative flex items-center gap-2.5 rounded-md  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                        pathname ===
                                          "/lembaga/dpkakp/admin/dashboard/bank-soal" &&
                                        "text-white"
                                      }`}
                                    >
                                      • Soal Ujian Keahlian
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/lembaga/dpkakp/admin/dashboard/bank-soal/gambar"
                                      className={`group relative flex items-center gap-2.5 rounded-md  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                        pathname ===
                                          "/lembaga/dpkakp/admin/dashboard/bank-soal/gambar" &&
                                        "text-white"
                                      }`}
                                    >
                                      • Gambar Soal Ujian
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              {/* <!-- Dropdown Menu End --> */}
                            </React.Fragment>
                          );
                        }}
                      </SidebarLinkGroup>{" "}
                      <Link
                        href="/lembaga/dpkakp/admin/penguji/"
                        className={`group relative flex items-center gap-2.5 rounded-sm  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                          (pathname === "/admin/pusat/pelatihan" ||
                            pathname.includes("pelatihan")) &&
                          "bg-graydark "
                        }`}
                      >
                        <TbSchool className="text-xl" />
                        Dewan Penguji
                      </Link>
                    </>
                  ) : pathname.includes("/pukakp") ? (
                    <>
                      {" "}
                      <SidebarLinkGroup
                        activeCondition={
                          pathname === "/pelatihan" ||
                          pathname.includes("pelatihan")
                        }
                      >
                        {(handleClick, open) => {
                          return (
                            <React.Fragment>
                              <Link
                                href="#"
                                className={`group relative flex items-center gap-2.5 rounded-sm  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                                  (pathname === "/admin/pusat/pelatihan" ||
                                    pathname.includes("pelatihan")) &&
                                  "bg-graydark "
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  sidebarExpanded
                                    ? handleClick()
                                    : setSidebarExpanded(true);
                                }}
                              >
                                <HiMiniComputerDesktop className="text-xl" />
                                Ujian Keahlian
                                <svg
                                  className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                    open && "rotate-180"
                                  }`}
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                    fill=""
                                  />
                                </svg>
                              </Link>
                              {/* <!-- Dropdown Menu Start --> */}
                              <div
                                className={`translate transform overflow-hidden ${
                                  !open && "hidden"
                                }`}
                              >
                                <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                                  <li>
                                    <Link
                                      href="/lembaga/pukakp/admin/dashboard/ujian"
                                      className={`group relative flex items-center gap-2.5 rounded-md  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                        pathname ===
                                          "/lembaga/pukakp/admin/dashboard/ujian" &&
                                        "text-white"
                                      }`}
                                    >
                                      • Ujian Keahlian
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              {/* <!-- Dropdown Menu End --> */}
                            </React.Fragment>
                          );
                        }}
                      </SidebarLinkGroup>{" "}
                    </>
                  ) : (
                    <SidebarLinkGroup
                      activeCondition={
                        pathname === "/pelatihan" ||
                        pathname.includes("pelatihan")
                      }
                    >
                      {(handleClick, open) => {
                        return (
                          <React.Fragment>
                            <Link
                              href="#"
                              className={`group relative flex items-center gap-2.5 rounded-sm  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                                (pathname === "/admin/pusat/pelatihan" ||
                                  pathname.includes("pelatihan")) &&
                                "bg-graydark "
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              <IoMdSchool className="text-xl" />
                              Pelatihan Masyarakat
                              <svg
                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                  open && "rotate-180"
                                }`}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                  fill=""
                                />
                              </svg>
                            </Link>
                            {/* <!-- Dropdown Menu Start --> */}
                            <div
                              className={`translate transform overflow-hidden ${
                                !open && "hidden"
                              }`}
                            >
                              <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-3">
                                <li>
                                  <Link
                                    href="/admin/pusat/pelatihan/pemberitahuan-pelatihan"
                                    className={`group relative w-fit flex items-center gap-2 rounded-md  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                      pathname ===
                                        "/admin/pusat/pelatihan/pemberitahuan-pelatihan" &&
                                      "text-white"
                                    }`}
                                  >
                                    <div className="flex-1">
                                      <TbBroadcast className="text-xl" />
                                    </div>
                                    <span className="flex-2  w-full">
                                      Pemberitahuan Pelatihan
                                    </span>
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    href="/admin/pusat/pelatihan/penerbitan-sertifikat"
                                    className={`group relative  w-fit  flex items-center gap-2 rounded-md  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                      pathname ===
                                        "/admin/pusat/pelatihan/penerbitan-sertifikat" &&
                                      "text-white"
                                    }`}
                                  >
                                    <div className="flex-1">
                                      <RiVerifiedBadgeLine className="text-xl" />
                                    </div>
                                    <span className="flex-2  w-full">
                                      Penerbitan Sertifikat
                                    </span>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            {/* <!-- Dropdown Menu End --> */}
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                  )}

                  {pathname.includes("lemdiklat") && (
                    <SidebarLinkGroup
                      activeCondition={
                        pathname === "/forms" || pathname.includes("forms")
                      }
                    >
                      {(handleClick, open) => {
                        return (
                          <React.Fragment>
                            <Link
                              href="#"
                              className={`group relative flex items-center gap-2.5 rounded-sm  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                                (pathname === "/forms" ||
                                  pathname.includes("forms")) &&
                                "bg-graydark "
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              <FaBoxOpen className="text-xl" />
                              Fasilitas Layanan
                              <svg
                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                  open && "rotate-180"
                                }`}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                  fill=""
                                />
                              </svg>
                            </Link>
                            {/* <!-- Dropdown Menu Start --> */}
                            <div
                              className={`translate transform overflow-hidden ${
                                !open && "hidden"
                              }`}
                            >
                              <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                                <li>
                                  <Link
                                    href="/admin/lemdiklat/fasilitas/penginapan"
                                    className={`group relative flex items-center gap-2.5 rounded-md  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                      pathname ===
                                        "/admin/lemdiklat/fasilitas/penginapan" &&
                                      "text-white"
                                    }`}
                                  >
                                    • Fasilitas Penginapan
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="/admin/lemdiklat/fasilitas/konsumsi"
                                    className={`group relative flex items-center gap-2.5 rounded-md  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                      pathname ===
                                        "/admin/lemdiklat/fasilitas/konsumsi" &&
                                      "text-white"
                                    }`}
                                  >
                                    • Fasilitas Konsumsi
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="/forms/form-elements"
                                    className={`group relative flex items-center gap-2.5 rounded-md  font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                      pathname === "/forms/form-elements" &&
                                      "text-white"
                                    }`}
                                  >
                                    • Fasilitas Peralatan dll
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            {/* <!-- Dropdown Menu End --> */}
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                  )}

                  {!checkOperatorPusat() ||
                    !pathname.includes("dpkakp") ||
                    (!pathname.includes("pukakp") && (
                      <li>
                        <Link
                          href="/admin/lemdiklat/pnbp"
                          className={`group relative flex items-center gap-2.5 rounded-sm  py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  ${
                            (pathname === "/admin/lemdiklat/pnbp" ||
                              pathname.includes("pnbp")) &&
                            "bg-graydark "
                          }`}
                        >
                          <FaRupiahSign className="text-3xl" />
                          Pendapatan Negara Bukan Pajak (PNBP)
                        </Link>
                      </li>
                    ))}
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
