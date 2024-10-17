"use client";

import React from "react";

import { TbSchool } from "react-icons/tb";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import TableDataDewanenguji from "@/components/dashboard/Pelatihan/TableDataPenguji";
import DefaultLayoutDPKAKP from "@/components/dashboard/Layouts/DefaultLayoutDPKAKP";
import { MdOutlineWork } from "react-icons/md";

const Blanko: React.FC = () => {
  return (
    <DefaultLayoutDPKAKP>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <MdOutlineWork className="text-4xl" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium leading-[100%] font-calsans">
              Dewan Penguji Keahlian AKP
            </h1>
            <p className="font-medium text-gray-400 text-base">
              Daftar data dewan penguji keahlian AKP
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-7.5">
        <TableDataDewanenguji />
      </div>
    </DefaultLayoutDPKAKP>
  );
};

export default Blanko;
