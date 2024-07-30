"use client";

import React from "react";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import TableDataTipeUjianKeahlian from "./TableDataTipeUjianKeahlian";
import axios, { AxiosResponse } from "axios";
import { dpkakpBaseUrl } from "@/constants/urls";
import { getIdUjianKeahlianInBankSoal } from "@/components/utils/dpkakp/pathname";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

const TipeUjianKeahlian: React.FC = () => {
  const [data, setData] = React.useState<TypeUjian | null>(null);
  const pathname = usePathname();
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const handleFetchingTypeUjian = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getTypeUjian?id=${getIdUjianKeahlianInBankSoal(
          pathname!
        )}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      console.log(response);
      setData(response.data.data[0]!);
    } catch (error) {
      console.error("Error posting tipe ujian:", error);
      setIsFetching(false);
      throw error;
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <HiMiniComputerDesktop className="text-4xl" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium leading-[100%] font-calsans">
              Bank Soal Ujian Keahlian
            </h1>
            <p className="font-medium text-gray-400 text-base">
              Tambahkan bank ujian keahlian awak kapal perikanan!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-7.5">
        <TableDataTipeUjianKeahlian />
      </div>
    </>
  );
};

export default TipeUjianKeahlian;
