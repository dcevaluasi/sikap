import React, { ReactElement, useState } from "react";
import TableData from "../Tables/TableData";
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
  TbEditCircle,
  TbFileCertificate,
  TbFileDigit,
  TbFishChristianity,
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
import FormPelatihan from "../admin/formPelatihan";
import Toast from "@/components/toast";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { PelatihanMasyarakat } from "@/types/product";
import { FaBookOpen, FaRupiahSign } from "react-icons/fa6";
import { Input } from "@/components/ui/input";

import { convertDate } from "@/utils";
import Cookies from "js-cookie";
import { LemdiklatDetailInfo } from "@/types/lemdiklat";
import { Progress } from "@/components/ui/progress";
import { GiBookmarklet } from "react-icons/gi";
import { DialogSertifikatPelatihan } from "@/components/sertifikat/dialogSertifikatPelatihan";
import { DialogTemplateSertifikatPelatihan } from "@/components/sertifikat/dialogTemplateSertifikatPelatihan";
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
import { TypeUjian, Ujian } from "@/types/ujian-keahlian-akp";

const TableDataUjian: React.FC = () => {
  /**
   * =============================================================
   * UTILS FOR FETCHING UJIAN KEAHLIAN DATA
   * =============================================================
   */

  /*============== STORE DATA VARIABLES ================ */
  const [data, setData] = React.useState<Ujian[]>([]);
  const [dataTypeUjian, setDataTypeUjian] = React.useState<TypeUjian[]>([]);
  const [selectedKeahlian, setSelectedKeahlian] = React.useState<string | null>(
    null
  );
  const pathPukakp = usePathname().includes("pukakp");

  const [dpkakpData, setDpkakpData] =
    React.useState<UserInformationDPKAKP | null>(null);

  const fetchInformationDPKAKP = async () => {
    try {
      const response = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getAdminPusat`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      setDpkakpData(response.data.data);

      console.log("DPKAKP INFO: ", response);
    } catch (error) {
      console.error("DPKAKP INFO: ", error);
    }
  };

  /*================== LOADER VARIABLES ================= */
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  /*=============== HANDLING FETCHING UJIAN ============== */
  const handleFetchingUjianKeahlianData = async () => {
    setIsFetching(true);

    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/GetUjian`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );

      console.log({ response });

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

  console.log({ data });

  const handleFetchingTypeUjianKeahlianData = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getTypeUjian`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      setDataTypeUjian(response.data.data);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      throw error;
    }
  };

  /**
   * =============================================================
   * UTILS FOR POSTING NEW UJIAN KEAHLIAN DATA
   * =============================================================
   */

  /*================== STATE VARIABLES ================= */
  const [idTypeUjian, setIdTypeUjian] = React.useState<string>("");
  const [typeUjian, setTypeUjian] = React.useState<string>("");
  const [namaUjian, setNamaUjian] = React.useState<string>("");
  const [tempatUjian, setTempatUjian] = React.useState<string>("");
  const [pukakp, setPukakp] = React.useState<string>("");
  const [namaPengawas, setNamaPengawas] = React.useState<string>("");
  const [namaVasilitator, setNamaVasilitator] = React.useState<string>("");
  const [tanggalMulai, setTanggalMulai] = React.useState<string>("");
  const [tanggalBerakhir, setTanggalBerakhir] = React.useState<string>("");
  const [waktuUjian, setWaktuUjian] = React.useState<string>("");
  const [jumlahPeserta, setJumlahPeserta] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");

  /*================== LOADER VARIABLES ================= */
  const [isPosting, setIsPosting] = React.useState<boolean>(false);
  const [isOpenFormUjianKeahlian, setIsOpenFormUjianKeahlian] =
    React.useState<boolean>(false);

  /*======= HANDLING CLEAR STATE VARIABLES UJIAN ======== */
  const handleClearNewUjianKeahlian = async () => {
    setIdTypeUjian("");
    setTypeUjian("");
    setNamaUjian("");
    setTempatUjian("");
    setPukakp("");
    setNamaPengawas("");
    setNamaVasilitator("");
    setTanggalMulai("");
    setTanggalBerakhir("");
    setWaktuUjian("");
    setJumlahPeserta("");
    setStatus("");
  };

  /*=============== HANDLING POSTING UJIAN ============== */
  const handlePostNewUjianKeahlian = async (e: any) => {
    setIsPosting(true);
    const [nameTypeUjianValue, idTypeUjianValue] = typeUjian.split(",");

    const formData = new FormData();
    formData.append("IdTypeUjian", idTypeUjianValue);
    formData.append("TypeUjian", nameTypeUjianValue);
    formData.append("NamaUjian", namaUjian);
    formData.append("TempatUjian", tempatUjian);
    formData.append("PUKAKP", Cookies.get("PUKAKP")!);
    formData.append("NamaPengawas", namaPengawas);
    formData.append("NamaVasilitator", namaVasilitator);
    formData.append("TanggalMulaiUjian", tanggalMulai);
    formData.append("TanggalBerakhirUjian", tanggalBerakhir);
    formData.append("WaktuUjian", waktuUjian);
    formData.append("JumlahPesertaUjian", jumlahPeserta.toString());
    formData.append("Status", "Tidak Aktif");
    if (filePermohonan != null) {
      formData.append("filePermohonan", filePermohonan!);
    }

    try {
      const response = await axios.post(
        `${dpkakpBaseUrl}/adminPusat/createUjian`,
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
        title: `Berhasil menambahkan data pelaksanaan ujian keahlian baru!`,
      });
      handleFetchingUjianKeahlianData();
      setIsOpenFormUjianKeahlian(!isOpenFormUjianKeahlian);
      setIsPosting(false);
      setStatus("");
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: `Gagal menambahkan data pelaksanaan ujian keahlian baru!`,
      });
      handleFetchingUjianKeahlianData();
      setIsOpenFormUjianKeahlian(!isOpenFormUjianKeahlian);
      setIsPosting(true);
      setStatus("");
    }
  };

  const handleUpdateNewUjianKeahlian = async (e: any) => {
    setIsPosting(true);

    try {
      const response = await axios.put(
        `${dpkakpBaseUrl}/adminPusat/updateUjian?id=${selectedId}`,
        {
          nama_pengawas_ujian: namaPengawas,
          nama_vasilitator_ujian: namaVasilitator,
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
        title: `Berhasil mengupdate data pelaksanaan ujian keahlian baru!`,
      });
      handleFetchingUjianKeahlianData();
      setIsOpenFormUjianKeahlian(!isOpenFormUjianKeahlian);
      setIsPosting(false);
      setStatus("");
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: `Gagal mengupdate data pelaksanaan ujian keahlian baru!`,
      });
      handleFetchingUjianKeahlianData();
      setIsOpenFormUjianKeahlian(!isOpenFormUjianKeahlian);
      setIsPosting(true);
      setStatus("");
    }
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [selectedId, setSelectedId] = React.useState<number>(0);

  const router = useRouter();
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns: ColumnDef<Ujian>[] = [
    {
      accessorKey: "TempatUjian",
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
      accessorKey: "IdUjian",
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
            {row.original.Status == "Aktif" && (
              <Link
                href={`/lembaga/${
                  usePathname().includes("pukakp") ? "pukakp" : "dpkakp"
                }/admin/dashboard/ujian/peserta-ujian/${row.getValue(
                  "IdUjian"
                )}/${row.original.IdTypeUjian}`}
                className="border border-blue-500 rounded-md  bg-white shadow-sm  h-9 px-4 py-2"
              >
                <HiUserGroup className="h-4 w-4 text-blue-500" />
              </Link>
            )}

            {row.original.FilePermohonan != null &&
            row.original.Status == "Aktif" ? (
              <Link
                target="_blank"
                href={row.original.FilePermohonan!}
                className="border border-gray-500 rounded-md bg-white shadow-sm  h-9 px-4 py-2"
              >
                <FiFile className="h-4 w-4 text-gray-500" />
              </Link>
            ) : (
              <></>
            )}

            {usePathname().includes("dpkakp") &&
              row.original.Status != "Aktif" && (
                <Button
                  onClick={(e) => {
                    setSelectedId(row.original.IdUjian);
                    setSelectedSuratPermohonan(row.original.FilePermohonan);
                    setOpenFormValidasiPelaksanaanUjian(
                      !openFormValidasiPelaksanaanUjian
                    );
                  }}
                  variant="outline"
                  className="border border-green-400 rounded-md"
                >
                  <RiVerifiedBadgeFill className="h-4 w-4 text-green-400" />
                </Button>
              )}

            {usePathname().includes("dpkakp") &&
              row.original.Status == "Aktif" && (
                <Button
                  onClick={(e) => {
                    setSelectedId(row.original.IdUjian);
                    setStatus(row.original.Status);
                    setIsOpenFormUjianKeahlian(!isOpenFormUjianKeahlian);
                  }}
                  variant="outline"
                  className="border border-yellow-400 rounded-md"
                >
                  <TbEditCircle className="h-5 w-5 text-yellow-400" />
                </Button>
              )}
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
          Ujian
          <TbSchool className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="ml-0 text-left capitalize">
          <p className="text-xs text-gray-400 mt-2 leading-[100%] mb-1">
            {row.original.TypeUjian} • PUKAKP: {row.original.PUKAKP}
          </p>
          <p className="text-base font-semibold tracking-tight leading-none">
            {row.getValue("NamaUjian")}
          </p>
          <div className="ml-0 text-left mt-1">
            <p className="text-xs font-medium ">
              <span className="flex items-center gap-1 leading-[105%]">
                <TbTargetArrow className="text-lg" />
                <span>{row.original.TempatUjian}</span>
              </span>
              <span className="flex items-center gap-1 leading-[105%]">
                <TbCalendarCheck className="text-lg" />
                <span>
                  {generateTanggalPelatihan(row.original.TanggalMulaiUjian)} s.d{" "}
                  {generateTanggalPelatihan(row.original.TanggalBerakhirUjian)}
                </span>
              </span>
              <span className="flex items-center gap-1 leading-[105%]">
                <HiUserGroup className="text-base" />
                <span>
                  Jumlah peserta ujian: {row.original.UsersUjian.length}
                </span>
              </span>
            </p>
          </div>
        </div>
      ),
    },
  ];

  const [filePermohonan, setFilePermohonan] = React.useState<File | null>(null);
  const handleFileChange = (e: any) => {
    setFilePermohonan(e.target.files[0]);
  };

  const handleSelectChange = (value: string) => {
    setSelectedKeahlian(value);
    console.log(value);
    console.log(data);
    setData(value ? data.filter((ujian) => ujian.TypeUjian === value) : data);
    console.log(data);
  };

  const [dataPenguji, setDataPenguji] = React.useState<DewanPenguji[] | null>(
    []
  );

  const handleGetDataPenguji = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminpusat/getDataPenguji`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`, // Add Bearer token in Authorization header
          },
        }
      );

      console.log("RESPONSE Data Penguji ", response);
      setDataPenguji(response.data.data);
      setIsFetching(false);
    } catch (error) {
      console.error("ERROR BLANKO KELUAR : ", error);
      setIsFetching(false);
      throw error;
    }
  };

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
    fetchInformationDPKAKP();
    handleFetchingUjianKeahlianData();
    handleGetDataPenguji();
    handleFetchingTypeUjianKeahlianData();
  }, []);

  const [
    openFormValidasiPelaksanaanUjian,
    setOpenFormValidasiPelaksanaanUjian,
  ] = React.useState<boolean>(false);
  const [isValidating, setIsValidating] = React.useState<boolean>(false);
  const [selectedSuratPermohonan, setSelectedSuratPermohonan] =
    React.useState<string>("");

  const handleValidasiPelaksaanUjian = async (e: any) => {
    setIsValidating(true);

    try {
      const response = await axios.put(
        `${dpkakpBaseUrl}/adminPusat/updateUjian?id=${selectedId}`,
        {
          status: status,
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
        title: `Berhasil memvalidasi pelaksanaan ujian keahlian!`,
      });
      handleFetchingUjianKeahlianData();
      setStatus("Tidak Aktif");
      setSelectedId(0);
      setSelectedSuratPermohonan("");
      setOpenFormValidasiPelaksanaanUjian(false);
      setIsValidating(false);
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: `Gagal memvalidasi  pelaksanaan ujian keahlian!`,
      });
      handleFetchingUjianKeahlianData();
      setOpenFormValidasiPelaksanaanUjian(false);
      setIsValidating(false);
    }
  };

  return (
    <section className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default  sm:px-7.5 xl:col-span-8">
      <AlertDialog
        open={openFormValidasiPelaksanaanUjian}
        onOpenChange={setOpenFormValidasiPelaksanaanUjian}
      >
        <AlertDialogContent className="max-w-md">
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Validasi Pelaksaan Ujian</AlertDialogTitle>
              <AlertDialogDescription className="-mt-2">
                Proses validasi diperlukan untuk melihat permohonan pelaksanaan
                serta membuat akses PUKAKP melakukan import data peserta pada
                aplikasi untuk persiapan ujian.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <fieldset>
              <div className="flex gap-2  mb-1 w-full">
                <div className="w-full">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="noSertifikat"
                  >
                    Status Pelaksanaan <span className="text-red-600">*</span>
                  </label>
                  <div className="flex w-full gap-2">
                    <select
                      name=""
                      id=""
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full overflow-hidden rounded-lg border border-gray-300"
                    >
                      <option value={""}>Pilih Status</option>
                      <option
                        onClick={(e) => setStatus("Aktif")}
                        value={"Aktif"}
                      >
                        Valid
                      </option>
                      <option
                        onClick={(e) => setStatus("Tidak Aktif")}
                        value={"Tidak Aktif"}
                      >
                        Tidak Valid
                      </option>
                    </select>
                    <Link
                      target="_blank"
                      href={selectedSuratPermohonan}
                      className="border border-gray-300 rounded-md bg-white shadow-sm w-14 flex items-center justify-center h-12"
                    >
                      <FiFile className="h-4 w-4 text-gray-800 text-xl" />
                    </Link>
                  </div>
                </div>
              </div>
            </fieldset>

            <p className="text-gray-700 text-xs mt-1">
              *Periksa terlebih dahulu surat permohonan pada tombol surat
              sebelum melakukan validasi
            </p>
          </>
          <AlertDialogFooter>
            {!isValidating && (
              <AlertDialogCancel
                onClick={(e) =>
                  setOpenFormValidasiPelaksanaanUjian(
                    !openFormValidasiPelaksanaanUjian
                  )
                }
              >
                Cancel
              </AlertDialogCancel>
            )}
            <AlertDialogAction onClick={(e) => handleValidasiPelaksaanUjian(e)}>
              {isValidating ? (
                <span>Validating...</span>
              ) : (
                <span>Validasi</span>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isOpenFormUjianKeahlian}>
        <AlertDialogContent className="max-w-xl">
          <AlertDialogHeader className="gap-0 flex flex-col">
            <AlertDialogTitle className="flex items-center gap-2 text-2xl">
              {" "}
              <FaBookOpen className="h-4 w-4" />
              {status == "Aktif"
                ? " Tetakan Penguji dan Fasilitator"
                : " Tambah Pelaksanaan Ujian Keahlian"}
            </AlertDialogTitle>
            <AlertDialogDescription className="-mt-6">
              {status == "Aktif"
                ? "Tugaskan penguji dan fasilitator pusat dalam pelaksanaan ujian keahlian awak kapal perikanan untuk ANKAPIN dan ATKAPIN tingkat I, II, atau tingkat III."
                : "Tambah data baru pelaksanaan ujian keahlian awak kapal perikanan untuk ANKAPIN dan ATKAPIN tingkat I, II, atau tingkat III."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <fieldset>
            {usePathname().includes("pukakp") ? (
              <form autoComplete="off">
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="flex px-3 gap-2 mb-2 w-full">
                    <div className="w-full">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Tipe Ujian <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="name"
                        className="form-input w-full text-black text-sm border-gray-300 rounded-md"
                        placeholder="Tipe Blanko"
                        required
                        value={typeUjian}
                        onChange={(e) => setTypeUjian(e.target.value)}
                      >
                        <option value="0">Pilih Tipe Ujian</option>
                        {dataTypeUjian.map((typeUjian, index) => (
                          <option
                            value={
                              typeUjian.NamaTypeUjian +
                              "," +
                              typeUjian.IdTypeUjian
                            }
                            className="capitalize"
                          >
                            {typeUjian.NamaTypeUjian}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Nama Ujian <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="form-input w-full text-black border-gray-300 rounded-md"
                        placeholder="Nama Ujian"
                        required
                        value={namaUjian}
                        onChange={(e) => setNamaUjian(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="flex px-3 gap-2 mb-2 w-full">
                    <div className="w-full">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Tempat Ujian <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="form-input w-full text-black border-gray-300 rounded-md"
                        placeholder="Tempat Ujian"
                        required
                        value={tempatUjian}
                        onChange={(e) => setTempatUjian(e.target.value)}
                      />
                    </div>

                    <div className="w-full">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        PUKAKP <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="form-input w-full text-black border-gray-300 rounded-md"
                        placeholder="Tempat Ujian"
                        required
                        value={Cookies.get("PUKAKP")}
                        onChange={(e) => setPukakp(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="flex px-3 gap-2 mb-2 w-full">
                    <div className="w-full">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Tanggal Mulai <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        type="date"
                        className="form-input w-full text-black border-gray-300 rounded-md"
                        placeholder="Tanggall Mulai"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={tanggalMulai}
                        onChange={(e) => setTanggalMulai(e.target.value)}
                      />
                    </div>

                    <div className="w-full">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Tanggal Berakhir <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="tanggalBerakhir"
                        type="date"
                        className="form-input w-full text-black border-gray-300 rounded-md"
                        placeholder="Tanggal Berakhir"
                        required
                        value={tanggalBerakhir}
                        min={tanggalMulai}
                        onChange={(e) => setTanggalBerakhir(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="flex px-3 gap-2 mb-2 w-full">
                    <div className="w-full">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Waktu Ujian per Materi{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        type="number"
                        className="form-input w-full text-black border-gray-300 rounded-md"
                        placeholder="Waktu Ujian"
                        required
                        value={waktuUjian}
                        onChange={(e) => setWaktuUjian(e.target.value)}
                      />
                    </div>

                    <div className="w-full">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Jumlah Peserta <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="form-input w-full text-black border-gray-300 rounded-md"
                        placeholder="Jumlah Peserta"
                        required
                        value={jumlahPeserta}
                        onChange={(e) => setJumlahPeserta(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full mx-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Surat Permohonan <span className="text-red-600">*</span>
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
                    onClick={(e) => handlePostNewUjianKeahlian(e)}
                  >
                    Upload
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            ) : (
              <form autoComplete="off">
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="flex px-3 gap-2 mb-2 w-full">
                    <div className="w-full">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Nama Penguji <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="name"
                        className="form-select w-full text-black border-gray-300 rounded-md"
                        required
                        value={namaPengawas}
                        onChange={(e) => setNamaPengawas(e.target.value)}
                      >
                        <option value="">Pilih Penguji</option>
                        {dataPenguji!.map((penguji: any, index: number) => (
                          <option
                            key={penguji.IdUsersDpkakp}
                            value={penguji.NamaUsersDpkakp}
                            className="capitalize"
                          >
                            {penguji.NamaUsersDpkakp}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Nama Fasilitator <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="form-input w-full text-black border-gray-300 rounded-md"
                        placeholder="Nama Fasilitator"
                        required
                        value={namaVasilitator}
                        onChange={(e) => setNamaVasilitator(e.target.value)}
                      />
                    </div>
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
                      handleUpdateNewUjianKeahlian(e);
                    }}
                  >
                    Upload
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            )}
          </fieldset>
        </AlertDialogContent>
      </AlertDialog>

      <>
        {/* List Data Pelatihan */}
        <div>
          <div id="chartOne" className="-ml-5"></div>
          <div className="flex w-full items-center mb-2">
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-[200px] border-none shadow-none bg-none p-0 active:ring-0 focus:ring-0">
                <div className="inline-flex gap-2 px-3 mr-2 text-sm items-center rounded-md bg-whiter p-1.5 cursor-pointer">
                  <IoMdSchool />
                  {selectedKeahlian == null
                    ? "Jenis Keahlian"
                    : selectedKeahlian}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Jenis Keahlian</SelectLabel>
                  {dataTypeUjian.map((data, index) => (
                    <SelectItem key={index} value={data.NamaTypeUjian}>
                      {data.NamaTypeUjian}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {usePathname().includes("pukakp") && (
              <div className="w-full flex justify-end gap-2">
                <div
                  onClick={(e) =>
                    setIsOpenFormUjianKeahlian(!isOpenFormUjianKeahlian)
                  }
                  className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
                >
                  <FiUploadCloud />
                  Tambah Ujian Baru
                </div>
              </div>
            )}
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

export default TableDataUjian;
