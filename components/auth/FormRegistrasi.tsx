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
            no_number: phoneNumber,
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
  const images = ["/images/hero-img2.jpg"];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full">
      <AlertDialog open={openInfoKusuka}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isKusukaUser
                ? "No KUSUKA Tersedia!"
                : "No KUSUKA Tidak Tersedia"}
            </AlertDialogTitle>
            <AlertDialogTitle>
              <div className="flex w-full items-center justify-center gap-1 text-3xl border border-gray-300 rounded-xl py-3">
                {isKusukaUser ? (
                  <RiVerifiedBadgeFill className="text-green-500 text-3xl" />
                ) : (
                  <IoMdCloseCircle className="text-rose-600 text-3xl" />
                )}

                <span className="font-semibold">{noKusuka}</span>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isKusukaUser
                ? "Selamat karena anda merupakan pelaku utama dan memiliki nomor KUSUKA, klik lanjutkan untuk mengisi data secara otomatis"
                : "Maaf nomor KUSUKA tidak tersedia, kamu dapat registrasi manual kedalam ELAUT!"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={(e) => {
                setOpenInfoKusuka(false);
                clearForm();
              }}
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
              >
                Lanjutkan
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Image
        src={images[imageIndex]}
        className="absolute w-full h-full object-cover duration-1000 -z-40"
        alt=""
        layout="fill"
        priority
      />

      <div className="absolute w-full h-full bg-black bg-opacity-70 -z-30"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:-mt-8">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-0 md:pb-0">
            <h1 className="font-bold text-4xl leading-[100%] md:text-4xl text-gray-200 font-calsans">
              Registrasi dan Temukan <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Pelatihan serta Sertifikasi Menarik
              </span>{" "}
            </h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto mt-5">
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
                  className="form-input w-full text-black"
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
                    className="btn text-white py-3 bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    Cek
                  </button>
                </div>
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
                    className="form-input w-full text-black"
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
                    className="form-input w-full text-black"
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
                    type="phone number"
                    className="form-input w-full text-black"
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
              {/* <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-200 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email <span className="text-red-600"></span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input w-full text-black"
                    placeholder="Masukkan alamat email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div> */}
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
                    className="form-input w-full text-black"
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
                <div className="w-full px-3">
                  <button
                    type="submit"
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    Registrasi
                  </button>
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
                className="text-blue-600 hover:underline transition duration-150 ease-in-out"
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
