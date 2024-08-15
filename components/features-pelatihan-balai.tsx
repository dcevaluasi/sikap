"use client";

import { PelatihanMasyarakat } from "@/types/product";
import Image from "next/image";
import { Bounce } from "react-awesome-reveal";
import { FaBiohazard } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import ListBPPP from "./list-bppp";
import React from "react";

export default function FeaturesPelatihanBalai({
  pelatihan,
}: {
  pelatihan: PelatihanMasyarakat[];
}) {
  const competenceFields = [
    {
      id: 1,
      name: "Kepelautan",
      fullName: "Certificate Of Competency",
      description:
        "Pengelolaan dan operasional kapal serta awaknya untuk memastikan keselamatan dan kepatuhan maritim.",
      icon: (
        <FaBiohazard className="text-6xl text-sky-500 group-hover:text-sky-500 duration-700" />
      ),
      img: "cop.png",
    },
    {
      id: 2,
      name: "Non-Kepelautan",
      fullName: "Certificate Of Proficiency",
      description:
        "Proses pemeliharaan, pengolahan, penangkapan, ikan untuk produksi optimal dan berkelanjutan dan bersinergi.",
      icon: (
        <TbTargetArrow className="text-6xl text-sky-500 group-hover:text-sky-500 duration-700" />
      ),
      img: "budidaya.png",
    },
  ];
  const [selectedMenu, setSelectedMenu] = React.useState<number>(100);
  const handleSelectedMenu = (index: number) => {
    setSelectedMenu(index);
  };

  return (
    <>
      <ListBPPP pelatihan={pelatihan} type="" />
    </>
  );
}
