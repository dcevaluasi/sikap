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

export default function Features() {
  const tabMenus = [
    {
      id: 1,
      name: "Pelatihan Masyarakat KP",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/masyarakat.jpg",
      icon: (
        <HiUserGroup className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },
    {
      id: 2,
      name: "Pelatihan Aparatur KP",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring aparatur kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/aparatur.jpg",
      icon: (
        <FaUserTie className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },
    {
      id: 3,
      name: "Sertifikasi Masyarakat KP",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring aparatur kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/aparatur.jpg",
      icon: (
        <TbFileCertificate className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },
    {
      id: 4,
      name: "Sertifikasi Aparatur KP",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring aparatur kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/aparatur.jpg",
      icon: (
        <FaBuildingColumns className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
      ),
    },
    {
      id: 5,
      name: "Sertifikasi Peserta Didik",
      description:
        "Pelatihan yang diselenggaran BPPSDM KP untuk menjaring aparatur kelautan perikanan yang ingin mengasah skill nya dibidang kelautan dan perikanan",
      image: "/aparatur.jpg",
      icon: (
        <FaUserGraduate className="absolute right-5 bottom-5 text-5xl text-gray-200 duration-1000" />
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
        className="absolute inset-0 bg-gray-100 pointer-events-none mb-16 pb-10 h-full"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-28 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}

          <div className="max-w-2xl mx-auto text-center pb-5 md:pb-8">
            <h1 className="text-3xl font-calsans leading-[110%]">
              Pelatihan Masyarakat Umum KP
            </h1>
            <p className="text-base text-gray-600">
              Optimalkan potensi sumber daya laut. Bergabunglah dalam pelatihan masyarakat kelautan dan perikanan untuk masa depan yang berkelanjutan dan produktif.
            </p>
          </div>

          {/* Section content */}
          {/* <Swiper
            navigation={true}
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation]}
            className="mySwiper flex gap-5 features"
          >
            {tabMenus.map((tabMenu, index) => (
              <SwiperSlide key={index} className="h-fit w-full features ">
                <div
                  className={`rounded-3xl w-full cursor-pointer relative overflow-hidden hover:scale-105 duration-700 ${
                    !menuSelected ? "h-[200px]" : "h-[100px]"
                  } ${
                    indexMenuSelected + 1 == tabMenu.id && menuSelected
                      ? "border-spacing-1 border-4 border-blue-500"
                      : ""
                  } group `}
                  key={index}
                  // data-aos="zoom-y-out"
                  onClick={(e) => handleSelectedMenu(index)}
                >
                  <Image
                    style={{
                      filter: "brightness(80%) saturate(140%)",
                    }}
                    className="mx-auto block w-full object-cover"
                    src={`/images/${tabMenu.image}`}
                    width={0}
                    height={0}
                    alt="Masyarakat KP"
                    priority
                  />
                  <div
                    className="flex-col absolute flex top-0 bottom-auto left-0 right-0 text-white text-left"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0,0,0,.6),transparent)",
                      padding: "20px 20px",
                    }}
                  >
                    <h2 className="font-calsans text-2xl duration-1000">
                      {tabMenu.name}
                    </h2>
                    {menuSelected ? null : (
                      <p className="hidden text-base group-hover:block group-hover:text-xs group-hover:duration-1000">
                        {tabMenu.description}
                      </p>
                    )}
                  </div>

                  {tabMenu.icon}
                </div>
              </SwiperSlide>
            ))}
          </Swiper> */}

          {/* {menuSelected && (
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
          )} */}

          <ListProgram />
        </div>
      </div>
    </section>
  );
}
