"use client";

import React from "react";
import { Slide } from "react-awesome-reveal";

function Timeline() {
  return (
    <section>
      <div className="min-h-screen bg-gray-100 py-10 flex flex-col justify-center">
        <div className="max-w-3xl w-full mx-auto text-center pflex flex-col items-center justify-center pb-5 md:pb-8">
          <h1 className="text-4xl font-calsans leading-[100%]">
            Tata Cara Mengikuti
            <br /> Pelatihan atau Sertifikasi
          </h1>
          <p className="text-base text-gray-60">
            Ikuti langkah-langkah pendaftaran pada sistem ELAUT untuk
            mempermudah akses pelatihan dan sertifikasi pada program utama
            pelatihan secara online.
          </p>
        </div>
        <div className="py-3 sm:max-w-4xl sm:mx-auto w-full px-2 sm:px-0">
          <div className="relative text-gray-700 antialiased text-sm font-semibold">
            <div className="hidden sm:block w-1 bg-blue-300 absolute h-full left-1/2 transform -translate-x-1/2"></div>

            <Slide direction="left" className="mt-6 sm:mt-0 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex justify-start w-full mx-auto items-center">
                  <div className="w-full sm:w-1/2 sm:pr-8">
                    <div className="p-4 bg-white rounded shadow flex flex-col gap-1">
                      <h3 className="text-2xl font-calsans leading-none">
                        {" "}
                        Pilih Pelatihan atau Sertifikasi
                      </h3>
                      <p className="text-gray-500 font-normal">
                        Pilih pelatihan atau sertifikasi yang bisa Anda ikuti.
                        Mulai dari pelatihan teknis, kelautan, dan lain-lain.
                        Silahkan klik link di bawah ini untuk melihat daftar
                        lengkap pelatihan yang tersedia.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-full bg-blue-500 border-white border-4 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center p-2 w-12 h-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </div>
            </Slide>

            <Slide direction="right" className="mt-6 sm:mt-0 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex justify-end w-full mx-auto items-center">
                  <div className="w-full sm:w-1/2 sm:pl-8">
                    <div className="p-4 bg-white rounded shadow flex flex-col gap-1">
                      <h3 className="text-2xl font-calsans leading-none">
                        {" "}
                        Persiapan untuk Mendaftar
                      </h3>
                      <p className="text-gray-500 font-normal">
                        Buat akun terlebih dahulu jika belum mempunyai akun,
                        jika sudah maka terdapat beberapa hal yang harus Anda
                        persiapkan untuk Mendaftar. Mulai dari dokumen pribadi,
                        data diri dsb.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-full bg-blue-500 border-white border-4 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center p-2 w-12 h-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
              </div>
            </Slide>

            <Slide direction="left" className="mt-6 sm:mt-0 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex justify-start w-full mx-auto items-center">
                  <div className="w-full sm:w-1/2 sm:pr-8">
                    <div className="p-4 bg-white rounded shadow flex flex-col gap-1">
                      <h3 className="text-2xl font-calsans leading-none">
                        {" "}
                        Validasi Data Peserta dan Pembayaran
                      </h3>
                      <p className="text-gray-500 font-normal">
                        Setelah data divalidasi, Anda akan dihubungi balai untuk
                        info lebih lanjut terkait pelatihan, termasuk informasi
                        pembayaran jika anda mengikuti pelatihan yang berbayar
                        baik secara online atau datang langsung ke balai.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-full bg-blue-500 border-white border-4 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center p-2 w-12 h-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </Slide>

            <Slide direction="right" className="mt-6 sm:mt-0">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex justify-end w-full mx-auto items-center">
                  <div className="w-full sm:w-1/2 sm:pl-8">
                    <div className="p-4 bg-white rounded shadow flex flex-col gap-1">
                      <h3 className="text-2xl font-calsans leading-none">
                        {" "}
                        Konfirmasi Pelaksaaan Pelatihan atau Sertifikasi
                      </h3>
                      <p className="text-gray-500 font-normal">
                        Setelah semua proses selesai kamu akan mendapatkan
                        konfirmasi dari pihak balai pelatihan penyelenggara
                        terkait lokasi dan waktu pelaksanaan pelatihan yang akan
                        kamu ikuti.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-full bg-blue-500 border-white border-4 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center p-2 w-12 h-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
              </div>
            </Slide>

            <Slide direction="left" className="mt-6 sm:mt-0 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex justify-start w-full mx-auto items-center">
                  <div className="w-full sm:w-1/2 sm:pr-8">
                    <div className="p-4 bg-white rounded shadow flex flex-col gap-1">
                      <h3 className="text-2xl font-calsans leading-none">
                        {" "}
                        Pelaksanaan Pelatihan dan Sertifikasi
                      </h3>
                      <p className="text-gray-500 font-normal">
                        Ikuti pelaksanaan pelatihan dan sertifikasi sesuai
                        prosedur yang telah dijelaskan dan dapatkan sertifikat
                        atau sertifikasi setelah anda dinyatakan lulus pelatihan
                        atau sertifikasi uji kompetensi.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-full bg-blue-500 border-white border-4 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center p-2 w-12 h-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </Slide>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;
