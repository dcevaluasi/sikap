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
  ];

  return (
    <section className="flex w-full items-center my-14">
      <Marquee>
        {logos.map((logo, index) => (
          <Image
            key={index}
            src={logo.Path}
            alt={logo.Name}
            title={logo.Name}
            className={`w-fit ${index == 2 ? "h-24" : "h-28"} mr-14`}
            width={0}
            height={0}
          />
        ))}
      </Marquee>
    </section>
  );
}

export default LogoIntegrated;
