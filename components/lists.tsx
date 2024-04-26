import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./../app/css/additional-styles/coverflow-slider.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/free-mode";

import "swiper/css/navigation";
import { Pagination, Navigation, FreeMode } from "swiper/modules";

// import required modules
import { EffectCards } from "swiper/modules";
import Image from "next/image";
import { TbClockHour2 } from "react-icons/tb";
import Link from "next/link";

function ListProgram() {
  return (
    <div>
      {/* <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Navigation]}
        className="mySwiper2"
        loop
        navigation={true}
        initialSlide={3}
        data-aos="zoom-y-out"
        spaceBetween={300}
      > */}
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
                Gratis
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
                  Lihat Informasi
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="coverflow flex shadow-custom flex-col relative w-[360px] h-fit rounded-3xl">
            <div className="w-fit absolute top-4 right-4 flex gap-1">
              <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
                Gratis
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
                  Lihat Informasi
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="coverflow flex shadow-custom flex-col relative w-[360px] h-fit rounded-3xl">
            <div className="w-fit absolute top-4 right-4 flex gap-1">
              <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
                Gratis
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
                  Lihat Informasi
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="coverflow flex shadow-custom flex-col relative w-[360px] h-fit rounded-3xl">
            <div className="w-fit absolute top-4 right-4 flex gap-1">
              <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
                Gratis
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
                  Lihat Informasi
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="coverflow flex shadow-custom flex-col relative w-[360px] h-fit rounded-3xl">
            <div className="w-fit absolute top-4 right-4 flex gap-1">
              <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
                Gratis
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
                  Lihat Informasi
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* <SwiperSlide className="coverflow flex flex-col relative ">
          <div className="w-fit absolute top-4 right-4 flex gap-1">
            <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
              Gratis
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
              <h2 className="font-calsans text-xl duration-1000 leading-[100%] text-black">
                Pelatihan Budidaya Ikan Lobster Standar SKKNI
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
                className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 text-white rounded-3xl"
              >
                Lihat Informas Pelatihan
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="coverflow flex flex-col relative ">
          <div className="w-fit absolute top-4 right-4 flex gap-1">
            <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
              Rp 100.000
            </div>
            <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
              Konservasi
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
              <h2 className="font-calsans text-xl leading-[100%] mb-2 duration-1000 text-black">
                Konservasi Kealutan Berbasis Kelestarian Lingkungan
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
                className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 text-white rounded-3xl"
              >
                Lihat Informas Pelatihan
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="coverflow flex flex-col relative ">
          <div className="w-fit absolute top-4 right-4 flex gap-1">
            <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
              Gratis
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
              <h2 className="font-calsans text-xl duration-1000 leading-[100%] text-black">
                Pelatihan Budidaya Ikan Lobster Standar SKKNI
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
                className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 text-white rounded-3xl"
              >
                Lihat Informas Pelatihan
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="coverflow flex flex-col relative ">
          <div className="w-fit absolute top-4 right-4 flex gap-1">
            <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
              Gratis
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
              <h2 className="font-calsans text-xl duration-1000 leading-[100%] text-black">
                Pelatihan Budidaya Ikan Lobster Standar SKKNI
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
                className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 text-white rounded-3xl"
              >
                Lihat Informas Pelatihan
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="coverflow flex flex-col relative ">
          <div className="w-fit absolute top-4 right-4 flex gap-1">
            <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
              Rp 100.000
            </div>
            <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
              Konservasi
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
              <h2 className="font-calsans text-xl leading-[100%] mb-2 duration-1000 text-black">
                Konservasi Kealutan Berbasis Kelestarian Lingkungan
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
                className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 text-white rounded-3xl"
              >
                Lihat Informas Pelatihan
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="coverflow flex flex-col relative ">
          <div className="w-fit absolute top-4 right-4 flex gap-1">
            <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
              Gratis
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
              <h2 className="font-calsans text-xl duration-1000 leading-[100%] text-black">
                Pelatihan Budidaya Ikan Lobster Standar SKKNI
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
                className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 text-white rounded-3xl"
              >
                Lihat Informas Pelatihan
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="coverflow flex flex-col relative ">
          <div className="w-fit absolute top-4 right-4 flex gap-1">
            <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
              Rp 100.000
            </div>
            <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
              Konservasi
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
              <h2 className="font-calsans text-xl leading-[100%] mb-2 duration-1000 text-black">
                Konservasi Kealutan Berbasis Kelestarian Lingkungan
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
                className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 text-white rounded-3xl"
              >
                Lihat Informas Pelatihan
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="coverflow flex flex-col relative ">
          <div className="w-fit absolute top-4 right-4 flex gap-1">
            <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
              Gratis
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
              <h2 className="font-calsans text-xl duration-1000 leading-[100%] text-black">
                Pelatihan Budidaya Ikan Lobster Standar SKKNI
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
                className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 text-white rounded-3xl"
              >
                Lihat Informas Pelatihan
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="coverflow flex flex-col relative ">
          <div className="w-fit absolute top-4 right-4 flex gap-1">
            <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
              Rp 100.000
            </div>
            <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
              Konservasi
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
              <h2 className="font-calsans text-xl leading-[100%] mb-2 duration-1000 text-black">
                Konservasi Kealutan Berbasis Kelestarian Lingkungan
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
                className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 text-white rounded-3xl"
              >
                Lihat Informas Pelatihan
              </Link>
            </div>
          </div>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
}

export default ListProgram;
