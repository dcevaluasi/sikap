import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
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
import { ArrowUpDown, Edit3Icon, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HiMiniUserGroup, HiUserGroup } from "react-icons/hi2";
import {
  TbBroadcast,
  TbFileCertificate,
  TbFileStack,
  TbTargetArrow,
} from "react-icons/tb";
import { IoIosInformationCircle } from "react-icons/io";
import { FiUploadCloud } from "react-icons/fi";

import { useRouter } from "next/navigation";
import { MdOutlinePaid } from "react-icons/md";
import { DialogSertifikat } from "@/components/sertifikat/dialogSertifikat";
import { Checkbox } from "@/components/ui/checkbox";
import Toast from "@/components/toast";
import { UserPelatihan } from "@/types/product";

const TableDataPesertaPelatihan = ({ data }: { data: UserPelatihan[] }) => {
  const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
    React.useState<boolean>(false);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const router = useRouter();
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
      accessorKey: "IdPelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`${"flex"} w-full`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Action
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"flex"} flex items-center justify-center gap-1`}>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <IoIosInformationCircle className="h-4 w-4" />
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
                <AlertDialogCancel>OK</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            onClick={(e) =>
              router.push(
                `/admin/lemdiklat/pelatihan/${row.getValue(
                  "KodePelatihan"
                )}/peserta-pelatihan`
              )
            }
            variant="outline"
            className="ml-auto border border-green-500"
          >
            <MdOutlinePaid className="h-4 w-4 text-green-500" />
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "KodePelatithan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`${"flex"} w-full`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Sertifikat
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <DialogSertifikat>
          <div className={`${"flex"} flex items-center justify-center gap-1`}>
            <Button
              variant="outline"
              className="border border-gray-600 text-gray-600"
            >
              <TbFileCertificate className="h-4 w-4" />{" "}
              <span>Lihat Sertifikat</span>
            </Button>
          </div>
        </DialogSertifikat>
      ),
    },
    {
      accessorKey: "KodeRegistrasi",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={``}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Kode Registrasi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>KWIDIKUV10930001</div>
      ),
    },

    {
      accessorKey: "DiklatPelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`${"ml-0 text-center w-full"}`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Lengkap
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-center capitalize`}>
          Farhan Agustiansyah
        </div>
      ),
    },
    {
      accessorKey: "TanggalPelaksanaan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`${"ml-0 text-center w-full"}`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            NIK
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-center capitalize`}>
          1603070408020001
        </div>
      ),
    },
    {
      accessorKey: "KuotaPeserta",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No Telpon
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center uppercase">082123104078</div>
      ),
    },
    {
      accessorKey: "KuotaPeserta",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center capitalize">farhantsyh@icloud.com</div>
      ),
    },
    {
      accessorKey: "DenganFasilitasMenginap",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`${"ml-0 text-center w-[250px]"}`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tempat
            <br />
            Tanggal Lahir
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center capitalize w-[250px]">
          Jakarta Selatan, 4 Augustus 2002
        </div>
      ),
    },
    {
      accessorKey: "DenganPaketKonsumsi",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`${"ml-0 text-center w-full"}`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Jenis Kelamin
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="text-center uppercase">Laki-Laki</div>,
    },
    {
      accessorKey: "DenganPaketKonsumsi",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`${"ml-0 text-center w-full"}`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Pendidikan Terakhir
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center capitalize">S1/Sederajatt</div>
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
                  <p className="text-sm font-medium">1 orang</p>
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
                  <p className="text-sm font-medium">1 orang</p>
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
                  <p className="text-sm font-medium">1 orang</p>
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
