"use client";

import Toast from "@/components/toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

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
import Image from "next/image";
import {
  TbBox,
  TbFileStack,
  TbMapPinSearch,
  TbMoneybag,
  TbUserEdit,
} from "react-icons/tb";

import { Progress } from "@/components/ui/progress";
import { MdWorkOutline } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import {
  BalaiPelatihanBank,
  PelatihanMasyarakat,
  Sarpras,
} from "@/types/product";
import { formatToRupiah } from "@/lib/utils";
import { HiMiniUserGroup } from "react-icons/hi2";
import Link from "next/link";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { hitungHariPelatihan } from "@/utils/pelatihan";
import { Button } from "@/components/ui/button";
import { elautBaseUrl } from "@/constants/urls";

function FormRegistrationTraining({
  id,
  harga,
  pelatihan,
}: {
  id: number;
  harga: string;
  pelatihan: PelatihanMasyarakat;
}) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This smooth scrolling is optional, you can remove it if you want instant scrolling
    });
  };

  const [isInputError, setIsInputError] = React.useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const token = Cookies.get("XSRF081");
  const router = useRouter();

  const [totalBayar, setTotalBayar] = React.useState(0);

  const [fileBuktiBayar, setFileBuktiBayar] = React.useState<File | null>(null);
  const handleFileChangeBuktiBayar = (e: any) => {
    setFileBuktiBayar(e.target.files[0]);
  };

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
    formData.append("IdPelatihan", "0");
    if (fileExcelPesertaPelatihan != null) {
      formData.append("file", fileExcelPesertaPelatihan);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/exportPesertaPelatihan`,
        formData
      );
      console.log("FILE UPLOADED PESERTA : ", response);
      Toast.fire({
        icon: "success",
        title: `Selamat anda berhasil mengupload peserta pelatihan!`,
      });
      setIsOpenFormPeserta(!isOpenFormPeserta);
    } catch (error) {
      console.log("FILE IMPORT PESERTA PELATIHAN : ", error);
      Toast.fire({
        icon: "error",
        title: `Gagal mengupload peserta pelatihan!`,
      });
    }
  };

  const [balaiPelatihanBank, setBalaiPelatihanBank] = React.useState<
    BalaiPelatihanBank[]
  >([]);
  const handleFetchAllBalaiPelatihanBank = async () => {
    try {
      const response = await axios.get(`${elautBaseUrl}/lemdik/getBankLemdik`);
      setBalaiPelatihanBank(response.data.data);
      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleRegistrationTrainingForPeople = async (e: any) => {
    e.preventDefault();
    const totalBayarPeserta =
      selectedKonsumsi != null && selectedPenginapan != null
        ? parseInt(harga) + selectedKonsumsi.Harga + selectedPenginapan.Harga
        : selectedKonsumsi != null
        ? parseInt(harga) + selectedKonsumsi.Harga
        : selectedPenginapan != null
        ? parseInt(harga) + selectedPenginapan.Harga
        : pelatihan?.HargaPelatihan;

    if (Cookies.get("isManningAgent")) {
      setIsOpenFormPeserta(!isOpenFormPeserta);
    } else {
      try {
        const response: AxiosResponse = await axios.post(
          `${baseUrl}/users/addPelatihan`,
          JSON.stringify({
            IdPelatihan: id.toString(),
            TotalBayar: totalBayarPeserta.toString(),
            NamaPelatihan: pelatihan?.NamaPelatihan,
            BidangPelatihan: pelatihan?.BidangPelatihan,
            DetailPelatihan: pelatihan?.DetailPelatihan,
            StatusAproval: pelatihan?.StatusApproval,
            bukti_bayar: fileBuktiBayar
          }),
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        Toast.fire({
          icon: "success",
          title: `Berhasil melakukan pendaftaran, tunggu kabar selanjutnya sobat ELAUT!`,
        });
        console.log({ response });
        setIsOpenFormPembayaran(!isOpenFormPembayaran);
        router.push("/dashboard");
      } catch (error) {
        console.error({ error });
        Toast.fire({
          icon: "error",
          title: "Anda telah mendaftar pelatihan ini sebelumnya!",
        });
      }
    }
  };

  const [formTab, setFormTab] = React.useState("FormFasilitas");
  const [indexFormTab, setIndexFormTab] = React.useState(0);

  const [isTakeFacilityHome, setIsTakeFacilityHome] = React.useState(false);
  const [isTakeFacilityFood, setIsTakeFacilityFood] = React.useState(false);

  const [selectedPenginapan, setSelectedPenginapan] =
    React.useState<Sarpras | null>(null);
  const [selectedKonsumsi, setSelectedKonsumsi] =
    React.useState<Sarpras | null>(null);

  const handleCheckboxChange = (item: Sarpras) => {
    if (item.Jenis === "Penginapan") {
      if (selectedPenginapan === item) {
        // Uncheck Penginapan if already selected
        setSelectedPenginapan(null);
      } else {
        // Select Penginapan and clear Konsumsi
        setSelectedPenginapan(item);
      }
    } else if (item.Jenis === "Konsumsi") {
      if (selectedKonsumsi === item) {
        // Uncheck Konsumsi if already selected
        setSelectedKonsumsi(null);
      } else {
        // Select Konsumsi and clear Penginapan
        setSelectedKonsumsi(item);
      }
    }
  };

  const FormPesertaPelatihan = () => {
    return (
      <form
        autoComplete="off"
        className={`${
          indexFormTab == 1 && Cookies.get("isManningAgent")
            ? "block"
            : "hidden"
        }`}
      >
        {/* Penginapan Section */}
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="penginapan"
            >
              Pilih Paket Fasilitas Penginapan{" "}
            </label>
            <div className="flex flex-col gap-2">
              {pelatihan.SarprasPelatihan.length == 0 ? (
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <div className="space-y-1 leading-none">
                    <label>Fasilitas Penginapan Tidak Tersedia</label>
                    <p className="text-xs text-gray-600">
                      Dalam mendukung kegiatan pelatihan ini, balai pelatihan
                      tidak menyediakan fasilitas penginapan
                    </p>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {pelatihan.SarprasPelatihan.filter(
                (item) => item.Jenis === "Penginapan"
              ).map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow"
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedPenginapan === item}
                      onChange={() => handleCheckboxChange(item)}
                    />
                  </div>
                  <div className="space-y-1 leading-none">
                    <label>
                      {item.NamaSarpras} ({formatToRupiah(item.Harga)})
                    </label>
                    <p className="text-xs text-gray-600">{item.Deskripsi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Konsumsi Section */}
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="konsumsi"
            >
              Pilih Paket Konsumsi atau Catering{" "}
            </label>
            <div className="flex flex-col gap-2">
              {pelatihan.SarprasPelatihan.filter(
                (item) => item.Jenis === "Konsumsi"
              ).map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow"
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedKonsumsi === item}
                      onChange={() => handleCheckboxChange(item)}
                    />
                  </div>
                  <div className="space-y-1 leading-none">
                    <label>
                      {item.NamaSarpras} ({formatToRupiah(item.Harga)})
                    </label>
                    <p className="text-xs text-gray-600">{item.Deskripsi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    );
  };

  const FormFasilitas = () => {
    return (
      <form
        autoComplete="off"
        className={`${indexFormTab == 0 ? "block" : "hidden"}`}
      >
        {/* Penginapan Section */}
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="penginapan"
            >
              Pilih Paket Fasilitas Penginapan{" "}
              <span className="text-red-600"></span>
            </label>
            <div className="flex flex-col gap-2">
              {pelatihan.SarprasPelatihan.length === 0 ||
              pelatihan.SarprasPelatihan.filter(
                (item) => item.Jenis === "Penginapan"
              ).length === 0 ? (
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <div className="space-y-1 leading-none">
                    <label>Fasilitas Penginapan Tidak Tersedia</label>
                    <p className="text-xs text-gray-600">
                      Dalam mendukung kegiatan pelatihan ini, balai pelatihan
                      tidak menyediakan fasilitas penginapan
                    </p>
                  </div>
                </div>
              ) : (
                pelatihan.SarprasPelatihan.filter(
                  (item) => item.Jenis === "Penginapan"
                ).map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow"
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedPenginapan === item}
                        onChange={() => handleCheckboxChange(item)}
                      />
                    </div>
                    <div className="space-y-1 leading-none">
                      <label>
                        {item.NamaSarpras} ({formatToRupiah(item.Harga)})
                      </label>
                      <p className="text-xs text-gray-600">{item.Deskripsi}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Konsumsi Section */}
        <div className="flex flex-wrap -mx-3 mb-1 mt-4">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="konsumsi"
            >
              Pilih Paket Konsumsi atau Catering{" "}
            </label>
            <div className="flex flex-col gap-2">
              {pelatihan.SarprasPelatihan.length === 0 ||
              pelatihan.SarprasPelatihan.filter(
                (item) => item.Jenis === "Konsumsi"
              ).length === 0 ? (
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <div className="space-y-1 leading-none">
                    <label>Fasilitas Konsumsi Tidak Tersedia</label>
                    <p className="text-xs text-gray-600">
                      Dalam mendukung kegiatan pelatihan ini, balai pelatihan
                      tidak menyediakan fasilitas atau paket konsumsi
                    </p>
                  </div>
                </div>
              ) : (
                pelatihan.SarprasPelatihan.filter(
                  (item) => item.Jenis === "Konsumsi"
                ).map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow"
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedKonsumsi === item}
                        onChange={() => handleCheckboxChange(item)}
                      />
                    </div>
                    <div className="space-y-1 leading-none">
                      <label>
                        {item.NamaSarpras} ({formatToRupiah(item.Harga)})
                      </label>
                      <p className="text-xs text-gray-600">{item.Deskripsi}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </form>
    );
  };

  console.log({ selectedKonsumsi });

  const [isAgreeWithAggreement, setIsAgreeWithAgreement] =
    React.useState<boolean>(false);

  const FormPembayaran = () => {
    return (
      <form
        autoComplete="off"
        className={`${indexFormTab == 1 ? "block" : "hidden"}`}
      >
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Rincian Harga <span className="text-red-600"></span>
            </label>
            <Select>
              <SelectTrigger className="w-full text-base py-14 flex items-center justify-between">
                <div className="flex flex-col items-start gap-1 w-full">
                  <p className="font-medium font-calsans text-lg text-left">
                    Pelatihan
                  </p>
                  <p className="text-left">{pelatihan.NamaPelatihan}</p>
                  <p className="font-medium text-lg font-calsans">
                    {formatToRupiah(pelatihan.HargaPelatihan)}
                  </p>
                </div>

                <p className="font-medium text-2xl w-fit font-calsans">
                  {formatToRupiah(pelatihan.HargaPelatihan)}
                </p>
              </SelectTrigger>
            </Select>
            {selectedPenginapan != null && (
              <Select>
                <SelectTrigger className="w-full text-base flex items-center justify-between  py-16 mt-2">
                  <div className="flex w-full flex-col items-start gap-1">
                    <p className="font-medium font-calsans text-lg text-left">
                      Penginapan
                    </p>
                    <p className="text-left">
                      {selectedPenginapan?.NamaSarpras!}
                    </p>
                    <p className="font-medium text-lg font-calsans">
                      {formatToRupiah(selectedPenginapan?.Harga!)} x
                      {hitungHariPelatihan(
                        pelatihan?.TanggalMulaiPelatihan,
                        pelatihan?.TanggalBerakhirPelatihan
                      )}{" "}
                      Hari{" "}
                    </p>
                  </div>

                  <p className="font-medium text-2xl w-fit font-calsans">
                    {formatToRupiah(
                      selectedPenginapan?.Harga! *
                        hitungHariPelatihan(
                          pelatihan?.TanggalMulaiPelatihan,
                          pelatihan?.TanggalBerakhirPelatihan
                        ) -
                        1
                    )}
                  </p>
                </SelectTrigger>
              </Select>
            )}
            {selectedKonsumsi != null && (
              <Select>
                <SelectTrigger className="w-full text-base py-16 mt-2 flex items-center justify-between">
                  <div className="flex flex-col items-start gap-1 w-full">
                    <p className="font-medium font-calsans text-lg text-left">
                      Konsumsi
                    </p>
                    <p className="text-left">
                      {selectedKonsumsi?.NamaSarpras!}
                    </p>
                    <p className="font-medium text-lg font-calsans">
                      {formatToRupiah(selectedKonsumsi?.Harga!)} x{" "}
                      {hitungHariPelatihan(
                        pelatihan?.TanggalMulaiPelatihan,
                        pelatihan?.TanggalBerakhirPelatihan
                      )}{" "}
                      Hari{" "}
                    </p>
                  </div>

                  <p className="font-medium text-2xl w-fit font-calsans">
                    {formatToRupiah(
                      selectedKonsumsi?.Harga! *
                        hitungHariPelatihan(
                          pelatihan?.TanggalMulaiPelatihan,
                          pelatihan?.TanggalBerakhirPelatihan
                        )
                    )}
                  </p>
                </SelectTrigger>
              </Select>
            )}

            <div className="h-1 w-full rounded-full my-2 bg-blue-500"></div>
            <div className="flex items-center justify-between">
              <p className="font-bold text-lg">Total</p>
              <p className="font-bold text-blue-500 text-3xl">
                {selectedKonsumsi != null && selectedPenginapan != null
                  ? formatToRupiah(
                      parseInt(harga) +
                        selectedKonsumsi.Harga *
                          hitungHariPelatihan(
                            pelatihan.TanggalMulaiPelatihan,
                            pelatihan.TanggalBerakhirPelatihan
                          ) +
                        selectedPenginapan.Harga *
                          hitungHariPelatihan(
                            pelatihan.TanggalMulaiPelatihan,
                            pelatihan.TanggalBerakhirPelatihan
                          )
                    )
                  : selectedKonsumsi != null
                  ? formatToRupiah(
                      parseInt(harga) +
                        selectedKonsumsi.Harga *
                          hitungHariPelatihan(
                            pelatihan.TanggalMulaiPelatihan,
                            pelatihan.TanggalBerakhirPelatihan
                          )
                    )
                  : selectedPenginapan != null
                  ? formatToRupiah(
                      parseInt(harga) +
                        selectedPenginapan.Harga *
                          hitungHariPelatihan(
                            pelatihan.TanggalMulaiPelatihan,
                            pelatihan.TanggalBerakhirPelatihan
                          )
                    )
                  : formatToRupiah(parseInt(harga))}
              </p>
            </div>
            <div className="flex items-center space-x-2 py-3 mt-5">
              <Checkbox
                id="terms"
                checked={isAgreeWithAggreement}
                onCheckedChange={(e) =>
                  setIsAgreeWithAgreement(!isAgreeWithAggreement)
                }
              />
              <label
                htmlFor="terms"
                className="text-base  peer-disabled:cursor-not-allowed text-gray-500 peer-disabled:opacity-70"
              >
                Dengan melakukan pendaftaran, saya setuju dengan Kebijakan{" "}
                <span className="text-blue-500 font-bold">Privasi</span> dan{" "}
                <span className="text-blue-500 font-bold">
                  Syarat & Ketentuan
                </span>{" "}
                Kementrian Kelautan dan Perikanan Republik Indonesia
              </label>
            </div>
          </div>
        </div>
      </form>
    );
  };

  const [isOpenFormPembayaran, setIsOpenFormPembayaran] =
    React.useState<boolean>(false);

  const [metodePembayaran, setMetodePembayaran] = React.useState<string>("");
  React.useEffect(() => {
    handleFetchAllBalaiPelatihanBank();
  }, []);

  return (
    <section className="relative w-full -mt-5">
      <AlertDialog open={isOpenFormPeserta}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {" "}
              <HiMiniUserGroup className="h-4 w-4" />
              Import Peserta Pelatihan
            </AlertDialogTitle>
            <AlertDialogDescription className="-mt-2">
              Import peserta yang akan mengikuti pelatihan ini!
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

      <div className="max-w-6xl md:max-w-[81rem]  md:-mt-8">
        <div className="pb-12 md:pb-20">
          {/* Form */}
          <div className="max-w-sm md:max-w-7xl mx-auto mt-5 md:mt-10">
            <div className="flex items-center justify-between">
              {indexFormTab == 0 ? (
                <h2 className="font-bold text-2xl md:text-3xl leading-[100%] my-6 text-black font-calsans flex items-center gap-1">
                  <TbBox />
                  <span className="mt-2">Pilih Fasilitas</span>
                </h2>
              ) : (
                <h2 className="font-bold text-2xl leading-[100%] my-6 md:text-2xl text-black font-calsans flex items-center gap-1">
                  <TbMoneybag />
                  <span className="mt-2">Pembayaran</span>
                </h2>
              )}

              <p className="text-base">
                {indexFormTab == 0 ? (
                  <span className="font-bold  leading-[100%] my-6 text-blue-500 ">
                    1
                  </span>
                ) : (
                  <span className="font-bold  leading-[100%] my-6 text-blue-500 ">
                    2
                  </span>
                )}{" "}
                of 2
              </p>
            </div>
            <div className="flex w-full -mt-2 mb-4">
              <Progress value={(indexFormTab + 1) * 50} max={2} />
            </div>
            <FormFasilitas />
            <FormPembayaran />
            <div className="flex  -mx-3 mt-5 gap-2 px-3">
              <div className={`w-full ${indexFormTab == 0 && "hidden"}`}>
                <button
                  type="submit"
                  className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                  onClick={(e) => {
                    setIndexFormTab(indexFormTab - 1);
                    scrollToTop();
                  }}
                >
                  Sebelumnya
                </button>
              </div>
              <div
                className={`w-full ${indexFormTab == 1 ? "hidden" : "block"}`}
              >
                <button
                  type="submit"
                  className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                  onClick={(e) => {
                    setIndexFormTab(indexFormTab + 1);
                    scrollToTop();
                  }}
                >
                  Selanjutnya
                </button>
              </div>

              {isAgreeWithAggreement && (
                <div
                  className={`w-full ${indexFormTab == 1 ? "block" : "hidden"}`}
                >
                  {pelatihan?.JenisPelatihan == "PNBP/BLU" ? (
                    <AlertDialog
                      open={isOpenFormPembayaran}
                      onOpenChange={setIsOpenFormPembayaran}
                    >
                      <AlertDialogTrigger className="w-full">
                        <button
                          onClick={(e) =>
                            setIsOpenFormPembayaran(!isOpenFormPembayaran)
                          }
                          className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                        >
                          Daftar
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Pembayaran Pelatihan
                            </AlertDialogTitle>
                            <AlertDialogDescription className="-mt-2">
                              Lakukan pembayaran untuk menyelesaikan rangkaian
                              registrasi pelatihan ini segera!
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <fieldset>
                            <div className="flex flex-wrap  mb-1 w-full">
                              <div className="w-full">
                                <label
                                  className="block text-gray-800 text-sm font-medium mb-1"
                                  htmlFor="noSertifikat"
                                >
                                  Metode Pembayaran{" "}
                                  <span className="text-red-600">*</span>
                                </label>
                                <select
                                  name=""
                                  id=""
                                  onChange={(e) =>
                                    setMetodePembayaran(e.target.value)
                                  }
                                  className="w-full overflow-hidden rounded-lg border border-gray-300"
                                >
                                  <option value={""}>Pilih Metode</option>

                                  <option value={"Transfer Bank"}>
                                    Transfer Bank
                                  </option>
                                  <option value={"Virtual Account"}>
                                    Virtual Account
                                  </option>
                                </select>
                              </div>
                            </div>

                            {metodePembayaran == "Transfer Bank" ? (
                              <>
                                {" "}
                                <div className="w-full mb-1">
                                  <label
                                    className="block text-gray-800 text-sm font-medium mb-1"
                                    htmlFor="noSertifikat"
                                  >
                                    Informasi Pembayaran{" "}
                                    <span className="text-red-600">*</span>
                                  </label>
                                  <div className="flex items-center gap-2">
                                    <input
                                      name=""
                                      id=""
                                      className="w-[30%] overflow-hidden rounded-lg border border-gray-300"
                                      value={pelatihan?.PenyelenggaraPelatihan}
                                      disabled
                                      readOnly
                                    />
                                    <input
                                      name=""
                                      id=""
                                      value={"028023012840 (BNI)"}
                                      className="w-[70%] overflow-hidden rounded-lg border border-gray-300"
                                      disabled
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 space-y-2">
                                  <label
                                    className="block text-gray-800 text-sm font-medium mb-1"
                                    htmlFor="name"
                                  >
                                    File Bukti Pembayaran{" "}
                                    <span className="text-red-600">*</span>
                                  </label>
                                  <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col rounded-lg border-2 border-dashed w-full h-40 p-10 group text-center">
                                      <div className="h-full w-full text-center flex flex-col items-center justify-center">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                          />
                                        </svg>
                                        {isAgreeWithAggreement == null ? (
                                          <p className="pointer-none text-gray-500 text-sm">
                                            <span className="text-sm">
                                              Drag and drop
                                            </span>{" "}
                                            files here <br /> or{" "}
                                            <a
                                              href=""
                                              id=""
                                              className="text-blue-600 hover:underline"
                                            >
                                              select a file
                                            </a>{" "}
                                            from your computer
                                          </p>
                                        ) : (
                                          <p className="pointer-none text-gray-500 text-sm"></p>
                                        )}{" "}
                                      </div>
                                      <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChangeBuktiBayar}
                                      />
                                    </label>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-300">
                                  <span>
                                    File type: doc,pdf,types of images
                                  </span>
                                </p>
                              </>
                            ) : (
                              <>
                                <div className="grid grid-cols-3"></div>
                              </>
                            )}
                          </fieldset>

                          {metodePembayaran == "Transfer Bank" ? (
                            <p className="text-gray-700 text-xs -mt-2">
                              *Upload file bukti pembayaran sebagai bukti kamu
                              telah menyelesaikan proses pembayaran ke akun
                              Balai Pelatihan
                            </p>
                          ) : (
                            <p className="text-gray-700 text-xs mt-1">
                              *Proses pembayaan perlu dilakukan, harap memilih
                              metode pembayaran yang sesuai dengan keadaanmu dan
                              kirimkan pada no rekening berikut
                              <Link
                                href={
                                  "https://drive.google.com/file/d/1_LXUE02cNIIuMeg6ejMcENVAA3JJH7TC/view?usp=sharing"
                                }
                                target="_blank"
                                className="ml-1 text-blue-500 underline"
                              >
                                0918039118320 (
                                {pelatihan?.PenyelenggaraPelatihan})
                              </Link>
                              . Untuk pembayaran dengan metode bukti pembayaran
                              akan tertolak dalam proses verifikasi jika
                              dinyatakan tidak benar
                            </p>
                          )}
                        </>
                        <AlertDialogFooter>
                          <div className="flex flex-col gap-1 w-full">
                            {metodePembayaran == "Transfer Bank" && (
                              <Button
                                onClick={(e) =>
                                  handleRegistrationTrainingForPeople(e)
                                }
                                disabled={fileBuktiBayar == null}
                                className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                              >
                                Daftar
                              </Button>
                            )}
                            {metodePembayaran == "Virtual Account" && (
                              <Button
                                onClick={(e) =>
                                  handleRegistrationTrainingForPeople(e)
                                }
                                className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                              >
                                Daftar
                              </Button>
                            )}
                            <Button
                              type="button"
                              onClick={(e) =>
                                setIsOpenFormPembayaran(!isOpenFormPembayaran)
                              }
                              className="btn bg-transparent hover:!bg-white text-blue-600 border border-blue-600 w-full"
                            >
                              Tutup
                            </Button>
                          </div>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <button
                      onClick={(e) => handleRegistrationTrainingForPeople(e)}
                      className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                    >
                      Daftar
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormRegistrationTraining;
