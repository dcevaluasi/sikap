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
    if (email == "" && password == "") {
      Toast.fire({
        icon: "error",
        title: `Isi terlebih dahulu email dan passwordmu!`,
      });
      return;
    } else if (email == "" && password != "") {
      Toast.fire({
        icon: "error",
        title: `Isi terlebih dahulu emailmu!`,
      });
      return;
    } else if (email != "" && password == "") {
      Toast.fire({
        icon: "error",
        title: `Isi terlebih dahulu passwordmu!`,
      });
      return;
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/adminPusat/login`,
          {
            email: email,
            password: password,
          }
        );
        if (response.status == 200) {
          Toast.fire({
            icon: "success",
            title: `Berhasil login, silahkan menggunakan layanan admin DPKAKP!`,
          });
          await handleClearFormLoginAdminDPKAKP();
          Cookies.set("XSRF095", response?.data?.t);
          router.replace("/dpkakp/admin/dashboard");
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
              title: `${e.response?.data.pesan}!`,
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
    <main className="bg-darkDPKAKP w-full h-screen relative">
      <Image
        src={"/dpkakp/image3.jpg"}
        className="absolute w-full h-screen z-10 object-cover duration-1000"
        alt=""
        layout="fill"
        priority
      />
      <div className="absolute bg-black opacity-80 inset-0 z-20"></div>
      <section className="relative h-fit space-y-6 z-50 pb-8 pt-36 md:h-screen md:pb-12 md:pt-20 lg:py-44 w-full flex items-center justify-center flex-col">
        <div className="container relative flex max-w-[64rem] flex-col items-center gap-2 text-center">
          <Link
            href={"/dpkakp"}
            className="rounded-2xl bg-mutedDPKAKP px-4 py-1.5 text-sm text-gray-200 font-medium"
            target="_blank"
          >
            DPKAKP
          </Link>
          <Image
            className=" w-[70px] my-1 z-10"
            src={"/dpkakp/logo.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          />
          <h1 className="font-bold  text-gray-200 text-4xl -mt-2">
            Login Admin DPKAKP
          </h1>
          <p className="font-jakarta max-w-[42rem] leading-[115%] text-gray-300  sm:text-base  -mt-2">
            Selamat Datang Dewan Penguji, Silahkan Login Untuk Mengakses Fitur
            Ujian Untuk Pelaksaan Ujian Keahlian Awak Kapal Perikanan Tingkat I
            dan II
          </p>
          {/* <Image
            className="absolute -top-28 w-[500px] opacity-10 z-10"
            src={"/dpkakp/logo.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          /> */}
        </div>
        <div className="flex flex-col gap-3 w-full max-w-md mx-auto z-50">
          <div className="flex flex-col gap-1">
            <p className="font-jakarta  leading-[100%] text-gray-300  sm:text-sm sm:leading-8 -mt-4">
              Email Address
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" active:ring-mutedDPKAKP focus:ring-mutedDPKAKP active:outline-mutedDPKAKP   border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
              placeholder="Enter your email address"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-jakarta  leading-[100%] text-gray-300  sm:text-sm sm:leading-8 ">
              Password
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" active:ring-mutedDPKAKP focus:ring-mutedDPKAKP active:outline-mutedDPKAKP   border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={(e) => handleLoginAdminDPKAKP(e)}
            className="text-white w-full bg-blue-950 rounded-xl bg-opacity-100 py-2"
          >
            Login
          </button>
        </div>
      </section>
    </main>
  );
}

export default page;
