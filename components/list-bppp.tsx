import React from "react";

import Image from "next/image";
import { TbClockHour2 } from "react-icons/tb";
import Link from "next/link";
import { createSlug, truncateText } from "@/utils";
import { PelatihanMasyarakat } from "@/types/product";

function ListBPPP({ pelatihan }: { pelatihan: PelatihanMasyarakat[] }) {
  return (
    <div className="w-full grid grid-cols-3 gap-y-6">
      {pelatihan.map((pelatihan: PelatihanMasyarakat, index: number) => (
        <CardPelatihan key={index} pelatihan={pelatihan} />
      ))}
    </div>
  );
}

const CardPelatihan = ({ pelatihan }: { pelatihan: PelatihanMasyarakat }) => {
  return (
    <div className="coverflow flex flex-col shadow-custom relative w-[360px] h-fit rounded-3xl">
      <div className="w-fit absolute top-4 right-4 flex gap-1">
        <div className="text-xs font-medium px-4 py-2 bg-blue-500 rounded-3xl text-white">
          {pelatihan.HargaPelatihan == "0"
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
        src={`${pelatihan.FotoPelatihan}`}
        width={0}
        height={0}
      />
      <div className="px-6 py-3">
        <div className="w-full pb-4">
          <h2 className="font-calsans text-xl duration-1000 text-black mt-2 leading-[110%]">
            {pelatihan.NamaPelatihan}
          </h2>
          <div className="flex gap-1 my-1 text-gray-600 text-xs items-center">
            <TbClockHour2 />
            Pendaftaran :<p>{pelatihan.TanggalMulaiPelatihan}</p>
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html:
                pelatihan &&
                truncateText(pelatihan?.DetailPelatihan, 250, "..."),
            }}
            className="text-sm font-normal group-hover:text-xs text-gray-600 group-hover:duration-1000"
          />

          <Link
            target="_blank"
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

export default ListBPPP;
