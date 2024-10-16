import React, { ReactElement, useState } from "react";

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
  IoIosBook,
  IoIosInformationCircle,
  IoMdBook,
  IoMdGlobe,
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
import Toast from "@/components/toast";
import axios, { AxiosResponse } from "axios";
import { FaBookOpen, FaRupiahSign } from "react-icons/fa6";
import Cookies from "js-cookie";
import Link from "next/link";
import TableData from "../../Tables/TableData";
import { PiBookOpen } from "react-icons/pi";
import { dpkakpBaseUrl } from "@/constants/urls";

const TableDataTipeUjianKeahlian: React.FC = () => {
  const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
    React.useState<boolean>(false);

  const [data, setData] = React.useState<TypeUjian[]>([]);

  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const handleFetchingTypeUjian = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/adminPusat/getTypeUjian`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      console.log(response);
      setData(response.data.data);
      setIsFetching(false);
    } catch (error) {
      console.error("Error posting tipe ujian:", error);
      setIsFetching(false);
      throw error;
    }
  };

  const [namaMateri, setNamaMateri] = React.useState<string>("");
  const [jamTeori, setJamTeori] = React.useState<string>("");
  const [jamPraktek, setJamPraktek] = React.useState<string>("");

  const [isOpenFormMateri, setIsOpenFormMateri] =
    React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState<number>(0);

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
  const columns: ColumnDef<TypeUjian>[] = [
    {
      accessorKey: "IdTypeUjian",
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
        <div className={`text-center uppercase`}>{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "NamaTypeUjian",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-gray-900 text-left mx-0 px-0 font-semibold w-fit`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ujian Keahlian
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex flex-col gap-2 w-fit">
          <div
            className={`text-center uppercase w-fit font-semibold text-base`}
          >
            {row.original.NamaTypeUjian}
          </div>
          <div className={`text-left capitalize flex-wrap w-full -mt-2`}>
            <div
              className={`text-left w-full capitalize font-semibold text-xs`}
            >
              Fungsi Ujian :
            </div>
            <div className="w-full flex flex-col">
              {row.original.Fungsi.map((fungsi, index) => (
                <p className="text-xs font-normal" key={index}>
                  {index + 1}. {fungsi.NamaFungsi}{" "}
                  <div className="flex flex-row gap-1">
                    <span className="flex flex-row gap-1">
                      {fungsi.Bagian.map((bagian, index) => (
                        <Link
                          href={`/lembaga/dpkakp/admin/dashboard/bank-soal/${row.original.IdTypeUjian}/${bagian.IdBagian}`}
                          className="flex gap-2 px-3 my-2 text-xs items-center rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 duration-700 p-1.5  cursor-pointer w-fit"
                          key={index}
                        >
                          <PiBookOpen />
                          {bagian.NamaBagian}
                        </Link>
                      ))}
                    </span>
                    {fungsi.Bagian.length < 3 && (
                      <span className="flex flex-row gap-1 my-2">
                        <div
                          onClick={(e) => {
                            setIsOpenFormMateri(!isOpenFormMateri);
                            setIdFungsiSelected(fungsi.IdFungsi.toString());
                          }}
                          className="flex gap-2 px-3 text-xs items-center rounded-md border border-gray-600 hover:bg-gray-600 hover:text-white text-gray-600 duration-700 p-1.5  cursor-pointer w-fit"
                        >
                          <FiUploadCloud />
                          Tambah Bagian Fungsi
                        </div>
                      </span>
                    )}
                  </div>
                </p>
              ))}
            </div>
          </div>
        </div>
      ),
    },

    {
      accessorKey: "CreateAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-gray-900 font-semibold w-full`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>{row.original.CreateAt}</div>
      ),
    },
    {
      accessorKey: "UpdateAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-gray-900 font-semibold w-full`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Updated At
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>{row.original.UpdateAt}</div>
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

  const [namaBagian, setNamaBagian] = React.useState<string>("");
  const [idFungsiSelected, setIdFungsiSelected] = React.useState<string>("");
  const handlePostNewBagianUjianKeahlian = async (e: any) => {
    try {
      const response = await axios.post(
        `${dpkakpBaseUrl}/adminPusat/createBagian`,
        {
          idFungsi: idFungsiSelected,
          namaBagian: namaBagian,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      console.log(response);
      Toast.fire({
        icon: "success",
        title: `Berhasil menambahkan data bagian ujian keahlian baru!`,
      });
      handleFetchingTypeUjian();
      setIsOpenFormMateri(!isOpenFormMateri);
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: `Gagal menambahkan data bagian ujian keahlian baru!`,
      });
      handleFetchingTypeUjian();
      setIsOpenFormMateri(!isOpenFormMateri);
    }
  };

  React.useEffect(() => {
    handleFetchingTypeUjian();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default  sm:px-7.5 xl:col-span-8">
      <AlertDialog open={isOpenFormMateri}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {" "}
              <FaBookOpen className="h-4 w-4" />
              Tambah Bagian Fungsi Ujian Keahlian
            </AlertDialogTitle>
            <AlertDialogDescription className="-mt-2">
              Sebelum melakukan storing bank soal per bagian dan per fungsi
              ujian keahlian awak kapal perikanan, tambahkan terlebih dahulu
              bagian dari fungsi tersebut!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset>
            <form autoComplete="off">
              <div className="flex flex-wrap mb-1 w-full">
                <div className="w-full">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Nama Bagian <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="name"
                    className="form-input w-full text-black text-sm border-gray-300 rounded-md"
                    placeholder="Tipe Blanko"
                    required
                    value={namaBagian}
                    onChange={(e) => setNamaBagian(e.target.value)}
                  >
                    <option value="0">Pilih Tipe Ujian</option>
                    <option value="Bagian 1">Bagian 1</option>
                    <option value="Bagian 2">Bagian 2</option>
                    <option value="Bagian 3">Bagian 3</option>
                  </select>
                </div>
              </div>

              <AlertDialogFooter className="mt-3">
                <AlertDialogCancel
                  onClick={(e) => setIsOpenFormMateri(!isOpenFormMateri)}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => handlePostNewBagianUjianKeahlian(e)}
                >
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
          <div>{/* <FormPelatihan edit={false} /> */}</div>
        </>
      ) : (
        <>
          {/* Header Tabel Data Pelatihan */}
          <div className="flex flex-wrap items-center mb-3 justify-between gap-3 sm:flex-nowrap">
            {/* Statistik Pelatihan */}
          </div>

          {/* List Data Pelatihan */}
          <div>
            <div id="chartOne" className="-ml-5"></div>
            <div className="flex w-full items-center mb-2">
              <div className="flex w-full gap-1 items-start">
                <div
                  onClick={(e) => {
                    router.push("/admin/lemdiklat/pelatihan/tambah-pelatihan");
                  }}
                  className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
                >
                  <FiUploadCloud />
                  Tambah Master Tipe Ujian
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

export default TableDataTipeUjianKeahlian;
