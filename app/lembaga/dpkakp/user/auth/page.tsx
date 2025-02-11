"use client";

import Toast from "@/components/toast";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlineEyeOff } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi2";

function page() {
  const router = useRouter();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  // Showing Code Access
  const [isShowCode, setIsShowCode] = React.useState<boolean>(false);

  const [isAccessingCode, setIsAccessingCode] = React.useState<boolean>(false);

  const handleClearFormLoginAdminDPKAKP = async () => {
    setEmail("");
    setPassword("");
  };

  const handleLoginAdminDPKAKP = async (e: any) => {
    setIsAccessingCode(true);
    if (password == "") {
      Toast.fire({
        icon: "error",
        title: `Oopss!`,
        text: "Maaf, masukkan kode akses terlebih dahulu sebelum memulai ujian!",
      });
      setIsAccessingCode(false);
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
            title: "Yeayyy!",
            text: `Berhasil memasukkan kode akses, silahkan lanjut melaksanakan ujian!`,
          });
          await handleClearFormLoginAdminDPKAKP();
          Cookies.set("XSRF096", response?.data?.t);
          setIsAccessingCode(false);
          router.replace("/lembaga/dpkakp/user/auth/guide");
        } else {
          Toast.fire({
            icon: "error",
            title: "Oopss!",
            text: response.statusText,
          });

          setIsAccessingCode(false);
          await handleClearFormLoginAdminDPKAKP();
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.status == 401) {
            Toast.fire({
              icon: "error",
              title: "Oopss!",
              text: `Unauthorized, ${e.response?.data.pesan}!`,
            });
            setIsAccessingCode(false);
            await handleClearFormLoginAdminDPKAKP();
          } else {
            Toast.fire({
              icon: "error",
              title: "Oopss!",
              text: `${e.response?.data.Pesan}!`,
            });
            setIsAccessingCode(false);
            await handleClearFormLoginAdminDPKAKP();
          }
        } else {
          Toast.fire({
            icon: "error",
            title: `${e}!`,
          });
          setIsAccessingCode(false);
          await handleClearFormLoginAdminDPKAKP();
        }
      }
    }
  };

  return (
    <main className="bg-darkDPKAKP w-full h-full relative">
      <Image
        src={"/dpkakp/image2.jpg"}
        className="absolute w-full h-screen z-10 object-cover duration-1000"
        alt=""
        layout="fill"
        priority
      />
      <div className="absolute bg-blue-950 opacity-80 inset-0 z-20"></div>
      <section className="relative h-fit space-y-6 z-50 pb-8 pt-36 md:h-screen md:pb-12 md:pt-20 lg:py-44 w-full flex items-center justify-center flex-col">
        <div className=" relative flex max-w-[64rem] flex-col items-center gap-2 text-center">
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
          <h1 className="font-bold  font-calsans leading-none text-gray-200 text-4xl -mt-4">
            Akses Ujian Keahlian <br />
            <span className=" bg-clip-text text-transparent bg-gradient-to-r leading-none pt-0 from-blue-500 to-teal-400">
              Awak Kapal Perikanan
            </span>
          </h1>
          <p className="font-jakarta max-w-[42rem] leading-[120%] text-gray-200  sm:text-base ">
            Selamat datang peserta ujian! Masukkan kode aksesmu untuk dapat
            memulai ujiannya, persiapkan diri dengan baik!
          </p>
        </div>
        <div className="flex flex-col w-full max-w-md mx-auto z-50 px-10">
          <div className="flex flex-col">
            <p className="font-jakarta  leading-[100%] text-gray-300  sm:text-sm sm:leading-8 -mt-4">
              Kode Ujian
            </p>
            <span className="relative w-full h-fit mt-2">
              <input
                type={isShowCode ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" active:ring-blue-500 focus:ring-blue-500 active:outline-blue-500  border rounded-xl text-white border-blue-500 bg-transparent w-full placeholder:text-white"
                placeholder="Masukkan kode akses"
              />
              <span onClick={(e) => setIsShowCode(!isShowCode)}>
                {isShowCode ? (
                  <HiOutlineEyeOff className="text-gray-200 my-auto top-3  mr-5 absolute right-0 text-xl cursor-pointer" />
                ) : (
                  <HiOutlineEye className="text-gray-200 my-auto top-3  mr-5 absolute right-0 text-xl cursor-pointer" />
                )}
              </span>
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {isAccessingCode ? (
              <button
                disabled={true}
                className="text-white w-full  bg-blue-500 rounded-xl bg-opacity-80 py-2 mt-2"
              >
                Loading...
              </button>
            ) : (
              <button
                onClick={(e) => handleLoginAdminDPKAKP(e)}
                className="text-white w-full bg-blue-500 rounded-xl bg-opacity-100 py-2 mt-2"
              >
                Mulai Ujian
              </button>
            )}

            {!isAccessingCode && (
              <>
                <div className="flex items-center mt-6">
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
                  Dalam meningkatkan layanan pelaksanaan ujian keahlian silahkan
                  mengisi{" "}
                  <Link
                    href="/lembaga/dpkakp/user/survey"
                    className="text-blue-500 hover:underline transition duration-150 ease-in-out"
                  >
                    survey berikut
                  </Link>{" "}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
