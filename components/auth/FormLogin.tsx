"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FormEvent } from "react";
import Toast from "../toast";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";

function FormLogin() {
  /* state variable to store basic user information to register */
  const [nik, setNik] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const handleLoginAkun = async (e: FormEvent) => {
    e.preventDefault();
    if (nik == "" || password == "") {
      Toast.fire({
        icon: "error",
        title: `Tolong lengkapi data login!`,
      });
    } else {
      try {
        const response: AxiosResponse = await axios.post(
          `${baseUrl}/users/login`,
          JSON.stringify({
            nik: nik,
            password: password,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log({ response });
        localStorage.setItem("XSRF081", response.data.t); // token user
        localStorage.setItem("XSRF082", "true"); // islogged in user
        Toast.fire({
          icon: "success",
          title: `Berhasil melakukan login!`,
        });

        if (localStorage.getItem("XSRF083")) {
          router.push("/dashboard/complete-profile");
        } else {
          router.push("/dashboard");
        }
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
            title: `Gagal melakukan login, ${errorMsg}!`,
          });
        } else {
          const errorMsg = error.response.data.Message;
          Toast.fire({
            icon: "error",
            title: `Gagal melakukan login. ${errorMsg}!`,
          });
        }
      }
    }
  };

  const [imageIndex, setImageIndex] = React.useState(0);
  const images = ["/images/hero-img4.jpg", "/images/hero-img5.jpg"];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full">
      <Image
        src={images[imageIndex]}
        className="absolute w-full h-full object-cover duration-1000 -z-40"
        alt=""
        layout="fill"
        priority
      />

      <div className="absolute w-full h-full bg-black bg-opacity-50 -z-30"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:-mt-8">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-0 md:pb-0">
            <h1 className="font-bold text-4xl leading-[100%] md:text-4xl text-gray-200 font-calsans">
              Login dan Ikuti <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Pelatihan serta Sertifikasi
              </span>{" "}
            </h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto mt-10">
            <form onSubmit={(e) => handleLoginAkun(e)}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-200 text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    NIK <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-input w-full text-black"
                    placeholder="Masukkan nik"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
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
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button
                    type="submit"
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    Login
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-200 text-center mt-3">
                By creating an account, you agree to the{" "}
                <a className="underline" href="#0">
                  terms & conditions
                </a>
                , and our{" "}
                <a className="underline" href="#0">
                  privacy policy
                </a>
                .
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
              Belum punya akun sebelumnya?{" "}
              <Link
                href="/registrasi"
                className="text-blue-600 hover:underline transition duration-150 ease-in-out"
              >
                Registrasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormLogin;
