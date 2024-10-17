"use client";

import React from "react";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import TableDataTipeUjianKeahlian from "./TableDataTipeUjianKeahlian";
import axios, { AxiosResponse } from "axios";
import { dpkakpBaseUrl } from "@/constants/urls";
import { getIdUjianKeahlianInBankSoal } from "@/components/utils/dpkakp/pathname";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { IoImages } from "react-icons/io5";
import TableDataGambarSoalUjianKeahlian from "./TableDataGambarSoalUjianKeahlian";

const GambarSoalUjianKeahlian: React.FC = () => {
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <IoImages className="text-4xl" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium leading-[100%] font-calsans">
              Gambar Soal Ujian Keahlian
            </h1>
            <p className="font-medium text-gray-400 text-base">
              Tambahkan bank gambar soal ujian keahlian awak kapal perikanan!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-7.5">
        <TableDataGambarSoalUjianKeahlian />
      </div>
    </>
  );
};

export default GambarSoalUjianKeahlian;
