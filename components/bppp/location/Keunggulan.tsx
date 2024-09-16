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

export default function Keunggulan() {
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

          <div className="max-w-3xl w-full mx-auto text-center pflex flex-col items-center justify-center pb-5 md:pb-8">
            <h1 className="text-4xl font-calsans leading-[100%]">
              Mari bergabung dalam platform kami
              <br />
              untuk menggunakan berbagai layanan terpadu digital
            </h1>
            <p className="text-base text-gray-60">
              Jelajahi Peluang Baru dengan Pelatihan dan Uji Kompetensi
              Inovatif, bergabunglah dengan Program Kami untuk Mengasah
              Kompetensi-mu di bidang Kelautan dan Perikanan.
            </p>
          </div>

          <div className="p-6">
            <div className="mx-auto grid justify-center text-center grid-cols-1 lg:grid-cols-4 gap-10 md:gap-0">
              <div className="flex flex-col justify-start m-2 lg:m-6 items-center">
                <div className="rounded-full w-28 h-28 p-3  bg-white shadow-custom flex items-center justify-center mb-3">
                  <Image
                    src={"/images/balai-pelatihan/keunggulan/bersih.png"}
                    alt="Nilai Bersih"
                    width={0}
                    height={0}
                    className="w-16"
                  />
                </div>
                <p className="font-calsans text-xl">Bersih</p>
                <p className="text-sm">
                  Kami percaya bahwa kreativitas dan inovasi adalah kunci untuk
                  menjadi legenda melebihi apa yang kami impikan.
                </p>
              </div>
              <div className="flex flex-col justify-start m-2 lg:m-6 items-center">
                <div className="rounded-full w-28 h-28 p-3  bg-white  shadow-custom flex items-center justify-center mb-3">
                  <Image
                    src={"/images/balai-pelatihan/keunggulan/terbaik.png"}
                    alt="Nilai Bersih"
                    width={0}
                    height={0}
                    className="w-16"
                  />
                </div>
                <p className="font-calsans text-xl">Pelayanan Terbaik</p>
                <p className="text-sm">
                  Kami belajar dari satu sama lain di sini untuk berkolaborasi
                  dan berbagi pengetahuan untuk masa depan yang lebih baik.
                </p>
              </div>
              <div className="flex flex-col justify-start m-2 lg:m-6 items-center">
                <div className="rounded-full w-28 h-28 p-3  bg-white shadow-custom flex items-center justify-center mb-3">
                  <Image
                    src={"/images/balai-pelatihan/keunggulan/ramah.png"}
                    alt="Nilai Bersih"
                    width={0}
                    height={0}
                    className="w-16"
                  />
                </div>
                <p className="font-calsans text-xl">Ramah dan Menyenangkan</p>
                <p className="text-sm">
                  Kami mendukung budaya kerja yang ramah dan menyenangkan untuk
                  memberikan pelayanan dan pengalaman terbaik bagi masyarakat
                </p>
              </div>
              <div className="flex flex-col justify-start m-2 lg:m-6 items-center">
                <div className="rounded-full w-28 h-28 p-3  bg-white shadow-custom flex items-center justify-center mb-3">
                  <Image
                    src={"/images/balai-pelatihan/keunggulan/komitmen.png"}
                    alt="Nilai Bersih"
                    width={0}
                    height={0}
                    className="w-16"
                  />
                </div>
                <p className="font-calsans text-xl">Komitmen dan Adaptasi</p>
                <p className="text-sm">
                  Kami percaya bahwa menjaga komitmen dan beradaptasi
                  mengingatkan kita tentang siapa kita dan membuat kita.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
