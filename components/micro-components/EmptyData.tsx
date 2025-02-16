import Image from "next/image";
import React from "react";

interface EmptyDataProps {
  type?: string;
}

const EmptyData: React.FC<EmptyDataProps> = ({ type }) => {
  return (
    <div className="pt-12 md:pt-20 flex flex-col items-center">
      <Image
        src={"/illustrations/not-found.png"}
        alt="Not Found"
        width={400} // Specify an actual width
        height={400} // Specify an actual height
        className="w-[400px]"
      />
      <div className="max-w-3xl mx-auto text-center pb-5 md:pb-8 -mt-2">
        <h1 className="text-3xl font-calsans leading-[110%] text-black">
          {type ? "Belum Ada History" : "Belum Ada Ujian"}
        </h1>
        <div className="text-gray-600 text-sm text-center max-w-md">
          {type
            ? "Oopsss! Belum ada history jawaban yang dapat ditampilkan. Hal ini disebabkan antara pelaksanaan ujian dilaksanakan sebelum fitur ini ada, user belum selesai menyelesaikan ujian, atau masalah teknis!"
            : "Pelaksana Ujian Keahlian Awak Kapal Perikanan (PUKAKP) belum ada yang melakukan pengajuan permohonan pelaksanaan ujian keahlian Awak Kapal Perikanan!"}
        </div>
      </div>
    </div>
  );
};

export default EmptyData;
