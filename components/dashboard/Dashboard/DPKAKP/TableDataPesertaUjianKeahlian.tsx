import React, { useState } from "react";
import * as XLSX from "xlsx";

import "jspdf-autotable";
import { useReactToPrint } from "react-to-print";

import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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
import Link from "next/link";
import { FaBookOpen, FaMapPin, FaRupiahSign } from "react-icons/fa6";
import Toast from "@/components/toast";
import { GiTakeMyMoney } from "react-icons/gi";
import Cookies from "js-cookie";
import {
  PiExam,
  PiFilePdf,
  PiKeyFill,
  PiMicrosoftExcelLogoFill,
} from "react-icons/pi";
import TableData from "../../Tables/TableData";
import { dpkakpBaseUrl } from "@/constants/urls";
import { getIdUjianKeahlianInPathPesertaUjian } from "@/components/utils/dpkakp/pathname";
import { BsFileExcel, BsPersonVcard } from "react-icons/bs";
import { JawabanUserStore, Ujian, UsersUjian } from "@/types/ujian-keahlian-akp";
import { HashLoader } from "react-spinners";
import autoTable from "jspdf-autotable";
import Image from "next/image";
import { generateTanggalPelatihan, shortenName } from "@/utils/text";
import {
  IoArrowBackSharp,
  IoPrintOutline,
  IoRefreshOutline,
} from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { UserInformationDPKAKP } from "@/types/dpkakp";
import UjianKeahlianAKP from "../UjianKeahlianAKP";
import {
  EXAM_THRESHOLD,
  PRACTICE_WEIGHT,
  THEORY_WEIGHT,
} from "@/constants/globals";
import { Input } from "@/components/ui/input";
import {
  checkLulus,
  countLulus,
  exportToExcelFinalScoring,
  roundUpScore,
} from "@/components/utils/dpkakp/scoring";
import getDocument from "@/firebase/firestore/getData";
import { DocumentData } from "firebase/firestore";
import EmptyData from "@/components/micro-components/EmptyData";
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';

