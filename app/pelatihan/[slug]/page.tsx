"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";
import { FiSearch, FiSlack } from "react-icons/fi";
import {
  TbBroadcast,
  TbBuildingBank,
  TbCalendarUser,
  TbClockHour2,
  TbCloudDownload,
  TbLink,
  TbMap2,
} from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import { Input } from "@/components/ui/input";
import { FaFilePdf, FaPlaceOfWorship, FaRupiahSign } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PELATIHAN } from "@/dummies/pelatihan";
import Footer from "@/components/ui/footer";
import { MdOutlineAppRegistration, MdVerified } from "react-icons/md";
import SertifikatPage1 from "@/components/sertifikat/sertifikatPage1";
import SertifikatPage2 from "@/components/sertifikat/sertifikatPage2";
import FormRegistrationTraining from "@/components/dashboard/users/formRegistrationTraining";
import { useSearchParams } from "next/navigation";
import { PelatihanMasyarakat } from "@/types/product";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

function page() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const params = useSearchParams();
  const id = params.get("XSRF084");

  const [data, setData] = React.useState<PelatihanMasyarakat[]>([]);

  const handleFetchingPublicTrainingDataById = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/lemdik/getPelatihan?id=${id}`
      );
      console.log({ response });
      setData(response.data.data);
    } catch (error) {
      console.error("Error posting training data:", error);
      throw error;
    }
  };

  const token = Cookies.get("XSRF081");

  const handleRegistrationTrainingForPeople = async () => {
    try {
      const response: AxiosResponse = await axios.post(
        `${baseUrl}/users/addPelatihan`,
        JSON.stringify({
          id_pelatihan: data[0]?.IdPelatihan,
        }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log({ response });
    } catch (error) {
      console.error({ error });
    }
  };

  React.useEffect(() => {
    handleFetchingPublicTrainingDataById();
  }, []);

  const [isRegistrasi, setIsRegistrasi] = React.useState(false);

  return (
    <section className="relative w-full mt-36">
      {data?.map((pelatihan, index) => (
        <div className="flex gap-2 max-w-6xl mx-auto px-5">
          <div className="w-full pb-5 md:pb-8 flex flex-col ">
            <h1 className="h2 text-4xl md:text-5xl mb-2 font-calsans leading-[100%] max-w-3xl">
              {pelatihan.NamaPelatihan}
            </h1>

            <div className="w-full flex gap-10">
              <div
                className={`flex flex-col w-full md:w-[70%] ${
                  isRegistrasi && "md:w-[100%]"
                }`}
              >
                <div className="relative w-full">
                  <Image
                    className="w-full rounded-3xl h-[250px] md:h-[350px] object-cover"
                    alt=""
                    src={pelatihan?.FotoPelatihan}
                    width={0}
                    height={0}
                  />
                  <div className="w-fit absolute top-4 right-4 flex gap-1">
                    <div className="text-sm font-medium px-4 py-3 bg-blue-500 rounded-3xl text-white">
                      {pelatihan?.HargaPelatihan == "0"
                        ? "Gratis"
                        : "Rp. " + pelatihan?.HargaPelatihan}
                    </div>
                    <div className="text-sm font-medium px-4 py-3 bg-blue-500 rounded-3xl text-white">
                      {pelatihan.BidangPelatihan}
                    </div>
                  </div>
                </div>

                {isRegistrasi ? (
                  <></>
                ) : (
                  <>
                    <div className="flex md:hidden flex-col gap-3 w-full my-3">
                      <div className="flex flex-col gap-1 ">
                        <table>
                          <tr>
                            <td className="text-gray-600">
                              <TbCalendarUser className="text-lg w-6" />
                            </td>
                            <td>
                              <p className="text-base text-gray-600 flex w-full items-center gap-1">
                                Tanggal Pelaksanaan :{" "}
                                {pelatihan?.TanggalMulaiPelatihan}
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-gray-600">
                              <TbMap2 className="text-lg w-6" />
                            </td>
                            <td>
                              <p className="text-base text-gray-600 flex w-full items-center gap-1">
                                Lokasi Pelatihan : {pelatihan?.LokasiPelatihan}
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-gray-600">
                              <TbBroadcast className="text-lg w-6" />
                            </td>
                            <td>
                              <p className="text-base text-gray-600 flex w-full items-center gap-1">
                                Pelaksanaan Pelatihan :{" "}
                                {pelatihan?.PelaksanaanPelatihan}
                              </p>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={(e) => setIsRegistrasi(true)}
                          className="text-base font-medium px-4 py-3 hover:cursor-pointer items-center justify-center text-center flex gap-1 bg-blue-500 rounded-3xl text-white"
                        >
                          <MdOutlineAppRegistration /> Daftar Pelatihan
                        </button>

                        <div className="text-base font-medium px-4 py-3 hover:cursor-pointer items-center justify-center text-center flex gap-1 bg-teal-400 rounded-3xl text-white">
                          <FaFilePdf /> Unduh Silabus Pelatihan
                        </div>
                      </div>
                    </div>

                    <p className="text-base text-gray-600 max-w-4xl mt-3 text-justify hidden md:flex">
                      Dapatkan keunggulan kompetitif dengan sertifikasi
                      masyarakat kelautan dan perikanan. Tingkatkan kredibilitas
                      dan peluang karier Anda dalam industri yang dinamis dan
                      berkelanjutan. Bergabunglah hari ini untuk langkah menuju
                      kesuksesan!
                    </p>

                    {/* <Tab /> */}

                    <div
                      dangerouslySetInnerHTML={{
                        __html: pelatihan && pelatihan?.DetailPelatihan,
                      }}
                      className="w-full text-gray-600 text-left mt-2 md:mt-9 text-base"
                    ></div>
                  </>
                )}
              </div>

              {/* {isRegistrasi && ( */}
              <div className="md:flex hidden flex-col gap-6 w-[30%]">
                <div className="flex flex-col gap-2 -mt-1">
                  <h1 className="text-black font-bold text-3xl font-calsans leading-[110%]">
                    Ikuti Pelatihan
                  </h1>
                  <p className="text-base text-gray-600 max-w-4xl -mt-3">
                    Segera daftarkan dirimu dan jadilah SDM Kelautan dan
                    Perikanan Unggul!
                  </p>
                  <div className="w-[100px] h-1 bg-blue-500 rounded-full"></div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={(e) => setIsRegistrasi(true)}
                    className="text-base font-medium px-4 py-3 hover:cursor-pointer items-center justify-center text-center flex gap-1 bg-blue-500 rounded-3xl text-white"
                  >
                    <MdOutlineAppRegistration /> Daftar Pelatihan
                  </button>

                  <div className="text-base font-medium px-4 py-3 hover:cursor-pointer items-center justify-center text-center flex gap-1 bg-teal-400 rounded-3xl text-white">
                    <FaFilePdf /> Unduh Silabus Pelatihan
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <table>
                      <tr>
                        {/* <td className="text-gray-600">
                 <TbCalendarUser className="text-lg w-6" />
               </td> */}
                        {/* <td>
                 <p className="text-base text-gray-600 flex w-full items-center gap-1">
                   Tanggal Pelaksanaan :{" "}
                   {PELATIHAN[3].TanggalPendaftaran}
                 </p>
               </td> */}
                      </tr>
                      <tr>
                        <td className="text-gray-600">
                          <TbMap2 className="text-lg w-6" />
                        </td>
                        <td>
                          <p className="text-base text-gray-600 flex w-full items-center gap-1">
                            Lokasi Pelatihan : {PELATIHAN[3].LokasiPelatihan}{" "}
                            (Balai Pelatihan Pengembangan dan Penyuluhan Tegal)
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-gray-600">
                          <TbBroadcast className="text-lg w-6" />
                        </td>
                        <td>
                          <p className="text-base text-gray-600 flex w-full items-center gap-1">
                            Pelaksanaan Pelatihan :{" "}
                            {PELATIHAN[3].PelaksanaanPelatihan}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                {!isRegistrasi && (
                  <div className="flex flex-col gap-2 mt-3">
                    <h1 className="text-black font-bold text-3xl font-calsans leading-[110%]">
                      Pelatihan Terbaru
                    </h1>
                    <p className="text-base text-gray-600 max-w-4xl -mt-3">
                      Lihat pelatihan terbaru serupa disini!
                    </p>
                    <div className="w-[100px] h-1 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>

            {isRegistrasi && (
              <FormRegistrationTraining id={pelatihan?.IdPelatihan} />
            )}
          </div>
        </div>
      ))}

      <div className="max-w-3xl mx-auto text-left pb-5 md:pb-8 flex flex-col"></div>

      <Footer />
    </section>
  );
}

export default page;
