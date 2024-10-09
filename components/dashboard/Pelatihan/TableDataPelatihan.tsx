import React, { ReactElement, useState } from "react";
import TableData from "../Tables/TableData";
import {
  RiRadioButtonLine,
  RiShipLine,
  RiVerifiedBadgeFill,
} from "react-icons/ri";

import { LucideFileCheck2, LucidePodcast, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
import {
  IoIosBook,
  IoIosInformationCircle,
  IoMdBook,
  IoMdClose,
  IoMdGlobe,
  IoMdInformationCircleOutline,
} from "react-icons/io";
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
import {
  PiFilePdf,
  PiMicrosoftExcelLogoFill,
  PiStampLight,
} from "react-icons/pi";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { PelatihanMasyarakat } from "@/types/product";
import { FaBookOpen, FaRupiahSign } from "react-icons/fa6";

import { convertDate } from "@/utils";
import Cookies from "js-cookie";
import { Progress } from "@/components/ui/progress";
import { DialogTemplateSertifikatPelatihan } from "@/components/sertifikat/dialogTemplateSertifikatPelatihan";
import Link from "next/link";
import { elautBaseUrl } from "@/constants/urls";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { HashLoader } from "react-spinners";

const TableDataPelatihan: React.FC = () => {
  const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
    React.useState<boolean>(false);
  const [showCertificateSetting, setShowCertificateSetting] =
    React.useState<boolean>(false);

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#7A1CAC",
    },
  } satisfies ChartConfig;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [data, setData] = React.useState<PelatihanMasyarakat[]>([]);

  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const handleFetchingPublicTrainingData = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/lemdik/getPelatihanAdmin?id_lemdik=${Cookies.get(
          "IDLemdik"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF091")}`,
          },
        }
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

  const handleUpdateClosePelatihanELAUT = async (
    id: number,
    status: string
  ) => {
    if (
      fileSuratPemberitahuan !=
      "https://elaut-bppsdm.kkp.go.id/api-elaut/public/static/suratPemberitahuan/"
    ) {
      const formData = new FormData();
      formData.append("StatusApproval", status);
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
          title: `Berhasil menutup kelas pelatihan, kamu dapat melanjutkan proses selanjutnya!`,
        });
        console.log("UPDATE PELATIHAN: ", response);
        handleFetchingPublicTrainingData();
      } catch (error) {
        console.error("ERROR UPDATE PELATIHAN: ", error);
        Toast.fire({
          icon: "error",
          title: `Gagal menutup kelas pelatihan, kamu dapat melanjutkan proses selanjutnya!`,
        });
        handleFetchingPublicTrainingData();
      }
    } else {
      Toast.fire({
        icon: "error",
        title: `Gagal menutup kelas pelatihan, surat pemberitahuan belum diupload!`,
      });
    }
  };

  /* ================================= HANDLING PENERBITAN SERTIFIKAT ====================================== */
  const [beritaAcara, setBeritaAcara] = React.useState<File | null>(null);
  const handleFileChange = (e: any) => {
    setBeritaAcara(e.target.files[0]);
  };
  const handleGenerateSertifikat = async (id: number) => {
    setIsUploading(!isUploading);
    console.log({ ttdSertifikat });
    const formData = new FormData();
    formData.append("TtdSertifikat", ttdSertifikat);

    const updateData = new FormData();
    if (beritaAcara != null) {
      updateData.append("BeritaAcara", beritaAcara);
    }

    try {
      const response = await axios.post(
        `${baseUrl}/lemdik/PublishSertifikat?id=${selectedIdPelatihanSertifikat}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF091")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const uploadBeritaAcaraResponse = await axios.put(
        `${baseUrl}/lemdik/UpdatePelatihan?id=${selectedIdPelatihanSertifikat}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF091")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Toast.fire({
        icon: "success",
        title: `Berhasil mengupload file berita acara dan penandatangan, tunggu proses approval dari pusat!`,
      });
      setIsUploading(!isUploading);
      handleFetchingPublicTrainingData();
      setOpenFormSertifikat(!openFormSertifikat);
      console.log("UPLOAD BERITA ACARA: ", uploadBeritaAcaraResponse);
      // handleFetchingPublicTrainingData();
    } catch (error) {
      console.error("ERROR GENERATE SERTIFIKAT: ", error);
      Toast.fire({
        icon: "error",
        title: `Gagal mengupload file berita acara dan penandatangan!`,
      });
      setIsUploading(!isUploading);
      setOpenFormSertifikat(!openFormSertifikat);
      handleFetchingPublicTrainingData();
    }
  };
  /* ================================= HANDLING PENERBITAN SERTIFIKAT ====================================== */

  const [isOpenFormMateri, setIsOpenFormMateri] =
    React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState<number>(0);

  const [materiPelatihan, setMateriPelatihan] = React.useState<File | null>(
    null
  );
  const handleFileMateriChange = (e: any) => {
    setMateriPelatihan(e.target.files[0]);
  };

  const handleUploadMateriPelatihan = async (id: number) => {
    const data = new FormData();
    if (materiPelatihan != null) {
      data.append("file", materiPelatihan);
    }

    data.append("IdPelatihan", id.toString());

    try {
      const response = await axios.post(
        `${baseUrl}/lemdik/exportModulePelatihan`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF091")}`,
          },
        }
      );
      Toast.fire({
        icon: "success",
        title: `Berhasil menambahkan materi pelatihan!`,
      });
      handleFetchingPublicTrainingData();
      console.log("MATERI PELATIHAN: ", response);
      setIsOpenFormMateri(!isOpenFormMateri);
    } catch (error) {
      console.error("ERROR GENERATE SERTIFIKAT: ", error);
      Toast.fire({
        icon: "success",
        title: `Gagal menambahkan materi pelatihan!`,
      });
      handleFetchingPublicTrainingData();
      setIsOpenFormMateri(!isOpenFormMateri);
    }
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [sertifikatUntukPelatihan, setSertifikatUntukPelatihan] =
    React.useState("");
  const [ttdSertifikat, setTtdSertifikat] = React.useState("");
  const [openFormSertifikat, setOpenFormSertifikat] = React.useState(false);

  const [isOpenFormPublishedPelatihan, setIsOpenFormPublishedPelatihan] =
    React.useState<boolean>(false);

  const handleDelete = async (
    id: number,
    pesertaPelatihan: number,
    sertifikat: string
  ) => {
    if (pesertaPelatihan > 0) {
      Toast.fire({
        icon: "error",
        title:
          "Ups, pelatihan tidak dapat dihapus karena sudah ada yang mendaftar!",
      });
    } else if (sertifikat != "") {
      Toast.fire({
        icon: "error",
        title:
          "Ups, pelatihan sudah terbit nomor sertifikatnya, tidak dapat dihapus!",
      });
    } else {
      try {
        const response = await axios.delete(
          `${elautBaseUrl}/lemdik/deletePelatihan?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("XSRF091")}`,
            },
          }
        );
        console.log(response);
        Toast.fire({
          icon: "success",
          title: "Berhasil menghapus pelatihan dari database, sobat elaut!",
        });
        handleFetchingPublicTrainingData();
      } catch (error) {
        console.error({ error });
        Toast.fire({
          icon: "error",
          title: "Ups, pelatihan tidak dapat dihapus karena kesalahan server!",
        });
        handleFetchingPublicTrainingData();
      }
    }
  };

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
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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

  const columns: ColumnDef<PelatihanMasyarakat>[] = [
    {
      accessorKey: "KodePelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-gray-900 font-semibold w-full`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase w-full`}>{row.index + 1}</div>
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
        <Link
          href={`/admin/lemdiklat/pelatihan/detail/${row.original.KodePelatihan}/${row.original.IdPelatihan}`}
          className={`${"ml-0"} text-left capitalize bg-gray-100 cursor-pointer`}
        >
          <p className="text-xs text-gray-400 mt-2 leading-[100%] mb-1">
            {" "}
            {row.getValue("KodePelatihan")} • {row.original.BidangPelatihan} •
            Mendukung Program Terobosan {row.original.DukunganProgramTerobosan}
          </p>
          <p className="text-base font-semibold tracking-tight leading-none">
            {row.getValue("NamaPelatihan")}
          </p>
          <div className={`${"ml-0"} text-left capitalize mt-1`}>
            <p className="text-sm  font-medium capitalize ">
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
                    {convertDate(row.original.TanggalMulaiPendaftaran)}{" "}
                  </span>
                  <span className="lowercase">s.d</span>{" "}
                  <span>
                    {" "}
                    {convertDate(row?.original?.TanggalAkhirPendaftaran)}
                  </span>
                </span>
              </span>
              <span className="flex items-center gap-1 leading-[105%]">
                <HiUserGroup className="text-base" />
                <span>
                  Asal peserta merupakan {row.original?.AsalPelatihan} dengan
                  kuota pendaftar{" "}
                  <span className="font-semibold">
                    {row.original.KoutaPelatihan}
                  </span>
                </span>{" "}
              </span>
              {/* <div
                onClick={(e) => {
                  router.push("/admin/lemdiklat/pelatihan/tambah-pelatihan");
                }}
                className="flex gap-2 px-3 mt-3 text-sm hover:bg-blue-500 duration-700 hover:text-white items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
              >
                <FiUploadCloud />
                Upload Surat Pemberitahuan
              </div> */}
              {/* <span className="w-full flex flex-col ">
                <span className="text-xs  font-medium capitalize leading-[100%] mt-1 mb-1">
                  Realisasi Pendaftar
                </span>
                <Progress
                  value={
                    row.original.UserPelatihan.length *
                    (100 / parseInt(row.original.KoutaPelatihan))
                  }
                  max={parseInt(row.original.KoutaPelatihan)}
                  className="w-[80%]"
                />
                <p className="text-xs text-gray-400 capitalize">
                  {" "}
                  {row.original.UserPelatihan.length}/
                  {parseInt(row.original.KoutaPelatihan)}
                </p>
              </span> */}
            </p>
          </div>
        </Link>
      ),
    },
    {
      accessorKey: "KodePelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-gray-900 font-semibold w-[300px]`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <LucidePodcast className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase w-[300px]`}>{row.index + 1}</div>
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

  const filteredData = React.useMemo(() => {
    return data.filter((item) =>
      item.JenisPelatihan.includes(filterSelectedJenisPelatihan)
    );
  }, [filterSelectedJenisPelatihan, data]);

  React.useEffect(() => {
    handleFetchingPublicTrainingData();
  }, []);

  const urlTemplateMateriPelatihan =
    "https://docs.google.com/spreadsheets/d/115Oytsh0Sv8kneobA-MNmsHWh87PNC56/export?format=xlsx";

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default  sm:px-7.5 xl:col-span-8">
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
              <div className="flex min-w-47.5">
                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                  <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-green-400"></span>
                </span>
                <div className="w-full">
                  <p className="font-semibold text-green-400">Total Selesai</p>
                  <p className="text-sm font-medium">
                    {data?.reduce(
                      (total: number, item: PelatihanMasyarakat) => {
                        // Check if StatusApprovala is "Selesai"
                        if (item.StatusApproval === "Selesai") {
                          return total + 1;
                        }
                        return total;
                      },
                      0
                    ) || 0}{" "}
                    pelatihan
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
                {/* ==================== FILTERING BY JENIS PELATIHAN ==================== */}
                <Select
                  value={filterSelectedJenisPelatihan}
                  onValueChange={(value) =>
                    setFilterSelectedJenisPelatihan(value)
                  }
                >
                  <SelectTrigger className="w-[160px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                    <div className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-full">
                      <FaRupiahSign />
                      {filterSelectedJenisPelatihan != ""
                        ? filterSelectedJenisPelatihan
                        : "Jenis Pelatihan"}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Jenis</SelectLabel>
                      <SelectItem value="Reguler">Reguler</SelectItem>
                      <SelectItem value="Aspirasi">Aspirasi</SelectItem>
                      <SelectItem value="PNBP/BLU">PNBP/BLU</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full flex justify-end gap-2">
                <div
                  onClick={(e) => {
                    router.push("/admin/lemdiklat/pelatihan/tambah-pelatihan");
                  }}
                  className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
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

export default TableDataPelatihan;