const TableDataPesertaUjianKeahlian = () => {
  const pathname = usePathname();
  const idUjianKeahlian = getIdUjianKeahlianInPathPesertaUjian(pathname!);
  const id = extractSecondLastSegment(pathname);

  const printRef = React.useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Kartu Peserta Ujian",
    onAfterPrint: () => console.log("PDF generated successfully!"),
  });

  const [showKartuUjian, setShowKartuUjian] = React.useState<boolean>(false);
  const [dataPukakp, setDataPukakp] =
    React.useState<UserInformationDPKAKP | null>(null);

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
      setDataPukakp(response.data.data);

      setIsFetching(false);
    } catch (error) {
      console.error(error);
      setIsFetching(false);
      throw error;
    }
  };

  const [showRekapitulasiNilai, setShowRekapitulasiNilai] =
    React.useState<boolean>(false);
  const printRefRekapitulasiNilai = React.useRef<HTMLDivElement>(null);
  const printRefRekapitulasiNilaiPage = React.useRef<HTMLDivElement>(null);

  const handleDownloadRekapitulasiNilai = async () => {
    const html2pdf = (await import("html2pdf.js")).default;

    if (!printRefRekapitulasiNilai.current) {
      console.error("Component reference is null");
      setIsUploading(false);
      return;
    }

    const element = printRefRekapitulasiNilai.current;

    const opt = {
      margin: [7, 7, 7, 7], // top, right, bottom, left
      filename: `Rekapitulasi Nilai Ujian Keahlian AKP.pdf`,
      pagebreak: { mode: ["avoid-all", "css"] },
      html2canvas: {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: "#fff",
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "landscape",
      },
    };

    html2pdf().from(element).set(opt).save();
  };



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
  const [selectedNamaPeserta, setSelectedNamaPeserta] = React.useState("");

  const [nilaiKomprehensif, setNilaiKomprehensif] = React.useState<string>("");
  const [nilaiKomprehensif2, setNilaiKomprehensif2] =
    React.useState<string>("");
  const [nilaiKomprehensif3, setNilaiKomprehensif3] =
    React.useState<string>("");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const isPenguji = Cookies.get("IsPUKAKP") == "penguji";
  const [isEditing, setEditing] = React.useState<boolean>(false);
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
          className={`w-full text-gray-900 font-semibold`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Actions
          <TbDatabaseEdit className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div
          className={`w-full flex  flex-col gap-2`}
        >
          <div className="flex  w-full items-center justify-center gap-1">
            <Button
              onClick={(e) => {
                setSelectedIdPeserta(row.original.IdUserUjian);
                setIsOpenFormUjianKeahlian(!isOpenFormUjianKeahlian);
                if (row.original.NilaiKomprensifF1 != 0) {
                  setEditing(true);
                  setNilaiKomprehensif(
                    row.original.NilaiKomprensifF1.toString()
                  );
                  setNilaiKomprehensif2(
                    row.original.NilaiKomprensifF2.toString()
                  );
                  setNilaiKomprehensif3(
                    row.original.NilaiKomprensifF3.toString()
                  );
                  setSelectedNamaPeserta(row.original.Nama)
                }
              }}
              variant="outline"
              className="bg-neutral-950 hover:bg-neutral-950 text-neutral-200 rounded-md hover:text-neutral-200"
            >
              <TbEditCircle className="h-5 w-5 mr-1" />
              {row.original.NilaiKomprensifF1 != 0 ? "Edit" : "Input"} Nilai
              Kompre
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-rose-600 text-white hover:text-white hover:bg-rose-600 w-full"
                >
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
                <Button
                  variant="outline"
                  className="bg-indigo-600 text-white hover:text-white hover:bg-indigo-600 w-full"
                >
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
                  {dataUjian!.length > 0 ? (
                    <thead>
                      {dataUjian[0]!.TypeUjian.includes("Rewarding") || dataUjian[0]!.TypeUjian.includes('TRYOUT') ? (
                        <tr>
                          <th className="border border-gray-200">F1</th>
                          <th className="border border-gray-200">F2</th>
                          <th className="border border-gray-200">F3</th>
                        </tr>
                      ) : (
                        <tr>
                          <th className="border border-gray-200">F1B1</th>
                          <th className="border border-gray-200">F1B2</th>
                          <th className="border border-gray-200">F1B3</th>
                          <th className="border border-gray-200">F2B1</th>
                          <th className="border border-gray-200">F3B1</th>
                          <th className="border border-gray-200">F3B2</th>
                        </tr>
                      )}
                    </thead>
                  ) : (
                    <></>
                  )}

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
                      {/* {Array.from({
                        length: 6 - row.original.CodeAksesUsersBagian.length,
                      }).map((_, index) => (
                        <td
                          key={`empty-${index}`}
                          className="border text-center border-gray-200"
                        >
                        </td>
                      ))} */}
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
                  TTL : {row.original.TempatLahir} {row.original.TanggalLahir}
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
          className="text-black font-semibold w-full  p-0 justify-center items-center"
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
          title: "Oopsss!",
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
        title: "Yeayyy!",
        text: `Selamat anda berhasil menyematkan soal ujian ke peserta ujian keahlian!`,
      });
      setHandleOpenFormSematkan(false);
      setIsLoadingSematkanSoal(false);
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: "Oopsss!",
        text: `Gagal anda berhasil menyematkan soal ujian ke peserta ujian keahlian!`,
      });
      setHandleOpenFormSematkan(false);
      setIsLoadingSematkanSoal(false);
    }
  };

  const exportToExcel = () => {
    if (!data || data.length === 0) {
      console.error("No data to export.");
      return;
    }

    const transformedData = data.map((user) => {
      const base: { [key: string]: string } = {
        Nama: user.Nama,
        NIK: user.Nik,
        Instansi: user.Instansi,
        "Nomor Ujian": user.NomorUjian,
      };

      user.CodeAksesUsersBagian.forEach((bagian) => {
        base[bagian.NamaBagian] = bagian.KodeAkses;
      });

      return base;
    });

    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ExportedData");

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
          nilai_komprensif_f1: nilaiKomprehensif,
          nilai_komprensif_f2: nilaiKomprehensif2,
          nilai_komprensif_f3: nilaiKomprehensif3,
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
      setNilaiKomprehensif2("");
      setNilaiKomprehensif3("");
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
      setNilaiKomprehensif2("");
      setNilaiKomprehensif3("");
      setSelectedIdPeserta(0);
    }
  };

  React.useEffect(() => {
    handleFetchingUjianKeahlianData();
    handleFetchInformasiPUKAKP();
  }, []);

  console.log({ dataPukakp });

  React.useEffect(() => {
    const checkClipboard = async () => {
      try {
        const clipboardItems = await navigator.clipboard.read();
        for (const item of clipboardItems) {
          if (
            item.types.includes("image/png") ||
            item.types.includes("image/jpeg")
          ) {
            Toast.fire({
              icon: "error",
              title:
                "Maaf import peserta hanya dapat dilakukan sekali, kamu tidak bisa menambahkan lagi setelah mengimport data!",
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

  const [handleOpenFormSematkan, setHandleOpenFormSematkan] =
    React.useState<boolean>(false);


  const [dataAnswer, setDataAnswer] = React.useState<JawabanUserStore[]>([])
  const [isShowHistoryUserAnswers, setIsShowHistoryUserAnswers] = React.useState<boolean>(false)
  const [isFetchingHistoryUserAnswers, setIsFetchingHistoryUserAnswers] = React.useState<boolean>(false)

  async function fetchData(idUserUjian: number, bagianFungsi: string) {
    setIsFetchingHistoryUserAnswers(true)
    const dataResult = await getDocument('answers', `${idUserUjian}_${bagianFungsi}`);
    console.log(`${idUserUjian}_${bagianFungsi}`)
    console.log(dataResult.data); // Logs the actual result
    console.log('RESULT', dataResult)
    if (dataResult!.data! == null) {
      setDataAnswer([])
      setIsFetchingHistoryUserAnswers(false)
    } else {
      const result = dataResult!.data!.selectedAnswersStore! as JawabanUserStore[]
      setDataAnswer(result)
      setIsFetchingHistoryUserAnswers(false)
    }

  }

  const trueCount = dataAnswer.filter(item => item.isCorrect === true).length;
  const falseCount = dataAnswer.filter(item => item.isCorrect === false).length;

  console.log({ dataAnswer })
  console.log({ trueCount })
  console.log({ falseCount })




  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default  sm:px-7.5 xl:col-span-8">
      {data != null ? (
        <>
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
                        *Download terlebih dahulu template lalu isi file excel
                        dan upload
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
              {!showRekapitulasiNilai && !showKartuUjian && (
                <Input
                  placeholder="Cari Peserta..."
                  value={
                    (table.getColumn("Nama")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event: any) =>
                    table.getColumn("Nama")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm text-sm"
                />
              )}

              <div className="w-fit flex gap-2">
                {showKartuUjian || showRekapitulasiNilai ? (
                  <div
                    onClick={() => {
                      setShowKartuUjian(false);
                      setShowRekapitulasiNilai(false);
                    }}
                    className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
                  >
                    <IoArrowBackSharp />
                    Kembali
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="w-full flex justify-end gap-2">
                {pathname.includes("pukakp") ? (
                  !showRekapitulasiNilai &&
                  dataUjian.length != 0 &&
                  (dataUjian[0]!.UsersUjian.length != 0 ? (
                    showKartuUjian ? (
                      <div
                        onClick={handlePrint}
                        className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
                      >
                        <IoPrintOutline />
                        Print Kartu Ujian Peserta
                      </div>
                    ) : (
                      <div
                        onClick={() => setShowKartuUjian(true)}
                        className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
                      >
                        <PiFilePdf />
                        Generate Kartu Ujian Peserta
                      </div>
                    )
                  ) : (
                    <></>
                  ))
                ) : (
                  <></>
                )}

                {dataUjian.length != 0 &&
                  dataUjian[0]!.UsersUjian.length != 0 && (
                    <>
                      {" "}

                      {!showKartuUjian ?
                        (showRekapitulasiNilai ? (
                          <>

                            <div
                              onClick={() => handleDownloadRekapitulasiNilai()}
                              className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
                            >
                              <BiEditAlt />
                              Download Rekapitulasi
                            </div>
                            <div
                              onClick={() =>
                                exportToExcelFinalScoring({ dataUjian, data })
                              }
                              className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
                            >
                              <PiMicrosoftExcelLogoFill />
                              Export Excel Hasil Rekap{" "}
                            </div></>
                        ) : (
                          <>

                            <div
                              onClick={() => setShowRekapitulasiNilai(true)}
                              className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
                            >
                              <BiEditAlt />
                              Rekapitulasi Nilai Ujian
                            </div></>
                        )) : <div
                          onClick={() => exportToExcel()}
                          className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
                        >
                          <PiMicrosoftExcelLogoFill />
                          Export Kode
                        </div>}
                    </>
                  )}

                <div
                  onClick={() => handleFetchingUjianKeahlianData()}
                  className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
                >
                  <IoRefreshOutline />
                  Refresh Data
                </div>

                {pathname.includes("dpkakp") && !isPenguji && (
                  <>
                    <div
                      onClick={() => setHandleOpenFormSematkan(true)}
                      className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-white p-1.5 cursor-pointer"
                    >
                      <FaMapPin />
                      Sematkan Soal Ujian
                    </div>
                    <AlertDialog
                      open={handleOpenFormSematkan}
                      onOpenChange={setHandleOpenFormSematkan}
                    >
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Apakah anda yakin akan menyematkan soal ujian?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Pastikan jumlah anggota mu sudah sesuai dengan data
                            peserta ujian yang sudah didaftarkan dan merupakan
                            anggota yang sah tercantum dalam Surat Keputusan
                            Dewan sebagai peserta yang mengikuti ujian keahlian
                            awak kapal Perikanan!
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          {isLoadingSematkanSoal ? (
                            <AlertDialogAction className="bg-gray-900">
                              Loading ...
                            </AlertDialogAction>
                          ) : (
                            <>
                              <AlertDialogCancel
                                onClick={() => setHandleOpenFormSematkan(false)}
                              >
                                Batal
                              </AlertDialogCancel>
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
                    </AlertDialog>
                  </>
                )}

                {dataUjian.length > 0 &&
                  dataUjian != null &&
                  pathname.includes("pukakp") ? (
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

            {!showKartuUjian && !showRekapitulasiNilai && (
              <div>
                <div id="chartOne" className="-ml-5"></div>

                <>
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
                </>
              </div>
            )}

            {showKartuUjian && (
              <div className="" ref={printRef}>
                {" "}
                <div className="grid grid-cols-1 gap-2">
                  {dataUjian.length != 0 &&
                    data!.map((peserta, index) => (
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
                              <h1 className="font-normal text-gray-800 text-sm md:text-lg leading-[110%] mb-5 mt-2">
                                KEMENTERIAN KELAUTAN DAN PERIKANAN <br /> BADAN
                                PENYULUHAN DAN PENGEMBANGAN <br /> SUMBER DAYA
                                MANUSIA KELAUTAN DAN PERIKANAN <br />
                                <span className="font-bold">
                                  DEWAN PENGUJI KEAHLIAN AWAK KAPAL PERIKANAN
                                </span>
                              </h1>
                              <p className="font-jakarta max-w-[42rem] leading-[95%] text-gray-600 text-[0.75rem]  -mt-5">
                                GEDUNG MINA BAHARI III Lt.5, JALAN MEDAN MERDEKA
                                TIMUR NOMOR 16 JAKARTA 10110 <br /> KOTAK POS
                                4130 JKP 10041 TELEPON (021) 3519070 (LACAK),
                                FAKSIMILE (021) 3513287 <br /> LAMAN
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

                          <div
                            className={`flex items-center justify-center w-fit rounded-md px-2 py-2 border ${dataUjian[0]!.TypeUjian.includes("ATKAPIN")
                              ? "border-rose-500 bg-rose-500 text-rose-600"
                              : "border-blue-500 bg-blue-500 text-blue-600"
                              } bg-opacity-20 font-medium  mt-5 text-lg`}
                          >
                            KARTU PESERTA UJIAN {dataUjian[0]!.TypeUjian}
                          </div>

                          <div className="ml-0 text-left capitalize w-full mt-2">
                            <p className="text-base font-semibold tracking-tight leading-none border-b py-2 border-b-gray-200">
                              Nama{"   "}: {"          "}
                              <span className="font-normal">
                                {peserta.Nama}
                              </span>
                            </p>
                            <p className="text-base font-semibold tracking-tight leading-none border-b py-2 border-b-gray-200">
                              NIK{"     "}: {"          "}{" "}
                              <span className="font-normal">{peserta.Nik}</span>
                            </p>
                            <p className="text-base font-semibold tracking-tight leading-none border-b py-2 border-b-gray-200">
                              Tempat, Tanggal Lahir{"   "}: {"          "}{" "}
                              <span className="font-normal">
                                {peserta.TempatLahir}, {peserta.TanggalLahir}
                              </span>
                            </p>
                            <p className="text-base font-semibold tracking-tight leading-none border-b py-2 border-b-gray-200">
                              Asal Sekolah/Instansi{"   "}: {"          "}{" "}
                              <span className="font-normal">
                                {peserta.Instansi}
                              </span>
                            </p>
                          </div>

                          <div className="flex flex-col gap">
                            <div
                              className={`flex items-center justify-center w-fit rounded-md px-2 py-2 border border-gray-300 bg-neutral-200 bg-opacity-20 font-medium  mt-5 text-base uppercase`}
                            >
                              <p className="text-sm">Nomor Ujian{"     "}:</p>
                              <p className="font-semibold">
                                {peserta!.NomorUjian!}
                              </p>
                            </div>
                          </div>

                          {dataPukakp != null ? (
                            <div className="flex items-center justify-between w-full mb-5 mt-6 gap-8">
                              <div className="flex flex-col gap-1 capitalize">
                                <p className="capitalize text-base">
                                  {dataUjian[0]!.TempatUjian},{" "}
                                  {generateTanggalPelatihan(
                                    dataUjian[0]!.TanggalMulaiUjian
                                  )}
                                </p>
                                <p className="font-semibold text-base">
                                  Ketua PUKAKP
                                </p>
                                <p className="text-xs">
                                  {dataUjian[0]!.PUKAKP}
                                </p>

                                <p className="text-base border-b-black border-b mt-14">
                                  {dataPukakp.KetuaPukakp}
                                </p>
                                <p className="text-base ">
                                  NIP. {dataPukakp.NipKetua}
                                </p>
                              </div>
                              <div className="w-35 h-40 rounded-md border border-gray-300"></div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between w-full mb-5 mt-6 gap-8">
                              <div className="flex flex-col gap-1 capitalize">
                                <p className="capitalize text-base">
                                  {dataUjian[0]!.TempatUjian},{" "}
                                  {generateTanggalPelatihan(
                                    dataUjian[0]!.TanggalMulaiUjian
                                  )}
                                </p>
                                <p className="font-semibold text-base">
                                  Ketua PUKAKP
                                </p>
                                <p className="text-xs">
                                  {dataUjian[0]!.PUKAKP}
                                </p>

                                <p className="text-base border-b-black border-b mt-14">
                                  Nama
                                </p>
                                <p className="text-base ">NIP</p>
                              </div>
                              <div className="w-35 h-40 rounded-md border border-gray-300"></div>
                            </div>
                          )}
                        </div>
                        <div className="w-full border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                          {dataUjian[0]!.TypeUjian.includes("Rewarding") || dataUjian[0]!.TypeUjian.includes('TRYOUT')
                            ? peserta!.CodeAksesUsersBagian!.length != 0 && (
                              <div className="flex flex-col w-full border-t border-r border-gray-400 mt-6 rounded-md">
                                <div className="flex flex-shrink-0 bg-neutral-500 text-white">
                                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center">
                                    <span>F1</span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center">
                                    <span>F2</span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center">
                                    <span>F3</span>
                                  </div>
                                </div>
                                <div className="overflow-auto">
                                  <div className="flex flex-shrink-0">
                                    <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center">
                                      <span>
                                        {peserta!.CodeAksesUsersBagian[0]!
                                          .KodeAkses || ""}
                                      </span>
                                    </div>
                                    <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center">
                                      <span>
                                        {peserta!.CodeAksesUsersBagian[1]!
                                          .KodeAkses || ""}
                                      </span>
                                    </div>
                                    <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center">
                                      <span>
                                        {peserta!.CodeAksesUsersBagian[2]!
                                          .KodeAkses || ""}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                            : peserta!.CodeAksesUsersBagian!.length != 0 && (
                              <div className="flex flex-col w-full border-t border-r border-gray-400 mt-6 rounded-md">
                                <div className="flex flex-shrink-0 bg-neutral-500 text-white">
                                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center">
                                    <span>F1B1</span>
                                  </div>
                                  <div
                                    className={`flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center`}
                                  >
                                    <span>F1B2</span>
                                  </div>
                                  <div
                                    className={`${dataUjian[0]!.TypeUjian ==
                                      "ANKAPIN II" ||
                                      dataUjian[0]!.TypeUjian == "ATKAPIN II"
                                      ? "hidden"
                                      : "flex"
                                      } flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center`}
                                  >
                                    <span>F1B3</span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center">
                                    <span>F2B1</span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center">
                                    <span>F3B1</span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center">
                                    <span>F3B2</span>
                                  </div>
                                </div>
                                <div className="overflow-auto">
                                  <div className="flex flex-shrink-0">
                                    <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center">
                                      <span>
                                        {peserta!.CodeAksesUsersBagian[0]!
                                          .KodeAkses || ""}
                                      </span>
                                    </div>
                                    <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center">
                                      <span>
                                        {peserta!.CodeAksesUsersBagian[1]!
                                          .KodeAkses || ""}
                                      </span>
                                    </div>
                                    <div
                                      className={`${dataUjian[0]!.TypeUjian ==
                                        "ANKAPIN II" ||
                                        dataUjian[0]!.TypeUjian ==
                                        "ATKAPIN II"
                                        ? "hidden"
                                        : "flex"
                                        } items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center`}
                                    >
                                      <span>
                                        {peserta!.CodeAksesUsersBagian[2]!
                                          .KodeAkses || ""}
                                      </span>
                                    </div>
                                    <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center">
                                      <span>
                                        {peserta!.CodeAksesUsersBagian[3]!
                                          .KodeAkses || ""}
                                      </span>
                                    </div>
                                    <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center">
                                      <span>
                                        {peserta!.CodeAksesUsersBagian[4]!
                                          .KodeAkses || ""}
                                      </span>
                                    </div>
                                    <div className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-gray-400 justify-center">
                                      <span>
                                        {peserta!.CodeAksesUsersBagian[5]!
                                          .KodeAkses || ""}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                          {dataPukakp != null ? (
                            <div className="flex items-center justify-between w-full mb-5 mt-6 gap-8">
                              <div className="flex flex-col gap-1 capitalize">
                                <p className="capitalize text-base">
                                  {dataUjian[0]!.TempatUjian},{" "}
                                  {generateTanggalPelatihan(
                                    dataUjian[0]!.TanggalMulaiUjian
                                  )}
                                </p>
                                <p className="font-semibold text-base">
                                  Ketua PUKAKP
                                </p>
                                <p className="text-xs">
                                  {dataUjian[0]!.PUKAKP}
                                </p>

                                <p className="text-base border-b-black border-b mt-14">
                                  {dataPukakp.KetuaPukakp}
                                </p>
                                <p className="text-base ">
                                  NIP. {dataPukakp.NipKetua}
                                </p>
                              </div>
                              <div className="w-35 h-40 rounded-md "></div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between w-full mb-5 mt-6 gap-8">
                              <div className="flex flex-col gap-1 capitalize">
                                <p className="capitalize text-base">
                                  {dataUjian[0]!.TempatUjian},{" "}
                                  {generateTanggalPelatihan(
                                    dataUjian[0]!.TanggalMulaiUjian
                                  )}
                                </p>
                                <p className="font-semibold text-base">
                                  Ketua PUKAKP
                                </p>
                                <p className="text-base">
                                  {dataUjian[0]!.PUKAKP}
                                </p>

                                <p className="text-base border-b-black border-b mt-14">
                                  Nama
                                </p>
                                <p className="text-base ">NIP</p>
                              </div>
                              <div className="w-35 h-40 rounded-md "></div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {showRekapitulasiNilai && (
              <div className="border border-gray-300">
                <Sheet onOpenChange={setIsShowHistoryUserAnswers} open={isShowHistoryUserAnswers}>

                  <SheetContent className="overflow-y-scroll h-full w-[800px]  !sm:max-w-4xl ">
                    <SheetHeader>
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className="flex flex-col gap-0">
                          <SheetTitle className='leading-none'>History Jawaban</SheetTitle>
                          <SheetDescription>
                            Lihat history jawaban peserta ujian berapa soal yang berhasil dijawab!
                          </SheetDescription>
                        </div>
                        {
                          dataAnswer.length != 0 && <Button type="button" onClick={() => setIsShowHistoryUserAnswers(false)} className="mt-2 bg-white hover:bg-gray-300 border-gray-300 border text-black" >Close</Button>
                        }

                      </div>




                    </SheetHeader>



                    {
                      isFetchingHistoryUserAnswers ? <div className="mt-32 w-full flex items-center justify-center">
                        <HashLoader color="#338CF5" size={50} />
                      </div> :
                        dataAnswer.length == 0 ? <EmptyData type='soal' /> : <>
                          <ul className="flex mb-2 w-full">
                            <li className="w-full">
                              <button
                                className={`focus:outline-none p-2 rounded-l-md border  flex flex-col items-center w-full ${"bg-white text-black"}`}
                              >
                                <p className="font-semibold text-lg text-green-500">{trueCount}</p>
                                <p className={`uppercase text-sm ${"text-gray-600"}`}>
                                  Total Jawaban Benar
                                </p>
                              </button>
                            </li>
                            <li className="w-full">
                              <button
                                className={`focus:outline-none p-2  border  flex flex-col items-center w-full ${"bg-white text-black"}`}
                              >
                                <p className="font-semibold text-lg text-rose-500">
                                  {falseCount}
                                </p>
                                <p className={`uppercase text-sm ${"text-gray-600"}`}>
                                  Total Jawaban Salah
                                </p>
                              </button>
                            </li>

                          </ul>
                          {
                            !pathname.includes("pukakp") ? <div className="grid grid-cols-4 gap-0">

                              <div className="border border-gray-300 font-bold text-black h-fit w-full text-center">
                                No
                              </div>
                              <div className="border border-gray-300 font-bold text-black h-fit w-full text-center">
                                Soal
                              </div>
                              <div className="border border-gray-300 font-bold text-black h-fit w-full text-center">
                                Jawaban Benar
                              </div>
                              <div className="border border-gray-300 font-bold text-black h-fit w-full text-center">
                                Jawaban User
                              </div>
                              {
                                dataAnswer.map((data, index) => (
                                  <>
                                    <SheetDescription className='text-black font-semibold w-full border border-gray-300 p-2 text-center'>
                                      {index + 1}
                                    </SheetDescription>
                                    <SheetDescription className='text-black font-semibold border border-gray-300 p-2'>
                                      {data.soal}
                                    </SheetDescription>
                                    <SheetDescription className='border border-gray-300 p-2'>
                                      <span >{data.jawaban_benar} </span>
                                    </SheetDescription>
                                    <SheetDescription className={`border border-gray-300 p-2 ${data.isCorrect ? 'text-green-500' : 'text-rose-500'}`}>
                                      {data.jawaban_pengguna}
                                    </SheetDescription>
                                  </>
                                ))
                              }

                            </div> : <div className='w-full flex items-center justify-center my-32'>

                              <div className="pt-12 md:pt-20 flex flex-col items-center">
                                <Image
                                  src={"/illustrations/not-found.png"}
                                  alt="Not Found"
                                  width={400} // Specify an actual width
                                  height={400} // Specify an actual height
                                  className="w-[400px]"
                                />
                                <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8 -mt-2">
                                  <h1 className="text-3xl font-calsans leading-[110%] text-black">
                                    Akses Ditutup
                                  </h1>
                                  <div className="text-gray-600 text-sm text-center max-w-md">
                                    Oopssss Akses Rincian Jawaban dan Soal Peserta Hanya Dapat Diakses oleh Tim Sekretariat DPKAKP
                                  </div>
                                </div>
                              </div>
                            </div>
                          }

                        </>
                    }

                    {
                      !isFetchingHistoryUserAnswers && <SheetFooter >
                        <SheetClose asChild>
                          <Button type="button" onClick={() => setIsShowHistoryUserAnswers(false)} className="mt-2" >Close</Button>
                        </SheetClose>
                      </SheetFooter>
                    }

                  </SheetContent>
                </Sheet>
                <div className="" ref={printRefRekapitulasiNilai}>
                  {" "}
                  <div
                    className="grid grid-cols-1 gap-2 w-full h-feull"
                    ref={printRefRekapitulasiNilaiPage}
                  >
                    {dataUjian.length != 0 && (
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
                                KEMENTERIAN KELAUTAN DAN PERIKANAN <br /> BADAN
                                PENYULUHAN DAN PENGEMBANGAN <br /> SUMBER DAYA
                                MANUSIA KELAUTAN DAN PERIKANAN <br />
                                <span className="font-bold">
                                  DEWAN PENGUJI KEAHLIAN AWAK KAPAL PERIKANAN
                                </span>
                              </h1>
                              <p className="font-jakarta max-w-[42rem] leading-[95%] text-gray-600 text-sm  -mt-5">
                                GEDUNG MINA BAHARI III Lt.5, JALAN MEDAN MERDEKA
                                TIMUR NOMOR 16 JAKARTA 10110 <br /> KOTAK POS
                                4130 JKP 10041 TELEPON (021) 3519070 (LACAK),
                                FAKSIMILE (021) 3513287 <br /> LAMAN
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

                          <div
                            className={`flex items-center justify-center w-fit rounded-md px-2 py-2 bg-opacity-20 font-bold text-black  mt-5 text-lg leading-none text-center`}
                          >
                            DAFTAR NILAI HASIL UJIAN KEAHLIAN AWAK KAPAL
                            PERIKANAN
                            <br />
                            TINGKAT SERTIFIKAT :{dataUjian[0]!.TypeUjian}
                          </div>

                          <div className="ml-0 text-left capitalize w-full mt-2">
                            <p className="text-sm font-semibold tracking-tight leading-none  py-2">
                              Tanggal Pelaksanaan{"   "}: {"          "}
                              <span className="font-normal">
                                {generateTanggalPelatihan(
                                  dataUjian[0]!.TanggalMulaiUjian
                                )}{" "}
                                -{" "}
                                {generateTanggalPelatihan(
                                  dataUjian[0]!.TanggalBerakhirUjian
                                )}
                              </span>
                            </p>
                            <p className="text-sm font-semibold tracking-tight leading-none ">
                              Lokasi Pelaksanaan{"     "}: {"          "}{" "}
                              <span className="font-normal">
                                {dataUjian[0]!.TempatUjian}
                              </span>
                            </p>
                          </div>

                          <div className="flex flex-col w-full border border-gray-400 mt-6 rounded-md">
                            {/* Table Header */}
                            <div className="flex  text-white text-sm">
                              <div className="flex items-center flex-grow !w-0 h-10 border-b border-gray-400 bg-[#338BF6] justify-center py-6">
                                <span>No</span>
                              </div>
                              <div className="flex items-center flex-grow w-0 h-10 px-4 border-b border-l border-gray-400 bg-[#338BF6] justify-center text-center leading-none py-6">
                                <span className="">Nomor Ujian</span>
                              </div>
                              <div className="flex items-center flex-grow !w-10 h-10 px-2 border-b border-l border-gray-400 bg-[#338BF6] justify-center text-center leading-none py-6">
                                <span className="">Nama Peserta</span>
                              </div>
                              {dataUjian[0]!.TypeUjian.includes("Rewarding") || dataUjian[0]!.TypeUjian.includes('TRYOUT') ? (
                                <>
                                  <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#EA8F02] justify-center text-center leading-none py-6">
                                    <span className="">F1</span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#625BF9] justify-center text-center leading-none py-6">
                                    <span className="">F2</span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#0796A6] justify-center text-center leading-none py-6">
                                    <span className="">F3</span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <div className="flex items-center flex-grow  h-10 border-b border-l border-gray-400 bg-[#EA8F02] w-1 justify-center text-center leading-none py-6">
                                    <span className="">F1B1</span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#EA8F02] justify-center text-center leading-none py-6">
                                    <span className="">F1B2</span>
                                  </div>
                                  <div
                                    className={`${dataUjian[0]!.TypeUjian == "ANKAPIN II" ||
                                      dataUjian[0]!.TypeUjian == "ATKAPIN II"
                                      ? "hidden"
                                      : "flex"
                                      } items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#EA8F02] justify-center text-center leading-none py-6`}
                                  >
                                    <span className="">F1B3</span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#EA8F02] justify-center text-center leading-none py-6">
                                    <span className="">Total F1</span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#625BF9] justify-center text-center leading-none py-6">
                                    <span className="">F2</span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#0796A6] justify-center text-center leading-none py-6">
                                    <span className="">F3B1</span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#0796A6] justify-center text-center leading-none py-6">
                                    <span className="">F3B2</span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400  bg-[#0796A6] justify-center text-center leading-none py-6">
                                    <span className="">Total F3</span>
                                  </div>{" "}
                                </>
                              )}
                              <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#595959] justify-center text-center leading-none py-6">
                                <span className="">Nilai Kumulatif</span>
                              </div>
                              <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#595959] justify-center text-center leading-none py-6">
                                <span className="">Kompre F1</span>
                              </div>
                              <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#595959] justify-center text-center leading-none py-6">
                                <span className="">Kompre F2</span>
                              </div>
                              <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#595959] justify-center text-center leading-none py-6">
                                <span className="">Kompre F3</span>
                              </div>
                              <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#595959] justify-center text-center leading-none py-6">
                                <span className="">Nilai Kumulatif Kompre</span>
                              </div>
                              <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#595959] justify-center text-center leading-none py-6">
                                <span className="">Nilai Final</span>
                              </div>
                              <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#595959] justify-center text-center leading-none py-6">
                                <span className="">LULUS/TDK LULUS</span>
                              </div>
                            </div>

                            {/* Table Rows */}
                            <div className="overflow-auto">
                              {data!.map((pesertaUjian: UsersUjian, index) => (
                                <div key={index} className={`flex text-sm ${index % 25 == 1 ? 'page-break' : ''}`}>
                                  <div className="flex items-center flex-grow !w-0 h-10 border-b border-l border-gray-400 justify-center py-7">
                                    <span>{index + 1}</span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 px-4 border-b border-l border-gray-400 justify-center py-7">
                                    <span>
                                      {pesertaUjian?.NomorUjian || "-"}
                                    </span>
                                  </div>
                                  <div className="flex items-center flex-grow !w-10 h-10 px-2 border-b border-l border-gray-400 justify-center text-left py-7 capitalize leading-none">
                                    <span>{shortenName(pesertaUjian?.Nama) || "-"}</span>
                                  </div>
                                  {dataUjian[0]!.TypeUjian.includes(
                                    "Rewarding"
                                  ) || dataUjian[0]!.TypeUjian.includes('TRYOUT') ? (
                                    <>
                                      <div
                                        className={`flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 hover:bg-blue-500 hover:text-white duration-700 cursor-pointer justify-center py-7 ${(pesertaUjian?.NilaiF1B1 || 0) <
                                          EXAM_THRESHOLD
                                          ? "text-rose-500"
                                          : "text-black"
                                          }`}
                                        onClick={() => {
                                          setIsShowHistoryUserAnswers(true)
                                          fetchData(pesertaUjian?.IdUserUjian, 'F1')
                                        }}
                                      >
                                        <span>
                                          {pesertaUjian?.NilaiF1B1 || 0}
                                        </span>
                                      </div>
                                      <div
                                        className={`flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 hover:bg-blue-500 hover:text-white duration-700 cursor-pointer justify-center py-7 ${(pesertaUjian?.NilaiF2B1 || 0) <
                                          EXAM_THRESHOLD
                                          ? "text-rose-500"
                                          : "text-black"
                                          }`}
                                        onClick={() => {
                                          setIsShowHistoryUserAnswers(true)
                                          fetchData(pesertaUjian?.IdUserUjian, 'F2')
                                        }}
                                      >
                                        <span>
                                          {pesertaUjian?.NilaiF2B1 || 0}
                                        </span>
                                      </div>
                                      <div
                                        className={`flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 hover:bg-blue-500 hover:text-white duration-700 cursor-pointer justify-center py-7 ${(pesertaUjian?.NilaiF3B1 || 0) <
                                          EXAM_THRESHOLD
                                          ? "text-rose-500"
                                          : "text-black"
                                          }`}
                                        onClick={() => {
                                          setIsShowHistoryUserAnswers(true)
                                          fetchData(pesertaUjian?.IdUserUjian, 'F3')
                                        }}
                                      >
                                        <span>
                                          {pesertaUjian?.NilaiF3B1 || 0}
                                        </span>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div
                                        className={`flex items-center  hover:bg-blue-500 hover:text-white duration-700 cursor-pointer flex-grow w-0 h-10 border-b border-l border-gray-400 justify-center py-7 ${(pesertaUjian?.NilaiF1B1 || 0) <
                                          EXAM_THRESHOLD
                                          ? "text-rose-500"
                                          : "text-black"
                                          }`}
                                        onClick={() => {
                                          setIsShowHistoryUserAnswers(true)
                                          fetchData(pesertaUjian?.IdUserUjian, 'F1B1')
                                        }}
                                      >
                                        <span>
                                          {pesertaUjian?.NilaiF1B1 || 0}
                                        </span>
                                      </div>


                                      <div
                                        className={`flex items-center flex-grow w-0 h-10 border-b hover:bg-blue-500 hover:text-white duration-700 cursor-pointer border-l border-gray-400 justify-center py-7 ${(pesertaUjian?.NilaiF1B2 || 0) <
                                          EXAM_THRESHOLD
                                          ? "text-rose-500"
                                          : "text-black"
                                          }`}
                                        onClick={() => {
                                          setIsShowHistoryUserAnswers(true)
                                          fetchData(pesertaUjian?.IdUserUjian, 'F1B2')
                                        }}
                                      >
                                        <span>
                                          {pesertaUjian?.NilaiF1B2 || 0}
                                        </span>
                                      </div>
                                      <div
                                        className={`${dataUjian[0]!.TypeUjian ==
                                          "ANKAPIN II" ||
                                          dataUjian[0]!.TypeUjian ==
                                          "ATKAPIN II"
                                          ? "hidden"
                                          : "flex"
                                          } items-center flex-grow w-0 h-10 border-b border-l hover:bg-blue-500 hover:text-white duration-700 cursor-pointer border-gray-400 justify-center py-7 ${(pesertaUjian?.NilaiF1B3 || 0) <
                                            EXAM_THRESHOLD
                                            ? "text-rose-500"
                                            : "text-black"
                                          }`}
                                        onClick={() => {
                                          setIsShowHistoryUserAnswers(true)
                                          fetchData(pesertaUjian?.IdUserUjian, 'F1B3')
                                        }}
                                      >
                                        <span>
                                          {pesertaUjian?.NilaiF1B3 || 0}
                                        </span>
                                      </div>
                                      <div
                                        className={`flex items-center flex-grow w-0 h-10 border-b border-l font-bold border-gray-400 justify-center py-7 ${(() => {
                                          const isAnkapinOrAtkapin =
                                            dataUjian[0]?.TypeUjian ===
                                            "ANKAPIN II" ||
                                            dataUjian[0]?.TypeUjian ===
                                            "ATKAPIN II";

                                          // Hitung rata-rata nilai berdasarkan tipe ujian
                                          const averageScore =
                                            isAnkapinOrAtkapin
                                              ? ((pesertaUjian?.NilaiF1B1 ||
                                                0) +
                                                (pesertaUjian?.NilaiF1B2 ||
                                                  0)) /
                                              2
                                              : ((pesertaUjian?.NilaiF1B1 ||
                                                0) +
                                                (pesertaUjian?.NilaiF1B2 ||
                                                  0) +
                                                (pesertaUjian?.NilaiF1B3 ||
                                                  0)) /
                                              3;

                                          return averageScore < EXAM_THRESHOLD
                                            ? "text-rose-500"
                                            : "text-green-500";
                                        })()}`}
                                      >
                                        <span>
                                          {(() => {
                                            const isAnkapinOrAtkapin =
                                              dataUjian[0]?.TypeUjian ===
                                              "ANKAPIN II" ||
                                              dataUjian[0]?.TypeUjian ===
                                              "ATKAPIN II";

                                            return isAnkapinOrAtkapin
                                              ? (
                                                ((pesertaUjian?.NilaiF1B1 ||
                                                  0) +
                                                  (pesertaUjian?.NilaiF1B2 ||
                                                    0)) /
                                                2
                                              ).toFixed(2)
                                              : (
                                                ((pesertaUjian?.NilaiF1B1 ||
                                                  0) +
                                                  (pesertaUjian?.NilaiF1B2 ||
                                                    0) +
                                                  (pesertaUjian?.NilaiF1B3 ||
                                                    0)) /
                                                3
                                              ).toFixed(2);
                                          })()}
                                        </span>
                                      </div>

                                      <div
                                        className={`flex items-center flex-grow w-0 h-10 border-b border-l hover:bg-blue-500 hover:text-white duration-700 cursor-pointer font-bold border-gray-400 justify-center py-7 ${(pesertaUjian?.NilaiF2B1 || 0) <
                                          EXAM_THRESHOLD
                                          ? "text-rose-500"
                                          : "text-green-500"
                                          }`}
                                        onClick={() => {
                                          setIsShowHistoryUserAnswers(true)
                                          fetchData(pesertaUjian?.IdUserUjian, 'F2B1')
                                        }}
                                      >
                                        <span>
                                          {pesertaUjian?.NilaiF2B1 || 0}
                                        </span>
                                      </div>
                                      <div
                                        className={`flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 justify-center hover:bg-blue-500 hover:text-white duration-700 cursor-pointer py-7 ${(pesertaUjian?.NilaiF3B1 || 0) <
                                          EXAM_THRESHOLD
                                          ? "text-rose-500"
                                          : "text-black"
                                          }`}
                                        onClick={() => {
                                          setIsShowHistoryUserAnswers(true)
                                          fetchData(pesertaUjian?.IdUserUjian, 'F3B1')
                                        }}
                                      >
                                        <span>
                                          {pesertaUjian?.NilaiF3B1 || 0}
                                        </span>
                                      </div>
                                      <div
                                        className={`flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 justify-center hover:bg-blue-500 hover:text-white duration-700 cursor-pointer py-7 ${(pesertaUjian?.NilaiF3B2 || 0) <
                                          EXAM_THRESHOLD
                                          ? "text-rose-500"
                                          : "text-black"
                                          }`}
                                        onClick={() => {
                                          setIsShowHistoryUserAnswers(true)
                                          fetchData(pesertaUjian?.IdUserUjian, 'F3B2')
                                        }}
                                      >
                                        <span>
                                          {pesertaUjian?.NilaiF3B2 || 0}
                                        </span>
                                      </div>
                                      <div
                                        className={`flex items-center flex-grow w-0 h-10 border-b border-l font-bold border-gray-400 justify-center py-7 ${((pesertaUjian?.NilaiF3B1 || 0) +
                                          (pesertaUjian?.NilaiF3B2 || 0)) /
                                          2 <
                                          EXAM_THRESHOLD
                                          ? "text-rose-500"
                                          : "text-green-500"
                                          }`}
                                      >
                                        <span>
                                          {(
                                            ((pesertaUjian?.NilaiF3B1 || 0) +
                                              (pesertaUjian?.NilaiF3B2 || 0)) /
                                            2
                                          ).toFixed(2)}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                  <div
                                    className={`flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 justify-center py-7 bg-neutral-200 font-bold ${dataUjian[0]!.TypeUjian.includes(
                                      "Rewarding"
                                    ) || dataUjian[0]!.TypeUjian.includes('TRYOUT')
                                      ? ((pesertaUjian?.NilaiF1B1 || 0) +
                                        (pesertaUjian?.NilaiF2B1 || 0) +
                                        (pesertaUjian?.NilaiF3B1 || 0)) /
                                        3 <
                                        EXAM_THRESHOLD
                                        ? "text-rose-500"
                                        : "text-green-500"
                                      : dataUjian[0]!.TypeUjian ==
                                        "ANKAPIN II" ||
                                        dataUjian[0].TypeUjian == "ATKAPIN II"
                                        ? ((pesertaUjian?.NilaiF1B1 || 0) +
                                          (pesertaUjian?.NilaiF1B2 || 0) +
                                          (pesertaUjian?.NilaiF2B1 || 0) +
                                          (pesertaUjian?.NilaiF3B1 || 0) +
                                          (pesertaUjian?.NilaiF3B2 || 0)) /
                                          5 <
                                          EXAM_THRESHOLD
                                          ? "text-rose-500"
                                          : "text-green-500"
                                        : ((pesertaUjian?.NilaiF1B1 || 0) +
                                          (pesertaUjian?.NilaiF1B2 || 0) +
                                          (pesertaUjian?.NilaiF1B3 || 0) +
                                          (pesertaUjian?.NilaiF2B1 || 0) +
                                          (pesertaUjian?.NilaiF3B1 || 0) +
                                          (pesertaUjian?.NilaiF3B2 || 0)) /
                                          6 <
                                          EXAM_THRESHOLD
                                          ? "text-rose-500"
                                          : "text-green-500"
                                      }`}
                                  >
                                    <span>
                                      {dataUjian[0]!.TypeUjian.includes(
                                        "Rewarding"
                                      ) || dataUjian[0]!.TypeUjian.includes('TRYOUT')
                                        ? (
                                          ((pesertaUjian?.NilaiF1B1 || 0) +
                                            (pesertaUjian?.NilaiF2B1 || 0) +
                                            (pesertaUjian?.NilaiF3B1 || 0)) /
                                          3
                                        ).toFixed(2)
                                        : dataUjian[0]!.TypeUjian ==
                                          "ANKAPIN II" ||
                                          dataUjian[0].TypeUjian == "ATKAPIN II"
                                          ? (
                                            (((pesertaUjian?.NilaiF1B1 || 0) +
                                              (pesertaUjian?.NilaiF1B2 || 0)) /
                                              2 +
                                              (pesertaUjian?.NilaiF2B1 || 0) +
                                              ((pesertaUjian?.NilaiF3B1 || 0) +
                                                (pesertaUjian?.NilaiF3B2 ||
                                                  0)) /
                                              2) /
                                            3
                                          ).toFixed(2)
                                          : (
                                            (((pesertaUjian?.NilaiF1B1 || 0) +
                                              (pesertaUjian?.NilaiF1B2 || 0) +
                                              (pesertaUjian?.NilaiF1B3 || 0)) /
                                              3 +
                                              (pesertaUjian?.NilaiF2B1 || 0) +
                                              ((pesertaUjian?.NilaiF3B1 || 0) +
                                                (pesertaUjian?.NilaiF3B2 ||
                                                  0)) /
                                              2) /
                                            3
                                          ).toFixed(2)}
                                    </span>
                                  </div>

                                  <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 justify-center py-7">
                                    <span>
                                      {pesertaUjian?.NilaiKomprensifF1 || 0}
                                    </span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 justify-center py-7">
                                    <span>
                                      {pesertaUjian?.NilaiKomprensifF2 || 0}
                                    </span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 justify-center py-7">
                                    <span>
                                      {pesertaUjian?.NilaiKomprensifF3 || 0}
                                    </span>
                                  </div>
                                  <div
                                    className={`flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 justify-center py-7 bg-neutral-200 font-bold ${(pesertaUjian?.NilaiKomprensifF1 +
                                      pesertaUjian?.NilaiKomprensifF2 +
                                      pesertaUjian?.NilaiKomprensifF3) /
                                      3 >
                                      EXAM_THRESHOLD
                                      ? "text-green-500"
                                      : "text-rose-500"
                                      }`}
                                  >
                                    <span>
                                      {(
                                        (pesertaUjian?.NilaiKomprensifF1 +
                                          pesertaUjian?.NilaiKomprensifF2 +
                                          pesertaUjian?.NilaiKomprensifF3) /
                                        3
                                      ).toFixed(2) || 0}
                                    </span>
                                  </div>
                                  <div
                                    className={`flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 justify-center py-7  bg-neutral-200 font-bold ${dataUjian[0]!.TypeUjian.includes(
                                      "Rewarding"
                                    ) || dataUjian[0]!.TypeUjian.includes('TRYOUT')
                                      ? (((pesertaUjian?.NilaiF1B1 || 0) +
                                        (pesertaUjian?.NilaiF2B1 || 0) +
                                        (pesertaUjian?.NilaiF3B1 || 0)) /
                                        3) *
                                        THEORY_WEIGHT +
                                        ((pesertaUjian?.NilaiKomprensifF1 +
                                          pesertaUjian?.NilaiKomprensifF2 +
                                          pesertaUjian?.NilaiKomprensifF3) /
                                          3) *
                                        PRACTICE_WEIGHT <
                                        EXAM_THRESHOLD
                                        ? "text-rose-500"
                                        : "text-green-500"
                                      : dataUjian[0]!.TypeUjian ==
                                        "ANKAPIN II" ||
                                        dataUjian[0].TypeUjian == "ATKAPIN II"
                                        ? ((((pesertaUjian?.NilaiF1B1 || 0) +
                                          (pesertaUjian?.NilaiF1B2 || 0)) /
                                          2 +
                                          (pesertaUjian?.NilaiF2B1 || 0) +
                                          ((pesertaUjian?.NilaiF3B1 || 0) +
                                            (pesertaUjian?.NilaiF3B2 || 0)) /
                                          2) /
                                          3) *
                                          THEORY_WEIGHT +
                                          ((pesertaUjian?.NilaiKomprensifF1 +
                                            pesertaUjian?.NilaiKomprensifF2 +
                                            pesertaUjian?.NilaiKomprensifF3) /
                                            3) *
                                          PRACTICE_WEIGHT <
                                          EXAM_THRESHOLD
                                          ? "text-rose-500"
                                          : "text-green-500"
                                        : ((((pesertaUjian?.NilaiF1B1 || 0) +
                                          (pesertaUjian?.NilaiF1B2 || 0) +
                                          (pesertaUjian?.NilaiF1B3 || 0)) /
                                          3 +
                                          (pesertaUjian?.NilaiF2B1 || 0) +
                                          ((pesertaUjian?.NilaiF3B1 || 0) +
                                            (pesertaUjian?.NilaiF3B2 || 0)) /
                                          2) /
                                          3) *
                                          THEORY_WEIGHT +
                                          ((pesertaUjian?.NilaiKomprensifF1 +
                                            pesertaUjian?.NilaiKomprensifF2 +
                                            pesertaUjian?.NilaiKomprensifF3) /
                                            3) *
                                          PRACTICE_WEIGHT <
                                          EXAM_THRESHOLD
                                          ? "text-rose-500"
                                          : "text-green-500"
                                      }`}
                                  >
                                    <span>
                                      {dataUjian[0]!.TypeUjian.includes(
                                        "Rewarding"
                                      ) || dataUjian[0]!.TypeUjian.includes('TRYOUT')
                                        ? (
                                          (((pesertaUjian?.NilaiF1B1 || 0) +
                                            (pesertaUjian?.NilaiF2B1 || 0) +
                                            (pesertaUjian?.NilaiF3B1 || 0)) /
                                            3) *
                                          THEORY_WEIGHT +
                                          ((pesertaUjian?.NilaiKomprensifF1 +
                                            pesertaUjian?.NilaiKomprensifF2 +
                                            pesertaUjian?.NilaiKomprensifF3) /
                                            3) *
                                          PRACTICE_WEIGHT
                                        ).toFixed(2)
                                        : dataUjian[0]!.TypeUjian ==
                                          "ANKAPIN II" ||
                                          dataUjian[0].TypeUjian == "ATKAPIN II"
                                          ? (
                                            ((((pesertaUjian?.NilaiF1B1 || 0) +
                                              (pesertaUjian?.NilaiF1B2 || 0)) /
                                              2 +
                                              (pesertaUjian?.NilaiF2B1 || 0) +
                                              ((pesertaUjian?.NilaiF3B1 || 0) +
                                                (pesertaUjian?.NilaiF3B2 ||
                                                  0)) /
                                              2) /
                                              3) *
                                            THEORY_WEIGHT +
                                            ((pesertaUjian?.NilaiKomprensifF1 +
                                              pesertaUjian?.NilaiKomprensifF2 +
                                              pesertaUjian?.NilaiKomprensifF3) /
                                              3) *
                                            PRACTICE_WEIGHT
                                          ).toFixed(2)
                                          : (
                                            ((((pesertaUjian?.NilaiF1B1 || 0) +
                                              (pesertaUjian?.NilaiF1B2 || 0) +
                                              (pesertaUjian?.NilaiF1B3 || 0)) /
                                              3 +
                                              (pesertaUjian?.NilaiF2B1 || 0) +
                                              ((pesertaUjian?.NilaiF3B1 || 0) +
                                                (pesertaUjian?.NilaiF3B2 ||
                                                  0)) /
                                              2) /
                                              3) *
                                            THEORY_WEIGHT +
                                            ((pesertaUjian?.NilaiKomprensifF1 +
                                              pesertaUjian?.NilaiKomprensifF2 +
                                              pesertaUjian?.NilaiKomprensifF3) /
                                              3) *
                                            PRACTICE_WEIGHT
                                          ).toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 font-bold justify-center py-7 text-center">
                                    <span
                                      className={`  ${checkLulus(
                                        pesertaUjian,
                                        dataUjian[0]
                                      ) == "TIDAK LULUS"
                                        ? "text-rose-500"
                                        : "text-green-500"
                                        }`}
                                    >
                                      {checkLulus(pesertaUjian, dataUjian[0])}
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
                                Jumlah Peserta{"     "}: {"          "}{" "}
                                <span className="font-normal">
                                  {data!.length} Orang
                                </span>
                              </p>
                              <p className="text-sm font-semibold tracking-tight  ">
                                Lulus (L){"     "}: {"          "}{" "}
                                <span className="font-normal">
                                  {countLulus(data, dataUjian[0]).lulus} Orang
                                </span>
                              </p>
                              <p className="text-sm font-semibold tracking-tight  ">
                                Tidak Lulus (TL){"     "}: {"          "}{" "}
                                <span className="font-normal">
                                  {countLulus(data, dataUjian[0]).tidakLulus}{" "}
                                  Orang
                                </span>
                              </p>
                            </div>

                            <div className="w-full flex items-end justify-end">
                              <p className="capitalize text-sm">
                                {dataUjian[0]!.TempatUjian},{" "}
                                {generateTanggalPelatihan(
                                  dataUjian[0]!.TanggalMulaiUjian
                                )}
                              </p>
                            </div>
                          </div>

                          {dataPukakp != null ? (
                            <div className="flex w-full items-center justify-center flex-col">
                              <div className="flex items-center justify-around w-full mb-5 mt-6 gap-8">
                                <div className="flex flex-col gap-1  capitalize text-center items-center justify-center">
                                  <p className="font-semibold text-sm">
                                    Ketua, PUKAKP
                                  </p>
                                  <p className="text-xs -mt-1">
                                    {dataUjian[0]!.PUKAKP}
                                  </p>
                                  <p className="text-sm border-b-black border-b  pb-5 mt-14 w-2/3">
                                    {dataPukakp?.KetuaPukakp}
                                  </p>
                                  <p className="text-sm ">
                                    NIP. {dataPukakp?.NipKetua}
                                  </p>
                                </div>

                                <div className="flex flex-col gap-1 capitalize text-center items-center justify-center">
                                  <p className="font-semibold text-sm">
                                    Sekretaris, PUKAKP
                                  </p>
                                  <p className="text-xs -mt-1">
                                    {dataUjian[0]!.PUKAKP}
                                  </p>
                                  <p className="text-sm border-b-black border-b mt-14 pb-5 w-2/3">
                                    {dataPukakp?.SesPukakp}
                                  </p>
                                  <p className="text-sm ">
                                    NIP. {dataPukakp?.NipSes}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-col gap-1 capitalize text-center w-1/5">
                                <p className="font-semibold text-sm leading-none">
                                  Mengetahui,
                                </p>
                                <p className="font-semibold text-sm leading-none">
                                  Ketua DPKAKP,
                                </p>
                                <p className="text-sm border-b-black border-b mt-14 pb-5">
                                  Achmad Subijakto, A.Pi., MP.
                                </p>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <AlertDialog open={isOpenFormUjianKeahlian}>
              <AlertDialogContent className="max-w-xl">
                <AlertDialogHeader className="gap-0 flex flex-col">
                  <AlertDialogTitle className="flex items-center gap-2 text-2xl">
                    {" "}
                    <FaBookOpen className="h-4 w-4" />
                    Masukkan Nilai Komprehensif <br /><span className='capitalize'>{selectedNamaPeserta}</span>
                  </AlertDialogTitle>
                  <AlertDialogDescription className="-mt-6">
                    Sebagai kelengkapan penilaian dari pelaksanaan ujian
                    keahlaian Awak Kapal Perikanan ini, diharap sebagai penguji
                    dapat memasukkan nilai yang didapatkan peserta dari proses
                    komprehensif!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <fieldset>
                  <form autoComplete="off">
                    <div className="grid grid-cols-3  gap-2 mb-1">
                      <div className="flex  gap-2 mb-2 w-full">
                        <div className="w-full">
                          <label
                            className="block text-gray-800 text-sm font-medium mb-1"
                            htmlFor="name"
                          >
                            Nilai F1 <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            className="form-input w-full text-black border-gray-300 rounded-md"
                            placeholder="Masukkan nilai"
                            required
                            value={nilaiKomprehensif}
                            onChange={(e) =>
                              setNilaiKomprehensif(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="flex  gap-2 mb-2 w-full">
                        <div className="w-full">
                          <label
                            className="block text-gray-800 text-sm font-medium mb-1"
                            htmlFor="name"
                          >
                            Nilai F2 <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            className="form-input w-full text-black border-gray-300 rounded-md"
                            placeholder="Masukkan nilai"
                            required
                            value={nilaiKomprehensif2}
                            onChange={(e) =>
                              setNilaiKomprehensif2(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 mb-2 w-full">
                        <div className="w-full">
                          <label
                            className="block text-gray-800 text-sm font-medium mb-1"
                            htmlFor="name"
                          >
                            Nilai F3 <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            className="form-input w-full text-black border-gray-300 rounded-md"
                            placeholder="Masukkan nilai"
                            required
                            value={nilaiKomprehensif3}
                            onChange={(e) =>
                              setNilaiKomprehensif3(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <AlertDialogFooter className="mt-3">
                      <AlertDialogCancel
                        onClick={(e) => {
                          setIsOpenFormUjianKeahlian(false);
                          if (isEditing) {
                            setNilaiKomprehensif("");
                            setNilaiKomprehensif2("");
                            setNilaiKomprehensif3("");
                          }
                          setEditing(false);
                        }}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          handleUploadNilaiKomprehensif(e);
                        }}
                      >
                        {isEditing ? "Edit" : "Upload"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </form>
                </fieldset>
              </AlertDialogContent>
            </AlertDialog>
          </>
        </>
      ) : (
        <></>
      )
      }
    </div >
  );
};

export default TableDataPesertaUjianKeahlian;
