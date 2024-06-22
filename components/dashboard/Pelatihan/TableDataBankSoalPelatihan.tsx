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
    TbCircleNumber1,
    TbCircleNumber2,
    TbCircleNumber3,
    TbCircleNumber4,
    TbDatabase,
    TbDatabaseEdit,
    TbFileCertificate,
    TbFileStack,
    TbRubberStamp,
    TbSchool,
    TbTargetArrow,
    TbTrash,
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
import { RiFilePaper2Line, RiShipLine, RiVerifiedBadgeFill } from "react-icons/ri";
import Link from "next/link";
import { FaRupiahSign } from "react-icons/fa6";
import Toast from "@/components/toast";
import { GiTakeMyMoney } from "react-icons/gi";
import { DialogSertifikatPelatihan } from "@/components/sertifikat/dialogSertifikatPelatihan";
import Cookies from "js-cookie";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

const TableDataBankSoalPelatihan = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const pathname = usePathname();
    const id = extractLastSegment(pathname);
    const [noSertifikatTerbitkan, setNoSertifikatTerbitkan] = React.useState("");

    const [dataPelatihan, setDataPelatihan] =
        React.useState<PelatihanMasyarakat | null>(null);

    const [data, setData] = React.useState<UserPelatihan[] | []>([]);
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

    const handleFetchingDatabaseSoalDataById = async () => {
        try {
            const response: AxiosResponse = await axios.get(
                `${baseUrl}/lemdik/getSoalPelatihan?idPelatihan=${id}`
            );
            console.log("BANK SOAL : ", response.data);
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

    const router = useRouter();

    const handleUpdatePublishPelatihanToELAUT = async (
        id: number,
        status: string
    ) => {
        const formData = new FormData();
        formData.append("NoSertifikat", status);
        console.log({ status });
        try {
            const response = await axios.put(
                `${baseUrl}/lemdik/updatePelatihanUsers?id=${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("XSRF091")}`,
                    },
                }
            );
            Toast.fire({
                icon: "success",
                title: `Berhasil menyisipkan no sertifikat ke akun pesereta pelatihan!`,
            });
            console.log("UPDATE PELATIHAN: ", response);
            handleFetchingPublicTrainingDataById();
        } catch (error) {
            console.error("ERROR UPDATE PELATIHAN: ", error);
            Toast.fire({
                icon: "success",
                title: `Gagal menyisipkan no sertifikat ke akun pesereta pelatihan!`,
            });
            handleFetchingPublicTrainingDataById();
        }
    };

    const handleValidDataPesertaPelatihan = async (
        id: number,
        status: string
    ) => {
        const formData = new FormData();
        formData.append("Keterangan", status);
        console.log({ status });
        console.log({ selectedIdPeserta });
        try {
            const response = await axios.put(
                `${baseUrl}/lemdik/updatePelatihanUsers?id=${selectedIdPeserta}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("XSRF091")}`,
                    },
                }
            );
            Toast.fire({
                icon: "success",
                title: `Berhasil memvalidasi data pesereta pelatihan!`,
            });
            console.log("VALIDASI PESERTA PELATIHAN: ", response);
            handleFetchingPublicTrainingDataById();
            setOpenFormValidasiDataPesertaPelatihan(
                !openFormValidasiDataPesertaPelatihan
            );
        } catch (error) {
            console.error("ERROR UPDATE PELATIHAN: ", error);
            Toast.fire({
                icon: "success",
                title: `Gagal menyisipkan no sertifikat ke akun pesereta pelatihan!`,
            });
            handleFetchingPublicTrainingDataById();
        }
    };

    const [
        openFormValidasiDataPesertaPelatihan,
        setOpenFormValidasiDataPesertaPelatihan,
    ] = React.useState<boolean>(false);

    const [validitasDataPeserta, setValiditasDataPeserta] =
        React.useState<string>("");

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
            accessorKey: "NoRegistrasi",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className={`text-black font-semibold w-fit p-0 flex justify-start items-centee`}
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <p className="leading-[105%]"> Soal</p>

                        <RiFilePaper2Line className="ml-2 h-4 w-4" />
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
                        <p className="leading-[105%]"> Jawaban Benar</p>

                        <RiVerifiedBadgeFill className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className={`${"ml-0"} text-left capitalize`}>
                    <p className="text-xs text-gray-400">
                        {" "}
                        <span
                            className={`${row.original.StatusPembayaran == "pending"
                                ? "text-yellow-500"
                                : row.original.StatusPembayaran == "paid" ||
                                    row.original.StatusPembayaran == "Done"
                                    ? "text-green-500"
                                    : "text-rose-500"
                                } capitalize`}
                        >
                            {row.original.StatusPembayaran}
                        </span>{" "}
                        • BTPN
                    </p>{" "}
                    <p className="text-base font-semibold tracking-tight leading-none">
                        Rp. {row.original?.TotalBayar}
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
                        <p className="leading-[105%]"> Pilihan 1</p>

                        <TbCircleNumber1 className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className={`${"ml-0"} text-left capitalize`}>
                    <p className="text-xs text-gray-400">
                        {" "}
                        <span
                            className={`${row.original.StatusPembayaran == "pending"
                                ? "text-yellow-500"
                                : row.original.StatusPembayaran == "paid" ||
                                    row.original.StatusPembayaran == "Done"
                                    ? "text-green-500"
                                    : "text-rose-500"
                                } capitalize`}
                        >
                            {row.original.StatusPembayaran}
                        </span>{" "}
                        • BTPN
                    </p>{" "}
                    <p className="text-base font-semibold tracking-tight leading-none">
                        Rp. {row.original?.TotalBayar}
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
                        <p className="leading-[105%]"> Pilihan 2</p>

                        <TbCircleNumber2 className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className={`${"ml-0"} text-left capitalize`}>
                    <p className="text-xs text-gray-400">
                        {" "}
                        <span
                            className={`${row.original.StatusPembayaran == "pending"
                                ? "text-yellow-500"
                                : row.original.StatusPembayaran == "paid" ||
                                    row.original.StatusPembayaran == "Done"
                                    ? "text-green-500"
                                    : "text-rose-500"
                                } capitalize`}
                        >
                            {row.original.StatusPembayaran}
                        </span>{" "}
                        • BTPN
                    </p>{" "}
                    <p className="text-base font-semibold tracking-tight leading-none">
                        Rp. {row.original?.TotalBayar}
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
                        <p className="leading-[105%]"> Pilihan 3</p>

                        <TbCircleNumber3 className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className={`${"ml-0"} text-left capitalize`}>
                    <p className="text-xs text-gray-400">
                        {" "}
                        <span
                            className={`${row.original.StatusPembayaran == "pending"
                                ? "text-yellow-500"
                                : row.original.StatusPembayaran == "paid" ||
                                    row.original.StatusPembayaran == "Done"
                                    ? "text-green-500"
                                    : "text-rose-500"
                                } capitalize`}
                        >
                            {row.original.StatusPembayaran}
                        </span>{" "}
                        • BTPN
                    </p>{" "}
                    <p className="text-base font-semibold tracking-tight leading-none">
                        Rp. {row.original?.TotalBayar}
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
                        <p className="leading-[105%]"> Pilihan 4</p>

                        <TbCircleNumber4 className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className={`${"ml-0"} text-left capitalize`}>
                    <p className="text-xs text-gray-400">
                        {" "}
                        <span
                            className={`${row.original.StatusPembayaran == "pending"
                                ? "text-yellow-500"
                                : row.original.StatusPembayaran == "paid" ||
                                    row.original.StatusPembayaran == "Done"
                                    ? "text-green-500"
                                    : "text-rose-500"
                                } capitalize`}
                        >
                            {row.original.StatusPembayaran}
                        </span>{" "}
                        • BTPN
                    </p>{" "}
                    <p className="text-base font-semibold tracking-tight leading-none">
                        Rp. {row.original?.TotalBayar}
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

    const handleUploadNilaiPeserta = async (id: number) => {
        const formData = new FormData();
        formData.append("PreTest", nilaiPretest);
        formData.append("PostTest", nilaiPosttest);

        try {
            const response = await axios.put(
                `${baseUrl}/lemdik/updatePelatihanUsers?id=${selectedIdPeserta}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("XSRF091")}`,
                    },
                }
            );
            Toast.fire({
                icon: "success",
                title: `Berhasil mempublish informasi pelatihan masyarakat ke laman E-LAUT!`,
            });
            console.log("UPDATE PELATIHAN: ", response);
            handleFetchingPublicTrainingDataById();
            setIsOpenFormInputNilai(!isOpenFormInputNilai);
        } catch (error) {
            console.error("ERROR UPDATE PELATIHAN: ", error);
            Toast.fire({
                icon: "success",
                title: `Gagal mempublish informasi pelatihan masyarakat ke laman E-LAUT!`,
            });
            handleFetchingPublicTrainingDataById();
            setIsOpenFormInputNilai(!isOpenFormInputNilai);
        }
    };

    const [isOpenFormPeserta, setIsOpenFormPeserta] =
        React.useState<boolean>(false);
    const [fileExcelBankSoalPelatihan, setFileExcelBankPelatihan] =
        React.useState<File | null>(null);
    const handleFileChange = (e: any) => {
        setFileExcelBankPelatihan(e.target.files[0]);
    };
    const handleUploadImportBankSoalPelatihan = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("IdPelatihan", id);
        if (fileExcelBankSoalPelatihan != null) {
            formData.append("file", fileExcelBankSoalPelatihan);
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/lemdik/ImportSoalPelatihan`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("XSRF091")}`,
                    },
                }
            );
            console.log("FILE UPLOADED BANK SOAL : ", response);
            Toast.fire({
                icon: "success",
                title: `Selamat anda berhasil mengupload bank soal pelatihan!`,
            });
            setIsOpenFormPeserta(!isOpenFormPeserta);
            handleFetchingPublicTrainingDataById();
        } catch (error) {
            console.log("FILE IMPORT BANK SOAL PELATIHAN : ", error);
            Toast.fire({
                icon: "error",
                title: `Gagal mengupload bank soal pelatihan!`,
            });
            handleFetchingPublicTrainingDataById();
        }
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
                                <AlertDialogAction
                                    onClick={(e) => handleUploadNilaiPeserta(selectedIdPeserta)}
                                >
                                    Upload
                                </AlertDialogAction>
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
                            <TbDatabase className="h-4 w-4" />
                            Import Bank Soal Pelatihan
                        </AlertDialogTitle>
                        <AlertDialogDescription className="-mt-2">
                            Import soal yang akan digunakan pada pelaksanaan test pelatihan ini!
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
                                        Data Soal <span>*</span>
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
                                    onClick={(e) => handleUploadImportBankSoalPelatihan(e)}
                                >
                                    Upload
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </fieldset>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={openFormValidasiDataPesertaPelatihan}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            {" "}
                            <HiMiniUserGroup className="h-4 w-4" />
                            Validasi Data Peserta Pelatihan
                        </AlertDialogTitle>
                        <AlertDialogDescription className="-mt-2">
                            Upload nilai peserta pelatihan yang diselenggarakan yang nantinya
                            akan tercantum pada sertifikat peserta pelatihan!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <fieldset>
                        <form autoComplete="off">
                            <AlertDialogFooter className="mt-3">
                                <AlertDialogCancel
                                    onClick={(e) =>
                                        setOpenFormValidasiDataPesertaPelatihan(
                                            !openFormValidasiDataPesertaPelatihan
                                        )
                                    }
                                >
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-green-500 hover:bg-green-600"
                                    onClick={(e) =>
                                        handleValidDataPesertaPelatihan(selectedIdPeserta, "Valid")
                                    }
                                >
                                    Validasi
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
                        <div className="flex w-full gap-3 sm:gap-5">
                            <div className="flex min-w-47.5">
                                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                                    <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                                </span>
                                <div className="w-full">
                                    <p className="font-semibold text-primary">Total Soal</p>
                                    <p className="text-sm font-medium">
                                        {dataPelatihan?.UserPelatihan.length} soal
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full items-center mb-2 -mt-3">

                        <div className="w-full flex justify-end gap-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <div className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit">
                                        <TbTrash />
                                        Hapus Bank Soal
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you absolutely sure?
                                        </AlertDialogTitle>
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

                            <div
                                onClick={(e) => setIsOpenFormPeserta(!isOpenFormPeserta)}
                                className="inline-flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer"
                            >
                                <FiUploadCloud />
                                Import Bank Soal
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

export default TableDataBankSoalPelatihan;
