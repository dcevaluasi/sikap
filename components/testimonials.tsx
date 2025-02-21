"use client";

import Image from "next/image";
import TestimonialImage from "@/public/images/testimonial.jpg";
import { FaBiohazard } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { MdAssuredWorkload } from "react-icons/md";
import { GiCirclingFish, GiFishEggs, GiFoodChain } from "react-icons/gi";
import { Slide } from "react-awesome-reveal";

export default function Testimonials() {
  return (
    <section className="relative max-w-7xl mx-auto">
      {/* Illustration behind content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -mb-32"
        aria-hidden="true"
      >
        <svg
          width="1760"
          height="518"
          viewBox="0 0 1760 518"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-02"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g
            transform="translate(0 -3)"
            fill="url(#illustration-02)"
            fillRule="evenodd"
          >
            <circle cx="1630" cy="128" r="128" />
            <circle cx="178" cy="481" r="40" />
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="py-12 md:py-20">
          {/* Section header */}

          <div className="max-w-3xl w-full mx-auto text-center pflex flex-col items-center justify-center pb-5 md:pb-8">
            <h1 className="text-4xl font-calsans leading-[100%]">
              Menjadi SDM Unggul
              <br />
              di Bidang Kelautan dan Perikanan
            </h1>
            <p className="text-base text-gray-60">
              Jelajahi Peluang Baru dengan Pelatihan dan Uji Kompetensi
              Inovatif, bergabunglah dengan Program Kami untuk Mengasah
              Kompetensi-mu di Dunia Non-Kepelautan!
            </p>
          </div>

          {/* Testimonials */}
          <div className="flex flex-col md:flex-row gap-3">
            <Slide
              direction="left"
              className="w-full mx-auto mt-20"
              data-aos="zoom-y-out"
            >
              <div className="relative flex items-start border-2 border-gray-200 rounded bg-white">
                {/* Testimonial */}
                <div className="text-center px-12 py-8 pt-20 mx-4 md:mx-0">
                  <div className="absolute top-0 -mt-8 left-1/2 transform -translate-x-1/2">
                    <svg
                      className="absolute top-0 right-0 -mt-3 -mr-8 w-16 h-16 fill-current text-blue-500"
                      viewBox="0 0 64 64"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M37.89 58.338c-2.648-5.63-3.572-10.045-2.774-13.249.8-3.203 8.711-13.383 23.737-30.538l2.135.532c-6.552 10.033-10.532 17.87-11.939 23.515-.583 2.34.22 6.158 2.41 11.457l-13.57 8.283zm-26.963-6.56c-2.648-5.63-3.572-10.046-2.773-13.25.799-3.203 8.71-13.382 23.736-30.538l2.136.533c-6.552 10.032-10.532 17.87-11.94 23.515-.583 2.339.22 6.158 2.41 11.456l-13.57 8.283z" />
                    </svg>
                    <Image
                      className="relative rounded-full object-cover h-24 w-24"
                      src={"/eselons/i-nyoman-radiarta.jpeg"}
                      width={96}
                      priority
                      height={96}
                      alt="Testimonial 01"
                    />
                  </div>
                  <blockquote className="text-xl font-medium mb-4">
                    “ Ikuti pelatihan dan uji kompetensi untuk meningkatkan
                    kompetensi-mu dan ikut kontribusi di bidang Kelautan dan
                    Perikanan, bersama kita bisa, kita bisa karena bersama!“
                  </blockquote>
                  <cite className="block font-bold text-lg not-italic mb-1">
                    I Nyoman Radiarta
                  </cite>
                  <div className="text-gray-600">
                    <span>Kepala</span>{" "}
                    <a className="text-blue-600 hover:underline" href="#0">
                      Badan Penyuluhan dan Pengembangan Sumber Daya Manusia KP
                    </a>
                  </div>
                </div>
              </div>
            </Slide>
            <Slide
              direction="right"
              className="w-full mx-auto mt-20"
              data-aos="zoom-y-out"
            >
              <div className="relative flex items-start border-2 border-gray-200 rounded bg-white">
                {/* Testimonial */}
                <div className="text-center px-12 py-8 pt-20 mx-4 md:mx-0">
                  <div className="absolute top-0 -mt-8 left-1/2 transform -translate-x-1/2">
                    <svg
                      className="absolute top-0 right-0 -mt-3 -mr-8 w-16 h-16 fill-current text-blue-500"
                      viewBox="0 0 64 64"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M37.89 58.338c-2.648-5.63-3.572-10.045-2.774-13.249.8-3.203 8.711-13.383 23.737-30.538l2.135.532c-6.552 10.033-10.532 17.87-11.939 23.515-.583 2.34.22 6.158 2.41 11.457l-13.57 8.283zm-26.963-6.56c-2.648-5.63-3.572-10.046-2.773-13.25.799-3.203 8.71-13.382 23.736-30.538l2.136.533c-6.552 10.032-10.532 17.87-11.94 23.515-.583 2.339.22 6.158 2.41 11.456l-13.57 8.283z" />
                    </svg>
                    <Image
                      className="relative rounded-full object-cover h-24 w-24"
                      src={"/eselons/lilly-aprilia-pregiwati.jpg"}
                      width={96}
                      priority
                      height={96}
                      alt="Testimonial 01"
                    />
                  </div>
                  <blockquote className="text-xl font-medium mb-4">
                    “ Ikuti pelatihan dan uji kompetensi untuk meningkatkan
                    kompetensi-mu dan ikut kontribusi di bidang Kelautan dan
                    Perikanan, bersama kita bisa, kita bisa karena bersama!“
                  </blockquote>
                  <cite className="block font-bold text-lg not-italic mb-1">
                    Lilly Aprilia Pregiwati
                  </cite>
                  <div className="text-gray-600">
                    <span>Kepala</span>{" "}
                    <a className="text-blue-600 hover:underline" href="#0">
                      Pusat Pelatihan Kelautan dan Perikanan
                    </a>
                  </div>
                </div>
              </div>
            </Slide>
          </div>
        </div>
      </div>
    </section>
  );
}
