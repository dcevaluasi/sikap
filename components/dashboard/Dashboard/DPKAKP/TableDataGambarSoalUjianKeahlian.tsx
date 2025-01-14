import React from "react";
import {
  RiRadioButtonLine,
  RiShipLine,
  RiVerifiedBadgeFill,
} from "react-icons/ri";

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
  TbBuildingCommunity,
  TbCalendarCheck,
  TbCalendarDot,
  TbCalendarExclamation,
  TbCalendarSearch,
  TbCalendarStats,
  TbChartBubble,
  TbChartDonut,
  TbDatabase,
  TbDatabaseEdit,
  TbFileCertificate,
  TbFileDigit,
  TbFishChristianity,
  TbLink,
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
  IoMdSchool,
} from "react-icons/io";
import { FiFile, FiUploadCloud } from "react-icons/fi";
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
import { useParams, usePathname, useRouter } from "next/navigation";
import { MdOutlinePayments, MdOutlineSaveAlt } from "react-icons/md";
import Toast from "@/components/toast";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { PelatihanMasyarakat } from "@/types/product";
import { FaBookOpen, FaRegCopy, FaRupiahSign } from "react-icons/fa6";
import { Input } from "@/components/ui/input";

import { convertDate } from "@/utils";
import Cookies from "js-cookie";
import { LemdiklatDetailInfo } from "@/types/lemdiklat";
import { Progress } from "@/components/ui/progress";
import { GiBookmarklet } from "react-icons/gi";
import Link from "next/link";
import { dpkakpBaseUrl } from "@/constants/urls";
import { wilayahPukakp } from "@/constants/dpkakp";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { UserInformationDPKAKP } from "@/types/dpkakp";
import { generateTanggalPelatihan } from "@/utils/text";
import { FaEdit } from "react-icons/fa";
import { DewanPenguji } from "@/types/dewanPenguji";
import TableData from "../../Tables/TableData";
import { ImageSoalUjian } from "@/types/ujian-keahlian-akp";

