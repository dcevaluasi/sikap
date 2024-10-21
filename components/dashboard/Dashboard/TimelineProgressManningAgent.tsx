"use client";

import React from "react";
import { UserPelatihan } from "@/types/user";
import { IoMdCloseCircle } from "react-icons/io";
import { PiMicrosoftExcelLogoFill, PiQuestionFill } from "react-icons/pi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Link from "next/link";
import Cookies from "js-cookie";

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
import {
  ManningAgent,
  ManningAgentPelatihan,
  PelatihanMasyarakat,
} from "@/types/product";
import { Button } from "@/components/ui/button";
import { HiMiniUserGroup, HiUserGroup } from "react-icons/hi2";
import Toast from "@/components/toast";
import axios, { AxiosError } from "axios";

export const TimelineProgressManningAgent = ({
  manningAgent,
  pelatihan,
  detailPelatihan,
}: {
  manningAgent: ManningAgentPelatihan;
  pelatihan: ManningAgentPelatihan;
  detailPelatihan: PelatihanMasyarakat;
}) => {
  console.log({ pelatihan });
  const router = useRouter();
  console.log({ manningAgent });

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
    formData.append(
      "IdMiningAgentPelatihan",
      manningAgent!.IdMiningAgentPelatihan.toString()
    );

    if (fileExcelPesertaPelatihan != null) {
      formData.append("file", fileExcelPesertaPelatihan);
    }

    try {
      // Step 1: Upload the file
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/manningAgent/exportDataUsersManingAgent`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF081")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Step 2: If the file upload is successful, proceed to send users
      if (response.status === 200) {
        const formDataSendUser = new FormData();
        formDataSendUser.append(
          "IdMiningAgentPelatihan",
          manningAgent!.IdMiningAgentPelatihan.toString()
        );

        const sendUser = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/manningAgent/sendUsersManingAgentToUsersPelatihan`,
          formDataSendUser,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("XSRF081")}`,
            },
          }
        );

        console.log("SEND PESERTA : ", sendUser);
      }

      console.log("FILE UPLOADED PESERTA : ", response);
      Toast.fire({
        icon: "success",
        title: `Selamat anda berhasil mengupload peserta pelatihan!`,
      });
      setIsOpenFormPeserta(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 409) {
          Toast.fire({
            icon: "error",
            title: `Data NIK atau Nomor Telepon sudah ada di database!`,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: `Gagal mengupload peserta pelatihan!`,
          });
        }
      }

      console.log("FILE IMPORT PESERTA PELATIHAN : ", error);
      setIsOpenFormPeserta(false);
    }
  };

  return (
    <section className=" text-gray-800">
      <div className=" max-w-5xl py-12 mx-auto">
        <div className="grid gap-4 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-3">
            <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-2 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-blue-500">
              <h3 className="text-2xl font-semibold font-calsans leading-none">
                Progress Pelatihan
              </h3>
              <p className="text-sm font-normal leading-[115%] text-gray-400">
                Lihat progress kamu sebagai peserta pelatihan
              </p>
            </div>
          </div>
          {manningAgent != null ? (
            <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
              <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-300">
                <div
                  className={`flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] ${
                    pelatihan?.ManningAgentUsers.length == 0
                      ? "before:bg-gray-700"
                      : pelatihan?.ManningAgentUsers.length > 0
                      ? "before:bg-blue-500"
                      : "before:bg-gray-700"
                  } bg-white shadow-custom p-4 rounded-xl duration-700 cursor-pointer`}
                >
                  <h3 className="text-lg font-semibold">Import Peserta </h3>

                  <time
                    className={`text-sm font-medium ${
                      pelatihan?.ManningAgentUsers.length == 0
                        ? "text-gray-700"
                        : "text-blue-500"
                    }`}
                  >
                    {pelatihan?.ManningAgentUsers.length == 0 ? (
                      <span className="flex items-start gap-1">
                        <PiQuestionFill className="mt-[0.134rem]" />
                        <span className="flex flex-col">
                          <span>Kamu belum upload data peserta pelatihan</span>
                        </span>
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <RiVerifiedBadgeFill className="text" />
                        Kamu sudah mengupload data peserta pelatihan
                      </span>
                    )}
                  </time>
                  <div className="text-gray-700">
                    {pelatihan?.ManningAgentUsers.length == 0 ? (
                      <span className="flex items-start gap-1 ">
                        <div className="flex flex-col">
                          <span className="text-xs">
                            Harap mengupload data peserta pelatihan sesuai
                            dengan template yang sudah disediakan untuk
                            mengikuti pelatihan yang kamu daftarkan dan harus
                            sesuai jumlah dari data yang kamu inputkan pada
                            proses pendaftaran diawal
                          </span>

                          <AlertDialog open={isOpenFormPeserta}>
                            <AlertDialogTrigger>
                              <Button
                                onClick={() => setIsOpenFormPeserta(true)}
                                type="button"
                                variant="outline"
                                className="w-full border mt-3 flex gap-2 border-green-400 text-left capitalize items-center justify-center"
                              >
                                <PiMicrosoftExcelLogoFill className="h-4 w-4 text-green-400" />{" "}
                                <span className="text-sm">
                                  Upload Data Peserta
                                </span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2">
                                  {" "}
                                  <HiMiniUserGroup className="h-4 w-4" />
                                  Import Peserta Pelatihan
                                </AlertDialogTitle>
                                <AlertDialogDescription className="-mt-2">
                                  Import peserta yang akan mengikuti pelatihan
                                  ini!
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
                                            "https://docs.google.com/spreadsheets/d/12t7l4bBjPBcxXpCPPOqYeTDoZxBi5aS7/export?format=xlsx"
                                          }
                                          className="btn text-white bg-green-600 hover:bg-green-700 py-0 w-[250px] px-0 text-sm"
                                        >
                                          <PiMicrosoftExcelLogoFill />
                                          Unduh Template
                                        </Link>
                                      </div>
                                      <p className="text-gray-700 text-xs mt-1">
                                        *Download terlebih dahulu template lalu
                                        isi file excel dan upload
                                      </p>
                                    </div>
                                  </div>

                                  <AlertDialogFooter className="mt-3 pt-3 border-t border-t-gray-300">
                                    <AlertDialogCancel
                                      onClick={(e) =>
                                        setIsOpenFormPeserta(!isOpenFormPeserta)
                                      }
                                    >
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={(e) =>
                                        handleUploadImportPesertaPelatihan(e)
                                      }
                                    >
                                      Upload
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </form>
                              </fieldset>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </span>
                    ) : pelatihan?.ManningAgentUsers.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center text-xs ">
                          Data peserta sudah berhasil diupload, selanjutnya
                          menunggu data peserta yang diupload diverifikasi oleh
                          balai pelatihan sebelum melanjutkan ke pelaksanaan
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border flex gap-2 border-blue-600 text-left capitalize items-center justify-center"
                        >
                          <HiUserGroup className="h-4 w-4 text-blue-600" />{" "}
                          <span className="text-sm">Lihat Data Peserta</span>
                        </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div
                  className={`flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] ${
                    manningAgent!.Keterangan == "Valid"
                      ? "before:bg-green-400"
                      : manningAgent!.Keterangan == "Tidak Valid"
                      ? "before:bg-rose-500"
                      : "before:bg-gray-700"
                  } bg-white shadow-custom p-4 rounded-xl duration-700 cursor-pointer`}
                >
                  <h3 className="text-lg font-semibold">Validasi Peserta </h3>

                  <time
                    className={`text-sm font-medium text-gray-600 ${
                      manningAgent?.Keterangan! == "Tidak Valid"
                        ? "text-rose-500"
                        : manningAgent?.Keterangan! == "Valid"
                        ? "text-green-500"
                        : "text-gray-700"
                    }`}
                  >
                    {manningAgent?.Keterangan! == "Tidak Valid" ? (
                      <span className="flex items-start gap-1">
                        <IoMdCloseCircle className="mt-[0.134rem]" />
                        <span className="flex flex-col">
                          <span>Kelengkapan data tidak valid</span>
                        </span>
                      </span>
                    ) : manningAgent?.Keterangan! == "Valid" ? (
                      <span className="flex items-center">
                        <RiVerifiedBadgeFill className="text" />
                        Data pendaftaran anda valid
                      </span>
                    ) : (
                      <span className="flex items-start gap-1">
                        <PiQuestionFill className="mt-[0.134rem]" />
                        <span className="flex flex-col">
                          <span> Data belum divalidasi operator</span>
                        </span>
                      </span>
                    )}
                  </time>
                  <p className="text-gray-700">
                    {manningAgent?.Keterangan! == "Tidak Valid" ? (
                      <span className="flex items-start gap-1">
                        <span className="flex flex-col">
                          <span className="font-normal">
                            <span className="flex gap-1 w-full">
                              <span className="text-xs text-gray-700">
                                Lakukan perbaikan pada link
                              </span>{" "}
                              <Link
                                onClick={(e) =>
                                  Cookies.set("isEditValiditas", "true")
                                }
                                className="text-blue-500 text-xs"
                                href={"/dashboard/edit-profile"}
                              >
                                {" "}
                                berikut.
                              </Link>
                            </span>
                          </span>
                        </span>
                      </span>
                    ) : manningAgent?.Keterangan! == "Valid" ? (
                      <span className="flex items-center text-xs ">
                        Data dan kelengkapanmu sudah sesuai untuk mengikuti
                        pelatihan silahkan lanjut ke proses berikutnya!
                      </span>
                    ) : (
                      <span className="flex items-start gap-1 ">
                        <span className="flex flex-col">
                          <span className="text-xs">
                            Proses ini dilakukan oleh balai pelatihan, untuk
                            memastikan kelengkapan data dan dokumen yang
                            diperlukan sudah memenuhi persyaratan atau belum,
                            harap menunggu dalam 1x24 jam.
                          </span>
                        </span>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};
