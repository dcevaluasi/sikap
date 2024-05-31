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
    <div className="grid grid-cols-3 gap-4">
      {/* {pelatihan.length != 0 &&
          pelatihan?.map((pelatihan: PelatihanMasyarakat, index: number) => (
            <SwiperSlide key={index}>
              <CardPelatihanMasyarakat pelatihan={pelatihan} />
            </SwiperSlide>
          ))} */}
      {PELATIHAN.map((pelatihan: Pelatihan, index: number) => (
        <CardPelatihan key={index} pelatihan={pelatihan} />
      ))}
    </div>
  );
}

const CardPelatihan = ({ pelatihan }: { pelatihan: Pelatihan }) => {
  return (
    <div className="coverflow flex flex-row shadow-custom relative w-full h-fit rounded-3xl">
      <Image
        className="w-[200px] rounded-2xl h-fit object-cover"
        alt=""
        src={`/images${pelatihan.CoverPelatihan}`}
        width={0}
        height={0}
      />
      <div className=" flex flex-col gap-1">
        <div className="w-full pb-4">
          <h2 className="font-calsans text-xl duration-1000 text-black mt-2 leading-[110%]">
            {pelatihan.JudulPelatihan}
          </h2>
          <p className="text-sm font-normal group-hover:text-xs text-gray-600 group-hover:duration-1000"></p>
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
