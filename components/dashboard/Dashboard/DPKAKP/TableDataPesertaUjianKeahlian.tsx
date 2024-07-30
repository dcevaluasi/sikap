import React, { useState } from "react";
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
  TbCalendarCheck,
  TbChartBubble,
  TbChartDonut,
  TbCircleKey,
  TbClipboardCheck,
  TbDatabaseEdit,
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
import {
  MdInfo,
  MdOutlineNumbers,
  MdOutlinePaid,
  MdOutlinePayment,
  MdSchool,
} from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import { Pelatihan, PelatihanMasyarakat, UserPelatihan } from "@/types/product";
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
import { FaBookOpen, FaMapPin, FaRupiahSign } from "react-icons/fa6";
import Toast from "@/components/toast";
import { GiTakeMyMoney } from "react-icons/gi";
import { DialogSertifikatPelatihan } from "@/components/sertifikat/dialogSertifikatPelatihan";
import Cookies from "js-cookie";
import { PiExam, PiKeyFill, PiMicrosoftExcelLogoFill } from "react-icons/pi";
import TableData from "../../Tables/TableData";
import { dpkakpBaseUrl } from "@/constants/urls";
import { getIdUjianKeahlianInPathPesertaUjian } from "@/components/utils/dpkakp/pathname";
import { BsFileExcel, BsPersonVcard } from "react-icons/bs";

