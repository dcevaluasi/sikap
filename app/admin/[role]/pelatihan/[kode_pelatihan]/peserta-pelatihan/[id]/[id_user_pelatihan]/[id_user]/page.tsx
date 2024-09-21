"use client";

import React from "react";
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
} from "@/components/ui/tooltip";

import { usePathname, useRouter } from "next/navigation";
import { MdOutlineSaveAlt } from "react-icons/md";

import { convertDate } from "@/utils";
import Cookies from "js-cookie";
import { Progress } from "@/components/ui/progress";
import { DialogTemplateSertifikatPelatihan } from "@/components/sertifikat/dialogTemplateSertifikatPelatihan";
import Link from "next/link";
import { elautBaseUrl } from "@/constants/urls";

import { FaBookOpen } from "react-icons/fa6";
import axios from "axios";
import { PelatihanMasyarakat, UserPelatihan } from "@/types/product";
import { generateFullNameBalai, generateTanggalPelatihan } from "@/utils/text";
import { generateInstrukturName } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import Toast from "@/components/toast";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import { User } from "@/types/user";
import GenerateNoSertifikatButton from "@/components/dashboard/Dashboard/Actions/GenerateNoSertifikatButton";
import ValidasiPesertaButton from "@/components/dashboard/Dashboard/Actions/ValidasiPesertaButton";

