"use client";

import React, { useState, useRef, useEffect, ReactElement } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdVerified } from "react-icons/md";
import { TbCloudDownload } from "react-icons/tb";
import { getCurrentDate } from "@/utils/sertifikat";
import html2pdf from "html2pdf.js";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

import Link from "next/link";
import { Button } from "./ui/button";
import { FiMaximize, FiMinimize, FiSearch, FiSlack } from "react-icons/fi";
import { Input } from "./ui/input";
import BPPPTrainings from "./bppp-trainings";
import { usePathname, useRouter } from "next/navigation";
import {
  addFiveYears,
  extractPathAfterBppp,
  getPenyeleggara,
} from "@/utils/pelatihan";
import { PelatihanMasyarakat } from "@/types/product";
import axios, { AxiosResponse } from "axios";
import { IoIosInformationCircle, IoMdCloseCircle } from "react-icons/io";
import { User, UserPelatihan } from "@/types/user";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Cookies from "js-cookie";
import TableDataPelatihan from "./dashboard/Pelatihan/TableDataPelatihan";
import TableDataPelatihanUser from "./dashboard/Pelatihan/TableDataPelatihanUser";
import { DialogSertifikatPelatihan } from "./sertifikat/dialogSertifikatPelatihan";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { createSlug, truncateText } from "@/utils";
import { Pelatihan } from "@/types/pelatihan";
import Logo from "./ui/logo";
import Toast from "./toast";
import { generateTanggalPelatihan } from "@/utils/text";
import { elautBaseUrl } from "@/constants/urls";
import Image from "next/image";
import { PiQuestionFill } from "react-icons/pi";

