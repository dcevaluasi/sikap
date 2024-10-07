"use client";

import Image from "next/image";
import ScrollDown from "./scroll-down";
import React from "react";

import { getLastValuePath } from "@/lib/utils";
import { usePathname } from "next/navigation";

import Features from "./features";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "../app/css/navigation.css";

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
  FaShoppingCart,
  FaTint,
  FaSwimmer,
  FaExclamationTriangle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  FaCapsules,
  FaClipboardCheck,
  FaFish,
  FaIndustry,
  FaLandmark,
  FaLeaf,
  FaRecycle,
  FaSnowflake,
  FaUsers,
  FaWater,
} from "react-icons/fa6";
import { Bounce, Slide } from "react-awesome-reveal";
import ListProgram from "./lists";
import Logo from "./ui/logo";
import Link from "next/link";

export default function Hero() {
  const programPelatihan = [
    {
      id: "001",
      name: "Perikanan",
      icon: "/icons/icperikanan.png",
      slug: "perikanan",
      description:
        "Pelatihan perikanan adalah pelatihan yang meliputi kegiata penangkapan ikan, budidaya perikanan, serta inovasi sumber daya laut berkelanjutan.",
    },
    {
      id: "002",
      name: "Awak Kapal Perikanan",
      icon: "/icons/icawak.png",
      slug: "akp",
      description:
        "Pendidikan dan Pelatihan Awak Kapal Perikanan adalah pendidikan dan/atau pelatihan untuk mencapai tingkat keahlian dan/atau keterampilan tertentu sesuai dengan jenjang, kompetensi, dan jabatan untuk awak Kapal Perikanan.",
    },
    {
      id: "003",
      name: "Kelautan",
      icon: "/icons/ickelautan.png",
      slug: "kelautan",
      description:
        "Pelatihan kelautan adalah pelatihan yang meliputi eksplorasi tak terbatas yang mencakup pengelolaan sumber daya, konservasi, riset, dan inovasi teknologi di laut.",
    },
  ];

  const [selectedProgram, setSelectedProgram] = React.useState<number | null>(
    null
  );

  const [imageIndex, setImageIndex] = React.useState(0);
  const images = [
    "/images/hero-img4-preview.jpg",

    "/images/hero-img.jpg",
    "/images/hero-img3.jpg",
    "/images/hero-img4-preview.jpg",
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  console.log({ selectedProgram });

  // function RagamBidangPelatihan({ type }: { type: string }) {
  //   const programPelatihanPath = getLastValuePath(usePathname());
  //   const [selectedJenisPelatihan, setSelectedJenisPelatihan] =
  //     React.useState<string>("");

  //   const akp = [
  //     {
  //       id: 1,
  //       name: "BSTF",
  //       longname: "Basic Safety Training Fisheries",
  //       description:
  //         "Pelatihan dasar keselamatan untuk awak kapal perikanan yang mencakup penanganan situasi darurat di laut.",
  //       component: (
  //         <FaShip className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/akp/akp-6.jpg",
  //     },
  //     {
  //       id: 2,
  //       name: "ANKAPIN",
  //       longname: "Ahli Nautika Kapal Penangkap Ikan",
  //       description:
  //         "Pelatihan untuk ahli nautika dalam mengoperasikan dan menavigasi kapal penangkap ikan dengan keselamatan dan efisiensi.",
  //       component: (
  //         <FaCertificate className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/akp/akp-2.jpg",
  //     },
  //     {
  //       id: 3,
  //       name: "ATKAPIN",
  //       longname: "Ahli Teknika Kapal Penangkap Ikan",
  //       description:
  //         "Pelatihan teknis untuk ahli teknika dalam pengoperasian mesin kapal penangkap ikan dan perawatan teknis di laut.",
  //       component: (
  //         <FaAnchor className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/akp/akp-7.jpg",
  //     },
  //     {
  //       id: 4,
  //       name: "SKN",
  //       longname: "Sertifikasi Kecakapan Nelayan",
  //       description:
  //         "Sertifikasi resmi untuk memastikan kecakapan nelayan dalam penangkapan ikan dengan standar kompetensi yang berlaku.",
  //       component: (
  //         <FaRegFileAlt className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-3xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/akp/akp-8.jpg",
  //     },
  //     {
  //       id: 5,
  //       name: "SKPI",
  //       longname: "Sertifikasi Keterampilan Penangkapan Ikan",
  //       description:
  //         "Sertifikasi keterampilan praktis bagi nelayan dalam metode penangkapan ikan yang efisien dan berkelanjutan.",
  //       component: (
  //         <FaMedal className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/akp/akp-9.jpg",
  //     },
  //     {
  //       id: 6,
  //       name: "SOPI",
  //       longname: "Sertifikat Operasi Perikanan Indonesia",
  //       description:
  //         "Sertifikasi yang menunjukkan kemampuan dan keterampilan dalam operasi perikanan secara efisien dan aman.",
  //       component: (
  //         <FaScrewdriver className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/akp/akp-10.jpg",
  //     },
  //     {
  //       id: 7,
  //       name: "FM",
  //       longname: "Fishing Master",
  //       description:
  //         "Sertifikasi untuk menjadi master dalam industri perikanan dengan keterampilan manajerial dan operasional tingkat lanjut.",
  //       component: (
  //         <FaTachometerAlt className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-3xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/akp/akp-6.jpg",
  //     },
  //     {
  //       id: 8,
  //       name: "Rating",
  //       longname: "Rating Keahlian",
  //       description:
  //         "Penilaian keahlian untuk menentukan tingkat keterampilan dan kompetensi dalam berbagai aspek operasional perikanan.",
  //       component: (
  //         <FaStar className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-3xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/akp/akp-3.jpg",
  //     },
  //   ];

  //   const perikanan = [
  //     {
  //       id: 1,
  //       name: "Penangkapan",
  //       longname: "Teknik Penangkapan Ikan",
  //       description:
  //         "Pelatihan teknik dan keterampilan dalam menangkap ikan secara efisien dan ramah lingkungan.",
  //       component: (
  //         <FaFish className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/perikanan/perikanan-4.jpg",
  //     },
  //     {
  //       id: 2,
  //       name: "Budidaya",
  //       longname: "Teknik Budidaya Ikan",
  //       description:
  //         "Pelatihan untuk mengembangkan keterampilan budidaya ikan dengan teknik modern dan berkelanjutan.",
  //       component: (
  //         <FaWater className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/perikanan/perikanan.jpg",
  //     },
  //     {
  //       id: 3,
  //       name: "Pengolahan",
  //       longname: "Teknik Pengolahan Hasil Perikanan",
  //       description:
  //         "Pelatihan dalam mengolah hasil perikanan untuk meningkatkan nilai tambah dan kualitas produk.",
  //       component: (
  //         <FaIndustry className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/perikanan/perikanan-3.jpg",
  //     },
  //     {
  //       id: 4,
  //       name: "Pemasaran & Distribusi",
  //       longname: "Strategi Pemasaran dan Distribusi Perikanan",
  //       description:
  //         "Pelatihan strategi pemasaran dan distribusi hasil perikanan yang efektif dan berkelanjutan.",
  //       component: (
  //         <FaShoppingCart className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/perikanan/perikanan-7.jpg",
  //     },
  //     {
  //       id: 5,
  //       name: "Pengawasan",
  //       longname: "Pengawasan dan Penataan Perikanan",
  //       description:
  //         "Pelatihan dalam pengawasan operasional perikanan untuk memastikan praktik yang sesuai dengan regulasi.",
  //       component: (
  //         <FaClipboardCheck className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/perikanan/perikanan-8.jpg",
  //     },
  //   ];

  //   const kelautan = [
  //     {
  //       id: 1,
  //       name: "Reklamasi",
  //       longname: "Teknik Reklamasi Pesisir",
  //       description:
  //         "Pelatihan dalam merancang dan melaksanakan reklamasi pesisir untuk kepentingan pengembangan wilayah.",
  //       component: (
  //         <FaLandmark className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/kelautan/kelautan.jpg",
  //     },
  //     {
  //       id: 2,
  //       name: "Garam",
  //       longname: "Teknik Produksi Garam",
  //       description:
  //         "Pelatihan metode modern dalam produksi garam dari air laut, untuk meningkatkan efisiensi dan kualitas.",
  //       component: (
  //         <FaSnowflake className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/kelautan/kelautan-2.jpg",
  //     },
  //     {
  //       id: 3,
  //       name: "Pemanfaatan",
  //       longname: "Pemanfaatan Sumber Daya Air Laut",
  //       description:
  //         "Pelatihan dalam memanfaatkan air laut untuk berbagai keperluan industri dan kehidupan sehari-hari.",
  //       component: (
  //         <FaTint className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/kelautan/kelautan-3.jpg",
  //     },
  //     {
  //       id: 4,
  //       name: "Penyelaman",
  //       longname: "Teknik Penyelaman Ilmiah",
  //       description:
  //         "Pelatihan penyelaman untuk kegiatan riset ilmiah di laut, termasuk pengambilan sampel dan observasi bawah air.",
  //       component: (
  //         <FaSwimmer className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/kelautan/kelautan-4.jpeg",
  //     },
  //     {
  //       id: 5,
  //       name: "Biofarmakologi",
  //       longname: "Pemanfaatan Biofarmakologi Laut",
  //       description:
  //         "Pelatihan dalam memanfaatkan sumber daya laut untuk keperluan biofarmakologi dan pengembangan produk medis.",
  //       component: (
  //         <FaCapsules className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/kelautan/kelautan-5.jpg",
  //     },
  //     {
  //       id: 6,
  //       name: "BMKT",
  //       longname: "Pengelolaan Benda Berharga Muatan Kapal Tenggelam",
  //       description:
  //         "Pelatihan dalam pengelolaan dan pelestarian benda berharga dari kapal tenggelam yang ditemukan di dasar laut.",
  //       component: (
  //         <FaShip className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/kelautan/kelautan-6.jpg",
  //     },
  //     {
  //       id: 7,
  //       name: "Konservasi",
  //       longname: "Pengelolaan Kawasan Konservasi Laut",
  //       description:
  //         "Pelatihan dalam pengelolaan kawasan konservasi laut untuk melindungi keanekaragaman hayati dan ekosistem laut.",
  //       component: (
  //         <FaLeaf className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/kelautan/kelautan-7.jpg",
  //     },
  //     {
  //       id: 8,
  //       name: "Mitigasi Bencana",
  //       longname: "Mitigasi Bencana Pesisir",
  //       description:
  //         "Pelatihan strategi mitigasi bencana untuk menghadapi ancaman seperti tsunami, banjir rob, dan abrasi di wilayah pesisir.",
  //       component: (
  //         <FaExclamationTriangle className="group-hover:scale-125 text-black group-hover:text-gray-100 relative z-20 group-hover:-rotate-[20deg] duration-700 text-4xl" />
  //       ),
  //       img: "/images/program-pelatihan/dummies/kelautan/kelautan-8.jpg",
  //     },
  //   ];

  //   return (
  //     <div className="max-w-7xl mx-auto w-full mt-14  gap-5 mb-10">
  //       <div className="flex flex-col gap-6 w-full">
  //         <div className="flex flex-col text-center max-w-xl mx-auto">
  //           <p className="text-blue-500 font-semibold mb-3">
  //             RAGAM SERTIFIKASI
  //           </p>
  //           <h2 className="font-bold font-calsans text-black text-4xl leading-none">
  //             {selectedProgram == "akp" && "Awak Kapal Perikanan"}
  //             {selectedProgram == "perikanan" && "Perikanan"}
  //             {selectedProgram == "kelautan" && "Kelautan"}
  //           </h2>
  //           <p className="text-gray-600 leading-normal text-center ">
  //             Ragam Sertifikasi: Tingkatkan kompetensi Anda dengan berbagai
  //             sertifikasi khusus awak kapal perikanan yang diakui secara
  //             nasional melalui program diklat ataupun ujian, untuk mendukung
  //             karir dan keberlanjutan laut.
  //           </p>
  //         </div>
  //         <div className="w-full h-fit">
  //           <Swiper
  //             slidesPerView={6}
  //             spaceBetween={10}
  //             freeMode={true}
  //             pagination={{
  //               clickable: true,
  //             }}
  //             initialSlide={4}
  //             navigation={true}
  //             modules={[FreeMode, Navigation]}
  //             className="mySwiper !w-full !px-4 md:!px-20" // Adjust padding for mobile
  //             breakpoints={{
  //               320: {
  //                 // For smaller screens
  //                 slidesPerView: 5,
  //                 spaceBetween: 5,
  //               },
  //               640: {
  //                 slidesPerView: 5,
  //                 spaceBetween: 10,
  //               },
  //               768: {
  //                 slidesPerView: 5,
  //                 spaceBetween: 20,
  //               },
  //               1024: {
  //                 slidesPerView: 5,
  //                 spaceBetween: 30,
  //               },
  //             }}
  //           >
  //             {type == "akp" &&
  //               akp.map((item, index) => (
  //                 <SwiperSlide key={index}>
  //                   <div className="flex w-full h-[100px] relative border border-gray-400 rounded-3xl duration-700 items-center gap-2 group cursor-pointer bg-white hover:bg-blue-500 justify-center">
  //                     <Image
  //                       src={item.img}
  //                       className="absolute w-full rounded-3xl h-full object-cover duration-700  invisible group-hover:visible"
  //                       alt=""
  //                       layout="fill"
  //                       priority
  //                     />
  //                     <div className="absolute w-full h-full rounded-3xl bg-darkDPKAKP bg-opacity-70 group-hover:bg-opacity-50 group-hover:block hidden duration-700"></div>
  //                     <div className="flex relative z-20 px-5 gap-2 items-center justify-center">
  //                       {item.component}
  //                       <div className="flex flex-col z-10 relative group-hover:ml-1">
  //                         <h1 className="font-calsans font-semibold text-2xl text-black group-hover:text-gray-100 duration-700 group-hover:text-2xl group-hover:mt-0 mt-2 leading-[105%]">
  //                           {item.name}
  //                         </h1>
  //                         <p className="text-xs leading-[100%] hidden group-hover:block text-gray-300 group-hover:text-gray-100 duration-700">
  //                           {item.longname}
  //                         </p>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </SwiperSlide>
  //               ))}

  //             {type == "perikanan" &&
  //               perikanan.map((item, index) => (
  //                 <SwiperSlide key={index}>
  //                   <div className="flex w-full h-[100px] relative border border-gray-400 rounded-3xl duration-700 items-center gap-2 group cursor-pointer bg-white hover:bg-blue-500 justify-center">
  //                     <Image
  //                       src={item.img}
  //                       className="absolute w-full rounded-3xl h-full object-cover group-hover:visible duration-700  invisible "
  //                       alt=""
  //                       layout="fill"
  //                       priority
  //                     />
  //                     <div className="absolute w-full h-full rounded-3xl bg-darkDPKAKP bg-opacity-70 group-hover:bg-opacity-50 group-hover:block hidden duration-700"></div>
  //                     <div className="flex relative z-20 px-5 gap-2 items-center justify-center">
  //                       {item.component}
  //                       <div className="flex flex-col z-10 relative group-hover:ml-1">
  //                         <h1 className="font-calsans font-semibold text-2xl text-black group-hover:text-gray-100 duration-700 group-hover:text-2xl group-hover:mt-0 mt-2 leading-[105%]">
  //                           {item.name}
  //                         </h1>
  //                         <p className="text-xs leading-[100%] hidden group-hover:block text-gray-300 group-hover:text-gray-100 duration-700">
  //                           {item.longname}
  //                         </p>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </SwiperSlide>
  //               ))}

  //             {type == "kelautan" &&
  //               kelautan.map((item, index) => (
  //                 <SwiperSlide key={index}>
  //                   <div className="flex w-full h-[100px] relative border border-gray-400 rounded-3xl duration-700 items-center gap-2 group cursor-pointer bg-white hover:bg-blue-500 justify-center">
  //                     <Image
  //                       src={item.img}
  //                       className="absolute w-full rounded-3xl h-full object-cover group-hover:visible duration-700  invisible"
  //                       alt=""
  //                       layout="fill"
  //                       priority
  //                     />
  //                     <div className="absolute w-full h-full rounded-3xl bg-darkDPKAKP bg-opacity-70 group-hover:bg-opacity-50 group-hover:block hidden duration-700"></div>
  //                     <div className="flex relative z-20 px-5 gap-2 items-center justify-center">
  //                       {item.component}
  //                       <div className="flex flex-col z-10 relative group-hover:ml-1">
  //                         <h1 className="font-calsans font-semibold text-2xl text-black group-hover:text-gray-100 duration-700 group-hover:text-2xl group-hover:mt-0 mt-2 leading-[105%]">
  //                           {item.name}
  //                         </h1>
  //                         <p className="text-xs leading-[100%] hidden group-hover:block text-gray-300 group-hover:text-gray-100 duration-700">
  //                           {item.longname}
  //                         </p>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </SwiperSlide>
  //               ))}
  //           </Swiper>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col gap-2 w-full">
      <section className="relative h-screen  flex items-center ">
        <Image
          src={images[imageIndex]}
          className="absolute w-full h-full object-cover duration-1000  "
          alt=""
          layout="fill"
          priority
          onClick={(e) => setSelectedProgram(null)}
        />

        <div
          className="absolute w-full h-full bg-black bg-opacity-70  "
          onClick={(e) => setSelectedProgram(null)}
        ></div>

        {/* Illustration behind hero content */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1"
          aria-hidden="true"
          onClick={(e) => setSelectedProgram(null)}
        >
          <svg
            width="1360"
            height="578"
            viewBox="0 0 1360 578"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="illustration-01"
              >
                <stop stopColor="#FFF" offset="0%" />
                <stop stopColor="#EAEAEA" offset="77.402%" />
                <stop stopColor="#DFDFDF" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1232" cy="128" r="128" />
              <circle cx="155" cy="443" r="64" />
            </g>
          </svg>
        </div>

        <div className="max-w-7xl z-[40] w-full mx-auto relative flex flex-col items-start justify-center text-left">
          {/* Hero content */}
          <div className="flex w-full items-center justify-between">
            {/* Section header */}
            <div className="text-center gap-5 flex flex-col ">
              <Logo />
              <div className="flex flex-col">
                <h1 className="text-[3rem] leading-none text-left font-calsans text-white">
                  Elektronik Layanan Pelatihan <br />{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r leading-none pt-0 from-blue-500 to-teal-400">
                    Kelautan dan Perikanan
                  </span>
                  <br /> Utama Terpadu
                </h1>
                <h1 className="text-[3.6rem] text-left font-calsans bg-clip-text text-transparent bg-gradient-to-r leading-none pt-0 from-blue-500 to-teal-400">
                  E-LAUT
                </h1>
              </div>

              {/* {selectedProgram == null && (
                <p className="text-base text-left mx-auto text-gray-200  max-w-3xl">
                  Aplikasi Pelatihan serta sertifikasi KP yang dikembangkan oleh
                  BPPSDMKP untuk menjaring masyarakat KP, aparatur KP, dll untuk
                  meningkatkan kompetensi di bidang KP
                </p>
              )} */}
            </div>

            <div
              className="flex flex-col gap-3 text-white max-w-md mt-28"
              onMouseLeave={() => setSelectedProgram(null)}
            >
              <h1 className="font-medium font-calsans text-2xl leading-none">
                {selectedProgram != null
                  ? programPelatihan[selectedProgram]!.name
                  : ""}
              </h1>
              <p className="text-sm">
                {" "}
                {selectedProgram != null
                  ? programPelatihan[selectedProgram]!.description
                  : ""}
              </p>

              {selectedProgram != null && (
                <Link
                  href={`/layanan/program/${
                    programPelatihan[selectedProgram]!.slug
                  }`}
                  className={`btn-sm ${
                    top
                      ? usePathname().includes("pelatihan") ||
                        usePathname().includes("searching")
                        ? "text-blue-500 hover:text-white"
                        : "text-gray-200"
                      : "text-blue-500 hover:text-white"
                  } bg-transparent border border-blue-500 hover:bg-blue-500 w-fit`}
                >
                  <span>Lihat Selengkapnya</span>
                </Link>
              )}
            </div>
          </div>

          <div
            className={`w-full flex flex-row gap-14 items-center justify-center  z-[10000] ${
              selectedProgram === null ? "mt-7" : "mt-0"
            }`}
          >
            {programPelatihan.map((item, index) => (
              <Slide direction="up" duration={index * 1200}>
                <div
                  onClick={(e) => setSelectedProgram(index)}
                  className={`flex flex-col gap-1 items-center justify-center hover:scale-110 duration-700 cursor-pointer hover:opacity-100 border  rounded-3xl border-gray-200 ${
                    index != 1 ? "px-9" : "px-4"
                  } py-7 ${
                    selectedProgram == index
                      ? "opacity-100 animate-pulse  "
                      : "opacity-40  "
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    className={selectedProgram == index ? "w-40" : "w-32"}
                    width={0}
                    height={0}
                  />
                  <h3 className="text-white font-calsans text-xl">
                    {item.name}
                  </h3>
                </div>
              </Slide>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
