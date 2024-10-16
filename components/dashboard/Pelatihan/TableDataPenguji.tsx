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
import { DewanPenguji } from "@/types/dewanPenguji";

import { generateTanggalPelatihan } from "@/utils/text";

const TableDataDewanenguji: React.FC = () => {
  const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
    React.useState<boolean>(false);
  const [showCertificateSetting, setShowCertificateSetting] =
    React.useState<boolean>(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [data, setData] = React.useState<DewanPenguji[]>([]);

  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const token = Cookies.get("XSRF095");
  const HandleGetDataPenguji = async () => {
    setIsFetching(true);
    try {
      //const token = await _secureStorage.read(key: 'token'); // Replace this with how you retrieve the token
  
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/adminpusat/getDataPenguji`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token in Authorization header
          },
        }
      );
  
      console.log("RESPONSE Data Penguji ", response);
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
      HandleGetDataPenguji();
      setIsFetching(false);
    } catch (error) {
      console.error("ERROR DELETE BLANKO KELUAR : ", error);
      HandleGetDataPenguji();
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
  const columns: ColumnDef<DewanPenguji>[] = [
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
        accessorKey: "Foto",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Foto
              <HiUserGroup className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="text-left capitalize">
            <img
              src={row.original.Foto}
              alt="Foto"
              className="w-16 h-16 object-cover rounded-full"
            />
          </div>
        ),
      },
    {
      accessorKey: "NamaUsersDpkakp",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama 
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-sm text-dark leading-[100%]">
            {" "}
            {row.original.NamaUsersDpkakp}
          </p>
        </div>
      ),
    },

    {
      accessorKey: "TypeDpkapk",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Type DPKAKP
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-sm text-dark leading-[100%]">
            {" "}
            {generateTanggalPelatihan(row.original.TypeDpkapk)}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "Nik",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[300px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nik
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-sm text-dark leading-[100%]">
            {" "}
            {row.original.Nik}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "Alamat",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Alamat
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-sm text-dark leading-[100%]">
            {" "}
            {row.original.Alamat}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "Provinsi",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
           Provinsi
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-sm text-dark leading-[100%]">
            {" "}
            {row.original.Provinsi}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "Cities",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[250px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Kota/Kab
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-sm text-dark leading-[100%]">
            {" "}
            {row.original.Cities}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "Ijazah",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ijazah
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"}  text-left flex flex-wrap flex-col`}>
          <p className="text-xs text-blue-500 underline leading-[100%] ">
            {" "}
            {row.original.Ijazah}
          </p>
        </div>
      ),
    },

    {
      accessorKey: "Nip",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nip
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-sm text-dark leading-[100%]">
            {" "}
            {row.original.Nip}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "AsalInstansi",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Asal Instansi
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-sm text-dark leading-[100%]">
            {" "}
            {row.original.AsalInstansi}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "NomorTelpon",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nomor Telpon
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-sm text-dark leading-[100%]">
            {" "}
            {row.original.NomorTelpon}
          </p>
        </div>
      ),
    },

    {
      accessorKey: "Email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-sm text-dark leading-[100%]">
            {" "}
            {row.original.Email}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "Jabatan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Jabatan
            <HiUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
        >
          <p className="text-sm text-dark leading-[100%]">
            {" "}
            {row.original.Jabatan}
          </p>
        </div>
      ),
    },
    {
        accessorKey: "Golongan",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Golongan
              <HiUserGroup className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="text-left capitalize">
            <p className="text-sm text-dark">{row.original.Golongan}</p>
          </div>
        ),
      },
      {
        accessorKey: "Pendidikan",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Pendidikan
              <HiUserGroup className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="text-left capitalize">
            <p className="text-sm text-dark">{row.original.Pendidikan}</p>
          </div>
        ),
      },
      {
        accessorKey: "TipeKeahlian",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Tipe Keahlian
              <HiUserGroup className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="text-left capitalize">
            <p className="text-sm text-dark">{row.original.TipeKeahlian}</p>
          </div>
        ),
      },
      
      {
        accessorKey: "PengalamanBerlayar",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Pengalaman Berlayar
              <HiUserGroup className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="text-left capitalize">
            <p className="text-sm text-dark">{row.original.PengalamanBerlayar}</p>
          </div>
        ),
      },
      {
        accessorKey: "Ijazah",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Ijazah
              <HiUserGroup className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className={`${"ml-0"}  text-left flex flex-wrap flex-col`}>
            <p className="text-xs text-blue-500 underline leading-[100%] ">
              {" "}
              {row.original.Ijazah}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "SertifikatKeahlian",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Sertifikat Keahlian
              <HiUserGroup className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className={`${"ml-0"}  text-left flex flex-wrap flex-col`}>
            <p className="text-xs text-blue-500 underline leading-[100%] ">
              {" "}
              {row.original.SertifikatKeahlian}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "SertifikatTot",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Sertifikat Tot
              <HiUserGroup className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className={`${"ml-0"}  text-left flex flex-wrap flex-col`}>
            <p className="text-xs text-blue-500 underline leading-[100%] ">
              {" "}
              {row.original.SertifikatTot}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "SertifikatToe",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Sertifikat Toe
              <HiUserGroup className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className={`${"ml-0"}  text-left flex flex-wrap flex-col`}>
            <p className="text-xs text-blue-500 underline leading-[100%] ">
              {" "}
              {row.original.SertifikatToe}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "SertifikatToeSimulator",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Sertifikat Toe Simulator
              <HiUserGroup className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className={`${"ml-0"}  text-left flex flex-wrap flex-col`}>
            <p className="text-xs text-blue-500 underline leading-[100%] ">
              {" "}
              {row.original.SertifikatToeSimulator}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "SerifikatAuditor",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Sertifikat Auditor
              <HiUserGroup className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className={`${"ml-0"}  text-left flex flex-wrap flex-col`}>
            <p className="text-xs text-blue-500 underline leading-[100%] ">
              {" "}
              {row.original.SerifikatAuditor}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "SertifikatLainnya",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Sertifikat Lainnya
              <HiUserGroup className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className={`${"ml-0"}  text-left flex flex-wrap flex-col`}>
            <p className="text-xs text-blue-500 underline leading-[100%] ">
              {" "}
              {row.original.SertifikatLainnya}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "BukuPelaut",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Buku Pelaut
              <HiUserGroup className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className={`${"ml-0"}  text-left flex flex-wrap flex-col`}>
            <p className="text-xs text-blue-500 underline leading-[100%] ">
              {" "}
              {row.original.BukuPelaut}
            </p>
          </div>
        ),
      },
      
      // Continue in the same way for the other fields like SertifikatKeahlian, SertifikatTot, SertifikatToe, etc.
      
  
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
    HandleGetDataPenguji();
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

  const [dataBlanko, setDataBlanko] = React.useState<DewanPenguji[]>([]);

 
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default  sm:px-7.5 xl:col-span-8">

        

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

  );
};

export default TableDataDewanenguji;
