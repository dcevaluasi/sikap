"use client";

import React from "react";
import { TbDatabase } from "react-icons/tb";
import TableDataBankSoalUjianKeahlian from "./TableDataBankSoalUjianKeahlian";
import { usePathname } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { dpkakpBaseUrl } from "@/constants/urls";
import {
  getIdUjianKeahlianInBankSoal,
  getIdUjianKeahlianInBankSoal2,
} from "@/components/utils/dpkakp/pathname";
import Cookies from "js-cookie";

const BankSoalUjianKeahlian: React.FC = () => {
  const [data, setData] = React.useState<TypeUjian | null>(null);
  const pathname = usePathname();
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const handleFetchingTypeUjian = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getTypeUjian?id=${getIdUjianKeahlianInBankSoal2(
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

  const [dataBagian, setDataBagian] = React.useState<Bagian | null>(null);
  const handleFetchingBagianUjian = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getBagian?id=${getIdUjianKeahlianInBankSoal(
          pathname!
        )}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      console.log(response);
      setDataBagian(response.data.data[0]!);
    } catch (error) {
      console.error("Error posting tipe ujian:", error);
      setIsFetching(false);
      throw error;
    }
  };

  const [dataFungsi, setDataFungsi] = React.useState<FungsiUjian | null>(null);
  const handleFetchingFungsiUjian = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getFungsi?id=${dataBagian?.IdFungsi}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      console.log(response);
      setDataFungsi(response.data.data[0]!);
    } catch (error) {
      console.error("Error posting tipe ujian:", error);
      setIsFetching(false);
      throw error;
    }
  };

  React.useEffect(() => {
    handleFetchingTypeUjian();
    handleFetchingBagianUjian();
    handleFetchingFungsiUjian();
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <TbDatabase className="text-4xl" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium leading-[100%] font-calsans">
              Bank Soal {data?.NamaTypeUjian} {dataFungsi?.NamaFungsi}{" "}
              {dataBagian?.NamaBagian}
            </h1>
            <p className="font-medium text-gray-400 text-base">
              Upload Bank Soal Untuk Pelaksanaan Ujian Keahlian Awak Kapal
              Perikanan Yang Diselenggarakan!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-7.5">
        <TableDataBankSoalUjianKeahlian />
      </div>
    </>
  );
};

export default BankSoalUjianKeahlian;
