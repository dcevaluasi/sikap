import React, { useState } from "react";
import * as XLSX from "xlsx";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { useReactToPrint } from "react-to-print";



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
import { ArrowUpDown, Edit3Icon, LucideListChecks, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  TbBroadcast,
  TbCalendarCheck,
  TbChartBubble,
  TbChartDonut,
  TbCircleKey,
  TbClipboardCheck,
  TbDatabaseEdit,
  TbEditCircle,
  TbFileCertificate,
  TbFileStack,
  TbInfoCircleFilled,
  TbRubberStamp,
  TbSchool,
  TbTargetArrow,
} from "react-icons/tb";
import { IoIosInformationCircle, IoMdCloseCircle } from "react-icons/io";
import { FiUploadCloud } from "react-icons/fi";

import { usePathname, useRouter } from "next/navigation";
import { Pelatihan, PelatihanMasyarakat, UserPelatihan } from "@/types/product";
import axios, { AxiosError, AxiosResponse } from "axios";
import { extractLastSegment, extractSecondLastSegment } from "@/utils";
import {
  HiMiniNewspaper,
  HiMiniUserGroup,
  HiOutlineDocument,
  HiUserGroup,
} from "react-icons/hi2";
import { RiShipLine, RiVerifiedBadgeFill } from "react-icons/ri";
import Link from "next/link";
import { FaBookOpen, FaMapPin, FaRupiahSign } from "react-icons/fa6";
import Toast from "@/components/toast";
import { GiTakeMyMoney } from "react-icons/gi";
import Cookies from "js-cookie";
import { PiExam, PiFilePdf, PiKeyFill, PiMicrosoftExcelLogoFill } from "react-icons/pi";
import TableData from "../../Tables/TableData";
import { dpkakpBaseUrl } from "@/constants/urls";
import { getIdUjianKeahlianInPathPesertaUjian } from "@/components/utils/dpkakp/pathname";
import { BsFileExcel, BsPersonVcard } from "react-icons/bs";
import { Ujian, UsersUjian } from "@/types/ujian-keahlian-akp";
import { HashLoader } from "react-spinners";
import autoTable from "jspdf-autotable";
import Image from "next/image";
import { generateTanggalPelatihan } from "@/utils/text";
import { IoArrowBackSharp, IoPrintOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { UserInformationDPKAKP } from "@/types/dpkakp";

const TableDataPesertaUjianKeahlian = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const pathname = usePathname();
  const idUjianKeahlian = getIdUjianKeahlianInPathPesertaUjian(pathname!);
  console.log("PATHNAME", pathname);
  console.log("IDUJIAN", idUjianKeahlian);
  const id = extractSecondLastSegment(pathname);
  const [noSertifikatTerbitkan, setNoSertifikatTerbitkan] = React.useState("");

  const printRef = React.useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Kartu Peserta Ujian",
    onAfterPrint: () => console.log("PDF generated successfully!"),
  });

  const [showKartuUjian, setShowKartuUjian] = React.useState<boolean>(false)
  const [dataPukakp, setDataPukakp] = React.useState<UserInformationDPKAKP | null>(null)

  const handleFetchInformasiPUKAKP = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getAdminPusat`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      console.log(response);
      setDataPukakp(response.data.data)

      setIsFetching(false);
    } catch (error) {
      console.error(error);
      setIsFetching(false);
      throw error;
    }
  }

  const [showRekapitulasiNilai, setShowRekapitulasiNilai] = React.useState<boolean>(false)
  const printRefRekapitulasiNilai = React.useRef<HTMLDivElement>(null);
  const handlePrintRekapitulasiNilai = useReactToPrint({
    content: () => printRefRekapitulasiNilai.current,
    documentTitle: "Rekapitulasi Hasil Ujian",
    onAfterPrint: () => console.log("PDF generated successfully!"),
  });

  /**
   * =============================================================
   * UTILS FOR FETCHING UJIAN KEAHLIAN DATA
   * =============================================================
   */

  /*============== STORE DATA VARIABLES ================ */
  const [data, setData] = React.useState<UsersUjian[]>([]);
  const [dataUjian, setDataUjian] = React.useState<Ujian[]>([]);

  /*================== LOADER VARIABLES ================= */
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  /*=============== HANDLING FETCHING UJIAN ============== */
  const handleFetchingUjianKeahlianData = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/GetUjian?id=${idUjianKeahlian}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      console.log(response);
      setData(response.data.data[0]!.UsersUjian!);
      setDataUjian(response.data.data);

      setIsFetching(false);
    } catch (error) {
      console.error(error);
      setIsFetching(false);
      throw error;
    }
  };

  const [isOpenFormUjianKeahlian, setIsOpenFormUjianKeahlian] =
    React.useState<boolean>(false);

  const [selectedIdPeserta, setSelectedIdPeserta] = React.useState(0);

  const [nilaiKomprehensif, setNilaiKomprehensif] = React.useState<string>("");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns: ColumnDef<UsersUjian>[] = [
    {
      accessorKey: "IdUserUjian",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-gray-900 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center uppercase">{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "Nik",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className={`${usePathname().includes("pukakp") ? "flex" : "hidden"
            } w-full text-gray-900 font-semibold`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Action
          <TbDatabaseEdit className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div
          className={`w-full ${usePathname().includes("pukakp") ? "flex" : "hidden"
            }  flex-col gap-2`}
        >
          <div className="flex  w-full items-center justify-center gap-1">
            <Button variant="outline" className="bg-[#000] text-white hover:text-white hover:bg-[#000] w-full">
              <TbInfoCircleFilled className="h-4 w-4" /> Detail Peserta
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="bg-rose-600 text-white hover:text-white hover:bg-rose-600 w-full">
                  <Trash className="h-4 w-4 " /> Hapus Data
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="bg-indigo-600 text-white hover:text-white hover:bg-indigo-600 w-full">
                  <PiKeyFill className="h-4 w-4 text-lg " /> Kode Akses
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Daftar Kode Akses Ujian Keahlian
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Berikut merupakan kode akses untuk dapat melakukan proses
                    ujian keahlian awak kapal perikanan, gunakan kode akses
                    sesuai fungsi yang dikerjakan!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <table className="w-full text-sm">
                  {
                    dataUjian!.length > 0 ? <thead>
                      {
                        dataUjian[0]!.TypeUjian.includes('Rewarding') ? <tr>
                          <th className="border border-gray-200">F1</th>
                          <th className="border border-gray-200">F2</th>
                          <th className="border border-gray-200">F3</th>
                        </tr> : <tr>
                          <th className="border border-gray-200">F1B1</th>
                          <th className="border border-gray-200">F1B2</th>
                          <th className="border border-gray-200">F1B3</th>
                          <th className="border border-gray-200">F2B1</th>
                          <th className="border border-gray-200">F3B1</th>
                          <th className="border border-gray-200">F3B2</th>
                        </tr>
                      }
                    </thead> : <></>
                  }

                  <tbody>
                    <tr>
                      {row.original.CodeAksesUsersBagian.map(
                        (codeAccess, index) => (
                          <td
                            key={index}
                            className="border text-center border-gray-200"
                          >
                            {codeAccess.KodeAkses}
                          </td>
                        )
                      )}
                      {
                        Array.from({
                          length: 6 - row.original.CodeAksesUsersBagian.length,
                        }).map((_, index) => (
                          <td
                            key={`empty-${index}`}
                            className="border text-center border-gray-200"
                          >
                            {/* Empty cell */}
                          </td>
                        ))
                      }
                    </tr>
                  </tbody>
                </table>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-900 text-white hover:bg-gray-800 hover:text-white">
                    Tutup
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "Nama",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-0 !text-left w-[270px] flex items-center justify-start text-gray-900 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <TbSchool className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-0 text-left capitalize">
          <p className="text-base font-semibold tracking-tight leading-none">
            {row.getValue("Nama")}
          </p>
          <div className="ml-0 text-left capitalize mt-1">
            <p className="text-xs font-medium capitalize">
              <span className="flex items-center gap-1 leading-[105%]">
                <BsPersonVcard className="text-sm" />
                <span>NIK : {row.original.Nik}</span>
              </span>
              <span className="flex items-center gap-1 leading-[105%]">
                <TbTargetArrow className="text-base" />
                <span>
                  TTL : {row.original.TempatLahir}, {row.original.TanggalLahir}
                </span>
              </span>

              <span className="flex items-center gap-1 leading-[105%]">
                <HiUserGroup className="text-base" />
                <span>Instansi : {row.original.Instansi}</span>
              </span>
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "NomorUjian",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-black font-semibold w-full  p-0 flex justify-center items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="leading-[105%]">Nomor Ujian</p>
          <HiMiniUserGroup className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className=" capitalize w-full flex items-center justify-center">
          <p className="text-sm font-normal tracking-tight leading-none">
            {row.getValue("NomorUjian")}
          </p>
        </div>
      ),
    },

    {
      accessorKey: "NilaiF1B1",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-black font-semibold w-full ml-auto p-0 flex justify-center items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="leading-[105%]">Nilai F1B1</p>
          <TbClipboardCheck className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-auto capitalize w-full flex items-center justify-center">
          <p className="text-sm font-normal tracking-tight leading-none">
            {row.getValue("NilaiF1B1")}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "NilaiF1B2",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-black font-semibold w-full ml-auto p-0 flex justify-center items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="leading-[105%]">Nilai F1B2</p>
          <TbClipboardCheck className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-auto capitalize w-full flex items-center justify-center">
          <p className="text-sm font-normal tracking-tight leading-none">
            {row.getValue("NilaiF1B2")}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "NilaiF1B3",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-black font-semibold w-full ml-auto p-0 flex justify-center items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="leading-[105%]">Nilai F1B3</p>
          <TbClipboardCheck className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-auto capitalize w-full flex items-center justify-center">
          <p className="text-sm font-normal tracking-tight leading-none">
            {row.getValue("NilaiF1B3")}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "NilaiF1B3",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-black font-semibold w-full ml-auto p-0 flex justify-center items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="leading-[105%]">Total Nilai F1</p>
          <TbClipboardCheck className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-auto capitalize w-full flex items-center justify-center">
          <p className="text-sm font-normal tracking-tight leading-none">
            {(
              (row.original.NilaiF1B1 +
                row.original.NilaiF1B2 +
                row.original.NilaiF1B3) /
              3
            ).toFixed(2)}
          </p>
        </div>
      ),
    },

    {
      accessorKey: "NilaiF2B1",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-black font-semibold w-full ml-auto p-0 flex justify-center items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="leading-[105%]">Nilai F2B1</p>
          <TbClipboardCheck className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-auto capitalize w-full flex items-center justify-center">
          <p className="text-sm font-normal tracking-tight leading-none">
            {row.getValue("NilaiF2B1")}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "NilaiF3B1",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-black font-semibold w-full ml-auto p-0 flex justify-center items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="leading-[105%]">Nilai F3B1</p>
          <TbClipboardCheck className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-auto capitalize w-full flex items-center justify-center">
          <p className="text-sm font-normal tracking-tight leading-none">
            {row.getValue("NilaiF3B1")}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "NilaiF3B2",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-black font-semibold w-full ml-auto p-0 flex justify-center items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="leading-[105%]">Nilai F3B2</p>
          <TbClipboardCheck className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-auto capitalize w-full flex items-center justify-center">
          <p className="text-sm font-normal tracking-tight leading-none">
            {row.getValue("NilaiF3B2")}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "Status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-black font-semibold w-full ml-auto p-0 flex justify-center items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="leading-[105%]">Total Nilai F3</p>
          <TbClipboardCheck className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-auto capitalize w-full flex items-center justify-center">
          <p className="text-sm font-normal tracking-tight leading-none">
            {((row.original.NilaiF3B1 + row.original.NilaiF3B2) / 2).toFixed(2)}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "TanggalLahir",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-black font-semibold w-full ml-auto p-0 flex justify-center items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="leading-[105%]">Nilai Kumulatif</p>
          <TbClipboardCheck className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-auto capitalize w-full flex items-center justify-center">
          <p className="text-sm font-normal tracking-tight leading-none">
            {(
              ((row.original.NilaiF1B1 +
                row.original.NilaiF1B2 +
                row.original.NilaiF1B3) /
                3 +
                row.original.NilaiF2B1 +
                (row.original.NilaiF3B1 + row.original.NilaiF3B2) / 2) /
              3
            ).toFixed(2)}
          </p>
        </div>
      ),
    },

    {
      accessorKey: "NilaiKomprensif",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-black font-semibold w-full ml-auto p-0 flex justify-center items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="leading-[105%]">Nilai Komprehensif</p>
          <TbClipboardCheck className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const {
          NilaiF1B1,
          NilaiF1B2,
          NilaiF1B3,
          NilaiF2B1,
          NilaiF3B1,
          NilaiF3B2,
          NilaiKomprensif,
        } = row.original;

        // Check if all required values are not 0
        const isVisible =
          NilaiF1B1 !== 0 &&
          NilaiF1B2 !== 0 &&
          NilaiF1B3 !== 0 &&
          NilaiF2B1 !== 0 &&
          NilaiF3B1 !== 0 &&
          NilaiF3B2 !== 0;

        // Render only if all required fields are non-zero
        return !isVisible ? (
          <div className="ml-auto capitalize w-full flex items-center justify-center">
            {NilaiKomprensif === 0 ? (
              <Button
                onClick={(e) => {
                  setSelectedIdPeserta(row.original.IdUserUjian);
                  setIsOpenFormUjianKeahlian(!isOpenFormUjianKeahlian);
                }}
                variant="outline"
                className="bg-teal-600 hover:bg-teal-600 text-neutral-200 rounded-md hover:text-neutral-200"
              >
                <TbEditCircle className="h-5 w-5 mr-1" />
                Masukkan Nilai
              </Button>
            ) : (
              <p className="text-sm font-normal tracking-tight leading-none">
                {row.getValue("NilaiKomprensif")}
              </p>
            )}
          </div>
        ) : null; // Hide if any of the required fields is 0

        // Render only if all required fields are non-zero

      }
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

  const [isOpenFormInputNilai, setIsOpenFormInputNilai] = React.useState(false);
  const [nilaiPretest, setNilaiPretest] = React.useState("");
  const [nilaiPosttest, setNilaiPosttest] = React.useState("");

  const [isOpenFormPeserta, setIsOpenFormPeserta] =
    React.useState<boolean>(false);
  const [fileExcelPesertaPelatihan, setFileExcelPesertaPelatihan] =
    React.useState<File | null>(null);
  const handleFileChange = (e: any) => {
    setFileExcelPesertaPelatihan(e.target.files[0]);
  };
  const handleUploadImportPesertaPelatihan = async (e: any) => {
    e.preventDefault();

    if (dataUjian.length > 0) {
      if (dataUjian[0]!.UsersUjian.length > 0) {
        Toast.fire({
          icon: "error",
          title: `Maaf import peserta hanya dapat dilakukan sekali, kamu tidak bisa menambahkan lagi setelah mengimport data!`,
        });
        handleFetchingUjianKeahlianData();
        setIsOpenFormPeserta(!isOpenFormPeserta);
        return;
      }
    }

    const formData = new FormData();
    formData.append("IdUjian", id);
    if (fileExcelPesertaPelatihan != null) {
      formData.append("file", fileExcelPesertaPelatihan);
    }

    try {
      const response = await axios.post(
        `${dpkakpBaseUrl}/exportPesertaPelatihan`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      console.log("FILE UPLOADED PESERTA : ", response);
      Toast.fire({
        icon: "success",
        title: `Selamat anda berhasil mengupload peserta ujian keahlian!`,
      });
      handleFetchingUjianKeahlianData();
      setIsOpenFormPeserta(!isOpenFormPeserta);
    } catch (error) {
      console.log("FILE IMPORT PESERTA PELATIHAN : ", error);
      setIsOpenFormPeserta(!isOpenFormPeserta);
      if (error instanceof AxiosError) {
        if (error.response?.status == 400) {
          Toast.fire({
            icon: "error",
            title: "Ups, gagal!",
            text: `Jumlah peserta yang kamu import melebih jumlah yang kamu ajukan pada saat permohonan!`,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "Ups, gagal!",
            text: `Gagal mengupload peserta ujian keahlian!`,
          });
        }
      }

      handleFetchingUjianKeahlianData();
    }
  };

  const [isLoadingSematkanSoal, setIsLoadingSematkanSoal] =
    React.useState<boolean>(false);

  const handleSematkanSoalUjianKeahlianToPeserta = async (e: any) => {
    setIsLoadingSematkanSoal(true);
    if (data.length > 0) {
      if (data[0]!.CodeAksesUsersBagian.length > 0) {
        Toast.fire({
          icon: "error",
          title: 'Oopsss!',
          text: `Maaf sematkan soal peserta hanya dapat dilakukan sekali, kamu tidak bisa menyematkan kembali`,
        });
        handleFetchingUjianKeahlianData();
        setIsLoadingSematkanSoal(false);
        return;
      }
    }

    e.preventDefault();
    try {
      const response = await axios.post(
        `${dpkakpBaseUrl}/adminPusat/AddSoalToUsers`,
        {
          id_ujian: getIdUjianKeahlianInPathPesertaUjian(pathname!),
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
        title: 'Yeayyy!',
        text: `Selamat anda berhasil menyematkan soal ujian ke peserta ujian keahlian!`,
      });
      setHandleOpenFormSematkan(false)
      setIsLoadingSematkanSoal(false);
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: 'Oopsss!',
        text: `Gagal anda berhasil menyematkan soal ujian ke peserta ujian keahlian!`,
      });
      setHandleOpenFormSematkan(false)
      setIsLoadingSematkanSoal(false);
    }
  };

  const exportToExcel = () => {
    if (!data || data.length === 0) {
      console.error("No data to export.");
      return;
    }

    // Flatten the data and format as per the requirements
    const flattenedData = data.flatMap((user) => {
      return user.CodeAksesUsersBagian.map((bagian) => ({
        Nama: user.Nama,
        NIK: user.Nik,
        Instansi: user.Instansi,
        "Nomor Ujian": user.NomorUjian,
        "ID Bagian": bagian.IdBagian,
        "Nama Bagian": bagian.NamaBagian,
        "Kode Akses": bagian.KodeAkses, // Add KodeAkses value for each NamaBagian
      }));
    });

    // Create a worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ExportedData");

    // Export the Excel file
    const currentDate = new Date().toISOString().slice(0, 10);
    const fileName = `ExportedData_${currentDate}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const [isUploading, setIsUploading] = React.useState<boolean>(false);

  const handleUploadNilaiKomprehensif = async (e: any) => {
    setIsUploading(true);

    try {
      const response = await axios.post(
        `${dpkakpBaseUrl}/penguji/inputNilaiKompre?id=${selectedIdPeserta}`,
        {
          nilai_komprensif: nilaiKomprehensif,
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
        title: `Berhasil menginput nilai komprehensif peserta ujian!`,
      });
      handleFetchingUjianKeahlianData();
      setIsOpenFormUjianKeahlian(false);
      setIsUploading(false);
      setNilaiKomprehensif("");
      setSelectedIdPeserta(0);
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: `Gagal menginput nilai komprehensif peserta ujian!`,
      });
      handleFetchingUjianKeahlianData();
      setIsOpenFormUjianKeahlian(false);
      setIsUploading(false);
      setNilaiKomprehensif("");
      setSelectedIdPeserta(0);
    }
  };

  React.useEffect(() => {
    handleFetchingUjianKeahlianData();
    handleFetchInformasiPUKAKP()
  }, []);

  console.log({ dataPukakp })

  React.useEffect(() => {
    const checkClipboard = async () => {
      try {
        const clipboardItems = await navigator.clipboard.read();
        for (const item of clipboardItems) {
          if (item.types.includes("image/png") || item.types.includes("image/jpeg")) {
            Toast.fire({
              icon: "error",
              title: "Maaf import peserta hanya dapat dilakukan sekali, kamu tidak bisa menambahkan lagi setelah mengimport data!",
            });
            break;
          }
        }
      } catch (error) {
        console.error("Clipboard access error: ", error);
      }
    };

    document.addEventListener("keydown", (event) => {
      if (event.key === "PrintScreen") {
        checkClipboard();
      }
    });

    return () => {
      document.removeEventListener("keydown", checkClipboard);
    };
  }, []);

  const exportToPDF = (data: any[]) => {
    const doc = new jsPDF();

    // Table headers
    const tableHeaders = [
      [
        "No",
        "NIK",
        "Nama",
        "Nomor Ujian",
        "Nilai F1B1",
        "Nilai F1B2",
        "Nilai F1B3",
        "Total Nilai F1",
        "Nilai F2B1",
        "Nilai F3B1",
        "Nilai F3B2",
        "Total Nilai F3",
        "Nilak Kumulatif",
        "Nilai Komprehensif",
      ],
    ];

    // Map data to match table structure
    const tableData = data.map((row, index) => [
      index + 1,
      row.Nik,
      row.Nama,
      row.NomorUjian,
      row.NilaiF1B1,
      row.NilaiF1B2,
      row.NilaiF1B3,
      ((row.NilaiF1B1 + row.NilaiF1B2 + row.NilaiF1B3) / 3).toFixed(2),
      row.NilaiF2B1,
      row.NilaiF3B1,
      row.NilaiF3B2,
      ((row.NilaiF3B1 + row.NilaiF3B2) / 2).toFixed(2),
      (((row.NilaiF1B1 + row.NilaiF1B2 + row.NilaiF1B3) / 3).toFixed(2) + row.NilaiF2B1 + ((row.NilaiF3B1 + row.NilaiF3B2) / 2).toFixed(2)),
      row.NilaiKomprensif,
    ]);

    // Add table to the PDF using autoTable
    autoTable(doc, {
      head: tableHeaders,
      body: tableData,
      startY: 20, // Starting Y position
      styles: { fontSize: 8, cellPadding: 2 }, // Adjust styling
      headStyles: { fillColor: [22, 160, 133] }, // Header color (customize as needed)
      alternateRowStyles: { fillColor: [240, 240, 240] }, // Alternate row background
      theme: "grid", // Table style theme
    });

    // Save the PDF
    doc.save(`"Hasil Nilai Ujian ${dataUjian[0]!.NamaUjian}.pdf`);
  };

  const [handleOpenFormSematkan, setHandleOpenFormSematkan] = React.useState<boolean>(false)
  const calculateResults = (dataUjian: any[], pesertaUjianList: any[]) => {
    let lulusCount = 0;
    let tidakLulusCount = 0;

    pesertaUjianList.forEach((pesertaUjian) => {
      const isRewarding = dataUjian[0]?.TypeUjian.includes('Rewarding');

      const averageScore = isRewarding
        ? ((pesertaUjian?.NilaiF1B1 || 0) + (pesertaUjian?.NilaiF2B1 || 0) + (pesertaUjian?.NilaiF3B1 || 0)) / 3
        : ((pesertaUjian?.NilaiF1B1 || 0) +
          (pesertaUjian?.NilaiF1B2 || 0) +
          (pesertaUjian?.NilaiF1B3 || 0) +
          (pesertaUjian?.NilaiF2B1 || 0) +
          (pesertaUjian?.NilaiF3B1 || 0) +
          (pesertaUjian?.NilaiF3B2 || 0)) / 6;

      if (averageScore > 60) {
        lulusCount++;
      } else {
        tidakLulusCount++;
      }
    });

    return { lulusCount, tidakLulusCount };
  };



  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default  sm:px-7.5 xl:col-span-8">
      <AlertDialog open={isOpenFormInputNilai}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {" "}
              <HiMiniUserGroup className="h-4 w-4" />
              Upload Nilai Peserta
            </AlertDialogTitle>
            <AlertDialogDescription className="-mt-2">
              Upload nilai peserta pelatihan yang diselenggarakan yang nantinya
              akan tercantum pada sertifikat peserta pelatihan!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset>
            <form autoComplete="off">
              <div className="flex gap-2 w-full">
                <div className="flex gap-2 mb-1 w-full">
                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Nilai Pre Test <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      required
                      value={nilaiPretest}
                      onChange={(e) => setNilaiPretest(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Nilai Post Test <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input w-full text-black border-gray-300 rounded-md"
                      required
                      value={nilaiPosttest}
                      onChange={(e) => setNilaiPosttest(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <AlertDialogFooter className="mt-3">
                <AlertDialogCancel
                  onClick={(e) =>
                    setIsOpenFormInputNilai(!isOpenFormInputNilai)
                  }
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction>Upload</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </fieldset>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isOpenFormPeserta}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {" "}
              <HiMiniUserGroup className="h-4 w-4" />
              Import Peserta Ujian
            </AlertDialogTitle>
            <AlertDialogDescription className="-mt-2">
              Import peserta yang akan mengikuti ujian keahlian!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset>
            <form autoComplete="off">
              <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Data By Name By Address <span>*</span>
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="file"
                      className=" text-black h-10 text-base flex items-center cursor-pointer w-full border border-neutral-200 rounded-md"
                      required
                      onChange={handleFileChange}
                    />
                    <Link
                      target="_blank"
                      href={
                        "https://docs.google.com/spreadsheets/d/1lhIr6CeFYx-szSYPATb2aHsi9xNaxFhy/edit?usp=sharing&ouid=112666838213779179844&rtpof=true&sd=true"
                      }
                      className="btn text-white bg-green-600 hover:bg-green-700 py-0 w-[250px] px-0 text-sm"
                    >
                      <PiMicrosoftExcelLogoFill />
                      Unduh Template
                    </Link>
                  </div>
                  <p className="text-gray-700 text-xs mt-1">
                    *Download terlebih dahulu template lalu isi file excel dan
                    upload
                  </p>
                </div>
              </div>

              <AlertDialogFooter className="mt-3 pt-3 border-t border-t-gray-300">
                <AlertDialogCancel
                  onClick={(e) => setIsOpenFormPeserta(!isOpenFormPeserta)}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => handleUploadImportPesertaPelatihan(e)}
                >
                  Upload
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </fieldset>
        </AlertDialogContent>
      </AlertDialog>


      <>
        <div className="flex w-full items-center justify-between mb-2">
          <div className="w-fit flex gap-2">
            {showKartuUjian || showRekapitulasiNilai ? <div
              onClick={() => { setShowKartuUjian(false); setShowRekapitulasiNilai(false) }}
              className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
            >
              <IoArrowBackSharp />
              Kembali
            </div> : <></>
            }

          </div>
          <div className="w-full flex justify-end gap-2">
            {pathname.includes('pukakp') ? !showRekapitulasiNilai && (dataUjian.length != 0 && (dataUjian[0]!.UsersUjian.length != 0 ? showKartuUjian ? <div
              onClick={handlePrint}
              className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
            >
              <IoPrintOutline />
              Print Kartu Ujian Peserta
            </div> : <div
              onClick={() => setShowKartuUjian(true)}
              className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
            >
              <PiFilePdf />
              Generate Kartu Ujian Peserta
            </div> : <></>)) : <></>}


            {
              dataUjian.length != 0 && (dataUjian[0]!.UsersUjian.length != 0 && <> <div
                onClick={() => exportToExcel()}
                className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
              >
                <PiMicrosoftExcelLogoFill />
                Export Kode
              </div>

                {
                  !showKartuUjian && (!showRekapitulasiNilai ? <div
                    onClick={() => setShowRekapitulasiNilai(true)}
                    className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
                  >
                    <BiEditAlt />
                    Rekapitulasi Nilai Ujian
                  </div> : <div
                    onClick={() => handlePrintRekapitulasiNilai()}
                    className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
                  >
                    <IoPrintOutline />
                    Save Nilai Ujian
                  </div>)
                }</>)
            }


            {
              pathname.includes('dpkakp') &&
              <>
                <div onClick={() => setHandleOpenFormSematkan(true)} className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-white p-1.5 cursor-pointer">
                  <FaMapPin />
                  Sematkan Soal Ujian
                </div>
                <AlertDialog open={handleOpenFormSematkan} onOpenChange={setHandleOpenFormSematkan}>

                  <AlertDialogContent >
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Apakah anda yakin akan menyematkan soal ujian?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Pastikan jumlah anggota mu sudah sesuai dengan data
                        peserta ujian yang sudah didaftarkan dan merupakan anggota
                        yang sah tercantum dalam Surat Keputusan Dewan sebagai
                        peserta yang mengikuti ujian keahlian awak kapal
                        Perikanan!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      {isLoadingSematkanSoal ? (
                        <AlertDialogAction className="bg-gray-900">
                          Loading ...
                        </AlertDialogAction>
                      ) : (
                        <>
                          <AlertDialogCancel onClick={() => setHandleOpenFormSematkan(false)}>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={(e) =>
                              handleSematkanSoalUjianKeahlianToPeserta(e)
                            }
                            className="bg-gray-900"
                          >
                            Sematkan
                          </AlertDialogAction>
                        </>
                      )}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog></>
            }

            {dataUjian.length > 0 && dataUjian != null && pathname.includes('pukakp') ? (
              dataUjian[0].UsersUjian.length == dataUjian[0].JumlahPesertaUjian &&
                dataUjian[0].UsersUjian.length > 0 ? (
                <></>
              ) : (
                <div
                  onClick={(e) => setIsOpenFormPeserta(!isOpenFormPeserta)}
                  className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer"
                >
                  <FiUploadCloud />
                  Tambah Peserta Ujian
                </div>
              )
            ) : null}
          </div>
        </div>

        {/* List Data Pelatihan */}

        {(!showKartuUjian && !showRekapitulasiNilai) && (<div>
          <div id="chartOne" className="-ml-5"></div>
          <TableData
            isLoading={false}
            columns={columns}
            table={table}
            type={"long"}
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
        </div>)}

        {
          showKartuUjian && <div className="" ref={printRef}> <div className="grid grid-cols-1 gap-2">
            {
              dataUjian.length != 0 && data!.map((peserta, index) => (
                <div className="flex w-full gap-2">
                  <div className="w-full border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                    <div className="flex flex-row gap-2 items-center justify-center pb-4 border-b border-b-gray-600  md:px-0 -mt-2 w-full">
                      <Image
                        className="block w-16 h-16 "
                        src={"/logo-kkp.png"}
                        width={0}
                        height={0}
                        alt="DPKAKP Logo"
                      />
                      <div className="flex flex-col gap-1 items-center justify-center text-center">
                        <h1 className="font-normal text-gray-800 text-sm md:text-base leading-[110%] mb-5 mt-2">
                          KEMENTERIAN KELAUTAN DAN PERIKANAN <br /> BADAN PENYULUHAN DAN
                          PENGEMBANGAN <br /> SUMBER DAYA MANUSIA KELAUTAN DAN PERIKANAN <br />
                          <span className="font-bold">
                            DEWAN PENGUJI KEAHLIAN AWAK KAPAL PERIKANAN
                          </span>
                        </h1>
                        <p className="font-jakarta max-w-[42rem] leading-[95%] text-gray-600 text-[0.65rem]  -mt-5">
                          GEDUNG MINA BAHARI III Lt.5, JALAN MEDAN MERDEKA TIMUR NOMOR
                          16 JAKARTA 10110 <br /> KOTAK POS 4130 JKP 10041 TELEPON (021)
                          3519070 (LACAK), FAKSIMILE (021) 3513287 <br /> LAMAN
                          <span className="text-blue-500 underline ">
                            https://elaut-bppsdm.go.id/lembaga/dpkakp
                          </span>{" "}
                          SUREL{" "}
                          <span className="text-blue-500 underline">
                            dpkakp@kkp.go.id
                          </span>
                        </p>
                      </div>
                      <Image
                        className="block w-16 h-16 "
                        src={"/lembaga/logo/logo-sertifikasi-akp.png"}
                        width={0}
                        height={0}
                        alt="DPKAKP Logo"
                      />
                    </div>

                    <div className={`flex items-center justify-center w-fit rounded-md px-2 py-2 border ${dataUjian[0]!.TypeUjian.includes('ATKAPIN') ? 'border-rose-500 bg-rose-500 text-rose-600' : 'border-blue-500 bg-blue-500 text-blue-600'} bg-opacity-20 font-medium  mt-5 text-base`}>KARTU PESERTA UJIAN {dataUjian[0]!.TypeUjian}</div>

                    <div className="ml-0 text-left capitalize w-full mt-2">
                      <p className="text-sm font-semibold tracking-tight leading-none border-b py-2 border-b-gray-200">
                        Nama{"   "}: {"          "}<span className="font-normal">{peserta.Nama}</span>
                      </p>
                      <p className="text-sm font-semibold tracking-tight leading-none border-b py-2 border-b-gray-200">
                        NIK{"     "}: {"          "} <span className="font-normal">{peserta.Nik}</span>
                      </p>
                      <p className="text-sm font-semibold tracking-tight leading-none border-b py-2 border-b-gray-200">
                        Tempat, Tanggal Lahir{"   "}: {"          "} <span className="font-normal">{peserta.TempatLahir}, {peserta.TanggalLahir}</span>
                      </p>
                      <p className="text-sm font-semibold tracking-tight leading-none border-b py-2 border-b-gray-200">
                        Asal Sekolah/Instansi{"   "}: {"          "} <span className="font-normal">
                          {peserta.Instansi}
                        </span>
                      </p>

                    </div>

                    <div className="flex flex-col gap">
                      <div className={`flex items-center justify-center w-fit rounded-md px-2 py-2 border border-gray-300 bg-gray-400 bg-opacity-20 font-medium  mt-5 text-base uppercase`}>
                        <p className="text-sm">
                          Nomor Ujian{"     "}:
                        </p>
                        <p className="font-semibold">
                          25T250001</p></div>
                    </div>

                    {dataPukakp != null ? <div className="flex items-center justify-between w-full mb-5 mt-6 gap-8">
                      <div className="flex flex-col gap-1 capitalize">
                        <p className="capitalize text-sm">
                          {
                            dataUjian[0]!.TempatUjian
                          }, {generateTanggalPelatihan(dataUjian[0]!.TanggalMulaiUjian)}
                        </p>
                        <p className="font-semibold text-sm">Ketua PUKAKP</p>
                        <p className="text-xs">{dataUjian[0]!.PUKAKP}</p>

                        <p className="text-sm border-b-black border-b mt-14">{dataPukakp.KetuaPukakp}</p>
                        <p className="text-sm ">NIP. {dataPukakp.NipKetua}</p>
                      </div>
                      <div className="w-35 h-40 rounded-md border border-gray-300"></div>
                    </div> : <div className="flex items-center justify-between w-full mb-5 mt-6 gap-8">
                      <div className="flex flex-col gap-1 capitalize">
                        <p className="capitalize text-sm">
                          {
                            dataUjian[0]!.TempatUjian
                          }, {generateTanggalPelatihan(dataUjian[0]!.TanggalMulaiUjian)}
                        </p>
                        <p className="font-semibold text-sm">Ketua PUKAKP</p>
                        <p className="text-xs">{dataUjian[0]!.PUKAKP}</p>

                        <p className="text-sm border-b-black border-b mt-14">Nama</p>
                        <p className="text-sm ">NIP</p>
                      </div>
                      <div className="w-35 h-40 rounded-md border border-gray-300"></div>
                    </div>}



                  </div>
                  <div className="w-full border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-start">
                    <div className="flex flex-row gap-2 items-center justify-center pb-4 border-b border-b-gray-600  md:px-0 -mt-2 w-full">
                      <Image
                        className="block w-16 h-16 "
                        src={"/logo-kkp.png"}
                        width={0}
                        height={0}
                        alt="DPKAKP Logo"
                      />
                      <div className="flex flex-col gap-1 items-center justify-center text-center">
                        <h1 className="font-normal text-gray-800 text-sm md:text-base leading-[110%] mb-5 mt-2">
                          KEMENTERIAN KELAUTAN DAN PERIKANAN <br /> BADAN PENYULUHAN DAN
                          PENGEMBANGAN <br /> SUMBER DAYA MANUSIA KELAUTAN DAN PERIKANAN <br />
                          <span className="font-bold">
                            DEWAN PENGUJI KEAHLIAN AWAK KAPAL PERIKANAN
                          </span>
                        </h1>
                        <p className="font-jakarta max-w-[42rem] leading-[95%] text-gray-600 text-[0.65rem]  -mt-5">
                          GEDUNG MINA BAHARI III Lt.5, JALAN MEDAN MERDEKA TIMUR NOMOR
                          16 JAKARTA 10110 <br /> KOTAK POS 4130 JKP 10041 TELEPON (021)
                          3519070 (LACAK), FAKSIMILE (021) 3513287 <br /> LAMAN
                          <span className="text-blue-500 underline ">
                            https://elaut-bppsdm.go.id/lembaga/dpkakp
                          </span>{" "}
                          SUREL{" "}
                          <span className="text-blue-500 underline">
                            dpkakp@kkp.go.id
                          </span>
                        </p>
                      </div>
                      <Image
                        className="block w-16 h-16 "
                        src={"/lembaga/logo/logo-sertifikasi-akp.png"}
                        width={0}
                        height={0}
                        alt="DPKAKP Logo"
                      />
                    </div>

                    <div className={`flex items-center justify-center w-fit rounded-md px-2 py-2 border ${dataUjian[0]!.TypeUjian.includes('ATKAPIN') ? 'border-rose-500 bg-rose-500 text-rose-600' : 'border-blue-500 bg-blue-500 text-blue-600'} bg-opacity-20 font-medium  mt-5 text-base`}>KARTU PESERTA UJIAN {dataUjian[0]!.TypeUjian}</div>

                    {
                      dataUjian[0]!.TypeUjian.includes('Rewarding') ? peserta!.CodeAksesUsersBagian!.length != 0 && <div className="flex flex-col w-full border-t border-r border-gray-400 mt-6 rounded-md">
                        <div className="flex flex-shrink-0 bg-gray-400 text-white">
                          <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>F1</span></div>
                          <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>F2</span></div>
                          <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>F3</span></div>
                        </div>
                        <div className="overflow-auto">
                          <div className="flex flex-shrink-0">
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>{peserta!.CodeAksesUsersBagian[0]!.KodeAkses || ''}</span></div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>{peserta!.CodeAksesUsersBagian[1]!.KodeAkses || ''}</span></div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>{peserta!.CodeAksesUsersBagian[2]!.KodeAkses || ''}</span></div>
                          </div>
                        </div>

                      </div> :
                        peserta!.CodeAksesUsersBagian!.length != 0 && <div className="flex flex-col w-full border-t border-r border-gray-400 mt-6 rounded-md">
                          <div className="flex flex-shrink-0 bg-gray-400 text-white">
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>F1B1</span></div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>F1B2</span></div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>F1B3</span></div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>F2B1</span></div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>F3B1</span></div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>F3B2</span></div>
                          </div>
                          <div className="overflow-auto">
                            <div className="flex flex-shrink-0">
                              <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>{peserta!.CodeAksesUsersBagian[0]!.KodeAkses || ''}</span></div>
                              <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>{peserta!.CodeAksesUsersBagian[1]!.KodeAkses || ''}</span></div>
                              <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>{peserta!.CodeAksesUsersBagian[2]!.KodeAkses || ''}</span></div>
                              <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>{peserta!.CodeAksesUsersBagian[3]!.KodeAkses || ''}</span></div>
                              <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>{peserta!.CodeAksesUsersBagian[4]!.KodeAkses || ''}</span></div>
                              <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center"><span>{peserta!.CodeAksesUsersBagian[5]!.KodeAkses || ''}</span></div>
                            </div>
                          </div>

                        </div>
                    }



                    {dataPukakp != null ? <div className="flex items-center justify-between w-full mb-5 mt-6 gap-8">
                      <div className="flex flex-col gap-1 capitalize">
                        <p className="capitalize text-sm">
                          {
                            dataUjian[0]!.TempatUjian
                          }, {generateTanggalPelatihan(dataUjian[0]!.TanggalMulaiUjian)}
                        </p>
                        <p className="font-semibold text-sm">Ketua PUKAKP</p>
                        <p className="text-xs">{dataUjian[0]!.PUKAKP}</p>

                        <p className="text-sm border-b-black border-b mt-14">{dataPukakp.KetuaPukakp}</p>
                        <p className="text-sm ">NIP. {dataPukakp.NipKetua}</p>
                      </div>
                      <div className="w-35 h-40 rounded-md "></div>
                    </div> : <div className="flex items-center justify-between w-full mb-5 mt-6 gap-8">
                      <div className="flex flex-col gap-1 capitalize">
                        <p className="capitalize text-sm">
                          {
                            dataUjian[0]!.TempatUjian
                          }, {generateTanggalPelatihan(dataUjian[0]!.TanggalMulaiUjian)}
                        </p>
                        <p className="font-semibold text-sm">Ketua PUKAKP</p>
                        <p className="text-xs">{dataUjian[0]!.PUKAKP}</p>

                        <p className="text-sm border-b-black border-b mt-14">Nama</p>
                        <p className="text-sm ">NIP</p>
                      </div>
                      <div className="w-35 h-40 rounded-md "></div>
                    </div>}


                  </div>
                </div>

              ))
            }
          </div></div>
        }

        {
          showRekapitulasiNilai && <div className="border border-gray-300">
            <div className="" ref={printRefRekapitulasiNilai}> <div className="grid grid-cols-1 gap-2 w-full">
              {
                dataUjian.length != 0 &&
                <div className="flex w-full gap-2">
                  <div className="w-full rounded-lg p-6 flex flex-col items-center justify-center">
                    <div className="flex flex-row gap-2 items-center justify-center pb-4 border-b border-b-gray-600  md:px-0 -mt-2 w-full">
                      <Image
                        className="block w-16 h-16 "
                        src={"/logo-kkp.png"}
                        width={0}
                        height={0}
                        alt="DPKAKP Logo"
                      />
                      <div className="flex flex-col gap-1 items-center justify-center text-center">
                        <h1 className="font-normal text-gray-800 text-sm md:text-lg leading-[110%] mb-5 mt-2">
                          KEMENTERIAN KELAUTAN DAN PERIKANAN <br /> BADAN PENYULUHAN DAN
                          PENGEMBANGAN <br /> SUMBER DAYA MANUSIA KELAUTAN DAN PERIKANAN <br />
                          <span className="font-bold">
                            DEWAN PENGUJI KEAHLIAN AWAK KAPAL PERIKANAN
                          </span>
                        </h1>
                        <p className="font-jakarta max-w-[42rem] leading-[95%] text-gray-600 text-sm  -mt-5">
                          GEDUNG MINA BAHARI III Lt.5, JALAN MEDAN MERDEKA TIMUR NOMOR
                          16 JAKARTA 10110 <br /> KOTAK POS 4130 JKP 10041 TELEPON (021)
                          3519070 (LACAK), FAKSIMILE (021) 3513287 <br /> LAMAN
                          <span className="text-blue-500 underline ">
                            https://elaut-bppsdm.go.id/lembaga/dpkakp
                          </span>{" "}
                          SUREL{" "}
                          <span className="text-blue-500 underline">
                            dpkakp@kkp.go.id
                          </span>
                        </p>
                      </div>
                      <Image
                        className="block w-16 h-16 "
                        src={"/lembaga/logo/logo-sertifikasi-akp.png"}
                        width={0}
                        height={0}
                        alt="DPKAKP Logo"
                      />
                    </div>

                    <div className={`flex items-center justify-center w-fit rounded-md px-2 py-2 bg-opacity-20 font-bold text-black  mt-5 text-lg leading-none text-center`}>DAFTAR NILAI HASIL UJIAN KEAHLIAN AWAK KAPAL PERIKANAN
                      <br />TINGKAT SERTIFIKAT :
                      {dataUjian[0]!.TypeUjian}</div>

                    <div className="ml-0 text-left capitalize w-full mt-2">
                      <p className="text-sm font-semibold tracking-tight leading-none  py-2">
                        Tanggal Pelaksanaan{"   "}: {"          "}<span className="font-normal">{generateTanggalPelatihan(dataUjian[0]!.TanggalMulaiUjian)} - {generateTanggalPelatihan(dataUjian[0]!.TanggalBerakhirUjian)}</span>
                      </p>
                      <p className="text-sm font-semibold tracking-tight leading-none ">
                        Lokasi Pelaksanaan{"     "}: {"          "} <span className="font-normal">{dataUjian[0]!.TempatUjian}</span>
                      </p>
                    </div>

                    <div className="flex flex-col w-full border border-gray-400 mt-6 rounded-md">
                      {/* Table Header */}
                      <div className="flex  text-white text-sm">
                        <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-gray-400 bg-[#338BF6] justify-center py-6"><span>No</span></div>
                        <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 bg-[#338BF6] justify-center text-center leading-none py-6"><span className=''>Nomor Ujian</span></div>
                        <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 bg-[#338BF6] justify-center text-center leading-none py-6"><span className=''>Nama Peserta</span></div>
                        {
                          dataUjian[0]!.TypeUjian.includes('Rewarding') ? <><div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 bg-[#EA8F02] justify-center text-center leading-none py-6"><span className=''>Nilai F1</span></div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 bg-[#625BF9] justify-center text-center leading-none py-6"><span className=''>Nilai F2</span></div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 bg-[#0796A6] justify-center text-center leading-none py-6"><span className=''>Nilai F3</span></div></> : <> <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 bg-[#EA8F02] justify-center text-center leading-none py-6"><span className=''>Nilai F1B1</span></div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 bg-[#EA8F02] justify-center text-center leading-none py-6"><span className=''>Nilai F1B2</span></div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 bg-[#EA8F02] justify-center text-center leading-none py-6"><span className=''>Nilai F1B3</span></div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 bg-[#EA8F02] justify-center text-center leading-none py-6"><span className=''>Total F1</span></div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 bg-[#625BF9] justify-center text-center leading-none py-6"><span className=''>Nilai F2</span></div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 bg-[#0796A6] justify-center text-center leading-none py-6"><span className=''>Nilai F3B1</span></div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 bg-[#0796A6] justify-center text-center leading-none py-6"><span className=''>Nilai F3B2</span></div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400  bg-[#0796A6] justify-center text-center leading-none py-6"><span className=''>Total F3</span></div> </>
                        }
                        <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 bg-[#595959] justify-center text-center leading-none py-6"><span className=''>Nilai Kumulatif</span></div>
                        <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 bg-[#595959] justify-center text-center leading-none py-6"><span className=''>Nilai Komprehensif</span></div>
                        <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 bg-[#595959] justify-center text-center leading-none py-6"><span className=''>LULUS/TDK LULUS</span></div>
                      </div>

                      {/* Table Rows */}
                      <div className="overflow-auto">
                        {data!.map((pesertaUjian, index) => (
                          <div key={index} className="flex text-sm">
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7">
                              <span>{index + 1}</span>
                            </div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7">
                              <span>{pesertaUjian?.NomorUjian || '-'}</span>
                            </div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7 capitalize leading-none">
                              <span>{pesertaUjian?.Nama || '-'}</span>
                            </div>
                            {
                              dataUjian[0]!.TypeUjian.includes('Rewarding') ? (
                                <>
                                  <div
                                    className={`flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7 ${(pesertaUjian?.NilaiF1B1 || 0) < 65 ? 'text-rose-500' : 'text-black'
                                      }`}
                                  >
                                    <span>{pesertaUjian?.NilaiF1B1 || 0}</span>
                                  </div>
                                  <div
                                    className={`flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7 ${(pesertaUjian?.NilaiF2B1 || 0) < 65 ? 'text-rose-500' : 'text-black'
                                      }`}
                                  >
                                    <span>{pesertaUjian?.NilaiF2B1 || 0}</span>
                                  </div>
                                  <div
                                    className={`flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7 ${(pesertaUjian?.NilaiF3B1 || 0) < 65 ? 'text-rose-500' : 'text-black'
                                      }`}
                                  >
                                    <span>{pesertaUjian?.NilaiF3B1 || 0}</span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div
                                    className={`flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7 ${(pesertaUjian?.NilaiF1B1 || 0) < 65 ? 'text-rose-500' : 'text-black'
                                      }`}
                                  >
                                    <span>{pesertaUjian?.NilaiF1B1 || 0}</span>
                                  </div>
                                  <div
                                    className={`flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7 ${(pesertaUjian?.NilaiF1B2 || 0) < 65 ? 'text-rose-500' : 'text-black'
                                      }`}
                                  >
                                    <span>{pesertaUjian?.NilaiF1B2 || 0}</span>
                                  </div>
                                  <div
                                    className={`flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7 ${(pesertaUjian?.NilaiF1B3 || 0) < 65 ? 'text-rose-500' : 'text-black'
                                      }`}
                                  >
                                    <span>{pesertaUjian?.NilaiF1B3 || 0}</span>
                                  </div>
                                  <div
                                    className={`flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7 ${(((pesertaUjian?.NilaiF1B1 || 0) +
                                      (pesertaUjian?.NilaiF1B2 || 0) +
                                      (pesertaUjian?.NilaiF1B3 || 0)) /
                                      3) < 65
                                      ? 'text-rose-500'
                                      : 'text-black'
                                      }`}
                                  >
                                    <span>
                                      {(
                                        ((pesertaUjian?.NilaiF1B1 || 0) +
                                          (pesertaUjian?.NilaiF1B2 || 0) +
                                          (pesertaUjian?.NilaiF1B3 || 0)) /
                                        3
                                      ).toFixed(2)}
                                    </span>
                                  </div>
                                  <div
                                    className={`flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7 ${(pesertaUjian?.NilaiF2B1 || 0) < 65 ? 'text-rose-500' : 'text-black'
                                      }`}
                                  >
                                    <span>{pesertaUjian?.NilaiF2B1 || 0}</span>
                                  </div>
                                  <div
                                    className={`flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7 ${(pesertaUjian?.NilaiF3B1 || 0) < 65 ? 'text-rose-500' : 'text-black'
                                      }`}
                                  >
                                    <span>{pesertaUjian?.NilaiF3B1 || 0}</span>
                                  </div>
                                  <div
                                    className={`flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7 ${(pesertaUjian?.NilaiF3B2 || 0) < 65 ? 'text-rose-500' : 'text-black'
                                      }`}
                                  >
                                    <span>{pesertaUjian?.NilaiF3B2 || 0}</span>
                                  </div>
                                  <div
                                    className={`flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7 ${(((pesertaUjian?.NilaiF3B1 || 0) + (pesertaUjian?.NilaiF3B2 || 0)) /
                                      2) < 65
                                      ? 'text-rose-500'
                                      : 'text-black'
                                      }`}
                                  >
                                    <span>
                                      {(
                                        ((pesertaUjian?.NilaiF3B1 || 0) + (pesertaUjian?.NilaiF3B2 || 0)) /
                                        2
                                      ).toFixed(2)}
                                    </span>
                                  </div>
                                </>
                              )
                            }
                            <div
                              className={`flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7 ${dataUjian[0]!.TypeUjian.includes('Rewarding')
                                ? (((pesertaUjian?.NilaiF1B1 || 0) +
                                  (pesertaUjian?.NilaiF2B1 || 0) +
                                  (pesertaUjian?.NilaiF3B1 || 0)) /
                                  3) < 65
                                  ? 'text-rose-500'
                                  : 'text-black'
                                : (((pesertaUjian?.NilaiF1B1 || 0) +
                                  (pesertaUjian?.NilaiF1B2 || 0) +
                                  (pesertaUjian?.NilaiF1B3 || 0) +
                                  (pesertaUjian?.NilaiF2B1 || 0) +
                                  (pesertaUjian?.NilaiF3B1 || 0) +
                                  (pesertaUjian?.NilaiF3B2 || 0)) /
                                  6) < 65
                                  ? 'text-rose-500'
                                  : 'text-black'
                                }`}
                            >
                              <span>
                                {dataUjian[0]!.TypeUjian.includes('Rewarding')
                                  ? (
                                    ((pesertaUjian?.NilaiF1B1 || 0) +
                                      (pesertaUjian?.NilaiF2B1 || 0) +
                                      (pesertaUjian?.NilaiF3B1 || 0)) /
                                    3
                                  ).toFixed(2)
                                  : (
                                    ((pesertaUjian?.NilaiF1B1 || 0) +
                                      (pesertaUjian?.NilaiF1B2 || 0) +
                                      (pesertaUjian?.NilaiF1B3 || 0) +
                                      (pesertaUjian?.NilaiF2B1 || 0) +
                                      (pesertaUjian?.NilaiF3B1 || 0) +
                                      (pesertaUjian?.NilaiF3B2 || 0)) /
                                    6
                                  ).toFixed(2)}
                              </span>
                            </div>

                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7">
                              <span>{pesertaUjian?.NilaiKomprensif || 0}</span>
                            </div>
                            <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center py-7 text-center">
                              <span
                                className={
                                  dataUjian[0]!.TypeUjian.includes('Rewarding')
                                    ? (((pesertaUjian?.NilaiF1B1 || 0) + (pesertaUjian?.NilaiF2B1 || 0) + (pesertaUjian?.NilaiF3B1 || 0)) / 3) > 65
                                      ? 'text-green-500 font-bold'
                                      : 'text-rose-500 font-bold'
                                    : (((pesertaUjian?.NilaiF1B1 || 0) +
                                      (pesertaUjian?.NilaiF1B2 || 0) +
                                      (pesertaUjian?.NilaiF1B3 || 0) +
                                      (pesertaUjian?.NilaiF2B1 || 0) +
                                      (pesertaUjian?.NilaiF3B1 || 0) +
                                      (pesertaUjian?.NilaiF3B2 || 0)) / 6) > 65
                                      ? 'text-green-500 font-bold'
                                      : 'text-rose-500 font-bold'
                                }
                              >
                                {dataUjian[0]!.TypeUjian.includes('Rewarding')
                                  ? (((pesertaUjian?.NilaiF1B1 || 0) + (pesertaUjian?.NilaiF2B1 || 0) + (pesertaUjian?.NilaiF3B1 || 0)) / 3) > 65
                                    ? 'LULUS'
                                    : 'TIDAK LULUS'
                                  : (((pesertaUjian?.NilaiF1B1 || 0) +
                                    (pesertaUjian?.NilaiF1B2 || 0) +
                                    (pesertaUjian?.NilaiF1B3 || 0) +
                                    (pesertaUjian?.NilaiF2B1 || 0) +
                                    (pesertaUjian?.NilaiF3B1 || 0) +
                                    (pesertaUjian?.NilaiF3B2 || 0)) / 6) > 65
                                    ? 'LULUS'
                                    : 'TIDAK LULUS'}
                              </span>
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex w-full items-start justify-between mt-2">
                      <div className="ml-0 text-left capitalize w-full ">
                        <p className="text-sm font-semibold tracking-tight leading-none  py-2">
                          Hasil: {"          "}
                        </p>
                        <p className="text-sm font-semibold tracking-tight  ">
                          Jumlah Peserta{"     "}: {"          "} <span className="font-normal">{data!.length} Orang</span>
                        </p>
                        <p className="text-sm font-semibold tracking-tight  ">
                          Lulus (L){"     "}: {"          "} <span className="font-normal">{calculateResults(dataUjian, data).lulusCount} Orang</span>
                        </p>
                        <p className="text-sm font-semibold tracking-tight  ">
                          Mengulang (UL){"     "}: {"          "} <span className="font-normal">{calculateResults(dataUjian, data).tidakLulusCount} Orang</span>
                        </p>
                      </div>

                      <div className="w-full flex items-end justify-end"><p className="capitalize text-sm">
                        {
                          dataUjian[0]!.TempatUjian
                        }, {generateTanggalPelatihan(dataUjian[0]!.TanggalMulaiUjian)}
                      </p></div>

                    </div>



                    {
                      dataPukakp != null ? <div className="flex w-full items-center justify-center flex-col">
                        <div className="flex items-center justify-around w-full mb-5 mt-6 gap-8">
                          <div className="flex flex-col gap-1  capitalize text-center items-center justify-center">
                            <p className="font-semibold text-sm">Ketua, PUKAKP</p>
                            <p className="text-xs -mt-1">{dataUjian[0]!.PUKAKP}</p>
                            <p className="text-sm border-b-black border-b mt-14 w-2/3">{dataPukakp?.KetuaPukakp}</p>
                            <p className="text-sm ">NIP. {dataPukakp?.NipKetua}</p>
                          </div>

                          <div className="flex flex-col gap-1 capitalize text-center items-center justify-center">
                            <p className="font-semibold text-sm">Sekretaris, PUKAKP</p>
                            <p className="text-xs -mt-1">{dataUjian[0]!.PUKAKP}</p>
                            <p className="text-sm border-b-black border-b mt-14 w-2/3">{dataPukakp?.SesPukakp}</p>
                            <p className="text-sm ">NIP. {dataPukakp?.NipSes}</p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 capitalize text-center w-1/5">
                          <p className="font-semibold text-sm leading-none">Mengetahui,</p>
                          <p className="font-semibold text-sm leading-none">Ketua DPKAKP,</p>
                          <p className="text-sm border-b-black border-b mt-14 ">Achmad Subijakto, S.St.Pi., M.Pi.</p>
                          <p className="text-sm ">NIP. </p>
                        </div>
                      </div> : <></>
                    }



                  </div>
                </div>


              }

            </div></div>
          </div>
        }

        <AlertDialog open={isOpenFormUjianKeahlian}>
          <AlertDialogContent className="max-w-xl">
            <AlertDialogHeader className="gap-0 flex flex-col">
              <AlertDialogTitle className="flex items-center gap-2 text-2xl">
                {" "}
                <FaBookOpen className="h-4 w-4" />
                Masukkan Nilai Komprehensif
              </AlertDialogTitle>
              <AlertDialogDescription className="-mt-6">
                Sebagai kelengkapan penilaian dari pelaksanaan ujian keahlaian
                Awak Kapal Perikanan ini, diharap sebagai penguji dapat
                memasukkan nilai yang didapatkan peserta dari proses
                komprehensif!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <fieldset>
              <form autoComplete="off">
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="flex px-3 gap-2 mb-2 w-full">
                    <div className="w-full">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Nilai Ujian Komprehensif{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="form-input w-full text-black border-gray-300 rounded-md"
                        placeholder="Masukkan nilai"
                        required
                        value={nilaiKomprehensif}
                        onChange={(e) => setNilaiKomprehensif(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <AlertDialogFooter className="mt-3">
                  <AlertDialogCancel
                    onClick={(e) => {
                      setIsOpenFormUjianKeahlian(false);
                    }}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      handleUploadNilaiKomprehensif(e);
                    }}
                  >
                    Upload
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </fieldset>
          </AlertDialogContent>
        </AlertDialog>
      </>

    </div>
  );
};

export default TableDataPesertaUjianKeahlian;
