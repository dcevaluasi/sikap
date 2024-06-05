import React, { useState } from "react";
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
import { ArrowUpDown, Edit3Icon, LucidePrinter, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HiMiniUserGroup, HiUserGroup } from "react-icons/hi2";
import { TbBroadcast, TbFileCertificate, TbTargetArrow } from "react-icons/tb";
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
import { usePathname, useRouter } from "next/navigation";
import { MdOutlineSaveAlt } from "react-icons/md";
import FormPelatihan from "../admin/formPelatihan";
import Toast from "@/components/toast";
import SertifikatSettingPage1 from "@/components/sertifikat/sertifikatSettingPage1";
import SertifikatSettingPage2 from "@/components/sertifikat/sertifikatSettingPage2";
import { PiStampLight } from "react-icons/pi";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

const TableDataSTTPL: React.FC = () => {
  const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
    React.useState<boolean>(false);
  const [showCertificateSetting, setShowCertificateSetting] =
    React.useState<boolean>(false);

  const pathname = usePathname();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  type Pelatihan = {
    IdPelatihan: number;
    IdLemdik: string;
    KodePelatihan: string;
    NamaPelatihan: string;
    PenyelenggaraPelatihan: string;
    DetailPelatihan: string;
    JenisPelatihan: string;
    BidangPelatihan: string;
    DukunganProgramTerobosan: string;
    TanggalMulaiPelatihan: string;
    TanggalBerakhirPelatihan: string;
    HargaPelatihan: string;
    Instruktur: string;
    FotoPelatihan: string;
    Status: string;
    MemoPusat: string;
    SilabusPelatihan: string;
    LokasiPelatihan: string;
    PelaksanaanPelatihan: string;
    UjiKompetensi: string;
    KoutaPelatihan: string; // type from be, should be KuotaPelatihan
    AsalPelatihan: string;
    JenisSertifikat: string;
    TtdSertifikat: string;
    NoSertifikat: string;
    IdSaranaPrasarana: string;
    IdKonsumsi: string;
    CreatedAt: string;
    UpdatedAt: string;
  };

  const [data, setData] = React.useState<Pelatihan[]>([]);
  const [pelatihan, setPelatihan] = React.useState<Pelatihan[]>([]);

  const handleFetchingPublicTrainingData = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/lemdik/getPelatihan`
      );
      console.log({ response });
      setData(response.data.data);
      setPelatihan(response.data.data);
    } catch (error) {
      console.error("Error posting training data:", error);
      throw error;
    }
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const router = useRouter();
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns: ColumnDef<Pelatihan>[] = [
    {
      accessorKey: "KodePelatihan",
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
      accessorKey: "KodePelatithan",
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

          {pathname.includes("lemdiklat") && (
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
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto border border-yellow-500"
              >
                <Edit3Icon className="h-4 w-4 text-yellow-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Penerbitan STTPL Pelatihan</AlertDialogTitle>
                <AlertDialogDescription className="-mt-2">
                  Lakukan approval pemberitahuan penerbitan STTPL yang dilakukan
                  oleh Balai/Lemdiklat!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <form autoComplete="off">
                <div className="flex flex-wrap  mb-1 w-full">
                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="noSertifikat"
                    >
                      No Sertifikat <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="noSertifikat"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      placeholder="B.45/BPPP.BYW/RSDM.510/I/2024/XXXXX"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-gray-300">
                  <div>
                    <Checkbox />
                  </div>
                  <div className="space-y-1 leading-none">
                    <label>Approve penerbitan STTPL</label>
                    <p className="text-xs leading-[110%] text-gray-600">
                      Dengan ini sebagai pihak pusat saya menyetujui pengajuan
                      penerbitan STTPL oleh balai/lemdiklat.
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
                      title: `Berhasil mengapprove pengajuan penerbitan STTPL!`,
                    })
                  }
                >
                  Approve
                </AlertDialogAction>
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
            <HiUserGroup className="h-4 w-4 text-green-500" />
          </Button>

          {pathname.includes("lemdiklat") && (
            <Button
              onClick={(e) =>
                setShowCertificateSetting(!showCertificateSetting)
              }
              variant="outline"
              className="ml-auto border border-gray-600"
            >
              <TbFileCertificate className="h-4 w-4 text-gray-600" />
            </Button>
          )}
        </div>
      ),
    },
    {
      accessorKey: "NoSertifikat",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`w-full flex items-center justify-center`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            No Sertifikat
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>
          {/* {row.getValue("NoSertifikat")} */}
          B.45/BPPP.BYW/RSDM.510/I/2024/XXXXX
        </div>
      ),
    },
    {
      accessorKey: "KodePelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={``}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Kode Pelatihan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`text-center uppercase`}>
          {row.getValue("KodePelatihan")}
        </div>
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
            Diklat Pelatihan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-center capitalize`}>
          {/* {row.getValue("DiklatPelatihan")} */}
          Pelatihan Diversifikasi Usaha Produk Perikanan/Rumput Laut Bagi
          Masyarakat Kabupaten Alor
        </div>
      ),
    },
    {
      accessorKey: "KodePelatihan",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className={`w-full items-center flex justify-center`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Berita Acara
            <ArrowUpDown className="ml-2 h-4 flex w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Link
          href={"https://elaut.kkp.go.id/storage/lj843jkcj0jdlfaaw2200lp.pdf"}
          className={`text-center underline text-blue-500 w-fit`}
        >
          https://elaut.kkp.go.id/storage/lj843jkcj0jdlfaaw2200lp.pdf
        </Link>
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
            Tanggal Pelaksanaan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={`${"ml-0"} text-center capitalize`}>
          {row.getValue("TanggalPelaksanaan")}
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
            Jumlah Peserta Lulus
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center uppercase">
          <span className="text-green-500 font-semibold">
            {row.getValue("KuotaPeserta")}
          </span>
          /{row.getValue("KuotaPelatihan")}
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
            TTD Sertifikat
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center capitalize">Kepala Badan</div>
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
    handleFetchingPublicTrainingData();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
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
            {/* Statistik Pelatihan */}
            <div className="hidden w-full flex-wrap gap-3 sm:gap-5">
              <div className="flex min-w-47.5">
                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                  <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                </span>
                <div className="w-full">
                  <p className="font-semibold text-primary">Total Pengajuan</p>
                  <p className="text-sm font-medium">10 pelatihan</p>
                </div>
              </div>
              <div className="flex min-w-47.5">
                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                  <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
                </span>
                <div className="w-full">
                  <p className="font-semibold text-secondary">Total Approved</p>
                  <p className="text-sm font-medium">1 pelatihan</p>
                </div>
              </div>
            </div>

            {/* Button Ajukan Permohonan Buka Pelatihan */}
            <div className="flex w-full gap-2 justify-end">
              <Sheet>
                <SheetTrigger asChild>
                  <div className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer">
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
                onClick={(e) => {
                  Toast.fire({
                    icon: "success",
                    title: `Berhasil mengenerate STTPL peserta pelatihan!`,
                  });
                }}
                className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer"
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
          {/* Header Tabel Data Pelatihan */}
          <div className="flex flex-wrap items-center mb-3 justify-between gap-3 sm:flex-nowrap">
            {/* Statistik Pelatihan */}
            <div className="flex w-full flex-wrap gap-3 sm:gap-5">
              <div className="flex min-w-47.5">
                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                  <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                </span>
                <div className="w-full">
                  <p className="font-semibold text-primary">Total Pengajuan</p>
                  <p className="text-sm font-medium">10 pelatihan</p>
                </div>
              </div>
              <div className="flex min-w-47.5">
                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                  <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
                </span>
                <div className="w-full">
                  <p className="font-semibold text-secondary">Total Approved</p>
                  <p className="text-sm font-medium">1 pelatihan</p>
                </div>
              </div>
            </div>

            {pathname.includes("lemdiklat") && (
              <div className="flex w-full gap-2 justify-end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 cursor-pointer">
                      <FiUploadCloud />
                      Pemberitahuan Penerbitan STTPL
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Pemberitahuan Penerbitan STTPL ke Pusat
                      </AlertDialogTitle>
                      <AlertDialogDescription className="-mt-2">
                        Dalam penerbitan STTPL, diharapkan dapat memberitahu
                        nomor sertifikat yang akan diajukan beserta berita acara
                        ke Pusat Pelatihan KP untuk dilakukan approval!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <form autoComplete="off">
                      <div className="flex flex-wrap mb-1 w-full">
                        <div className="w-full">
                          <label
                            className="block text-gray-800 text-sm font-medium mb-1"
                            htmlFor="name"
                          >
                            Pelatihan Tersedia{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <Select>
                            <SelectTrigger className="w-full text-base py-6">
                              <SelectValue placeholder="Pilih pelatihan yang diajukan" />
                            </SelectTrigger>
                            <SelectContent className="w-fit">
                              {pelatihan.map((item: Pelatihan, index) => (
                                <SelectItem
                                  className="w-[450px]"
                                  value={item.NamaPelatihan}
                                >
                                  {item.NamaPelatihan}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-wrap  mb-1 w-full">
                        <div className="w-full">
                          <label
                            className="block text-gray-800 text-sm font-medium mb-1"
                            htmlFor="noSertifikat"
                          >
                            No Sertifikat{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="noSertifikat"
                            type="text"
                            className="form-input w-full text-black border-gray-300 rounded-md"
                            placeholder="B.45/BPPP.BYW/RSDM.510/I/2024/XXXXX"
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
                            TTD Sertifikat{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <Select>
                            <SelectTrigger className="w-full text-base py-6">
                              <SelectValue placeholder="Pilih pelatihan yang diajukan" />
                            </SelectTrigger>
                            <SelectContent className="w-fit">
                              <SelectItem
                                className="w-[450px]"
                                value={"Kepala BPPSDM"}
                              >
                                Kepala BPPSDM
                              </SelectItem>
                              <SelectItem
                                className="w-[450px]"
                                value={"Kepala BPPSDM"}
                              >
                                Kepala Balai
                              </SelectItem>
                              <SelectItem
                                className="w-[450px]"
                                value={"DJPL Kemenhub"}
                              >
                                DJPL Kemenhub
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 space-y-2">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="name"
                        >
                          Berita Acara <span className="text-red-600">*</span>
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col rounded-lg border-2 border-dashed w-full h-40 p-10 group text-center">
                            <div className="h-full w-full text-center flex flex-col items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                              </svg>
                              <p className="pointer-none text-gray-500 text-sm">
                                <span className="text-sm">Drag and drop</span>{" "}
                                files here <br /> or{" "}
                                <a
                                  href=""
                                  id=""
                                  className="text-blue-600 hover:underline"
                                >
                                  select a file
                                </a>{" "}
                                from your computer
                              </p>
                            </div>
                            <input type="file" className="hidden" />
                          </label>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300">
                        <span>File type: doc,pdf,types of images</span>
                      </p>
                    </form>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
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

export default TableDataSTTPL;
