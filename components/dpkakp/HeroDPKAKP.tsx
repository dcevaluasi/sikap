"use client";

import Image from "next/image";
import React from "react";
import ScrollDown from "../scroll-down";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroDPKAKP() {
  const [imageIndex, setImageIndex] = React.useState(0);
  const images = [
    "/dpkakp/image2.jpg",
    "/dpkakp/image2.jpg",
    "/dpkakp/image2.jpg",
    "/dpkakp/image2.jpg",
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[95vh] m-4 rounded-3xl flex items-center justify-center">
      <Image
        src={images[imageIndex]}
        className="absolute w-full h-full object-cover rounded-3xl duration-1000  "
        alt=""
        layout="fill"
        priority
      />

      <div className="absolute w-full h-full rounded-3xl bg-black bg-opacity-70  "></div>

      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1"
        aria-hidden="true"
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 z-[40]">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}

          <div className="text-center pb-12 md:pb-16 flex flex-col items-center justify-center ">
            <h1
              className="text-5xl md:text-[3.9rem] font-normal leading-tighter tracking-tighter mb-3 -mt-2 text-white font-calsans"
            // data-aos="zoom-y-out"
            >
              Sistem Ujian keahlian  <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Awak Kapal Perikanan
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-lg text-gray-200 mb-8"
              // data-aos="zoom-y-out"
              // data-aos-delay="150"
              >
                Berdasarkan{" "}
                <span className="font-bold">Permen KP 33 Tahun 2021</span>{" "}
                Tentang Logbook Penangkapan Ikan, Pemantauan Di atas Kapal
                Penangkap Ikan dan Kapal Pengangkut Ikan, Inspeksi, Pengujian,
                dan Penandaan Kapal Perikanan, serta Tata Kelola Pengawasan
                Kapal Perikanan.
              </p>
              <div className="flex flex-col md:flex-row gap-2 w-full items-center justify-center mb-2">
                <Button
                  className="w-full md:w-fit text-lg px-4 py-6 bg-blue-500 hover:bg-blue-600 ml-4"
                >
                  <Link className="block w-full" href={'https://sikap-dpkakp-dev.vercel.app/lembaga/dpkakp/user/auth'}>
                    Video Tutorial Pelaksanaan Ujian
                  </Link>

                </Button>
                <Button
                  className="w-full md:w-fit text-lg px-4 py-6 bg-transparent border-blue-500 border hover:bg-blue-600 ml-4"
                >
                  <Link className="block w-full" href={'https://sikap-dpkakp-dev.vercel.app/lembaga/dpkakp/admin/auth/login'}>
                    Video Tutorial DPKAKP & PUKAKP
                  </Link>

                </Button>
              </div>
              <div className="flex items-center justify-center w-full">
                <ScrollDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
