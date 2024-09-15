'use client'

import React from 'react'
import {
    RiRadioButtonLine,
    RiShipLine,
    RiVerifiedBadgeFill,
} from "react-icons/ri";

import { LucideFileCheck2, TrendingUp } from "lucide-react";

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
import { HiLockClosed, HiMiniUserGroup, HiUserGroup } from "react-icons/hi2";
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
    IoMdClose,
    IoMdGlobe,
    IoMdInformationCircleOutline,
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

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { usePathname, useRouter } from "next/navigation";
import { MdOutlineSaveAlt } from "react-icons/md";
import FormPelatihan from "../admin/formPelatihan";

import { convertDate } from "@/utils";
import Cookies from "js-cookie";
import { Progress } from "@/components/ui/progress";
import { DialogTemplateSertifikatPelatihan } from "@/components/sertifikat/dialogTemplateSertifikatPelatihan";
import Link from "next/link";
import { elautBaseUrl } from "@/constants/urls";


function DetailPelatihan() {
    const paths = usePathname().split('/')
    const idPelatihan = paths[paths.length - 1]
    const [pelatihan, setPelatihan] = React.useState<PelatihanMasyarakat | null>(null)
    const handleFetchDetailPelatihan = async () => {
        try {
            const response = await axios.get(`${elautBaseUrl}/getPelatihanUser?idPelatihan=${idPelatihan}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('XSRF091')}`,
                },
            });
            setPelatihan(response.data)
            console.log({ response })
        } catch (error) {
            console.error("LEMDIK INFO: ", error);
        }
    }

    React.useEffect(() => {
        handleFetchDetailPelatihan();
    }, []);

    return (
        <section className='m-5'>
            <div className="flex flex-col">
                <div className="flex flex-row gap-2 items-end justify-between pb-4 border-b border-b-gray-200">

                    <div className="flex flex-col">
                        <h1 className="text-3xl font-medium leading-[100%] font-calsans">
                            Detail Pelatihan
                        </h1>
                        <p className="font-medium text-gray-400 text-base">
                            Verifikasi, Monitoring, dan Lihat Data Peserta Pelatihan!
                        </p>
                    </div>

                    <div className={`w-fit flex items-center justify-center gap-1`}>
                        <Button
                            variant="outline"
                            onClick={(e) => {

                            }}
                            className="ml-auto border rounded-full border-[#000000] hover:bg-[#000] hover:text-white duration-700"
                        >
                            <FaBookOpen className="h-4 w-4" />
                        </Button>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="ml-auto text-rose-600 border rounded-full border-rose-600 hover:bg-rose-600 hover:text-white duration-700"
                                            >
                                                <Trash className="h-4 w-4 " />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Hapus</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Apakah kamu yakin menghapus pelatihan ini?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Penghapusan data ini akan dilakukan secara permanen,
                                        sehingga anda tidak dapat kembali melakukan undo terkait
                                        tindakan ini!
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction
                                        className="bg-rose-600 text-white"

                                    >
                                        Hapus
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Button

                            variant="outline"
                            className="ml-auto border rounded-full border-yellow-400 hover:bg-yellow-400 hover:text-white text-yellow-400 duration-700"
                        >
                            <HiLockClosed className="h-5 w-4 " />
                        </Button>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={``}
                                        className="ml-auto border rounded-full border-green-500  h-9 px-4 py-2  hover:bg-green-500 hover:text-white text-green-500 duration-700"
                                    >
                                        <HiUserGroup className="h-4 w-4 " />
                                    </Link>

                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Peserta Pelatihan</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <Button

                            variant="outline"
                            className="ml-auto border rounded-full border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 duration-700"
                        >
                            <RiVerifiedBadgeFill className="h-4 w-4 " />
                        </Button>


                        <>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button

                                            variant="outline"
                                            className="ml-auto border rounded-full border-purple-600 hover:bg-purple-600 hover:text-white text-purple-600 duration-700"
                                        >
                                            <TbBroadcast className="h-4 w-4 " />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Publish</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                        </>


                        <Link
                            href={''}
                            target="_blank"
                            className="ml-auto border rounded-full border-gray-600  bg-white shadow-sm hover:bg-gray-600 hover:text-white text-gray-600 duration-700 h-9 px-4 py-2 "
                        >
                            <LucideFileCheck2 className="h-4 w-4 " />
                        </Link>

                    </div>
                </div>
            </div>

            {
                pelatihan != null && <div className="mt-4 md:mt-6 2xl:mt-7.5 w-full">
                    <div className="w-full border border-gray-200 rounded-xl">
                        <div className="bg-gray-100 p-4 w-full ">
                            <h2 className='font-bold font-calsans text-xl'>Informasi Pelatihan</h2>



                        </div>
                        <table className='w-full'>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>Judul</td>
                                <td className='p-4 w-2/3'>{pelatihan!.NamaPelatihan || ""}</td>
                            </tr>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>Kode Pelatihan</td>
                                <td className='p-4 w-2/3'>{pelatihan!.KodePelatihan || ""}</td>
                            </tr>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>Penyelenggara Pelatihan</td>
                                <td className='p-4 w-2/3'>{generateFullNameBalai(pelatihan!.PenyelenggaraPelatihan) || ""} ({pelatihan!.PenyelenggaraPelatihan || ""})</td>
                            </tr>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>Lokasi Pelatihan</td>
                                <td className='p-4 w-2/3'>{pelatihan!.LokasiPelatihan || ""}</td>
                            </tr>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>Waktu Pelaksanaan</td>
                                <td className='p-4 w-2/3'>{generateTanggalPelatihan(pelatihan!.TanggalMulaiPelatihan) || ""} s.d. {generateTanggalPelatihan(pelatihan!.TanggalBerakhirPelatihan) || ""}</td>
                            </tr>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>Metode Pelaksanaan</td>
                                <td className='p-4 w-2/3'>{pelatihan!.PelaksanaanPelatihan || ""}</td>
                            </tr>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>Dukungan Program Terobosan</td>
                                <td className='p-4 w-2/3'>{pelatihan!.DukunganProgramTerobosan || ""}</td>
                            </tr>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>Jenis Pelatihan</td>
                                <td className='p-4 w-2/3'>
                                    {pelatihan!.JenisPelatihan || ""}</td>
                            </tr>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>Bidang Pelatihan</td>
                                <td className='p-4 w-2/3'>{pelatihan!.BidangPelatihan || ""}</td>
                            </tr>

                        </table>
                    </div>
                </div>
            }

            {
                pelatihan != null && <div className="mt-4 md:mt-6 2xl:mt-7.5 w-full">
                    <div className="w-full border border-gray-200 rounded-xl">
                        <div className="bg-gray-100 p-4 w-full ">
                            <h2 className='font-bold font-calsans text-xl'>Informasi Pendaftaran</h2>



                        </div>
                        <table className='w-full'>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>Tanggal Pendadftaran</td>
                                <td className='p-4 w-2/3'>{generateTanggalPelatihan(pelatihan.TanggalMulaiPendaftaran)} s.d. {generateTanggalPelatihan(pelatihan!.TanggalAkhirPendaftaran)}</td>
                            </tr>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>Tarif Pelatihan</td>
                                <td className='p-4 w-2/3'>
                                    Rp.  {pelatihan!.HargaPelatihan || ""}</td>
                            </tr>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>Asal Peserta</td>
                                <td className='p-4 w-2/3'>{pelatihan!.AsalPelatihan}</td>
                            </tr>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>Kuota Peserta</td>
                                <td className='p-4 w-2/3'>{pelatihan!.KoutaPelatihan}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            }

            {
                pelatihan != null && <div className="mt-4 md:mt-6 2xl:mt-7.5 w-full">
                    <div className="w-full border border-gray-200 rounded-xl">
                        <div className="bg-gray-100 p-4 w-full ">
                            <h2 className='font-bold font-calsans text-xl'>Informasi Teknis Pelatihan</h2>
                        </div>
                        <table className='w-full'>
                            <tr className='border-b border-b-gray-200 w-full '>
                                <td className='font-semibold p-4 w-[20%] h-fit flex'>Instruktur</td>
                                <td className='p-4 w-2/3'>{
                                    pelatihan.Instruktur != '' ? <div className="flex flex-col gap-1">
                                        {generateInstrukturName(pelatihan.Instruktur).map((instruktur, index) => (
                                            <span key={index}>
                                                {index + 1}. {instruktur}
                                            </span>
                                        ))}
                                    </div> : <>-</>
                                }</td>
                            </tr>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%] flex'>Materi Pelatihan</td>
                                <td className='p-4 w-2/3'>{
                                    pelatihan!.MateriPelatihan.length > 0 ? <div className="flex flex-col gap-1">
                                        {pelatihan!.MateriPelatihan.map((materi, index) => (
                                            <span key={index}>
                                                {index + 1}. {materi.NamaMateri}
                                            </span>
                                        ))}
                                    </div> : <>-</>
                                }</td>
                            </tr>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>Silabus/Modul/Bahan Ajar Pelatihan</td>
                                <td className='p-4 w-2/3'><Link target='_blank' className='text-blue-500 underline' href={`https://api-elaut.ikulatluh.cloud/public/silabus/pelatihan/${pelatihan!.SilabusPelatihan}`}>{pelatihan!.SilabusPelatihan}</Link></td>
                            </tr>

                        </table>
                    </div>
                </div>
            }

            {
                pelatihan != null && <div className="mt-4 md:mt-6 2xl:mt-7.5 w-full">
                    <div className="w-full border border-gray-200 rounded-xl">
                        <div className="bg-gray-100 p-4 w-full ">
                            <h2 className='font-bold font-calsans text-xl'>Informasi Penerbitan Sertifikat</h2>



                        </div>
                        <table className='w-full'>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>Jenis Sertifikat</td>
                                <td className='p-4 w-2/3'>{pelatihan!.JenisSertifikat}</td>
                            </tr>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>Penandatangan Sertifikat</td>
                                <td className='p-4 w-2/3'>{pelatihan!.TtdSertifikat == '' ? '-' : pelatihan!.TtdSertifikat}</td>
                            </tr>
                            <tr className='border-b border-b-gray-200 w-full'>
                                <td className='font-semibold p-4 w-[20%]'>No Sertifikat</td>
                                <td className='p-4 w-2/3'>{pelatihan!.NoSertifikat == '' ? '-' : pelatihan!.NoSertifikat}</td>
                            </tr>

                        </table>
                    </div>
                </div>
            }


        </section >
    )
}
import { FaBookOpen } from 'react-icons/fa6';
import axios from 'axios';
import { PelatihanMasyarakat } from '@/types/product';
import { generateFullNameBalai, generateTanggalPelatihan } from '@/utils/text';
import { generateInstrukturName } from '@/lib/utils';

export default DetailPelatihan
