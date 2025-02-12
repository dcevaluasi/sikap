"use client";

import React from "react";
import { TbSchool } from "react-icons/tb";
import TableDataUjian from "../Pelatihan/TableDataUjian";
import { HiMiniComputerDesktop } from "react-icons/hi2";

const UjianKeahlianAKP: React.FC = () => {
  return (
    <>
      <div className="mt-4 md:mt-6 2xl:mt-7.5 w-full">
        <TableDataUjian />
      </div>
    </>
  );
};

export default UjianKeahlianAKP;
