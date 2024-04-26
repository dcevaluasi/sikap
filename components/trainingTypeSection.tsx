"use client";

import React, { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import FeaturesBg from "@/public/images/features-bg.png";
import FeaturesElement from "@/public/images/features-element.png";
import { GiLuckyFisherman, GiWaterSplash } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi2";
import { TbFileCertificate } from "react-icons/tb";
import { FaBuildingColumns } from "react-icons/fa6";
import { FaUserGraduate } from "react-icons/fa";

import { FaUserTie } from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";

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

export default function TrainingTypeSection() {
  const tabMenus = [
    {
      id: 1,
      name: "Budidaya",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/images/bidangPelatihan/budidaya.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },
    {
      id: 2,
      name: "Konservasi",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/images/bidangPelatihan/konservasi.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },

    {
      id: 3,
      name: "SD Perikanan",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/images/bidangPelatihan/sd-perikanan.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },
    {
      id: 4,
      name: "Kepelautan",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/images/bidangPelatihan/kepelautan.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },
    {
      id: 5,
      name: "Penangkapan",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/images/bidangPelatihan/penangkapan.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },
    {
      id: 6,
      name: "Mesin Perikanan",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/images/bidangPelatihan/mesin-perikanan.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },
    {
      id: 7,
      name: "Pengolahan & Pemasaran",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/images/bidangPelatihan/pengolahan-pemasaran.png",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },
  ];

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
    <section className="relative h-fit pb-10" id="explore">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0  pointer-events-none mb-16 pb-10 h-full"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-28 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8">
            <h1 className="text-3xl font-calsans leading-[110%]">
              Ragam Bidang <br />
              Kelautan dan Perikanan
            </h1>
            <p className="text-base text-gray-600">
              Pilih bidang kepelautan dan perikanan yang untuk pelatihan dan
              sertifikasi yang ingin kamu ikuti!
            </p>
          </div>

          {/* Section content */}
          <Swiper
            navigation={true}
            slidesPerView={7}
            spaceBetween={0}
            modules={[Navigation]}
            className="mySwiper flex gap-5 features flex-row -mt-7"
          >
            <div className="flex flex-row items-center justify-center gap-7">
              {tabMenus.map((tabMenu, index) => (
                <SwiperSlide className="gap-4 max-w-4xl w-full">
                  <Slide direction="up" duration={500 * index}>
                    <div
                      key={index}
                      className="flex flex-col gap-2 cursor-pointer items-center duration-1000 hover:scale-105 text-center"
                    >
                      <div className="flex items-center justify-center  bg-white shadow-custom rounded-full w-28 h-28 p-6">
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
                </SwiperSlide>
              ))}
            </div>
          </Swiper>

          {menuSelected && (
            <div className="mt-6 w-full max-w-8xl justify-evenly mx-auto flex">
              <div className="w-[450px] -ml-10" data-aos="zoom-y-out">
                <h2 className="font-calsans text-3xl duration-1000">
                  Pelatihan Masyarakat KP
                </h2>
                <p className="text-base group-hover:text-xs text-gray-600 group-hover:duration-1000">
                  Pelatihan yang diselenggaran BPPSDM KP untuk menjaring
                  masyarakat kelautan perikanan yang ingin mengasah skill nya
                  dibidang kelautan dan perikanan
                </p>
                <div className="w-[100px] h-2 rounded-sm bg-blue-500 mt-3"></div>
              </div>
              <ListProgram />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
