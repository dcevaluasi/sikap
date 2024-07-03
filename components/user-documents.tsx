"use client";

import React, { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import FeaturesBg from "@/public/images/features-bg.png";
import FeaturesElement from "@/public/images/features-element.png";
import { GiLuckyFisherman, GiWaterSplash } from "react-icons/gi";
import {
  HiGlobeAmericas,
  HiMiniUserGroup,
  HiOutlineCake,
  HiUserGroup,
} from "react-icons/hi2";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./../app/css/additional-styles/features-slider.css";

// import required modules
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import ListProgram from "./lists";
import Link from "next/link";
import { Slide } from "react-awesome-reveal";
import { FaPlaceOfWorship } from "react-icons/fa6";
import { GrFormEdit, GrFormTrash, GrLocation } from "react-icons/gr";
import { Button } from "./ui/button";
import { FiSearch, FiSlack } from "react-icons/fi";
import { Input } from "./ui/input";
import BPPPTrainings from "./bppp-trainings";
import { usePathname, useRouter } from "next/navigation";
import { extractPathAfterBppp, getPenyeleggara } from "@/utils/pelatihan";
import { PelatihanMasyarakat } from "@/types/product";
import axios, { AxiosResponse } from "axios";
import BPPPCertificates from "./bppp-certificates";
import { IoIosInformationCircle, IoMdCloseCircle } from "react-icons/io";
import { Edit3Icon, LucideDot, Trash } from "lucide-react";
import { User } from "@/types/user";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import {
  MdAlternateEmail,
  MdOutlineWoman,
  MdOutlineWorkOutline,
} from "react-icons/md";
import { PiHandsPrayingBold, PiTrainRegional } from "react-icons/pi";
import { TbGenderBigender, TbSchool } from "react-icons/tb";
import { BiDonateBlood } from "react-icons/bi";
import { truncateText } from "@/utils";
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
} from "./ui/alert-dialog";
import Cookies from "js-cookie";
import Toast from "./toast";

