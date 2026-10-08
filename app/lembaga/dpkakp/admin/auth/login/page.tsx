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
import { HiMiniUserGroup, HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeOff } from "react-icons/hi";

function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");

  // Showing Password
  const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false);

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
    } else if (email.includes('pukakp') && role == 'dpkakp') {
      Toast.fire({
        icon: "error",
        title: 'Oopsss!',
        text: `Role kamu bukan DPKAKP!`,
      });
      return;
    } else {
      try {
        const response = await axios.post(
          role == "penguji"
            ? `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/penguji/login`
            : `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/adminPusat/login`,
          {
            email: email,
            password: password,
          }
        );
        if (response.status == 200) {
          Toast.fire({
            icon: "success",
            title: "Yeayyy!",
            text: `Berhasil login, silahkan menggunakan layanan admin DPKAKP!`,
          });
          await handleClearFormLoginAdminDPKAKP();
          Cookies.set("XSRF095", response?.data?.t);
          Cookies.set(
            "IsPUKAKP",
            role == "pukakp" ? "true" : role == "penguji" ? "penguji" : "false"
          );
          if (containsPukakp(email) || email.includes('tryout')) {
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
              title: "Oopsss!",
              text: `Unauthorized, ${e.response?.data.pesan}!`,
            });
            await handleClearFormLoginAdminDPKAKP();
          } else {
            Toast.fire({
              icon: "error",
              title: "Oopsss!",
              text: `${e.response?.data.pesan}!`,
            });
            await handleClearFormLoginAdminDPKAKP();
          }
        } else {
          Toast.fire({
            icon: "error",
            title: "Oopsss!",
            text: `${e}!`,
          });
          await handleClearFormLoginAdminDPKAKP();
        }
      }
    }
  };

  return (
    <main className="bg-slate-900 w-full min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Image with animated scale */}
      <Image
        src={"/dpkakp/image3.jpg"}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-overlay hover:scale-105 transition-transform duration-[10000ms]"
        alt="Background"
        layout="fill"
        priority
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-blue-950/80 to-slate-900/95 z-10 backdrop-blur-[2px]"></div>

      {/* Decorative blurred circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px] z-10 pointer-events-none"></div>

      <section className="relative z-50 w-full px-6 py-6 flex flex-col items-center justify-center min-h-screen">
        {/* Header Section */}
        <div className="container relative flex flex-col items-center gap-2 text-center mb-6">
          <Link
            href={"/#"}
            className="inline-flex items-center rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1 text-sm font-medium text-teal-300 backdrop-blur-md shadow-lg shadow-teal-500/10 hover:bg-teal-500/20 transition-colors"
            target="_blank"
          >
            <span className="flex h-2 w-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
            DPKAKP Portal
          </Link>
          
          <div className="relative group mt-1">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <Image
              className="relative w-[80px] h-[80px] md:w-[95px] md:h-[95px] drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              src={"/lembaga/logo/logo-sertifikasi-akp.png"}
              width={95}
              height={95}
              alt="DPKAKP Logo"
            />
          </div>

          <h1 className="font-extrabold tracking-tight text-white text-3xl md:text-4xl mt-1 drop-shadow-lg">
            Login{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
              SIKAP
            </span>
          </h1>
          <p className="max-w-[42rem] leading-relaxed text-gray-300 text-sm mt-1 font-medium drop-shadow-md px-4">
            Selamat datang dewan penguji. Silahkan login untuk mengakses fitur-fitur penunjang pelaksanaan ujian keahlian awak kapal perikanan.
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-[26rem] mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <div className="flex flex-col gap-4">
            
            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="font-medium text-gray-200 text-sm tracking-wide">
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 group-hover:border-white/20"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label className="font-medium text-gray-200 text-sm tracking-wide">
                Password
              </label>
              <div className="relative group">
                <input
                  type={isShowPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 group-hover:border-white/20 pr-12"
                  placeholder="Enter your password"
                />
                <button 
                  type="button"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {isShowPassword ? (
                    <HiOutlineEyeOff className="text-xl" />
                  ) : (
                    <HiOutlineEye className="text-xl" />
                  )}
                </button>
              </div>
            </div>

            {/* Role Select */}
            <div className="flex flex-col gap-1.5">
              <label className="font-medium text-gray-200 text-sm tracking-wide">
                Role Admin
              </label>
              <Select
                value={role}
                onValueChange={(value: string) => setRole(value)}
              >
                <SelectTrigger className="w-full rounded-xl px-4 h-12 border border-white/10 bg-slate-900/50 text-white hover:border-white/20 focus:ring-2 focus:ring-teal-400 transition-all duration-300">
                  <div className="flex items-center gap-2.5 text-sm">
                    <HiMiniUserGroup className="text-lg text-teal-400" />
                    <span>
                      {role !== ""
                        ? role === "dpkakp"
                          ? "DPKAKP"
                          : role === "pukakp"
                            ? "PUKAKP"
                            : "Penguji"
                        : "Pilih Role"}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent side="bottom" className="bg-slate-900/95 backdrop-blur-xl border-white/10 text-white rounded-xl shadow-xl z-[100]">
                  <SelectGroup>
                    <SelectLabel className="text-gray-400 font-medium">Pilih Role Akses</SelectLabel>
                    <SelectItem value="dpkakp" className="focus:bg-teal-500/20 focus:text-teal-300 cursor-pointer py-2">DPKAKP</SelectItem>
                    <SelectItem value="pukakp" className="focus:bg-teal-500/20 focus:text-teal-300 cursor-pointer py-2">PUKAKP</SelectItem>
                    <SelectItem value="penguji" className="focus:bg-teal-500/20 focus:text-teal-300 cursor-pointer py-2">Penguji</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <button
              onClick={(e) => handleLoginAdminDPKAKP(e)}
              className="mt-1 w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-400 hover:to-teal-300 text-white font-semibold py-3 rounded-xl shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] transform hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 active:scale-[0.98]"
            >
              Sign In
            </button>
            
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
