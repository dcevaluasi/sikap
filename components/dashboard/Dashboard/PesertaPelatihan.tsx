"use client";
import React from "react";
import TableDataPesertaPelatihan from "../Pelatihan/TableDataPesertaPelatihan";
import { HiUserGroup } from "react-icons/hi2";
import { usePathname, useSearchParams } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { Pelatihan, PelatihanMasyarakat, UserPelatihan } from "@/types/product";
import { extractLastSegment } from "@/utils";

const PesertaPelatihan: React.FC = () => {
  return (
    <>
      <div className="mt-4 md:mt-6 2xl:mt-7.5">
        <TableDataPesertaPelatihan />
      </div>
    </>
  );
};

export default PesertaPelatihan;
