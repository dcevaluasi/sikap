import React, { ReactElement, useState } from "react";
import TableData from "../Tables/TableData";
import {
  RiRadioButtonLine,
  RiShipLine,
  RiVerifiedBadgeFill,
} from "react-icons/ri";

import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpDown,
  Edit3Icon,
  Fullscreen,
  LucideClipboardEdit,
  LucideNewspaper,
  LucidePrinter,
  Search,
  Trash,
  X,
} from "lucide-react";
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
  IoMdClock,
  IoMdGlobe,
  IoMdSchool,
} from "react-icons/io";
import { FiEdit2, FiFile, FiUploadCloud } from "react-icons/fi";
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
import {
  FaBookOpen,
  FaRupiahSign,
  FaUserPen,
  FaUserTag,
} from "react-icons/fa6";
import { Input } from "@/components/ui/input";

import { convertDate } from "@/utils";
import Cookies from "js-cookie";
import { LemdiklatDetailInfo } from "@/types/lemdiklat";
import { Progress } from "@/components/ui/progress";
import { GiBookmarklet } from "react-icons/gi";
import Link from "next/link";
import { dpkakpBaseUrl } from "@/constants/urls";
import { wilayahPukakp } from "@/constants/dpkakp";

import { UserInformationDPKAKP } from "@/types/dpkakp";
import { generateTanggalPelatihan } from "@/utils/text";
import { FaEdit } from "react-icons/fa";
import { DewanPenguji } from "@/types/dewanPenguji";
import { TypeUjian, Ujian } from "@/types/ujian-keahlian-akp";
import { BiPaperPlane } from "react-icons/bi";
import { IoReload } from "react-icons/io5";
import { formatIndonesianDate } from "@/lib/utils";
import EmptyData from "@/components/micro-components/EmptyData";
import { HashLoader } from "react-spinners";

