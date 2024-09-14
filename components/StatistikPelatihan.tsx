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

import CountUp from "react-countup";

import { FaUserTie } from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import "./coverflow.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

import Link from "next/link";

export default function StatistikPelatihan() {
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
    <section className="relative h-fit pb-20" id="explore">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none mb-16 pb-10 h-full"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-28 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}

          <div className="max-w-3xl w-full mx-auto text-center pflex flex-col items-center justify-center pb-5 md:pb-8">
            <h1 className="text-4xl font-calsans leading-[100%]">
              Statistik Pelatihan dan Sertifikasi
              <br />
              Bidang KP tahun 2024
            </h1>
            <p className="text-base text-gray-60">
              Jelajahi Peluang Baru dengan Pelatihan dan Uji Kompetensi
              Inovatif, bergabunglah dengan Program Kami untuk Mengasah
              Kompetensi-mu di bidang Kelautan dan Perikanan.
            </p>
          </div>

          <div className="p-6">
            <div className="mx-auto grid justify-center text-center grid-cols-1 lg:grid-cols-3 gap-10 md:gap-0">
              <div className="flex flex-col justify-start m-2 lg:m-6">
                <p className="text-5xl font-bold leading-none lg:text-[6rem]">
                  <CountUp end={29.632} duration={5} />
                  <span>K</span>
                </p>
                <p className="text-sm sm:text-base">
                  Lulusan Pelatihan <br /> (Masyarakat & Aparatur)
                </p>
              </div>
              <div className="flex flex-col justify-start m-2 lg:m-6">
                <p className="text-5xl font-bold  leading-none lg:text-[6rem]">
                  <CountUp end={376} duration={5} />
                  <span>+</span>
                </p>
                <p className="text-sm sm:text-base">
                  Terselenggaranya <br /> Pelatihan dan Sertifikasi
                </p>
              </div>
              <div className="flex flex-col justify-start m-2 lg:m-6">
                <p className="text-5xl font-bold leading-none lg:text-[6rem]">
                  <CountUp end={666} duration={5} />
                  <span></span>
                </p>
                <p className="text-sm sm:text-base">
                  SDM Berkompetensi <br /> Kelautan dan Perikanan
                </p>
              </div>
            </div>
          </div>

          <p className=" text-center text-sm mt-10">
            Sumber :{" "}
            <span className="italic">
              Data Triwulan II Tahun 2024 Pusat Pelatihan dan Kelautan .
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