const TableDataPesertaUjianKeahlian = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const pathname = usePathname();
  const idUjianKeahlian = getIdUjianKeahlianInPathPesertaUjian(pathname!);
  console.log("PATHNAME", pathname);
  console.log("IDUJIAN", idUjianKeahlian);
  const id = extractLastSegment(pathname);
  const [noSertifikatTerbitkan, setNoSertifikatTerbitkan] = React.useState("");

  /**
   * =============================================================
   * UTILS FOR FETCHING UJIAN KEAHLIAN DATA
   * =============================================================
   */

  /*============== STORE DATA VARIABLES ================ */
  const [data, setData] = React.useState<UsersUjian[]>([]);

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
      setIsFetching(false);
    } catch (error) {
      console.error(error);
      setIsFetching(false);
      throw error;
    }
  };

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
      accessorKey: "IdUserUjian",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex w-full text-gray-900 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Action
          <TbDatabaseEdit className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-center gap-1">
            <Button variant="outline" className="border border-[#000000]">
              <TbInfoCircleFilled className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="border border-rose-600">
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="border border-indigo-600">
                  <PiKeyFill className="h-4 w-4 text-lg text-indigo-600" />
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
                  <thead>
                    <tr>
                      <th className="border border-gray-200">F1B1</th>
                      <th className="border border-gray-200">F1B2</th>
                      <th className="border border-gray-200">F1B3</th>
                      <th className="border border-gray-200">F2B1</th>
                      <th className="border border-gray-200">F3B1</th>
                      <th className="border border-gray-200">F3B2</th>
                    </tr>
                  </thead>
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
                        // Fill remaining cells with empty <td> elements to ensure there are always 6
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
          <p className="leading-[105%]">Nilai Ujian F1B1</p>
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
          <p className="leading-[105%]">Nilai Ujian F1B2</p>
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
          <p className="leading-[105%]">Nilai Ujian F1B3</p>
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
      accessorKey: "NilaiF2B1",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-black font-semibold w-full ml-auto p-0 flex justify-center items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="leading-[105%]">Nilai Ujian F1B3</p>
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
          <p className="leading-[105%]">Nilai Ujian F3B1</p>
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
          <p className="leading-[105%]">Nilai Ujian F3B2</p>
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
      cell: ({ row }) => (
        <div className="ml-auto capitalize w-full flex items-center justify-center">
          <p className="text-sm font-normal tracking-tight leading-none">
            {row.getValue("NilaiKomprensif")}
          </p>
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

  const [isOpenFormInputNilai, setIsOpenFormInputNilai] = React.useState(false);
  const [nilaiPretest, setNilaiPretest] = React.useState("");
  const [nilaiPosttest, setNilaiPosttest] = React.useState("");

  const [selectedIdPeserta, setSelectedIdPeserta] = React.useState(0);

  const [isOpenFormPeserta, setIsOpenFormPeserta] =
    React.useState<boolean>(false);
  const [fileExcelPesertaPelatihan, setFileExcelPesertaPelatihan] =
    React.useState<File | null>(null);
  const handleFileChange = (e: any) => {
    setFileExcelPesertaPelatihan(e.target.files[0]);
  };
  const handleUploadImportPesertaPelatihan = async (e: any) => {
    e.preventDefault();
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
      setIsOpenFormPeserta(!isOpenFormPeserta);
    } catch (error) {
      console.log("FILE IMPORT PESERTA PELATIHAN : ", error);
      setIsOpenFormPeserta(!isOpenFormPeserta);
      Toast.fire({
        icon: "error",
        title: `Gagal mengupload peserta ujian keahlian!`,
      });
    }
  };

  const handleSematkanSoalUjianKeahlianToPeserta = async (e: any) => {
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
        title: `Selamat anda berhasil menyematkan soal ujian ke peserta ujian keahlian!`,
      });
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: `Gagal anda berhasil menyematkan soal ujian ke peserta ujian keahlian!`,
      });
    }
  };

  React.useEffect(() => {
    handleFetchingUjianKeahlianData();
  }, []);

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
                        "https://docs.google.com/spreadsheets/d/1KlEBRcgXLZK6NCL0r4nglKa6XazHgUH7fqvHlrIHmNI/edit?usp=sharing"
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

      {showFormAjukanPelatihan ? (
        <h1>TEST</h1>
      ) : (
        <>
          {/* Header Tabel Data Pelatihan */}
          <div className="flex items-center mb-3 justify-between gap-3 ">
            {/* Statistik Pelatihan */}
            {/* <div className="flex w-full gap-3 sm:gap-5">
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
                    {dataPelatihan?.UserPelatihan.length} orang / Rp.{" "}
                    {dataPelatihan?.UserPelatihan?.reduce(
                      (total: number, jumlahBayar: UserPelatihan) => {
                        return total + parseInt(jumlahBayar.TotalBayar);
                      },
                      0
                    )}
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
              <div className="flex min-w-47.5">
                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-yellow-400">
                  <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-yellow-500"></span>
                </span>
                <div className="w-full">
                  <p className="font-semibold text-yellow-500">
                    Total Terbit Sertifikat
                  </p>
                  <p className="text-sm font-medium">
                    {" "}
                    {dataPelatihan?.UserPelatihan?.reduce(
                      (total: number, user: UserPelatihan) => {
                        if (user.NoSertifikat !== "") {
                          return total + 1;
                        }
                        return total;
                      },
                      0
                    ) || 0}{" "}
                    orang
                  </p>
                </div>
              </div>
            </div> */}
          </div>

          <div className="flex w-full items-center mb-2">
            {/* <div className="flex w-full gap-1 items-start">
              <Select>
                <SelectTrigger className="w-[200px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                  <div className="inline-flex gap-2 px-3 mr-2 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer">
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
                  <div className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer">
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
                  <div className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer">
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
            </div> */}

            <div className="w-full flex justify-end gap-2">
              <div className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit">
                <PiMicrosoftExcelLogoFill />
                Export Peserta
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer">
                    <FaMapPin />
                    Sematkan Soal Ujian
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Apakah anda yakin akan menyematkan soal ujian?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Pastikan jumlah anggota mu sudah sesuai dengan data
                      peserta ujian yang sudah didaftarkan dan merpukan anggota
                      yang sah tercantum dalam Surat Keputusan Dewan sebagai
                      peserta yang mengikuti ujian keahlian awak kapal Perikanan
                      !
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) =>
                        handleSematkanSoalUjianKeahlianToPeserta(e)
                      }
                      className="bg-gray-900"
                    >
                      Sematkan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <div
                onClick={(e) => setIsOpenFormPeserta(!isOpenFormPeserta)}
                className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer"
              >
                <FiUploadCloud />
                Tambah Peserta Ujian
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
          </div>
        </>
      )}
    </div>
  );
};

export default TableDataPesertaUjianKeahlian;
