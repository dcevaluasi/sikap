"use client";

import Image from "next/image";
import React from "react";

export default function HeroPelatihan() {
  const [imageIndex, setImageIndex] = React.useState(0);
  const images = ["/images/hero-img4.jpg", "/images/hero-img4.jpg"];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] flex items-left justify-left m-2 rounded-3xl">
      <Image
        src={images[imageIndex]}
        className="absolute w-full h-full object-cover duration-1000 rounded-3xl"
        alt=""
        layout="fill"
        priority
      />

      <div className="absolute w-full h-full bg-black bg-opacity-40 rounded-3xl"></div>
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

      <div className="flex flex-col">
        <div className="px-4 sm:px-6 z-[40] ml-24">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="text-left pb-12 md:pb-16 flex flex-col ">
              <h1 className="text-4xl md:text-[3.4rem] font-medium leading-[100%] tracking-tighter mb-3 -mt-2 text-gray-200">
                Ikuti Pelatihan <br />
                <span className=" text-gray-200">Tingkatkan Kemampuan mu</span>
              </h1>
              <p className="text-base text-gray-300 mb-8 leading-[110%] max-w-xl">
                Ragam pelatihan kelautan dan perikanan dapat kamu temukan
                disini, untuk meningkatkan kemampuan dan kapabilitasmu menjadi
                SDM Unggul.
              </p>
            </div>
          </div>
        </div>

        <div className="flex bg-white w-full h-[200px] rounded-2xl">
          TEXT TEXT
        </div>
      </div>
    </section>
  );
}
