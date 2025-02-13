import Image from "next/image";
import React from "react";

function EmptyData() {
  return (
    <div className="pt-12 md:pt-20 flex flex-col items-center">
      <Image
        src={"/illustrations/not-found.png"}
        alt="Not Found"
        width={0}
        height={0}
        className="w-[400px]"
      />
      <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8 -mt-2">
        <h1 className="text-3xl font-calsans leading-[110%] text-black">
          Belum Ada Ujian
        </h1>
        <div className="text-gray-600 text-sm text-center  max-w-md">
          Pelaksana Ujian Keahlian Awak Kapal Perikanan (PUKAKP) belum ada yang
          melakukan pengjuan permohonan pelaksanaan ujian keahlian Awak Kapal
          Perikanan!{" "}
        </div>
      </div>
    </div>
  );
}

export default EmptyData;
