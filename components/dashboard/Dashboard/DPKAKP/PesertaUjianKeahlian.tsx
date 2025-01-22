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
          <header
            aria-label="page caption"
            className="flex-row  flex h-20 items-center gap-2 w-full bg-gray-100 border-t px-4"
          >
            <HiUserGroup className="text-3xl" />
            <div className="flex flex-col">
              <h1 id="page-caption" className="font-semibold text-lg">
                Peserta Ujian
              </h1>
              <p className="font-normal -mt-1 text-gray-400 text-base">
                Verifikasi, Monitoring, dan Lihat Data Peserta Ujian Keahlian
                Awak Kapal Perikanan!
              </p>
            </div>
          </header>
        </div>
      </div>

      <div className="">
        <TableDataPesertaUjianKeahlian />
      </div>
    </>
  );
};

export default PesertaUjianKeahlian;
