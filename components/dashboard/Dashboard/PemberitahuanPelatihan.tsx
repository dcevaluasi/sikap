"use client";

import React from "react";
import { BsSendArrowUp } from "react-icons/bs";
import TableDataPengajuanPelatihan from "../Pelatihan/TableDataPengajuanPelatihan";
import { TbBroadcast, TbFileCertificate } from "react-icons/tb";
import TableDataSTTPL from "../Pelatihan/TableDataPemberitahuanPelatihan";
import TableDataPemberitahuanPelatihan from "../Pelatihan/TableDataPemberitahuanPelatihan";

const PemberitahuanPelatihan: React.FC = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <TbBroadcast className="text-4xl" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold font-calsans leading-[100%]">
              Pemberitahuan Pelaksanaan Pelatihan
            </h1>
            <p className="font-normal text-gray-400 text-base -mt-1 leading-none max-w-2xl">
              Lihat pemberitahuan pelaksanaan pelatihan di balai pelatihan dan
              lakukan approval pelaksanaan untuk melanjutkan proses pelaksanaan
              oleh balai!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-7.5">
        <TableDataPemberitahuanPelatihan />
      </div>
    </>
  );
};

export default PemberitahuanPelatihan;
