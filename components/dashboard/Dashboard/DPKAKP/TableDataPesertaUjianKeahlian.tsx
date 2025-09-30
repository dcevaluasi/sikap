import React, { useState } from "react";
import * as XLSX from "xlsx";

import "jspdf-autotable";
import { useReactToPrint } from "react-to-print";

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
import { FiUploadCloud } from "react-icons/fi";

import { usePathname, useRouter } from "next/navigation";
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
import EmptyData from "@/components/micro-components/EmptyData";
import { CodeAccessAction } from "../Actions/CodeAccessAction";
import HistoryJawabanuserUjian from "./HistoryJawabanUserUjian";
import HeaderDPAKP from "./HeaderDPKAKP";
import KartuUserUjian from "./KartuUserUjian";
import ImportAction from "../Actions/ImportAction";

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

  const handleSwitchCodeAccessIsUse = async (kodeAkses: string, isUseCode: string) => {
    const isUse = isUseCode == 'true' ? 'false' : 'true'
    try {
      const response: AxiosResponse = await axios.put(
        `${dpkakpBaseUrl}/updateIsUse?kode_akses=${kodeAkses}`, {
        is_use: isUse,
      },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      console.log({ kodeAkses })
      console.log({ isUse })
      Toast.fire({
        icon: "success",
        title: 'Yeayyy!',
        text: `Selamat anda berhasil mengupdate status kode!`,
      });
      console.log(response); handleFetchingUjianKeahlianData()
      setDataPukakp(response.data.data);
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: 'Oopsss!',
        text: `Maaf anda gagal mengupdate status kode!`,
      });
      throw error;
    }
  }


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

  console.log({ data })

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
          className={`w-full text-gray-900 font-semibold ${dataUjian.length != 0 && (
            dataUjian[0].IsSelesai == "1" ? 'hidden' : 'flex')}`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Actions
          <TbDatabaseEdit className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div
          className={`w-full ${dataUjian.length != 0 && (
            dataUjian[0].IsSelesai == "1" ? 'hidden' : 'flex')}  flex-col gap-2`}
        >
          <div className="flex  w-full items-center justify-center gap-1">

            <Button
              onClick={(e) => {
                setSelectedIdPeserta(row.original.IdUserUjian);
                setIsOpenFormUjianKeahlian(!isOpenFormUjianKeahlian);
                setSelectedNamaPeserta(row.original.Nama)
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

                }
              }}
              variant="outline"
              className="bg-neutral-950 hover:bg-neutral-950 text-neutral-200 rounded-md hover:text-neutral-200"
            >
              <TbEditCircle className="h-5 w-5 mr-1" />
              {row.original.NilaiKomprensifF1 != 0 ? "Edit" : "Input"} Nilai
              Kompre
            </Button>
            <CodeAccessAction
              dataUjian={dataUjian}
              row={row}
              handleSwitchCodeAccessIsUse={handleSwitchCodeAccessIsUse} />


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


  const [hideValue, setHideValue] = React.useState<boolean>(false)

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default  sm:px-7.5 xl:col-span-8">
      {data != null ? (
        <>

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
                {(
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
                )}

                {dataUjian.length != 0 &&
                  dataUjian[0]!.UsersUjian.length != 0 && (
                    <>
                      {" "}

                      {!showKartuUjian ?
                        <></>
                        : <div
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

                {((pathname.includes("dpkakp") && !isPenguji)) && (
                  <>
                    {showRekapitulasiNilai && (
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
                    )}
                    {(!showKartuUjian && !showRekapitulasiNilai) && (
                      <>

                        <div
                          onClick={() => setShowRekapitulasiNilai(true)}
                          className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
                        >
                          <BiEditAlt />
                          Rekapitulasi Nilai Ujian
                        </div></>
                    )}
                    {dataUjian.length != 0 && (
                      dataUjian[0].UsersUjian.length != 0 && (
                        dataUjian[0].UsersUjian[0].CodeAksesUsersBagian.length == 0 && (
                          <div
                            onClick={() => setHandleOpenFormSematkan(true)}
                            className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
                          >
                            <FaMapPin />
                            Distribusikan Soal
                          </div>
                        )
                      )
                    )}

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
                  (pathname.includes("pukakp") || Cookies.get('PUKAKP') == "DPKAKP - Dewan Penguji Keahlian Awak Kapal Perikanan") ? (
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

            {!showKartuUjian && !showRekapitulasiNilai && (
              <div>
                <TableData
                  isLoading={false}
                  columns={columns}
                  table={table}
                  type={"long"}
                />
              </div>
            )}

            {showKartuUjian && (
              <div className="" ref={printRef}>
                {" "}
                <div className="grid grid-cols-1 gap-2">
                  {dataUjian.length != 0 &&
                    data!.map((peserta, index) => (
                      <KartuUserUjian
                        key={index}
                        peserta={peserta}
                        dataUjian={dataUjian}
                        dataPukakp={dataPukakp}
                        generateTanggalPelatihan={generateTanggalPelatihan}
                      />
                    ))}
                </div>
              </div>
            )}

            {showRekapitulasiNilai && (
              <div className="border border-gray-300">
                <HistoryJawabanuserUjian
                  isOpen={isShowHistoryUserAnswers}
                  onOpenChange={setIsShowHistoryUserAnswers}
                  dataAnswer={dataAnswer}
                  trueCount={trueCount}
                  falseCount={falseCount}
                  isFetching={isFetchingHistoryUserAnswers}
                />
                <div className="" ref={printRefRekapitulasiNilai}>
                  {" "}
                  <div
                    className="grid grid-cols-1 gap-2 w-full h-feull"
                    ref={printRefRekapitulasiNilaiPage}
                  >
                    {dataUjian.length != 0 && (
                      <div className="flex w-full gap-2">
                        <div className="w-full rounded-lg p-6 flex flex-col items-center justify-center">
                          <HeaderDPAKP />

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
                                <span className="">Nama</span>
                              </div>
                              <div className="flex items-center flex-grow !w-10 h-10 px-2 border-b border-l border-gray-400 bg-[#338BF6] justify-center text-center leading-none py-6">
                                <span className="">Asal</span>
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
                                <span className="">K.F1</span>
                              </div>
                              <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#595959] justify-center text-center leading-none py-6">
                                <span className="">K.F2</span>
                              </div>
                              <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#595959] justify-center text-center leading-none py-6">
                                <span className="">K.F3</span>
                              </div>
                              <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#595959] justify-center text-center leading-none py-6">
                                <span className="">Nilai Kumulatif Kompre</span>
                              </div>
                              <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#595959] justify-center text-center leading-none py-6">
                                <span className="">Nilai Final</span>
                              </div>
                              <div className="flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 bg-[#595959] justify-center text-center leading-none py-6">
                                <span className="">HASIL</span>
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
                                  <div className="flex items-center justify-start text-left flex-grow !w-10 h-10 px-2 border-b border-l border-gray-400  py-7 capitalize leading-none">
                                    <span>{shortenName(pesertaUjian?.Nama) || "-"}</span>
                                  </div>
                                  <div className="flex items-center justify-start text-left flex-grow !w-10 h-10 px-2 border-b border-l border-gray-400  py-7 capitalize leading-none">
                                    <span>{pesertaUjian?.Instansi || "-"}</span>
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
                                          } ${(pesertaUjian?.NilaiF1B1 == 0)
                                          && 'bg-rose-500 !text-white font-semibold'
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
                                          } ${(pesertaUjian?.NilaiF2B1 == 0)
                                          && 'bg-rose-500 !text-white font-semibold'
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
                                          } ${(pesertaUjian?.NilaiF3B1 == 0)
                                          && 'bg-rose-500 !text-white font-semibold'
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
                                          } ${(pesertaUjian?.NilaiF1B1 == 0)
                                          && 'bg-rose-500 !text-white font-semibold'
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
                                          } ${(pesertaUjian?.NilaiF1B2 == 0)
                                          && 'bg-rose-500 !text-white font-semibold'
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
                                          } ${(pesertaUjian?.NilaiF1B3 == 0)
                                          && 'bg-rose-500 !text-white font-semibold'
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
                                          } ${(pesertaUjian?.NilaiF2B1 == 0)
                                          && 'bg-rose-500 !text-white font-semibold'
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
                                          } ${(pesertaUjian?.NilaiF3B1 == 0)
                                          && 'bg-rose-500 !text-white font-semibold'
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
                                          } ${(pesertaUjian?.NilaiF3B2 == 0)
                                          && 'bg-rose-500 !text-white font-semibold'
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
                                          } `}
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
                                      ? (((pesertaUjian?.NilaiF1B1 || 0) +
                                        (pesertaUjian?.NilaiF2B1 || 0) +
                                        (pesertaUjian?.NilaiF3B1 || 0)) /
                                        3) <
                                        EXAM_THRESHOLD
                                        ? "text-rose-500"
                                        : "text-green-500"
                                      : dataUjian[0]!.TypeUjian ==
                                        "ANKAPIN II" ||
                                        dataUjian[0].TypeUjian == "ATKAPIN II"
                                        ? roundUpScore(((pesertaUjian?.NilaiF1B1 || 0) +
                                          (pesertaUjian?.NilaiF1B2 || 0) +
                                          (pesertaUjian?.NilaiF2B1 || 0) +
                                          (pesertaUjian?.NilaiF3B1 || 0) +
                                          (pesertaUjian?.NilaiF3B2 || 0)) /
                                          5) <
                                          EXAM_THRESHOLD
                                          ? "text-rose-500"
                                          : "text-green-500"
                                        : roundUpScore(((pesertaUjian?.NilaiF1B1 || 0) +
                                          (pesertaUjian?.NilaiF1B2 || 0) +
                                          (pesertaUjian?.NilaiF1B3 || 0) +
                                          (pesertaUjian?.NilaiF2B1 || 0) +
                                          (pesertaUjian?.NilaiF3B1 || 0) +
                                          (pesertaUjian?.NilaiF3B2 || 0)) /
                                          6) <
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
                                          roundUpScore(((pesertaUjian?.NilaiF1B1 || 0) +
                                            (pesertaUjian?.NilaiF2B1 || 0) +
                                            (pesertaUjian?.NilaiF3B1 || 0)) /
                                            3)
                                        ).toFixed(2)
                                        : dataUjian[0]!.TypeUjian ==
                                          "ANKAPIN II" ||
                                          dataUjian[0].TypeUjian == "ATKAPIN II"
                                          ? (
                                            roundUpScore((((pesertaUjian?.NilaiF1B1 || 0) +
                                              (pesertaUjian?.NilaiF1B2 || 0)) /
                                              2 +
                                              (pesertaUjian?.NilaiF2B1 || 0) +
                                              ((pesertaUjian?.NilaiF3B1 || 0) +
                                                (pesertaUjian?.NilaiF3B2 ||
                                                  0)) /
                                              2) /
                                              3)
                                          ).toFixed(2)
                                          : (
                                            roundUpScore((((pesertaUjian?.NilaiF1B1 || 0) +
                                              (pesertaUjian?.NilaiF1B2 || 0) +
                                              (pesertaUjian?.NilaiF1B3 || 0)) /
                                              3 +
                                              (pesertaUjian?.NilaiF2B1 || 0) +
                                              ((pesertaUjian?.NilaiF3B1 || 0) +
                                                (pesertaUjian?.NilaiF3B2 ||
                                                  0)) /
                                              2) /
                                              3)
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
                                      {((
                                        (pesertaUjian?.NilaiKomprensifF1 +
                                          pesertaUjian?.NilaiKomprensifF2 +
                                          pesertaUjian?.NilaiKomprensifF3) /
                                        3
                                      ).toFixed(2)) || 0}
                                    </span>
                                  </div>
                                  <div
                                    className={`flex items-center flex-grow w-0 h-10 border-b border-l border-gray-400 justify-center py-7  bg-neutral-200 font-bold ${dataUjian[0]!.TypeUjian.includes(
                                      "Rewarding"
                                    ) || dataUjian[0]!.TypeUjian.includes('TRYOUT')
                                      ? roundUpScore((((pesertaUjian?.NilaiF1B1 || 0) +
                                        (pesertaUjian?.NilaiF2B1 || 0) +
                                        (pesertaUjian?.NilaiF3B1 || 0)) /
                                        3) *
                                        THEORY_WEIGHT +
                                        ((pesertaUjian?.NilaiKomprensifF1 +
                                          pesertaUjian?.NilaiKomprensifF2 +
                                          pesertaUjian?.NilaiKomprensifF3) /
                                          3) *
                                        PRACTICE_WEIGHT) <
                                        EXAM_THRESHOLD
                                        ? "text-rose-500"
                                        : "text-green-500"
                                      : dataUjian[0]!.TypeUjian ==
                                        "ANKAPIN II" ||
                                        dataUjian[0].TypeUjian == "ATKAPIN II"
                                        ? roundUpScore(((((pesertaUjian?.NilaiF1B1 || 0) +
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
                                          PRACTICE_WEIGHT) <
                                          EXAM_THRESHOLD
                                          ? "text-rose-500"
                                          : "text-green-500"
                                        : roundUpScore(((((pesertaUjian?.NilaiF1B1 || 0) +
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
                                          PRACTICE_WEIGHT) <
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
                                          roundUpScore((((pesertaUjian?.NilaiF1B1 || 0) +
                                            (pesertaUjian?.NilaiF2B1 || 0) +
                                            (pesertaUjian?.NilaiF3B1 || 0)) /
                                            3) *
                                            THEORY_WEIGHT +
                                            ((pesertaUjian?.NilaiKomprensifF1 +
                                              pesertaUjian?.NilaiKomprensifF2 +
                                              pesertaUjian?.NilaiKomprensifF3) /
                                              3) *
                                            PRACTICE_WEIGHT
                                          )).toFixed(2)
                                        : dataUjian[0]!.TypeUjian ==
                                          "ANKAPIN II" ||
                                          dataUjian[0].TypeUjian == "ATKAPIN II"
                                          ? (
                                            roundUpScore(((((pesertaUjian?.NilaiF1B1 || 0) +
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
                                            )).toFixed(2)
                                          : (
                                            roundUpScore(((((pesertaUjian?.NilaiF1B1 || 0) +
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
                                              PRACTICE_WEIGHT)
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
              <AlertDialogContent className="max-w-2xl w-full rounded-xl border border-zinc-200 bg-white shadow-xl p-0 overflow-hidden">

                {/* Header */}
                <AlertDialogHeader className="p-6 border-b border-zinc-100 bg-white">
                  <AlertDialogTitle className="text-2xl font-semibold flex items-center gap-3 text-neutral-700">
                    <FaBookOpen className="h-5 w-5 text-neutral-500" />
                    Masukkan Nilai Komprehensif
                  </AlertDialogTitle>
                  <AlertDialogDescription className="mt-2 text-sm text-neutral-500 leading-relaxed">
                    Untuk peserta:{" "}
                    <span className="font-medium capitalize text-neutral-700">
                      {selectedNamaPeserta}
                    </span>
                    <br />
                    Silakan input nilai komprehensif yang diperoleh peserta sebagai bagian dari penilaian ujian keahlian.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                {/* Form */}
                <div className="px-6 py-5 bg-neutral-50">
                  <form autoComplete="off" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <InputField
                        label="Nilai F1"
                        value={nilaiKomprehensif}
                        onChange={(e) => setNilaiKomprehensif(e.target.value)}
                      />
                      <InputField
                        label="Nilai F2"
                        value={nilaiKomprehensif2}
                        onChange={(e) => setNilaiKomprehensif2(e.target.value)}
                      />
                      <InputField
                        label="Nilai F3"
                        value={nilaiKomprehensif3}
                        onChange={(e) => setNilaiKomprehensif3(e.target.value)}
                      />
                    </div>

                    {/* Footer */}
                    <AlertDialogFooter className="flex justify-end gap-1 pt-4 border-t border-zinc-100">
                      <AlertDialogCancel
                        onClick={() => {
                          setIsOpenFormUjianKeahlian(false);
                          if (isEditing) {
                            setNilaiKomprehensif("");
                            setNilaiKomprehensif2("");
                            setNilaiKomprehensif3("");
                          }
                          setEditing(false);
                        }}
                        className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-2 rounded-md transition"
                      >
                        Batal
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => handleUploadNilaiKomprehensif(e)}
                        className="bg-neutral-800 hover:bg-neutral-900 text-white px-4 py-2 rounded-md transition"
                      >
                        {isEditing ? "Perbarui" : "Upload"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </form>
                </div>
              </AlertDialogContent>
            </AlertDialog>


          </>
        </>
      ) : (
        <></>
      )
      }

      <ImportAction
        isOpen={isOpenFormPeserta}
        onClose={() => setIsOpenFormPeserta(false)}
        onUpload={handleUploadImportPesertaPelatihan}
        onFileChange={handleFileChange}
      />
    </div >
  );
};

const InputField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-neutral-700 mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Masukkan nilai"
      required
      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent transition"
    />
  </div>
);


export default TableDataPesertaUjianKeahlian;
