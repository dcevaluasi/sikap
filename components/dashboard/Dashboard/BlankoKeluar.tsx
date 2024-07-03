"use client";

import React from "react";
import TableDataPelatihan from "../Pelatihan/TableDataPelatihan";
import { TbSchool } from "react-icons/tb";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import TableDataBlanko from "../Pelatihan/TableDataBlanko";
import TableDataBlankoKeluar from "../Pelatihan/TableDataBlankoKeluar";

const BlankoKeluar: React.FC = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <RiVerifiedBadgeFill className="text-4xl" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium leading-[100%] font-calsans">
              Blanko Keluar Sertifikat AKP
            </h1>
            <p className="font-medium text-gray-400 text-base">
              Tambahkan data blanko yang telah digunakan untuk penerbitan
              sertifikat AKP di Pusat Pelatihan KP!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-7.5">
        <TableDataBlankoKeluar />
      </div>
    </>
  );
};

export default BlankoKeluar;
