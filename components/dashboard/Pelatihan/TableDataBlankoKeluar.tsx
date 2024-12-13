import React from "react";
import TableData from "../Tables/TableData";

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
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HiMiniUserGroup, HiUserGroup } from "react-icons/hi2";
import { TbChartBubble } from "react-icons/tb";

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

const TableDataBlankoKeluar: React.FC = () => {
  const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
    React.useState<boolean>(false);
  const [showCertificateSetting, setShowCertificateSetting] =
    React.useState<boolean>(false);

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
      accessorKey: "TipeBlanko",
      meta: {
        filterVariant: "select",
      },
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
    // {
    //   accessorKey: "Status",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Status
    //         <HiUserGroup className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div
    //       className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
    //     >
    //       <p className="text-sm text-dark leading-[100%]">
    //         {" "}
    //         {row.original.Status}
    //       </p>
    //     </div>
    //   ),
    // },
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
    // {
    //   accessorKey: "PetugasYangMenerima",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Petugas Yang Menerima
    //         <HiUserGroup className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div
    //       className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
    //     >
    //       <p className="text-sm text-dark leading-[100%]">
    //         {" "}
    //         {row.original.PetugasYangMenerima}
    //       </p>
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: "PetugasYangMemberi",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Petugas Yang Memberi
    //         <HiUserGroup className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div
    //       className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
    //     >
    //       <p className="text-sm text-dark leading-[100%]">
    //         {" "}
    //         {row.original.PetugasYangMemberi}
    //       </p>
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: "LinkDataDukung",
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
    //       className={`${"ml-0"}  text-left flex flex-wrap flex-col text-blue-500`}
    //     >
    //       <Link
    //         href={row.original.LinkDataDukung}
    //         className="text-xs text-blue-500 underline leading-[100%]"
    //       >
    //         {" "}
    //         {row.original.LinkDataDukung}
    //       </Link>
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: "Keterangan",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         className="p-0 !text-left w-[200px] flex items-center justify-start text-gray-900 font-semibold"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Keterangan
    //         <HiUserGroup className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div
    //       className={`${"ml-0"}  text-left flex flex-wrap flex-col capitalize`}
    //     >
    //       <p className="text-sm text-dark leading-[100%]">
    //         {" "}
    //         {row.original.Keterangan}
    //       </p>
    //     </div>
    //   ),
    // },
  ];

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
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
  const [tanggalKeluar, setTanggalKeluar] = React.useState<string>("");
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
    data.append("TanggalKeluar", tanggalKeluar);
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

  const [selectedTipeBlanko, setSelectedTipeBlanko] =
    React.useState<string>("");

  React.useEffect(() => {
    if (selectedTipeBlanko) {
      setColumnFilters([
        {
          id: "TipeBlanko",
          value: selectedTipeBlanko,
        },
      ]);
    } else {
      setColumnFilters([]); // Clear filters when no selection
    }
  }, [selectedTipeBlanko]);

  console.log({ selectedTipeBlanko });

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-8">
      <AlertDialog open={isOpenFormMateri}>
        <AlertDialogContent className="max-w-5xl">
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
                <div className="grid grid-cols-4 px-3 gap-2 mb-2 w-full">
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
                      htmlFor="name"
                    >
                      Pengadaan Blanko <span className="text-red-600">*</span>
                    </label>
                    <Select onValueChange={setIdBlanko}>
                      <SelectTrigger className="w-full border-gray-300 rounded-md h-fit py-[0.65rem]">
                        <SelectValue placeholder="Pengadaan Blanko" />
                      </SelectTrigger>
                      <SelectContent className="z-[9999999]">
                        {dataBlanko.map((data, index) => (
                          <SelectItem
                            key={index}
                            value={data.IdBlanko.toString()}
                          >
                            ({generateTanggalPelatihan(data.TanggalPengadaan)}){" "}
                            <span className="font-semibold">{data.NoSeri}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Pelaksana Ujian/Diklat{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <Select onValueChange={setNamaPelaksana}>
                      <SelectTrigger className="w-full border-gray-300 rounded-md h-fit py-[0.65rem]">
                        <SelectValue placeholder="Pelaksana Ujian/Diklat" />
                      </SelectTrigger>
                      {tipeBlanko == "Certificate of Competence (CoC)" && (
                        <SelectContent className="z-[9999999]">
                          <SelectItem value="PUKAKP I (Aceh)">
                            PUKAKP I (Aceh)
                          </SelectItem>
                          <SelectItem value="PUKAKP II (BPPP Medan)">
                            PUKAKP II (BPPP Medan)
                          </SelectItem>
                          <SelectItem value="PUKAKP III (Lampung)">
                            PUKAKP III (Lampung)
                          </SelectItem>
                          <SelectItem value="PUKAKP IV (Poltek AUP)">
                            PUKAKP IV (Poltek AUP)
                          </SelectItem>
                          <SelectItem value="PUKAKP V (BPPP Tegal)">
                            PUKAKP V (BPPP Tegal)
                          </SelectItem>
                          <SelectItem value="PUKAKP VI (SUPM Tegal)">
                            PUKAKP VI (SUPM Tegal)
                          </SelectItem>
                          <SelectItem value="PUKAKP VII (BPPP Banyuwangi)">
                            PUKAKP VII (BPPP Banyuwangi)
                          </SelectItem>
                          <SelectItem value="PUKAKP VIII (Poltek KP Kupang)">
                            PUKAKP VIII (Poltek KP Kupang)
                          </SelectItem>
                          <SelectItem value="PUKAKP IX (SUPM Pontianak)">
                            PUKAKP IX (SUPM Pontianak)
                          </SelectItem>
                          <SelectItem value="PUKAKP X (BPPP Bitung)">
                            PUKAKP X (BPPP Bitung)
                          </SelectItem>
                          <SelectItem value="PUKAKP XI (Poltek KP Bitung)">
                            PUKAKP XI (Poltek KP Bitung)
                          </SelectItem>
                          <SelectItem value="PUKAKP XII (Poltek KP Bone)">
                            PUKAKP XII (Poltek KP Bone)
                          </SelectItem>
                          <SelectItem value="PUKAKP XIII (BPPP Ambon)">
                            PUKAKP XIII (BPPP Ambon)
                          </SelectItem>
                          <SelectItem value="PUKAKP XIV (SUPM Ambon)">
                            PUKAKP XIV (SUPM Ambon)
                          </SelectItem>
                          <SelectItem value="PUKAKP XV (Poltek KP Sorong)">
                            PUKAKP XV (Poltek KP Sorong)
                          </SelectItem>
                          <SelectItem value="PUKAKP XVI (SUPM Sorong)">
                            PUKAKP XVI (SUPM Sorong)
                          </SelectItem>
                          <SelectItem value="PUKAKP XVII (Poltek KP Dumai)">
                            PUKAKP XVII (Poltek KP Dumai)
                          </SelectItem>
                          <SelectItem value="BPPP Tegal">BPPP Tegal</SelectItem>
                        </SelectContent>
                      )}

                      {tipeBlanko == "Certificate of Proficiency (CoP)" && (
                        <SelectContent className="z-[9999999]">
                          <SelectItem value="BPPP Medan">BPPP Medan</SelectItem>
                          <SelectItem value="BPPP Tegal">BPPP Tegal</SelectItem>
                          <SelectItem value="BPPP Banyuwangi">
                            BPPP Banyuwangi
                          </SelectItem>
                          <SelectItem value="BPPP Bitung">
                            BPPP Bitung
                          </SelectItem>
                          <SelectItem value="BPPP Ambon">BPPP Ambon</SelectItem>
                          <SelectItem value="SUPM Pontianak">
                            SUPM Pontianak
                          </SelectItem>
                          <SelectItem value="Politeknik AUP Jakarta">
                            Politeknik AUP Jakarta
                          </SelectItem>
                          <SelectItem value="PPN Pekalongan">
                            PPN Pekalongan
                          </SelectItem>
                          <SelectItem value="PPP Sebatik">
                            PPP Sebatik
                          </SelectItem>
                          <SelectItem value="PPN Brondong">
                            PPN Brondong
                          </SelectItem>
                          <SelectItem value="BBPI Semarang">
                            BBPI Semarang
                          </SelectItem>
                          <SelectItem value="PPN Pemangkat">
                            PPN Prigi
                          </SelectItem>
                          <SelectItem value="PPN Prigi">
                            Pelabuhan Perikanan Nusantara (PPN) Pemangkat
                          </SelectItem>
                          <SelectItem value="PPN Palabuhan Ratu">
                            Pelabuhan Perikanan Nusantara (PPN) Palabuhan Ratu
                          </SelectItem>
                          <SelectItem value="PPP Untia">
                            Pelabuhan Perikanan Perintis (PPP) Untia
                          </SelectItem>

                          <SelectItem value="LMTC">LMTC</SelectItem>
                        </SelectContent>
                      )}
                    </Select>
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Sekolah/Lemdiklat/Masyarakat{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="Asal Sekolah/Lemdiklat/Masyarakat"
                      required
                      value={namaLemdiklat}
                      onChange={(e) => setNamaLemdiklat(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 px-3 gap-2 mb-2 w-full">
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
                      Jenis Sertifikasi <span className="text-red-600">*</span>
                    </label>
                    <Select onValueChange={setNamaProgram}>
                      <SelectTrigger className="w-full border-gray-300 rounded-md h-fit py-[0.65rem]">
                        <SelectValue placeholder="Jenis Sertifikasi" />
                      </SelectTrigger>
                      <SelectContent className="z-[9999999]">
                        {tipeBlanko == "Certificate of Competence (CoC)" && (
                          <>
                            <SelectItem value="Ahli Nautika Kapal Penangkap Ikan Tingkat I">
                              Ahli Nautika Kapal Penangkap Ikan Tingkat I
                            </SelectItem>
                            <SelectItem value="Ahli Teknika Kapal Penangkap Ikan Tingkat I">
                              Ahli Teknika Kapal Penangkap Ikan Tingkat I
                            </SelectItem>
                            <SelectItem value="Ahli Nautika Kapal Penangkap Ikan Tingkat II">
                              Ahli Nautika Kapal Penangkap Ikan Tingkat II
                            </SelectItem>
                            <SelectItem value="Ahli Teknika Kapal Penangkap Ikan Tingkat II">
                              Ahli Teknika Kapal Penangkap Ikan Tingkat II
                            </SelectItem>
                            <SelectItem value="Ahli Nautika Kapal Penangkap Ikan Tingkat III">
                              Ahli Nautika Kapal Penangkap Ikan Tingkat III
                            </SelectItem>
                            <SelectItem value="Ahli Teknika Kapal Penangkap Ikan Tingkat III">
                              Ahli Teknika Kapal Penangkap Ikan Tingkat III
                            </SelectItem>
                            <SelectItem value="Rating Keahlian">
                              Rating Keahlian
                            </SelectItem>
                          </>
                        )}

                        {tipeBlanko == "Certificate of Proficiency (CoP)" && (
                          <>
                            <SelectItem value="Basic Safety Training Fisheries I">
                              Basic Safety Training Fisheries I
                            </SelectItem>
                            <SelectItem value="Basic Safety Training Fisheries II">
                              Basic Safety Training Fisheries II
                            </SelectItem>
                            <SelectItem value="Sertifikat Kecakapan Nelayan">
                              Sertifikat Kecakapan Nelayan
                            </SelectItem>
                            <SelectItem value="Sertifikat Keterampilan Penanganan Ikan">
                              Sertifikat Keterampilan Penanganan Ikan
                            </SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
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
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="Tanggal Pelaksanaan"
                      required
                      value={tanggalPelaksanaan}
                      onChange={(e) => setTanggalPelaksanaan(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 px-3 gap-2 mb-2 w-full">
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
                      Tanggal Penerbitan <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="date"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="Tipe Blanko"
                      required
                      value={tanggalKeluar}
                      onChange={(e) => setTanggalKeluar(e.target.value)}
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
                    <Select onValueChange={setStatus}>
                      <SelectTrigger className="w-full border-gray-300 rounded-md h-fit py-[0.65rem]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="z-[9999999]">
                        <SelectItem value="Belum Diserahkan">
                          Belum Diserahkan
                        </SelectItem>
                        <SelectItem value="Sudah Diserahkan">
                          Sudah Diserahkan
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Tipe Pengambilan <span className="text-red-600">*</span>
                    </label>
                    <Select onValueChange={setTipePengambilan}>
                      <SelectTrigger className="w-full border-gray-300 rounded-md h-fit py-[0.65rem]">
                        <SelectValue placeholder="Tipe Pengambilan" />
                      </SelectTrigger>
                      <SelectContent className="z-[9999999]">
                        <SelectItem value="Dikirimkan via Pos Indonesia">
                          Dikirimkan via Pos Indonesia
                        </SelectItem>
                        <SelectItem value="Diterima di Kantor Puslat KP">
                          Diterima di Kantor Puslat KP
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
        <></>
      ) : showCertificateSetting ? (
        <></>
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

          {/* List Data Pelatihan */}
          <div>
            <div id="chartOne" className="-ml-5"></div>
            <div className="flex w-full items-center mb-2">
              <div className="flex w-full gap-1 items-start">
                <Select
                  value={selectedTipeBlanko}
                  onValueChange={(value) => setSelectedTipeBlanko(value)}
                >
                  <SelectTrigger className="w-fit border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                    <div className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer">
                      <TbChartBubble />{" "}
                      {selectedTipeBlanko == " "
                        ? "All"
                        : selectedTipeBlanko != ""
                        ? selectedTipeBlanko
                        : "Tipe Blanko"}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value=" ">All</SelectItem>
                      <SelectItem value="Certificate of Competence (CoC)">
                        Certificate of Competence (CoC)
                      </SelectItem>
                      <SelectItem value="Certificate of Proficiency (CoP)">
                        Certificate of Proficiency (CoP)
                      </SelectItem>
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
