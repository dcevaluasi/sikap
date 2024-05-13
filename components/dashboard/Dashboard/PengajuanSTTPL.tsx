"use client";

import React from "react";
import { BsSendArrowUp } from "react-icons/bs";
import TableDataPengajuanPelatihan from "../Pelatihan/TableDataPengajuanPelatihan";
import { TbFileCertificate } from "react-icons/tb";
import TableDataSTTPL from "../Pelatihan/TableDataSTTPL";

const PengajuanSTTPL: React.FC = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <TbFileCertificate className="text-4xl" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium leading-[100%] font-calsans">
              Penerbitan STTPL
            </h1>
            <p className="font-medium text-gray-400 text-base">
              Akan segera menerbitkan STTPL-mu? beri tahu ke pusat sekarang!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-7.5">
        <TableDataSTTPL />
      </div>
    </>
  );
};

export default PengajuanSTTPL;
