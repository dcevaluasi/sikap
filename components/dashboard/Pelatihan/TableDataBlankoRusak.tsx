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
import Cookies from "js-cookie";
import Link from "next/link";
import { Blanko, BlankoKeluar } from "@/types/blanko";
import { generateTanggalPelatihan } from "@/utils/text";

const TableDataBlankoRusak: React.FC = () => {
  const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
    React.useState<boolean>(false);
  const [showCertificateSetting, setShowCertificateSetting] =
    React.useState<boolean>(false);

  const [keywordSuggestion, setKeywordSuggestion] = React.useState<string>("");
  const [suggestionsBlankoKeluar, setSuggestionsBlankoKeluar] = React.useState<
    BlankoKeluar[]
  >([]);
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<
    BlankoKeluar[]
  >([]);
  React.useEffect(() => {
    if (keywordSuggestion.trim() === "") {
      setFilteredSuggestions([]);
    } else {
      const filtered = suggestionsBlankoKeluar.filter((item: BlankoKeluar) =>
        item.NamaPelaksana.toLowerCase().includes(
          keywordSuggestion.toLowerCase()
        )
      );
      setFilteredSuggestions(filtered);
    }
  }, [keywordSuggestion, suggestionsBlankoKeluar]);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [data, setData] = React.useState<BlankoKeluar[]>([]);

  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const handleFetchingBlankoKeluar = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BLANKO_AKAPI_URL}/adminpusat/getBlankoKeluar`
      );
      setData(response.data.data);
      setSuggestionsBlankoKeluar(response.data.data);
      console.log({ response });
      setIsFetching(false);
    } catch (error) {
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
          <p className="text-sm text-dark leading-[100%]">
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
          <p className="text-sm text-dark leading-[100%]">
            {" "}
            {generateTanggalPelatihan(row.original.TanggalKeluar)}
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
            className="p-0 !text-left w-[300px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Asal Sekolah/Lemdiklat/Masyarakat
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
            {row.original.NamaLemdiklat}
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
          <p className="text-sm text-dark leading-[100%]">
            {" "}
            {row.original.NamaProgram}
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
          <p className="text-sm text-dark leading-[100%]">
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
            className="p-0 !text-left w-[250px] flex items-center justify-start text-gray-900 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tanggal Permohonan
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
            {generateTanggalPelatihan(row.original.TanggalPermohonan)}
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
          <p className="text-sm text-dark leading-[100%]">
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
          <p className="text-sm text-dark leading-[100%]">
            {" "}
            {row.original.JumlahPesertaLulus}
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
          <p className="text-sm text-dark leading-[100%]">
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
          <p className="text-sm text-dark leading-[100%]">
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
    //         className="text-sm text-dark leading-[100%]"
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
          <p className="text-sm text-dark leading-[100%]">
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
          <p className="text-sm text-dark leading-[100%]">
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
          <p className="text-sm text-dark leading-[100%]">
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
          <p className="text-sm text-dark leading-[100%]">
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
          <p className="text-sm text-dark leading-[100%]">
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
    handleFetchingBlankoKeluar();
  }, []);

  const [dataBlanko, setDataBlanko] = React.useState<Blanko[]>([]);

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
  const [tanggalKeluar, setTanggalKeluar] = React.useState<string>("");

  const [idBlankoKeluar, setIdBlankoKeluar] = React.useState<number>(0);
  const [tanggalBlankoRusak, setTanggalBlankoRusak] =
    React.useState<string>("");
  const [noSerialBlanko, setNoSerialBlanko] = React.useState<string>("");
  const [tipeBlanko, setTipeBlanko] = React.useState<string>("");
  const [keterangan, setKeterangan] = React.useState<string>("");
  const [fotoBlankoRusak, setFotoBlankoRusak] = React.useState<File | null>(
    null
  );
  const [previewBlankoRusak, setPreviewBlankoRusak] = useState<string | null>(
    null
  );

  const handleClearFormBlankoRusak = () => {
    setIdBlankoKeluar(0);
    setTanggalBlankoRusak("");
    setNoSerialBlanko("");
    setTipeBlanko("");
    setKeterangan("");
    setFotoBlankoRusak(null);
    setPreviewBlankoRusak(null);
  };

  const handleFotoBlankoRusakChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setFotoBlankoRusak(file);

        // Generate a preview URL
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewBlankoRusak(reader.result as string);
        };
        reader.readAsDataURL(file);

        console.log("Selected file:", file);
      } else {
        alert("Please select a valid image file.");
      }
    }
  };

  const handlePostBlankoRusak = async (e: any) => {
    e.preventDefault();

    const data = new FormData();
    data.append("IdBlankoKeluar", idBlankoKeluar.toString());
    data.append("NoSeri", noSerialBlanko);
    data.append("Tipe", tipeBlanko);
    data.append("Keterangan", namaPelaksana);
    data.append("TanggalRusak", tanggalBlankoRusak);

    if (fotoBlankoRusak != null) data.append("foto_blanko", fotoBlankoRusak);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BLANKO_AKAPI_URL}/adminPusat/addBlankoRusak`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF091")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleFetchingBlankoKeluar();
      handleClearFormBlankoRusak();
      console.log("RESPONSE POST BLANKO RUSAK : ", response);
      Toast.fire({
        icon: "success",
        title: `Berhasil mengupload riwayat blanko rusak di Pusat Pelatihan KP!`,
      });
      setIsOpenFormMateri(!isOpenFormMateri);
    } catch (error) {
      console.error("ERROR POST BLANKO : ", error);
      Toast.fire({
        icon: "error",
        title: `Gagal mengupload riwayat blanko rusak di Pusat Pelatihan KP!`,
      });
      handleFetchingBlankoKeluar();
      handleClearFormBlankoRusak();
      setIsOpenFormMateri(!isOpenFormMateri);
    }
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default  sm:px-7.5 xl:col-span-8">
      <AlertDialog open={isOpenFormMateri}>
        <AlertDialogContent className="max-w-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-left">
              {" "}
              <FaBookOpen className="h-4 w-4 hidden md:block" />
              Tambah Informasi Blanko Rusak
            </AlertDialogTitle>
            <AlertDialogDescription className="-mt-2 text-left">
              Untuk ketelusuran penggunaan blanko, dapat diinventaris terkait
              blanko rusak/tidak berlaku!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset>
            <form autoComplete="off">
              <div className="flex flex-wrap -mx-3 !text-sm">
                <div className="grid grid-cols-1 px-3 gap-2 mb-2 w-full">
                  <div className="w-full relative">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Penerbitan Sertifikat{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="name"
                      className="form-input w-full text-black border-gray-300 rounded-md leading-[120%] text-sm h-fit"
                      placeholder="Cari berdasarakan nama pelaksana"
                      required
                      value={keywordSuggestion}
                      onChange={(e) => setKeywordSuggestion(e.target.value)}
                    ></textarea>
                    {/* Render suggestions dropdown */}
                    {filteredSuggestions.length > 0 && (
                      <ul className="absolute bg-white border border-gray-300 rounded-md w-full max-h-40 overflow-y-auto mt-1 z-10">
                        {filteredSuggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => {
                              setKeywordSuggestion(
                                `${suggestion.NamaPelaksana} - ${suggestion.NamaProgram} - ${suggestion.TanggalPelaksanaan} - ${suggestion.NamaLemdiklat}`
                              );
                              setFilteredSuggestions([]);
                              setIdBlankoKeluar(suggestion.IdBlankoKeluar);
                            }}
                          >
                            {suggestion.NamaPelaksana} -{" "}
                            {suggestion.NamaProgram} -{" "}
                            {suggestion.TanggalPelaksanaan} -{" "}
                            {suggestion.NamaLemdiklat}
                          </li>
                        ))}
                      </ul>
                    )}
                    {isFetching && (
                      <p className="text-sm text-gray-500 mt-1">
                        Fetching suggestions...
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full px-3 mb-2">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Tanggal Kerusakan <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="date"
                    className="form-input w-full text-black border-gray-300 rounded-md"
                    placeholder="Tanggal Pelaksanaan"
                    required
                    value={tanggalBlankoRusak}
                    onChange={(e) => setTanggalBlankoRusak(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 px-3 gap-2 mb-2 w-full">
                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Tipe Blanko <span className="text-red-600">*</span>
                    </label>
                    <Select onValueChange={setTipeBlanko}>
                      <SelectTrigger className="w-full border-gray-300 rounded-md h-fit py-[0.65rem]">
                        <SelectValue placeholder="Tipe Blanko" />
                      </SelectTrigger>
                      <SelectContent className="z-[9999999]">
                        <SelectItem value="Certificate of Competence (CoC)">
                          Certificate of Competence (CoC)
                        </SelectItem>
                        <SelectItem value="Certificate of Proficiency (CoP)">
                          Certificate of Proficiency (CoP)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="noSerialBlanko"
                    >
                      No Serial Blanko <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="noSerialBlanko"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="No Serial Blanko"
                      required
                      value={noSerialBlanko}
                      onChange={(e) => setNoSerialBlanko(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 px-3 gap-2  w-full">
                  <div className="w-full relative">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="keterangan"
                    >
                      Keterangan <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="keterangan"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="Keterangan"
                      required
                      value={keterangan}
                      onChange={(e) => setKeterangan(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="grid grid-cols-1 px-3 gap-2 mb-2 w-full">
                  {/* {previewBlankoRusak && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Preview:</p>
                      <img
                        src={previewBlankoRusak}
                        alt="Preview"
                        className="w-30 cursor-pointer h-fit object-cover border border-gray-300 rounded-md"
                      />
                    </div>
                  )} */}
                  <div className="w-full relative">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="fotoBlankoRusak"
                    >
                      Foto Blanko Rusak <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      className="w-full border border-gray-300 rounded-md"
                      accept="image/*"
                      capture="environment" // Use "user" for the front camera
                      onChange={handleFotoBlankoRusakChange}
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
                <AlertDialogAction onClick={(e) => handlePostBlankoRusak(e)}>
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
          <div className="flex flex-wrap items-center mb-3 justify-between gap-3 sm:flex-nowrap">
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
                      .filter(
                        (item: BlankoKeluar) =>
                          item.TipeBlanko === "Certificate of Proficiency (CoP)"
                      )
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
                      .filter(
                        (item: BlankoKeluar) =>
                          item.TipeBlanko === "Certificate of Competence (CoC)"
                      )
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

          <div>
            <div id="chartOne" className="-ml-5"></div>
            <div className="flex w-full items-center mb-2">
              {/* <div className="flex w-full gap-1 items-start">
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
              </div> */}

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

export default TableDataBlankoRusak;
