"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Layanan() {
  const paths = usePathname();
  return (
    <section className="bg-white w-full py-10">
      {paths == "/lembaga/komite-approval" ? (
        <div className="py-4 mx-auto w-full px-5 sm:py-4  flex flex-col gap-4">
          <div className="max-w-3xl w-full mx-auto text-center pflex flex-col items-center justify-center pb-5 md:pb-8">
            <h1 className="text-4xl font-calsans leading-[100%]">
              Layanan dan Informasi
              <br /> Komite Pengesahan Diklat AKP
            </h1>
            <p className="text-base text-gray-60">
              Temukan layanan lengkap dan informasi terkini tentang <br />{" "}
              pengesahan Diklat Awak Kapal Perikanan dari Komite Pengesahan
              Diklat AKP.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
            <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-auto md:h-full flex flex-col">
              <Link
                href="/lembaga/bppp/ambon"
                className="group relative flex flex-col overflow-hidden rounded-3xl px-4 pb-4 pt-40 flex-grow"
              >
                <Image
                  fill={true}
                  src="/images/program-pelatihan/dummies/akp/akp-6.jpg"
                  alt=""
                  className="absolute inset-0  object-cover group-hover:scale-105 group transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60  group-hover:bg-opacity-10 duration-700"></div>

                <div className="flex flex-col gap-1  absolute top-0 left-0 mt-3 p-4 ">
                  <h3 className="z-10 text-2xl font-medium text-white xs:text-xl md:text-3xl font-calsans leading-none ">
                    Pelatihan Masyarakat
                  </h3>
                  <p className="text-gray-300 text-sm leading-none">
                    Balai Pelatihan dan Penyuluhan Perikanan Ambon
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
              <Link
                href="/lembaga/bppp/banyuwangi"
                className="group relative flex flex-col overflow-hidden rounded-3xl px-4 pb-4 pt-40 mb-4"
              >
                <Image
                  fill={true}
                  src="/images/program-pelatihan/dummies/akp/akp-2.jpg"
                  alt=""
                  className="absolute inset-0  object-cover group-hover:scale-105 group transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60  group-hover:bg-opacity-10 duration-700"></div>
                <div className="flex flex-col gap-1  absolute top-0 left-0 mt-3 p-4 ">
                  <h3 className="z-10 text-2xl font-medium text-white xs:text-xl md:text-3xl font-calsans leading-none ">
                    Uji Kompetensi
                  </h3>
                  <p className="text-gray-300 text-sm leading-none">
                    Balai Pelatihan dan Penyuluhan Perikanan Banyuwangi
                  </p>
                </div>
              </Link>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
                <Link
                  href="/lembaga/bppp/bitung"
                  className="group relative flex flex-col overflow-hidden rounded-3xl px-4 pb-4 pt-40"
                >
                  <Image
                    fill={true}
                    src="/images/program-pelatihan/dummies/akp/akp-4.jpg"
                    alt=""
                    className="absolute inset-0  object-cover group group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60  group-hover:bg-opacity-10 duration-700"></div>
                  <div className="flex flex-col gap-1  absolute top-0 left-0 mt-3 p-4 ">
                    <h3 className="z-10 text-2xl font-medium text-white xs:text-xl md:text-3xl font-calsans leading-none ">
                      Prasarana dan Sarana
                    </h3>
                    <p className="text-gray-300 text-sm leading-none">
                      Balai Pelatihan dan Penyuluhan Perikanan Bitung
                    </p>
                  </div>
                </Link>
                <Link
                  href="/lembaga/bppp/sukamandi"
                  className="group relative flex flex-col overflow-hidden rounded-3xl px-4 pb-4 pt-40"
                >
                  <Image
                    fill={true}
                    src="/images/layanan/profil-balai.JPG"
                    alt=""
                    className="absolute inset-0  object-cover group-hover:scale-105 group transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60  group-hover:bg-opacity-10 duration-700"></div>
                  <div className="flex flex-col gap-1  absolute top-0 left-0 mt-3 p-4 ">
                    <h3 className="z-10 text-2xl font-medium text-white xs:text-xl md:text-3xl font-calsans leading-none ">
                      Profil Balai
                    </h3>
                    <p className="text-gray-300 text-sm leading-none">
                      Balai Pendidikan dan Pelatihan Aparatur Sukamandi
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col">
              <Link
                href="/lembaga/bppp/medan"
                className="group relative flex flex-col overflow-hidden rounded-3xl px-4 pb-4 pt-40 flex-grow"
              >
                <Image
                  fill={true}
                  src="/images/layanan/layanan-lainnya.JPG"
                  alt=""
                  className="absolute inset-0 h-full group w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60  group-hover:bg-opacity-10 duration-700"></div>
                <div className="flex flex-col gap-1  absolute top-0 left-0 mt-3 p-4 ">
                  <h3 className="z-10 text-2xl font-medium text-white xs:text-xl md:text-3xl font-calsans leading-none ">
                    Layanan Lainnya
                  </h3>
                  <p className="text-gray-300 text-sm leading-none">
                    Balai Pelatihan dan Penyuluhan Perikanan Medan
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-4 mx-auto w-full px-5 sm:py-4  flex flex-col gap-4">
          <div className="max-w-3xl w-full mx-auto text-center pflex flex-col items-center justify-center pb-5 md:pb-8">
            <h1 className="text-4xl font-calsans leading-[100%]">
              Layanan Publik
              <br /> Tersedia di Balai Pelatihan
            </h1>
            <p className="text-base text-gray-60">
              Expore Balai penyelenggara pelatihan dan sertifikasi terakreditasi
              yang berfokus pada <br /> peningkatan SDM KP yang berkompetensi
              dan cari pelatihan dan sertifikasi yang ingin kamu ikuti.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
            <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-auto md:h-full flex flex-col">
              <Link
                href="/lembaga/bppp/ambon"
                className="group relative flex flex-col overflow-hidden rounded-3xl px-4 pb-4 pt-40 flex-grow"
              >
                <Image
                  fill={true}
                  src="/images/program-pelatihan/dummies/akp/akp-6.jpg"
                  alt=""
                  className="absolute inset-0  object-cover group-hover:scale-105 group transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60  group-hover:bg-opacity-10 duration-700"></div>

                <div className="flex flex-col gap-1  absolute top-0 left-0 mt-3 p-4 ">
                  <h3 className="z-10 text-2xl font-medium text-white xs:text-xl md:text-3xl font-calsans leading-none ">
                    Pelatihan Masyarakat
                  </h3>
                  <p className="text-gray-300 text-sm leading-none">
                    Balai Pelatihan dan Penyuluhan Perikanan Ambon
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
              <Link
                href="/lembaga/bppp/banyuwangi"
                className="group relative flex flex-col overflow-hidden rounded-3xl px-4 pb-4 pt-40 mb-4"
              >
                <Image
                  fill={true}
                  src="/images/program-pelatihan/dummies/akp/akp-2.jpg"
                  alt=""
                  className="absolute inset-0  object-cover group-hover:scale-105 group transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60  group-hover:bg-opacity-10 duration-700"></div>
                <div className="flex flex-col gap-1  absolute top-0 left-0 mt-3 p-4 ">
                  <h3 className="z-10 text-2xl font-medium text-white xs:text-xl md:text-3xl font-calsans leading-none ">
                    Uji Kompetensi
                  </h3>
                  <p className="text-gray-300 text-sm leading-none">
                    Balai Pelatihan dan Penyuluhan Perikanan Banyuwangi
                  </p>
                </div>
              </Link>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
                <Link
                  href="/lembaga/bppp/bitung"
                  className="group relative flex flex-col overflow-hidden rounded-3xl px-4 pb-4 pt-40"
                >
                  <Image
                    fill={true}
                    src="/images/program-pelatihan/dummies/akp/akp-4.jpg"
                    alt=""
                    className="absolute inset-0  object-cover group group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60  group-hover:bg-opacity-10 duration-700"></div>
                  <div className="flex flex-col gap-1  absolute top-0 left-0 mt-3 p-4 ">
                    <h3 className="z-10 text-2xl font-medium text-white xs:text-xl md:text-3xl font-calsans leading-none ">
                      Prasarana dan Sarana
                    </h3>
                    <p className="text-gray-300 text-sm leading-none">
                      Balai Pelatihan dan Penyuluhan Perikanan Bitung
                    </p>
                  </div>
                </Link>
                <Link
                  href="/lembaga/bppp/sukamandi"
                  className="group relative flex flex-col overflow-hidden rounded-3xl px-4 pb-4 pt-40"
                >
                  <Image
                    fill={true}
                    src="/images/layanan/profil-balai.JPG"
                    alt=""
                    className="absolute inset-0  object-cover group-hover:scale-105 group transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60  group-hover:bg-opacity-10 duration-700"></div>
                  <div className="flex flex-col gap-1  absolute top-0 left-0 mt-3 p-4 ">
                    <h3 className="z-10 text-2xl font-medium text-white xs:text-xl md:text-3xl font-calsans leading-none ">
                      Profil Balai
                    </h3>
                    <p className="text-gray-300 text-sm leading-none">
                      Balai Pendidikan dan Pelatihan Aparatur Sukamandi
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col">
              <Link
                href="/lembaga/bppp/medan"
                className="group relative flex flex-col overflow-hidden rounded-3xl px-4 pb-4 pt-40 flex-grow"
              >
                <Image
                  fill={true}
                  src="/images/layanan/layanan-lainnya.JPG"
                  alt=""
                  className="absolute inset-0 h-full group w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60  group-hover:bg-opacity-10 duration-700"></div>
                <div className="flex flex-col gap-1  absolute top-0 left-0 mt-3 p-4 ">
                  <h3 className="z-10 text-2xl font-medium text-white xs:text-xl md:text-3xl font-calsans leading-none ">
                    Layanan Lainnya
                  </h3>
                  <p className="text-gray-300 text-sm leading-none">
                    Balai Pelatihan dan Penyuluhan Perikanan Medan
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Layanan;
