"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Footer from "@/components/ui/footer";

import localFont from "next/font/local";

// const bos = localFont({
//   src: "./../font/bos.ttf",
//   variable: "--font-bos",
// });

// const bosBold = localFont({
//   src: "./../font/bos_bold.ttf",
//   variable: "--font-bosBold",
// });

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  return (
    <>
      <main className={`grow `}>{children}</main>
      {/* 
      <Footer /> */}
    </>
  );
}
