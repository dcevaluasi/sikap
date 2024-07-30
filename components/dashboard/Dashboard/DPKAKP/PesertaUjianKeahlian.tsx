"use client";
import React from "react";
import { HiUserGroup } from "react-icons/hi2";
import { usePathname, useSearchParams } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { Pelatihan, PelatihanMasyarakat, UserPelatihan } from "@/types/product";
import { extractLastSegment } from "@/utils";
import TableDataPesertaUjianKeahlian from "./TableDataPesertaUjianKeahlian";

const PesertaUjianKeahlian: React.FC = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <HiUserGroup className="text-4xl" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium leading-[100%] font-calsans">
              Peserta Ujian
            </h1>
            <p className="font-normal -mt-1 text-gray-400 text-base">
              Verifikasi, Monitoring, dan Lihat Data Peserta Ujian Keahlian Awak
              Kapal Perikanan!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-7.5">
        <TableDataPesertaUjianKeahlian />
      </div>
    </>
  );
};

export default PesertaUjianKeahlian;
