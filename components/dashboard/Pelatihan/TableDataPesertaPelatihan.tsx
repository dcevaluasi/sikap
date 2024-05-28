import React, { useState } from "react";
import TableData from "../Tables/TableData";
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
import {
  TbBroadcast,
  TbFileCertificate,
  TbFileStack,
  TbTargetArrow,
} from "react-icons/tb";
import { IoIosInformationCircle } from "react-icons/io";
import { FiUploadCloud } from "react-icons/fi";

import { usePathname, useRouter } from "next/navigation";
import { MdOutlinePaid } from "react-icons/md";
import { DialogSertifikat } from "@/components/sertifikat/dialogSertifikat";
import { Checkbox } from "@/components/ui/checkbox";
import { Pelatihan, UserPelatihan } from "@/types/product";
import axios, { AxiosResponse } from "axios";
import { extractLastSegment } from "@/utils";

const TableDataPesertaPelatihan = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const pathname = usePathname();
  const id = extractLastSegment(pathname);

  const [dataPelatihan, setDataPelatihan] = React.useState<any>({
    IdPelatihan: 0,
    IdLemdik: 0,
    KodePelatihan: "",
    NamaPelatihan: "",
    PenyelenggaraPelatihan: "",
    DetailPelatihan: "",
    FotoPelatihan: "",
    JenisPelatihan: "",
    BidangPelatihan: "",
    DukunganProgramTerobosan: "",
    TanggalMulaiTerobosan: "",
    TanggalBerakhirTerobosan: "",
    HargaPelatihan: 0,
    Instruktur: "",
    Status: "",
    MemoPusat: "",
    SilabusPelatihan: "",
    PelaksanaanPelatihan: "",
    UjiKompotensi: 0,
    KoutaPelatihan: 0,
    AsalPelatihan: "",
    AsalSertifikat: "",
    JenisSertifikat: "",
    TtdSertifikat: "",
    NoSertifikat: "",
    StatusApproval: "",
    IdSaranaPrasarana: 0,
    IdKonsumsi: "",
    ModuleMateri: "",
    CreateAt: "",
    UpdateAt: "",
    PemberitahuanDiterima: "",
    SuratPemberitahuan: "",
    CatatanPemberitahuanByPusat: "",
    PenerbitanSertifikatDiterima: "",
    BeritaAcara: "",
    CatatanPenerbitanByPusat: "",
    SarprasPelatihan: "",
    MateriPelatihan: "",
    UserPelatihan: [],
  });

  const [data, setData] = React.useState<UserPelatihan[]>([
    {
      CreatedAt: "",
      IdUserPelatihan: 0,
      IdPelatihan: 0,
      IdUsers: 0,
      IsActive: "",
      IsKeterangan: "",
      MetodoPembayaran: "",
      NilaiPraktek: 0,
      NilaiTeory: 0,
      NoRegistrasi: "",
      NoSertifikat: "",
      PostTest: 0,
      PreTest: 0,
      StatusPembayaran: "",
      UpdateAt: "",
      WaktuPembayaran: "",
    },
  ]);
  const handleFetchingPublicTrainingDataById = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/getPelatihanUser?idPelatihan=${id}`
      );
      console.log({ response });
      setDataPelatihan(response.data);
      setData(response.data.UserPelatihan);
    } catch (error) {
      console.error("Error posting training data:", error);
      throw error;
    }
  };
  React.useEffect(() => {
    handleFetchingPublicTrainingDataById();
  }, []);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns: ColumnDef<UserPelatihan>[] = [
    {
      accessorKey: "No",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={``}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "IdUsers",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={``}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Id User
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>{row.getValue("IdUsers")}</div>
      ),
    },
    {
      accessorKey: "IdPelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={``}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Id Pelatihan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>
          {row.getValue("IdPelatihan")}
        </div>
      ),
    },
    {
      accessorKey: "NoSertifikat",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={``}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No Sertifikat
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>
          {row.getValue("NoSertifikat")}
        </div>
      ),
    },
    {
      accessorKey: "NoRegistrasi",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={``}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No Registrasi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>
          {row.getValue("NoRegistrasi")}
        </div>
      ),
    },
    {
      accessorKey: "PreTest",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={``}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Pre Test
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>{row.getValue("PreTest")}</div>
      ),
    },
    {
      accessorKey: "PostTest",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={``}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Post Test
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>
          {row.getValue("PostTest")}
        </div>
      ),
    },
    {
      accessorKey: "Keterangan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={``}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Keterangan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>
          {row.getValue("Keterangan")}
        </div>
      ),
    },
  ];

  console.log({ dataPelatihan });
  console.log({ data });
  const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
    React.useState<boolean>(false);

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

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      {showFormAjukanPelatihan ? (
        <h1>TEST</h1>
      ) : (
        <>
          {/* Header Tabel Data Pelatihan */}
          <div className="flex items-center mb-3 justify-between gap-3 ">
            {/* Statistik Pelatihan */}
            <div className="flex w-full gap-3 sm:gap-5">
              <div className="flex min-w-47.5">
                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                  <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                </span>
                <div className="w-full">
                  <p className="font-semibold text-primary">Total Pendaftar</p>
                  <p className="text-sm font-medium">
                    {dataPelatihan?.UserPelatihan.length} orang
                  </p>
                </div>
              </div>
              <div className="flex min-w-47.5">
                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                  <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
                </span>
                <div className="w-full">
                  <p className="font-semibold text-secondary">
                    Total Telah Bayar
                  </p>
                  <p className="text-sm font-medium">
                    {" "}
                    {dataPelatihan?.UserPelatihan.length} orang
                  </p>
                </div>
              </div>
              <div className="flex min-w-47.5">
                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-green-400">
                  <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-green-500"></span>
                </span>
                <div className="w-full">
                  <p className="font-semibold text-green-500">
                    Total Verifikasi
                  </p>
                  <p className="text-sm font-medium">
                    {" "}
                    {dataPelatihan?.UserPelatihan.length} orang
                  </p>
                </div>
              </div>
            </div>

            {/* Button Ajukan Permohonan Buka Pelatihan */}
            <div className="flex w-full gap-2 justify-end">
              <div
                onClick={(e) => setShowFormAjukanPelatihan(true)}
                className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer"
              >
                <FiUploadCloud />
                Tambah Peserta Pelatihan
              </div>
            </div>
          </div>

          {/* List Data Pelatihan */}
          <div>
            <div id="chartOne" className="-ml-5"></div>
            <TableData
              isLoading={false}
              columns={columns}
              table={table}
              type={"short"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TableDataPesertaPelatihan;
