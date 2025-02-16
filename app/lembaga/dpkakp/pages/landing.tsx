"use client";

import { CheckCircle2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";
import { ReactTyped } from "react-typed";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "../styles.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Slide } from "react-awesome-reveal";
import { PropagateLoader } from "react-spinners";
import HeroDPKAKP from "@/components/dpkakp/HeroDPKAKP";
import addData from "@/firebase/firestore/addData";
import getDocument from "@/firebase/firestore/getData";
import { DocumentData } from "firebase/firestore";

export default function LandingDPKAKP() {
  const handleForm = async () => {
    const data = {
      data: JSON.stringify([{
        name: 'John snow',
        house: 'Stark'
      }, {
        name: 'John snow',
        house: 'Stark'
      }, {
        name: 'John snow',
        house: 'Stark'
      },])
    }
    const { result, error } = await addData('answers', 'answers-1', data)

    if (error) {
      return console.log(error)
    }


    return console.log(result)
  }
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

  const [dataAnswer, setDataAnswer] = React.useState<DocumentData | null>(null)

  async function fetchData() {
    const dataResult = await getDocument('answers', 'answers-1');
    console.log(dataResult.data); // Logs the actual result
    setDataAnswer(dataResult.data)
  }

  fetchData();
  console.log(dataAnswer != null ? JSON.parse(dataAnswer!.data) : null)


  return (
    <main
      className={`${top ? "bg-white" : "bg-darkDPKAKP"
        } duration-700 w-full h-full`}
    >
      {/* <button onClick={() => handleForm()}>CLICK FIRSEBASE ADD DATA</button> */}
      <HeroDPKAKP />
      <section className="mb-10 mt-8 h-fit w-full px-5 py-4 ">
        <Marquee>
          <p className="mr-16 font-bold text-3xl uppercase text-mutedForegroundDPKAKP">
            Akurat
          </p>
          <Image
            className="mr-16 w-[60px]"
            src={"/lembaga/logo/logo-sertifikasi-akp-blue.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          />
          <p className="mr-16 font-bold text-3xl uppercase text-mutedForegroundDPKAKP">
            Responsif
          </p>
          <Image
            className="mr-16 w-[60px]"
            src={"/lembaga/logo/logo-sertifikasi-akp-blue.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          />
          <p className="mr-16 font-bold text-3xl uppercase text-mutedForegroundDPKAKP">
            Independen
          </p>
          <Image
            className="mr-16 w-[60px]"
            src={"/lembaga/logo/logo-sertifikasi-akp-blue.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          />
          <p className="mr-16 font-bold text-3xl uppercase text-mutedForegroundDPKAKP">
            Profesional
          </p>
          <Image
            className="mr-16 w-[60px]"
            src={"/lembaga/logo/logo-sertifikasi-akp-blue.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          />
        </Marquee>
      </section>
      {loading ? (
        <section className="h-screen w-full flex items-center justify-center">
          <PropagateLoader className="text-white bg-white" color="#FFF" />
        </section>
      ) : (
        <>
          <section
            id="profilDPKAKP"
            className=" flex flex-col items-center justify-center gap-6 py-8 md:py-12 lg:py-24"
          >
            <div className="mx-auto flex w-full flex-col gap-4 ">
              <h2 className="items-center justify-center text-center font-heading text-3xl leading-[1.1] sm:text-5xl md:text-5xl text-gray-200 font-bold">
                Potret Pelaksanaan Ujian <br />
                Keahlian Awak Kapal Perikanan
              </h2>
              <p className="w-full text-center leading-normal text-mutedForegroundDPKAKP sm:text-lg sm:leading-7">
                Pelaksanaan Ujian Keahlian Awak Kapal Perikanan Tingkat I dan
                Tingkat II
              </p>
            </div>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              initialSlide={2}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              autoplay
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              <SwiperSlide className="swiper-slide potret">
                <Image
                  src={"/dpkakp/image1.jpg"}
                  alt="Pelaksanaan Ujian ANKAPIN & ATKAPIN"
                  width={0}
                  height={0}
                  className="w-full rounded-xl"
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide potret">
                <Image
                  src={"/dpkakp/image2.jpg"}
                  alt="Pelaksanaan Ujian ANKAPIN & ATKAPIN"
                  width={0}
                  height={0}
                  className="w-full rounded-xl"
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide potret">
                <Image
                  src={"/dpkakp/image3.jpg"}
                  alt="Pelaksanaan Ujian ANKAPIN & ATKAPIN"
                  width={0}
                  height={0}
                  className="w-full rounded-xl"
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide potret">
                <Image
                  src={"/dpkakp/image4.jpg"}
                  alt="Pelaksanaan Ujian ANKAPIN & ATKAPIN"
                  width={0}
                  height={0}
                  className="w-full rounded-xl"
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide potret">
                <Image
                  src={"/dpkakp/image6.jpg"}
                  alt="Pelaksanaan Ujian ANKAPIN & ATKAPIN"
                  width={0}
                  height={0}
                  className="w-full rounded-xl"
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide potret">
                <Image
                  src={"/dpkakp/image7.jpg"}
                  alt="Pelaksanaan Ujian ANKAPIN & ATKAPIN"
                  width={0}
                  height={0}
                  className="w-full rounded-xl"
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide potret">
                <Image
                  src={"/dpkakp/image8.jpg"}
                  alt="Pelaksanaan Ujian ANKAPIN & ATKAPIN"
                  width={0}
                  height={0}
                  className="w-full rounded-xl"
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide potret">
                {" "}
                <Image
                  src={"/dpkakp/image9.jpg"}
                  alt="Pelaksanaan Ujian ANKAPIN & ATKAPIN"
                  width={0}
                  height={0}
                  className="w-full rounded-xl"
                />
              </SwiperSlide>
            </Swiper>
          </section>
          <section
            id="maklumat"
            className=" space-y-6 pt-7 dark:bg-transparent md:py-10 lg:py-20"
          >
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <Slide direction="up">
                <h2 className="font-heading text-3xl font-bold text-gray-200 leading-[1.1] sm:text-3xl md:text-5xl">
                  Maklumat <br />
                  Manajemen Pelayanan
                </h2>
              </Slide>

              <div className="max-w-[90%] text-xl italic leading-normal text-mutedForegroundDPKAKP sm:leading-7">
                <ReactTyped
                  backSpeed={50}
                  onBegin={function noRefCheck() { }}
                  onComplete={function noRefCheck() { }}
                  onDestroy={function noRefCheck() { }}
                  onLastStringBackspaced={function noRefCheck() { }}
                  onReset={function noRefCheck() { }}
                  onStart={function noRefCheck() { }}
                  onStop={function noRefCheck() { }}
                  onStringTyped={function noRefCheck() { }}
                  onTypingPaused={function noRefCheck() { }}
                  onTypingResumed={function noRefCheck() { }}
                  strings={[
                    "&ldquo; Dewan Penguji Keahlian Awak Kapal Perikanan (DPKAKP) berjanji untuk menerapkan pencapaian mutu, perbaikan secara terus menerus dan berkelanjutan untuk meyakinkan seluruh pengguna jasa mendapatkan pelayanan pengujian terbaik serta bersedia menerima sanksi administrasi dan ganti rugi materiil apabila tidak melaksanakan manajemen pelayanan.&rdquo;",
                  ]}
                  typeSpeed={50}
                  typedRef={function noRefCheck() { }}
                />
              </div>
            </div>
          </section>
          <footer className="flex h-fit w-full items-center justify-center py-10">
            <div className="flex w-full flex-col px-4 text-white md:w-2/3">
              <div className="flex flex-col">
                <hr className="border-mutedDPKAKP" />
                <p className="my-12 w-full text-center text-mutedForegroundDPKAKP">
                  Copyright © 2024 Dewan Penguji Keahlian Awak Kapal Perikanan
                </p>
              </div>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}
