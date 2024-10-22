"use client";

import React from "react";
import { UserPelatihan } from "@/types/user";
import { IoMdCloseCircle } from "react-icons/io";
import { PiQuestionFill } from "react-icons/pi";
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
import Toast from "@/components/toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createSlug } from "@/utils";
import { PelatihanMasyarakat } from "@/types/product";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { generateTanggalPelatihan } from "@/utils/text";
import { DialogSertifikatPelatihan } from "@/components/sertifikat/dialogSertifikatPelatihan";
import DropdownUserPelatihan from "../Header/DropdownUserPelatihan";
import { IoReloadCircle } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import { elautBaseUrl } from "@/constants/urls";

export const TimelineProgressPortfolio = ({
  userDetail,
  pelatihan,
}: {
  userDetail: UserPelatihan;
  pelatihan: PelatihanMasyarakat;
}) => {
  const handleUploadFilePortfolio = async (e: any) => {
    try {
      const formData = new FormData();
      if (filePortfolio != null) {
        formData.append("file_portofolio", filePortfolio);
      }
      const response = await axios.put(
        `${elautBaseUrl}/users/updatePelatihanUsers?id=${
          userDetail!.IdUserPelatihan
        }`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF081")}`,
          },
        }
      );
      Toast.fire({
        icon: "success",
        title: `Selamat anda berhasil mengupload file portfolio!`,
      });
      console.log({ response });
    } catch (error) {
      console.error({ error });
      Toast.fire({
        icon: "error",
        title: `Gagal mengupload file portfolio!`,
      });
    }
  };

  const [isOpenFormPortfolio, setIsOpenFormPortfolio] =
    React.useState<boolean>(false);
  const [filePortfolio, setFilePortfolio] = React.useState<File | null>(null);
  const handleFileChange = (e: any) => {
    setFilePortfolio(e.target.files[0]);
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
          <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
            <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-300">
              <div
                className={`flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] ${
                  userDetail!.Keterangan == "Valid"
                    ? "before:bg-green-400"
                    : userDetail!.Keterangan == "Tidak Valid"
                    ? "before:bg-rose-500"
                    : "before:bg-gray-700"
                } bg-white shadow-custom p-4 rounded-xl duration-700 cursor-pointer`}
              >
                <h3 className="text-lg font-semibold">Validasi Peserta </h3>

                <time
                  className={`text-sm font-medium text-gray-600 ${
                    userDetail?.Keterangan! == "Tidak Valid"
                      ? "text-rose-500"
                      : userDetail?.Keterangan! == "Valid"
                      ? "text-green-500"
                      : "text-gray-700"
                  }`}
                >
                  {userDetail?.Keterangan! == "Tidak Valid" ? (
                    <span className="flex items-start gap-1">
                      <IoMdCloseCircle className="mt-[0.134rem]" />
                      <span className="flex flex-col">
                        <span>Kelengkapan data tidak valid</span>
                      </span>
                    </span>
                  ) : userDetail?.Keterangan! == "Valid" ? (
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
                  {userDetail?.Keterangan! == "Tidak Valid" ? (
                    <span className="flex items-start gap-1">
                      <span className="flex flex-col">
                        <span className="font-normal">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: userDetail?.StatusPembayaran!,
                            }}
                            className="text-xs  prose  text-justify group-hover:text-xs text-gray-700 prose-strong:text-gray-500 prose-p:leading-[140%] prose-strong:font-bold group-hover:duration-1000 w-full"
                          />{" "}
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
                  ) : userDetail?.Keterangan! == "Valid" ? (
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

              <>
                <div
                  className={`flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] ${
                    userDetail.PreTest < 65 && userDetail.PreTest > 0
                      ? "before:bg-rose-500"
                      : userDetail.PreTest > 65
                      ? "before:bg-green-400"
                      : "before:bg-gray-700"
                  } bg-white shadow-custom p-4 rounded-xl duration-700 cursor-pointer`}
                >
                  <h3 className="text-lg font-semibold">
                    Upload File Portfolio
                  </h3>
                  <time
                    className={`text-sm font-medium text-gray-600 ${
                      userDetail?.PreTest! == 0 &&
                      userDetail?.PostTest == 0 &&
                      pelatihan!.StatusApproval != "Selesai"
                        ? "text-gray-700"
                        : userDetail?.PreTest >= 65
                        ? "text-green-500"
                        : "text-rose-500"
                    }`}
                  >
                    {userDetail?.PreTest! == 0 ? (
                      <span className="flex items-start gap-1">
                        <PiQuestionFill className="mt-[0.134rem]" />
                        <span className="flex flex-col">
                          <span>Belum Mengupload File Portfolio</span>
                        </span>
                      </span>
                    ) : userDetail?.PreTest >= 65 ? (
                      <span className="flex items-center">
                        <RiVerifiedBadgeFill className="text-xs" />
                        Portfoliomu Dinilai Dengan Baiks
                      </span>
                    ) : (
                      <span className="flex items-start gap-1">
                        <IoMdCloseCircle className="mt-[0.134rem]" />
                        <span className="flex flex-col">
                          <span>Harap Perbaiki Portfolio mu</span>
                        </span>
                      </span>
                    )}
                  </time>
                  <p className="">
                    {userDetail?.PreTest! == 0 ? (
                      <div className="flex flex-col items-start justify-start text-xs">
                        <p className="">
                          Upload dokumen portfolio sebagai bahan penilaian
                          teknis dari diklat ini, ikuti ketentuan yang ada untuk
                          format dan ikuti rangkaian diklat dengan baik
                        </p>

                        <AlertDialog open={isOpenFormPortfolio}>
                          <AlertDialogTrigger className="w-full">
                            <Button
                              type="button"
                              onClick={(e) => setIsOpenFormPortfolio(true)}
                              variant="outline"
                              className="w-full border mt-3 flex gap-2 border-gray-600 text-left capitalize items-center justify-center"
                            >
                              <FiUploadCloud className="h-4 w-4 text-gray-600" />{" "}
                              <span className="text-sm">Upload File</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-2">
                                {" "}
                                <FiUploadCloud className="h-4 w-4" />
                                Upload File Portfolio
                              </AlertDialogTitle>
                              <AlertDialogDescription className="-mt-2">
                                Kirim file portfolio-mu sebagai bahan penilaian
                                pelakasaan diklat!
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <fieldset>
                              <form autoComplete="off">
                                <div className="flex flex-wrap -mx-3 mb-1 -mt-3">
                                  <div className="w-full px-3">
                                    <div className="flex gap-1">
                                      <input
                                        type="file"
                                        className=" text-black h-10 text-base flex items-center cursor-pointer w-full border border-neutral-200 rounded-md"
                                        required
                                        onChange={handleFileChange}
                                      />
                                      {/* <Link
                                        target="_blank"
                                        href={
                                          "https://docs.google.com/spreadsheets/d/12t7l4bBjPBcxXpCPPOqYeTDoZxBi5aS7/export?format=xlsx"
                                        }
                                        className="btn text-white bg-green-600 hover:bg-green-700 py-0 w-[250px] px-0 text-sm"
                                      >
                                        <PiMicrosoftExcelLogoFill />
                                        Unduh Template
                                      </Link> */}
                                    </div>
                                    <p className="text-gray-700 text-xs mt-1">
                                      *Harap upload file untutk melanjutkan
                                      proses berikutnya
                                    </p>
                                  </div>
                                </div>

                                <AlertDialogFooter className="mt-3 pt-3 border-t border-t-gray-300">
                                  <AlertDialogCancel
                                    onClick={(e) =>
                                      setIsOpenFormPortfolio(false)
                                    }
                                  >
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={(e) =>
                                      handleUploadFilePortfolio(e)
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
                    ) : userDetail?.PreTest > 65 ? (
                      <div className="flex flex-col items-start gap-1 ">
                        <TablePenilaian
                          userDetail={userDetail}
                          type="Pre-Test"
                        />
                        <span className="text-xs">Selamat</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-start gap-1 ">
                        <TablePenilaian
                          userDetail={userDetail}
                          type="Pre-Test"
                        />
                        <span className="text-xs">
                          Maaf dokumen portfoliomu dirasa kurang lengkap dari
                          hasil penilaian yang telah dilakukan oleh tim, harap
                          mengupload ulang kembali dan lengkapi sesuai dengan
                          ketentuan
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border mt-3 flex gap-2 border-gray-600 text-left capitalize items-center justify-center"
                        >
                          <IoReloadCircle className="h-4 w-4 text-gray-600" />{" "}
                          <span className="text-sm">Upload Ulang</span>
                        </Button>
                      </div>
                    )}
                  </p>
                </div>{" "}
                <div
                  className={`flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] ${
                    pelatihan!.StatusApproval == "Selesai"
                      ? "before:bg-green-400"
                      : "before:bg-gray-700"
                  } bg-white shadow-custom p-4 rounded-xl duration-700 cursor-pointer `}
                >
                  <h3 className="text-lg font-semibold">
                    Pelaksanaan Pelatihan {pelatihan!.NamaPelatihan}
                  </h3>
                  <time className="text-sm text-gray-600">
                    {generateTanggalPelatihan(pelatihan!.TanggalMulaiPelatihan)}{" "}
                    -{" "}
                    {generateTanggalPelatihan(
                      pelatihan!.TanggalBerakhirPelatihan
                    )}
                  </time>
                  {pelatihan!.StatusApproval == "Selesai" ? (
                    <span className="text-xs">
                      Pelatihan{" "}
                      <span className="font-bold">
                        {pelatihan!.NamaPelatihan}
                      </span>{" "}
                      sudah selesai dilaksanakan, harap mengikuti arahan
                      selanjutnya oleh panitia atau instruktur pelatihan!
                    </span>
                  ) : (
                    <span className="text-xs">
                      Pelatihan{" "}
                      <span className="font-bold">
                        {pelatihan!.NamaPelatihan}
                      </span>{" "}
                      ini dilaksanakan secara{" "}
                      <span className="font-bold">
                        {" "}
                        {pelatihan!.PelaksanaanPelatihan}
                      </span>{" "}
                      harap dapat mengikuti pelatihan dengan seksama dan
                      semangat sobat E-LAUT!
                    </span>
                  )}
                </div>
                <div
                  className={`flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] ${
                    pelatihan!.StatusApproval == "Selesai" &&
                    userDetail.PreTest != 0
                      ? "before:bg-gray-700"
                      : userDetail?.PreTest >= 65 &&
                        userDetail?.NoSertifikat != ""
                      ? "before:bg-green-500"
                      : "before:bg-gray-700"
                  } bg-white shadow-custom p-4 rounded-xl duration-700 cursor-pointer `}
                >
                  <h3 className="text-lg font-semibold">
                    Sertifikat Pelatihan {pelatihan!.NamaPelatihan}
                  </h3>
                  <time className="text-sm text-gray-600">
                    Bidang {pelatihan!.BidangPelatihan}
                  </time>
                  <span className="text-xs">
                    {pelatihan!.StatusApproval != "Selesai" ||
                    userDetail.PreTest == 0
                      ? "Harap mengikuti rangkaian pelaksanaan pelatihan untuk mendapatkan sertifikat."
                      : userDetail?.PreTest >= 65 &&
                        userDetail?.FileSertifikat != ""
                      ? "Selamat, anda telah mengikuti dan menyelesaikan rangkaian pelatihan. Berikut sertifikat yang dapat kamu akses"
                      : "Oops. Sertifikat kamu masih dalam proses penerbitan, harap ditunggu ya paling lambat 3x24 jam. Pantau terus dashboard-mu ya sobat E-LAUT!"}
                  </span>
                  {userDetail.FileSertifikat == "" ? null : pelatihan !=
                    null ? (
                    <div>
                      <DialogSertifikatPelatihan
                        userPelatihan={userDetail!}
                        pelatihan={pelatihan!}
                      >
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border mt-3 flex gap-2 border-blue-600 text-left capitalize items-center justify-center"
                        >
                          <RiVerifiedBadgeFill className="h-4 w-4 text-blue-600" />{" "}
                          <span className="text-sm"> Lihat Sertifikat</span>
                        </Button>
                      </DialogSertifikatPelatihan>
                    </div>
                  ) : null}
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TablePenilaian = ({
  userDetail,
  type,
}: {
  userDetail: UserPelatihan;
  type: string;
}) => {
  return (
    <table className="min-w-full border border-neutral-200 rounded-md text-center text-sm font-light text-surface mb-2 mt-2">
      <thead className="border-b border-neutral-200 font-medium ">
        <tr>
          <th scope="col" className="border-e border-neutral-200 px-4 py-3 ">
            #
          </th>
          {type == "Pre-Test" && (
            <th scope="col" className="border-e border-neutral-200 px-4 py-3 ">
              Pre-test
            </th>
          )}

          {type == "Post-Test" && (
            <th scope="col" className="border-e border-neutral-200 px-4 py-3 ">
              Post-test
            </th>
          )}

          {type == "Remedial" && userDetail.PostTest < 65 && (
            <th scope="col" className="border-e border-neutral-200 px-4 py-3 ">
              Remedial
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-neutral-200 ">
          <td className="whitespace-nowrap border-e border-neutral-200 px-4 py-3 font-medium ">
            1
          </td>
          {type == "Pre-Test" && (
            <td className="whitespace-nowrap border-e border-neutral-200 px-4 py-3 ">
              {userDetail!.PreTest!}
            </td>
          )}

          {type == "Post-Test" && (
            <td className="whitespace-nowrap border-e border-neutral-200 px-4 py-3 ">
              {userDetail!.PostTest!}
            </td>
          )}

          {type == "Remedial" && userDetail.PostTest < 65 && (
            <td className="whitespace-nowrap border-e border-neutral-200 px-4 py-3 "></td>
          )}
        </tr>
      </tbody>
    </table>
  );
};
