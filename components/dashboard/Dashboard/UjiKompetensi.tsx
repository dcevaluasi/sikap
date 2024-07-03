"use client";

import React from "react";
import TableDataPelatihan from "../Pelatihan/TableDataPelatihan";
import { TbFileCertificate, TbSchool } from "react-icons/tb";
import { PiExamBold } from "react-icons/pi";
import TableDataUjiKompetensi from "../Pelatihan/TableDataUjiKompetensi";

const UjiKompetensi: React.FC = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <TbFileCertificate className="text-4xl" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium leading-[100%] font-calsans">
              Database Uji Kompetensi
            </h1>
            <p className="font-medium text-gray-400 text-base">
              Tambahkan data uji kompetensi yang ada di lembaga diklat mu!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-7.5">
        <TableDataUjiKompetensi />
      </div>
    </>
  );
};

export default UjiKompetensi;
