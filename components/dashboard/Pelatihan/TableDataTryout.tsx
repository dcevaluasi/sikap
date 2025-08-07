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
    Trash,
    X,
} from "lucide-react";
import { HiMiniUserGroup, HiUserGroup } from "react-icons/hi2";
import {
    TbEditCircle,
} from "react-icons/tb";
import {
    IoMdClock,
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

import Toast from "@/components/toast";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { PelatihanMasyarakat } from "@/types/product";
import {
    FaBookOpen,
} from "react-icons/fa6";
import { Input } from "@/components/ui/input";

import Cookies from "js-cookie";
import Link from "next/link";
import { dpkakpBaseUrl } from "@/constants/urls";
import { generateTanggalPelatihan } from "@/utils/text";
import { TypeUjian, Ujian } from "@/types/ujian-keahlian-akp";
import { BiPaperPlane, BiSolidLockAlt } from "react-icons/bi";
import { IoReload } from "react-icons/io5";
import { formatIndonesianDate, isTodayAfter, isTodayBefore, isTodayBetween, isTodaySameAs } from "@/lib/utils";
import EmptyData from "@/components/micro-components/EmptyData";
import { HashLoader } from "react-spinners";
import { generatedYears } from "@/utils/globals";
import Pagination from "@/components/Pagination";
import { useFetchTypeUjianKeahlianAKP } from "@/hooks/ujian/useFetchTypeUjianKeahlianAKP";
import { useFetchPengujiKeahlianAKP } from "@/hooks/penguji/useFetchPengujiKeahlianAKP";
import { useFetchUjianKeahlianAKP } from "@/hooks/ujian/useFetchUjianKeahlianAKP";
import StatusUjianKeahlianAKP from "../Dashboard/StatusUjianKeahlianAKP";
import RemedialAction from "../Dashboard/Actions/RemedialAction";
import VerifikasiAction from "../Dashboard/Actions/VerifikasiAction";
import DeleteAction from "../Dashboard/Actions/DeleteAction";

const TableDataTryout: React.FC = () => {
    /** Fetching Ujian AKP **/
    const {
        data: dataUjian, isFetching: isFetchingDataUjian, counters: countersUjian, error: errorFetchingUjian, refetch: refetchUjian,
    } = useFetchUjianKeahlianAKP('admin', true, { includeTryout: true })

    /** Fetching Type Ujian AKP **/
    const { dataTypeUjian, isFetching: isFetchingTypeUjian, error: errorFetchingTypeUjian, refetch: refetchTypeUjian } = useFetchTypeUjianKeahlianAKP();

    /** Fetching Penguji Ujian AKP **/
    const { dataPenguji, isFetching: isFetchingPenguji, error: errorFetchingPenguji, refetch: refetchPenguji } = useFetchPengujiKeahlianAKP();

    // ================== UTILS ==================
    const [selectedTahun, setSelectedTahun] = React.useState<number>(new Date().getFullYear())
    const years = generatedYears()

    const [isFetching, setIsFetching] = React.useState<boolean>(false);
    const [isPosting, setIsPosting] = React.useState<boolean>(false);
    const [isOpenFormUjianKeahlian, setIsOpenFormUjianKeahlian] =
        React.useState<boolean>(false);
    const [selectedId, setSelectedId] = React.useState<number>(0);
    const [filePermohonan, setFilePermohonan] = React.useState<File | null>(null);

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
        formData.append("Status", "Aktif");
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
            refetchUjian();
            setIsPosting(false);
            handleClearNewUjianKeahlian();
            setStatus("");
        } catch (error) {
            console.error(error);
            Toast.fire({
                icon: "error",
                title: `Gagal menambahkan data pelaksanaan ujian keahlian baru!`,
            });
            refetchUjian();
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
            refetchUjian();
            setIsOpenFormUjianKeahlian(false);
            setIsPosting(false);
            setStatus("");
        } catch (error) {
            console.error(error);
            Toast.fire({
                icon: "error",
                title: `Gagal mengupdate data pelaksanaan ujian keahlian baru!`,
            });
            refetchUjian();
            setIsOpenFormUjianKeahlian(false);
            setIsPosting(true);
            setStatus("");
        }
    };



    const filteredData = dataUjian.filter((ujian: Ujian) => {
        const matchesSearchQuery =
            ujian.TypeUjian.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ujian.NamaUjian.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesStatus;
        if (selectedStatusFilter == "Pilih Penguji") {
            matchesStatus = ujian.NamaPengawasUjian === "";
        } else if (selectedStatusFilter == "Telah Selesai") {
            matchesStatus = ujian.IsSelesai === "1";
        } else if (selectedStatusFilter == "Akan Dilaksanakan") {
            matchesStatus = isTodayBefore(ujian.TanggalMulaiUjian) && ujian.IsSelesai == "";
        } else if (selectedStatusFilter == 'Sedang Berlangsung') {
            matchesStatus = isTodayBetween(ujian.TanggalMulaiUjian, ujian.TanggalBerakhirUjian) && ujian.IsSelesai !== "1"
        } else {
            matchesStatus =
                selectedStatusFilter === "All" || ujian.Status === selectedStatusFilter;
        }

        const pathname = usePathname();


        return matchesSearchQuery && matchesStatus;
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
            refetchUjian();
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
            refetchUjian();
            setIsPosting(true);
            setIsOpenFormUjianKeahlian(false);
            setStatus("");
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

    const [openFormCloseExam, setOpenFormCloseExam] =
        React.useState<boolean>(false);
    const handleCloseExam = async () => {
        setIsPosting(true);
        setOpenFormCloseExam(true)
        try {
            const response = await axios.put(
                `${dpkakpBaseUrl}/adminPusat/updateUjian?id=${selectedIdUjian}`,
                {
                    is_selesai: '1'
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
                text: `Berhasil menutup ujian!`,
            });
            refetchUjian();
            setOpenFormCloseExam(false);
            setIsPosting(false);
        } catch (error) {
            console.error(error);
            Toast.fire({
                icon: "error",
                title: `Gagal menutup ujian, harap cek internet atau admin pusat!`,
            });
            refetchUjian();
            setOpenFormCloseExam(false);
            setIsPosting(false);
        }
    };

    const [waktuDate, setWaktuDate] = React.useState('');
    const [waktuTime, setWaktuTime] = React.useState('');
    const [waktuZone, setWaktuZone] = React.useState('WIB');

    React.useEffect(() => {
        if (waktuDate && waktuTime && waktuZone) {
            const zoneMap: { [key: string]: string } = {
                WIB: '+0700',
                WITA: '+0800',
                WIT: '+0900',
            };

            const timeWithSeconds = waktuTime.length === 5 ? `${waktuTime}:00` : waktuTime;

            const formatted = `${waktuDate} ${timeWithSeconds} ${zoneMap[waktuZone]} ${waktuZone}`;
            setWaktuF1(formatted);
            setWaktuF2(formatted);
            setWaktuF3(formatted);
        }
    }, [waktuDate, waktuTime, waktuZone]);

    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPageData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    return (
        <section className="rounded-sm   pb-5 shadow-default  h-full scrollbar-hide">
            <section
                aria-label="main content"
                className="flex h-full flex-col flex-auto w-full border-l scrollbar-hide -mt-4"
            >
                <StatusUjianKeahlianAKP
                    isPenguji={isPenguji}
                    selectedStatusFilter={selectedStatusFilter}
                    setSelectedStatusFilter={setSelectedStatusFilter}
                    data={dataUjian}
                    countersUjian={countersUjian}
                />

                {
                    isFetchingDataUjian ? <div className="my-32 w-full flex items-center justify-center">
                        <HashLoader color="#338CF5" size={50} />
                    </div> : <div className="px-4 -mt-4">
                        <Tabs defaultValue="account" className="w-full">

                            <TabsList className={`grid w-full grid-cols-2`}>
                                <TabsTrigger value="account">
                                    Daftar Pelaksanan Tryout
                                </TabsTrigger>
                                <TabsTrigger value="password">
                                    Buat Pelaksanaan Tryout
                                </TabsTrigger>
                            </TabsList>


                            <TabsContent value="account">
                                <div className="flex flex-col gap-1">
                                    <div className="mb-1">
                                        <div className="flex w-full gap-1 items-center">
                                            <Input
                                                type="text"
                                                placeholder="Cari berdasarkan Program Ujian atau Nama Ujian"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full text-sm"
                                            />

                                            <Select
                                                value={selectedTahun.toString()} onValueChange={(val) => setSelectedTahun(parseInt(val))}
                                            >
                                                <SelectTrigger className="w-fit text-base py-5">
                                                    <SelectValue placeholder="Tahun Pelaksanaan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {years.map((year) => (
                                                        <SelectItem key={year} value={year.toString()} className='text-gray-300'>
                                                            {year}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                        </div>
                                    </div>
                                    {filteredData.length === 0 ? (
                                        <EmptyData />
                                    ) : (
                                        <>
                                            <div className="overflow-x-auto rounded-lg border">
                                                <table className="min-w-full text-sm text-left">
                                                    <thead className="bg-gray-100 text-gray-700">
                                                        <tr>
                                                            <th className="p-4 text-center">No</th>
                                                            <th className="p-4 text-center">Nama Ujian</th>
                                                            <th className="p-4 text-center">Tempat</th>
                                                            <th className="p-4 text-center">Waktu</th>


                                                            <th className="p-4 text-center">Peserta</th>
                                                            <th className="p-4 text-center">Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentPageData.map((ujian, index) => (
                                                            <tr
                                                                key={index}
                                                                className="border-b hover:bg-gray-50 transition-colors"
                                                            >
                                                                <td className="p-4 text-center font-medium">
                                                                    {(indexOfFirstItem + index + 1)}
                                                                </td>

                                                                <td className="p-4 font-medium text-gray-900">
                                                                    <div>{ujian.NamaUjian}</div>
                                                                    <div className="text-xs text-gray-500">
                                                                        {ujian.TypeUjian} • {ujian.PUKAKP}
                                                                    </div>
                                                                </td>
                                                                <td className="p-4 text-center">{ujian.TempatUjian}</td>
                                                                <td className="p-4  text-center">
                                                                    {generateTanggalPelatihan(ujian.TanggalMulaiUjian)} s.d{" "}
                                                                    {generateTanggalPelatihan(ujian.TanggalBerakhirUjian)}
                                                                </td>

                                                                <td className="p-4 text-center">
                                                                    {ujian.UsersUjian?.length ?? 0}/{ujian.JumlahPesertaUjian - 1}
                                                                </td>
                                                                <td className="p-4 text-right">
                                                                    <div className="flex gap-1 justify-end flex-wrap">
                                                                        {ujian!.Status == "Aktif" && (
                                                                            <Link
                                                                                href={`/lembaga/${usePathname().includes("pukakp")
                                                                                    ? "pukakp"
                                                                                    : "dpkakp"
                                                                                    }/admin/dashboard/ujian/peserta-ujian/${ujian!.IdUjian
                                                                                    }/${ujian!.IdTypeUjian}`}
                                                                                className="bg-blue-500 rounded-md   shadow-sm  h-9 px-4 py-2 text-white flex items-center text-sm w-full justify-center"
                                                                            >
                                                                                <HiUserGroup className="h-4 w-4 text-white mr-1" />{" "}
                                                                                Peserta Tryout
                                                                            </Link>
                                                                        )}


                                                                        <DeleteAction
                                                                            idUjian={ujian.IdUjian.toString()}
                                                                            status={ujian.Status}
                                                                            refetchUjian={refetchUjian}
                                                                        />

                                                                        {
                                                                            ujian!.IsSelesai == "" && (
                                                                                <AlertDialog open={openFormCloseExam} onOpenChange={setOpenFormCloseExam}>

                                                                                    <AlertDialogContent>
                                                                                        <AlertDialogHeader>
                                                                                            <AlertDialogTitle>
                                                                                                Apakah kamu yakin menutup ujian ini?
                                                                                            </AlertDialogTitle>
                                                                                            <AlertDialogDescription>
                                                                                                Menutup ujian, berarti sudah selesai melaksanakan seluruh rangkaian pelaksanaan ujian, harap diperiksa kembali nilai peserta sebelum yakin menutup ujian ini!
                                                                                            </AlertDialogDescription>
                                                                                        </AlertDialogHeader>
                                                                                        <AlertDialogFooter>
                                                                                            {
                                                                                                !isPosting ? <><AlertDialogCancel>Batal</AlertDialogCancel>

                                                                                                    <AlertDialogAction
                                                                                                        onClick={() => handleCloseExam()}
                                                                                                        className="bg-gray-700"
                                                                                                    >
                                                                                                        Tutup
                                                                                                    </AlertDialogAction></> : <Button className='w-full'>Loading....</Button>
                                                                                            }

                                                                                        </AlertDialogFooter>
                                                                                    </AlertDialogContent>
                                                                                </AlertDialog>
                                                                            )}


                                                                        {ujian!.Status === "Aktif" && (
                                                                            <AlertDialog>
                                                                                <AlertDialogTrigger asChild>
                                                                                    <Button
                                                                                        variant="outline"
                                                                                        className="bg-indigo-600 text-white hover:text-white hover:bg-indigo-600 w-full"
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

                                                                                    <AlertDialogFooter>
                                                                                        <AlertDialogCancel className="bg-gray-900 w-full text-white hover:bg-gray-800 hover:text-white">
                                                                                            Tutup
                                                                                        </AlertDialogCancel>
                                                                                    </AlertDialogFooter>
                                                                                </AlertDialogContent>
                                                                            </AlertDialog>
                                                                        )}

                                                                        {usePathname().includes("pukakp") &&
                                                                            ujian!.IsSelesai === "" && isTodayAfter(ujian!.TanggalBerakhirUjian) && (
                                                                                <Button
                                                                                    onClick={(e) => {
                                                                                        setSelectedIdUjian(ujian!.IdUjian);
                                                                                        setOpenFormCloseExam(!openFormRemedial);
                                                                                    }}
                                                                                    variant="outline"
                                                                                    className="bg-teal-600 hover:bg-teal-700 hover:text-white text-white rounded-md w-full"
                                                                                >
                                                                                    <BiSolidLockAlt className="h-4 w-4 mr-1" /> Tutup Tryout
                                                                                </Button>
                                                                            )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Pagination */}
                                            <div className="mt-4 flex justify-end">
                                                <Pagination
                                                    totalItems={filteredData.length}
                                                    itemsPerPage={itemsPerPage}
                                                    currentPage={currentPage}
                                                    onPageChange={handlePageChange}
                                                />
                                            </div>
                                        </>
                                    )}

                                </div>

                            </TabsContent>
                            <TabsContent value="password">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{Cookies.get('PUKAKP') === 'Tryout Center' ? 'Ajukan Permohonan Try Out' : 'Ajukan Permohonan Ujian AKP'}</CardTitle>
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

                                            {/* Tipe Ujian */}
                                            <div className="flex gap-2 w-full mt-2">
                                                <div className="w-full">
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

                                            </div>

                                            <div className="flex gap-2 w-full mt-2">
                                                <div className="w-full">
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
                                                <div className="w-full">
                                                    <Label htmlFor="tempat-ujian">Tempat Ujian*</Label>
                                                    <Input
                                                        id="tempat-ujian"
                                                        type="text"
                                                        required
                                                        value={tempatUjian}
                                                        onChange={(e) => setTempatUjian(e.target.value)}
                                                    />
                                                </div>
                                            </div>


                                            {/* Tanggal Mulai and Tanggal Berakhir */}
                                            <div className="flex gap-2 w-full mt-2">
                                                <div className="w-full">
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
                                                <div className="w-full">
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

                                            <div className="flex flex-col mt-2">
                                                <Label htmlFor="tanggal">Waktu Pelaksanaan*</Label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <div>
                                                        <Label htmlFor="tanggal">Tanggal</Label>
                                                        <Input
                                                            id="tanggal"
                                                            type="date"
                                                            required
                                                            value={waktuDate}
                                                            onChange={(e) => setWaktuDate(e.target.value)}
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="jam">Jam</Label>
                                                        <Input
                                                            id="jam"
                                                            type="time"
                                                            required
                                                            value={waktuTime}
                                                            onChange={(e) => setWaktuTime(e.target.value)}
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="zona">Zona Waktu</Label>
                                                        <Select value={waktuZone} onValueChange={setWaktuZone}>
                                                            <SelectTrigger id="zona">
                                                                <SelectValue placeholder="Pilih zona waktu" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="WIB">WIB (GMT+7)</SelectItem>
                                                                <SelectItem value="WITA">WITA (GMT+8)</SelectItem>
                                                                <SelectItem value="WIT">WIT (GMT+9)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>


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
                                                            Buat Tryout
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
                }


            </section>

        </section>
    );
};

export default TableDataTryout;


