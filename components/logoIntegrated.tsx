import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

function LogoIntegrated() {
  const logos = [
    {
      Name: "Logo Badan Penyuluhan dan Pengembangan Sumber Daya Manusia Kelautan dan Perikanan (BPPSDM KP)",
      Path: "./images/logo-bppsdm.png",
    },
    {
      Name: "Logo Berorientasi Pelayanan Akuntabel Kompeten Harmonis Loyal Adaptif Kolaboratif",
      Path: "./images/logo-berakhlak.png",
    },
    {
      Name: "Logo Kementerian Kelautan dan Perikanan (KKP) Beyond",
      Path: "./images/logo-kkp-beyond.png",
    },
    {
      Name: "Logo Balai Sertifikasi Elektronik (BSRe)",
      Path: "./images/logo-bsre.png",
    },
    // {
    //   Name: "Logo Badan Layanan Umum",
    //   Path: "./images/logo-blu.png",
    // },
    // {
    //   Name: "Logo Badan Nasional Sertifikasi Profesi",
    //   Path: "./images/logo-bnsp.png",
    // },
  ];

  return (
    <section className="flex w-fit items-center mb-14">
      <Marquee>
        {logos.map((logo, index) => (
          <Image
            key={index}
            src={logo.Path}
            alt={logo.Name}
            title={logo.Name}
            className={`w-fit ${index == 2 ? "h-24" : "h-28"} mr-20`}
            width={0}
            height={0}
          />
        ))}
      </Marquee>
    </section>
  );
}

export default LogoIntegrated;
