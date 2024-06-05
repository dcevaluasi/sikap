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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
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
import { ArrowUpDown, Edit3Icon, LucideListChecks, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  TbBroadcast,
  TbChartBubble,
  TbChartDonut,
  TbDatabaseEdit,
  TbFileCertificate,
  TbFileStack,
  TbRubberStamp,
  TbSchool,
  TbTargetArrow,
} from "react-icons/tb";
import { IoIosInformationCircle, IoMdCloseCircle } from "react-icons/io";
import { FiUploadCloud } from "react-icons/fi";

import { usePathname, useRouter } from "next/navigation";
import {
  MdInfo,
  MdOutlineNumbers,
  MdOutlinePaid,
  MdOutlinePayment,
  MdSchool,
} from "react-icons/md";
import { DialogSertifikat } from "@/components/sertifikat/dialogSertifikat";
import { Checkbox } from "@/components/ui/checkbox";
import { Pelatihan, UserPelatihan } from "@/types/product";
import axios, { AxiosResponse } from "axios";
import { extractLastSegment } from "@/utils";
import {
  HiMiniNewspaper,
  HiMiniUserGroup,
  HiOutlineDocument,
  HiUserGroup,
} from "react-icons/hi2";
import { RiShipLine, RiVerifiedBadgeFill } from "react-icons/ri";
import Link from "next/link";
import { FaRupiahSign } from "react-icons/fa6";
import Toast from "@/components/toast";
import { GiTakeMyMoney } from "react-icons/gi";

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
      IsActice: "",
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
      console.log("PELATIHAN : ", response.data);
      console.log("USER PELATIHAN: ", response.data.UserPelatihan);
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
      accessorKey: "KodePelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-gray-900 font-semibold w-fit`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`w-full text-center uppercase`}>{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "IdPelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`flex items-center justify-center leading-[105%] p-0 w-full text-gray-900 font-semibold`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Validasi <br /> Data & Berkas
            <TbDatabaseEdit className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={` flex items-center justify-center w-full gap-1`}>
          {row.original.IsActice == "valid" ? (
            <Button variant="outline" className=" border border-green-500">
              <RiVerifiedBadgeFill className="h-4 w-4 text-green-500" />
            </Button>
          ) : (
            <Button variant="outline" className=" border border-rose-500">
              <IoMdCloseCircle className="h-4 w-4 text-rose-500" />
            </Button>
          )}
        </div>
      ),
    },
    {
      accessorKey: "NoRegistrasi",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-black font-semibold w-fit p-0 flex justify-start items-centee`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="leading-[105%]"> No Peserta</p>

            <HiMiniUserGroup className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-left capitalize`}>
          <p className="text-xs text-gray-400"> No registrasi</p>{" "}
          <p className="text-base font-semibold tracking-tight leading-none">
            {row.original.NoRegistrasi}
          </p>
        </div>
      ),
    },

    {
      accessorKey: "IdUsers",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-black font-semibold w-fit p-0 flex justify-start items-centee`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="leading-[105%]"> Pembayaran</p>

            <GiTakeMyMoney className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-left capitalize`}>
          <p className="text-xs text-gray-400">
            {" "}
            <span
              className={`${
                row.original.StatusPembayaran == "pending"
                  ? "text-yellow-500"
                  : row.original.StatusPembayaran == "paid"
                  ? "text-green-500"
                  : "text-rose-500"
              } capitalize`}
            >
              {row.original.StatusPembayaran}
            </span>{" "}
            • BTPN
          </p>{" "}
          <p className="text-base font-semibold tracking-tight leading-none">
            Rp. 145.678
          </p>
        </div>
      ),
    },
    {
      accessorKey: "NoSertifikat",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-black font-semibold text-center w-full  items-center justify-center p-0 flex`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No Sertifikat
            <RiVerifiedBadgeFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) =>
        row.getValue("NoSertifikat") == "" ? (
          <Button
            variant="outline"
            className="border flex gap-2 w-full items-center justify-center border-gray-600"
          >
            <TbRubberStamp className="h-4 w-4 text-gray-600" />{" "}
            <span className="text-sm"> Terbitkan Sertifikat</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full border flex gap-2 border-blue-600 text-left capitalize items-center justify-center"
          >
            <RiVerifiedBadgeFill className="h-4 w-4 text-blue-600" />{" "}
            <span className="text-xs"> {row.getValue("NoSertifikat")}</span>
          </Button>
        ),
    },
    {
      accessorKey: "IdUserPelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`flex items-center justify-center p-0 leading-[105%] w-full text-gray-900 font-semibold`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Input <br />
            Penilaian
            <TbDatabaseEdit className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={` flex items-center justify-center w-full gap-1`}>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className=" border border-purple-600">
                <LucideListChecks className="h-4 w-4 text-purple-600" />
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
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) =>
                    Toast.fire({
                      icon: "success",
                      title: `Berhasil mempublish informasi pelatihan masyarakat ke laman E-LAUT!`,
                    })
                  }
                >
                  Publish
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
    {
      accessorKey: "PreTest",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`flex items-center justify-center p-0 leading-[105%] w-full text-gray-900 font-semibold`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Pre Test
            <MdOutlineNumbers className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={` flex items-center justify-center w-full gap-1 font-semibold ${
            row.original.PreTest > 70
              ? "text-green-500"
              : row.original.PreTest > 50
              ? "text-yellow-500"
              : "text-rose-500"
          }`}
        >
          {row.original.PreTest}
        </div>
      ),
    },
    {
      accessorKey: "PostTest",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`flex items-center justify-center p-0 leading-[105%] w-full text-gray-900 font-semibold`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Post Test
            <MdOutlineNumbers className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={` flex items-center justify-center w-full gap-1 font-semibold ${
            row.original.PostTest > 70
              ? "text-green-500"
              : row.original.PostTest > 50
              ? "text-yellow-500"
              : "text-rose-500"
          }`}
        >
          {row.original.PostTest}
        </div>
      ),
    },
    {
      accessorKey: "Keterangan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`text-black font-semibold`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Keterangan
            <MdSchool className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`text-center uppercase text-base font-semibold ${
            row.getValue("Keterangan") == "Lulus"
              ? "text-green-500"
              : "text-rose-500"
          }`}
        >
          {row.getValue("Keterangan")}
        </div>
      ),
    },
  ];

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
          </div>

          <div className="flex w-full items-center mb-2">
            <div className="flex w-full gap-1 items-start">
              <Select>
                <SelectTrigger className="w-[200px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                  <div className="inline-flex gap-2 px-3 mr-2 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer">
                    <MdOutlinePayment />
                    Status Pembayaran
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status Pembayaran</SelectLabel>
                    <SelectItem value="pendaftaran">Paid</SelectItem>
                    <SelectItem value="pelaksanaan">Pending</SelectItem>
                    <SelectItem value="selesai">Not Paid</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[130px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                  <div className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer">
                    <TbSchool />
                    Kelulusan
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kelulusan</SelectLabel>
                    <SelectItem value="pendaftaran">Lulus</SelectItem>
                    <SelectItem value="pelaksanaan">Tidak Lulus</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[140px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                  <div className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer">
                    <HiOutlineDocument />
                    Sertifikat
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sertifikat</SelectLabel>
                    <SelectItem value="apple">Sudah Diterbitkan</SelectItem>
                    <SelectItem value="banana">Belum Diterbitkan</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full flex justify-end gap-2">
              <div className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer w-fit">
                <TbChartDonut />
                Statistik
              </div>
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
