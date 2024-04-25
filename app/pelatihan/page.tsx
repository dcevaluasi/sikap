import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbClockHour2 } from "react-icons/tb";

function page() {
  return (
    <section className="relative w-full mt-28">
      <div className="flex flex-row gap-1 flex-wrap w-full max-w-6xl mx-auto">
        <div className="coverflow flex flex-col relative w-[360px] h-[550px]">
          <div className="w-fit absolute top-4 right-4 flex gap-1">
            <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
              Gratis
            </div>
            <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text--white">
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
              <h2 className="font-calsans text-xl duration-1000 text-black">
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
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
