"use client";

import React, { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import FeaturesBg from "@/public/images/features-bg.png";
import FeaturesElement from "@/public/images/features-element.png";
import { GiLuckyFisherman, GiWaterSplash } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi2";

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
import { GrLocation } from "react-icons/gr";
import { Button } from "./ui/button";
import { FiSearch, FiSlack } from "react-icons/fi";
import { Input } from "./ui/input";
import BPPPTrainings from "./bppp-trainings";
import { usePathname } from "next/navigation";
import { extractPathAfterBppp, getPenyeleggara } from "@/utils/pelatihan";
import { PelatihanMasyarakat } from "@/types/product";
import axios, { AxiosResponse } from "axios";
import BPPPCertificates from "./bppp-certificates";
import BPPPProfile from "./bppp-profile";

export default function BPPPServices() {
  const tabMenus = [
    {
      id: 1,
      name: "Pelatihan",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/illustrations/bppp-training.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },
    {
      id: 2,
      name: "Uji Kompetensi",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/illustrations/bppp-certificate.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },

    {
      id: 3,
      name: "Profil BPPP",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/illustrations/bppp-profile.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },
    {
      id: 4,
      name: "Fasilitas",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/illustrations/bppp-facility.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
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
      <section className="relative h-fit pb-20" id="explore">
        <div
          className="absolute inset-0 pointer-events-none mb-16 pb-10 h-full"
          aria-hidden="true"
        ></div>
        <div className="absolute left-0 right-0 m-auto w-px p-px h-28 bg-gray-200 transform -translate-y-1/2"></div>

        <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6">
          <div className="pt-12 md:pt-20">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8">
              <h1 className="text-3xl font-calsans leading-[110%]">
                Layanan dan Informasi
                <br />
                Balai Pelatihan Kelautan dan Perikanan
              </h1>
              <p className="text-base text-gray-600">
                Jelajahi layanan serta informasi yang ada pada Balai Pelatihan
                Kelautan dan Perikanan dan jadilah SDM kompeten bidang kelautan
                dan perikanan!
              </p>
            </div>

            <div className="flex flex-row flex-wrap md:flex-nowrap items-center justify-center gap-5 md:gap-9">
              {tabMenus.map((tabMenu, index) => (
                <div key={index} className="gap-4 w-fit">
                  <Slide direction="up" duration={500 * index}>
                    <div
                      key={index}
                      onClick={(e) => handleSelectedMenu(index)}
                      className="flex flex-col gap-2 cursor-pointer items-center duration-1000 hover:scale-105 text-center"
                    >
                      <div className="flex items-center justify-center  bg-white shadow-custom rounded-full w-24 h-24 md:w-28 md:h-28 p-6">
                        <Image
                          className="w-16 md:w-16"
                          width={0}
                          height={0}
                          src={tabMenu.image}
                          alt="Kementrian Kelautan dan Perikanan RI Logo"
                        />
                      </div>
                      <p className="text-sm text-black font-semibold">
                        {tabMenu.name}
                      </p>
                    </div>
                  </Slide>
                </div>
              ))}
            </div>
            {/* </Swiper> */}
          </div>
        </div>
      </section>
      {indexMenuSelected == 0 ? (
        <BPPPTrainings data={data} />
      ) : indexMenuSelected == 1 ? (
        <BPPPCertificates data={[]} />
      ) : indexMenuSelected == 2 ? (
        <BPPPProfile data={data} />
      ) : (
        <BPPPCertificates data={data} />
      )}
    </>
  );
}
