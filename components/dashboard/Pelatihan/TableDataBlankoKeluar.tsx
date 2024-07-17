import React, { ReactElement, useState } from "react";
import TableData from "../Tables/TableData";

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
import { HiMiniUserGroup, HiUserGroup } from "react-icons/hi2";
import {
  TbBook,
  TbBookFilled,
  TbBroadcast,
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
import { PiMicrosoftExcelLogoFill, PiStampLight } from "react-icons/pi";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { FaBookOpen, FaRupiahSign } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { convertDate } from "@/utils";
import Cookies from "js-cookie";
import Link from "next/link";
import { Blanko, BlankoKeluar } from "@/types/blanko";

const TableDataBlankoKeluar: React.FC = () => {
  const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
    React.useState<boolean>(false);
  const [showCertificateSetting, setShowCertificateSetting] =
    React.useState<boolean>(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [data, setData] = React.useState<BlankoKeluar[]>([]);

  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const handleFetchingBlanko = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BLANKO_AKAPI_URL}/adminpusat/getBlankoKeluar`
      );
      console.log("RESPONSE BLANKO KELUAR : ", response);
      setData(response.data.data);

      setIsFetching(false);
    } catch (error) {
      console.error("ERROR BLANKO KELUAR : ", error);
      setIsFetching(false);
      throw error;
    }
  };

  const handleDeletingBlankoKeluar = async (id: number) => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.delete(
        `${process.env.NEXT_PUBLIC_BLANKO_AKAPI_URL}/adminpusat/deleteBlankoKeluar?id=${id}`
      );
      console.log("DELETE BLANKO KELUAR : ", response);
      handleFetchingBlanko();
      setIsFetching(false);
    } catch (error) {
      console.error("ERROR DELETE BLANKO KELUAR : ", error);
      handleFetchingBlanko();
      setIsFetching(false);
      throw error;
    }
  };

  const [isOpenFormMateri, setIsOpenFormMateri] =
    React.useState<boolean>(false);

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

  const router = useRouter();
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns: ColumnDef<BlankoKeluar>[] = [
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
      accessorKey: "NoSertifikat",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tipe Blanko
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-xs text-gray-400 leading-[100%]">
            {" "}
            {row.original.TipeBlanko}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "TanggalKeluar",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tanggal Keluar
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-xs text-gray-400 leading-[100%]">
            {" "}
            {row.original.TanggalKeluar}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "NamaLemdiklat",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Lemdiklat
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-xs text-gray-400 leading-[100%]">
            {" "}
            {row.original.NamaLemdiklat}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "NamaPelaksana",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Pelaksana
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-xs text-gray-400 leading-[100%]">
            {" "}
            {row.original.NamaPelaksana}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "TanggalPermohonan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tanggal Permohonan <br />
            Blanko Kosong/Pencetakan
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-xs text-gray-400 leading-[100%]">
            {" "}
            {row.original.TanggalPermohonan}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "LinkPermohonan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Link Permohonan
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"}  text-left flex flex-wrap flex-col`}>
          <p className="text-xs text-blue-500 underline leading-[100%] ">
            {" "}
            {row.original.LinkPermohonan}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "NamaProgram",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Program
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-xs text-gray-400 leading-[100%]">
            {" "}
            {row.original.NamaProgram}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "TanggalPelaksanaan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tanggal Pelaksanaan
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-xs text-gray-400 leading-[100%]">
            {" "}
            {row.original.TanggalPelaksanaan}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "JumlahPesertaLulus",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Jumlah Peserta Lulus
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-xs text-gray-400 leading-[100%]">
            {" "}
            {row.original.JumlahPesertaLulus}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "JumlahBlankoDiajukan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Jumlah Blanko Diajukan
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-xs text-gray-400 leading-[100%]">
            {" "}
            {row.original.JumlahBlankoDiajukan}
          </p>
        </div>
      ),
    },

    {
      accessorKey: "NoSeriBlanko",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No Seri Blanko
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-xs text-gray-400 leading-[100%]">
            {" "}
            {row.original.NoSeriBlanko}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "Status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-xs text-gray-400 leading-[100%]">
            {" "}
            {row.original.Status}
          </p>
        </div>
      ),
    },
    // {
    //   accessorKey: "IsSd",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Sertifikat Digital <br /> Sudah Diterbitkan
    //         <HiUserGroup className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div
    //       className={`${"ml-0"}  text-left flex flex-wrap flex-col lowercase text-blue-500 underline`}
    //     >
    //       <Link
    //         href={row.original.IsSd}
    //         className="text-xs text-gray-400 leading-[100%]"
    //       >
    //         {" "}
    //         {row.original.IsSd}
    //       </Link>
    //     </div>
    //   ),
    // },
    {
      accessorKey: "IsCetak",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Sertifikat Yang Dicetak
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-xs text-gray-400 leading-[100%]">
            {" "}
            {row.original.IsCetak}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "TipePengambilan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tipe Pengambilan
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-xs text-gray-400 leading-[100%]">
            {" "}
            {row.original.TipePengambilan}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "PetugasYangMenerima",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Petugas Yang Menerima
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-xs text-gray-400 leading-[100%]">
            {" "}
            {row.original.PetugasYangMenerima}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "PetugasYangMemberi",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Petugas Yang Memberi
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-xs text-gray-400 leading-[100%]">
            {" "}
            {row.original.PetugasYangMemberi}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "LinkDataDukung",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Sertifikat Digital <br /> Sudah Diterbitkan
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col text-blue-500`}
        >
          <Link
            href={row.original.LinkDataDukung}
            className="text-xs text-blue-500 underline leading-[100%]"
          >
            {" "}
            {row.original.LinkDataDukung}
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "Keterangan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Keterangan
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-xs text-gray-400 leading-[100%]">
            {" "}
            {row.original.Keterangan}
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
    handleFetchingBlanko();
    handleFetchingBlankoMaster();
  }, []);

  const handleFetchingBlankoMaster = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BLANKO_AKAPI_URL}/adminpusat/getBlanko`
      );
      console.log("RESPONSE BLANKO : ", response);
      setDataBlanko(response.data.data);

      setIsFetching(false);
    } catch (error) {
      console.error("ERROR BLANKO : ", error);
      setIsFetching(false);
      throw error;
    }
  };

  const [dataBlanko, setDataBlanko] = React.useState<Blanko[]>([]);

  const [tipeBlanko, setTipeBlanko] = React.useState<string>("");
  const [idBlanko, setIdBlanko] = React.useState<string>("");
  const [namaLemdiklat, setNamaLemdiklat] = React.useState<string>("");
  const [namaPelaksana, setNamaPelaksana] = React.useState<string>("");
  const [tanggalPermohonan, setTanggalPermohonan] = React.useState<string>("");
  const [linkPermohonan, setLinkPermohonan] = React.useState<string>("");
  const [namaProgram, setNamaProgram] = React.useState<string>("");
  const [tanggalPelaksanaan, setTanggalPelaksanaan] =
    React.useState<string>("");
  const [jumlahPesertaLulus, setJumlahPesertaLulus] =
    React.useState<string>("");
  const [jumlahBlankoDiajukan, setJumlahBlankoDiajukan] =
    React.useState<string>("");
  const [jumlahBlankoDisetujui, setJumlahBlankoDisetujui] =
    React.useState<string>("");
  const [noSeriBlanko, setNoSeriBlanko] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");
  const [isSd, setIsSd] = React.useState<string>("");
  const [isCetak, setIsCetak] = React.useState<string>("");
  const [tipePengambilan, setTipePengambilan] = React.useState<string>("");
  const [petugasYangMenerima, setPetugasYangMenerima] =
    React.useState<string>("");
  const [petugasYangMemberi, setPetugasYangMemberi] =
    React.useState<string>("");
  const [linkDataDukung, setLinkDataDukung] = React.useState<string>("");
  const [keterangan, setKeterangan] = React.useState<string>("");

  const handlePostBlanko = async (e: any) => {
    e.preventDefault();

    const data = new FormData();
    data.append("TipeBlanko", tipeBlanko);
    data.append("IdBlanko", idBlanko);
    data.append("NamaLemdiklat", namaLemdiklat);
    data.append("NamaPelaksana", namaPelaksana);
    data.append("TipeBlanko", tipeBlanko);
    data.append("TanggalPermohonan", tanggalPermohonan);
    data.append("LinkPermohonan", linkPermohonan);
    data.append("NamaProgram", namaProgram);
    data.append("TanggalPelaksanaan", tanggalPelaksanaan);
    data.append("JumlahPesertaLulus", jumlahPesertaLulus);
    data.append("JumlahBlankoDiajukan", jumlahBlankoDiajukan);
    data.append("JumlahBlankoDisetujui", jumlahBlankoDisetujui);
    data.append("NoSeriBlanko", noSeriBlanko);
    data.append("Status", status);
    data.append("IsSd", isSd);
    data.append("IsCetak", isCetak);
    data.append("TipePengambilan", tipePengambilan);
    data.append("PetugasYangMenerima", petugasYangMenerima);
    data.append("PetugasYangMemberi", petugasYangMemberi);
    data.append("LinkDataDukung", linkDataDukung);
    data.append("Keterangan", keterangan);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BLANKO_AKAPI_URL}/adminPusat/addBlankoKeluar`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF091")}`,
          },
        }
      );
      handleFetchingBlanko();
      console.log("RESPONSE POST BLANKO : ", response);
      Toast.fire({
        icon: "success",
        title: `Berhasil mengupload riwayat blanko keluar di Pusat Pelatihan KP!`,
      });
      setIsOpenFormMateri(!isOpenFormMateri);
    } catch (error) {
      console.error("ERROR POST BLANKO : ", error);
      Toast.fire({
        icon: "error",
        title: `Gagal mengupload riwayat blanko keluar di Pusat Pelatihan KP!`,
      });
      handleFetchingBlanko();
      setIsOpenFormMateri(!isOpenFormMateri);
    }
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default  sm:px-7.5 xl:col-span-8">
      <AlertDialog open={isOpenFormMateri}>
        <AlertDialogContent className="max-w-4xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {" "}
              <FaBookOpen className="h-4 w-4" />
              Tambah Informasi Blanko Keluar
            </AlertDialogTitle>
            <AlertDialogDescription className="-mt-2">
              Input data pengadaan blanko agar dapat mendapatkan ketelusuran
              dari blanko yang ada di Puslat dan telah digunakan berapa!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset>
            <form autoComplete="off">
              <div className="flex flex-wrap -mx-3 mb-1">
                <div className="flex px-3 gap-2 mb-2 w-full">
                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Tipe Blanko <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="name"
                      className="form-input w-full text-black text-sm border-gray-300 rounded-md"
                      placeholder="Tipe Blanko"
                      required
                      value={tipeBlanko}
                      onChange={(e) => setTipeBlanko(e.target.value)}
                    >
                      <option value="0">Pilih Tipe Blanko</option>
                      <option value="CoP">CoP (Certificate of Profecy)</option>
                      <option value="CoC">
                        CoC (Certificate of Competence)
                      </option>
                    </select>
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Blanko Pengadaan <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="name"
                      className="form-input w-full text-sm text-black border-gray-300 rounded-md"
                      placeholder="Tipe Blanko"
                      required
                      value={idBlanko}
                      onChange={(e) => setIdBlanko(e.target.value)}
                    >
                      <option value="0">Pilih Blanko Pengadaan</option>
                      {dataBlanko.map((data, index) => (
                        <option key={index} value={data.IdBlanko}>
                          {data.TanggalPengadaan} -{data.NoSeri}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Nama Lemdiklat <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="Nama Lemdiklat"
                      required
                      value={namaLemdiklat}
                      onChange={(e) => setNamaLemdiklat(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Nama Pelaksana <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="Nama Pelaksana"
                      required
                      value={namaPelaksana}
                      onChange={(e) => setNamaPelaksana(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex px-3 gap-2 mb-2 w-full">
                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Tanggal Permohonan <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="date"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="Tipe Blanko"
                      required
                      value={tanggalPermohonan}
                      onChange={(e) => setTanggalPermohonan(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Link Permohonan <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="Link Permohonan"
                      required
                      value={linkPermohonan}
                      onChange={(e) => setLinkPermohonan(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Nama Program <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="Nama Program"
                      required
                      value={namaProgram}
                      onChange={(e) => setNamaProgram(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Tanggal Pelaksanaan{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="date"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder=""
                      required
                      value={tanggalPelaksanaan}
                      onChange={(e) => setTanggalPelaksanaan(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex px-3 gap-2 mb-2 w-full">
                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Jumlah Peserta Lulus{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="0"
                      required
                      value={jumlahPesertaLulus}
                      onChange={(e) => setJumlahPesertaLulus(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Jumlah Blanko Diajukan{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="0"
                      required
                      value={jumlahBlankoDiajukan}
                      onChange={(e) => setJumlahBlankoDiajukan(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Jumlah Blanko Disetujui
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="0"
                      required
                      value={jumlahBlankoDisetujui}
                      onChange={(e) => setJumlahBlankoDisetujui(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      No Seri Blanko <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="No Seri Blanko"
                      required
                      value={noSeriBlanko}
                      onChange={(e) => setNoSeriBlanko(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex px-3 gap-2 mb-2 w-full">
                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Status <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="Status"
                      required
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Tipe Pengambilan <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="Tipe Pengambilan"
                      required
                      value={tipePengambilan}
                      onChange={(e) => setTipePengambilan(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Petugas Yang Menerima{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="Petugas Yang Menerima"
                      required
                      value={petugasYangMenerima}
                      onChange={(e) => setPetugasYangMenerima(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Petugas Yang Memberi{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="Petugas Yang Memberi"
                      required
                      value={petugasYangMemberi}
                      onChange={(e) => setPetugasYangMemberi(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex px-3 gap-2 mb-2 w-full">
                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Link Data Dukung <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="Lihat Data Dukung"
                      required
                      value={linkDataDukung}
                      onChange={(e) => setLinkDataDukung(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Keterangan <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="Keterangan"
                      required
                      value={keterangan}
                      onChange={(e) => setKeterangan(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <AlertDialogFooter className="mt-3">
                <AlertDialogCancel
                  onClick={(e) => setIsOpenFormMateri(!isOpenFormMateri)}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={(e) => handlePostBlanko(e)}>
                  Upload
                </AlertDialogAction>
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
                  <p className="font-semibold text-primary">Total Blanko</p>
                  <p className="text-sm font-medium">
                    {data.reduce(
                      (total, item) => total + item.JumlahBlankoDisetujui,
                      0
                    )}{" "}
                    blanko
                  </p>
                </div>
              </div>
              <div className="flex min-w-47.5">
                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                  <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
                </span>
                <div className="w-full">
                  <p className="font-semibold text-secondary">
                    Total Blanko CoP
                  </p>
                  <p className="text-sm font-medium">
                    {data
                      .filter((item: BlankoKeluar) => item.TipeBlanko === "CoP")
                      .reduce(
                        (total: number, item: BlankoKeluar) =>
                          total + item.JumlahBlankoDisetujui,
                        0
                      )}{" "}
                    blanko
                  </p>
                </div>
              </div>
              <div className="flex min-w-47.5">
                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                  <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-green-400"></span>
                </span>
                <div className="w-full">
                  <p className="font-semibold text-green-400">
                    Total Blanko CoC
                  </p>
                  <p className="text-sm font-medium">
                    {data
                      .filter((item: BlankoKeluar) => item.TipeBlanko === "CoC")
                      .reduce(
                        (total: number, item: BlankoKeluar) =>
                          total + item.JumlahBlankoDisetujui,
                        0
                      )}{" "}
                    blanko
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
                  <SelectTrigger className="w-[140px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                    <div className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer">
                      <TbChartBubble /> Jenis Blanko
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="pendaftaran">CoP</SelectItem>
                      <SelectItem value="pelaksanaan">CoC</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[190px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                    <div className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer">
                      <TbBroadcast />
                      Tanggal Pengadaan
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
                  onClick={(e) => setIsOpenFormMateri(!isOpenFormMateri)}
                  className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
                >
                  <FiUploadCloud />
                  Tambah Data Blanko
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

export default TableDataBlankoKeluar;
