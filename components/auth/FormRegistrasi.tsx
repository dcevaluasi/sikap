"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, MouseEventHandler } from "react";
import Toast from "../toast";
import axios, { AxiosError, AxiosResponse } from "axios";
import { error } from "console";
import Cookies from "js-cookie";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { TbNumber } from "react-icons/tb";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";

function FormRegistrasi() {
  const router = useRouter();

  const [noKusuka, setNoKusuka] = React.useState("");

  const handleCheckingNoKusuka = async (e: any) => {
    e.preventDefault();
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/getDataKusuka?nomor_kusuka=${noKusuka}`;
      console.log("Request URL:", url);

      const response = await axios.get(url);
      setOpenInfoKusuka(false);
      if (response.data.data == "Anda tidak memiliki akses") {
        Toast.fire({
          icon: "error",
          title: `Internal server error, token tidak memiliki akses!`,
        });
        setOpenInfoKusuka(false);
      }

      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        const data = response.data.data[0];
        console.log({ response });
        setIsKusukaUser(true);
        setName(data.NamaPelakuUtama);
        setEmail("");
        setNik(data.NomorKUSUKA);
        setPhoneNumber("");
        setOpenInfoKusuka(true);
      } else {
        console.log({ response });
        setOpenInfoKusuka(true);
        setIsKusukaUser(false);
      }
    } catch (error: any) {
      setOpenInfoKusuka(false);
      setIsKusukaUser(false);
      Toast.fire({
        icon: "error",
        title: `Internal server error, hubungi helpdesk!`,
      });
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
    }
  };

  /* state variable to store basic user information to register */
  const [name, setName] = React.useState<string>("");
  const [nik, setNik] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const clearForm = () => {
    setName("");
    setNik("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [isInputError, setIsInputError] = React.useState(false);
  const [isKUSUKA, setIsKUSUKA] = React.useState("");

  const handleRegistrasiAkun = async (e: FormEvent) => {
    e.preventDefault();
    if (name == "" || nik == "" || phoneNumber == "" || password == "") {
      Toast.fire({
        icon: "error",
        title: `Tolong lengkapi data registrasi!`,
      });
      setIsInputError(true);
    } else {
      try {
        const response: AxiosResponse = await axios.post(
          `${baseUrl}/users/registerUser`,
          JSON.stringify({
            nik: nik,
            nama: name,
            password: password,
            no_number: phoneNumber.toString(),
            kusuka_users: isKUSUKA,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log({ response });

        Cookies.set("XSRF083", "true");

        Toast.fire({
          icon: "success",
          title: `Berhasil melakukan registrasi akun, silahkan untuk login terlebih dahulu!`,
        });
        router.push("/login");
      } catch (error: any) {
        console.error({ error });
        if (
          error.response &&
          error.response.data &&
          error.response.data.Message
        ) {
          const errorMsg = error.response.data.Message;
          Toast.fire({
            icon: "error",
            title: `Gagal melakukan registrasi akun, ${errorMsg}!`,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: `Gagal melakukan registrasi akun. Terjadi kesalahan tidak diketahui.`,
          });
        }
      }
    }
  };

  const [openInfoKusuka, setOpenInfoKusuka] = React.useState(false);
  const [isKusukaUser, setIsKusukaUser] = React.useState(false);

  const [imageIndex, setImageIndex] = React.useState(0);
  const images = ["/images/program-pelatihan/dummies/kelautan/kelautan-6.jpg"];

  const [imageMobIndex, setImageMobIndex] = React.useState(0);
  const imagesMob = ["/diklat/bstf-1.jpg"];

  const [useKUSUKA, setUseKUSUKA] = React.useState<boolean>(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setImageMobIndex((prevIndex) => (prevIndex + 1) % imagesMob.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full">
      <AlertDialog open={openInfoKusuka}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <div className="flex flex-col gap-0">
              <AlertDialogTitle className="text-xl ">
                {isKusukaUser
                  ? "No KUSUKA Tersedia!"
                  : "No KUSUKA Tidak Tersedia!"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {isKusukaUser
                  ? "Selamat karena anda merupakan pelaku utama dan memiliki nomor KUSUKA, klik lanjutkan untuk mengisi data secara otomatis"
                  : "Maaf nomor KUSUKA tidak tersedia, kamu dapat registrasi manual kedalam ELAUT!"}
              </AlertDialogDescription>
            </div>

            <AlertDialogTitle>
              <div className="flex w-full items-center justify-center gap-1 text-xl md:text-3xl border border-gray-300 rounded-xl py-3">
                {isKusukaUser ? (
                  <RiVerifiedBadgeFill className="text-green-500 text-3xl" />
                ) : (
                  <IoMdCloseCircle className="text-rose-600 text-3xl" />
                )}

                <span className="font-semibold">{noKusuka}</span>
              </div>
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={(e) => {
                setOpenInfoKusuka(false);
                clearForm();
              }}
              className={`${!isKusukaUser && "-mt-2"}`}
            >
              {isKusukaUser ? "Batal" : "Oke"}
            </AlertDialogCancel>
            {isKusukaUser && (
              <AlertDialogAction
                onClick={(e) => {
                  setOpenInfoKusuka(false);
                  setIsKUSUKA("yes");
                  Cookies.set("IsUsedKusuka", "yes");
                }}
                className="bg-blue-500 h-10"
              >
                Lanjutkan
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Image
        src={images[imageIndex]}
        className="absolute w-full h-full hidden md:block object-cover duration-1000 -z-40"
        alt=""
        layout="fill"
        priority
      />

      <Image
        src={imagesMob[imageMobIndex]}
        className="absolute w-full h-full block md:hidden object-cover duration-1000 -z-40"
        alt=""
        layout="fill"
        priority
      />

      <div className="absolute w-full h-full bg-black bg-opacity-70 -z-30"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:-mt-8 ">
        <div className="pt-32 pb-32 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="w-full mx-auto text-center pb-0 md:pb-0">
            <h1 className="font-semibold text-4xl leading-[110%] md:text-4xl text-gray-200">
              <span className="font-calsans text-[3.4rem] md:text-[3.7rem]">
                Registrasi
              </span>{" "}
              <br />
              <span className="z-0 bg-clip-text text-[4.2rem] w-[600px] md:text-[3.7rem] leading-[110%]  text-transparent bg-gradient-to-r font-calsans from-blue-500  to-teal-400">
                Pelatihan dan Sertifikasi
              </span>{" "}
            </h1>
          </div>

          {/* Form */}
          <div className="max-w-sm  mx-5 md:mx-auto mt-5">
            {useKUSUKA && (
              <form
                onSubmit={(e) => handleCheckingNoKusuka(e)}
                className="w-full flex gap-1"
              >
                <div className="w-full">
                  <label
                    className="block text-gray-200 text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    No KUSUKA <span className="text-red-600"></span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-input w-full bg-transparent placeholder:text-gray-200 border-gray-400 focus:border-gray-200  active:border-gray-200 text-gray-200"
                    placeholder="Masukkan nomor KUSUKA"
                    value={noKusuka}
                    onChange={(e) => setNoKusuka(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button
                      type="submit"
                      className="btn text-white py-3 bg-blue-500 hover:bg-blue-600 w-full"
                    >
                      Cek
                    </button>
                  </div>
                </div>
              </form>
            )}

            <div className="flex items-center my-6">
              <div
                className="border-t border-gray-300 grow mr-3"
                aria-hidden="true"
              ></div>
              <div
                className="border-t border-gray-300 grow ml-3"
                aria-hidden="true"
              ></div>
            </div>
            <form onSubmit={(e) => handleRegistrasiAkun(e)} autoComplete="off">
              <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-200 text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Nama Lengkap <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-input w-full bg-transparent placeholder:text-gray-200 border-gray-400 focus:border-gray-200  active:border-gray-200 text-gray-200"
                    placeholder="Masukkan nama lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  {isInputError && (
                    <span className="text-[#FF0000] font-medium">
                      *Masukkan nama lengkap!
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-200 text-sm font-medium mb-1"
                    htmlFor="nik"
                  >
                    NIK <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="nik"
                    type="nik"
                    className="form-input w-full bg-transparent placeholder:text-gray-200 border-gray-400 focus:border-gray-200  active:border-gray-200 text-gray-200"
                    placeholder="Masukkan NIK"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    required
                  />
                  {isInputError && (
                    <span className="text-[#FF0000] font-medium">
                      *Masukkan NIK!
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-200 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    No Telpon <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="phone number"
                    type="number"
                    maxLength={13}
                    className="form-input w-full bg-transparent placeholder:text-gray-200 border-gray-400 focus:border-gray-200  active:border-gray-200 text-gray-200"
                    placeholder="Masukkan no telpon"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                  {isInputError && (
                    <span className="text-[#FF0000] font-medium">
                      *Masukkan no telpon!
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-200 text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Password <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-input w-full bg-transparent placeholder:text-gray-200 border-gray-400 focus:border-gray-200  active:border-gray-200 text-gray-200"
                    placeholder="Masukkan password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {isInputError && (
                    <span className="text-[#FF0000] font-medium">
                      *Masukkan password!
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3 flex flex-col gap-2">
                  <button
                    type="submit"
                    className="btn text-white bg-blue-500 hover:bg-blue-600 w-full"
                  >
                    Registrasi
                  </button>
                  {!useKUSUKA && (
                    <button
                      type="button"
                      onClick={(e) => {
                        setUseKUSUKA(!useKUSUKA);
                        window.scrollTo(0, 0);
                      }}
                      className="btn text-white bg-transparent border border-blue-500 hover:bg-blue-500 flex w-full gap-2"
                    >
                      <Image
                        src={"/logo-kkp-full-white.png"}
                        className="w-6"
                        alt=""
                        width={0}
                        height={0}
                      />
                      <span>Daftar Dengan KUSUKA</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-200 text-center mt-3">
                Dengan membuat akun, anda menyetujui{" "}
                <a className="underline" href="#0">
                  Ketentuan & Kondisi
                </a>
                , serta{" "}
                <a className="underline" href="#0">
                  Keamanan Privasi
                </a>{" "}
                kami .
              </div>
            </form>
            <div className="flex items-center my-6">
              <div
                className="border-t border-gray-300 grow mr-3"
                aria-hidden="true"
              ></div>
              <div
                className="border-t border-gray-300 grow ml-3"
                aria-hidden="true"
              ></div>
            </div>
            <div className="text-gray-200 text-center mt-6">
              Sudah punya akun sebelumnya?{" "}
              <Link
                href="/login"
                className="text-blue-500 hover:underline transition duration-150 ease-in-out"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormRegistrasi;
