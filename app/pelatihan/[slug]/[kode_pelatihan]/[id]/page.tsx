"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

import { FaFilePdf, FaPlaceOfWorship, FaRupiahSign } from "react-icons/fa6";

import Footer from "@/components/ui/footer";
import { MdOutlineAppRegistration, MdVerified } from "react-icons/md";
import FormRegistrationTraining from "@/components/dashboard/users/formRegistrationTraining";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PelatihanMasyarakat } from "@/types/product";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { convertDate, extractLastSegment } from "@/utils";

function page() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const pathname = usePathname();
  const id = extractLastSegment(pathname);
  const token = Cookies.get("XSRF081");

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

  const router = useRouter();
  const [isOpenRegistrationCommand, setIsOpenRegistrationCommand] =
    React.useState(false);

  const handleRegistration = () => {
    if (Cookies.get("XSRF081")) {
      setIsRegistrasi(true);
    } else {
      setIsOpenRegistrationCommand(true);
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
          <AlertDialog open={isOpenRegistrationCommand}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Anda Belum Login</AlertDialogTitle>
                <AlertDialogDescription>
                  Untuk dapat melanjutkan proses pendaftaran
                  <span className="font-semibold">
                    {" "}
                    {pelatihan?.NamaPelatihan}
                  </span>{" "}
                  harap melakukan proses login terlebih dahulu sobat ELAUT!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={(e) => setIsOpenRegistrationCommand(false)}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    Cookies.set("XSRF085", pathname);
                    router.push("/login");
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

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
                  <div className="w-full h-fit relative">
                    <Image
                      className="w-full rounded-3xl h-[250px] md:h-[350px] object-cover"
                      alt=""
                      src={pelatihan?.FotoPelatihan}
                      width={0}
                      height={0}
                    />
                    <div className="flex w-full top-0 absolute h-[350px] bg-gradient-to-r opacity-40 from-blue-500 to-teal-400 bg-opacity-20 rounded-tl-3xl rounded-tr-3xl"></div>
                  </div>

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
                          onClick={(e) => handleRegistration()}
                          className="text-base font-medium px-4 py-3 hover:cursor-pointer items-center justify-center text-center flex gap-1 bg-blue-500 rounded-3xl text-white"
                        >
                          <MdOutlineAppRegistration /> Daftar Pelatihan
                        </button>

                        <div className="text-base font-medium px-4 py-3 hover:cursor-pointer items-center justify-center text-center flex gap-1 bg-teal-400 rounded-3xl text-white">
                          <FaFilePdf /> Unduh Silabus Pelatihan
                        </div>
                      </div>
                    </div>

                    {/* <Tab /> */}

                    <div
                      dangerouslySetInnerHTML={{
                        __html: pelatihan && pelatihan?.DetailPelatihan,
                      }}
                      className="w-full text-gray-600 text-justify mt-2 md:mt-9 text-base "
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
                    onClick={(e) => handleRegistration()}
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
                        <td className="text-gray-600">
                          <TbCalendarUser className="text-lg w-6" />
                        </td>
                        <td>
                          <p className="text-base text-gray-600">
                            <span className="font-semibold">
                              Tanggal Pelaksanaan :{" "}
                            </span>
                            {convertDate(pelatihan?.TanggalMulaiPelatihan)}{" "}
                            <span className="lowercase">s.d</span>{" "}
                            {convertDate(pelatihan?.TanggalBerakhirPelatihan)}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-gray-600">
                          <TbMap2 className="text-lg w-6" />
                        </td>
                        <td>
                          <p className="text-base text-gray-600 ">
                            <span className="font-semibold">
                              Lokasi Pelatihan :
                            </span>{" "}
                            {pelatihan.LokasiPelatihan}{" "}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-gray-600">
                          <TbBroadcast className="text-lg w-6" />
                        </td>
                        <td>
                          <p className="text-base text-gray-600 ">
                            <span className="font-semibold">
                              Pelaksanaan Pelatihan :{" "}
                            </span>
                            {pelatihan.PelaksanaanPelatihan}
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
