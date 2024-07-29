import React, { ReactElement, useState } from "react";
import {
    RiRadioButtonLine,
    RiShipLine,
    RiVerifiedBadgeFill,
} from "react-icons/ri";

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
} from "react-icons/io";
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
import { useRouter } from "next/navigation";
import { MdOutlineSaveAlt } from "react-icons/md";
import Toast from "@/components/toast";
import SertifikatSettingPage1 from "@/components/sertifikat/sertifikatSettingPage1";
import SertifikatSettingPage2 from "@/components/sertifikat/sertifikatSettingPage2";
import { PiMicrosoftExcelLogoFill, PiStampLight } from "react-icons/pi";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { PelatihanMasyarakat } from "@/types/product";
import { FaBookOpen, FaRupiahSign } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { convertDate } from "@/utils";
import Cookies from "js-cookie";
import { LemdiklatDetailInfo } from "@/types/lemdiklat";
import { Progress } from "@/components/ui/progress";
import { GiBookmarklet } from "react-icons/gi";
import { DialogSertifikatPelatihan } from "@/components/sertifikat/dialogSertifikatPelatihan";
import { DialogTemplateSertifikatPelatihan } from "@/components/sertifikat/dialogTemplateSertifikatPelatihan";
import Link from "next/link";
import TableData from "../../Tables/TableData";

const TableDataTipeUjianKeahlian: React.FC = () => {
    const [showFormAjukanPelatihan, setShowFormAjukanPelatihan] =
        React.useState<boolean>(false);

    const [data, setData] = React.useState<TypeUjian[]>([]);

    const [isFetching, setIsFetching] = React.useState<boolean>(false);

    const handleFetchingTypeUjian = async () => {
        setIsFetching(true);
        try {
            const response: AxiosResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/adminPusat/getTypeUjian`
            );
            setData(response.data.data);
            setIsFetching(false);
        } catch (error) {
            console.error("Error posting tipe ujian:", error);
            setIsFetching(false);
            throw error;
        }
    };

    const [namaMateri, setNamaMateri] = React.useState<string>("");
    const [jamTeori, setJamTeori] = React.useState<string>("");
    const [jamPraktek, setJamPraktek] = React.useState<string>("");

    const [isOpenFormMateri, setIsOpenFormMateri] =
        React.useState<boolean>(false);
    const [selectedId, setSelectedId] = React.useState<number>(0);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );

    const [sertifikatUntukPelatihan, setSertifikatUntukPelatihan] =
        React.useState("");
    const [ttdSertifikat, setTtdSertifikat] = React.useState("");
    const [openFormSertifikat, setOpenFormSertifikat] = React.useState(false);

    const [isOpenFormPublishedPelatihan, setIsOpenFormPublishedPelatihan] =
        React.useState<boolean>(false);

    const router = useRouter();
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const columns: ColumnDef<TypeUjian>[] = [
        {
            accessorKey: "IdTypeUjian",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className={`text-gray-900 font-semibold`}
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        No
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className={`text-center uppercase`}>{row.index + 1}</div>
            ),
        }
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
        handleFetchingTypeUjian();
    }, []);

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default  sm:px-7.5 xl:col-span-8">
            <AlertDialog open={isOpenFormMateri}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            {" "}
                            <FaBookOpen className="h-4 w-4" />
                            Tambah Materi Pelatihan
                        </AlertDialogTitle>
                        <AlertDialogDescription className="-mt-2">
                            Daftarkan materi pelatihan yang diselenggarakan yang nantinya akan
                            tercantum pada sertifikat peserta pelatihan!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <fieldset>
                        <form autoComplete="off">
                            <div className="flex flex-wrap mb-1 w-full">
                                <div className="w-full">
                                    <label
                                        className="block text-gray-800 text-sm font-medium mb-1"
                                        htmlFor="name"
                                    >
                                        Nama Materi <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="form-input w-full text-black border-gray-300 rounded-md"
                                        placeholder="Masukkan nama materi"
                                        required
                                        value={namaMateri}
                                        onChange={(e) => setNamaMateri(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 w-full">
                                <div className="flex gap-2 mb-1 w-full">
                                    <div className="w-full">
                                        <label
                                            className="block text-gray-800 text-sm font-medium mb-1"
                                            htmlFor="name"
                                        >
                                            Jam Teori <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            className="form-input w-full text-black border-gray-300 rounded-md"
                                            placeholder="Jam Pelajaran"
                                            required
                                            value={jamTeori}
                                            onChange={(e) => setJamTeori(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label
                                            className="block text-gray-800 text-sm font-medium mb-1"
                                            htmlFor="name"
                                        >
                                            Jam Praktek <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            className="form-input w-full text-black border-gray-300 rounded-md"
                                            placeholder="Jam Pelajaran"
                                            required
                                            value={jamPraktek}
                                            onChange={(e) => setJamPraktek(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>



                            <AlertDialogFooter className="mt-3">
                                <AlertDialogCancel
                                    onClick={(e) => setIsOpenFormMateri(!isOpenFormMateri)}
                                >
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                >
                                    Upload
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </fieldset>
                </AlertDialogContent>
            </AlertDialog>
            {showFormAjukanPelatihan ? (
                <>
                    {/* Header Tabel Data Pelatihan */}
                    <div className="flex flex-wrap items-center mb-3 justify-between gap-3 sm:flex-nowrap">
                        {/* Button Ajukan Permohonan Buka Pelatihan */}
                    </div>

                    {/* List Data Pelatihan */}
                    <div>
                        {/* <FormPelatihan edit={false} /> */}
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
                                    <p className="font-semibold text-primary">Total Pelatihan</p>
                                    <p className="text-sm font-medium">{data.length} pelatihan</p>
                                </div>
                            </div>
                            <div className="flex min-w-47.5">
                                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                                    <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
                                </span>
                                <div className="w-full">
                                    <p className="font-semibold text-secondary">
                                        Total Publish Umum
                                    </p>
                                    <p className="text-sm font-medium">
                                        0 ujian
                                    </p>
                                </div>
                            </div>
                            <div className="flex min-w-47.5">
                                <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                                    <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-green-400"></span>
                                </span>
                                <div className="w-full">
                                    <p className="font-semibold text-green-400">Total Selesai</p>
                                    <p className="text-sm font-medium">
                                        0 ujian
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* List Data Pelatihan */}
                    <div>
                        <div id="chartOne" className="-ml-5"></div>
                        <div className="flex w-full items-center mb-2">
                            <div className="flex w-full gap-1 items-start">

                                <div
                                    onClick={(e) => {
                                        router.push("/admin/lemdiklat/pelatihan/tambah-pelatihan");
                                    }}
                                    className="flex gap-2 px-3 text-sm items-center rounded-md bg-whiter p-1.5  cursor-pointer w-fit"
                                >
                                    <FiUploadCloud />
                                    Tambah Database Ujian
                                </div>
                            </div>
                        </div>

                        <TableData
                            isLoading={isFetching}
                            columns={columns}
                            table={table}
                            type={"short"}
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

export default TableDataTipeUjianKeahlian;
