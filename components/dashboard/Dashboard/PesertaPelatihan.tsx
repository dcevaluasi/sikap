"use client";
import React from "react";
import CardDataStats from "../CardDataStats";
// import MapOne from "../Maps/MapOne";
import TableDataPelatihan from "../Pelatihan/TableDataPelatihan";
import TableDataPesertaPelatihan from "../Pelatihan/TableDataPesertaPelatihan";

const PesertaPelatihan: React.FC = () => {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl font-medium leading-[100%] font-calsans">
          Peserta Pelatihan
        </h1>
        <p className="font-medium text-gray-400 text-base">
          Verifikasi, Monitoring, dan Lihat Data Peserta Pelatihan!
        </p>
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-7.5">
        <TableDataPesertaPelatihan />
      </div>
    </>
  );
};

export default PesertaPelatihan;