const TableDataGambarSoalUjianKeahlian: React.FC = () => {
  /*============== STORE DATA VARIABLES ================ */
  const [data, setData] = React.useState<ImageSoalUjian[]>([]);
  const pathPukakp = usePathname().includes("pukakp");

  /*================== LOADER VARIABLES ================= */
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  /*=============== HANDLING FETCHING UJIAN ============== */
  const handleFetchingUjianKeahlianData = async () => {
    setIsFetching(true);

    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/getGambar`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );

      // Filter the data by PUKAKP value from cookies
      const filteredData = response.data.data.filter(
        (item: any) => item.PUKAKP === Cookies.get("PUKAKP")
      );

      // Sort the data first by status ('tidak aktif' first) and then by CreateAt in descending order
      const sortedData = filteredData.sort((a: any, b: any) => {
        // Sort by status: 'tidak aktif' first
        if (a.Status === "Tidak Aktif" && b.Status !== "Tidak Aktif") return -1;
        if (a.Status !== "Tidak Aktif" && b.Status === "Tidak Aktif") return 1;

        // Sort by CreateAt in descending order
        return new Date(b.CreateAt).getTime() - new Date(a.CreateAt).getTime();
      });

      // Set the sorted data depending on the pathPukakp condition
      if (pathPukakp) {
        setData(sortedData);
      } else {
        // Also sort the original data by status and CreateAt if no filter is applied
        const sortedOriginalData = response.data.data.sort((a: any, b: any) => {
          // Sort by status: 'tidak aktif' first
          if (a.Status === "tidak aktif" && b.Status !== "tidak aktif")
            return -1;
          if (a.Status !== "tidak aktif" && b.Status === "tidak aktif")
            return 1;

          // Sort by CreateAt in descending order
          return (
            new Date(b.CreateAt).getTime() - new Date(a.CreateAt).getTime()
          );
        });
        setData(sortedOriginalData);
      }

      console.log({ response });

      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      throw error;
    }
  };

  /*================== LOADER VARIABLES ================= */
  const [isPosting, setIsPosting] = React.useState<boolean>(false);
  const [isOpenFormUjianKeahlian, setIsOpenFormUjianKeahlian] =
    React.useState<boolean>(false);

  const [foto, setFoto] = React.useState<File | null>(null);
  const handleFileChange = (e: any) => {
    setFoto(e.target.files[0]);
  };

  /*=============== HANDLING POSTING UJIAN ============== */
  const handlePostGgambar = async (e: any) => {
    setIsPosting(true);

    const formData = new FormData();
    if (foto != null) {
      formData.append("foto", foto!);
    }

    try {
      const response = await axios.post(
        `${dpkakpBaseUrl}/uploadGambar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      Toast.fire({
        icon: "success",
        title: `Berhasil menambahkan data gambar soal ujian keahlian baru!`,
      });
      handleFetchingUjianKeahlianData();
      setIsOpenFormUjianKeahlian(!isOpenFormUjianKeahlian);
      setIsPosting(false);
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: `Gagal menambahkan data gambar soal ujian keahlian baru!`,
      });
      handleFetchingUjianKeahlianData();
      setIsOpenFormUjianKeahlian(!isOpenFormUjianKeahlian);
      setIsPosting(true);
    }
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns: ColumnDef<ImageSoalUjian>[] = [
    {
      accessorKey: "TempatUjian",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-gray-900 font-semibold flex w-full items-center justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center uppercase  w-full items-center justify-center">
          {row.index + 1}
        </div>
      ),
    },
    {
      accessorKey: "IdUjian",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex w-full text-gray-900 font-semibold items-center -ml-10"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Action
          <TbDatabaseEdit className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="w-full flex flex-col gap-2 -ml-10">
          <Image
            src={row.original.Gambar}
            alt={row.original.CodeUnik}
            width={0}
            height={0}
            className="w-[250px] h-[150px] rounded-md object-cover"
          />
          <div className="flex items-center justify-center gap-1">
            <Button variant="outline" className=" border border-[#000000]">
              <FaBookOpen className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className=" border border-rose-600">
                  <Trash className="h-4 w-4 text-rose-600" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Apakah kamu yakin menghapus ujian ini?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Penghapusan data ini akan dilakukan secara permanen,
                    sehingga anda tidak dapat kembali melakukan undo terkait
                    tindakan ini!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction className="bg-rose-600">
                    Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              variant="outline"
              className=" border border-gray-600 text-gray-600"
              onClick={(e) => handleCopy(row.original.Gambar)}
            >
              <FaRegCopy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "NamaUjian",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-0 !text-left w-[270px] flex items-center justify-start text-gray-900 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Link
          <TbLink className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-0 text-left ">
          <p className="text-xs text-gray-400 mt-2 leading-[100%] mb-1">
            {row.original.Gambar}
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
    handleFetchingUjianKeahlianData();
  }, []);

  return (
    <section className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default  sm:px-7.5 xl:col-span-8">
      <AlertDialog open={isOpenFormUjianKeahlian}>
        <AlertDialogContent className="max-w-xl">
          <AlertDialogHeader className="gap-0 flex flex-col">
            <AlertDialogTitle className="flex items-center gap-2 text-2xl">
              {" "}
              <FaBookOpen className="h-4 w-4" />
              Tambah Gambar Baru
            </AlertDialogTitle>
            <AlertDialogDescription className="-mt-6">
              Upload gambar untuk mendapatkan link yang dapat dimasukkan kedalam
              template soal ujian keahlian pada bank soal!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset>
            <form autoComplete="off">
              <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full mx-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Gambar Soal <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="file"
                    className=" text-black h-10 text-base flex items-center cursor-pointer w-full border border-neutral-200 rounded-md"
                    required
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <AlertDialogFooter className="mt-3">
                <AlertDialogCancel
                  onClick={(e) =>
                    setIsOpenFormUjianKeahlian(!isOpenFormUjianKeahlian)
                  }
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    handlePostGgambar(e);
                  }}
                >
                  Upload
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </fieldset>
        </AlertDialogContent>
      </AlertDialog>

      <>
        {/* List Data Pelatihan */}
        <div>
          <div id="chartOne" className="-ml-5"></div>
          <div className="flex w-full items-center mb-2">
            <div className="w-full flex justify-end gap-2">
              <div
                onClick={(e) =>
                  setIsOpenFormUjianKeahlian(!isOpenFormUjianKeahlian)
                }
                className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
              >
                <FiUploadCloud />
                Tambah Gambar Baru
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
    </section>
  );
};

export default TableDataGambarSoalUjianKeahlian;
