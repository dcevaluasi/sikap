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
import { TbSchool } from "react-icons/tb";
import {
  IoIosBook,
  IoIosInformationCircle,
  IoMdBook,
  IoMdClose,
  IoMdGlobe,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import { FiUploadCloud } from "react-icons/fi";

import { usePathname, useRouter } from "next/navigation";
import { MdOutlineSaveAlt } from "react-icons/md";
import FormPelatihan from "../admin/formPelatihan";

import { convertDate } from "@/utils";
import Cookies from "js-cookie";
import { Progress } from "@/components/ui/progress";
import { DialogTemplateSertifikatPelatihan } from "@/components/sertifikat/dialogTemplateSertifikatPelatihan";
import Link from "next/link";
import { elautBaseUrl } from "@/constants/urls";

import { FaBookOpen } from "react-icons/fa6";
import axios from "axios";
import { PelatihanMasyarakat } from "@/types/product";
import { generateFullNameBalai, generateTanggalPelatihan } from "@/utils/text";
import { generateInstrukturName } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import Toast from "@/components/toast";
import { MateriButton, PublishButton } from "./Actions";
import DeleteButton from "./Actions/DeleteButton";
import CloseButton from "./Actions/CloseButton";
import UploadSuratButton from "./Actions/UploadSuratButton";
import GenerateNoSertifikatButton from "./Actions/GenerateNoSertifikatButton";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function DetailPelatihan() {
  const paths = usePathname().split("/");
  const idPelatihan = paths[paths.length - 1];
  const kodePelatihan = paths[paths.length - 2];
  const [pelatihan, setPelatihan] = React.useState<PelatihanMasyarakat | null>(
    null
  );
  const handleFetchDetailPelatihan = async () => {
    try {
      const response = await axios.get(
        `${elautBaseUrl}/getPelatihanUser?idPelatihan=${idPelatihan}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF091")}`,
          },
        }
      );
      setPelatihan(response.data);
      console.log({ response });
    } catch (error) {
      console.error("LEMDIK INFO: ", error);
    }
  };

  React.useEffect(() => {
    handleFetchDetailPelatihan();
  }, []);

  return (
    <section className="">
      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-2 items-center">
          <header
            aria-label="page caption"
            className="flex-row w-full flex h-20 items-center gap-2 bg-gray-100 border-t px-4"
          >
            <TbSchool className="text-3xl" />
            <div className="flex flex-col">
              <h1 id="page-caption" className="font-semibold text-lg">
                Database Pelatihan
              </h1>
              <p className="font-medium text-gray-400 text-base">
                Tambahkan data pelatihan yang ada di lembaga diklat mu!
              </p>
            </div>
          </header>
        </div>
      </div>

      <div className="flex flex-col m-3">
        <div className="flex flex-row gap-2 items-end justify-between pb-4 border-b border-b-gray-200">
          {/* ACTIONS */}
          {pelatihan != null && (
            <div className={`w-fit flex items-center justify-center gap-1`}>
              <MateriButton
                idPelatihan={idPelatihan}
                handleFetchingData={handleFetchDetailPelatihan}
              />

              <DeleteButton
                idPelatihan={idPelatihan}
                pelatihan={pelatihan}
                handleFetchingData={handleFetchDetailPelatihan}
              />

              <CloseButton
                idPelatihan={idPelatihan}
                statusPelatihan={pelatihan?.StatusApproval ?? ""}
                handleFetchingData={handleFetchDetailPelatihan}
              />

              <Link
                href={`/admin/pusat/pelatihan/${pelatihan.KodePelatihan}/peserta-pelatihan/${pelatihan.IdPelatihan}`}
                className="  shadow-sm bg-green-400 hover:bg-green-400 text-neutral-100  hover:text-neutral-100 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
              >
                <HiUserGroup className="h-5 w-5 mr-1" />
                Peserta Pelatihan
              </Link>

              <GenerateNoSertifikatButton
                idPelatihan={idPelatihan}
                pelatihan={pelatihan!}
                handleFetchingData={handleFetchDetailPelatihan}
              />

              <PublishButton
                statusPelatihan={pelatihan?.Status ?? ""}
                idPelatihan={idPelatihan}
                handleFetchingData={handleFetchDetailPelatihan}
              />

              <UploadSuratButton
                idPelatihan={idPelatihan}
                handleFetchingData={handleFetchDetailPelatihan}
                suratPemberitahuan={pelatihan?.SuratPemberitahuan ?? ""}
              />
            </div>
          )}
        </div>
      </div>

      {pelatihan != null && (
        <div className="px-4 w-full">
          <div className="w-full border border-gray-200 rounded-xl">
            <div className="bg-gray-100 p-4 w-full ">
              <h2 className="font-bold font-calsans text-xl">
                Informasi Pelatihan
              </h2>
            </div>
            <table className="w-full">
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">Judul</td>
                <td className="p-4 w-2/3">{pelatihan!.NamaPelatihan || ""}</td>
              </tr>
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">Kode Pelatihan</td>
                <td className="p-4 w-2/3">{pelatihan!.KodePelatihan || ""}</td>
              </tr>
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">
                  Penyelenggara Pelatihan
                </td>
                <td className="p-4 w-2/3">
                  {generateFullNameBalai(pelatihan!.PenyelenggaraPelatihan) ||
                    ""}{" "}
                  ({pelatihan!.PenyelenggaraPelatihan || ""})
                </td>
              </tr>
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">Lokasi Pelatihan</td>
                <td className="p-4 w-2/3">
                  {pelatihan!.LokasiPelatihan || ""}
                </td>
              </tr>
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">Waktu Pelaksanaan</td>
                <td className="p-4 w-2/3">
                  {pelatihan.TanggalMulaiPelatihan !== "" &&
                  pelatihan.TanggalBerakhirPelatihan !== "" ? (
                    <>
                      {generateTanggalPelatihan(
                        pelatihan.TanggalMulaiPelatihan
                      )}{" "}
                      s.d.{" "}
                      {generateTanggalPelatihan(
                        pelatihan.TanggalBerakhirPelatihan
                      )}
                    </>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">
                  Metode Pelaksanaan
                </td>
                <td className="p-4 w-2/3">
                  {pelatihan!.PelaksanaanPelatihan || ""}
                </td>
              </tr>
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">
                  Dukungan Program Terobosan
                </td>
                <td className="p-4 w-2/3">
                  {pelatihan!.DukunganProgramTerobosan || ""}
                </td>
              </tr>
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">Jenis Pelatihan</td>
                <td className="p-4 w-2/3">{pelatihan!.JenisPelatihan || ""}</td>
              </tr>
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">Bidang Pelatihan</td>
                <td className="p-4 w-2/3">
                  {pelatihan!.BidangPelatihan || ""}
                </td>
              </tr>
            </table>
          </div>
        </div>
      )}

      {pelatihan != null && (
        <Card className="mt-4 md:mt-6 2xl:mt-7.5 w-full">
          <div className="w-full border border-gray-200 rounded-xl">
            <div className="bg-gray-100 p-4 w-full ">
              <h2 className="font-bold font-calsans text-xl">
                Informasi Pendaftaran
              </h2>
            </div>
            <table className="w-full">
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">
                  Tanggal Pendaftaran
                </td>
                <td className="p-4 w-2/3">
                  {generateTanggalPelatihan(pelatihan.TanggalMulaiPendaftaran)}{" "}
                  s.d.{" "}
                  {generateTanggalPelatihan(pelatihan!.TanggalAkhirPendaftaran)}
                </td>
              </tr>
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">Tarif Pelatihan</td>
                <td className="p-4 w-2/3">
                  Rp. {pelatihan!.HargaPelatihan || ""}
                </td>
              </tr>
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">Asal Peserta</td>
                <td className="p-4 w-2/3">{pelatihan!.AsalPelatihan}</td>
              </tr>
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">Kuota Peserta</td>
                <td className="p-4 w-2/3">{pelatihan!.KoutaPelatihan}</td>
              </tr>
            </table>
          </div>
        </Card>
      )}

      {pelatihan != null && (
        <div className="mt-4 md:mt-6 2xl:mt-7.5 w-full">
          <div className="w-full border border-gray-200 rounded-xl">
            <div className="bg-gray-100 p-4 w-full ">
              <h2 className="font-bold font-calsans text-xl">
                Informasi Teknis Pelatihan
              </h2>
            </div>
            <table className="w-full">
              <tr className="border-b border-b-gray-200 w-full ">
                <td className="font-semibold p-4 w-[20%] h-fit flex">
                  Instruktur
                </td>
                <td className="p-4 w-2/3">
                  {pelatihan.Instruktur != "" ? (
                    <div className="flex flex-col gap-1">
                      {generateInstrukturName(pelatihan.Instruktur).map(
                        (instruktur, index) => (
                          <span key={index}>
                            {index + 1}. {instruktur}
                          </span>
                        )
                      )}
                    </div>
                  ) : (
                    <>-</>
                  )}
                </td>
              </tr>
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%] flex">
                  Materi Pelatihan
                </td>
                <td className="p-4 w-2/3">
                  {pelatihan!.MateriPelatihan.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {pelatihan!.MateriPelatihan.map((materi, index) => (
                        <span key={index}>
                          {index + 1}. {materi.NamaMateri}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <>-</>
                  )}
                </td>
              </tr>
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">
                  Silabus/Modul/Bahan Ajar Pelatihan
                </td>
                <td className="p-4 w-2/3">
                  <Link
                    target="_blank"
                    className="text-blue-500 underline"
                    href={`https://elaut-bppsdm.kkp.go.id/api-elaut/public/silabus/pelatihan/${
                      pelatihan!.SilabusPelatihan
                    }`}
                  >
                    {pelatihan!.SilabusPelatihan}
                  </Link>
                </td>
              </tr>
              {pelatihan?.UjiKompotensi == "Portfolio" ? (
                <></>
              ) : (
                <tr className="border-b border-b-gray-200 w-full">
                  <td className="font-semibold p-4 w-[20%]">
                    Bank Soal Pelatihan
                  </td>
                  <td className="p-4 w-2/3">
                    <Link
                      target="_blank"
                      className="text-blue-500 underline flex gap-2 items-center"
                      href={`/admin/lemdiklat/pelatihan/${
                        pelatihan!.KodePelatihan
                      }/bank-soal/${pelatihan!.IdPelatihan}`}
                    >
                      <FiUploadCloud />
                      Upload Bank Soal
                    </Link>
                  </td>
                </tr>
              )}
            </table>
          </div>
        </div>
      )}

      {pelatihan != null && (
        <div className="mt-4 md:mt-6 2xl:mt-7.5 w-full">
          <div className="w-full border border-gray-200 rounded-xl">
            <div className="bg-gray-100 p-4 w-full ">
              <h2 className="font-bold font-calsans text-xl">
                Informasi Penerbitan Sertifikat
              </h2>
            </div>
            <table className="w-full">
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">Jenis Sertifikat</td>
                <td className="p-4 w-2/3">{pelatihan!.JenisSertifikat}</td>
              </tr>
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">
                  Penandatangan Sertifikat
                </td>
                <td className="p-4 w-2/3">
                  {pelatihan!.TtdSertifikat == ""
                    ? "-"
                    : pelatihan!.TtdSertifikat}
                </td>
              </tr>
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">No Sertifikat</td>
                <td className="p-4 w-2/3">
                  {pelatihan!.NoSertifikat == ""
                    ? "-"
                    : pelatihan!.NoSertifikat}
                </td>
              </tr>
              <tr className="border-b border-b-gray-200 w-full">
                <td className="font-semibold p-4 w-[20%]">Status Penerbitan</td>
                <td className="p-4 w-2/3">
                  {pelatihan!.PemberitahuanDiterima == ""
                    ? "-"
                    : pelatihan!.PemberitahuanDiterima}
                </td>
              </tr>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default DetailPelatihan;
