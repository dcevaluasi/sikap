"use client";

import Toast from "@/components/toast";
import axios, { AxiosError, AxiosResponse } from "axios";
import { request } from "https";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { FiSlack } from "react-icons/fi";
import { HiMiniUserGroup } from "react-icons/hi2";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";

function page() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const [captcha, setCaptcha] = React.useState<string | null>();

  /*
    state variables for login
    */
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");

  const resetAllStateToEmptyString = () => {
    setEmail("");
    setPassword("");
  };

  /*
        method for processing login (POST)
      */
  const handleLogin = async (e: any) => {
    e.preventDefault();

    const data = new FormData();
    data.append("email", email);
    data.append("password", password);

    try {
      const response: AxiosResponse = await axios.post(
        `${baseUrl}/${role}/login`,
        JSON.stringify({
          email: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Toast.fire({
        icon: "success",
        title: `Berhasil login ke admin E-LAUT!`,
      });

      Cookies.set("XSRF091", response.data.t);
      Cookies.set("XSRF092", "true");
      Cookies.set("XSRF093", role == "lemdik" ? "lemdiklat" : "adminPusat");

      resetAllStateToEmptyString();
      router.push(
        `/admin/${role == "lemdik" ? "lemdiklat" : "puslat"}/dashboard`
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status == 401) {
          Toast.fire({
            icon: "error",
            title: `Email atau password yang dimasukkan salah, harap periksa kembali!`,
          });
        } else if (error.response?.status == 500) {
          Toast.fire({
            icon: "error",
            title: `Proses login gagal dikarenakan terjadi gangguan pada server, hubungi admin pusat melalui call center!`,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: `Periksa jaringan internetmu, sistem tidak terhubung ke internet!`,
          });
        }
      }
    }
  };

  return (
    <main className="bg-darkDPKAKP w-full h-screen relative">
      <Image
        src={"/images/hero-img3.jpg"}
        className="absolute w-full h-screen z-10 object-cover duration-1000"
        alt=""
        layout="fill"
        priority
      />
      <div className="absolute bg-black opacity-70 inset-0 z-20"></div>

      <section className=" z-50 relative h-fit space-y-6 pb-8 pt-36 md:h-screen md:pb-12 md:pt-20 lg:py-44 w-full flex items-center justify-center flex-col">
        <div className="container relative flex max-w-[64rem] flex-col items-center gap-2 text-center">
          <Link
            href={"/dpkakp"}
            className="rounded-2xl bg-blue-500 px-4 py-1.5 text-sm text-gray-200 font-medium"
            target="_blank"
          >
            E-LAUT
          </Link>
          <Image
            className=" w-[90px] my-1 z-10"
            src={"/images/logo/logo-elaut-color.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          />
          <h1 className="font-bold  text-gray-200 text-4xl -mt-2">
            Login Admin E-LAUT
          </h1>
          <p className="font-jakarta max-w-[42rem] leading-[115%] text-gray-300  sm:text-base -mt-2">
            Selamat datang kembali, silahkan login untuk mengakses dashboard
            admin Elektronik Layanan Pelatihan Kelautan dan Perikanan Utama
            Terpadu!
          </p>
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
              className="border rounded-xl text-white border-blue-500 bg-transparent w-full placeholder:text-gray-300"
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
              className="border rounded-xl text-white border-blue-500 bg-transparent w-full placeholder:text-gray-300"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-jakarta  leading-[100%] text-gray-300  sm:text-sm sm:leading-8 ">
              Role Admin
            </p>
            <Select
              value={role}
              onValueChange={(value: string) => setRole(value)}
            >
              <SelectTrigger className="w-full rounded-xl p-4 h-[2.7rem] border border-blue-500">
                <p className="mr-3 flex items-center gap-1 text-base text-gray-300">
                  <HiMiniUserGroup />
                  {role != ""
                    ? role == "adminPusat"
                      ? "Admin Pusat"
                      : "Lemdiklat"
                    : "Pilih Role"}
                </p>
              </SelectTrigger>
              <SelectContent side="top">
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="adminPusat">Admin Pusat</SelectItem>
                  <SelectItem value="lemdik">Admin Balai</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <button
            onClick={(e) => handleLogin(e)}
            className="text-white w-full bg-blue-500 rounded-xl bg-opacity-100 py-2"
          >
            Login
          </button>
        </div>
      </section>
    </main>
  );
}

export default page;