const TableDataUjian: React.FC = () => {
  // ================== STATE VARIABLES ==================
  const [data, setData] = React.useState<Ujian[]>([]);
  const [countVerified, setCountVerified] = React.useState<number>(0);
  const [countNotVerified, setCountNotVerified] = React.useState<number>(0);
  const [countDraft, setCountDraft] = React.useState<number>(0);
  const [countPilihPenguji, setCountPilihPenguji] = React.useState<number>(0);
  const [dataTypeUjian, setDataTypeUjian] = React.useState<TypeUjian[]>([]);
  const [dpkakpData, setDpkakpData] =
    React.useState<UserInformationDPKAKP | null>(null);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [isPosting, setIsPosting] = React.useState<boolean>(false);
  const [isOpenFormUjianKeahlian, setIsOpenFormUjianKeahlian] =
    React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState<number>(0);
  const [filePermohonan, setFilePermohonan] = React.useState<File | null>(null);
  const [dataPenguji, setDataPenguji] = React.useState<DewanPenguji[] | null>(
    []
  );
  const [waktuRemedial, setWaktuRemedial] = React.useState<string>("");
  const [openFormRemedial, setOpenFormRemedial] =
    React.useState<boolean>(false);
  const [isProcessingRemedial, setIsProcessingRemedial] =
    React.useState<boolean>(false);
  const [
    openFormValidasiPelaksanaanUjian,
    setOpenFormValidasiPelaksanaanUjian,
  ] = React.useState<boolean>(false);
  const [isValidating, setIsValidating] = React.useState<boolean>(false);
  const [selectedSuratPermohonan, setSelectedSuratPermohonan] =
    React.useState<string>("");
  const [selectedStatusFilter, setSelectedStatusFilter] =
    React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedIdUjian, setSelectedIdUjian] = React.useState<number>(0);
  const [selectedUjian, setSelectedUjian] = React.useState<Ujian | null>(null);

  // ================== PATH & COOKIE VARIABLES ==================
  const pathPukakp = usePathname().includes("pukakp");
  const isPenguji = Cookies.get("IsPUKAKP") == "penguji";
  const idUsersDpkakp = Cookies.get("IdUsersDpkakp");

  // ================== DATA FETCHING ==================
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
    } catch (error) {
      console.error("DPKAKP INFO: ", error);
    }
  };

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

      const pukakpCookie = Cookies.get("PUKAKP");
      const filteredData =
        pukakpCookie != "DPKAKP - Dewan Penguji Keahlian Awak Kapal Perikanan"
          ? response.data.data.filter(
            (item: any) => item.PUKAKP === pukakpCookie
          )
          : response.data.data;

      const sortedData = filteredData.sort((a: any, b: any) => {
        if (a.Status === "Pending" && b.Status !== "Pending") return -1;
        if (a.Status !== "Pending" && b.Status === "Pending") return 1;
        return new Date(b.CreateAt).getTime() - new Date(a.CreateAt).getTime();
      });

      const verifiedCount = filteredData.filter(
        (item: any) => item.Status === "Aktif"
      ).length;
      const notVerifiedCount = filteredData.filter(
        (item: any) => item.Status === "Pending"
      ).length;
      const draft = filteredData.filter(
        (item: any) => item.Status === "Draft"
      ).length;
      const pilihPenguji = filteredData.filter(
        (item: any) => item.NamaPengawasUjian == ""
      ).length;

      setCountVerified(verifiedCount);
      setCountNotVerified(notVerifiedCount);
      setCountDraft(draft);
      setCountPilihPenguji(pilihPenguji);

      if (pathPukakp) {
        setData(sortedData);
      } else {
        const sortedOriginalData = response.data.data.sort((a: any, b: any) => {
          if (a.Status === "Pending" && b.Status !== "Pending") return -1;
          if (a.Status !== "Pending" && b.Status === "Pending") return 1;
          return (
            new Date(b.CreateAt).getTime() - new Date(a.CreateAt).getTime()
          );
        });
        setData(sortedOriginalData);
      }

      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      throw error;
    }
  };

  const handleFetchingUjianKeahlianDataPenguji = async () => {
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

      const pukakpCookie = Cookies.get("PUKAKP");
      const filteredData = response.data.data.filter((item: any) =>
        item.NamaPengawasUjian.includes(Cookies.get("NamaUsersDpkakp"))
      );

      const sortedData = filteredData.sort((a: any, b: any) => {
        if (a.Status === "Pending" && b.Status !== "Pending") return -1;
        if (a.Status !== "Pending" && b.Status === "Pending") return 1;
        return new Date(b.CreateAt).getTime() - new Date(a.CreateAt).getTime();
      });

      const verifiedCount = filteredData.filter(
        (item: any) => item.Status === "Aktif"
      ).length;
      const notVerifiedCount = filteredData.filter(
        (item: any) => item.Status === "Pending"
      ).length;
      const draft = filteredData.filter(
        (item: any) => item.Status === "Draft"
      ).length;
      const pilihPenguji = filteredData.filter(
        (item: any) => item.NamaPengawasUjian == ""
      ).length;

      setCountVerified(verifiedCount);
      setCountNotVerified(notVerifiedCount);
      setCountDraft(draft);
      setCountPilihPenguji(pilihPenguji);

      if (pathPukakp) {
        setData(sortedData);
      } else {
        const sortedOriginalData = filteredData.sort((a: any, b: any) => {
          if (a.Status === "Pending" && b.Status !== "Pending") return -1;
          if (a.Status !== "Pending" && b.Status === "Pending") return 1;
          return (
            new Date(b.CreateAt).getTime() - new Date(a.CreateAt).getTime()
          );
        });
        setData(sortedOriginalData);
      }

      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.error("Error fetching data:", error);
    }
  };

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

  const handleGetDataPenguji = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminpusat/getDataPenguji`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      setDataPenguji(response.data.data);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      throw error;
    }
  };

  // ================== Penguji Setting (DPKAKP/Sekretariat DPKAKP)
  const [jumlahPenguji, setJumlahPenguji] = React.useState<number>(1);

  const [pengujiData, setPengujiData] = React.useState(
    Array.from({ length: 3 }, () => ({ nama: "", id: "" }))
  );

  const handlePengujiChange = (index: number, value: any) => {
    const [nama, id] = value.split("|");
    const newPengujiData = [...pengujiData];
    newPengujiData[index] = { nama, id };
    setPengujiData(newPengujiData);
  };

  const generateIdPengujiString = () => {
    return pengujiData
      .map((penguji) => penguji.id)
      .filter((id) => id)
      .join(",");
  };

  const generateNamaPengujiString = () => {
    return pengujiData
      .map((penguji) => penguji.nama)
      .filter((nama) => nama)
      .join("|");
  };

  // =============================================================

  const [idTypeUjian, setIdTypeUjian] = React.useState<string>("");
  const [typeUjian, setTypeUjian] = React.useState<string>("");
  const [namaUjian, setNamaUjian] = React.useState<string>("");
  const [tempatUjian, setTempatUjian] = React.useState<string>("");
  const [pukakp, setPukakp] = React.useState<string>("");
  const [namaPengawas, setNamaPengawas] = React.useState<string>("");
  const [idPengawas, setIdPengawas] = React.useState<string>("");
  const [namaVasilitator, setNamaVasilitator] = React.useState<string>("");
  const [tanggalMulai, setTanggalMulai] = React.useState<string>("");
  const [tanggalBerakhir, setTanggalBerakhir] = React.useState<string>("");
  const [waktuUjian, setWaktuUjian] = React.useState<string>("");
  const [jumlahPeserta, setJumlahPeserta] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");

  const [selectedTypeUjian, setSelectedTypeUjian] = React.useState<string>("");

  const [waktuF1, setWaktuF1] = React.useState<string>("");
  const [waktuF2, setWaktuF2] = React.useState<string>("");
  const [waktuF3, setWaktuF3] = React.useState<string>("");

  const [waktuF1B1, setWaktuF1B1] = React.useState<string>("");
  const [waktuF1B2, setWaktuF1B2] = React.useState<string>("");
  const [waktuF1B3, setWaktuF1B3] = React.useState<string>("");
  const [waktuF2B1, setWaktuF2B1] = React.useState<string>("");
  const [waktuF3B1, setWaktuF3B1] = React.useState<string>("");
  const [waktuF3B2, setWaktuF3B2] = React.useState<string>("");

  /*======= HANDLING CLEAR STATE VARIABLES UJIAN ======== */
  const handleClearNewUjianKeahlian = async () => {
    setWaktuF1("");
    setWaktuF2("");
    setWaktuF3("");
    setWaktuF1B1("");
    setWaktuF1B2("");
    setWaktuF1B3("");
    setWaktuF2B1("");
    setWaktuF3B1("");
    setWaktuF3B2("");
    setIdTypeUjian("");
    setSelectedTypeUjian("");
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
    setIdPengawas("");
    setStatus("");
    setFilePermohonan(null);
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
    formData.append("JumlahPesertaUjian", (parseInt(jumlahPeserta) + 1).toString());
    formData.append("Status", "Draft");
    if (filePermohonan != null) {
      formData.append("filePermohonan", filePermohonan!);
    }

    if (selectedTypeUjian == "Klasikal") {
      formData.append("WaktuF1B1", waktuF1B1);
      formData.append("WaktuF1B2", waktuF1B2);
      formData.append("WaktuF1B3", waktuF1B3);
      formData.append("WaktuF2B1", waktuF2B1);
      formData.append("WaktuF3B1", waktuF3B1);
      formData.append("WaktuF3B2", waktuF3B2);
    } else {
      formData.append("waktuF1", waktuF1);
      formData.append("waktuF2", waktuF2);
      formData.append("waktuF3", waktuF3);
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
      setIsPosting(false);
      handleClearNewUjianKeahlian();
      setStatus("");
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: `Gagal menambahkan data pelaksanaan ujian keahlian baru!`,
      });
      handleFetchingUjianKeahlianData();
      handleClearNewUjianKeahlian();
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
          nama_pengawas_ujian: generateNamaPengujiString(),
          id_users_dpkakp: generateIdPengujiString(),
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
      setIsOpenFormUjianKeahlian(false);
      setIsPosting(false);
      setStatus("");
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: `Gagal mengupdate data pelaksanaan ujian keahlian baru!`,
      });
      handleFetchingUjianKeahlianData();
      setIsOpenFormUjianKeahlian(false);
      setIsPosting(true);
      setStatus("");
    }
  };

  const handleRemedial = async (e: any) => {
    setIsProcessingRemedial(true);
    try {
      const response = await axios.post(
        `${dpkakpBaseUrl}/adminPusat/getRemedial`,
        {
          id_ujian: selectedIdUjian.toString(),
          waktu_code_ujian: waktuRemedial,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      Toast.fire({
        icon: "success",
        title: "Yeayyy!",
        text: `Berhasil mengatur jadwal remedial!`,
      });
      handleFetchingUjianKeahlianData();
      setSelectedIdUjian(0);
      setOpenFormRemedial(false);
      setIsProcessingRemedial(false);
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: "Oopsss!",
        text: `Gagal mengatur jadwal remedial!`,
      });
      handleFetchingUjianKeahlianData();
      setSelectedIdUjian(0);
      setOpenFormRemedial(false);
      setIsProcessingRemedial(false);
    }
  };

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
        title: `Gagal memvalidasi pelaksanaan ujian keahlian!`,
      });
      handleFetchingUjianKeahlianData();
      setOpenFormValidasiPelaksanaanUjian(false);
      setIsValidating(false);
    }
  };

  const handleKirimPermohonan = async (id: number) => {
    setIsValidating(true);

    try {
      const response = await axios.put(
        `${dpkakpBaseUrl}/adminPusat/updateUjian?id=${id}`,
        {
          status: "Pending",
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
        title: `Berhasil mengirimkan permohonan pelaksanaan ujian keahlian!`,
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
        title: `Gagal mengirimkan permohonan pelaksanaan ujian keahlian!`,
      });
      handleFetchingUjianKeahlianData();
      setOpenFormValidasiPelaksanaanUjian(false);
      setIsValidating(false);
    }
  };

  const filteredData = data.filter((ujian) => {
    const matchesSearchQuery =
      ujian.TypeUjian.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ujian.NamaUjian.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesStatus;
    if (selectedStatusFilter == "Pilih Penguji") {
      matchesStatus = ujian.NamaPengawasUjian === "";
    } else {
      matchesStatus =
        selectedStatusFilter === "All" || ujian.Status === selectedStatusFilter;
    }

    const pathname = usePathname();
    const shouldExcludeTryOut =
      !pathname.includes("pukakp") &&
      ujian.NamaUjian.toLowerCase().includes("try out");

    return matchesSearchQuery && matchesStatus && !shouldExcludeTryOut;
  });


  // CANCEL ADD NEW UJIAN
  const handleCancelAddNewUjian = () => {
    setTypeUjian("");
    setNamaUjian("");
    setTempatUjian("");
    setTanggalMulai("");
    setTanggalBerakhir("");
    setWaktuUjian("");
    setJumlahPeserta("");
    setFilePermohonan(null);
    setSelectedIdUjian(0);
  };

  const handleFetchingDataUjianById = async (idUjian: number) => {
    setSelectedIdUjian(idUjian);
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/GetUjian?id=${idUjian}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );

      console.log({ response });
      setSelectedUjian(response.data.data[0]);
      setTypeUjian(response.data.data[0].TypeUjian);
      setNamaUjian(response.data.data[0].NamaUjian);
      setTempatUjian(response.data.data[0].TempatUjian);
      setTanggalMulai(response.data.data[0].TanggalMulaiUjian);
      setTanggalBerakhir(response.data.data[0].TanggalBerakhirUjian);
      setWaktuUjian(response.data.data[0].WaktuUjian);
      setJumlahPeserta(response.data.data[0].JumlahPesertaUjian);
      setIsOpenFormUjianKeahlian(true);
    } catch (error) {
      console.error("ERROR FETCHING UJIAN : ", error);
      setIsFetching(false);
      setIsOpenFormUjianKeahlian(false);
      handleCancelAddNewUjian();
      throw error;
    }
  };

  const handleEditUjianKeahlian = async (e: any) => {
    try {
      const response = await axios.put(
        `${dpkakpBaseUrl}/adminPusat/updateUjian?id=${selectedIdUjian}`,
        {
          nama_ujian: namaUjian,
          tempat_ujian: tempatUjian,
          pukakp: pukakp,
          tanggal_mulai_ujian: tanggalMulai,
          tanggal_berakhir_ujian: tanggalBerakhir,
          status: "Draft",
          type_ujian: typeUjian,
          id_type_ujian: idTypeUjian,
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
      setIsPosting(false);
      handleCancelAddNewUjian();
      handleClearNewUjianKeahlian();
      setIsOpenFormUjianKeahlian(false);
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: `Gagal mengupdate data pelaksanaan ujian keahlian baru!`,
      });
      handleFetchingUjianKeahlianData();
      setIsPosting(true);
      setIsOpenFormUjianKeahlian(false);
      setStatus("");
    }
  };

  // ================== EFFECTS ==================
  React.useEffect(() => {
    fetchInformationDPKAKP();
    if (isPenguji) {
      handleFetchingUjianKeahlianDataPenguji();
    } else {
      handleFetchingUjianKeahlianData();
      handleGetDataPenguji();
      handleFetchingTypeUjianKeahlianData();
    }
  }, [isPenguji]);

  // DELETE UJIAN
  const handleDeleteUjian = async () => {
    try {
      const response = await axios.delete(
        `${dpkakpBaseUrl}/adminPusat/deleteUjians?id=${selectedIdUjian}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      console.log(response);
      Toast.fire({
        icon: "success",
        title:
          "Berhasil menghapus draft pengajuan permohonan pelaksanaan ujian!",
      });
      handleFetchingUjianKeahlianData();
    } catch (error) {
      Toast.fire({
        icon: "error",
        title:
          "Ups, gagal menghapus draft pengajuan permohonan pelaksanaan ujian!",
      });
      handleFetchingUjianKeahlianData();
    }
  };

  React.useEffect(() => {
    // Function to get formatted date-time with timezone offset and name
    const getFormattedDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      // Get the formatted date: `yyyy-MM-dd`
      const formattedDate = now
        .toLocaleString("en-GB", options)
        .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1") // Change from `dd/MM/yyyy` to `yyyy-MM-dd`
        .replace(/,/g, ""); // Remove any commas if present

      const timezoneOffset = now.getTimezoneOffset(); // Get timezone offset in minutes
      let timezone = "";

      if (timezoneOffset === -420) {
        timezone = "+0700 WIB"; // UTC+07:00 (WIB)
      } else if (timezoneOffset === -480) {
        timezone = "+0800 WITA"; // UTC+08:00 (WITA)
      } else if (timezoneOffset === -540) {
        timezone = "+0900 WIT"; // UTC+09:00 (WIT)
      }

      return `${formattedDate} ${timezone}`;
    };

    // Set the formatted date-time for all the input fields when the component mounts
    const formattedDateTime = getFormattedDateTime();
    setWaktuF1(formattedDateTime);
    setWaktuF2(formattedDateTime);
    setWaktuF3(formattedDateTime);
    setWaktuF1B1(formattedDateTime);
    setWaktuF1B2(formattedDateTime);
    setWaktuF1B3(formattedDateTime);
    setWaktuF2B1(formattedDateTime);
    setWaktuF3B1(formattedDateTime);
    setWaktuF3B2(formattedDateTime);
    setWaktuRemedial(formattedDateTime);
  }, []);

  const handleFileChange = (e: any) => {
    setFilePermohonan(e.target.files[0]);
  };

  return (
    <section className="rounded-sm   pb-5 shadow-default  h-full scrollbar-hide">
      <section
        aria-label="main content"
        className="flex h-full flex-col flex-auto w-full border-l scrollbar-hide -mt-4"
      >
        <nav className="bg-gray-100 flex p-4">
          <section
            aria-labelledby="ticket-statistics-tabs-label"
            className="pb-2 -mt-5"
          >
            {isPenguji ? (
              <ul className="flex">
                <li>
                  <button
                    onClick={() => setSelectedStatusFilter("All")}
                    className={`focus:outline-none p-2 rounded-l-md border border-r-0 flex flex-col items-center w-24 ${selectedStatusFilter === "All"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                      }`}
                  >
                    <p className="font-semibold text-lg">{data!.length}</p>
                    <p
                      className={`uppercase text-sm ${selectedStatusFilter === "All"
                        ? "text-white font-bold"
                        : "text-gray-600"
                        }`}
                    >
                      All
                    </p>
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="flex">
                <li>
                  <button
                    onClick={() => setSelectedStatusFilter("All")}
                    className={`focus:outline-none p-2 rounded-l-md border border-r-0 flex flex-col items-center w-24 ${selectedStatusFilter === "All"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                      }`}
                  >
                    <p className="font-semibold text-lg">{data!.length}</p>
                    <p
                      className={`uppercase text-sm ${selectedStatusFilter === "All"
                        ? "text-white font-bold"
                        : "text-gray-600"
                        }`}
                    >
                      All
                    </p>
                  </button>
                </li>
                {usePathname().includes("pukakp") && (
                  <li>
                    <button
                      onClick={() => setSelectedStatusFilter("Draft")}
                      className={`focus:outline-none p-2 border border-r-0 flex flex-col items-center w-24 ${selectedStatusFilter === "Draft"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                        }`}
                    >
                      <p className="font-semibold text-lg">{countDraft}</p>
                      <p
                        className={`uppercase text-sm ${selectedStatusFilter === "Draft"
                          ? "text-white font-bold"
                          : "text-gray-600"
                          }`}
                      >
                        Draft
                      </p>
                    </button>
                  </li>
                )}

                <li>
                  <button
                    onClick={() => setSelectedStatusFilter("Pending")}
                    className={`focus:outline-none p-2 border border-r-0 flex flex-col items-center w-24 ${selectedStatusFilter === "Pending"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                      }`}
                  >
                    <p className="font-semibold text-lg">{countNotVerified}</p>
                    <p
                      className={`uppercase text-sm ${selectedStatusFilter === "Pending"
                        ? "text-white font-bold"
                        : "text-gray-600"
                        }`}
                    >
                      Pending
                    </p>
                  </button>
                </li>
                {usePathname().includes("dpkakp") && (
                  <li>
                    <button
                      onClick={() => setSelectedStatusFilter("Pilih Penguji")}
                      className={`focus:outline-none p-2 border border-r-0 flex flex-col items-center w-32 ${selectedStatusFilter === "Pilih Penguji"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                        }`}
                    >
                      <p className="font-semibold text-lg">
                        {countPilihPenguji}
                      </p>
                      <p
                        className={`uppercase text-sm ${selectedStatusFilter === "Pilih Penguji"
                          ? "text-white font-bold"
                          : "text-gray-600"
                          }`}
                      >
                        Pilih Penguji
                      </p>
                    </button>
                  </li>
                )}

                <li>
                  <button
                    onClick={() => setSelectedStatusFilter("Aktif")}
                    className={`focus:outline-none p-2 rounded-r-md border flex flex-col items-center w-24 ${selectedStatusFilter === "Aktif"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                      }`}
                  >
                    <p className="font-semibold text-lg">{countVerified}</p>
                    <p
                      className={`uppercase text-sm ${selectedStatusFilter === "Aktif"
                        ? "text-white font-bold"
                        : "text-gray-600"
                        }`}
                    >
                      Disetujui
                    </p>
                  </button>
                </li>
              </ul>
            )}
          </section>
        </nav>

        <div className="px-4 -mt-4">
          <Tabs defaultValue="account" className="w-full">
            {usePathname().includes("pukakp") && (
              <TabsList className={`grid w-full grid-cols-2`}>
                <TabsTrigger value="account">
                  Daftar Pelaksanan Ujian
                </TabsTrigger>
                <TabsTrigger value="password">
                  Buat Pelaksanaan Ujian Baru
                </TabsTrigger>
              </TabsList>
            )}

            <TabsContent value="account">
              <div className="flex flex-col gap-1">
                <div className="mb-1">
                  <Input
                    type="text"
                    placeholder="Cari berdasarkan Program Ujian atau Nama Ujian"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-sm"
                  />
                </div>
                {filteredData.length == 0 ? (
                  <EmptyData />
                ) : isFetching ? <div className="mt-32 w-full flex items-center justify-center">
                  <HashLoader color="#338CF5" size={50} />
                </div> : (
                  filteredData.map((ujian, index) => (
                    <Card className="relative" key={index}>
                      {ujian!.Status == "Pending" && (
                        <div className="w-fit absolute top-5 right-5 text-[0.65rem] px-2 py-1 rounded-md bg-yellow-400 text-white flex gap-1 items-center animate-pulse">
                          {usePathname().includes("dpkakp") ? 'Segera Verifikasi' : 'Menunggu Verifikasi'}
                        </div>
                      )}

                      <CardHeader>
                        {/* <EventBadge ujian={ujian!} /> */}
                        <CardTitle>{ujian!.NamaUjian}</CardTitle>
                        <CardDescription>
                          {" "}
                          {ujian!.TypeUjian} • {ujian!.PUKAKP}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2 relative">
                        <div className="ml-0 text-left capitalize -mt-6">
                          <div className="ml-0 text-left mt-1 text-neutral-500 ">
                            <p className="text-sm ">
                              <span className="flex items-center gap-1 leading-[105%]">
                                <TbTargetArrow className="text-lg" />
                                <span>
                                  Tempat Pelaksanaan : {ujian!.TempatUjian}
                                </span>
                              </span>
                              <span className="flex items-center gap-1 leading-[105%]">
                                <TbCalendarCheck className="text-lg" />
                                <span>
                                  Waktu Pelaksanaan :{" "}
                                  {generateTanggalPelatihan(
                                    ujian!.TanggalMulaiUjian
                                  )}{" "}
                                  s.d{" "}
                                  {generateTanggalPelatihan(
                                    ujian!.TanggalBerakhirUjian
                                  )}
                                </span>
                              </span>
                              {ujian!.NamaPengawasUjian != "" && (
                                <span className="flex items-center gap-1 ml-[0.125rem] leading-[105%]">
                                  <FaUserPen className="text-base" />
                                  <span>
                                    Penguji : {ujian!.NamaPengawasUjian}
                                  </span>
                                </span>
                              )}
                              {ujian!.NamaVasilitatorUjian != "" && (
                                <span className="flex items-center gap-1 ml-[0.125rem] leading-[105%]">
                                  <FaUserTag className="text-base" />
                                  <span>
                                    Fasilitator : {ujian!.NamaVasilitatorUjian}
                                  </span>
                                </span>
                              )}
                              {ujian!.UsersUjian != null && (
                                <span className="flex items-center gap-1 leading-[105%]">
                                  <HiUserGroup className="text-base" />
                                  <span>
                                    Jumlah peserta ujian :{" "}
                                    {ujian!.UsersUjian.length}/
                                    {ujian!.JumlahPesertaUjian == 0
                                      ? 0
                                      : ujian!.JumlahPesertaUjian - 1}
                                  </span>
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex items-center justify-center gap-1 flex-wrap  -mt-2">
                          {/* <Button
                            variant="outline"
                            className=" bg-gray-900 text-white hover:text-white hover:bg-gray-900"
                          >
                            <FaBookOpen className="h-4 w-4 mr-1" /> Info Ujian
                          </Button> */}
                          {ujian!.Status == "Aktif" && (
                            <Link
                              href={`/lembaga/${usePathname().includes("pukakp")
                                ? "pukakp"
                                : "dpkakp"
                                }/admin/dashboard/ujian/peserta-ujian/${ujian!.IdUjian
                                }/${ujian!.IdTypeUjian}`}
                              className="bg-blue-500 rounded-md   shadow-sm  h-9 px-4 py-2 text-white flex items-center text-sm"
                            >
                              <HiUserGroup className="h-4 w-4 text-white mr-1" />{" "}
                              Peserta Ujian
                            </Link>
                          )}

                          {ujian!.FilePermohonan != null &&
                            ujian!.Status == "Aktif" ? (
                            <Link
                              target="_blank"
                              href={ujian!.FilePermohonan!}
                              className="bg-gray-500 text-white rounded-md  shadow-sm  h-9 px-4 py-2 flex text-sm items-center"
                            >
                              <FiFile className="h-4 w-4 mr-1" /> File
                              Permohonan
                            </Link>
                          ) : (
                            <></>
                          )}

                          {ujian!.Status == "Draft" &&
                            !usePathname().includes("dpkakp") ? (
                            <Button
                              onClick={() => {
                                handleKirimPermohonan(ujian!.IdUjian);
                              }}
                              variant="outline"
                              className="bg-indigo-600 text-neutral-100 hover:text-neutral-100 hover:bg-indigo-600"
                            >
                              <BiPaperPlane className="h-4 w-4 text-neutral-100 mr-1" />{" "}
                              Kirim Permohonan
                            </Button>
                          ) : (
                            <></>
                          )}

                          {usePathname().includes("pukakp") &&
                            ujian!.Status == "Draft" ? (
                            <Button
                              onClick={() => {
                                handleFetchingDataUjianById(ujian!.IdUjian);
                              }}
                              variant="outline"
                              className="bg-yellow-300 text-neutral-800 hover:text-neutral-800 hover:bg-yellow-300"
                            >
                              <FiEdit2 className="h-4 w-4 text-neutral-800 mr-1" />{" "}
                              Edit Ujian
                            </Button>
                          ) : (
                            <></>
                          )}

                          {usePathname().includes("pukakp") &&
                            ujian!.Status == "Draft" ? (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  onClick={() =>
                                    setSelectedIdUjian(ujian!.IdUjian)
                                  }
                                  variant="outline"
                                  className="bg-rose-600 text-white hover:text-white hover:bg-rose-600"
                                >
                                  <Trash className="h-4 w-4 text-white mr-1" />{" "}
                                  Hapus Ujian
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Apakah kamu yakin menghapus ujian ini?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Penghapusan data ini akan dilakukan secara
                                    permanen, sehingga anda tidak dapat kembali
                                    melakukan undo terkait tindakan ini!
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteUjian()}
                                    className="bg-rose-600"
                                  >
                                    Hapus
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          ) : (
                            <></>
                          )}

                          {usePathname().includes("dpkakp") &&
                            ujian!.Status != "Aktif" && (
                              <Button
                                onClick={(e) => {
                                  setSelectedId(ujian!.IdUjian);
                                  setSelectedSuratPermohonan(
                                    ujian!.FilePermohonan
                                  );
                                  setOpenFormValidasiPelaksanaanUjian(
                                    !openFormValidasiPelaksanaanUjian
                                  );
                                }}
                                variant="outline"
                                className="bg-green-400 hover:bg-green-400 hover:text-white text-white rounded-md"
                              >
                                <RiVerifiedBadgeFill className="h-4 w-4 mr-1" />{" "}
                                Verifikasi
                              </Button>
                            )}

                          {ujian!.Status === "Aktif" && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="bg-indigo-600 text-white hover:text-white hover:bg-indigo-600 w-fit"
                                >
                                  <IoMdClock className="h-4 w-4 text-lg " />{" "}
                                  Waktu Ujian
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="max-w-2xl">
                                <AlertDialogHeader>
                                  <div className="flex flex-col w-full items-center justify-center">
                                    <AlertDialogTitle className="text-center leading-none">
                                      Daftar Waktu Pelaksanaan{" "}
                                      {ujian!.TypeUjian} di {ujian!.PUKAKP}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Berikut merupakan waktu pelaksanaan dari
                                      setiap fungsi dan bagian!
                                    </AlertDialogDescription>
                                  </div>
                                </AlertDialogHeader>
                                <ExamSchedule data={data} ujian={ujian} />
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="bg-gray-900 w-full text-white hover:bg-gray-800 hover:text-white">
                                    Tutup
                                  </AlertDialogCancel>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}

                          {usePathname().includes("dpkakp") &&
                            ujian!.Status == "Aktif" &&
                            ujian!.NamaPengawasUjian == "" && (
                              <Button
                                onClick={(e) => {
                                  setSelectedId(ujian!.IdUjian);
                                  setStatus(ujian!.Status);
                                  setIsOpenFormUjianKeahlian(
                                    !isOpenFormUjianKeahlian
                                  );
                                }}
                                variant="outline"
                                className="bg-teal-600 hover:bg-teal-600 text-neutral-200 rounded-md hover:text-neutral-200"
                              >
                                <TbEditCircle className="h-5 w-5 mr-1" />
                                Pilih Penguji
                              </Button>
                            )}

                          {usePathname().includes("pukakp") &&
                            ujian!.Status === "Aktif" && (
                              <Button
                                onClick={(e) => {
                                  setSelectedIdUjian(ujian!.IdUjian);

                                  setOpenFormRemedial(!openFormRemedial);
                                }}
                                variant="outline"
                                className="bg-gray-800 hover:bg-gray-800 hover:text-white text-white rounded-md"
                              >
                                <IoReload className="h-4 w-4 mr-1" /> Remedial
                              </Button>
                            )}
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Ajukan Permohonan Ujian AKP</CardTitle>
                  <CardDescription>
                    Dalam hal melaksanakan ujian keahlian di PUKAKP masing -
                    masing dari permohonan lemdiklat yang mengajukan, harap
                    mengajukan permohonan pelaksanaan kepada tim sekretariat
                    untuk diketahui!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 -mt-6">
                  <form autoComplete="off">
                    {/* PUKAKP */}
                    <div className="mt-2 w-full">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        PUKAKP <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="form-input w-full text-black border-gray-300 rounded-md py-2 text-sm"
                        placeholder="Tempat Ujian"
                        required
                        value={Cookies.get("PUKAKP")}
                        onChange={(e) => setPukakp(e.target.value)}
                      />
                    </div>
                    {/* Tipe Ujian */}

                    <div className="mt-2">
                      <Label htmlFor="type-ujian">Tipe Ujian*</Label>
                      <select
                        id="type-ujian"
                        className="form-input w-full text-black text-sm border-gray-300 rounded-md py-2"
                        required
                        value={typeUjian}
                        onChange={(e) => setTypeUjian(e.target.value)}
                      >
                        <option value="0">Pilih Tipe Ujian</option>
                        {dataTypeUjian.map((type) => (
                          <option
                            key={type.IdTypeUjian}
                            value={`${type.NamaTypeUjian},${type.IdTypeUjian}`}
                            className="capitalize"
                          >
                            {type.NamaTypeUjian}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Nama Ujian */}
                    <div className="mt-2">
                      <Label htmlFor="nama-ujian">Nama Ujian*</Label>
                      <Input
                        id="nama-ujian"
                        type="text"
                        required
                        value={namaUjian}
                        onChange={(e) => setNamaUjian(e.target.value)}
                      />
                    </div>

                    {/* Tempat Ujian */}
                    <div className="mt-2">
                      <Label htmlFor="tempat-ujian">Tempat Ujian*</Label>
                      <Input
                        id="tempat-ujian"
                        type="text"
                        required
                        value={tempatUjian}
                        onChange={(e) => setTempatUjian(e.target.value)}
                      />
                    </div>

                    {/* Tanggal Mulai and Tanggal Berakhir */}
                    <div className="grid grid-cols-2 gap-4 mt-1">
                      <div className="">
                        <Label htmlFor="tanggal-mulai">Tanggal Mulai*</Label>
                        <Input
                          id="tanggal-mulai"
                          type="date"
                          required
                          min={new Date().toISOString().split("T")[0]}
                          value={tanggalMulai}
                          onChange={(e) => setTanggalMulai(e.target.value)}
                        />
                      </div>
                      <div className="">
                        <Label htmlFor="tanggal-berakhir">
                          Tanggal Berakhir*
                        </Label>
                        <Input
                          id="tanggal-berakhir"
                          type="date"
                          placeholder="Tanggal Berakhir"
                          required
                          value={tanggalBerakhir}
                          min={tanggalMulai}
                          onChange={(e) => setTanggalBerakhir(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Waktu Ujian and Jumlah Peserta */}
                    <div className="grid grid-cols-1 gap-4">
                      <div className="mt-2">
                        <Label htmlFor="jumlah-peserta">Jumlah Peserta*</Label>
                        <Input
                          id="jumlah-peserta"
                          type="text"
                          placeholder="Jumlah Peserta"
                          required
                          value={jumlahPeserta}
                          onChange={(e) => setJumlahPeserta(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mt-2">
                      <Label htmlFor="surat-permohonan">
                        Jenis Pelaksanaan Ujian
                      </Label>
                      <Select
                        value={selectedTypeUjian}
                        onValueChange={(value: string) =>
                          setSelectedTypeUjian(value)
                        }
                      >
                        <SelectTrigger className="w-full text-base py-5">
                          <SelectValue placeholder="Pilih Tipe Pelaksanaan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Klasikal">Klasikal</SelectItem>
                          <SelectItem value="Rewarding">Rewarding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedTypeUjian == "Klasikal" ? (
                      <div className="grid grid-cols-3 gap-2">
                        <div className="mt-2">
                          <Label htmlFor="waktuF1B1">Waktu F1B1*</Label>
                          <Input
                            id="waktuF1B1"
                            type="text"
                            required
                            value={waktuF1B1}
                            onChange={(e) => setWaktuF1B1(e.target.value)}
                          />
                        </div>
                        <div className="mt-2">
                          <Label htmlFor="waktuF1B2">Waktu F1B2*</Label>
                          <Input
                            id="waktuF1B2"
                            type="text"
                            required
                            value={waktuF1B2}
                            onChange={(e) => setWaktuF1B2(e.target.value)}
                          />
                        </div>
                        <div className="mt-2">
                          <Label htmlFor="waktuF1B3">Waktu F1B3*</Label>
                          <Input
                            id="waktuF1B3"
                            type="text"
                            required
                            value={waktuF1B3}
                            onChange={(e) => setWaktuF1B3(e.target.value)}
                          />
                        </div>
                        <div className="mt-2">
                          <Label htmlFor="waktuF2B1">Waktu F2B1*</Label>
                          <Input
                            id="waktuF2B1"
                            type="text"
                            required
                            value={waktuF2B1}
                            onChange={(e) => setWaktuF2B1(e.target.value)}
                          />
                        </div>
                        <div className="mt-2">
                          <Label htmlFor="waktuF3B1">Waktu F3B1*</Label>
                          <Input
                            id="waktuF3B1"
                            type="text"
                            required
                            value={waktuF3B1}
                            onChange={(e) => setWaktuF3B1(e.target.value)}
                          />
                        </div>
                        <div className="mt-2">
                          <Label htmlFor="waktuF3B2">Waktu F3B2*</Label>
                          <Input
                            id="waktuF3B2"
                            type="text"
                            required
                            value={waktuF3B2}
                            onChange={(e) => setWaktuF3B2(e.target.value)}
                          />
                        </div>
                      </div>
                    ) : selectedTypeUjian == "Rewarding" ? (
                      <div className="grid grid-cols-3 gap-2">
                        <div className="mt-2">
                          <Label htmlFor="waktuF1">Waktu F1*</Label>
                          <Input
                            id="waktuF1"
                            type="text"
                            required
                            value={waktuF1}
                            onChange={(e) => setWaktuF1(e.target.value)}
                          />
                        </div>
                        <div className="mt-2">
                          <Label htmlFor="waktuF2">Waktu F2*</Label>
                          <Input
                            id="waktuF2"
                            type="text"
                            required
                            value={waktuF2}
                            onChange={(e) => setWaktuF2(e.target.value)}
                          />
                        </div>
                        <div className="mt-2">
                          <Label htmlFor="waktuF3">Waktu F3*</Label>
                          <Input
                            id="waktuF3"
                            type="text"
                            placeholder=""
                            required
                            value={waktuF3}
                            onChange={(e) => setWaktuF3(e.target.value)}
                          />
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    <p className="text-xs">
                      *Format Penginputan : 2025-01-09 10:15:00
                      (+0700/+0800/+0900) (WIB/WITA/WIT)
                    </p>

                    {/* Surat Permohonan */}
                    <div className="mt-2">
                      <Label htmlFor="surat-permohonan">Surat Permohonan</Label>
                      <input
                        id="surat-permohonan"
                        type="file"
                        className="text-black h-10 text-base flex items-center cursor-pointer w-full border border-neutral-200 rounded-md"
                        required
                        onChange={handleFileChange}
                      />
                    </div>

                    <CardFooter className="pt-4 flex justify-end gap-2">
                      {isPosting ? (
                        <Button>Loading ...</Button>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            type="button"
                            onClick={() => handleCancelAddNewUjian()}
                          >
                            Cancel
                          </Button>{" "}
                          <Button
                            onClick={(e) => handlePostNewUjianKeahlian(e)}
                          >
                            Save Draft
                          </Button>
                        </>
                      )}
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
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
                        onClick={(e) => setStatus("Pending")}
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

      <AlertDialog open={openFormRemedial} onOpenChange={setOpenFormRemedial}>
        <AlertDialogContent className="max-w-md">
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Remedial Pelaksaan Ujian</AlertDialogTitle>
              <AlertDialogDescription className="-mt-2">
                Proses ini mengharuskan PUKAKP untuk menginput waktu pelaksanaan
                remedial, kode akses peserta ujian sebelumnya dapat diakses
                kembali jika memang peserta bersangkutan mendapatkan remedial.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <fieldset>
              <div className="flex gap-2  mb-1 w-full">
                <div className="w-full">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="noSertifikat"
                  >
                    Waktu Remedial <span className="text-red-600">*</span>
                  </label>
                  <Input
                    id="waktuRemedial"
                    type="text"
                    required
                    value={waktuRemedial}
                    onChange={(e) => setWaktuRemedial(e.target.value)}
                  />
                </div>
              </div>
            </fieldset>

            <p className="text-gray-700 text-xs">
              *Hanya mengganti tanggal dan waktu saja!
            </p>
            <p className="text-rose-500 text-xs -mt-3">
              *Pastikan rekapitulasi penilaian sebelumnya telah didownload
              karena nilai remedi ini akan menimpa nilai awal
            </p>
          </>
          <AlertDialogFooter>
            {!isProcessingRemedial && (
              <AlertDialogCancel
                onClick={(e) => setOpenFormRemedial(!openFormRemedial)}
              >
                Cancel
              </AlertDialogCancel>
            )}
            <AlertDialogAction onClick={(e) => handleRemedial(e)}>
              {isProcessingRemedial ? (
                <span>Processing...</span>
              ) : (
                <span>Lakukan Remedial</span>
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
                ? " Tetapkan Penguji dan Fasilitator"
                : " Edit Pelaksanaan Ujian Keahlian"}
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
                        id="type-ujian"
                        className="form-input w-full text-black text-sm border-gray-300 rounded-md py-2"
                        required
                        value={typeUjian}
                        onChange={(e) => setTypeUjian(e.target.value)}
                      >
                        <option value="0">Pilih Tipe Ujian</option>
                        {dataTypeUjian.map((type) => (
                          <option
                            key={type.IdTypeUjian}
                            value={`${type.NamaTypeUjian},${type.IdTypeUjian}`}
                            className="capitalize"
                            selected={type.NamaTypeUjian == typeUjian}
                          >
                            {type.NamaTypeUjian}
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
                        placeholder="Tanggal Mulai"
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
                  {/* <div className="w-full mx-3">
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
                  </div> */}
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
                    onClick={(e) => handleEditUjianKeahlian(e)}
                  >
                    Edit
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            ) : (
              <form autoComplete="off">
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3 mb-2">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="jumlahPenguji"
                    >
                      Jumlah Penguji <span className="text-red-600">*</span>
                    </label>
                    <Select
                      onValueChange={(value) => setJumlahPenguji(Number(value))}
                      value={jumlahPenguji.toString()}
                    >
                      <SelectTrigger className="w-full py-5">
                        <SelectValue placeholder="Pilih Jumlah Penguji" />
                      </SelectTrigger>
                      <SelectContent side="bottom" className="z-[999999]">
                        {[1, 2, 3].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {[...Array(jumlahPenguji)].map((_, index) => (
                    <div key={index} className="w-full px-3 mb-2">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor={`penguji-${index}`}
                      >
                        Nama Penguji {index + 1}{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <Select
                        onValueChange={(value) =>
                          handlePengujiChange(index, value)
                        }
                        value={`${pengujiData[index].nama}|${pengujiData[index].id}`}
                      >
                        <SelectTrigger className="w-full py-5">
                          <SelectValue placeholder="Pilih Penguji" />
                        </SelectTrigger>
                        <SelectContent side="bottom" className="z-[999999]">
                          {dataPenguji!.map((penguji) => (
                            <SelectItem
                              key={penguji.IdUsersDpkakp}
                              value={`${penguji.NamaUsersDpkakp}|${penguji.IdUsersDpkakp}`}
                              className="capitalize"
                            >
                              {penguji.NamaUsersDpkakp}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}

                  <div className="w-full px-3 mb-2">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="fasilitator"
                    >
                      Nama Fasilitator <span className="text-red-600">*</span>
                    </label>
                    <Input
                      id="fasilitator"
                      type="text"
                      className="w-full text-black border-gray-300 text-sm rounded-md h-fit"
                      placeholder="Nama Fasilitator"
                      required
                      value={namaVasilitator}
                      onChange={(e) => setNamaVasilitator(e.target.value)}
                    />
                  </div>
                </div>

                <AlertDialogFooter className="mt-3">
                  <AlertDialogCancel
                    onClick={() => {
                      handleCancelAddNewUjian();
                      setIsOpenFormUjianKeahlian(false);
                    }}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleUpdateNewUjianKeahlian}>
                    Upload
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            )}
          </fieldset>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default TableDataUjian;

function EventBadge({ ujian }: { ujian: Ujian }) {
  const [isOngoing, setIsOngoing] = useState(false);

  // Check if all fields are empty strings ("")
  const isEmpty = Object.values(ujian).every(
    (value) => typeof value !== "string" || value.trim() === ""
  );

  if (isEmpty) return null; // Return nothing if all fields are empty

  const parseDate = (dateString: string): Date => {
    // Menghapus bagian 'WIB' dan mengganti spasi sebelum zona waktu
    const formattedDateString = dateString
      .replace(" WIB", "")
      .replace(" ", "T");

    // Parse string waktu yang sudah diformat
    return new Date(formattedDateString);
  };

  React.useEffect(() => {
    const checkTime = () => {
      const now = new Date();

      // Cek setiap waktu ujian
      const ongoing = Object.values(ujian).some((timeString) => {
        if (typeof timeString !== "string" || timeString.trim() === "")
          return false;

        // Menggunakan fungsi parseDate
        const eventTime = parseDate(timeString);

        if (isNaN(eventTime.getTime())) {
          console.warn("Invalid date:", timeString);
          return false;
        }

        // Menambahkan waktu 2 jam
        const twoHoursLater = new Date(
          eventTime.getTime() + 2 * 60 * 60 * 1000
        );

        // Memeriksa apakah waktu sekarang berada dalam rentang 2 jam
        return now >= eventTime && now <= twoHoursLater;
      });

      setIsOngoing(ongoing);
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);

    return () => clearInterval(interval);
  }, [ujian]);
  return isOngoing ? (
    <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">
      Sedang Berlangsung
    </span>
  ) : null;
}

function ExamSchedule({ data, ujian }: { data: Ujian[]; ujian: Ujian }) {
  if (data.length === 0) return null;

  const isRewarding = data[0]?.TypeUjian.includes("Rewarding") || data[0]?.TypeUjian.includes('TRYOUT');
  const isLevelII =
    data[0]?.TypeUjian == "ANKAPIN II" || data[0]?.TypeUjian == "ATKAPIN II";

  const scheduleItems = isRewarding
    ? [
      { label: "F1", time: ujian?.WaktuF1 },
      { label: "F2", time: ujian?.WaktuF2 },
      { label: "F3", time: ujian?.WaktuF3 },
    ]
    : isLevelII
      ? [
        { label: "F1B1", time: ujian?.WaktuF1B1 },
        { label: "F1B2", time: ujian?.WaktuF1B2 },
        { label: "F2", time: ujian?.WaktuF2B1 },
        { label: "F3B1", time: ujian?.WaktuF3B1 },
        { label: "F3B2", time: ujian?.WaktuF3B2 },
      ]
      : [
        { label: "F1B1", time: ujian?.WaktuF1B1 },
        { label: "F1B2", time: ujian?.WaktuF1B2 },
        { label: "F1B3", time: ujian?.WaktuF1B3 },
        { label: "F2", time: ujian?.WaktuF2B1 },
        { label: "F3B1", time: ujian?.WaktuF3B1 },
        { label: "F3B2", time: ujian?.WaktuF3B2 },
      ];

  return (
    <div className="w-full text-sm grid grid-cols-3 gap-4">
      {scheduleItems.map(({ label, time }) => (
        <React.Fragment key={label}>
          <div key={label} className="border border-gray-200 p-2 text-center">
            <span className="font-bold block border-b border-b-gray-200 py-1 mb-1">
              {label}
            </span>
            {time != "" ? formatIndonesianDate(time) : "-"}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
