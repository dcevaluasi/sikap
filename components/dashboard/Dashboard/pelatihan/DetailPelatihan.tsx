"use client";

import React from "react";
import { BsSendArrowUp } from "react-icons/bs";
import {
  TbBroadcast,
  TbFileCertificate,
  TbListDetails,
  TbSignature,
} from "react-icons/tb";
import TableDataPemberitahuanPelatihan from "../../Pelatihan/TableDataPemberitahuanPelatihan";
import { getNumberFromURLDetailPelatihanAdmin } from "@/utils/pelatihan";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { elautBaseUrl, fileBaseUrl } from "@/constants/urls";
import { PelatihanMasyarakat } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import { generateFullNameBalai, generateTanggalPelatihan } from "@/utils/text";

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
import Toast from "@/components/toast";

const DetailPelatihan: React.FC = () => {
  const [dataPelatihan, setDataPelatihan] =
    React.useState<PelatihanMasyarakat | null>(null);

  const idPelatihan = getNumberFromURLDetailPelatihanAdmin(usePathname());
  const handleFetchPelatihanById = async () => {
    try {
      const response = await axios.get(
        `${elautBaseUrl}/getPelatihanUser?idPelatihan=${idPelatihan}`
      );
      setDataPelatihan(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [passphrase, setPassphrase] = React.useState<string>("");
  const handleTTDElektronik = async () => {
    if (passphrase === "") {
      Toast.fire({
        icon: "error",
        text: "Harap memasukkan passphrase untuk dapat melakukan penandatanganan file sertifikat!",
        title: `Tidak ada passphrase`,
      });
    } else {
      Toast.fire({
        icon: "success",
        text: "Berhasil melakuukan penandatangan sertifikat secara elektronik!",
        title: `Berhasil TTDe`,
      });
    }
  };

  React.useEffect(() => {
    handleFetchPelatihanById();
  }, [idPelatihan]);

  return (
    <>
      <div className="flex flex-col">
        <ul className="flex items-center gap-0 ">
          <li className="inline-flex items-center">
            <Link
              href="#"
              className="text-gray-400 text-sm hover:text-blue-500"
            >
              <svg
                className="w-5 h-auto fill-current  text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
              </svg>
            </Link>

            <span className="mx-2 h-auto text-gray-400 font-medium">/</span>
          </li>

          <li className="inline-flex items-center">
            <Link
              href="/admin/puslat/pelatihan/pemberitahuan-pelatihan"
              className="text-gray-400 text-sm hover:text-blue-500"
            >
              Pemberitahuan Kelas
            </Link>

            <span className="mx-2 h-auto text-gray-400 font-medium">/</span>
          </li>

          <li className="inline-flex items-center">
            <Link href="" className="text-sm text-blue-500">
              {dataPelatihan != null ? dataPelatihan!.NamaPelatihan : "-"}
            </Link>
          </li>
        </ul>
        <h1 className="text-3xl mt-3 max-w-xl font-bold font-calsans leading-[100%]">
          {dataPelatihan != null ? dataPelatihan!.NamaPelatihan : "-"}
        </h1>
        <p className="text-sm text-gray-400 mb-1 mt-1 leading-[110%]">
          {" "}
          {dataPelatihan != null ? dataPelatihan!.KodePelatihan : ""} •{" "}
          {dataPelatihan != null ? dataPelatihan!.BidangPelatihan : ""} •
          Mendukung Program Terobosan{" "}
          {dataPelatihan != null ? dataPelatihan!.DukunganProgramTerobosan : ""}
        </p>

        <div className="flex w-full flex-col gap-2 items-center mt-3">
          {/* Nama Pelatihan */}
          <div className="w-full">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="kodePelatihan"
            >
              Nama Pelatihan <span className="text-red-600">*</span>
            </label>
            <input
              id="tanggalMulaiPelatihan"
              type="text"
              className="form-input w-full text-black border-gray-300 rounded-md"
              required
              readOnly
              min={new Date().toISOString().split("T")[0]}
              placeholder={
                dataPelatihan != null ? dataPelatihan!.NamaPelatihan : "-"
              }
            />
          </div>

          <div className="flex gap-2 w-full">
            <div className="w-full">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="kodePelatihan"
              >
                Kode Pelatihan <span className="text-red-600">*</span>
              </label>
              <input
                id="tanggalMulaiPelatihan"
                type="text"
                className="form-input w-full text-black border-gray-300 rounded-md"
                required
                readOnly
                min={new Date().toISOString().split("T")[0]}
                placeholder={
                  dataPelatihan != null ? dataPelatihan!.KodePelatihan : "-"
                }
              />
            </div>

            <div className="w-full">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="kodePelatihan"
              >
                No Sertifikat <span className="text-red-600">*</span>
              </label>
              <input
                id="tanggalMulaiPelatihan"
                type="text"
                className="form-input w-full text-black border-gray-300 rounded-md"
                required
                readOnly
                min={new Date().toISOString().split("T")[0]}
                placeholder={
                  "B" + dataPelatihan != null
                    ? dataPelatihan!.NoSertifikat
                    : "-"
                }
              />
            </div>
          </div>

          {/* Bidang dan Jenis Pelatihan */}
          <div className="flex gap-2 w-full">
            <div className="w-full">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="kodePelatihan"
              >
                Bidang Pelatihan <span className="text-red-600">*</span>
              </label>
              <input
                id="tanggalMulaiPelatihan"
                type="text"
                className="form-input w-full text-black border-gray-300 rounded-md"
                required
                readOnly
                min={new Date().toISOString().split("T")[0]}
                placeholder={
                  dataPelatihan != null ? dataPelatihan!.BidangPelatihan : "-"
                }
              />
            </div>

            <div className="w-full">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="kodePelatihan"
              >
                Jenis Pelatihan <span className="text-red-600">*</span>
              </label>
              <input
                id="tanggalMulaiPelatihan"
                type="text"
                className="form-input w-full text-black border-gray-300 rounded-md"
                required
                readOnly
                min={new Date().toISOString().split("T")[0]}
                placeholder={
                  dataPelatihan != null ? dataPelatihan!.JenisPelatihan : "-"
                }
              />
            </div>
          </div>

          {/* Waktu dan Lokasi Pelatihan */}
          <div className="flex gap-2 w-full">
            <div className="w-full">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="kodePelatihan"
              >
                Lokasi Pelatihan <span className="text-red-600">*</span>
              </label>
              <input
                id="tanggalMulaiPelatihan"
                type="text"
                className="form-input w-full text-black border-gray-300 rounded-md"
                required
                readOnly
                min={new Date().toISOString().split("T")[0]}
                placeholder={
                  dataPelatihan != null ? dataPelatihan!.LokasiPelatihan : "-"
                }
              />
            </div>

            <div className="w-full">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="waktuPelatihan"
              >
                Waktu Pelatihan <span className="text-red-600">*</span>
              </label>
              <input
                id="waktuPelatihan"
                type="text"
                className="form-input w-full text-black border-gray-300 rounded-md"
                required
                readOnly
                min={new Date().toISOString().split("T")[0]}
                placeholder={
                  dataPelatihan != null
                    ? generateTanggalPelatihan(
                        dataPelatihan!.TanggalMulaiPelatihan
                      ) +
                      " - " +
                      generateTanggalPelatihan(
                        dataPelatihan!.TanggalBerakhirPelatihan
                      )
                    : "-"
                }
              />
            </div>
          </div>

          {/* Penyelenggara Pelatihan */}
          <div className="flex gap-2 w-full">
            <div className="w-full">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="penyelenggaraPelatihan"
              >
                Penyelenggara Pelatihan <span className="text-red-600">*</span>
              </label>
              <input
                id="penyelenggaraPelatihan"
                type="text"
                className="form-input w-full text-black border-gray-300 rounded-md"
                required
                readOnly
                min={new Date().toISOString().split("T")[0]}
                placeholder={
                  dataPelatihan != null
                    ? dataPelatihan!.PenyelenggaraPelatihan +
                      " - " +
                      generateFullNameBalai(
                        dataPelatihan!.PenyelenggaraPelatihan
                      )
                    : "-"
                }
              />
            </div>

            <div className="w-full">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="asalPesertaPelatihan"
              >
                Asal Peserta Pelatihan <span className="text-red-600">*</span>
              </label>
              <input
                id="asalPesertaPelatihan"
                type="text"
                className="form-input w-full text-black border-gray-300 rounded-md"
                required
                readOnly
                min={new Date().toISOString().split("T")[0]}
                placeholder={
                  dataPelatihan != null ? dataPelatihan!.AsalPelatihan : "-"
                }
              />
            </div>
          </div>

          {/* Penyelenggara Pelatihan */}
          <div className="w-full">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="dukunganProgramTerobosan"
            >
              Dukungan Program Terobosan <span className="text-red-600">*</span>
            </label>
            <input
              id="dukunganProgramTerobosan"
              type="text"
              className="form-input w-full text-black border-gray-300 rounded-md"
              required
              readOnly
              min={new Date().toISOString().split("T")[0]}
              placeholder={
                dataPelatihan != null
                  ? dataPelatihan!.DukunganProgramTerobosan
                  : "-"
              }
            />
          </div>

          {/* Penyelenggara Pelatihan */}
          <div className="w-full">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="dukunganProgramTerobosan"
            >
              TTD Sertifikat <span className="text-red-600">*</span>
            </label>
            <input
              id="dukunganProgramTerobosan"
              type="text"
              className="form-input w-full text-black border-gray-300 rounded-md"
              required
              readOnly
              min={new Date().toISOString().split("T")[0]}
              placeholder={
                dataPelatihan != null ? dataPelatihan!.TtdSertifikat : "-"
              }
            />
          </div>

          {/* Surat Pemberitahuan Pelatihan */}
          <div className="w-full">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="suratPemberitahuan"
            >
              Surat Pemberitahuan Pelaksanaan Pelatihan
              <span className="text-red-600">*</span>
            </label>
            <Link
              href={
                dataPelatihan != null
                  ? dataPelatihan!.SuratPemberitahuan != ""
                    ? fileBaseUrl +
                      "/suratPemberitahuan/" +
                      dataPelatihan!.SuratPemberitahuan
                    : "-"
                  : "-"
              }
              target="_blank"
              className="text-blue-500 underline"
            >
              {dataPelatihan != null
                ? dataPelatihan!.SuratPemberitahuan != ""
                  ? fileBaseUrl +
                    "/suratPemberitahuan/" +
                    dataPelatihan!.SuratPemberitahuan
                  : "File tidak tersedia"
                : "File tidak Tersesdia"}
            </Link>
          </div>

          {/* Surat Pemberitahuan Pelatihan */}
          <div className="w-full">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="suratPemberitahuan"
            >
              Berita Acara Pelaksanaan Pelatihan
              <span className="text-red-600">*</span>
            </label>
            <Link
              href={
                dataPelatihan != null
                  ? dataPelatihan!.BeritaAcara != ""
                    ? fileBaseUrl + "/beritaAcara/" + dataPelatihan!.BeritaAcara
                    : "-"
                  : "-"
              }
              className="text-blue-500 underline"
              target="_blank"
            >
              {dataPelatihan != null
                ? dataPelatihan!.BeritaAcara != ""
                  ? fileBaseUrl + "/beritaAcara/" + dataPelatihan!.BeritaAcara
                  : "File tidak tersedia"
                : "File tidak Tersesdia"}
            </Link>
          </div>

          {/* Catatan Pemberitahuann Pelatihan */}
          <div className="w-full">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="catatan"
            >
              Catatan <span className="text-red-600">*</span>
            </label>
            <textarea
              id="catatan"
              className="form-input w-full text-black border-gray-300 rounded-md"
              required
              rows={6}
              placeholder={"Masukkan catatan dari pusat"}
            ></textarea>
          </div>

          <AlertDialog>
            <AlertDialogTrigger>
              {" "}
              <button
                type="submit"
                className={`btn text-white w-full ${"bg-blue-500 hover:bg-blue-600"} w-full`}
              >
                Terbitkan Sertifikat Pelatihan
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className="flex flex-col gap-1">
                  <AlertDialogTitle className="flex items-center gap-2">
                    {" "}
                    <TbSignature className="text-3xl" />
                    Passphrase/OTP
                  </AlertDialogTitle>
                  <p className="-mt-1 text-gray-500 text-sm leading-[110%] w-full">
                    Masukkan passphrase anda untuk melanjutkan proses
                    penandatanganan pada sertifikat yang akan diterbitkan
                  </p>
                </div>
              </AlertDialogHeader>
              <fieldset>
                <form autoComplete="off">
                  <div className="flex flex-wrap -mx-3 mb-1 -mt-2">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Passphrase
                      </label>
                      <div className="flex gap-1">
                        <input
                          type="password"
                          className=" text-black h-10 text-base flex items-center cursor-pointer w-full border border-neutral-200 rounded-md"
                          required
                          autoComplete="off"
                          value={passphrase}
                          onChange={(e) => setPassphrase(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <AlertDialogFooter className="mt-3">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={(e) => handleTTDElektronik()}>
                      TTD
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </form>
              </fieldset>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
};

export default DetailPelatihan;
