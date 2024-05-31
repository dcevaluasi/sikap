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
import { Pelatihan } from "@/types/pelatihan";
import { PELATIHAN } from "@/dummies/pelatihan";
import { createSlug } from "@/utils";
import { PelatihanMasyarakat } from "@/types/product";

function ListProgram({ pelatihan }: { pelatihan: PelatihanMasyarakat[] }) {
  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={15}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        draggable
        navigation={true}
        modules={[FreeMode, Navigation]}
        className="mySwiper w-full md:max-w-6xl"
      >
        {/* {pelatihan.length != 0 &&
          pelatihan?.map((pelatihan: PelatihanMasyarakat, index: number) => (
            <SwiperSlide key={index}>
              <CardPelatihanMasyarakat pelatihan={pelatihan} />
            </SwiperSlide>
          ))} */}
        {PELATIHAN.map((pelatihan: Pelatihan, index: number) => (
          <SwiperSlide key={index}>
            <CardPelatihan pelatihan={pelatihan} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const CardPelatihanMasyarakat = ({
  pelatihan,
}: {
  pelatihan: PelatihanMasyarakat;
}) => {
  return (
    <div className="coverflow flex flex-col shadow-custom relative w-[360px] h-fit rounded-3xl">
      <div className="w-fit absolute top-4 right-4 flex gap-1">
        <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
          {pelatihan?.HargaPelatihan == ""
            ? "Gratis"
            : "Rp. " + pelatihan.HargaPelatihan}
        </div>
        <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
          {pelatihan.BidangPelatihan}
        </div>
      </div>

      <Image
        className="w-full rounded-tl-3xl rounded-tr-3xl h-fit object-cover"
        alt=""
        src={pelatihan.FotoPelatihan}
        width={0}
        height={0}
      />
      <div className="px-6 py-3">
        <div className="w-full pb-4">
          <h2 className="font-calsans text-xl duration-1000 text-black mt-2 leading-[110%]">
            {pelatihan.NamaPelatihan}
          </h2>
          <div className="flex gap-1 my-5 text-gray-600 text-sm items-center">
            <TbClockHour2 />
            <p>Pendaftaran : 25 April - 01 Mei 2024</p>
          </div>
          <p className="text-sm font-normal group-hover:text-xs text-gray-600 group-hover:duration-1000">
            Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat
            kelautan perikanan yang ingin mengasah skill nya dibidang kelautan
            dan perikanan...
          </p>
          <Link
            target="_blank"
            href={`/pelatihan/${createSlug(pelatihan.NamaPelatihan)}?id=${
              pelatihan.IdPelatihan
            }`}
            className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 rounded-3xl text-white"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

const CardPelatihan = ({ pelatihan }: { pelatihan: Pelatihan }) => {
  return (
    <div className="coverflow flex flex-col shadow-custom relative w-[360px] h-fit rounded-3xl">
      <div className="w-fit absolute top-4 right-4 flex gap-1">
        <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
          {pelatihan.HargaPelatihan == 0
            ? "Gratis"
            : "Rp. " + pelatihan.HargaPelatihan}
        </div>
        <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
          {pelatihan.BidangPelatihan}
        </div>
      </div>

      <Image
        className="w-full rounded-tl-3xl rounded-tr-3xl h-fit object-cover"
        alt=""
        src={`/images${pelatihan.CoverPelatihan}`}
        width={0}
        height={0}
      />
      <div className="px-6 py-3">
        <div className="w-full pb-4">
          <h2 className="font-calsans text-xl duration-1000 text-black mt-2 leading-[110%]">
            {pelatihan.JudulPelatihan}
          </h2>
          <div className="flex gap-1 my-1 text-gray-600 text-xs items-center">
            <TbClockHour2 />
            Pendaftaran :<p>{pelatihan.TanggalPendaftaran}</p>
          </div>
          <p className="text-sm font-normal group-hover:text-xs text-gray-600 group-hover:duration-1000">
            Pelatihan yang diselenggaran BPPSDM KP untuk menjaring masyarakat
            kelautan perikanan yang ingin mengasah skill nya dibidang kelautan
            dan perikanan...
          </p>
          <Link
            target="_blank"
            href={`/pelatihan/${createSlug(pelatihan.JudulPelatihan)}`}
            className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 rounded-3xl text-white"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListProgram;
