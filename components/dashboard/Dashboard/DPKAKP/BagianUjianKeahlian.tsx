"use client";

import React from "react";
import { TbSchool } from "react-icons/tb";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import TableDataTipeUjianKeahlian from "./TableDataTipeUjianKeahlian";
import TableDataFungsiUjianKeahlian from "./TableDataFungsiUjianKeahlian";
import TableDataBagianUjianKeahlian from "./TableDataBagianUjianKeahlian";

const BagianUjianKeahlian: React.FC = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <HiMiniComputerDesktop className="text-4xl" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium leading-[100%] font-calsans">
              Master Data Bagian Ujian
            </h1>
            <p className="font-medium text-gray-400 text-base">
              Tambahkan data bagian ujian keahlian awak kapal perikanan!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-7.5">
        <TableDataBagianUjianKeahlian />
      </div>
    </>
  );
};

export default BagianUjianKeahlian;