function UserTrainingService({ user }: { user: User | null }) {
  const [indexPelatihanSelected, setIndexPelatihanSelected] =
    React.useState<number>(100000000);

  const icons = (bidangPelatihan: string) => {
    switch (bidangPelatihan) {
      case "Pengolahan dan Pemasaran":
        return "/images/bidangPelatihan/pengolahan-pemasaran.png";
      case "Budidaya":
        return "/images/bidangPelatihan/budidaya.png";
      case "Penangkapan":
        return "/images/bidangPelatihan/penangkapan.png";
      case "Konservasi":
        return "/images/bidangPelatihan/konservasi.png";
      case "Mesin Perikanan":
        return "/images/bidangPelatihan/mesin-perikanan.png";
      case "Kepelautan":
        return "/images/bidangPelatihan/kepelautan.png";
      default:
        return "/images/bidangPelatihian/sd-perikanan.png";
    }
  };

  const pathname = usePathname();
  const location = extractPathAfterBppp(pathname);
  const penyelenggara = getPenyeleggara(location!);

  const [data, setData] = React.useState<PelatihanMasyarakat[]>([]);

  const handleFetchingPublicTrainingDataByPenyelenggara = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${elautBaseUrl}/lemdik/getPelatihan?penyelenggara_pelatihan=${penyelenggara}`
      );
      console.log({ response });
      setData(response.data.data);
    } catch (error) {
      console.error("Error posting training data:", error);
      throw error;
    }
  };

  const [isExpand, setIsExpand] = React.useState<boolean>(false);

  const [loading, setLoading] = React.useState<boolean>(true);

  const token = Cookies.get("XSRF081");

  const [userDetail, setUserDetail] = React.useState<User | null>(null);

  const handleFetchingUserDetail = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${elautBaseUrl}/users/getUsersById`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log({ response });
      setUserDetail(response.data);
    } catch (error) {
      console.error("Error posting training data:", error);
      throw error;
    }
  };

  const [selectedPelatihan, setSelectedPelatihan] =
    React.useState<PelatihanMasyarakat | null>(null);

  const handleFetchingDetailPelatihan = async (id: number) => {
    try {
      const response: AxiosResponse = await axios.get(
        `${elautBaseUrl}/getPelatihanUser?idPelatihan=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedPelatihan(response.data);
      console.log("SELECTED PELATIHAN : ", response);
    } catch (error) {
      console.error("Error posting training data:", error);
      throw error;
    }
  };

  const [codeAccess, setCodeAccess] = React.useState<string>("");
  const router = useRouter();

  const handleDirectToExam = async (e: any) => {
    if (codeAccess != "") {
      if (
        codeAccess != userDetail?.Pelatihan[indexPelatihanSelected]!.CodeAksess
      ) {
        Toast.fire({
          icon: "error",
          title: `Kode akses yang dimasukkan tidak terdaftar!`,
        });
        setCodeAccess("");
      } else {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/lemdik/AuthExam`,
            {
              code_akses: codeAccess,
              type_exam: "PreTest",
            }
          );

          if (response.status == 200) {
            if (Cookies.set("XSRF089999", response.data.t)) {
              Toast.fire({
                icon: "success",
                title: `Selamat mengerjakan pre-test mu dengan baik sobat ELAUT!`,
              });
              setCodeAccess("");
              router.replace(
                `layanan/pelatihan/${createSlug(
                  selectedPelatihan!.NamaPelatihan
                )}/${selectedPelatihan!.KodePelatihan!}/${selectedPelatihan!
                  .IdPelatihan!}/pre-test/${
                  userDetail!.Pelatihan[indexPelatihanSelected]!.CodeAksess
                }`
              );
            }
          }
        } catch (error) {
          Toast.fire({
            icon: "error",
            title: `Nampaknya terdapat kendala pada server, hubungi Call Center!`,
          });
          setCodeAccess("");
          console.log({ error });
        }
      }
    } else {
      Toast.fire({
        icon: "error",
        title: `Harap masukkan kode akses terlebih dahulu!`,
      });
      setCodeAccess("");
    }
  };

  const handleDirectToExamPostTest = async (e: any) => {
    if (codeAccess != "") {
      if (
        codeAccess != userDetail?.Pelatihan[indexPelatihanSelected]!.CodeAksess
      ) {
        Toast.fire({
          icon: "error",
          title: `Kode akses yang dimasukkan tidak terdaftar!`,
        });
        setCodeAccess("");
      } else {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/lemdik/AuthExam`,
            {
              code_akses: codeAccess,
              type_exam: "PostTest",
            }
          );

          if (response.status == 200) {
            if (Cookies.set("XSRF089999", response.data.t)) {
              Toast.fire({
                icon: "success",
                title: `Selamat mengerjakan post-test mu dengan baik sobat ELAUT!`,
              });
              setCodeAccess("");
              router.replace(
                `layanan/pelatihan/${createSlug(
                  selectedPelatihan!.NamaPelatihan
                )}/${selectedPelatihan!.KodePelatihan!}/${selectedPelatihan!
                  .IdPelatihan!}/post-test/${
                  userDetail!.Pelatihan[indexPelatihanSelected]!.CodeAksess
                }`
              );
            }
          }
        } catch (error) {
          Toast.fire({
            icon: "error",
            title: `Nampaknya terdapat kendala pada server, hubungi Call Center!`,
          });
          setCodeAccess("");
        }
      }
    } else {
      Toast.fire({
        icon: "error",
        title: `Harap masukkan kode akses terlebih dahulu!`,
      });
      setCodeAccess("");
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      handleFetchingUserDetail();
      handleFetchingPublicTrainingDataByPenyelenggara();
    }, 1000);
  }, []);

  const tabs = useRef<HTMLDivElement>(null);

  const [menuSelected, setMenuSelected] = React.useState(false);
  const [indexMenuSelected, setIndexMenuSelected] = React.useState(0);
  const handleSelectedMenu = (index: number) => {
    setMenuSelected(!menuSelected);
    setIndexMenuSelected(index);
  };

  const [typePelatihanSelected, setTypePelatihanSelected] =
    React.useState<string>("");

  const [isOpenGuideline, setIsOpenGuideline] = React.useState<boolean>(true);

  console.log(user?.Pelatihan);

  const [seeMore, setSeeMore] = React.useState<boolean>(false);

  return (
    <>
      <section className="relative h-fit pb-20 bg-white" id="explore">
        <div
          className="absolute inset-0 pointer-events-none mb-16 pb-10 h-full"
          aria-hidden="true"
        ></div>
        <div className="absolute left-0 right-0 m-auto w-px p-px h-28 bg-gray-200 transform -translate-y-1/2"></div>

        <div className="relative w-full mx-auto px-4 sm:px-6">
          <div className="pt-12 md:pt-20">
            {/* Section header */}

            {userDetail?.Pelatihan!.length != 0 ? (
              <>
                <div className="max-w-3xl mx-auto text-center flex items-center justify-center flex-col pb-5 md:pb-8">
                  <h1 className="text-3xl font-calsans leading-[110%] text-black">
                    Pelatihan Masyarakat, Teknis, <br /> dan Kepelatuan yang
                    Diikuti
                  </h1>
                  <p className="text-base text-gray-600">
                    Jelajahi layanan serta informasi yang ada pada Balai
                    Pelatihan Kelautan dan Perikanan dan jadilah SDM kompeten
                    bidang kelautan dan perikanan!
                  </p>
                  <div className="rounded-full bg-gray-300 h-1 w-20 mt-3"></div>
                </div>{" "}
                <div
                  className={`w-full ${
                    isExpand ? "w-full" : "max-w-7xl"
                  } mx-auto flex gap-5 mt-8`}
                >
                  <div
                    className={`gap-2  ${
                      indexPelatihanSelected != 100000000
                        ? isExpand
                          ? "hidden"
                          : "w-5/12 flex flex-col "
                        : "w-full flex flex-col "
                    }`}
                  >
                    <div className="relative w-full flex items-center border-gray-300 border px-2 rounded-xl">
                      <Button
                        type="button"
                        variant={"outline"}
                        className="flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-700 w-fit h-fit absolute right-1"
                      >
                        {" "}
                        <FiSearch className="text-white text-base" />
                      </Button>
                      <Input
                        className="text-sm border-none -ml-1 focus:border-none active:outline-none active:border-none focus:outline-none focus-visible:ring-0"
                        placeholder="Cari Pelatihan Yang Kamu Ikuti"
                      />
                    </div>
                    <Tabs defaultValue="Klasikal" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                          value="Klasikal"
                          onClick={() => setTypePelatihanSelected("Klasikal")}
                        >
                          Klasikal
                        </TabsTrigger>
                        <TabsTrigger
                          value="Online"
                          onClick={() => setTypePelatihanSelected("Online")}
                        >
                          Online
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="Klasikal">
                        {indexPelatihanSelected != 100000000 ? (
                          userDetail?.Pelatihan.map((pelatihan, index) => (
                            <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8  shadow-custom hover:scale-105 duration-700">
                              <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 via-blue-500 to-teal-400"></span>

                              <div className="sm:flex sm:justify-between sm:gap-4">
                                <div>
                                  <h3
                                    onClick={(e) => {
                                      setIndexPelatihanSelected(index);
                                      handleFetchingDetailPelatihan(
                                        pelatihan?.IdPelatihan
                                      );
                                    }}
                                    className="text-lg hover:cursor-pointer font-bold text-gray-900 sm:text-xl leading-[100%] "
                                  >
                                    {pelatihan?.NamaPelatihan}
                                  </h3>
                                </div>

                                <div className="hidden sm:block sm:shrink-0">
                                  <Image
                                    width={0}
                                    height={0}
                                    alt=""
                                    src={icons(pelatihan?.BidangPelatihan)}
                                    className="w-14 rounded-lg object-cover shadow-sm"
                                  />
                                </div>
                              </div>

                              <div className="mt-2 mb-2">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: truncateText(
                                      pelatihan?.DetailPelatihan,
                                      150,
                                      "..."
                                    ),
                                  }}
                                  className="text-sm font-normal group-hover:text-xs text-gray-500 group-hover:duration-1000 leading-[140%]"
                                />
                              </div>

                              <dl className="mt-6 flex gap-4 sm:gap-6">
                                <div className="flex flex-col-reverse">
                                  <dt className="text-sm font-medium text-gray-600">
                                    {pelatihan?.BidangPelatihan!}
                                  </dt>
                                  <dd className="text-xs text-gray-500">
                                    Bidang
                                  </dd>
                                </div>

                                <div className="flex flex-col-reverse">
                                  <dt className="text-sm font-medium text-gray-600">
                                    {pelatihan?.NoSertifikat == ""
                                      ? "-"
                                      : "No. B. " + pelatihan?.NoSertifikat!}
                                  </dt>
                                  <dd className="text-xs text-gray-500">
                                    No Sertifikat
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          ))
                        ) : (
                          <div className="grid grid-cols-3 w-full gap-4">
                            {userDetail?.Pelatihan.map((pelatihan, index) => (
                              <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8  shadow-custom hover:scale-105 duration-700">
                                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 via-blue-500 to-teal-400"></span>

                                <div className="sm:flex sm:justify-between sm:gap-4">
                                  <div>
                                    <h3
                                      onClick={(e) => {
                                        setIndexPelatihanSelected(index);
                                        handleFetchingDetailPelatihan(
                                          pelatihan?.IdPelatihan
                                        );
                                      }}
                                      className="text-lg hover:cursor-pointer font-bold text-gray-900 sm:text-xl leading-[100%] "
                                    >
                                      {pelatihan?.NamaPelatihan}
                                    </h3>
                                  </div>

                                  <div className="hidden sm:block sm:shrink-0">
                                    <Image
                                      width={0}
                                      height={0}
                                      alt=""
                                      src={icons(pelatihan?.BidangPelatihan)}
                                      className="w-14 rounded-lg object-cover shadow-sm"
                                    />
                                  </div>
                                </div>

                                <div className="mt-2 mb-2">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: truncateText(
                                        pelatihan?.DetailPelatihan,
                                        150,
                                        "..."
                                      ),
                                    }}
                                    className="text-sm font-normal group-hover:text-xs text-gray-500 group-hover:duration-1000 leading-[140%]"
                                  />
                                </div>

                                <dl className="mt-6 flex gap-4 sm:gap-6">
                                  <div className="flex flex-col-reverse">
                                    <dt className="text-sm font-medium text-gray-600">
                                      {pelatihan?.BidangPelatihan!}
                                    </dt>
                                    <dd className="text-xs text-gray-500">
                                      Bidang
                                    </dd>
                                  </div>

                                  <div className="flex flex-col-reverse">
                                    <dt className="text-sm font-medium text-gray-600">
                                      {pelatihan?.NoSertifikat == ""
                                        ? "-"
                                        : "No. B. " + pelatihan?.NoSertifikat!}
                                    </dt>
                                    <dd className="text-xs text-gray-500">
                                      No Sertifikat
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            ))}
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="Online">
                        {indexPelatihanSelected != 100000000 ? (
                          userDetail?.Pelatihan.map((pelatihan, index) => (
                            <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8  shadow-custom hover:scale-105 duration-700">
                              <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 via-blue-500 to-teal-400"></span>

                              <div className="sm:flex sm:justify-between sm:gap-4">
                                <div>
                                  <h3
                                    onClick={(e) => {
                                      setIndexPelatihanSelected(index);
                                      handleFetchingDetailPelatihan(
                                        pelatihan?.IdPelatihan
                                      );
                                    }}
                                    className="text-lg hover:cursor-pointer font-bold text-gray-900 sm:text-xl leading-[100%] "
                                  >
                                    {pelatihan?.NamaPelatihan}
                                  </h3>
                                </div>

                                <div className="hidden sm:block sm:shrink-0">
                                  <Image
                                    width={0}
                                    height={0}
                                    alt=""
                                    src={icons(pelatihan?.BidangPelatihan)}
                                    className="w-14 rounded-lg object-cover shadow-sm"
                                  />
                                </div>
                              </div>

                              <div className="mt-2 mb-2">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: truncateText(
                                      pelatihan?.DetailPelatihan,
                                      150,
                                      "..."
                                    ),
                                  }}
                                  className="text-sm font-normal group-hover:text-xs text-gray-500 group-hover:duration-1000 leading-[140%]"
                                />
                              </div>

                              <dl className="mt-6 flex gap-4 sm:gap-6">
                                <div className="flex flex-col-reverse">
                                  <dt className="text-sm font-medium text-gray-600">
                                    {pelatihan?.BidangPelatihan!}
                                  </dt>
                                  <dd className="text-xs text-gray-500">
                                    Bidang
                                  </dd>
                                </div>

                                <div className="flex flex-col-reverse">
                                  <dt className="text-sm font-medium text-gray-600">
                                    {pelatihan?.NoSertifikat == ""
                                      ? "-"
                                      : "No. B. " + pelatihan?.NoSertifikat!}
                                  </dt>
                                  <dd className="text-xs text-gray-500">
                                    No Sertifikat
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          ))
                        ) : (
                          <div className="grid grid-cols-3 w-full gap-4">
                            {userDetail?.Pelatihan.map((pelatihan, index) => (
                              <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8  shadow-custom hover:scale-105 duration-700">
                                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 via-blue-500 to-teal-400"></span>

                                <div className="sm:flex sm:justify-between sm:gap-4">
                                  <div>
                                    <h3
                                      onClick={(e) => {
                                        setIndexPelatihanSelected(index);
                                        handleFetchingDetailPelatihan(
                                          pelatihan?.IdPelatihan
                                        );
                                      }}
                                      className="text-lg hover:cursor-pointer font-bold text-gray-900 sm:text-xl leading-[100%] "
                                    >
                                      {pelatihan?.NamaPelatihan}
                                    </h3>
                                  </div>

                                  <div className="hidden sm:block sm:shrink-0">
                                    <Image
                                      width={0}
                                      height={0}
                                      alt=""
                                      src={icons(pelatihan?.BidangPelatihan)}
                                      className="w-14 rounded-lg object-cover shadow-sm"
                                    />
                                  </div>
                                </div>

                                <div className="mt-2 mb-2">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: truncateText(
                                        pelatihan?.DetailPelatihan,
                                        150,
                                        "..."
                                      ),
                                    }}
                                    className="text-sm font-normal group-hover:text-xs text-gray-500 group-hover:duration-1000 leading-[140%]"
                                  />
                                </div>

                                <dl className="mt-6 flex gap-4 sm:gap-6">
                                  <div className="flex flex-col-reverse">
                                    <dt className="text-sm font-medium text-gray-600">
                                      {pelatihan?.BidangPelatihan!}
                                    </dt>
                                    <dd className="text-xs text-gray-500">
                                      Bidang
                                    </dd>
                                  </div>

                                  <div className="flex flex-col-reverse">
                                    <dt className="text-sm font-medium text-gray-600">
                                      {pelatihan?.NoSertifikat == ""
                                        ? "-"
                                        : "No. B. " + pelatihan?.NoSertifikat!}
                                    </dt>
                                    <dd className="text-xs text-gray-500">
                                      No Sertifikat
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            ))}
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>

                  {indexPelatihanSelected != 100000000 && (
                    <div
                      className={` items-start justify-center ${
                        isExpand ? "w-12/12" : "w-7/12 flex"
                      }`}
                    >
                      <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:px-6 lg:py-0">
                        <div className="sm:flex justify-between sm:gap-4 items-center border-b-2 border-b-gray-200 pb-4">
                          <div className="">
                            <h3 className="text-3xl font-bold text-gray-900 font-calsans sm:text-3xl leading-[105%]">
                              {
                                userDetail?.Pelatihan[indexPelatihanSelected]
                                  ?.NamaPelatihan!
                              }
                            </h3>

                            <div className="flex items-center gap-3">
                              <p className=" text-sm font-medium text-gray-600">
                                By{" "}
                                {selectedPelatihan != null
                                  ? selectedPelatihan.PenyelenggaraPelatihan
                                  : "-"}{" "}
                                ·{" "}
                                {selectedPelatihan != null
                                  ? generateTanggalPelatihan(
                                      selectedPelatihan?.TanggalMulaiPelatihan
                                    )
                                  : "-"}{" "}
                                s.d.{" "}
                                {selectedPelatihan != null
                                  ? generateTanggalPelatihan(
                                      selectedPelatihan?.TanggalBerakhirPelatihan
                                    )
                                  : "-"}
                              </p>
                              <div
                                className="cursor-pointer"
                                onClick={(e) => setIsExpand(!isExpand)}
                              >
                                {isExpand ? (
                                  <FiMinimize className="text-base" />
                                ) : (
                                  <FiMaximize className="text-base" />
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="hidden sm:block sm:shrink-0">
                            <Image
                              width={0}
                              height={0}
                              alt=""
                              src={icons(
                                userDetail?.Pelatihan[indexPelatihanSelected]
                                  ?.BidangPelatihan!
                              )}
                              className="w-16 rounded-lg object-cover shadow-sm"
                            />
                          </div>
                        </div>

                        {userDetail?.Pelatihan[indexPelatihanSelected]
                          ?.Keterangan! == "Valid" && (
                          <div className="mt-6 flex gap-4 sm:gap-6">
                            <div className="flex flex-col-reverse">
                              <div className="text-sm font-medium text-gray-600">
                                {
                                  userDetail?.Pelatihan[indexPelatihanSelected]
                                    ?.BidangPelatihan!
                                }
                              </div>
                              <div className="text-xs text-gray-500">
                                Bidang
                              </div>
                            </div>

                            <div className="flex flex-col-reverse">
                              <div className="text-sm font-bold text-gray-600">
                                {userDetail?.Pelatihan[indexPelatihanSelected]
                                  .NoSertifikat! == ""
                                  ? "-"
                                  : userDetail?.Pelatihan[
                                      indexPelatihanSelected
                                    ]?.NoSertifikat!}
                              </div>
                              <div className="text-xs text-gray-500">
                                No Sertifikat
                              </div>
                            </div>
                            <div className="flex flex-col-reverse">
                              <div className="text-sm font-bold text-gray-600">
                                {userDetail?.Pelatihan[indexPelatihanSelected]
                                  .NoRegistrasi! == ""
                                  ? "-"
                                  : userDetail?.Pelatihan[
                                      indexPelatihanSelected
                                    ]?.NoRegistrasi!}
                              </div>
                              <div className="text-xs text-gray-500">
                                No Registrasi
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="mt-3">
                          <div className="flex flex-col-reverse">
                            <div
                              className={`text-sm font-medium text-gray-600 ${
                                userDetail?.Pelatihan[indexPelatihanSelected]
                                  ?.Keterangan! == "Tidak Valid"
                                  ? "text-rose-500"
                                  : userDetail?.Pelatihan[
                                      indexPelatihanSelected
                                    ]?.Keterangan! == "Valid"
                                  ? "text-green-500"
                                  : "text-gray-700"
                              }`}
                            >
                              {userDetail?.Pelatihan[indexPelatihanSelected]
                                ?.Keterangan! == "Tidak Valid" ? (
                                <span className="flex items-center">
                                  <IoMdCloseCircle />

                                  {
                                    userDetail?.Pelatihan[
                                      indexPelatihanSelected
                                    ]?.StatusPembayaran!
                                  }
                                </span>
                              ) : userDetail?.Pelatihan[indexPelatihanSelected]
                                  ?.Keterangan! == "Valid" ? (
                                <span className="flex items-center">
                                  <RiVerifiedBadgeFill />
                                  Data pendaftaran anda valid
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  <PiQuestionFill />
                                  Data belum divalidasi operator
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              Status Peserta
                            </div>
                          </div>
                        </div>

                        {userDetail?.Pelatihan[indexPelatihanSelected]
                          ?.Keterangan! == "Valid" && (
                          <div className="mt-4">
                            <p className="text-pretty text-sm text-gray-500"></p>
                            <div className="flex gap-1 flex-col">
                              <p
                                dangerouslySetInnerHTML={{
                                  __html:
                                    userDetail?.Pelatihan[
                                      indexPelatihanSelected
                                    ]! && !seeMore
                                      ? truncateText(
                                          userDetail?.Pelatihan[
                                            indexPelatihanSelected
                                          ]?.DetailPelatihan!,
                                          300,
                                          "..."
                                        )
                                      : userDetail?.Pelatihan[
                                          indexPelatihanSelected
                                        ]?.DetailPelatihan!,
                                }}
                                className="text-sm prose   text-justify group-hover:text-xs text-gray-500 prose-strong:text-gray-500 prose-p:leading-[140%] prose-strong:font-bold group-hover:duration-1000"
                              />{" "}
                              <p
                                onClick={(e) => setSeeMore(!seeMore)}
                                className="text-blue-500 text-sm cursor-pointer"
                              >
                                {seeMore
                                  ? "Baca lebih sedikit"
                                  : "Baca lebih lengkap"}
                              </p>
                            </div>
                          </div>
                        )}

                        {typePelatihanSelected == "Online" && (
                          <div className="mt-3">
                            <div className="flex flex-col">
                              <div className="text-xs text-gray-500">
                                Materi Pelatihan
                              </div>

                              <div className="grid grid-cols-2 w-full gap-2 mt-2">
                                {[1, 2, 3, 4, 5, 6].map((pelatihan, index) => (
                                  <Link
                                    href={`/dashboard/pelatihan/online/${
                                      userDetail?.Pelatihan[
                                        indexPelatihanSelected
                                      ]!.IdPelatihan
                                    }`}
                                    className="flex shadow-custom w-full rounded-md p-5 cursor-pointer flex-col gap-1 hover:scale-105 duration-700 hover:bg-blue-500 hover:text-white group"
                                  >
                                    <h3 className="font-bold font-calsans leading-[105%]">
                                      Materi {pelatihan}. <br />
                                      Kebijakan Pelatihan Sosial Kultural II
                                    </h3>
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: truncateText(
                                          userDetail?.Pelatihan[
                                            indexPelatihanSelected
                                          ]?.DetailPelatihan!,
                                          100,
                                          "..."
                                        ),
                                      }}
                                      className="text-sm prose group-hover:text-white  text-justify  text-gray-500 prose-strong:text-gray-500 prose-p:leading-[140%] prose-strong:font-bold group-hover:duration-1000 prose-p:font-normal"
                                    />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {userDetail?.Pelatihan[indexPelatihanSelected]
                          ?.Keterangan! == "Valid" && (
                          <>
                            <div className="mt-3">
                              <div className="flex flex-col-reverse">
                                <div
                                  className={`text-sm font-medium text-gray-600 `}
                                >
                                  {userDetail?.Pelatihan[indexPelatihanSelected]
                                    ?.CodeAksess! ? (
                                    <span className="flex items-center">
                                      {
                                        userDetail?.Pelatihan[
                                          indexPelatihanSelected
                                        ]?.CodeAksess!
                                      }{" "}
                                      |{" "}
                                      <AlertDialog>
                                        <AlertDialogTrigger>
                                          <div className="underline text-blue-500 ml-1">
                                            Link Ujian Pre-Test
                                          </div>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="flex flex-col items-center justify-center !w-[420px]">
                                          <AlertDialogHeader>
                                            <AlertDialogTitle className="w-full flex gap-2 items-center justify-center flex-col">
                                              <div className="w-28 h-28 rounded-full bg-gradient-to-b from-gray-200 via-whiter to-white flex items-center justify-center">
                                                <div className="w-20 h-20 rounded-full  bg-gradient-to-b from-gray-300 via-whiter to-white flex items-center justify-center ">
                                                  <Logo />
                                                </div>
                                              </div>

                                              <div className="flex flex-col gap-1 w-full justify-center items-center">
                                                {userDetail!.Pelatihan[
                                                  indexPelatihanSelected
                                                ]!.PreTest == 0 && (
                                                  <h1 className="font-bold text-2xl text-center leading-[100%]">
                                                    {selectedPelatihan! &&
                                                      selectedPelatihan!
                                                        .NamaPelatihan}
                                                  </h1>
                                                )}

                                                {userDetail!.Pelatihan[
                                                  indexPelatihanSelected
                                                ]!.PreTest == 0 && (
                                                  <>
                                                    {" "}
                                                    <AlertDialogDescription className="w-full text-center font-normal text-sm mt-2 border-b border-b-gray-300 pb-3">
                                                      Sebagai bagian dari
                                                      pelaksanaan pelatihan agar
                                                      dapat mengetahui kemampuan
                                                      peserta diawal harap untuk
                                                      mengikuti{" "}
                                                      <span className="italic">
                                                        pre-test
                                                      </span>{" "}
                                                      dan{" "}
                                                      {isOpenGuideline
                                                        ? "membaca petunjuk pengerjaan"
                                                        : "memasukkan kode akses"}{" "}
                                                      terlebih dahulu
                                                    </AlertDialogDescription>
                                                    {isOpenGuideline ? (
                                                      <AlertDialogDescription className="w-full text-left font-normal text-sm mt-2">
                                                        <span className="font-semibold text-[#000]">
                                                          Petunjuk Pengerjaan :{" "}
                                                        </span>
                                                        <br />
                                                        <span>
                                                          {" "}
                                                          1.Pilih salah satu
                                                          jawaban yang Saudara
                                                          anggap paling
                                                          tepat/benar!
                                                        </span>{" "}
                                                        <br />
                                                        <span>
                                                          {" "}
                                                          2. Dalam menjawab
                                                          soal, gunakan gadget
                                                          yang mumpuni!
                                                        </span>{" "}
                                                        <br />
                                                        <span>
                                                          {" "}
                                                          3. Waktu yang
                                                          disediakan untuk
                                                          mengerjakan soal
                                                          adalah 15 menit!
                                                        </span>{" "}
                                                        <br />
                                                        <span>
                                                          {" "}
                                                          4. Tidak diperbolehkan
                                                          membuka buku,
                                                          handphone dll!
                                                        </span>
                                                      </AlertDialogDescription>
                                                    ) : (
                                                      <fieldset className="w-full">
                                                        <Input
                                                          className="w-full font-normal mt-2 text-sm"
                                                          placeholder="Masukkan kode akses "
                                                          value={codeAccess}
                                                          onChange={(e) =>
                                                            setCodeAccess(
                                                              e.target.value
                                                            )
                                                          }
                                                          type="text"
                                                        />
                                                      </fieldset>
                                                    )}
                                                  </>
                                                )}
                                              </div>
                                            </AlertDialogTitle>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter className="w-full">
                                            {userDetail!.Pelatihan[
                                              indexPelatihanSelected
                                            ]!.PreTest == 0 ? (
                                              <div className="flex-col flex w-full gap-2">
                                                {isOpenGuideline ? (
                                                  <Button
                                                    className="py-5 bg-blue-500 hover:bg-blue-500"
                                                    onClick={(e) =>
                                                      setIsOpenGuideline(
                                                        !isOpenGuideline
                                                      )
                                                    }
                                                  >
                                                    Lanjut
                                                  </Button>
                                                ) : (
                                                  <AlertDialogAction
                                                    className="py-5"
                                                    disabled={
                                                      codeAccess == ""
                                                        ? true
                                                        : false
                                                    }
                                                    onClick={(e) =>
                                                      handleDirectToExam(e)
                                                    }
                                                  >
                                                    Mulai Pre Test
                                                  </AlertDialogAction>
                                                )}

                                                <AlertDialogCancel className="py-5">
                                                  Close
                                                </AlertDialogCancel>
                                              </div>
                                            ) : (
                                              <div className="flex-col flex w-full gap-2">
                                                <p className=" text-center font-normal text-gray-500 -mt-2">
                                                  Maaf kamu telah mengikuti
                                                  ujian ini, kamu tidak memiliki
                                                  akses lagi terkait ujian ini
                                                </p>
                                                <AlertDialogCancel className="py-5">
                                                  Close
                                                </AlertDialogCancel>
                                              </div>
                                            )}
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>{" "}
                                      |{" "}
                                      <AlertDialog>
                                        <AlertDialogTrigger>
                                          <div className="underline text-blue-500 ml-1">
                                            Link Ujian Post-Test
                                          </div>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="flex flex-col items-center justify-center !w-[420px]">
                                          <AlertDialogHeader>
                                            <AlertDialogTitle className="w-full flex gap-2 items-center justify-center flex-col">
                                              <div className="w-28 h-28 rounded-full bg-gradient-to-b from-gray-200 via-whiter to-white flex items-center justify-center">
                                                <div className="w-20 h-20 rounded-full  bg-gradient-to-b from-gray-300 via-whiter to-white flex items-center justify-center ">
                                                  <Logo />
                                                </div>
                                              </div>

                                              <div className="flex flex-col gap-1 w-full justify-center items-center">
                                                {userDetail!.Pelatihan[
                                                  indexPelatihanSelected
                                                ]!.PostTest == 0 && (
                                                  <h1 className="font-bold text-2xl text-center leading-[100%]">
                                                    {selectedPelatihan! &&
                                                      selectedPelatihan!
                                                        .NamaPelatihan}
                                                  </h1>
                                                )}

                                                {userDetail!.Pelatihan[
                                                  indexPelatihanSelected
                                                ]!.PostTest == 0 && (
                                                  <>
                                                    {" "}
                                                    <AlertDialogDescription className="w-full text-center font-normal text-sm mt-2 border-b border-b-gray-300 pb-3">
                                                      Sebagai bagian dari
                                                      pelaksanaan pelatihan agar
                                                      dapat mengetahui kemampuan
                                                      peserta diawal harap untuk
                                                      mengikuti{" "}
                                                      <span className="italic">
                                                        post-test
                                                      </span>{" "}
                                                      dan{" "}
                                                      {isOpenGuideline
                                                        ? "membaca petunjuk pengerjaan"
                                                        : "memasukkan kode akses"}{" "}
                                                      terlebih dahulu
                                                    </AlertDialogDescription>
                                                    {isOpenGuideline ? (
                                                      <AlertDialogDescription className="w-full text-left font-normal text-sm mt-2">
                                                        <span className="font-semibold text-[#000]">
                                                          Petunjuk Pengerjaan :{" "}
                                                        </span>
                                                        <br />
                                                        <span>
                                                          {" "}
                                                          1.Pilih salah satu
                                                          jawaban yang Saudara
                                                          anggap paling
                                                          tepat/benar!
                                                        </span>{" "}
                                                        <br />
                                                        <span>
                                                          {" "}
                                                          2. Dalam menjawab
                                                          soal, gunakan gadget
                                                          yang mumpuni!
                                                        </span>{" "}
                                                        <br />
                                                        <span>
                                                          {" "}
                                                          3. Waktu yang
                                                          disediakan untuk
                                                          mengerjakan soal
                                                          adalah 15 menit!
                                                        </span>{" "}
                                                        <br />
                                                        <span>
                                                          {" "}
                                                          4. Tidak diperbolehkan
                                                          membuka buku,
                                                          handphone dll!
                                                        </span>
                                                      </AlertDialogDescription>
                                                    ) : (
                                                      <fieldset className="w-full">
                                                        <Input
                                                          className="w-full font-normal mt-2 text-sm"
                                                          placeholder="Masukkan kode akses "
                                                          value={codeAccess}
                                                          onChange={(e) =>
                                                            setCodeAccess(
                                                              e.target.value
                                                            )
                                                          }
                                                          type="text"
                                                        />
                                                      </fieldset>
                                                    )}
                                                  </>
                                                )}
                                              </div>
                                            </AlertDialogTitle>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter className="w-full">
                                            {userDetail!.Pelatihan[
                                              indexPelatihanSelected
                                            ]!.PostTest == 0 ? (
                                              <div className="flex-col flex w-full gap-2">
                                                {isOpenGuideline ? (
                                                  <Button
                                                    className="py-5 bg-blue-500 hover:bg-blue-500"
                                                    onClick={(e) =>
                                                      setIsOpenGuideline(
                                                        !isOpenGuideline
                                                      )
                                                    }
                                                  >
                                                    Lanjut
                                                  </Button>
                                                ) : (
                                                  <AlertDialogAction
                                                    className="py-5"
                                                    disabled={
                                                      codeAccess == ""
                                                        ? true
                                                        : false
                                                    }
                                                    onClick={(e) =>
                                                      handleDirectToExamPostTest(
                                                        e
                                                      )
                                                    }
                                                  >
                                                    Mulai Post Test
                                                  </AlertDialogAction>
                                                )}

                                                <AlertDialogCancel className="py-5">
                                                  Close
                                                </AlertDialogCancel>
                                              </div>
                                            ) : (
                                              <div className="flex-col flex w-full gap-2">
                                                <p className=" text-center font-normal text-gray-500 -mt-2">
                                                  Maaf kamu telah mengikuti
                                                  ujian ini, kamu tidak memiliki
                                                  akses lagi terkait ujian ini
                                                </p>
                                                <AlertDialogCancel className="py-5">
                                                  Close
                                                </AlertDialogCancel>
                                              </div>
                                            )}
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </span>
                                  ) : (
                                    <span className="flex items-center">-</span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Kode Ujian & Link Ujian
                                </div>
                              </div>
                            </div>

                            {userDetail?.Pelatihan[indexPelatihanSelected]
                              ?.PostTest != 0 && (
                              <div className="flex flex-col mt-0">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                    <dd className="text-xs text-gray-500 mb-2">
                                      Table Penilaian
                                    </dd>
                                    <div className="overflow-hidden">
                                      <table className="min-w-full border border-neutral-200 rounded-md text-center text-sm font-light text-surface mb-5 ">
                                        <thead className="border-b border-neutral-200 font-medium ">
                                          <tr>
                                            <th
                                              scope="col"
                                              className="border-e border-neutral-200 px-6 py-4 "
                                            >
                                              #
                                            </th>
                                            <th
                                              scope="col"
                                              className="border-e border-neutral-200 px-6 py-4 "
                                            >
                                              Pre-test
                                            </th>
                                            <th
                                              scope="col"
                                              className="border-e border-neutral-200 px-6 py-4 "
                                            >
                                              Post-test
                                            </th>
                                            <th
                                              scope="col"
                                              className="px-6 py-4"
                                            >
                                              Total
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr className="border-b border-neutral-200 ">
                                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium ">
                                              1
                                            </td>
                                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 ">
                                              {
                                                userDetail?.Pelatihan[
                                                  indexPelatihanSelected
                                                ]?.PreTest!
                                              }
                                            </td>
                                            <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 ">
                                              {
                                                userDetail?.Pelatihan[
                                                  indexPelatihanSelected
                                                ]?.PostTest!
                                              }
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                              {" "}
                                              {(userDetail?.Pelatihan[
                                                indexPelatihanSelected
                                              ]?.PreTest! +
                                                userDetail?.Pelatihan[
                                                  indexPelatihanSelected
                                                ]?.PostTest!) /
                                                2}
                                            </td>
                                          </tr>

                                          <tr className="border-b border-neutral-200 ">
                                            <th
                                              colSpan={3}
                                              className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 "
                                            >
                                              Keterangan
                                            </th>
                                            <th className="whitespace-nowrap px-6 py-4">
                                              {" "}
                                              {userDetail?.Pelatihan[
                                                indexPelatihanSelected
                                              ]?.PostTest! > 60
                                                ? "LULUS"
                                                : "TIDAK LULUS"}
                                            </th>
                                          </tr>
                                        </tbody>
                                      </table>

                                      {userDetail?.Pelatihan[
                                        indexPelatihanSelected
                                      ].NoSertifikat == "" ? null : (
                                        <div>
                                          <DialogSertifikatPelatihan
                                            userPelatihan={
                                              userDetail?.Pelatihan[
                                                indexPelatihanSelected
                                              ]!
                                            }
                                            pelatihan={selectedPelatihan!}
                                          >
                                            <Button
                                              type="button"
                                              variant="outline"
                                              className="w-full border flex gap-2 border-blue-600 text-left capitalize items-center justify-center"
                                            >
                                              <RiVerifiedBadgeFill className="h-4 w-4 text-blue-600" />{" "}
                                              <span className="text-sm">
                                                {" "}
                                                Lihat Sertifikat
                                              </span>
                                            </Button>
                                          </DialogSertifikatPelatihan>
                                          {/* <div className="text-xs text-gray-500 mb-2 mt-1">
                                            *Sertifikat ini terbit pada{" "}
                                            {
                                              userDetail?.Pelatihan[
                                                indexPelatihanSelected
                                              ]?.IsActice!
                                            }{" "}
                                            dan akan kadaluarsa pada{" "}
                                            {addFiveYears(
                                              userDetail?.Pelatihan[
                                                indexPelatihanSelected
                                              ]?.IsActice!
                                            )}
                                          </div> */}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="relative max-w-6xl w-full mx-auto px-4 sm:px-6">
                <div className="pt-12 md:pt-20 flex flex-col items-center">
                  <Image
                    src={"/illustrations/not-found.png"}
                    alt="Not Found"
                    width={0}
                    height={0}
                    className="w-[400px]"
                  />
                  <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8 -mt-2">
                    <h1 className="text-3xl font-calsans leading-[110%] text-black">
                      Belum Ada Pelatihan
                    </h1>
                    <div className="text-gray-600 text-center  max-w-md">
                      Kamu belum mengikuti pelatihan apapun, ayo cari pelatihan
                      menarik di E-LAUT dan jadilah SDM unggul untuk Indonesia!{" "}
                      <Link
                        href="/"
                        className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                      >
                        Cari Pelatihan
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default UserTrainingService;
