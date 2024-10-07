import React, { ReactElement, useState } from "react";
import TableData from "../Tables/TableData";
import {
  RiInfoI,
  RiRadioButtonLine,
  RiShipLine,
  RiVerifiedBadgeFill,
} from "react-icons/ri";

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
import {
  HiMiniUserGroup,
  HiOutlineUserGroup,
  HiUserGroup,
} from "react-icons/hi2";
import {
  TbBook,
  TbBookFilled,
  TbBrandSafari,
  TbBroadcast,
  TbBuildingCommunity,
  TbCalendarCheck,
  TbCalendarDot,
  TbCalendarExclamation,
  TbCalendarPin,
  TbCalendarSearch,
  TbCalendarStats,
  TbChartBubble,
  TbChartDonut,
  TbDatabase,
  TbDatabaseEdit,
  TbFileCertificate,
  TbFileDigit,
  TbFishChristianity,
  TbInfoCircle,
  TbMoneybag,
  TbQrcode,
  TbSchool,
  TbTargetArrow,
} from "react-icons/tb";
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
import axios, { AxiosResponse } from "axios";
import { PelatihanMasyarakat } from "@/types/product";
import Cookies from "js-cookie";
import Link from "next/link";
import { generateFullNameBalai, generateTanggalPelatihan } from "@/utils/text";
import { GrLocation } from "react-icons/gr";

const TableDataPenerbitanSertifikat: React.FC = () => {
  const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
    React.useState<boolean>(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [data, setData] = React.useState<PelatihanMasyarakat[]>([]);

  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const handleFetchingPublicTrainingData = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/lemdik/getPelatihanAdmin`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF091")}`,
          },
        }
      );
      console.log("PELATIHAN BY LEMDIK: ", response);

      // Filter data where SuratPemberitahuan is not an empty string
      const filteredData = response.data.data.filter(
        (item: any) => item.TtdSertifikat == Cookies.get("Eselon")
      );

      setData(filteredData);
      setIsFetching(false);
    } catch (error) {
      console.error("Error posting training data:", error);
      setIsFetching(false);
      throw error;
    }
  };

  console.log(Cookies.get("Eselon"));

  const publishedData = data.filter(
    (item: PelatihanMasyarakat) => item.Status === "Publish"
  ).length;

  /* ================================= HANDLING PENERBITAN SERTIFIKAT ====================================== */
  const [beritaAcara, setBeritaAcara] = React.useState<File | null>(null);
  const handleFileChange = (e: any) => {
    setBeritaAcara(e.target.files[0]);
  };
  console.log({ beritaAcara });

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

  const router = useRouter();
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns: ColumnDef<PelatihanMasyarakat>[] = [
    {
      accessorKey: "KodePelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-gray-900 w-fit mx-0  font-semibold`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`text-center uppercase w-full items-center justify-center mx-0`}
        >
          {row.index + 1}
        </div>
      ),
    },
    {
      accessorKey: "IdPelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`flex w-full mx-0 px-0 items-center justify-center text-gray-900 font-semibold`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Action
            <TbDatabaseEdit className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="w-full mx-0 px-0 flex flex-col items-center justify-center gap-2">
          <div className={`flex items-center justify-center gap-1  mt-2`}>
            <Link
              href={`/admin/puslat/pelatihan/penerbitan-sertifikat/detail-pelatihan/${row.getValue(
                "KodePelatihan"
              )}/${row.getValue("IdPelatihan")}`}
              onClick={(e) =>
                router.push(
                  `/admin/puslat/pelatihan/penerbitan-sertifikat/detail-pelatihan${row.getValue(
                    "IdPelatihan"
                  )}/${row.getValue("KodePelatihan")}`
                )
              }
              className="border border-gray-900 hover:bg-gray-900 group duration-700 inline-flex items-center justify-center whitespace-nowrap rounded-md  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 text-xs"
            >
              <RiInfoI className="h-4 w-4 text-gray-900 group-hover:text-white duration-700" />{" "}
              <span className="group-hover:text-white text-gray-900 duration-700">
                Review
              </span>
            </Link>
          </div>
        </div>
      ),
    },
    // {
    //   accessorKey: "IdPelatihan",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         className={`flex w-full mx-0 px-0 items-center justify-center text-gray-900 font-semibold`}
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Status
    //         <TbBrandSafari className="ml-1 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div className="w-full mx-0 px-0 flex flex-col items-center justify-center gap-2">
    //       <div className={`flex items-center justify-center gap-1  mt-2`}>
    //         <Link
    //           href={`/admin/puslat/pelatihan/penerbitan-sertifikat/detail-pelatihan/${row.getValue(
    //             "KodePelatihan"
    //           )}/${row.getValue("IdPelatihan")}`}
    //           onClick={(e) =>
    //             router.push(
    //               `/admin/puslat/pelatihan/penerbitan-sertifikat/detail-pelatihan${row.getValue(
    //                 "IdPelatihan"
    //               )}/${row.getValue("KodePelatihan")}`
    //             )
    //           }
    //           className="border w-full border-green-400 bg-green-400 group duration-700 inline-flex items-center justify-center whitespace-nowrap rounded-md  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 text-xs"
    //         >
    //           <span className="text-white  duration-700">Done</span>
    //         </Link>
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
            className={`p-0 !text-left w-fit flex items-center justify-start text-gray-900 font-semibold mx-0 px-0`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Pelatihan
            <TbInfoCircle className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`mx-0 px-0 w-fit text-left capitalize`}>
          <p className="text-sm font-semibold tracking-tight leading-none">
            {row.getValue("NamaPelatihan")}
          </p>
          <p className="text-xs text-gray-400 mb-1 mt-1 leading-[110%]">
            {" "}
            {row.getValue("KodePelatihan")} • {row.original.BidangPelatihan} •
            Mendukung Program Terobosan {row.original.DukunganProgramTerobosan}
          </p>
          <div className={`${"ml-0"} text-left capitalize mt-1`}>
            <p className="text-xs  font-medium capitalize "> </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "PenyelenggaraPelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`p-0 !text-left w-fit flex items-center justify-start text-gray-900 font-semibold mx-0 px-0`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Penyelenggara Pelatihan
            <TbSchool className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`mx-0 px-0 w-fit text-left capitalize`}>
          <p className="text-sm font-semibold tracking-tight leading-none">
            {row.getValue("PenyelenggaraPelatihan")}
          </p>
          <p className="text-xs text-gray-400 leading-[110%] mt-1 mb-1">
            {generateFullNameBalai(row.getValue("PenyelenggaraPelatihan"))}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "TanggalMulaiPelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`p-0 !text-left w-fit flex items-center justify-start text-gray-900 font-semibold mx-0 px-0`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Waktu dan Lokasi Pelaksanaan
            <TbCalendarPin className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`mx-0 px-0 w-fit text-left capitalize`}>
          <p className="text-sm font-semibold tracking-tight leading-none">
            Dilaksanakan pada tanggal
          </p>
          <p className="text-xs text-gray-400 leading-[110%] mt-1 mb-1">
            {generateTanggalPelatihan(row.getValue("TanggalMulaiPelatihan"))} -{" "}
            {generateTanggalPelatihan(row.original.TanggalBerakhirPelatihan)},{" "}
            {row.original.LokasiPelatihan}
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

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default  sm:px-7.5 xl:col-span-8">
      {showFormAjukanPelatihan ? (
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
            <div className="flex w-full items-center mb-2"></div>

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

export default TableDataPenerbitanSertifikat;
