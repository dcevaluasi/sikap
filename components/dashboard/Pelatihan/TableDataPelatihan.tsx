import React, { ReactElement, useState } from "react";
import TableData from "../Tables/TableData";
import {
  RiInformationFill,
  RiRadioButtonLine,
  RiShipLine,
  RiVerifiedBadgeFill,
} from "react-icons/ri";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Edit3Icon,
  Fullscreen,
  LucideClipboardEdit,
  LucideNewspaper,
  LucidePrinter,
  Trash,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HiLockClosed, HiMiniUserGroup, HiUserGroup } from "react-icons/hi2";
import {
  TbBook,
  TbBookFilled,
  TbBroadcast,
  TbBuildingCommunity,
  TbCalendarCheck,
  TbCalendarDot,
  TbCalendarExclamation,
  TbCalendarSearch,
  TbCalendarStats,
  TbChartBubble,
  TbChartDonut,
  TbDatabase,
  TbDatabaseEdit,
  TbFileCertificate,
  TbFileDigit,
  TbFishChristianity,
  TbMoneybag,
  TbQrcode,
  TbSchool,
  TbTargetArrow,
} from "react-icons/tb";

import { useRouter } from "next/navigation";
import { MdOutlineSaveAlt } from "react-icons/md";
import FormPelatihan from "../admin/formPelatihan";
import Toast from "@/components/toast";
import SertifikatSettingPage1 from "@/components/sertifikat/sertifikatSettingPage1";
import SertifikatSettingPage2 from "@/components/sertifikat/sertifikatSettingPage2";
import { PiStampLight } from "react-icons/pi";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { PelatihanMasyarakat } from "@/types/product";

import { convertDate } from "@/utils";
import Cookies from "js-cookie";

import Link from "next/link";
import { elautBaseUrl } from "@/constants/urls";

import { HashLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { generateTanggalPelatihan } from "@/utils/text";
import { MateriButton, PublishButton } from "../Dashboard/Actions";
import UploadSuratButton from "../Dashboard/Actions/UploadSuratButton";
import GenerateNoSertifikatButton from "../Dashboard/Actions/GenerateNoSertifikatButton";
import CloseButton from "../Dashboard/Actions/CloseButton";
import DeleteButton from "../Dashboard/Actions/DeleteButton";

const TableDataPelatihan: React.FC = () => {
  const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
    React.useState<boolean>(false);
  const [showCertificateSetting, setShowCertificateSetting] =
    React.useState<boolean>(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [data, setData] = React.useState<PelatihanMasyarakat[]>([]);

  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  // COUNTER
  const [countOnProgress, setCountOnProgress] = React.useState<number>(0);
  const [countDone, setCountDone] = React.useState<number>(0);

  const handleFetchingPublicTrainingData = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${elautBaseUrl}/lemdik/getPelatihanAdmin?id_lemdik=${Cookies.get(
          "IDLemdik"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF091")}`,
          },
        }
      );

      // Count statuses
      const onProgressCount = response?.data!.data!.filter(
        (item: any) => item.StatusPenerbitan === "On Progress"
      ).length;
      const doneCount = response?.data!.data!.filter(
        (item: any) => item.StatusPenerbitan === "Done"
      ).length;

      // Update state with counts
      setCountOnProgress(onProgressCount);
      setCountDone(doneCount);
      console.log("PELATIHAN BY LEMDIK: ", response);
      setData(response.data.data);

      setIsFetching(false);
    } catch (error) {
      console.error("Error posting training data:", error);
      setIsFetching(false);
      throw error;
    }
  };

  const [statusPelatihan, setStatusPelatihan] = React.useState("");
  const publishedData = data.filter(
    (item: PelatihanMasyarakat) => item.Status === "Publish"
  ).length;

  /* ================================= HANDLING PENERBITAN SERTIFIKAT ====================================== */
  const [beritaAcara, setBeritaAcara] = React.useState<File | null>(null);

  /* ================================= HANDLING PENERBITAN SERTIFIKAT ====================================== */

  const [isOpenFormMateri, setIsOpenFormMateri] =
    React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState<number>(0);

  const [sertifikatUntukPelatihan, setSertifikatUntukPelatihan] =
    React.useState("");
  const [ttdSertifikat, setTtdSertifikat] = React.useState("");
  const [openFormSertifikat, setOpenFormSertifikat] = React.useState(false);

  const [isOpenFormPublishedPelatihan, setIsOpenFormPublishedPelatihan] =
    React.useState<boolean>(false);

  const [openFormTutupPelatihan, setOpenFormTutupPelatihan] =
    React.useState(false);
  const [selectedStatusPelatihan, setSelectedStatusPelatihan] =
    React.useState("");
  const [selectedIdStatusPelatihan, setSelectedIdStatusPelatihan] =
    React.useState(0);
  const [selectedIdPelatihanSertifikat, setSelectedIdPelatihanSertifikat] =
    React.useState(0);
  const [selectedKodePelatihanSertifikat, setSelectedKodePelatihanSertifikat] =
    React.useState("");
  const [selectedNamaPelatihanSertifikat, setSelectedNamaPelatihanSertifikat] =
    React.useState("");
  const [selectedIdPelatihanStatus, setSelectedIdPelatihanStatus] =
    React.useState(0);
  const [selectedStatus, setSelectedStatus] = React.useState("");

  const router = useRouter();

  const [isOpenFormSuratPemberitahuan, setIsOpenFormSuratPemberitahuan] =
    React.useState<boolean>(false);
  const [suratPemberitahuan, setSuratPemberitahuan] =
    React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const handleSuratPemberitahuanChange = (e: any) => {
    setSuratPemberitahuan(e.target.files[0]);
  };
  const handleUploadSuratPemberitahuan = async (id: number) => {
    setIsUploading(true);
    const formData = new FormData();
    if (suratPemberitahuan != null) {
      formData.append("SuratPemberitahuan", suratPemberitahuan);
    }
    console.log("SURAT PEMBERITAHUAN", suratPemberitahuan);

    try {
      const response = await axios.put(
        `${baseUrl}/lemdik/UpdatePelatihan?id=${selectedId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF091")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Toast.fire({
        icon: "success",
        title: `Berhasil mengupload surat pemberitahuan ke Pusat Pelatihan Kelautan dan Perikanan!`,
      });
      console.log("UPDATE PELATIHAN: ", response);
      handleFetchingPublicTrainingData();
      setSelectedId(0);
      setIsUploading(false);
      setIsOpenFormSuratPemberitahuan(!isOpenFormSuratPemberitahuan);
    } catch (error) {
      console.error("ERROR UPDATE PELATIHAN: ", error);
      Toast.fire({
        icon: "error",
        title: `Gagal mengupload surat pemberitahuan ke Pusat Pelatihan Kelautan dan Perikanan!`,
      });
      setIsOpenFormSuratPemberitahuan(!isOpenFormSuratPemberitahuan);
      setSelectedId(0);
      setIsUploading(false);
      handleFetchingPublicTrainingData();
    }
  };

  const [fileSuratPemberitahuan, setFileSuratPemberitahuan] =
    React.useState<string>("");

  const [
    isShowInformationSuratPemberitahuan,
    setIsShowInformationSuratPemberitahuan,
  ] = React.useState<boolean>(false);

  /**
   * FILTERING PELATIHAN
   * >> concists of filtering feature functions and states to handle
   *    fetching and filtering data pelatihan by user lemdiklat
   */
  const [filterSelectedJenisPelatihan, setFilterSelectedJenisPelatihan] =
    React.useState("");

  React.useEffect(() => {
    handleFetchingPublicTrainingData();
  }, []);

  // STATUS FILTER
  const [selectedStatusFilter, setSelectedStatusFilter] =
    React.useState<string>("All");

  // SEARCHING
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const filteredData = data.filter((pelatihan) => {
    const matchesSearchQuery =
      pelatihan.NamaPelatihan.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      pelatihan.BidangPelatihan.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      pelatihan.PenyelenggaraPelatihan.toLowerCase().includes(
        searchQuery.toLowerCase()
      );

    var matchesStatus;

    if (selectedStatusFilter == "Perlu Di TTD") {
      matchesStatus = pelatihan!.StatusPenerbitan === "On Progress";
    } else if (selectedStatusFilter == "Sudah Di TTD") {
      matchesStatus = pelatihan!.StatusPenerbitan === "Done";
    } else {
      matchesStatus =
        selectedStatusFilter === "All" ||
        pelatihan!.StatusPenerbitan === selectedStatusFilter;
    }

    return matchesSearchQuery && matchesStatus;
  });

  return (
    <div className="rounded-sm  pb-5  shadow-default -mt-10">
      {showFormAjukanPelatihan ? (
        <>
          {/* Header Tabel Data Pelatihan */}
          <div className="flex flex-wrap items-center mb-3 justify-between gap-3 sm:flex-nowrap">
            {/* Button Ajukan Permohonan Buka Pelatihan */}
          </div>

          {/* List Data Pelatihan */}
          <div>
            <FormPelatihan edit={false} />
          </div>
        </>
      ) : showCertificateSetting ? (
        <>
          {/* Header Tabel Data Pelatihan */}
          <div className="flex flex-wrap items-center mb-3 justify-between gap-3 sm:flex-nowrap">
            {/* Statistik Pelatihan */}
            <div className="hidden w-full flex-wrap gap-3 sm:gap-5">
              <div className="flex min-w-47.5">
                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                  <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                </span>
                <div className="w-full">
                  <p className="font-semibold text-primary">Total Pelatihan</p>
                  <p className="text-sm font-medium">{data.length} pelatihan</p>
                </div>
              </div>
              <div className="flex min-w-47.5">
                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                  <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
                </span>
                <div className="w-full">
                  <p className="font-semibold text-secondary">
                    Total Publish Umum
                  </p>
                  <p className="text-sm font-medium">
                    {publishedData} pelatihan
                  </p>
                </div>
              </div>
              <div className="flex min-w-47.5">
                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                  <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
                </span>
                <div className="w-full">
                  <p className="font-semibold text-secondary">
                    Total Pelatihan Selesai
                  </p>
                  <p className="text-sm font-medium">
                    {publishedData} pelatihan
                  </p>
                </div>
              </div>
            </div>

            {/* Button Ajukan Permohonan Buka Pelatihan */}
            <div className="flex w-full gap-2 justify-end">
              <Sheet>
                <SheetTrigger asChild>
                  <div className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer">
                    <PiStampLight />
                    Add Stempel
                  </div>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <div className="flex flex-row items-center gap-2">
                      {/* <Image
                        src={"/logo-kkp.png"}
                        width={0}
                        height={0}
                        alt="KKP Logo"
                        className="w-12 h-12"
                      /> */}
                      <div className="flex flex-col gap-1">
                        <SheetTitle>Pilih Stempel</SheetTitle>
                        <SheetDescription>
                          Pilih stempel tanda tangan elektronik yang ingin anda
                          taukan ke file sertifikat yang akan digenerate!
                        </SheetDescription>
                      </div>
                    </div>
                  </SheetHeader>
                  <div className="w-full mt-5 mb-10">
                    <div className="w-full border-2 rounded-md hover:cursor-pointer hover:border-blue-500 duration-700 flex items-center flex-col px-3 py-5 text-center justify-center border-dashed">
                      <p className="-mt-1 text-sm">
                        Kepala Balai Pelatihan dan Penyuluhan Perikanan
                        Banyuwangi
                      </p>
                      <Image
                        className="w-[200px] my-3"
                        width={0}
                        height={0}
                        alt="Logo Kementrian Kelautan dan Perikanan RI"
                        src={"/ttd-elektronik.png"}
                      />
                      <p className="-mt-1 font-extrabold text-sm">
                        MOCH. MUCHLISIN, A.Pi, M.P
                      </p>
                      <p className="font-extrabold text-sm -mt-1">
                        NIP. 197509161999031003
                      </p>
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit">Sematkan Stempel</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              <div
                onClick={(e) => setShowFormAjukanPelatihan(true)}
                className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer"
              >
                <TbFileCertificate />
                Generate Sertifikat Peserta
              </div>
            </div>
          </div>

          <div className="max-h-[500px] flex flex-col gap-2 overflow-y-auto scroll-smooth">
            <SertifikatSettingPage1 />
            <SertifikatSettingPage2 />
          </div>
        </>
      ) : (
        <>
          <nav className="bg-gray-100 flex p-4">
            <section
              aria-labelledby="ticket-statistics-tabs-label"
              className="pb-2"
            >
              <ul className="flex">
                <li>
                  <button
                    onClick={() => setSelectedStatusFilter("All")}
                    className={`focus:outline-none p-2 rounded-l-md border border-r-0 flex flex-col items-center w-fit ${
                      selectedStatusFilter === "All"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <p className="font-semibold text-lg">{data!.length}</p>
                    <p
                      className={`uppercase text-sm ${
                        selectedStatusFilter === "All"
                          ? "text-white font-bold"
                          : "text-gray-600"
                      }`}
                    >
                      TOTAL PELATIHAN
                    </p>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedStatusFilter("Perlu Di TTD")}
                    className={`focus:outline-none p-2 border border-r-0 flex flex-col items-center w-fit ${
                      selectedStatusFilter === "Perlu Di TTD"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <p className="font-semibold text-lg">{countOnProgress}</p>
                    <p
                      className={`uppercase text-sm ${
                        selectedStatusFilter === "Perlu Di TTD"
                          ? "text-white font-bold"
                          : "text-gray-600"
                      }`}
                    >
                      Belum Dipublish
                    </p>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => setSelectedStatusFilter("Perlu Di TTD")}
                    className={`focus:outline-none p-2 border border-r-0 flex flex-col items-center w-fit ${
                      selectedStatusFilter === "Perlu Di TTD"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <p className="font-semibold text-lg">{countOnProgress}</p>
                    <p
                      className={`uppercase text-sm ${
                        selectedStatusFilter === "Perlu Di TTD"
                          ? "text-white font-bold"
                          : "text-gray-600"
                      }`}
                    >
                      Pendaftaran
                    </p>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => setSelectedStatusFilter("Perlu Di TTD")}
                    className={`focus:outline-none p-2 border border-r-0 flex flex-col items-center w-fit ${
                      selectedStatusFilter === "Perlu Di TTD"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <p className="font-semibold text-lg">{countOnProgress}</p>
                    <p
                      className={`uppercase text-sm ${
                        selectedStatusFilter === "Perlu Di TTD"
                          ? "text-white font-bold"
                          : "text-gray-600"
                      }`}
                    >
                      Telah Selesai
                    </p>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => setSelectedStatusFilter("Sudah Di TTD")}
                    className={`focus:outline-none p-2 rounded-r-md border border-r-1 flex flex-col items-center w-fit ${
                      selectedStatusFilter === "Sudah Di TTD"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <p className="font-semibold text-lg">{countDone}</p>
                    <p
                      className={`uppercase text-sm ${
                        selectedStatusFilter === "Sudah Di TTD"
                          ? "text-white font-bold"
                          : "text-gray-600"
                      }`}
                    >
                      Proses Penerbitan
                    </p>
                  </button>
                </li>
              </ul>
            </section>
          </nav>
          <section className="px-4 -mt-4 w-full">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className={`grid w-full grid-cols-2`}>
                <TabsTrigger value="account">Daftar Pelatihan</TabsTrigger>
                <TabsTrigger value="password">Buat Pelatihan Baru</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <div className="flex flex-col gap-1">
                  <div className="mb-1">
                    <Input
                      type="text"
                      placeholder="Cari berdasarkan Nama, Bidang, dan Penyelenggara Pelatihan"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-sm"
                    />
                  </div>
                  {filteredData.length == 0 ? (
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
                          Belum Pengajuan Penerbitan
                        </h1>
                        <div className="text-gray-600 text-sm text-center  max-w-md">
                          Pengajuan penerbitan sertifikat pelatihan/bimbingan
                          teknis yang ditandatangani oleh Kepala Pusat Pelatihan
                          KP belum ada!
                        </div>
                      </div>
                    </div>
                  ) : (
                    filteredData.map((pelatihan, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle>{pelatihan!.NamaPelatihan}</CardTitle>
                          <CardDescription>
                            {" "}
                            {pelatihan!.Program} •{" "}
                            {pelatihan!.PenyelenggaraPelatihan}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="ml-0 text-left capitalize -mt-6">
                            <div className="ml-0 text-left mt-1 text-neutral-500 ">
                              <p className="text-sm ">
                                <span className="flex items-center gap-1 leading-[105%]">
                                  <TbTargetArrow className="text-lg" />
                                  <span>
                                    Lokasi Pelatihan :{" "}
                                    {pelatihan!.LokasiPelatihan}
                                  </span>
                                </span>
                                <span className="flex items-center gap-1 leading-[105%]">
                                  <TbCalendarCheck className="text-lg" />
                                  <span>
                                    Waktu Pelaksanaan :{" "}
                                    {generateTanggalPelatihan(
                                      pelatihan!.TanggalMulaiPelatihan
                                    )}{" "}
                                    s.d{" "}
                                    {generateTanggalPelatihan(
                                      pelatihan!.TanggalBerakhirPelatihan
                                    )}
                                  </span>
                                </span>

                                <span className="flex items-center gap-1 leading-[105%]">
                                  <HiUserGroup className="text-base" />
                                  <span>
                                    Jumlah peserta pelatihan :{" "}
                                    {pelatihan!.UserPelatihan.length}/
                                    {pelatihan!.KoutaPelatihan}
                                  </span>
                                </span>
                              </p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <div className="flex items-center justify-center gap-1 flex-wrap  -mt-2">
                            <Link
                              href={`/admin/lemdiklat/pelatihan/detail/${pelatihan.KodePelatihan}/${pelatihan.IdPelatihan}`}
                              className="border border-neutral-200  shadow-sm  inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-gray-400 hover:bg-gray-400 hover:text-white text-white rounded-md"
                            >
                              <RiInformationFill className="h-5 w-5 mr-1" />
                              Lihat Detail
                            </Link>

                            <Link
                              href={`/admin/pusat/pelatihan/${pelatihan.KodePelatihan}/peserta-pelatihan/${pelatihan.IdPelatihan}`}
                              className="  shadow-sm bg-green-400 hover:bg-green-400 text-neutral-100  hover:text-neutral-100 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
                            >
                              <HiUserGroup className="h-5 w-5 mr-1" />
                              Peserta Pelatihan
                            </Link>

                            <MateriButton
                              idPelatihan={pelatihan!.IdPelatihan.toString()}
                              handleFetchingData={
                                handleFetchingPublicTrainingData
                              }
                            />

                            <DeleteButton
                              idPelatihan={pelatihan!.IdPelatihan.toString()}
                              pelatihan={pelatihan}
                              handleFetchingData={
                                handleFetchingPublicTrainingData
                              }
                            />

                            <CloseButton
                              idPelatihan={pelatihan!.IdPelatihan.toString()}
                              statusPelatihan={pelatihan?.StatusApproval ?? ""}
                              handleFetchingData={
                                handleFetchingPublicTrainingData
                              }
                            />

                            <GenerateNoSertifikatButton
                              idPelatihan={pelatihan!.IdPelatihan.toString()}
                              pelatihan={pelatihan!}
                              handleFetchingData={
                                handleFetchingPublicTrainingData
                              }
                            />

                            <PublishButton
                              statusPelatihan={pelatihan?.Status ?? ""}
                              idPelatihan={pelatihan!.IdPelatihan.toString()}
                              handleFetchingData={
                                handleFetchingPublicTrainingData
                              }
                            />

                            <UploadSuratButton
                              idPelatihan={pelatihan!.IdPelatihan.toString()}
                              handleFetchingData={
                                handleFetchingPublicTrainingData
                              }
                              suratPemberitahuan={
                                pelatihan?.SuratPemberitahuan ?? ""
                              }
                            />
                          </div>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="password">
                <Card>
                  <CardContent>
                    <FormPelatihan edit={false} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </>
      )}
    </div>
  );
};

export default TableDataPelatihan;
