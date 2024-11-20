"use client";

import Toast from "@/components/toast";
import { containsPukakp } from "@/utils/dpkakp";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
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
import { HiMiniUserGroup } from "react-icons/hi2";

function page() {
  const router = useRouter();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");

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
          if (containsPukakp(email)) {
            router.replace("/lembaga/pukakp/admin/dashboard/ujian");
          } else {
            router.replace("/lembaga/dpkakp/admin/dashboard/ujian");
          }
        } else {
          Toast.fire({
            icon: "error",
            title: response.statusText,
          });

          await handleClearFormLoginAdminDPKAKP();
        }
      } catch (e) {
        console.error("LOGIN ADMIN", e);
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
      <div className="absolute bg-blue-950 opacity-80 inset-0 z-20"></div>
      <section className="relative h-fit space-y-6 z-50 pb-8 pt-36 md:h-screen md:pb-12 md:pt-20 lg:py-44 w-full flex items-center justify-center flex-col">
        <div className="container relative flex max-w-[64rem] flex-col items-center gap-2 text-center">
          <Link
            href={"/dpkakp"}
            className="rounded-2xl bg-blue-500 px-4 py-1.5 text-sm text-gray-200 font-medium"
            target="_blank"
          >
            DPKAKP
          </Link>
          <Image
            className=" w-[100px] my-1 z-10"
            src={"/lembaga/logo/logo-sertifikasi-akp.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          />
          <h1 className="font-bold  font-calsans text-gray-200 text-4xl -mt-4">
            Login Sistem{" "}
            <span className=" bg-clip-text text-transparent bg-gradient-to-r leading-none pt-0 from-blue-500 to-teal-400">
              DPKAKP
            </span>
          </h1>
          <p className="font-jakarta max-w-[42rem] leading-[115%] text-gray-200  sm:text-base  -mt-4">
            Selamat datang dewan penguji, silahkan login untuk mengakses fitur -
            fitur penunjang pelaksanaan ujian keahlian awak kapal perikanan!
          </p>
        </div>
        <div className="flex flex-col w-full max-w-md mx-auto z-50 px-10">
          <div className="flex flex-col">
            <p className="font-jakarta  leading-[100%] text-gray-300  sm:text-sm sm:leading-8 -mt-4">
              Email Address
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" active:ring-blue-500 focus:ring-blue-500 active:outline-blue-500   border rounded-xl text-white border-blue-500 bg-transparent w-full placeholder:text-white"
              placeholder="Enter your email address"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-jakarta  leading-[100%] text-gray-300  sm:text-sm sm:leading-8 ">
              Password
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" active:ring-blue-500 focus:ring-blue-500 active:outline-blue-500 border rounded-xl text-white border-blue-500 bg-transparent w-full placeholder:text-white"
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
                    ? role == "dpkakp"
                      ? "DPKAKP"
                      : role == "pukakp"
                      ? "PUKAKP"
                      : "Penguji"
                    : "Pilih Role"}
                </p>
              </SelectTrigger>
              <SelectContent side="top">
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="dpkakp">DPKAKP</SelectItem>
                  <SelectItem value="pukakp">PUKAKP</SelectItem>
                  <SelectItem value="penguji">Penguji</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <button
            onClick={(e) => handleLoginAdminDPKAKP(e)}
            className="text-white w-full bg-blue-500 rounded-xl bg-opacity-100 py-2 mt-2"
          >
            Login
          </button>
        </div>
      </section>
    </main>
  );
}

export default page;
