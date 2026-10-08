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
  TbCalendarCheck,
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
import { MdOutlineSaveAlt, MdWork } from "react-icons/md";
import Toast from "@/components/toast";
import { PiMicrosoftExcelLogoFill, PiStampLight } from "react-icons/pi";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";

import { FaBookOpen, FaCreditCard, FaRupiahSign } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { convertDate } from "@/utils";
import Cookies from "js-cookie";
import Link from "next/link";
import { DewanPenguji } from "@/types/dewanPenguji";

import { generateTanggalPelatihan } from "@/utils/text";
import { IoMdContact } from "react-icons/io";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoSchoolSharp } from "react-icons/io5";

const TableDataDewanenguji: React.FC = () => {
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
            className={`text-blue-900 font-bold hover:bg-transparent px-0`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center font-semibold text-slate-600`}>{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "Foto",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 !text-left w-[100px] flex items-center justify-center text-blue-900 font-bold hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Foto
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-left w-full flex items-center justify-center py-2">
          <Image
            width={80}
            height={80}
            sizes="100vw"
            src={row.original.Foto}
            alt={row.original.NamaUsersDpkakp}
            className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-[0_2px_10px_-3px_rgba(59,130,246,0.3)] ring-1 ring-blue-100"
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
            className="p-0 !text-left w-full flex items-center justify-start text-blue-900 font-bold hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data Penguji
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Sheet>
          <SheetTrigger asChild>
            <div className="ml-0 text-left capitalize w-full py-3 cursor-pointer hover:bg-slate-50 rounded-lg px-2 -mx-2 transition-colors">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-700 mb-1.5 border border-blue-200 shadow-sm">
                {row.original.TipeKeahlian}
              </span>
              <p className="text-base font-extrabold text-slate-800 tracking-tight leading-none mb-3 group-hover:text-blue-700">
                {row.original.NamaUsersDpkakp}
              </p>
              <div className="text-xs font-medium text-slate-600 space-y-2">
                <span className="flex items-center gap-2">
                  <FaCreditCard className="text-slate-400 w-3.5 h-3.5" />
                  <span>{row.original.Nik}</span>
                </span>
                <span className="flex items-start gap-2">
                  <TbCalendarCheck className="text-slate-400 w-4 h-4 mt-0.5" />
                  <span className="truncate whitespace-normal max-w-[280px] leading-snug">{row.original.Alamat}</span>
                </span>
                <span className="flex items-center gap-2">
                  <IoMdContact className="text-slate-400 w-4 h-4" />
                  <span>
                    {row.original.NomorTelpon} <span className="text-slate-300 mx-1">•</span> <span className="normal-case">{row.original.Email}</span>
                  </span>
                </span>
                <span className="flex items-start gap-2">
                  <MdWork className="text-slate-400 w-4 h-4 mt-0.5" />
                  <span className="whitespace-normal leading-snug">
                    {row.original.Jabatan}, {row.original.Golongan} <br /> <span className="text-blue-600 font-semibold">{row.original.AsalInstansi}</span>
                  </span>
                </span>
                <span className="flex items-center gap-1.5 text-blue-600 font-bold mt-3 bg-blue-50 w-fit px-2 py-1 rounded-md border border-blue-100">
                  <TbFileCertificate className="text-base" /> Lihat Dokumen & Detail &rarr;
                </span>
              </div>
            </div>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto bg-slate-50 p-6 z-[100]">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-2xl font-bold text-blue-900">Detail Penguji</SheetTitle>
              <SheetDescription>Informasi lengkap dan dokumen sertifikat.</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <Image
                  width={80}
                  height={80}
                  sizes="100vw"
                  src={row.original.Foto}
                  alt={row.original.NamaUsersDpkakp}
                  className="w-20 h-20 object-cover rounded-full border-2 border-blue-100"
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{row.original.NamaUsersDpkakp}</h3>
                  <p className="text-sm text-slate-500">{row.original.Nik}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-semibold text-blue-900 border-b pb-2 mb-3">Informasi Umum</h4>
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="text-slate-500">Pendidikan</div><div className="font-medium text-slate-700">{row.original.Pendidikan}</div>
                  <div className="text-slate-500">Provinsi</div><div className="font-medium text-slate-700">{row.original.Provinsi}</div>
                  <div className="text-slate-500">Kota/Kab</div><div className="font-medium text-slate-700">{row.original.Cities}</div>
                  <div className="text-slate-500">Pengalaman Berlayar</div><div className="font-medium text-slate-700">{row.original.PengalamanBerlayar || "-"}</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-semibold text-blue-900 border-b pb-2 mb-3">Dokumen & Sertifikat</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    { label: "Ijazah", val: row.original.Ijazah },
                    { label: "Sertifikat Keahlian", val: row.original.SertifikatKeahlian },
                    { label: "Sertifikat TOT", val: row.original.SertifikatTot },
                    { label: "Sertifikat TOE", val: row.original.SertifikatToe },
                    { label: "Sertifikat TOE Simulator", val: row.original.SertifikatToeSimulator },
                    { label: "Sertifikat Auditor", val: row.original.SerifikatAuditor },
                    { label: "Sertifikat Lainnya", val: row.original.SertifikatLainnya },
                    { label: "Buku Pelaut", val: row.original.BukuPelaut }
                  ].map(item => (
                    <div key={item.label} className="flex flex-col gap-1">
                      <span className="text-xs text-slate-500 font-medium">{item.label}</span>
                      {item.val && item.val.trim() !== "-" && item.val.trim() !== "" ? (
                        <a href={item.val} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg transition-all border border-blue-100 shadow-sm">
                          <TbFileCertificate className="text-sm" /> Lihat Dokumen
                        </a>
                      ) : (
                        <span className="text-slate-400 text-xs italic">-</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ),
    }

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
  }, []);



  const handleExportData = () => {
    const headers = [
      "No", "Nama", "NIK", "Tipe Keahlian", "Alamat", "Nomor Telpon",
      "Email", "Jabatan", "Golongan", "Asal Instansi", "Pendidikan",
      "Provinsi", "Kota/Kab", "Pengalaman Berlayar", "Ijazah",
      "Sertifikat Keahlian", "Sertifikat TOT", "Sertifikat TOE",
      "Sertifikat TOE Simulator", "Sertifikat Auditor",
      "Sertifikat Lainnya", "Buku Pelaut"
    ];

    const csvData = data.map((item, index) => [
      index + 1,
      `"${(item.NamaUsersDpkakp || "").replace(/"/g, '""')}"`,
      `"${String(item.Nik || "").replace(/"/g, '""')}"`,
      `"${(item.TipeKeahlian || "").replace(/"/g, '""')}"`,
      `"${(item.Alamat || "").replace(/"/g, '""')}"`,
      `"${(item.NomorTelpon || "").replace(/"/g, '""')}"`,
      `"${(item.Email || "").replace(/"/g, '""')}"`,
      `"${(item.Jabatan || "").replace(/"/g, '""')}"`,
      `"${(item.Golongan || "").replace(/"/g, '""')}"`,
      `"${(item.AsalInstansi || "").replace(/"/g, '""')}"`,
      `"${(item.Pendidikan || "").replace(/"/g, '""')}"`,
      `"${(item.Provinsi || "").replace(/"/g, '""')}"`,
      `"${(item.Cities || "").replace(/"/g, '""')}"`,
      `"${(item.PengalamanBerlayar || "").replace(/"/g, '""')}"`,
      `"${(item.Ijazah || "").replace(/"/g, '""')}"`,
      `"${(item.SertifikatKeahlian || "").replace(/"/g, '""')}"`,
      `"${(item.SertifikatTot || "").replace(/"/g, '""')}"`,
      `"${(item.SertifikatToe || "").replace(/"/g, '""')}"`,
      `"${(item.SertifikatToeSimulator || "").replace(/"/g, '""')}"`,
      `"${(item.SerifikatAuditor || "").replace(/"/g, '""')}"`,
      `"${(item.SertifikatLainnya || "").replace(/"/g, '""')}"`,
      `"${(item.BukuPelaut || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...csvData.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data_penguji.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="col-span-12 bg-white rounded-2xl p-6 border border-blue-100 shadow-[0_4px_20px_-4px_rgba(59,130,246,0.1)] mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex-1 w-full relative">
          <Input
            placeholder="Cari Nama Penguji..."
            value={
              (table.getColumn("NamaUsersDpkakp")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("NamaUsersDpkakp")?.setFilterValue(event.target.value)
            }
            className="w-full md:max-w-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl shadow-sm bg-blue-50/30 pl-4 py-2"
          />
        </div>
        <Button onClick={handleExportData} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm rounded-xl gap-2 transition-all">
          <PiMicrosoftExcelLogoFill className="text-lg" /> Export Data
        </Button>
      </div>

      <div className="rounded-xl overflow-hidden border border-blue-100 shadow-sm">
        <TableData
          isLoading={isFetching}
          columns={columns}
          table={table}
          type={"short"}
        />
      </div>

      <div className="flex items-center justify-between py-4 mt-2">
        <div className="text-blue-600/80 font-medium text-sm">
          Menampilkan {table.getFilteredSelectedRowModel().rows.length} dari{" "}
          {table.getFilteredRowModel().rows.length} penguji
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="font-inter border-blue-200 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Sebelumnya
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="font-inter border-blue-200 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableDataDewanenguji;
