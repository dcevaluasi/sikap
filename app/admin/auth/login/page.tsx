"use client";

import Toast from "@/components/toast";
import axios, { AxiosResponse } from "axios";
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

function page() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const [captcha, setCaptcha] = React.useState<string | null>()

  /*
    state variables for login
    */
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");

  /*
    method for resting all state data login (LOG)
*/
  const logAllStates = () => {
    console.log("email:", email);
    console.log("password:", password);
  };

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

    logAllStates();

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
      console.log({ response });
      console.log("Successfully logged in");
      Toast.fire({
        icon: "success",
        title: `Berhasil login ke admin E-LAUT!`,
      });

      Cookies.set("XSRF091", response.data.t);
      Cookies.set("XSRF092", "true");
      Cookies.set("XSRF093", role == "lemdik" ? "lemdiklat" : "adminPusat");

      resetAllStateToEmptyString();
      router.push(
        `/admin/${role == "lemdik" ? "lemdiklat" : "pusat"}/dashboard`
      );
    } catch (error) {
      console.error("Error saat melakukan login", error);
      Toast.fire({
        icon: "error",
        title: `Gagal melakukan login, harap coba lagi nanti!`,
      });
      throw error;
    }
  };
  return (
    <section className="min-h-screen max-h-screen flex items-stretch text-white bg-black">
      <div
        className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80);",
        }}
      >
        <Image
          src={"/images/hero-img3.jpg"}
          className="absolute w-full h-screen object-cover duration-1000"
          alt=""
          layout="fill"
          priority
        />
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="w-full px-24 z-10"></div>
      </div>
      <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-black">
        <div
          className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80);",
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        </div>
        <div className="w-full py-6 z-20 bg-black">
          <h1 className="my-6 font-calsans text-4xl">
            <Image
              className="w-16 md:w-32 mx-auto my-3"
              width={0}
              height={0}
              src={"/logo-kkp-white.png"}
              priority
              alt="Kementrian Kelautan dan Perikanan RI Logo"
            />
            Log In Admin
          </h1>
          <p className="text-gray-100 w-2/3 mx-auto -mt-6">
            Selamat datang kembali, silahkan login untuk mengakses dashboard
            admin!
          </p>
          <form
            onSubmit={(e) => handleLogin(e)}
            autoComplete="off"
            className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
          >
            <div className="pb-2 pt-4">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="block w-full p-4 text-base bg-black rounded-3xl border-white border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pb-2 pt-4">
              <input
                className="block w-full p-4 text-base bg-black rounded-3xl border-white border"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="pb-2 pt-4 w-full">
              <Select
                value={role}
                onValueChange={(value: string) => setRole(value)}
              >
                <SelectTrigger className="w-full rounded-3xl p-4 h-14">
                  <p className="mr-3 flex items-center gap-1 text-base">
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
            <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} className="mx-auto w-full font-inter text-sm" onChange={setCaptcha} />
            <div className="pb-2 pt-4">
              <button
                type="submit"
                className={`capitalize block w-full p-3 text-lg rounded-lg ${captcha ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 hover:bg-gray-600'} focus:outline-none`}
                disabled={captcha ? false : true}
              >
                sign in
              </button>
            </div>

            <div className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden ">
              <a href="#">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default page;
