"use client";

import { CheckCircle2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";
import { ReactTyped } from "react-typed";

import { Slide } from "react-awesome-reveal";
import { PropagateLoader } from "react-spinners";
import HeroKomiteApproval from "@/components/landing/HeroKomiteApproval";
import Layanan from "@/components/bppp/location/Layanan";
import Keunggulan from "@/components/bppp/location/Keunggulan";
import Footer from "@/components/ui/footer";

export default function LandingKomiteApproval() {
  const marketingConfig = [
    {
      title: "Beranda",
      href: "/",
    },
    {
      title: "Sertifikasi AKP",
      href: "/#",
    },
    {
      title: "Lemdiklat dan Bimtek AKP",
      href: "/#",
    },
    {
      title: "Komite Approval",
      href: "/#",
    },
  ];

  const [loading, setLoading] = React.useState<boolean>(true);

  const [top, setTop] = React.useState<boolean>(true);

  const scrollHandler = () => {
    window.pageYOffset > 380 ? setTop(false) : setTop(true);
  };

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  React.useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <main className={`bg-white duration-700 w-full h-full`}>
      <HeroKomiteApproval />
      {/* <section className="mb-0 mt-8 h-fit w-full px-5 py-4 ">
        <Marquee>
          <p className="mr-16 font-bold text-3xl uppercase text-mutedForegroundDPKAKP">
            Akurat
          </p>
          <Image
            className="mr-16 w-[85px]"
            src={"/lembaga/logo/logo-sertifikasi-akp-blue.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          />
          <p className="mr-16 font-bold text-3xl uppercase text-mutedForegroundDPKAKP">
            Responsif
          </p>
          <Image
            className="mr-16 w-[85px]"
            src={"/lembaga/logo/logo-sertifikasi-akp-blue.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          />
          <p className="mr-16 font-bold text-3xl uppercase text-mutedForegroundDPKAKP">
            Independen
          </p>
          <Image
            className="mr-16 w-[85px]"
            src={"/lembaga/logo/logo-sertifikasi-akp-blue.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          />
          <p className="mr-16 font-bold text-3xl uppercase text-mutedForegroundDPKAKP">
            Profesional
          </p>
          <Image
            className="mr-16 w-[85px]"
            src={"/lembaga/logo/logo-sertifikasi-akp-blue.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          />
        </Marquee>
      </section> */}
      <Layanan />
      <Footer />
    </main>
  );
}
