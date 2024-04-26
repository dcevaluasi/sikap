"use client";

import React, { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import FeaturesBg from "@/public/images/features-bg.png";
import FeaturesElement from "@/public/images/features-element.png";
import { GiLuckyFisherman, GiWaterSplash } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi2";
import { TbClockHour2, TbFileCertificate } from "react-icons/tb";
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
import { Pagination, Navigation, FreeMode } from "swiper/modules";
import ListProgram from "./lists";
import Link from "next/link";

export default function FeatureCertificates() {
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
              Sertifikasi Non-Konvensi <br /> Kelautan dan Perikanan
            </h1>
            <p className="text-base text-gray-600">
              Dapatkan keunggulan kompetitif dengan sertifikasi masyarakat
              kelautan dan perikanan. Tingkatkan kredibilitas dan peluang karier
              Anda dalam industri dan membangun bangsa!
            </p>
          </div>

          <Swiper
            slidesPerView={3}
            spaceBetween={10}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[FreeMode, Navigation]}
            className="mySwiper max-w-6xl"
          >
            <SwiperSlide>
              <div className="coverflow flex shadow-custom flex-col relative w-[360px] h-fit rounded-3xl">
                <div className="w-fit absolute top-4 right-4 flex gap-1">
                  <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
                    Rp 875.000
                  </div>
                  <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
                    Budidaya
                  </div>
                </div>

                <Image
                  className="w-full rounded-tl-3xl rounded-tr-3xl h-fit object-cover"
                  alt=""
                  src="/images/hero-img.jpg"
                  width={0}
                  height={0}
                />
                <div className="px-6 py-3">
                  <div className="w-full pb-4 gap-3">
                    <h2 className="font-calsans text-xl duration-1000 text-black mt-2">
                      Pelatihan Budidaya Ikan Lobster
                    </h2>
                    <div className="flex gap-1 text-gray-600 text-sm items-center">
                      <TbClockHour2 />
                      <p>Pendaftaran : 25 April - 01 Mei 2024</p>
                    </div>
                    <p className="text-sm font-normal group-hover:text-xs text-gray-600 group-hover:duration-1000">
                      Pelatihan yang diselenggaran BPPSDM KP untuk menjaring
                      masyarakat kelautan perikanan yang ingin mengasah skill nya
                      dibidang kelautan dan perikanan...
                    </p>
                    <Link
                      target="_blank"
                      href="/pelatihan/konservasi-kelautan-berbasis-kelestarian-lingkungan"
                      className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 rounded-3xl text-white"
                    >
                      Registrasi
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="coverflow flex shadow-custom flex-col relative w-[360px] h-fit rounded-3xl">
                <div className="w-fit absolute top-4 right-4 flex gap-1">
                  <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
                    Rp 1.500.000
                  </div>
                  <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
                    Budidaya
                  </div>
                </div>

                <Image
                  className="w-full rounded-tl-3xl rounded-tr-3xl h-fit object-cover"
                  alt=""
                  src="/images/hero-img2.jpg"
                  width={0}
                  height={0}
                />
                <div className="px-6 py-3">
                  <div className="w-full pb-4 gap-3">
                    <h2 className="font-calsans text-xl duration-1000 text-black mt-2">
                      Pelatihan Budidaya Ikan Lobster
                    </h2>
                    <div className="flex gap-1 text-gray-600 text-sm items-center">
                      <TbClockHour2 />
                      <p>Pendaftaran : 25 April - 01 Mei 2024</p>
                    </div>
                    <p className="text-sm font-normal group-hover:text-xs text-gray-600 group-hover:duration-1000">
                      Pelatihan yang diselenggaran BPPSDM KP untuk menjaring
                      masyarakat kelautan perikanan yang ingin mengasah skill nya
                      dibidang kelautan dan perikanan...
                    </p>
                    <Link
                      target="_blank"
                      href="/pelatihan/konservasi-kelautan-berbasis-kelestarian-lingkungan"
                      className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 rounded-3xl text-white"
                    >
                      Registrasi
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="coverflow flex shadow-custom flex-col relative w-[360px] h-fit rounded-3xl">
                <div className="w-fit absolute top-4 right-4 flex gap-1">
                  <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
                    Rp. 300.000
                  </div>
                  <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
                    Budidaya
                  </div>
                </div>

                <Image
                  className="w-full rounded-tl-3xl rounded-tr-3xl h-fit object-cover"
                  alt=""
                  src="/images/hero-img3.jpg"
                  width={0}
                  height={0}
                />
                <div className="px-6 py-3">
                  <div className="w-full pb-4 gap-3">
                    <h2 className="font-calsans text-xl duration-1000 text-black mt-2">
                      Pelatihan Budidaya Ikan Lobster
                    </h2>
                    <div className="flex gap-1 text-gray-600 text-sm items-center">
                      <TbClockHour2 />
                      <p>Pendaftaran : 25 April - 01 Mei 2024</p>
                    </div>
                    <p className="text-sm font-normal group-hover:text-xs text-gray-600 group-hover:duration-1000">
                      Pelatihan yang diselenggaran BPPSDM KP untuk menjaring
                      masyarakat kelautan perikanan yang ingin mengasah skill nya
                      dibidang kelautan dan perikanan...
                    </p>
                    <Link
                      target="_blank"
                      href="/pelatihan/konservasi-kelautan-berbasis-kelestarian-lingkungan"
                      className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 rounded-3xl text-white"
                    >
                      Registrasi
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="coverflow flex shadow-custom flex-col relative w-[360px] h-fit rounded-3xl">
                <div className="w-fit absolute top-4 right-4 flex gap-1">
                  <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
                    Rp 500.000
                  </div>
                  <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
                    Budidaya
                  </div>
                </div>

                <Image
                  className="w-full rounded-tl-3xl rounded-tr-3xl h-fit object-cover"
                  alt=""
                  src="/images/hero-img4.jpg"
                  width={0}
                  height={0}
                />
                <div className="px-6 py-3">
                  <div className="w-full pb-4 gap-3">
                    <h2 className="font-calsans text-xl duration-1000 text-black mt-2">
                      Pelatihan Budidaya Ikan Lobster
                    </h2>
                    <div className="flex gap-1 text-gray-600 text-sm items-center">
                      <TbClockHour2 />
                      <p>Pendaftaran : 25 April - 01 Mei 2024</p>
                    </div>
                    <p className="text-sm font-normal group-hover:text-xs text-gray-600 group-hover:duration-1000">
                      Pelatihan yang diselenggaran BPPSDM KP untuk menjaring
                      masyarakat kelautan perikanan yang ingin mengasah skill nya
                      dibidang kelautan dan perikanan...
                    </p>
                    <Link
                      target="_blank"
                      href="/pelatihan/konservasi-kelautan-berbasis-kelestarian-lingkungan"
                      className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 rounded-3xl text-white"
                    >
                      Registrasi
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="coverflow flex shadow-custom flex-col relative w-[360px] h-fit rounded-3xl">
                <div className="w-fit absolute top-4 right-4 flex gap-1">
                  <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
                    Rp 1.000.000
                  </div>
                  <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
                    Budidaya
                  </div>
                </div>

                <Image
                  className="w-full rounded-tl-3xl rounded-tr-3xl h-fit object-cover"
                  alt=""
                  src="/images/hero-img5.jpg"
                  width={0}
                  height={0}
                />
                <div className="px-6 py-3">
                  <div className="w-full pb-4 gap-3">
                    <h2 className="font-calsans text-xl duration-1000 text-black mt-2">
                      Pelatihan Budidaya Ikan Lobster
                    </h2>
                    <div className="flex gap-1 text-gray-600 text-sm items-center">
                      <TbClockHour2 />
                      <p>Pendaftaran : 25 April - 01 Mei 2024</p>
                    </div>
                    <p className="text-sm font-normal group-hover:text-xs text-gray-600 group-hover:duration-1000">
                      Pelatihan yang diselenggaran BPPSDM KP untuk menjaring
                      masyarakat kelautan perikanan yang ingin mengasah skill nya
                      dibidang kelautan dan perikanan...
                    </p>
                    <Link
                      target="_blank"
                      href="/pelatihan/konservasi-kelautan-berbasis-kelestarian-lingkungan"
                      className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 rounded-3xl text-white"
                    >
                      Registrasi
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
