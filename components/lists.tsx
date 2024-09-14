import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "./../app/css/additional-styles/coverflow-slider.css";

// Import Swiper modules
import { Pagination, Navigation, FreeMode } from "swiper/modules";
import Image from "next/image";
import { TbClockHour2 } from "react-icons/tb";
import Link from "next/link";
import { createSlug, truncateText } from "@/utils";
import { PelatihanMasyarakat } from "@/types/product";

function ListProgram({
  pelatihan,
  type,
}: {
  pelatihan: PelatihanMasyarakat[];
  type: string;
}) {
  const filteredPelatihan = pelatihan.filter(
    (item) => item.Status == "Publish"
  );
  return (
    <div>
      {filteredPelatihan.length > 0 ? (
        <Swiper
          slidesPerView={1} // Adjust this to control how many slides are shown on mobile view
          spaceBetween={15}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          navigation={true} // Enable navigation arrows
          modules={[FreeMode, Pagination, Navigation]} // Add Pagination and Navigation modules
          className="mySwiper w-full md:max-w-6xl"
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }} // Add breakpoints for responsive design
        >
          {filteredPelatihan.map(
            (pelatihan: PelatihanMasyarakat, index: number) => (
              <SwiperSlide key={index}>
                <CardPelatihan pelatihan={pelatihan} />
              </SwiperSlide>
            )
          )}
        </Swiper>
      ) : (
        <div className="relative max-w-6xl w-full mx-auto px-4 sm:px-6">
          <div className="pt-7 md:pt-0 flex flex-col items-center">
            <Image
              src={"/illustrations/not-found.png"}
              alt="Not Found"
              width={0}
              height={0}
              className="w-[350px] md:w-[400px]"
            />
            <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8 -mt-2">
              <h1 className="text-2xl md:text-3xl font-calsans leading-[110%] text-black">
                Belum Ada Pelatihan
              </h1>
              <div className="text-gray-600 text-center  max-w-md">
                Balai Pelatihan belum mengupload pelatihan yang dapat kamu ikut,
                stay tune terus sobat elaut!{" "}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const CardPelatihan = ({ pelatihan }: { pelatihan: PelatihanMasyarakat }) => {
  return (
    <div className="coverflow flex flex-col shadow-custom relative w-[350px] h-fit rounded-3xl">
      <div className="w-fit absolute top-4 right-4 flex gap-1 z-[60]">
        <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
          {pelatihan.HargaPelatihan == "0"
            ? "Gratis"
            : "Rp. " + pelatihan.HargaPelatihan}
        </div>
        <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
          {pelatihan.BidangPelatihan}
        </div>
      </div>
      <div className="w-full relative h-[240px]">
        <div className="flex w-full absolute h-[240px] bg-gradient-to-r opacity-40 from-blue-500 to-teal-400 bg-opacity-20 rounded-tl-3xl rounded-tr-3xl"></div>
        <Image
          className="w-full rounded-tl-3xl rounded-tr-3xl h-full object-cover"
          alt=""
          src={`${pelatihan.FotoPelatihan}`}
          width={0}
          height={0}
        />
      </div>

      <div className="py-3 relative ">
        <div className="w-full pb-4 px-6">
          <h2 className="font-calsans text-xl duration-1000 text-black mt-2 leading-[110%]">
            {truncateText(pelatihan?.NamaPelatihan, 50, "...")}
          </h2>
          <div className="flex gap-1 my-1 text-gray-600 text-sm items-center">
            <TbClockHour2 />
            Penyelenggara :<p>{pelatihan.PenyelenggaraPelatihan}</p>
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html:
                pelatihan &&
                truncateText(pelatihan?.DetailPelatihan, 150, "..."),
            }}
            className="text-sm font-normal group-hover:text-xs text-gray-600 group-hover:duration-1000"
          />

          <Link
            href={`/pelatihan/${createSlug(pelatihan.NamaPelatihan)}/${
              pelatihan?.KodePelatihan
            }/${pelatihan?.IdPelatihan}`}
            className="w-full mt-4 block text-sm text-center font-medium px-6 py-2 bg-blue-500 rounded-3xl text-white"
          >
            Registrasi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListProgram;
