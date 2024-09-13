"use client";

import Image from "next/image";
import React from "react";
import ScrollDown from "../scroll-down";

type ProgramDetails = {
  description: string;
  images: string[];
};

type DetailProgramPelatihan = {
  akp: ProgramDetails;
  perikanan: ProgramDetails;
  kelautan: ProgramDetails;
};

export default function HeroProgramPelatihan({ program }: { program: string }) {
  const programPelatihan =
    program == "akp"
      ? "Awak Kapal perikanan"
      : program == "perikanan"
      ? "Perikanan"
      : "Kelautan";

  const detailProgramPelatihan: DetailProgramPelatihan = {
    akp: {
      description:
        "Program Pelatihan Awak Kapal Perikanan membekali peserta dengan keterampilan penangkapan ikan, navigasi, dan keselamatan di laut. Dapatkan sertifikasi resmi untuk meningkatkan karier di sektor perikanan dengan fokus pada praktik berkelanjutan dan keselamatan kerja.",
      images: [
        "/images/program-pelatihan/dummies/akp/akp-1.jpg",
        "/images/program-pelatihan/dummies/akp/akp-2.jpg",
        "/images/program-pelatihan/dummies/akp/akp-3.JPG",
        "/images/program-pelatihan/dummies/akp/akp-4.jpg",
        "/images/program-pelatihan/dummies/akp/akp-5.jpg",
        "/images/program-pelatihan/dummies/akp/akp-6.jpg",
      ],
    },
    perikanan: {
      description:
        "Program Pelatihan Perikanan mengajarkan keterampilan dan pengetahuan di bidang perikanan, termasuk teknik penangkapan, budidaya, dan pengelolaan sumber daya laut. Dengan pelatihan praktis dan teori, peserta mendapatkan sertifikasi yang mendukung pengembangan karier di industri ini.",
      images: [
        "/images/program-pelatihan/dummies/perikanan/perikanan.jpg",
        "/images/program-pelatihan/dummies/perikanan/perikanan-2.jpg",
        "/images/program-pelatihan/dummies/perikanan/perikanan-3.jpg",
        "/images/program-pelatihan/dummies/perikanan/perikanan-5.jpg",
        "/images/program-pelatihan/dummies/perikanan/perikanan-5.jpg",
        "/images/program-pelatihan/dummies/perikanan/perikanan-6.jpg",
      ],
    },

    kelautan: {
      description:
        "Program Pelatihan Awak Kapal Perikanan membekali peserta dengan keterampilan penangkapan ikan, navigasi, dan keselamatan di laut. Dapatkan sertifikasi resmi untuk meningkatkan karier di sektor perikanan dengan fokus pada praktik berkelanjutan dan keselamatan kerja.",
      images: [
        "/images/program-pelatihan/dummies/kelautan/kelautan.jpg",
        "/images/program-pelatihan/dummies/kelautan/kelautan-2.jpg",
        "/images/program-pelatihan/dummies/kelautan/kelautan-3.jpg",
        "/images/program-pelatihan/dummies/kelautan/kelautan-4.jpeg",
        "/images/program-pelatihan/dummies/kelautan/kelautan-5.jpg",
        "/images/program-pelatihan/dummies/kelautan/kelautan-6.jpg",
      ],
    },
  };

  const description =
    detailProgramPelatihan[program as keyof DetailProgramPelatihan]
      ?.description || "Program tidak tersedia saat ini.";

  const images =
    detailProgramPelatihan[program as keyof DetailProgramPelatihan]?.images ||
    [];

  const [imageIndex, setImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] m-4 rounded-3xl flex items-center justify-center">
      <Image
        src={images[imageIndex]}
        className="absolute w-full rounded-3xl h-full object-cover duration-1000  "
        alt=""
        layout="fill"
        priority
      />

      <div className="absolute w-full h-full rounded-3xl bg-darkDPKAKP bg-opacity-40  "></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 z-[40]">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}

          <div className="text-center pb-12 md:pb-16 flex flex-col items-center justify-center ">
            <h1
              className="text-4xl md:text-[5rem] font-bold leading-none tracking-tighter -mt-2 
              text-white font-tuwir "
              // data-aos="zoom-y-out"
            >
              Program Pelatihan <br /> {programPelatihan}
            </h1>
            <div className="max-w-4xl mx-auto">
              <p
                className="text-base text-gray-200 mb-8"
                // data-aos="zoom-y-out"
                // data-aos-delay="150"
              >
                {description}
              </p>
              <div className="flex items-center justify-center w-full">
                <ScrollDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
