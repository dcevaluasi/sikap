import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

function LogoIntegrated() {
  const logos = [
    {
      Name: "Logo Kementerian Kelatuan dan Perikanan",
      Path: "/images/logo/kkp.png",
    },
    {
      Name: "Logo Badan Penyuluhan dan Pengembangan Sumber Daya Manusia Kelautan dan Perikanan (BPPSDM KP)",
      Path: "/images/logo/infinity.webp",
    },
    {
      Name: "Logo Smart Fisheries Village",
      Path: "/images/logo/sfv.png",
    },
    {
      Name: "Logo Ocean Institute of Indonesia",
      Path: "/images/logo/oii.png",
    },
  ];

  return (
    <section className="flex w-full max-w-7xl items-center my-10 mx-auto  justify-around ">
      {logos.map((logo, index) => (
        <Image
          key={index}
          src={logo.Path}
          alt={logo.Name}
          title={logo.Name}
          className={`${index == 3 ? "w-[160px]" : "w-[200px]"}`}
          width={0}
          height={0}
        />
      ))}
    </section>
  );
}

export default LogoIntegrated;