function DetailPeserta() {
  const paths = usePathname().split("/");
  const idPeserta = paths[paths.length - 1];
  const idPesertaPelatihan = paths[paths.length - 2];
  const kodePelatihan = paths[paths.length - 2];
  const [peserta, setPeserta] = React.useState<User | null>(null);
  const [pesertaPelatihan, setPesertaPelatihan] =
    React.useState<UserPelatihan | null>(null);
  const handleFetchDetailPeserta = async () => {
    try {
      const response = await axios.get(
        `${elautBaseUrl}/users/getUsersByIdNoJwt?id=${idPeserta}`
      );
      setPeserta(response.data);
      const filteredPelatihan = response.data.Pelatihan.filter(
        (item: UserPelatihan) =>
          item.IdUserPelatihan.toString() === idPesertaPelatihan
      );
      setPesertaPelatihan(filteredPelatihan[0]);
      console.log({ response });
    } catch (error) {
      console.error("LEMDIK INFO: ", error);
    }
  };

  React.useEffect(() => {
    handleFetchDetailPeserta();
  }, []);

  console.log({ peserta });
  console.log({ pesertaPelatihan });
  console.log({ idPesertaPelatihan });
  console.log({ idPeserta });

  return (
    <DefaultLayout>
      <section className="m-3">
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 items-end justify-between pb-4 border-b border-b-gray-200">
            <div className="flex flex-col">
              <h1 className="text-3xl font-medium leading-[100%] font-calsans">
                Detail Peserta Pelatihan
              </h1>
              <p className="font-medium text-gray-400 text-base">
                Verifikasi, Monitoring, dan Lihat Data Peserta peserta!
              </p>
            </div>

            {peserta != null && (
              <div className={`w-fit flex items-center justify-center gap-1`}>
                <ValidasiPesertaButton
                  idUser={idPesertaPelatihan}
                  peserta={pesertaPelatihan!}
                  handleFetchingData={handleFetchDetailPeserta}
                />
              </div>
            )}
          </div>
        </div>

        {peserta != null && (
          <div className="mt-4 md:mt-6 2xl:mt-7.5 w-full">
            <div className="w-full border border-gray-200 rounded-xl">
              <div className="bg-gray-100 p-4 w-full ">
                <h2 className="font-bold font-calsans text-xl">
                  Informasi Peserta
                </h2>
              </div>
              <table className="w-full">
                <tr className="border-b border-b-gray-200 w-full">
                  <td className="font-semibold p-4 w-[20%]">Nama Lengkap</td>
                  <td className="p-4 w-2/3">{peserta!.Nama || ""}</td>
                </tr>
                <tr className="border-b border-b-gray-200 w-full">
                  <td className="font-semibold p-4 w-[20%]">NIK</td>
                  <td className="p-4 w-2/3">{peserta!.Nik || ""}</td>
                </tr>
                <tr className="border-b border-b-gray-200 w-full">
                  <td className="font-semibold p-4 w-[20%]">No Telepon/WA</td>
                  <td className="p-4 w-2/3">
                    {" "}
                    <Link
                      target="_blank"
                      className="text-blue-500"
                      href={`https://wa.me/62${peserta!.NoTelpon}`}
                    >
                      62{peserta!.NoTelpon || ""}
                    </Link>{" "}
                  </td>
                </tr>
                <tr className="border-b border-b-gray-200 w-full">
                  <td className="font-semibold p-4 w-[20%]">Alamat</td>
                  <td className="p-4 w-2/3">{peserta!.Alamat || ""}</td>
                </tr>
                <tr className="border-b border-b-gray-200 w-full">
                  <td className="font-semibold p-4 w-[20%]">Email</td>
                  <td className="p-4 w-2/3">{peserta!.Email || "-"}</td>
                </tr>
                <tr className="border-b border-b-gray-200 w-full">
                  <td className="font-semibold p-4 w-[20%]">
                    Tempat dan Tanggal Lahir
                  </td>
                  <td className="p-4 w-2/3">
                    {peserta!.TempatLahir || "-"}.{" "}
                    {generateTanggalPelatihan(peserta!.TanggalLahir) || "-"}
                  </td>
                </tr>
                <tr className="border-b border-b-gray-200 w-full">
                  <td className="font-semibold p-4 w-[20%]">Agama</td>
                  <td className="p-4 w-2/3">{peserta!.Agama || "-"}</td>
                </tr>
                <tr className="border-b border-b-gray-200 w-full">
                  <td className="font-semibold p-4 w-[20%]">Status Menikah</td>
                  <td className="p-4 w-2/3">{peserta!.StatusMenikah || "-"}</td>
                </tr>
                <tr className="border-b border-b-gray-200 w-full">
                  <td className="font-semibold p-4 w-[20%]">Golongan Darah</td>
                  <td className="p-4 w-2/3">{peserta!.GolonganDarah || "-"}</td>
                </tr>
              </table>
            </div>
          </div>
        )}

        {peserta != null && (
          <div className="mt-4 md:mt-6 2xl:mt-7.5 w-full">
            <div className="w-full border border-gray-200 rounded-xl">
              <div className="bg-gray-100 p-4 w-full ">
                <h2 className="font-bold font-calsans text-xl leading-none">
                  Dokumen Kelengkapan atau <br /> Persyaratan Peserta
                </h2>
              </div>
              <table className="w-full">
                <tr className="border-b border-b-gray-200 w-full">
                  <td className="font-semibold p-4 w-[20%]">KTP</td>
                  <td className="p-4 w-2/3">
                    {" "}
                    <Link
                      target="_blank"
                      className="text-blue-500"
                      href={peserta!.Ktp}
                    >
                      {peserta!.Ktp || "-"}
                    </Link>{" "}
                  </td>
                </tr>
                <tr className="border-b border-b-gray-200 w-full">
                  <td className="font-semibold p-4 w-[20%]">Kartu Keluarga</td>
                  <td className="p-4 w-2/3">
                    {" "}
                    <Link
                      target="_blank"
                      className="text-blue-500"
                      href={peserta!.KK}
                    >
                      {peserta!.KK || "-"}
                    </Link>{" "}
                  </td>
                </tr>
                <tr className="border-b border-b-gray-200 w-full">
                  <td className="font-semibold p-4 w-[20%]">Ijazah</td>
                  <td className="p-4 w-2/3">
                    {" "}
                    <Link
                      target="_blank"
                      className="text-blue-500"
                      href={peserta!.Ijazah}
                    >
                      {peserta!.Ijazah || "-"}
                    </Link>{" "}
                  </td>
                </tr>
                <tr className="border-b border-b-gray-200 w-full">
                  <td className="font-semibold p-4 w-[20%]">Surat Kesehatan</td>
                  <td className="p-4 w-2/3">
                    {" "}
                    <Link
                      target="_blank"
                      className="text-blue-500"
                      href={peserta!.SuratKesehatan}
                    >
                      {peserta!.SuratKesehatan || "-"}
                    </Link>{" "}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        )}
      </section>
    </DefaultLayout>
  );
}

export default DetailPeserta;
