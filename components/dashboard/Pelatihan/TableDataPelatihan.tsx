import React, { ReactElement, useState } from "react";
import TableData from "../Tables/TableData";
import {
  RiRadioButtonLine,
  RiShipLine,
  RiVerifiedBadgeFill,
} from "react-icons/ri";

import { LucideFileCheck2, TrendingUp } from "lucide-react";
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
      "https://api-elaut.ikulatluh.cloud/public/static/suratPemberitahuan/"
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
    // {
    //   accessorKey: "IdPelatihan",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         className={`${"flex"} w-full text-gray-900 font-semibold`}
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Action
    //         <TbDatabaseEdit className="ml-1 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div className="w-full flex flex-col gap-2">
    //       <div className="w-full relative ">
    //         <div className="full h-48 relative">
    //           <Image
    //             alt={row.original.NamaPelatihan}
    //             src={row.original.FotoPelatihan}
    //             width={0}
    //             height={0}
    //             className="w-full h-48 object-cover rounded-xl"
    //           />
    //           <div className="flex w-fit gap-1 absolute top-3 right-3">
    //             {row.original.StatusApproval == "Selesai" && (
    //               <div className="w-fit flex gap-1 bg-white shadow-custom rounded-full items-center px-2 py-1   text-xs font-medium text-purple-500">
    //                 <RiRadioButtonLine /> Selesai
    //               </div>
    //             )}
    //             {row.original.Status == "Publish" && (
    //               <div className="w-fit flex gap-1 bg-white shadow-custom rounded-full items-center px-2 py-1   text-xs font-medium text-blue-500">
    //                 <IoMdGlobe /> Published
    //               </div>
    //             )}
    //           </div>

    //           <div className="w-full h-40 absolute bg-blue-500 bg-opacity-10 top-0 rounded-xl"></div>
    //         </div>
    //       </div>

    //       <div className={`${"flex"} flex items-center justify-center gap-1`}>
    //         <Button
    //           variant="outline"
    //           onClick={(e) => {
    //             setIsOpenFormMateri(!isOpenFormMateri);
    //             setSelectedId(row.original.IdPelatihan);
    //           }}
    //           className="ml-auto border border-[#000000]"
    //         >
    //           <FaBookOpen className="h-4 w-4" />
    //         </Button>
    //         <AlertDialog>
    //           <AlertDialogTrigger asChild>
    //             <Button
    //               variant="outline"
    //               className="ml-auto border border-rose-600"
    //             >
    //               <Trash className="h-4 w-4 text-rose-600" />
    //             </Button>
    //           </AlertDialogTrigger>
    //           <AlertDialogContent>
    //             <AlertDialogHeader>
    //               <AlertDialogTitle>
    //                 Apakah kamu yakin menghapus pelatihan ini?
    //               </AlertDialogTitle>
    //               <AlertDialogDescription>
    //                 Penghapusan data ini akan dilakukan secara permanen,
    //                 sehingga anda tidak dapat kembali melakukan undo terkait
    //                 tindakan ini!
    //               </AlertDialogDescription>
    //             </AlertDialogHeader>
    //             <AlertDialogFooter>
    //               <AlertDialogCancel>Batal</AlertDialogCancel>
    //               <AlertDialogAction
    //                 className="bg-rose-600 text-white"
    //                 onClick={() => {
    //                   handleDelete(
    //                     row.original.IdPelatihan,
    //                     row.original.UserPelatihan.length,
    //                     row.original.NoSertifikat
    //                   ); // Call the handleDelete function when action is clicked
    //                 }}
    //               >
    //                 Hapus
    //               </AlertDialogAction>
    //             </AlertDialogFooter>
    //           </AlertDialogContent>
    //         </AlertDialog>
    //         <Button
    //           onClick={(e) => {
    //             setOpenFormTutupPelatihan(!openFormTutupPelatihan);
    //             setFileSuratPemberitahuan(row.original.SuratPemberitahuan);
    //             setSelectedStatusPelatihan(row.original.StatusApproval);
    //             setSelectedIdStatusPelatihan(row.original.IdPelatihan);
    //           }}
    //           variant="outline"
    //           className="ml-auto border border-yellow-500"
    //         >
    //           <HiLockClosed className="h-5 w-4 text-yellow-500" />
    //         </Button>
    //         <Link
    //           href={`/admin/lemdiklat/pelatihan/${row.getValue(
    //             "KodePelatihan"
    //           )}/peserta-pelatihan/${row.getValue("IdPelatihan")}`}
    //           className="ml-auto border border-green-500  h-9 px-4 py-2 rounded-md"
    //         >
    //           <HiUserGroup className="h-4 w-4 text-green-500" />
    //         </Link>
    //         {row.original.StatusApproval == "Selesai" ? (
    //           row.original.NoSertifikat == "" ? (
    //             <Button
    //               onClick={(e) => {
    //                 setOpenFormSertifikat(true);
    //                 setSelectedIdPelatihanSertifikat(row.original.IdPelatihan);
    //                 setSelectedKodePelatihanSertifikat(
    //                   row.original.KodePelatihan
    //                 );
    //                 setSelectedNamaPelatihanSertifikat(
    //                   row.original.NamaPelatihan
    //                 );
    //               }}
    //               variant="outline"
    //               className="ml-auto border border-blue-600"
    //             >
    //               <RiVerifiedBadgeFill className="h-4 w-4 text-blue-600" />
    //             </Button>
    //           ) : (
    //             <AlertDialog>
    //               <AlertDialogTrigger asChild>
    //                 <Button
    //                   variant="outline"
    //                   className="ml-auto border border-blue-600"
    //                 >
    //                   <RiVerifiedBadgeFill className="h-4 w-4 text-blue-600" />
    //                 </Button>
    //               </AlertDialogTrigger>
    //               <AlertDialogContent>
    //                 <div className="flex flex-col items-center justify-center w-full">
    //                   <Image
    //                     src={"/illustrations/web_13.jpg"}
    //                     alt="Not Found"
    //                     width={0}
    //                     height={0}
    //                     className="w-[400px]"
    //                   />
    //                   <AlertDialogHeader className="flex flex-col items-center justify-center text-center">
    //                     <AlertDialogTitle>
    //                       Penerbitan Sertifikat Pelatihan
    //                     </AlertDialogTitle>
    //                     <AlertDialogDescription className="-mt-2 text-center">
    //                       Nomor sertifikat kamu telah digenerate, kamu tidak
    //                       dapat mengatur ulang no sertifikatmu!
    //                     </AlertDialogDescription>
    //                   </AlertDialogHeader>
    //                 </div>

    //                 <AlertDialogFooter>
    //                   <AlertDialogCancel>Cancel</AlertDialogCancel>
    //                   <AlertDialogAction>Continue</AlertDialogAction>
    //                 </AlertDialogFooter>
    //               </AlertDialogContent>
    //             </AlertDialog>
    //           )
    //         ) : (
    //           <AlertDialog>
    //             <AlertDialogTrigger asChild>
    //               <Button
    //                 variant="outline"
    //                 className="ml-auto border border-blue-600"
    //               >
    //                 <RiVerifiedBadgeFill className="h-4 w-4 text-blue-600" />
    //               </Button>
    //             </AlertDialogTrigger>
    //             <AlertDialogContent>
    //               <div className="flex flex-col items-center justify-center w-full">
    //                 <Image
    //                   src={"/illustrations/web_13.jpg"}
    //                   alt="Not Found"
    //                   width={0}
    //                   height={0}
    //                   className="w-[400px]"
    //                 />
    //                 <AlertDialogHeader className="flex flex-col items-center justify-center text-center">
    //                   <AlertDialogTitle>
    //                     Penerbitan Sertifikat Pelatihan
    //                   </AlertDialogTitle>
    //                   <AlertDialogDescription className="-mt-2 text-center">
    //                     Dalam penerbitan sertifikat, diharapkan proses pelatihan
    //                     sudah selesai dan mengirimkan bukti berupa berita acara
    //                     ke pusat untuk didapatkan approval melakukan generate
    //                     nomor sertifikat dan pengajuan penerbitan!
    //                   </AlertDialogDescription>
    //                 </AlertDialogHeader>
    //               </div>

    //               <AlertDialogFooter>
    //                 <AlertDialogCancel>Cancel</AlertDialogCancel>
    //                 <AlertDialogAction>Continue</AlertDialogAction>
    //               </AlertDialogFooter>
    //             </AlertDialogContent>
    //           </AlertDialog>
    //         )}

    //         <>
    //           <Button
    //             onClick={(e) => {
    //               setSelectedIdPelatihanStatus(row.original.IdPelatihan);
    //               setSelectedStatus(row.original.Status);
    //               setIsOpenFormPublishedPelatihan(
    //                 !isOpenFormPublishedPelatihan
    //               );
    //             }}
    //             variant="outline"
    //             className="ml-auto border border-purple-600"
    //           >
    //             <TbBroadcast className="h-4 w-4 text-purple-600" />
    //           </Button>
    //         </>
    //         {/* <Button
    //           onClick={() => {
    //             if (row.original.MateriPelatihan.length === 0) {
    //               // Show the toast notification if MateriPelatihan is empty
    //               Toast.fire({
    //                 icon: "error",
    //                 title:
    //                   "Upload materi pelatihan terlebih dahulu, sobat elaut!",
    //               });
    //             } else {
    //               // Proceed with navigation if MateriPelatihan is not empty
    //               router.push(
    //                 `/admin/lemdiklat/pelatihan/${row.getValue(
    //                   "KodePelatihan"
    //                 )}/bank-soal/${row.getValue("IdPelatihan")}`
    //               );
    //             }
    //           }}
    //           variant="outline"
    //           className="ml-auto border border-gray-600"
    //         >
    //           <FiUploadCloud className="h-4 w-4 text-gray-600" />
    //         </Button> */}
    //         {row.original.SuratPemberitahuan !=
    //         "https://api-elaut.ikulatluh.cloud/public/static/suratPemberitahuan/" ? (
    //           <Link
    //             href={row.original.SuratPemberitahuan}
    //             target="_blank"
    //             className="ml-auto border border-gray-600  bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 h-9 px-4 py-2 rounded-md"
    //           >
    //             <LucideFileCheck2 className="h-4 w-4 text-gray-600" />
    //           </Link>
    //         ) : (
    //           <Button
    //             onClick={() => {
    //               setIsOpenFormSuratPemberitahuan(
    //                 !isOpenFormSuratPemberitahuan
    //               );
    //               setFileSuratPemberitahuan(row.original.SuratPemberitahuan);
    //               setSelectedId(row.original.IdPelatihan);
    //             }}
    //             variant="outline"
    //             className="ml-auto border border-gray-600"
    //           >
    //             <FiUploadCloud className="h-4 w-4 text-gray-600" />
    //           </Button>
    //         )}
    //       </div>
    //     </div>
    //   ),
    // },
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
        <Link href={`/admin/lemdiklat/pelatihan/detail/${row.original.KodePelatihan}/${row.original.IdPelatihan}`} className={`${"ml-0"} text-left capitalize bg-gray-100 cursor-pointer`}>
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
                    {convertDate(row.original.TanggalMulaiPelatihan)}{" "}
                  </span>
                  <span className="lowercase">s.d</span>{" "}
                  <span>
                    {" "}
                    {convertDate(row?.original?.TanggalBerakhirPelatihan)}
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
    // {
    //   accessorKey: "AsalPelatihan",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         className="p-0 !text-left w-[270px] flex items-center justify-start text-gray-900 font-semibold"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Realisasi
    //         <HiUserGroup className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div className={`${"ml-0"} text-left capitalize`}>
    //       {/* <p className="text-xs text-gray-400 leading-[100%]">
    //         {" "}
    //         Jenis, Harga, dan Realisasi Pelatihan
    //       </p>
    //       <p className="text-base font-semibold tracking-tight leading-[100%] mt-1">
    //         {row.original.HargaPelatihan == "0"
    //           ? "Gratis"
    //           : "Rp " + row.original.HargaPelatihan}{" "}
    //         • {row.original.JenisPelatihan}
    //       </p> */}

    //       <div className="w-full flex flex-col mt-1">
    //         {/* <span className="text-xs  font-medium capitalize leading-[100%] mb-1">
    //           Realisasi PNBP
    //         </span> */}
    //         <ChartContainer config={chartConfig}>
    //           <AreaChart
    //             accessibilityLayer
    //             data={chartData}
    //             margin={{
    //               left: 12,
    //               right: 12,
    //             }}
    //           >
    //             <CartesianGrid vertical={false} />
    //             <XAxis
    //               dataKey="month"
    //               tickLine={false}
    //               axisLine={false}
    //               tickMargin={8}
    //               tickFormatter={(value) => value.slice(0, 3)}
    //             />
    //             <ChartTooltip
    //               cursor={false}
    //               content={<ChartTooltipContent />}
    //             />
    //             <defs>
    //               <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
    //                 <stop
    //                   offset="5%"
    //                   stopColor="var(--color-desktop)"
    //                   stopOpacity={0.8}
    //                 />
    //                 <stop
    //                   offset="95%"
    //                   stopColor="var(--color-desktop)"
    //                   stopOpacity={0.1}
    //                 />
    //               </linearGradient>
    //               <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
    //                 <stop
    //                   offset="5%"
    //                   stopColor="var(--color-mobile)"
    //                   stopOpacity={0.8}
    //                 />
    //                 <stop
    //                   offset="95%"
    //                   stopColor="var(--color-mobile)"
    //                   stopOpacity={0.1}
    //                 />
    //               </linearGradient>
    //             </defs>
    //             <Area
    //               dataKey="mobile"
    //               type="natural"
    //               fill="url(#fillMobile)"
    //               fillOpacity={0.4}
    //               stroke="var(--color-mobile)"
    //               stackId="a"
    //             />
    //             <Area
    //               dataKey="desktop"
    //               type="natural"
    //               fill="url(#fillDesktop)"
    //               fillOpacity={0.4}
    //               stroke="var(--color-desktop)"
    //               stackId="a"
    //             />
    //           </AreaChart>
    //         </ChartContainer>
    //         {/* <p className="text-xs text-gray-400 capitalize">
    //           Rp.{" "}
    //           {row.original.UserPelatihan.length *
    //             parseInt(row.original.HargaPelatihan)}{" "}
    //           / Rp.{" "}
    //           {parseInt(row.original.KoutaPelatihan) *
    //             parseInt(row.original.HargaPelatihan)}
    //         </p> */}
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: "NoSertifikat",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Sertifikat
    //         <HiUserGroup className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div
    //       className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
    //     >
    //       <p className="text-xs text-gray-400 leading-[100%]">
    //         {" "}
    //         Penandatangan {row.original.TtdSertifikat}
    //       </p>

    //       <DialogTemplateSertifikatPelatihan pelatihan={data[row.index]}>
    //         <p className="text-base font-semibold cursor-pointer tracking-tight leading-[100%] mt-1">
    //           {row.original.NoSertifikat}
    //         </p>
    //       </DialogTemplateSertifikatPelatihan>
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: "MateriPelatihan",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         className="p-0 !text-left w-[270px] flex items-center justify-start text-gray-900 font-semibold"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Materi Pelatihan & Silabus
    //         <IoIosBook className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div className={`w-[200px] text-left capitalize`}>
    //       <div className="flex flex-col gap-1">
    //         <p className="text-xs text-gray-400 leading-[100%]">
    //           {" "}
    //           List Materi Pelatihan
    //         </p>
    //         <p className="text-xs font-medium text-gray-900 tracking-tight leading-[110%] mt-1">
    //           {row.original.MateriPelatihan.map((materi, index) => (
    //             <>
    //               <span>
    //                 {" "}
    //                 {index + 1}.{materi.NamaMateri};
    //               </span>
    //               <br />
    //             </>
    //           ))}
    //         </p>
    //       </div>

    //       <div className="flex flex-col w-[200px] gap-1 mt-2">
    //         <p className="text-xs text-gray-400 leading-[100%]">
    //           Silabus Pelatihan
    //         </p>
    //         <p className="text-xs font-medium text-gray-900 tracking-tight leading-[110%] mt-1">
    //           <a
    //             href={row.original.SilabusPelatihan}
    //             target="_blank"
    //             className="text-blue-500 underline lowercase"
    //             rel="noopener noreferrer"
    //             style={{ overflowWrap: "break-word" }}
    //           >
    //             {row.original.SilabusPelatihan}
    //           </a>
    //         </p>
    //       </div>
    //     </div>
    //   ),
    // },
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
      <AlertDialog
        open={openFormSertifikat}
        onOpenChange={setOpenFormSertifikat}
      >
        <AlertDialogContent>
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Penerbitan Sertifikat Pelatihan
              </AlertDialogTitle>
              <AlertDialogDescription className="-mt-2">
                Lampirkan Berita acara sebagai bukti pelaksanaan pelatihan yang
                telah selesai, tunggu proses approval dari pusat, dan dapatkan
                nomor sertifikat Pelatihanmu!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <fieldset>
              <div className="flex flex-wrap  mb-1 w-full">
                <div className="w-full">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="noSertifikat"
                  >
                    Sertifikat untuk Pelatihan{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="noSertifikat"
                    type="hidden"
                    className="form-input w-full text-black border-gray-300 rounded-md"
                    placeholder=""
                    value={selectedIdPelatihanSertifikat}
                    onChange={(e) =>
                      setSertifikatUntukPelatihan(
                        selectedIdPelatihanSertifikat.toString()
                      )
                    }
                    disabled
                    readOnly
                  />
                  <input
                    id="noSertifikat"
                    type="text"
                    className="form-input w-full text-black border-gray-300 rounded-md"
                    placeholder={
                      selectedNamaPelatihanSertifikat +
                      " - " +
                      selectedKodePelatihanSertifikat
                    }
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <div className="flex flex-wrap  mb-1 w-full">
                <div className="w-full">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="noSertifikat"
                  >
                    TTD Sertifikat <span className="text-red-600">*</span>
                  </label>
                  <select
                    name=""
                    id=""
                    onChange={(e) => setTtdSertifikat(e.target.value)}
                    className="w-full overflow-hidden rounded-lg border border-gray-300"
                  >
                    <option value={""}>Pilih Penandatangan</option>
                    <option
                      onClick={(e) =>
                        setTtdSertifikat(
                          "Kepala Badan Penyuluhan dan Pengembangan Sumber Daya Manusian Kelautan dan Perikanan"
                        )
                      }
                      value={
                        "Kepala Badan Penyuluhan dan Pengembangan Sumber Daya Manusian Kelautan dan Perikanan"
                      }
                    >
                      Kepala BPPSDM KP
                    </option>
                    <option
                      onClick={(e) =>
                        setTtdSertifikat(
                          "Kepala Pusat Pelatihan Kelautan dan Perikanan"
                        )
                      }
                      value={"Kepala Pusat Pelatihan Kelautan dan Perikanan"}
                    >
                      Kepala Pusat Pelatihan KP
                    </option>
                    <option
                      onClick={(e) =>
                        setTtdSertifikat(
                          "Kepala Balai Pelatihan dan Penyuluhan Perikanan"
                        )
                      }
                      value={"Kepala Balai Pelatihan dan Penyuluhan Perikanan"}
                    >
                      Kepala Balai Pelatihan
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 space-y-2">
                <label
                  className="block text-gray-800 text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  File Berita Acara <span className="text-red-600">*</span>
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col rounded-lg border-2 border-dashed w-full h-40 p-10 group text-center">
                    <div className="h-full w-full text-center flex flex-col items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      {beritaAcara == null ? (
                        <p className="pointer-none text-gray-500 text-sm">
                          <span className="text-sm">Drag and drop</span> files
                          here <br /> or{" "}
                          <a
                            href=""
                            id=""
                            className="text-blue-600 hover:underline"
                          >
                            select a file
                          </a>{" "}
                          from your computer
                        </p>
                      ) : (
                        <p className="pointer-none text-gray-500 text-sm">
                          {beritaAcara.name}
                        </p>
                      )}{" "}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                <span>File type: doc,pdf,types of images</span>
              </p>
            </fieldset>

            <p className="text-gray-700 text-xs mt-1">
              *File berita acara yang diupload dapat dilampirkan dengan contoh
              sebagai
              <Link
                href={
                  "https://drive.google.com/file/d/1_LXUE02cNIIuMeg6ejMcENVAA3JJH7TC/view?usp=sharing"
                }
                target="_blank"
                className="ml-1 text-blue-500 underline"
              >
                berikut
              </Link>
              , hal ini dilakukan untuk proses approval penerbitan sertifikat
              baik yang ditanda tangan oleh Kepala BPPSDM KP, Kepala Puslat KP,
              maupun Kepala Balai
            </p>
          </>
          <AlertDialogFooter>
            {!isUploading && (
              <AlertDialogCancel
                onClick={(e) => setOpenFormSertifikat(!openFormSertifikat)}
              >
                Cancel
              </AlertDialogCancel>
            )}
            <AlertDialogAction
              onClick={(e) =>
                handleGenerateSertifikat(selectedIdPelatihanSertifikat)
              }
              disabled={isUploading}
              className={`${isUploading && "px-6"}`}
            >
              {isUploading ? <span>Uploading...</span> : <span>Upload</span>}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isOpenFormPublishedPelatihan}
        onOpenChange={setIsOpenFormPublishedPelatihan}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publikasi ke Web E-LAUT</AlertDialogTitle>
            <AlertDialogDescription className="-mt-2">
              Agar pelatihan di balai/lemdiklat-mu dapat dilihat oleh masyarakat
              umum lakukan checklist agar tampil di website E-LAUT!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset>
            <form autoComplete="off">
              {selectedStatus == "Belum Publish" ? (
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
                      Informasi Kelas Pelatihanmu telah dipublikasikan melalui
                      laman Website E-LAUT balai mu!
                    </p>
                  </div>
                </div>
              )}
            </form>
          </fieldset>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) =>
                selectedStatus == "Belum Publish"
                  ? handleUpdatePublishPelatihanToELAUT(
                    selectedIdPelatihanStatus,
                    statusPelatihan
                  )
                  : handleUpdatePublishPelatihanToELAUT(
                    selectedIdPelatihanStatus,
                    "Belum Publish"
                  )
              }
            >
              {selectedStatus == "Publish" ? "Unpublish" : "Publsih"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={openFormTutupPelatihan}
        onOpenChange={setOpenFormTutupPelatihan}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Pelatihan Telah Selesai?</AlertDialogTitle>
            <AlertDialogDescription className="-mt-2">
              Jika Pelatihan di Lembaga atau Balai Pelatihanmu telah selesai,
              ubah status kelas-mu menjadi selesai, untuk dapat melanjutkan ke
              proses penerbitan sertifikat.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset>
            <form autoComplete="off" className="w-fit">
              {selectedStatusPelatihan != "Selesai" ? (
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-gray-300">
                  <div>
                    <Checkbox
                      id="publish"
                      onCheckedChange={(e) => setStatusPelatihan("Selesai")}
                    />
                  </div>
                  <div className="space-y-1 leading-none">
                    <label>Tutup Pelatihan</label>
                    <p className="text-xs leading-[110%] text-gray-600">
                      Dengan ini sebagai pihak lemdiklat saya menyatakan bahwa
                      pelatihan telah selesai dilaksanakan!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 border-gray-300">
                  <RiVerifiedBadgeFill className="h-7 w-7 text-green-500 text-lg" />
                  <div className="space-y-1 leading-none">
                    <label>Pelatihan Selesai</label>
                    <p className="text-xs leading-[110%] text-gray-600">
                      Kelas pelatihanmu telah ditutup atau selesai, kamu dapat
                      melanjutkan ke proses penerbitan sertifikat!
                    </p>
                  </div>
                </div>
              )}
            </form>
          </fieldset>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) =>
                selectedStatusPelatihan != "Selesai"
                  ? handleUpdateClosePelatihanELAUT(
                    selectedIdStatusPelatihan,
                    statusPelatihan
                  )
                  : null
              }
            >
              {selectedStatusPelatihan == "Selesai" ? "OK" : "Tutup"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isOpenFormMateri}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {" "}
              <FaBookOpen className="h-4 w-4" />
              Tambah Materi Pelatihan
            </AlertDialogTitle>
            <AlertDialogDescription className="-mt-2">
              Daftarkan materi pelatihan yang diselenggarakan yang nantinya akan
              tercantum pada sertifikat peserta pelatihan!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset>
            <form autoComplete="off">
              <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Upload File Excel Materi{" "}
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="file"
                      className=" text-black h-10 text-base flex items-center cursor-pointer w-full border border-neutral-200 rounded-md"
                      required
                      onChange={handleFileMateriChange}
                    />
                    <Link
                      target="_blank"
                      href={urlTemplateMateriPelatihan}
                      className="btn text-white bg-green-600 hover:bg-green-700 py-0 w-[250px] px-0 text-sm"
                    >
                      <PiMicrosoftExcelLogoFill />
                      Unduh Template
                    </Link>
                  </div>
                  <p className="text-gray-700 text-xs mt-1">
                    *Download template, input data sesuai format template lalu
                    upload
                  </p>
                </div>
              </div>

              <AlertDialogFooter className="mt-3">
                <AlertDialogCancel
                  onClick={(e) => setIsOpenFormMateri(!isOpenFormMateri)}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => handleUploadMateriPelatihan(selectedId)}
                >
                  Upload
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </fieldset>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isOpenFormSuratPemberitahuan}>
        <AlertDialogContent>
          <AlertDialogHeader className="flex gap-0 flex-col">
            <AlertDialogTitle className="flex items-center gap-2">
              {" "}
              <FiUploadCloud className="h-4 w-4" />
              Upload Surat Pemberitahuan
            </AlertDialogTitle>
            <AlertDialogDescription className="-mt-2">
              Dalam pelaksanaan pelatihan Pusat Pelatihan Kelautan dan Perikanan
              perlu tahu untuk pemberitahuan!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset>
            <form autoComplete="off">
              <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Upload Surat Pemberitahuan{" "}
                  </label>

                  <div className="flex gap-1">
                    <input
                      type="file"
                      className=" text-black h-10 text-base flex items-center cursor-pointer w-full border border-neutral-200 rounded-md"
                      required
                      onChange={handleSuratPemberitahuanChange}
                    />
                  </div>

                  <p className="text-gray-700 text-xs mt-1">
                    *Surat pemberitahuan yang diupload merupakan surat yang
                    sudah ditandatangani melalui portal dengan contoh seperti
                    <Link
                      href={
                        "https://drive.google.com/file/d/1Zzu6DRuaj_SwJ5Sk0XQfShtghA-HYT5F/view?usp=sharing"
                      }
                      target="_blank"
                      className="ml-1 text-blue-500 underline"
                    >
                      berikut
                    </Link>
                    , hal ini dilakukan untuk pengarsipan dan bahan bukti
                    penerbitan sertifikat nantinya!
                  </p>
                </div>
              </div>

              <AlertDialogFooter className="mt-3">
                <>
                  {" "}
                  {!isUploading && (
                    <AlertDialogCancel
                      onClick={(e) =>
                        setIsOpenFormSuratPemberitahuan(
                          !isOpenFormSuratPemberitahuan
                        )
                      }
                    >
                      Cancel
                    </AlertDialogCancel>
                  )}
                  <AlertDialogAction
                    onClick={(e) => handleUploadSuratPemberitahuan(selectedId)}
                    disabled={isUploading}
                    className={`${isUploading && "px-6"}`}
                  >
                    {isUploading ? (
                      <span>Uploading...</span>
                    ) : (
                      <span>Upload</span>
                    )}
                  </AlertDialogAction>
                </>
              </AlertDialogFooter>
            </form>
          </fieldset>
        </AlertDialogContent>
      </AlertDialog>

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
