"use client";

import React from "react";

import { TbSchool } from "react-icons/tb";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import TableDataDewanenguji from "@/components/dashboard/Pelatihan/TableDataPenguji";
import DefaultLayoutDPKAKP from "@/components/dashboard/Layouts/DefaultLayoutDPKAKP";
import { MdOutlineWork } from "react-icons/md";
import TipeUjianKeahlian from "@/components/dashboard/Dashboard/DPKAKP/TipeUjianKeahlian";
import LayoutAdmin from "@/components/dashboard/Layouts/LayoutAdmin";

const Blanko: React.FC = () => {
  return (
    <>
      <LayoutAdmin>
        <div className="flex-1 flex flex-col h-full overflow-y-scroll">
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
            >
              {/* add button */}
            </ul>
            {/* to bar right  */}
            <ul
              aria-label="top bar right"
              aria-orientation="horizontal"
              className="px-8 flex items-center"
            >


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
            </ul>
          </nav>
          {/* section body header */}

          {/* main content */}

          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center">
              <header
                aria-label="page caption"
                className="flex-row  flex h-20 items-center gap-2 bg-gray-100 border-t px-4"
              >
                <MdOutlineWork className="text-3xl" />
                <div className="flex flex-col">
                  <h1 id="page-caption" className="font-semibold text-lg">
                    Dewan Penguji Keahlian AKP
                  </h1>
                  <p className="font-medium text-gray-400 text-base">
                    Daftar data dewan penguji keahlian AKP
                  </p>
                </div>
              </header>
            </div>
          </div>

          <div className="px-4">
            <TableDataDewanenguji />
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
};

export default Blanko;
