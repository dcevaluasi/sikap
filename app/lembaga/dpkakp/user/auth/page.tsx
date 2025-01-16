"use client";

import Toast from "@/components/toast";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleClearFormLoginAdminDPKAKP = async () => {
    setEmail("");
    setPassword("");
  };

  const handleLoginAdminDPKAKP = async (e: any) => {
    if (password == "") {
      Toast.fire({
        icon: "error",
        title: `Isi terlebih dahulu kode aksesmu!`,
      });
      return;
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/AuthExam`,
          {
            code_akses: password,
          }
        );
        if (response.status == 200) {
          Toast.fire({
            icon: "success",
            title: `Berhasil memasukkan kode akses, silahkan lanjut melaksanakan ujian!`,
          });
          await handleClearFormLoginAdminDPKAKP();
          Cookies.set("XSRF096", response?.data?.t);
          router.replace("/lembaga/dpkakp/user/auth/guide");
        } else {
          Toast.fire({
            icon: "error",
            title: response.statusText,
          });

          await handleClearFormLoginAdminDPKAKP();
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.status == 401) {
            Toast.fire({
              icon: "error",
              title: `Unauthorized, ${e.response?.data.pesan}!`,
            });
            await handleClearFormLoginAdminDPKAKP();
          } else {
            Toast.fire({
              icon: "error",
              title: `${e.response?.data.Pesan}!`,
            });
            await handleClearFormLoginAdminDPKAKP();
          }
        } else {
          Toast.fire({
            icon: "error",
            title: `${e}!`,
          });
          await handleClearFormLoginAdminDPKAKP();
        }
      }
    }
  };

  return (
    <main className="bg-darkDPKAKP w-full h-screen">
      <section className="relative h-fit space-y-6 pb-8 pt-36 md:h-screen md:pb-12 md:pt-20 lg:py-44 w-full flex items-center justify-center flex-col px-8 md:px-0">
        <div className="container relative flex max-w-[64rem] flex-col items-center gap-2 text-center">
          <Link
            href={"/dpkakp"}
            className="rounded-2xl bg-mutedDPKAKP px-4 py-1.5 mt-40 md:mt-0 text-sm text-gray-200 font-medium"
            target="_blank"
          >
            DPKAKP
          </Link>
          <h1 className="font-bold text-gray-200 text-4xl -mt-2 leading-none md:leading-normal py-3 md:py-0">
            Akses Ujian Keahlian
          </h1>
          <p className="font-jakarta max-w-[42rem] leading-[100%] text-mutedForegroundDPKAKP  sm:text-lg sm:leading-8 -mt-2">
            Selamat Datang Dewan Penguji, Silahkan Login Untuk Mengakses Fitur
            Ujian Keahlian Awak Kapal Perikanan
          </p>
          <Image
            className="absolute top-40 md:-top-28 w-[600px] opacity-10 z-10"
            src={"/lembaga/logo/logo-sertifikasi-akp.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          />
        </div>
        <div className="flex flex-col gap-3 w-full max-w-md mx-auto z-50 -mt-20">
          <div className="flex flex-col gap-1">
            <p className="font-jakarta  leading-[100%] text-mutedForegroundDPKAKP   sm:text-sm sm:leading-8 ">
              Kode Akses
            </p>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
              placeholder="Enter your kode akses"
            />
          </div>
          <button
            onClick={(e) => handleLoginAdminDPKAKP(e)}
            className="text-white w-full bg-blue-950 rounded-xl bg-opacity-100 py-2"
          >
            Mulai Ujian
          </button>
        </div>
      </section>
    </main>
  );
}

export default page;
