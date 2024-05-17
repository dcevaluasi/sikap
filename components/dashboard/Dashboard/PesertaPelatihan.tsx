"use client";
import React from "react";
import CardDataStats from "../CardDataStats";
// import MapOne from "../Maps/MapOne";
import TableDataPelatihan from "../Pelatihan/TableDataPelatihan";
import TableDataPesertaPelatihan from "../Pelatihan/TableDataPesertaPelatihan";
import { HiUserGroup } from "react-icons/hi2";
import { useSearchParams } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { PelatihanMasyarakat } from "@/types/product";

const PesertaPelatihan: React.FC = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const params = useSearchParams();
  const id = params.get("XSRF084");

  const [data, setData] = React.useState<PelatihanMasyarakat[]>([]);
  const handleFetchingPublicTrainingDataById = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/getPelatihanUser?idPelatihan=${id}`
      );
      console.log({ response });
      setData(response.data.data);
    } catch (error) {
      console.error("Error posting training data:", error);
      throw error;
    }
  };
  React.useEffect(() => {
    handleFetchingPublicTrainingDataById();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <HiUserGroup className="text-4xl" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium leading-[100%] font-calsans">
              Peserta Pelatihan
            </h1>
            <p className="font-medium text-gray-400 text-base">
              Verifikasi, Monitoring, dan Lihat Data Peserta Pelatihan!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-7.5">
        <TableDataPesertaPelatihan />
      </div>
    </>
  );
};

export default PesertaPelatihan;
