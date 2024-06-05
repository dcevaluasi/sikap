"use client";

import React, { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import FeaturesBg from "@/public/images/features-bg.png";
import FeaturesElement from "@/public/images/features-element.png";
import { GiLuckyFisherman, GiWaterSplash } from "react-icons/gi";
import { HiGlobeAmericas, HiOutlineCake, HiUserGroup } from "react-icons/hi2";

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
import { usePathname } from "next/navigation";
import { extractPathAfterBppp, getPenyeleggara } from "@/utils/pelatihan";
import { PelatihanMasyarakat } from "@/types/product";
import axios, { AxiosResponse } from "axios";
import BPPPCertificates from "./bppp-certificates";
import { IoIosInformationCircle, IoMdCloseCircle } from "react-icons/io";
import { Edit3Icon, LucideDot, Trash } from "lucide-react";
import { User, UserPelatihan } from "@/types/user";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import {
  MdAlternateEmail,
  MdOutlineWoman,
  MdOutlineWorkOutline,
} from "react-icons/md";
import { PiHandsPrayingBold, PiTrainRegional } from "react-icons/pi";
import { TbGenderBigender, TbSchool } from "react-icons/tb";
import { BiDonateBlood, BiSearch } from "react-icons/bi";
import ListUser from "./list-users";
import Cookies from "js-cookie";
import TableDataPelatihan from "./dashboard/Pelatihan/TableDataPelatihan";
import TableDataPelatihanUser from "./dashboard/Pelatihan/TableDataPelatihanUser";
import { DialogSertifikatPelatihan } from "./sertifikat/dialogSertifikatPelatihan";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function UserTrainingService({ user }: { user: User | null }) {
  const [indexPelatihanSelected, setIndexPelatihanSelected] = React.useState<number>(0)
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
      available: true,
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
      available: true,
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
      available: false,
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
      available: true,
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
      available: false,
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

  const token = Cookies.get("XSRF081");

  const [userDetail, setUserDetail] = React.useState<User | null>(null);

  const handleFetchingUserDetail = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/users/getUsersById`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log({ response });
      setUserDetail(response.data);
    } catch (error) {
      console.error("Error posting training data:", error);
      throw error;
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      handleFetchingUserDetail();
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

  console.log(user?.Pelatihan);

  const CardPelatihan = ({ pelatihan, index }: { pelatihan: UserPelatihan, index: number }) => {
    return (
        <div
         
          className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8  shadow-custom hover:scale-105 duration-700"
        >
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 via-blue-500 to-teal-400"></span>
  
          <div className="sm:flex sm:justify-between sm:gap-4">
            <div>
              <h3  onClick={(e) => setIndexPelatihanSelected(index)} className="text-lg hover:cursor-pointer font-bold text-gray-900 sm:text-xl leading-[100%] ">
              Pelatihan Budidaya Ikan Air Tawar (CBIB) Ikan Nila
              </h3>
  
              <p className="mt-1 text-xs font-medium text-gray-600">
                By BPPP Medan · 29 Mei 2024 - 7 Juni 2024
              </p>
            </div>
  
            <div className="hidden sm:block sm:shrink-0">
              <Image
                width={0}
                height={0}
                alt=""
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                className="w-16 rounded-lg object-cover shadow-sm"
              />
            </div>
          </div>
  
          <div className="mt-2 mb-2">
            <p className="text-pretty text-sm text-gray-500">
            Pelatihan Cara Budidaya Ikan yang Baik (CBIB) untuk Ikan Nila adalah program pelatihan yang dirancang untuk memberikan pengetahuan dan keterampilan.
            </p>
          </div>
  
          {/* <DialogSertifikatPelatihan userPelatihan={pelatihan} pelatihan={{}}> */}
          {
            pelatihan?.NoSertifikat == "" ? <div className="flex gap-1">
          <Button
            variant="outline"
            onClick={(e) => setIndexPelatihanSelected(index)}
            className="w-full border flex gap-2 border-gray-600 text-left capitalize items-center justify-center"
          >
            <BiSearch className="h-4 w-4 text-gray-600" />{" "}
            <span className="text-xs">Cek Pelatihan</span>
          </Button>
          <Button
            variant="outline"
            className="w-full border flex gap-2 border-blue-600 text-left capitalize items-center justify-center"
          >
            <RiVerifiedBadgeFill className="h-4 w-4 text-blue-600" />{" "}
            <span className="text-xs">Lacak Sertifikat</span>
          </Button>
            </div>  : <Button
            variant="outline"
            className="w-full border flex gap-2 border-blue-600 text-left capitalize items-center justify-center"
          >
            <RiVerifiedBadgeFill className="h-4 w-4 text-blue-600" />{" "}
            <span className="text-xs"> Download Sertifikat</span>
          </Button>
          }
          
          {/* </DialogSertifikatPelatihan> */}
  
          <dl className="mt-6 flex gap-4 sm:gap-6">
            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium text-gray-600">Budidaya</dt>
              <dd className="text-xs text-gray-500">Bidang</dd>
            </div>
  
            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium text-gray-600">{pelatihan?.NoSertifikat == "" ? "-" : "No. B. " + pelatihan?.NoSertifikat}</dt>
              <dd className="text-xs text-gray-500">No Sertifikat</dd>
            </div>
          </dl>
        </div>
    );
  };

  return (
    <>
      <section className="relative h-fit pb-20 bg-white" id="explore">
        <div
          className="absolute inset-0 pointer-events-none mb-16 pb-10 h-full"
          aria-hidden="true"
        ></div>
        <div className="absolute left-0 right-0 m-auto w-px p-px h-28 bg-gray-200 transform -translate-y-1/2"></div>

        <div className="relative w-full mx-auto px-4 sm:px-6">
          <div className="pt-12 md:pt-20">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8">
              <h1 className="text-3xl font-calsans leading-[110%] text-black">
                Pelatihan Masyarakat, Teknis, <br /> dan Kepelatuan yang Diikuti
              </h1>
              <p className="text-base text-gray-600">
                Jelajahi layanan serta informasi yang ada pada Balai Pelatihan
                Kelautan dan Perikanan dan jadilah SDM kompeten bidang kelautan
                dan perikanan!
              </p>
            </div>
            <div className="w-full max-w-6xl mx-auto flex gap-5">
              <div className="flex flex-col gap-2 w-5/12">
                {userDetail?.Pelatihan.map((pelatihan, index) => (
                  <CardPelatihan pelatihan={pelatihan} key={index} index={index} />
                ))}
              </div>

              <div className="flex items-start justify-center w-7/12">
                <a
                  href="#"
                  className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:px-6 lg:py-0"
                >
                  <div className="sm:flex sm:justify-between sm:gap-4">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 sm:text-3xl leading-[105%]">
                      Pelatihan Budidaya Ikan Air Tawar (CBIB) Ikan Nila
                      </h3>

                      <p className="mt-1 text-xs font-medium text-gray-600">
                        By BPPP Medan · 29 Mei 2024 - 7 Juni 2024
                      </p>
                    </div>

                    <div className="hidden sm:block sm:shrink-0">
                      <Image
                        width={0}
                        height={0}
                        alt=""
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                        className="w-16 rounded-lg object-cover shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-pretty text-sm text-gray-500">
                    Pelatihan Cara Budidaya Ikan yang Baik (CBIB) untuk Ikan Nila adalah program pelatihan yang dirancang untuk memberikan pengetahuan dan keterampilan.
                    </p>
                  </div>

                  <dl className="mt-6 flex gap-4 sm:gap-6">
                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">
                        Budidaya
                      </dt>
                      <dd className="text-xs text-gray-500">Bidang</dd>
                    </div>

                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">
                        {userDetail?.Pelatihan[indexPelatihanSelected].NoSertifikat == "" ? "-" : userDetail?.Pelatihan[indexPelatihanSelected]?.NoSertifikat}
                      </dt>
                      <dd className="text-xs text-gray-500">No Sertifikat</dd>
                    </div>
                  </dl>

                  <Timeline />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );


}



const Timeline = () => {
  return (
    <section className="dark:bg-gray-100 dark:text-gray-800">
      <div className=" py-12 ">
        <div className="grid gap-4 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-3">
            <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-blue-500">
              <h3 className="text-xl font-semibold leading-[100%] mb-1">
                Progress Pelatihan
              </h3>
              <p className="text-pretty text-sm text-gray-500">
               Lihat progress pelaksanaan pelatihan yang kamu ikuti!
              </p>
            </div>
          </div>
          <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
            <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-300">
              <Slide direction="right">
                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-blue-500">
                  <h3 className="text-xl font-semibold tracking-wide">
                    Pendaftaran{" "}
                  </h3>
                  <time className="text-xs tracking-wide uppercase dark:text-gray-600">
                    Dec 2020
                  </time>
                  <p className="mt-3">
                    Pellentesque feugiat ante at nisl efficitur, in mollis orci
                    scelerisque. Interdum et malesuada fames ac ante ipsum
                    primis in faucibus.
                  </p>
                </div>
              </Slide>

              <Slide direction="right">
                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-blue-500">
                  <h3 className="text-xl font-semibold tracking-wide">
                    Pelaksanaan
                  </h3>
                  <time className="text-xs tracking-wide uppercase dark:text-gray-600">
                    Jul 2019
                  </time>
                  <p className="mt-3">
                    Morbi vulputate aliquam libero non dictum. Aliquam sit amet
                    nunc ut diam aliquet tincidunt nec nec dui. Donec mollis
                    turpis eget egestas sodales.
                  </p>
                </div>
              </Slide>
              <Slide direction="right">
                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-blue-500">
                  <h3 className="text-xl font-semibold tracking-wide">
                    Selesai Pelatihan
                  </h3>
                  <time className="text-xs tracking-wide uppercase dark:text-gray-600">
                    Jan 2016
                  </time>
                  <p className="mt-3">
                    Suspendisse tincidunt, arcu nec faucibus efficitur, justo
                    velit consectetur nisl, sit amet condimentum lacus orci nec
                    purus. Mauris quis quam suscipit, vehicula felis id,
                    vehicula enim.
                  </p>
                </div>
              </Slide>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
