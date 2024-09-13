"use client";

import FeaturesDiklatKepelautan from "@/components/features-diklat-kepelautan";
import Hero from "@/components/hero";
import HeroProgramPelatihan from "@/components/hero/HeroProgramPelatihan";
import { getLastValuePath } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";

// Import Swiper modules
import { Pagination, Navigation, FreeMode } from "swiper/modules";

import {
  FaShip,
  FaCertificate,
  FaAnchor,
  FaRegFileAlt,
  FaMedal,
  FaScrewdriver,
  FaTachometerAlt,
  FaStar,
} from "react-icons/fa";
import Image from "next/image";

function page() {
  const programPelatihanPath = getLastValuePath(usePathname());
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <HeroProgramPelatihan program={programPelatihanPath!} />
      <RagamBidangPelatihan />
      <FeaturesDiklatKepelautan />
    </>
  );
}

function RagamBidangPelatihan() {
  const programPelatihanPath = getLastValuePath(usePathname());

  const akp = [
    {
      id: 1,
      name: "BSTF",
      longname: "Basic Safety Training Fisheries",
      description:
        "Pelatihan dasar keselamatan untuk awak kapal perikanan yang mencakup penanganan situasi darurat di laut.",
      component: (
        <FaShip className="group-hover:scale-125 text-gray-300 group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
      ),
      img: "/images/program-pelatihan/dummies/akp/akp-6.jpg",
    },
    {
      id: 2,
      name: "ANKAPIN",
      longname: "Ahli Nautika Kapal Penangkap Ikan",
      description:
        "Pelatihan untuk ahli nautika dalam mengoperasikan dan menavigasi kapal penangkap ikan dengan keselamatan dan efisiensi.",
      component: (
        <FaCertificate className="group-hover:scale-125 text-gray-300 group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
      ),
      img: "/images/program-pelatihan/dummies/akp/akp-2.jpg",
    },
    {
      id: 3,
      name: "ATKAPIN",
      longname: "Ahli Teknika Kapal Penangkap Ikan",
      description:
        "Pelatihan teknis untuk ahli teknika dalam pengoperasian mesin kapal penangkap ikan dan perawatan teknis di laut.",
      component: (
        <FaAnchor className="group-hover:scale-125 text-gray-300 group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
      ),
      img: "/images/program-pelatihan/dummies/akp/akp-7.jpg",
    },
    {
      id: 4,
      name: "SKN",
      longname: "Sertifikasi Kecakapan Nelayan",
      description:
        "Sertifikasi resmi untuk memastikan kecakapan nelayan dalam penangkapan ikan dengan standar kompetensi yang berlaku.",
      component: (
        <FaRegFileAlt className="group-hover:scale-125 text-gray-300 group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-3xl" />
      ),
      img: "/images/program-pelatihan/dummies/akp/akp-8.jpg",
    },
    {
      id: 5,
      name: "SKPI",
      longname: "Sertifikasi Keterampilan Penangkapan Ikan",
      description:
        "Sertifikasi keterampilan praktis bagi nelayan dalam metode penangkapan ikan yang efisien dan berkelanjutan.",
      component: (
        <FaMedal className="group-hover:scale-125 text-gray-300 group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
      ),
      img: "/images/program-pelatihan/dummies/akp/akp-9.jpg",
    },
    {
      id: 6,
      name: "SOPI",
      longname: "Sertifikat Operasi Perikanan Indonesia",
      description:
        "Sertifikasi yang menunjukkan kemampuan dan keterampilan dalam operasi perikanan secara efisien dan aman.",
      component: (
        <FaScrewdriver className="group-hover:scale-125 text-gray-300 group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
      ),
      img: "/images/program-pelatihan/dummies/akp/akp-10.jpg",
    },
    {
      id: 7,
      name: "FM",
      longname: "Fishing Master",
      description:
        "Sertifikasi untuk menjadi master dalam industri perikanan dengan keterampilan manajerial dan operasional tingkat lanjut.",
      component: (
        <FaTachometerAlt className="group-hover:scale-125 text-gray-300 group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-3xl" />
      ),
      img: "/images/program-pelatihan/dummies/akp/akp-6.jpg",
    },
    {
      id: 8,
      name: "Rating",
      longname: "Rating Keahlian",
      description:
        "Penilaian keahlian untuk menentukan tingkat keterampilan dan kompetensi dalam berbagai aspek operasional perikanan.",
      component: (
        <FaStar className="group-hover:scale-125 text-gray-300 group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-3xl" />
      ),
      img: "/images/program-pelatihan/dummies/akp/akp-3.jpg",
    },
  ];
  return (
    <div className="w-full flex gap-2 mb-10 mx-4 -mt-4">
      <Swiper
        slidesPerView={3} // Adjust this to control how many slides are shown on mobile view
        spaceBetween={10}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        navigation={true} // Enable navigation arrows
        modules={[FreeMode, Navigation]} // Add Pagination and Navigation modules
        className="mySwiper w-full  !h-[140px]"
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
        {akp.map((item, index) => (
          <SwiperSlide>
            <div className="flex w-full h-[110px] relative shadow-custom  rounded-3xl duration-700 hover:scale-110   flex- items-center gap-2 group cursor-pointer">
              <Image
                src={item.img}
                className="absolute w-full rounded-3xl h-full object-cover duration-1000  "
                alt=""
                layout="fill"
                priority
              />
              <div className="absolute w-full h-full rounded-3xl bg-darkDPKAKP bg-opacity-50 group-hover:bg-opacity-30"></div>
              <div className="flex relative z-20 px-5 gap-2">
                {item.component}{" "}
                <div className="flex flex-col z-10 relative">
                  <h1 className="font-tuwir font-semibold text-2xl text-gray-200 group-hover:text-gray-100 duration-700 group-hover:text-xl">
                    {item.name}
                  </h1>
                  <p className="text-sm -mt-[0.5rem] hidden group-hover:block text-gray-300 group-hover:text-gray-200 duration-700">
                    {item.longname}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default page;