export default function UserDocuments({ user }: { user: User | null }) {
  const tabMenus = [
    {
      id: 1,
      name: "Pas Foto",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/illustrations/pas-foto.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
      link: user?.Foto,
      available: user?.Foto.endsWith("/") ? false : true,
    },
    {
      id: 2,
      name: "Kartu Keluarga",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/illustrations/kartu-keluarga.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
      link: user?.KK,
      available: user?.KK.endsWith("/") ? false : true,
    },

    {
      id: 3,
      name: "KTP",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/illustrations/ktp.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
      link: user?.Ktp,
      available: user?.Ktp.endsWith("/") ? false : true,
    },
    {
      id: 4,
      name: "Ijazah",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/illustrations/ijazah.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
      link: user?.Ijazah,
      available: user?.Ijazah.endsWith("/") ? false : true,
    },
    {
      id: 4,
      name: "Surat Keterangan Sehat",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/illustrations/surat-keterangan-sehat.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
      link: user?.SuratKesehatan,
      available: user?.SuratKesehatan.endsWith("/") ? false : true,
    },
  ];

  const pathname = usePathname();
  const location = extractPathAfterBppp(pathname);
  const penyelenggara = getPenyeleggara(location!);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [data, setData] = React.useState<PelatihanMasyarakat[]>([]);

  const handleFetchingPublicTrainingDataByPenyelenggara = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/lemdik/getPelatihan?penyelenggara_pelatihan=${penyelenggara}`
      );
      console.log({ response });
      setData(response.data.data);
    } catch (error) {
      console.error("Error posting training data:", error);
      throw error;
    }
  };

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [profilePicture, setProfilePicture] = React.useState<File | null>(null);
  const handleFileChange = (e: any) => {
    setProfilePicture(e.target.files[0]);
  };
  const router = useRouter();

  const handleUpdateUser = async (e: any) => {
    const formData = new FormData();
    if (profilePicture != null) {
      formData.append("Fotos", profilePicture);
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/updateUsers`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF081")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log({ response });
      Toast.fire({
        icon: "success",
        title: `Berhasil mengupdate profile profile-mu!`,
      });
      router.refresh();
    } catch (error) {
      console.error({ error });
      Toast.fire({
        icon: "error",
        title: `Gagal mengupdate profile profile-mu!`,
      });
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      handleFetchingPublicTrainingDataByPenyelenggara();
    }, 1000);
  }, []);

  const [tab, setTab] = useState<number>(1);

  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  const [menuSelected, setMenuSelected] = React.useState(false);
  const [indexMenuSelected, setIndexMenuSelected] = React.useState(0);
  const handleSelectedMenu = (index: number) => {
    setMenuSelected(!menuSelected);
    setIndexMenuSelected(index);
  };

  return (
    <>
      <section className="relative h-fit pb-20 bg-white" id="explore">
        <div
          className="absolute inset-0 pointer-events-none mb-16 pb-10 h-full"
          aria-hidden="true"
        ></div>
        <div className="absolute left-0 right-0 m-auto w-px p-px h-28 bg-gray-200 transform -translate-y-1/2"></div>

        <div className="relative max-w-6xl w-full mx-auto px-4 sm:px-6">
          <div className="pt-12 md:pt-20">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8">
              <h1 className="text-3xl font-calsans leading-[110%] text-black">
                Biodata
                <br />
                Peserta Pelatihan & Sertifikasi
              </h1>
              <p className="text-base text-gray-600">
                Jelajahi layanan serta informasi yang ada pada Balai Pelatihan
                Kelautan dan Perikanan dan jadilah SDM kompeten bidang kelautan
                dan perikanan!
              </p>
            </div>

            <div className="gap-4 w-full mt-20">
              <div className="flex flex-col gap-2 w-full items-center duration-1000  text-center">
                <div className="flex flex-col items-center justify-center bg-white shadow-custom rounded-md w-fit h-fit py-6 px-12 max-w-4xl">
                  <div className="w-full items-center justify-evenly flex">
                    {/* USER PROFILE INFORMATION */}
                    <div className="flex flex-col gap-1 w-full items-center justify-center">
                      <div className=" relative rounded-full w-fit  -mt-28">
                        <Image
                          src={
                            user?.Foto! ==
                            "https://api-elaut.ikulatluh.cloud/public/static/profile/fotoProfile/"
                              ? "/dummies/profile.jpg"
                              : user?.Foto!
                          }
                          alt={"profile picture"}
                          width={0}
                          height={0}
                          className="w-32 h-32 rounded-full object-cover"
                        />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <div className="w-fit bg-white rounded-full bottom-0 p-2 flex shadow-custom items-center justify-center absolute right-0 cursor-pointer">
                              <Edit3Icon />
                            </div>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-2">
                                {" "}
                                <HiMiniUserGroup className="h-4 w-4" />
                                Update Foto Profile
                              </AlertDialogTitle>
                              <AlertDialogDescription className="-mt-2">
                                Upload foto profile terbaru mu, direkomendasikan
                                agar dapat mengupload dengan pas foto yang telah
                                dikrop!
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <fieldset>
                              <form autoComplete="off">
                                <input
                                  type="file"
                                  className=" text-black h-10 text-base flex items-center cursor-pointer w-full border border-neutral-200 rounded-md"
                                  required
                                  onChange={handleFileChange}
                                />
                                <AlertDialogFooter className="mt-3">
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={(e) => handleUpdateUser(e)}
                                  >
                                    Update
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </form>
                            </fieldset>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>

                      <div className="max-w-5xl mx-auto text-center pb-5 mt-4 md:pb-8">
                        <h1 className="text-2xl font-calsans leading-[110%] text-black">
                          {user!.Nama}
                        </h1>

                        <div className="w-full items-center justify-center flex gap-3 mt-5 mb-5">
                          <div className="flex flex-col gap-1 items-center justify-content">
                            {tabMenus[0].available ? (
                              <p className="text-2xl cursor-pointer hover:underline duration-800 text-gray-600 text-center font-normal leading-[105%]">
                                {user!.Pelatihan!.length}
                              </p>
                            ) : (
                              <p className="text-sm cursor-pointer hover:underline duration-800 text-gray-600 text-center font-normal leading-[105%]">
                                Berkasmu belum tersedia, mohon untuk diupload!
                              </p>
                            )}
                            <p className="text-sm text-black text-center font-semibold">
                              Pelatihan Diikuti
                            </p>
                          </div>
                          <span>|</span>
                          <div className="flex flex-col gap-1 items-center justify-content">
                            {tabMenus[0].available ? (
                              <p className="text-2xl cursor-pointer hover:underline duration-800 text-gray-600 text-center font-normal leading-[105%]">
                                0
                              </p>
                            ) : (
                              <p className="text-sm cursor-pointer hover:underline duration-800 text-gray-600 text-center font-normal leading-[105%]">
                                Berkasmu belum tersedia, mohon untuk diupload!
                              </p>
                            )}
                            <p className="text-sm text-black text-center font-semibold">
                              Sertifikasi
                            </p>
                          </div>
                          <span>|</span>
                          <div className="flex flex-col items-center justify-content">
                            {tabMenus[0].available ? (
                              <p className="text-2xl cursor-pointer hover:underline duration-800 text-gray-600 text-center  font-normal leading-[105%]">
                                {user!.KusukaUsers == "yes" ? (
                                  <RiVerifiedBadgeFill className="text-green-500 text-3xl" />
                                ) : (
                                  <IoMdCloseCircle className="text-rose-600 -mt-1 text-3xl" />
                                )}
                              </p>
                            ) : (
                              <p className="text-sm cursor-pointer hover:underline duration-800 text-gray-600 text-center font-normal leading-[105%] -mt-1">
                                Berkasmu belum tersedia, mohon untuk diupload!
                              </p>
                            )}
                            <p className="text-sm text-black text-center font-semibold">
                              Anggota Kusuka
                            </p>
                          </div>
                        </div>
                        <p className="text-base text-gray-600">
                          {user!.Nik} • {user!.Kewarganegaraan} •{" "}
                          {user!.NoTelpon} • {user!.StatusMenikah}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* USER MORE DETAIL INFORMATION */}
                  <div className="w-full px-24">
                    <div className=" h-1 bg-gray-200 rounded-full mx-auto max-w-md w-full"></div>
                  </div>

                  <div className="grid grid-cols-3 items-center justify-center gap-5 w-full  mt-10">
                    <div className="gap-4 w-full">
                      <Slide direction="up">
                        <div className="flex flex-col gap-2 w-full items-center duration-1000  text-center">
                          <div className="flex items-center justify-start gap-2 bg-white shadow-custom rounded-md w-full h-fit  md:h-24 px-3 py-1">
                            <MdAlternateEmail />

                            <div className="flex flex-col gap-0">
                              <p className="text-sm text-black text-left font-semibold">
                                Email
                              </p>

                              <p className="text-sm cursor-pointer hover:underline duration-800 text-gray-600 text-left font-normal leading-[105%]">
                                {user!.Email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    </div>
                    <div className="gap-4 w-full">
                      <Slide direction="up">
                        <div className="flex flex-col gap-2 w-full items-center duration-1000  text-center">
                          <div className="flex items-center justify-start gap-2 bg-white shadow-custom rounded-md w-full h-fit  md:h-24 px-3 py-1">
                            <GrLocation className="w-10" />
                            <div className="flex flex-col gap-0">
                              <p className="text-xs text-black text-left font-semibold">
                                Alamat
                              </p>

                              <p className="text-sm cursor-pointer hover:underline duration-800 text-gray-600 text-left font-normal leading-[105%]">
                                {user!.Alamat}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    </div>
                    <div className="gap-4 w-full">
                      <Slide direction="up">
                        <div className="flex flex-col gap-1 w-full items-center duration-1000  text-center">
                          <div className="flex items-center justify-start gap-2 bg-white shadow-custom rounded-md w-full h-fit  md:h-24 px-3 py-1">
                            <PiTrainRegional className="text-lg" />

                            <div className="flex flex-col gap-0">
                              <p className="text-xs text-black text-left font-semibold">
                                Domisili
                              </p>

                              <p className="text-sm cursor-pointer hover:underline duration-800 text-gray-600 text-left font-normal leading-[105%]">
                                {user!.Kota}, {user!.Provinsi}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    </div>
                    <div className="gap-4 w-full">
                      <Slide direction="up">
                        <div className="flex flex-col gap-1 w-full items-center duration-1000  text-center">
                          <div className="flex items-center justify-start gap-2 bg-white shadow-custom rounded-md w-full h-fit  md:h-24 px-3 py-1">
                            <TbGenderBigender className="text-lg" />

                            <div className="flex flex-col gap-0">
                              <p className="text-xs text-black text-left font-semibold">
                                Jenis Kelamin
                              </p>

                              <p className="text-sm cursor-pointer hover:underline duration-800 text-gray-600 text-left font-normal leading-[105%]">
                                {user!.JenisKelamin}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    </div>
                    <div className="gap-4 w-full">
                      <Slide direction="up">
                        <div className="flex flex-col gap-1 w-full items-center duration-1000  text-center">
                          <div className="flex items-center justify-start gap-2 bg-white shadow-custom rounded-md w-full h-fit  md:h-24 px-3 py-1">
                            <HiOutlineCake className="text-lg" />

                            <div className="flex flex-col gap-0">
                              <p className="text-xs text-black text-left font-semibold">
                                TTL
                              </p>

                              <p className="text-sm cursor-pointer hover:underline duration-800 text-gray-600 text-left font-normal leading-[105%]">
                                {user!.TempatLahir}, {user!.TanggalLahir}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    </div>
                    <div className="gap-4 w-full">
                      <Slide direction="up">
                        <div className="flex flex-col gap-1 w-full items-center duration-1000  text-center">
                          <div className="flex items-center justify-start gap-2 bg-white shadow-custom rounded-md w-full h-fit  md:h-24 px-3 py-1">
                            <MdOutlineWorkOutline className="text-lg" />

                            <div className="flex flex-col gap-0">
                              <p className="text-xs text-black text-left font-semibold">
                                Pekerjaan
                              </p>

                              <p className="text-sm cursor-pointer hover:underline duration-800 text-gray-600 text-left font-normal leading-[105%]">
                                {user!.Pekerjaan}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    </div>
                    <div className="gap-4 w-full">
                      <Slide direction="up">
                        <div className="flex flex-col gap-1 w-full items-center duration-1000  text-center">
                          <div className="flex items-center justify-start gap-2 bg-white shadow-custom rounded-md w-full h-fit  md:h-24 px-3 py-1">
                            <TbSchool className="text-lg" />

                            <div className="flex flex-col gap-0">
                              <p className="text-xs text-black text-left font-semibold">
                                Pendidikan Terakhir
                              </p>

                              <p className="text-sm cursor-pointer hover:underline duration-800 text-gray-600 text-left font-normal leading-[105%]">
                                {user!.PendidikanTerakhir}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    </div>
                    <div className="gap-4 w-full">
                      <Slide direction="up">
                        <div className="flex flex-col gap-1 w-full items-center duration-1000  text-center">
                          <div className="flex items-center justify-start gap-2 bg-white shadow-custom rounded-md w-full h-fit  md:h-24 px-3 py-1">
                            <PiHandsPrayingBold className="text-lg" />

                            <div className="flex flex-col gap-0">
                              <p className="text-xs text-black text-left font-semibold">
                                Agama
                              </p>

                              <p className="text-sm cursor-pointer hover:underline duration-800 text-gray-600 text-left font-normal leading-[105%]">
                                {user!.Agama}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    </div>
                    <div className="gap-4 w-full">
                      <Slide direction="up">
                        <div className="flex flex-col gap-1 w-full items-center duration-1000  text-center">
                          <div className="flex items-center justify-start gap-2 bg-white shadow-custom rounded-md w-full h-fit  md:h-24 px-3 py-1">
                            <BiDonateBlood className="text-lg" />

                            <div className="flex flex-col gap-0">
                              <p className="text-xs text-black text-left font-semibold">
                                Golongan Darah
                              </p>

                              <p className="text-sm cursor-pointer hover:underline duration-800 text-gray-600 text-left font-normal leading-[105%]">
                                {user!.GolonganDarah}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    </div>
                    <div className="gap-4 w-full">
                      <Slide direction="up">
                        <div className="flex flex-col gap-1 w-full items-center duration-1000  text-center">
                          <div className="flex items-center justify-start gap-2 bg-white shadow-custom rounded-md w-full h-fit  md:h-24 px-3 py-1">
                            <MdOutlineWoman className="text-lg" />

                            <div className="flex flex-col gap-0">
                              <p className="text-xs text-black text-left font-semibold">
                                Ibu Kandung
                              </p>

                              <p className="text-sm cursor-pointer hover:underline duration-800 text-gray-600 text-left font-normal leading-[105%]">
                                {user!.IbuKandung}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    </div>
                    <div className="gap-4 w-full">
                      <Slide direction="up">
                        <div className="flex flex-col gap-1 w-full items-center duration-1000  text-center">
                          <div className="flex items-center justify-start gap-2 bg-white shadow-custom rounded-md w-full h-fit  md:h-24 px-3 py-1">
                            <HiGlobeAmericas className="text-lg" />

                            <div className="flex flex-col gap-0">
                              <p className="text-xs text-black text-left font-semibold">
                                Negara Tujuan Bekerja
                              </p>

                              <p className="text-sm cursor-pointer hover:underline duration-800 text-gray-600 text-left font-normal leading-[105%]">
                                {user!.NegaraTujuanBekerja}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative max-w-6xl w-full mx-auto px-4 sm:px-6">
          <div className="pt-12 md:pt-20">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8">
              <h1 className="text-3xl font-calsans leading-[110%] text-black">
                Dokumen dan File Kelengkapan
                <br />
                Peserta Pelatihan & Sertifikasi
              </h1>
              <p className="text-base text-gray-600">
                Jelajahi layanan serta informasi yang ada pada Balai Pelatihan
                Kelautan dan Perikanan dan jadilah SDM kompeten bidang kelautan
                dan perikanan!
              </p>
            </div>

            <div className="grid grid-cols-3 items-center justify-center gap-5 w-full ">
              {tabMenus.map((tabMenu, index) => (
                <div key={index} className="gap-4 w-full">
                  <Slide direction="up" duration={500 * index}>
                    <div
                      key={index}
                      onClick={(e) => handleSelectedMenu(index)}
                      className="flex flex-col gap-2 w-full items-center duration-1000  text-center"
                    >
                      <div className="flex items-center justify-start bg-white shadow-custom rounded-md w-full h-fit  md:h-28 p-6">
                        <Image
                          className="w-14 md:w-14"
                          width={0}
                          height={0}
                          src={tabMenu.image}
                          alt="Kementrian Kelautan dan Perikanan RI Logo"
                        />
                        <div className="flex flex-col gap-0">
                          <p className="text-sm text-black text-left font-semibold">
                            {tabMenu.name}
                          </p>
                          {tabMenu.available ? (
                            <Link
                              href={tabMenu.link!}
                              className="text-sm cursor-pointer hover:underline duration-800 text-gray-600 text-left font-normal leading-[105%] w-1/2"
                            >
                              {truncateText(tabMenu!.link!, 50, "...")}
                            </Link>
                          ) : (
                            <p className="text-sm cursor-pointer hover:underline duration-800 text-gray-600 text-left font-normal leading-[105%]">
                              Berkasmu belum tersedia, mohon untuk diupload!
                            </p>
                          )}

                          {tabMenu.available ? (
                            <div className="flex w-fit mt-1 gap-1">
                              <Button
                                variant="outline"
                                className="ml-auto px-3 py-1 h-7"
                              >
                                <IoIosInformationCircle className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="outline"
                                className="ml-auto border px-3 py-1 h-7 border-rose-600"
                              >
                                <Trash className="w-3 h-3 text-rose-600" />
                              </Button>

                              <Button
                                variant="outline"
                                className="ml-auto border px-3 py-1 h-7 border-yellow-500"
                              >
                                <Edit3Icon className="w-3 h-3 text-yellow-500" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              className="text-xs cursor-pointer duration-800 text-green-500 text-left font-normal leading-[105%] mt-1 px-3 py-1 h-7"
                            >
                              + Upload Berkas
                            </Button>
                          )}
                        </div>
                      </div>
                      {/* <p className="text-sm text-black font-semibold">
                        {tabMenu.name}
                      </p> */}
                    </div>
                  </Slide>
                </div>
              ))}
            </div>
            {/* </Swiper> */}
          </div>
        </div>
      </section>
    </>
  );
}
