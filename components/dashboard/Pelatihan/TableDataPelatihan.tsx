import React, { ReactElement, useState } from "react";
import TableData from "../Tables/TableData";
import { RiShipLine, RiVerifiedBadgeFill } from "react-icons/ri";

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
  LucidePrinter,
  Trash,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HiMiniUserGroup, HiUserGroup } from "react-icons/hi2";
import {
  TbBroadcast,
  TbBuildingCommunity,
  TbCalendarCheck,
  TbCalendarDot,
  TbCalendarExclamation,
  TbCalendarSearch,
  TbCalendarStats,
  TbChartBubble,
  TbChartDonut,
  TbDatabaseEdit,
  TbFileCertificate,
  TbFileDigit,
  TbFishChristianity,
  TbMoneybag,
  TbQrcode,
  TbSchool,
  TbTargetArrow,
} from "react-icons/tb";
import { IoIosInformationCircle, IoMdGlobe } from "react-icons/io";
import { FiUploadCloud } from "react-icons/fi";
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
import { FaRupiahSign } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { convertDate } from "@/utils";
import Cookies from "js-cookie";
import { LemdiklatDetailInfo } from "@/types/lemdiklat";
import { Progress } from "@/components/ui/progress";

const TableDataPelatihan: React.FC = () => {
  const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
    React.useState<boolean>(false);
  const [showCertificateSetting, setShowCertificateSetting] =
    React.useState<boolean>(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [data, setData] = React.useState<PelatihanMasyarakat[]>([]);

  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const handleFetchingPublicTrainingData = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/lemdik/getPelatihan?id_lemdik=${Cookies.get("IDLemdik")}`
      );
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

  const handleUpdatePublishPelatihanToELAUT = async (
    id: number,
    status: string
  ) => {
    const formData = new FormData();
    formData.append("Status", status);
    try {
      const response = await axios.put(
        `${baseUrl}/lemdik/UpdatePelatihan?id=${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF091")}`,
          },
        }
      );
      Toast.fire({
        icon: "success",
        title: `Berhasil mempublish informasi pelatihan masyarakat ke laman E-LAUT!`,
      });
      console.log("UPDATE PELATIHAN: ", response);
      handleFetchingPublicTrainingData();
    } catch (error) {
      console.error("ERROR UPDATE PELATIHAN: ", error);
      Toast.fire({
        icon: "success",
        title: `Gagal mempublish informasi pelatihan masyarakat ke laman E-LAUT!`,
      });
      handleFetchingPublicTrainingData();
    }
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const router = useRouter();
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns: ColumnDef<PelatihanMasyarakat>[] = [
    {
      accessorKey: "KodePelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-gray-900 font-semibold`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "IdPelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`${"flex"} w-full text-gray-900 font-semibold`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Action
            <TbDatabaseEdit className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="w-full flex flex-col gap-2">
          <div className="w-full relative ">
            <div className="full h-40 relative">
              <Image
                alt={row.original.NamaPelatihan}
                src={row.original.FotoPelatihan}
                width={0}
                height={0}
                className="w-full h-40 object-cover rounded-xl"
              />
              {row.original.Status == "Publish" && (
                <div className="w-fit flex gap-1 bg-white shadow-custom rounded-full items-center px-2 py-1   text-xs absolute top-3 right-3 font-medium text-blue-500">
                  <IoMdGlobe /> Published
                </div>
              )}
              <div className="w-full h-40 absolute bg-blue-500 bg-opacity-10 top-0 rounded-xl"></div>
            </div>
          </div>

          <div className={`${"flex"} flex items-center justify-center gap-1`}>
            <SheetInfoPelatihan>
              <Button variant="outline" className="ml-auto">
                <IoIosInformationCircle className="h-4 w-4" />
              </Button>
            </SheetInfoPelatihan>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto border border-rose-600"
                >
                  <Trash className="h-4 w-4 text-rose-600" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Apakah kamu yakin menghapus pelatihan ini?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Penghapusan data ini akan dilakukan secara permanen,
                    sehingga anda tidak dapat kembali melakukan undo terkait
                    tindakan ini!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction className="bg-rose-600">
                    Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              onClick={(e) =>
                router.push(
                  `/admin/lemdiklat/pelatihan/edit-pelatihan/${row.original.IdPelatihan}`
                )
              }
              variant="outline"
              className="ml-auto border border-yellow-500"
            >
              <Edit3Icon className="h-4 w-4 text-yellow-500" />
            </Button>

            <Button
              onClick={(e) =>
                router.push(
                  `/admin/lemdiklat/pelatihan/${row.getValue(
                    "KodePelatihan"
                  )}/peserta-pelatihan/${row.getValue("IdPelatihan")}`
                )
              }
              variant="outline"
              className="ml-auto border border-green-500"
            >
              <HiUserGroup className="h-4 w-4 text-green-500" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto border border-blue-600"
                >
                  <RiVerifiedBadgeFill className="h-4 w-4 text-blue-600" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Publikasi ke Web E-LAUT</AlertDialogTitle>
                  <AlertDialogDescription className="-mt-2">
                    Agar pelatihan di balai/lemdiklat-mu dapat dilihat oleh
                    masyarakat umum lakukan checklist agar tampil di website
                    E-LAUT!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <form autoComplete="off">
                  <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-gray-300">
                    <div>
                      <Checkbox />
                    </div>
                    <div className="space-y-1 leading-none">
                      <label>Publish Website E-LAUT</label>
                      <p className="text-xs leading-[110%] text-gray-600">
                        Dengan ini sebagai pihak lemdiklat saya mempublish
                        informasi pelatihan terbuka untuk masyarakat umum!
                      </p>
                    </div>
                  </div>
                </form>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) =>
                      Toast.fire({
                        icon: "success",
                        title: `Berhasil mempublish informasi pelatihan masyarakat ke laman E-LAUT!`,
                      })
                    }
                  >
                    Publish
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto border border-purple-600"
                >
                  <TbBroadcast className="h-4 w-4 text-purple-600" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Publikasi ke Web E-LAUT</AlertDialogTitle>
                  <AlertDialogDescription className="-mt-2">
                    Agar pelatihan di balai/lemdiklat-mu dapat dilihat oleh
                    masyarakat umum lakukan checklist agar tampil di website
                    E-LAUT!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <form autoComplete="off">
                  {row.original.Status == "Belum Publish" ? (
                    <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-gray-300">
                      <div>
                        <Checkbox
                          id="publish"
                          onCheckedChange={(e) => setStatusPelatihan("Publish")}
                        />
                      </div>
                      <div className="space-y-1 leading-none">
                        <label>Publish Website E-LAUT</label>
                        <p className="text-xs leading-[110%] text-gray-600">
                          Dengan ini sebagai pihak lemdiklat saya mempublish
                          informasi pelatihan terbuka untuk masyarakat umum!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 border-gray-300">
                      <RiVerifiedBadgeFill className="h-7 w-7 text-green-500 text-lg" />
                      <div className="space-y-1 leading-none">
                        <label>Published Website E-LAUT</label>
                        <p className="text-xs leading-[110%] text-gray-600">
                          Informasi Kelas Pelatihanmu telah dipublikasikan
                          melalui laman Website E-LAUT balai mu!
                        </p>
                      </div>
                    </div>
                  )}
                </form>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) =>
                      row.original.Status == "Belum Publish"
                        ? handleUpdatePublishPelatihanToELAUT(
                            row.original.IdPelatihan,
                            statusPelatihan
                          )
                        : handleUpdatePublishPelatihanToELAUT(
                            row.original.IdPelatihan,
                            "Belum Publish"
                          )
                    }
                  >
                    {row.original.Status == "Publish" ? "Unpublish" : "Publsih"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "NamaPelatihan",

      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`p-0 !text-left w-[270px] flex items-center justify-start text-gray-900 font-semibold`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Pelatihan
            <TbSchool className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-left capitalize`}>
          <p className="text-xs text-gray-400 mt-2 leading-[100%] mb-1">
            {" "}
            {row.getValue("KodePelatihan")} • {row.original.BidangPelatihan} •{" "}
            {row.original.JenisPelatihan} • Mendukung Program Terobosan{" "}
            {row.original.DukunganProgramTerobosan}
          </p>
          <p className="text-base font-semibold tracking-tight leading-none">
            {row.getValue("NamaPelatihan")}
          </p>
          <div className={`${"ml-0"} text-left capitalize mt-1`}>
            <p className="text-xs  font-medium capitalize ">
              {" "}
              <span className="flex items-center gap-1 leading-[105%]">
                <TbTargetArrow />
                <span>{row.original?.PelaksanaanPelatihan}</span>{" "}
              </span>
              <span className="flex items-center gap-1 leading-[105%]">
                <TbCalendarCheck />
                <span className="">
                  {" "}
                  <span>
                    {" "}
                    {convertDate(row.original.TanggalMulaiPelatihan)}{" "}
                  </span>
                  <span className="lowercase">s.d</span>{" "}
                  <span>
                    {" "}
                    {convertDate(row?.original?.TanggalBerakhirPelatihan)}
                  </span>
                </span>
              </span>
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "AsalPelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[150px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Peserta
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-left capitalize`}>
          <p className="text-xs text-gray-400"> Asal dan Kuota Peserta</p>
          <p className="text-base font-semibold tracking-tight leading-none">
            {row.getValue("AsalPelatihan")} • {row.original.KoutaPelatihan}{" "}
            Orang
          </p>
          <span className="text-xs  font-medium capitalize leading-[100%] mt-2">
            Realisasi Pendaftar
          </span>
          <Progress
            value={
              row.original.UserPelatihan.length *
              (100 / parseInt(row.original.KoutaPelatihan))
            }
            max={parseInt(row.original.KoutaPelatihan)}
            className="w-full"
          />
          <p className="text-xs text-gray-400 capitalize">
            {" "}
            {row.original.UserPelatihan.length}/
            {parseInt(row.original.KoutaPelatihan)}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "Pelaksanaan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[150px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Hasil Pelaksanaan
            <TbFileDigit className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-left capitalize`}>
          <p className="text-xs text-gray-400 capitalize"> Jumlah Yang Lulus</p>
          <p className="text-base font-semibold tracking-tight leading-none">
            <span className="text-green-500">
              {row.original.KoutaPelatihan} Orang
            </span>{" "}
          </p>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    handleFetchingPublicTrainingData();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
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
            </div>

            {/* Button Ajukan Permohonan Buka Pelatihan */}
            <div className="flex w-full gap-2 justify-end">
              <Sheet>
                <SheetTrigger asChild>
                  <div className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer">
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
                className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer"
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
          {/* Header Tabel Data Pelatihan */}
          <div className="flex flex-wrap items-center mb-3 justify-between gap-3 sm:flex-nowrap">
            {/* Statistik Pelatihan */}
            <div className="flex w-full flex-wrap gap-3 sm:gap-5">
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
            </div>
          </div>

          {/* List Data Pelatihan */}
          <div>
            <div id="chartOne" className="-ml-5"></div>
            <div className="flex w-full items-center mb-2">
              <div className="flex w-full gap-1 items-start">
                <Select>
                  <SelectTrigger className="w-[160px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                    <div
                      onClick={(e) => {
                        router.push(
                          "/admin/lemdiklat/pelatihan/tambah-pelatihan"
                        );
                      }}
                      className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer"
                    >
                      <FaRupiahSign />
                      Jenis Pelatihan
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Jenis</SelectLabel>
                      <SelectItem value="pendaftaran">Reguler</SelectItem>
                      <SelectItem value="pelaksanaan">Aspirasi</SelectItem>
                      <SelectItem value="selesai">PNBP/BLU</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[170px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                    <div
                      onClick={(e) => {
                        router.push(
                          "/admin/lemdiklat/pelatihan/tambah-pelatihan"
                        );
                      }}
                      className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer"
                    >
                      <TbChartBubble />
                      Status Pelatihan
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="pendaftaran">Pendaftaran</SelectItem>
                      <SelectItem value="pelaksanaan">Pelaksanaan</SelectItem>
                      <SelectItem value="selesai">Selesai</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[180px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                    <div
                      onClick={(e) => {
                        router.push(
                          "/admin/lemdiklat/pelatihan/tambah-pelatihan"
                        );
                      }}
                      className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer"
                    >
                      <RiShipLine />
                      Bidang Pelatihan
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Bidang</SelectLabel>
                      <SelectItem value="apple">Kepelautan</SelectItem>
                      <SelectItem value="banana">Non-Kepelautan</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[110px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                    <div
                      onClick={(e) => {
                        router.push(
                          "/admin/lemdiklat/pelatihan/tambah-pelatihan"
                        );
                      }}
                      className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer"
                    >
                      <TbBroadcast />
                      Publish
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Bidang</SelectLabel>
                      <SelectItem value="apple">Publish E-LAUT</SelectItem>
                      <SelectItem value="banana">Unpublish E-LAUT</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full flex justify-end gap-2">
                <div
                  onClick={(e) => {
                    router.push("/admin/lemdiklat/pelatihan/tambah-pelatihan");
                  }}
                  className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer w-fit"
                >
                  <TbChartDonut />
                  Statistik
                </div>
                <div
                  onClick={(e) => {
                    router.push("/admin/lemdiklat/pelatihan/tambah-pelatihan");
                  }}
                  className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer w-fit"
                >
                  <FiUploadCloud />
                  Tambah Database Pelatihan
                </div>
              </div>
            </div>

            <TableData
              isLoading={isFetching}
              columns={columns}
              table={table}
              type={"short"}
            />
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="text-muted-foreground flex-1 text-sm">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="font-inter"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-inter"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const SheetInfoPelatihan = ({
  children,
  pelatihan,
}: {
  children: ReactElement;
  pelatihan?: any;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-[500px]">
        <SheetHeader>
          <SheetTitle className="leading-[110%]">
            Pelatihan Diversifikasi Usaha Produk Perikanan/Rumput Laut Bagi
            Masyarakat Kabupaten Alor
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex w-full mt-4">
          <table>
            <tr>
              <td>
                <SheetDescription className="flex items-center gap-1 text-black font-medium">
                  <TbQrcode /> Kode Pelatihan
                </SheetDescription>
              </td>
              <td className="mx-5">:</td>
              <td>
                <SheetDescription>PDUP923</SheetDescription>
              </td>
            </tr>
            <tr>
              <td>
                <SheetDescription className="flex items-center gap-1 text-black font-medium">
                  <TbBuildingCommunity className="text-lg" /> Penyelenggara
                  Pelatihan
                </SheetDescription>
              </td>
              <td className="mx-5">:</td>
              <td>
                <SheetDescription>BPPP Tegal</SheetDescription>
              </td>
            </tr>
            <tr>
              <td>
                <SheetDescription className="flex items-center gap-1 text-black font-medium">
                  <TbMoneybag className="text-sm" /> Jenis Pelatihan
                </SheetDescription>
              </td>
              <td className="mx-5">:</td>
              <td>
                <SheetDescription>Aspirasi</SheetDescription>
              </td>
            </tr>
            <tr>
              <td>
                <SheetDescription className="flex items-center gap-1 text-black font-medium">
                  <TbFishChristianity className="text-sm" /> Bidang Pelatihan
                </SheetDescription>
              </td>
              <td className="mx-5">:</td>
              <td>
                <SheetDescription>Pengolahan/Pemasaran</SheetDescription>
              </td>
            </tr>
            <tr>
              <td>
                <SheetDescription className="flex items-center gap-1 text-black font-medium">
                  <TbTargetArrow className="text-2xl" /> Dukungan Program
                  Terobosan
                </SheetDescription>
              </td>
              <td className="mx-5">:</td>
              <td>
                <SheetDescription>Kalamu/Kalaju</SheetDescription>
              </td>
            </tr>
            <tr>
              <td>
                <SheetDescription className="flex items-center gap-1 text-black font-medium">
                  <TbCalendarStats className="text-sm" /> Tanggal Pelatihan
                </SheetDescription>
              </td>
              <td className="mx-5">:</td>
              <td>
                <SheetDescription>18 Mei 2024 - 20 Mei 2024</SheetDescription>
              </td>
            </tr>
            <tr>
              <td>
                <SheetDescription className="flex items-center gap-1 text-black font-medium">
                  <FaRupiahSign className="text-xs" /> Harga Pelatihan
                </SheetDescription>
              </td>
              <td className="mx-5">:</td>
              <td>
                <SheetDescription>Rp. 0</SheetDescription>
              </td>
            </tr>
            <tr>
              <td>
                <SheetDescription className="flex items-center gap-1 text-black font-medium">
                  <FaRupiahSign className="text-xs" /> Harga Pelatihan
                </SheetDescription>
              </td>
              <td className="mx-5">:</td>
              <td>
                <SheetDescription>Published to E-LAUT</SheetDescription>
              </td>
            </tr>
            <tr>
              <td>
                <SheetDescription className="text-black font-medium">
                  Lokasi Pelatihan
                </SheetDescription>
              </td>
              <td className="mx-5">:</td>
              <td>
                <SheetDescription>
                  Desan Karang Anyar Sambo, Jawa Timur - Klasikal
                </SheetDescription>
              </td>
            </tr>
            <tr>
              <td>
                <SheetDescription className="text-black font-medium">
                  Kuota Peserta
                </SheetDescription>
              </td>
              <td className="mx-5">:</td>
              <td>
                <SheetDescription>250 Orang</SheetDescription>
              </td>
            </tr>
            <tr>
              <td>
                <SheetDescription className="text-black font-medium">
                  Asal Peserta
                </SheetDescription>
              </td>
              <td className="mx-5">:</td>
              <td>
                <SheetDescription>Dinas Kota Anyar</SheetDescription>
              </td>
            </tr>
          </table>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TableDataPelatihan;
