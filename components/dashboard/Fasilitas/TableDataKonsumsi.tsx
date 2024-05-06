import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
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
import { ArrowUpDown, Edit3Icon, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoIosInformationCircle } from "react-icons/io";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { MdOutlineSaveAlt } from "react-icons/md";
import FormPelatihan from "../admin/formPelatihan";
import Toast from "@/components/toast";
import { Checkbox } from "@/components/ui/checkbox";

const TableDataKonsumsi: React.FC = () => {
  const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
    React.useState<boolean>(false);

  type Konsumsi = {
    No: number;
    KodeFasilitas: string;
    NamaFasilitas: string;
    Harga: number;
    Deskripsi: string;
  };

  const [data, setData] = React.useState<Konsumsi[]>([
    {
      No: 1,
      KodeFasilitas: "KONUV0001",
      NamaFasilitas: "(Menginap) Full package 1x Makan & 3 Snack",
      Harga: 150000,
      Deskripsi: "Satu box nasi lengkap, buah, snack, air mineral",
    },
    {
      No: 2,
      KodeFasilitas: "KONUV0002",
      NamaFasilitas: "(Tidak Menginap) Full package 1x Makan & 1 Snack",
      Harga: 75000,
      Deskripsi: "Satu box nasi lengkap, buah, snack, air mineral",
    },
    {
      No: 3,
      KodeFasilitas: "KONUV0003",
      NamaFasilitas: "Paket Konsumsi Halfday (1x Makan, 2 Snack) Minimum",
      Harga: 70000,
      Deskripsi: "Satu box nasi lengkap, buah, snack, air mineral",
    },
  ]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const router = useRouter();
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns: ColumnDef<Konsumsi>[] = [
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
      accessorKey: "KodeFasilitas",
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
          <Button variant="outline" className="ml-auto">
            <IoIosInformationCircle className="h-4 w-4" />
          </Button>

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
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            variant="outline"
            className="ml-auto border border-yellow-500"
          >
            <Edit3Icon className="h-4 w-4 text-yellow-500" />
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "KodeFasilitas",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={``}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Kode Paket
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>
          {row.getValue("KodeFasilitas")}
        </div>
      ),
    },
    {
      accessorKey: "NamaFasilitas",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`${"ml-0 text-center w-full"}`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Paket Konsumsi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-center capitalize`}>
          {row.getValue("NamaFasilitas")}
        </div>
      ),
    },
    {
      accessorKey: "Harga",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`${"ml-0 text-center w-full"}`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Harga Konsumsi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-center capitalize`}>
          Rp {row.getValue("Harga")}
        </div>
      ),
    },
    {
      accessorKey: "Deskripsi",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full flex items-center justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Deskripsi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center capitalize">
          {row.getValue("Deskripsi")}
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

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      {showFormAjukanPelatihan ? (
        <>
          {/* Header Tabel Data Pelatihan */}
          <div className="flex flex-wrap items-center mb-3 justify-between gap-3 sm:flex-nowrap">
            {/* Button Ajukan Permohonan Buka Pelatihan */}
            <div className="flex w-full gap-2 justify-end">
              <div
                onClick={(e) => {
                  Toast.fire({
                    icon: "success",
                    title: `Berhasil membuat pelatihan baru!`,
                  });
                  setShowFormAjukanPelatihan(!showFormAjukanPelatihan);
                }}
                className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer"
              >
                <MdOutlineSaveAlt />
                Simpan ke Database
              </div>
            </div>
          </div>

          {/* List Data Pelatihan */}
          <div>
            <FormPelatihan />
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
                  <p className="font-semibold text-primary">Total Paket</p>
                  <p className="text-sm font-medium">3 paket konsumsi</p>
                </div>
              </div>
            </div>

            {/* Button Ajukan Permohonan Buka Pelatihan */}
            <div className="flex w-full gap-2 justify-end">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer">
                    <FiUploadCloud />
                    Tambah Database Konsumsi
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tambah data konsumsi</AlertDialogTitle>
                    <AlertDialogDescription className="-mt-2">
                      Daftarkan data paket konsumsi di lemdiklat/balai mu
                      sebagai penunjang kegiatan pelatihan dan sertifikasi!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <form autoComplete="off">
                    <div className="flex flex-wrap mb-1 w-full">
                      <div className="w-full">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="name"
                        >
                          Kode Paket <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="form-input w-full text-black border-gray-300 rounded-md"
                          placeholder="KONUV0004"
                          required
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-1 w-full">
                      <div className="w-full">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="name"
                        >
                          Paket Konsumsi <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="form-input w-full text-black border-gray-300 rounded-md"
                          placeholder="Masukkan nama paket"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap mb-1 w-full">
                      <div className="w-full">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="name"
                        >
                          Harga Konsumsi <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="name"
                          type="number"
                          className="form-input w-full text-black border-gray-300 rounded-md"
                          placeholder="Rp"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap mb-1 w-full">
                      <div className="w-full">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="name"
                        >
                          Deskripsi Paket{" "}
                          <span className="text-red-600">*</span>
                        </label>
                        <textarea
                          id="name"
                          className="form-input w-full text-black border-gray-300 rounded-md"
                          placeholder="Deskripsi paket konsumsi"
                          rows={4}
                        />
                      </div>
                    </div>
                  </form>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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

export default TableDataKonsumsi;
