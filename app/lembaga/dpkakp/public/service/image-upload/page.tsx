"use client";

import Toast from "@/components/toast";
import { dpkakpBaseUrl } from "@/constants/urls";
import { containsPukakp } from "@/utils/dpkakp";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateRandomString } from "@/lib/utils";

function page() {
  const [isPosting, setIsPosting] = React.useState<boolean>(false);

  const [urlPhoto, setUrlPhoto] = React.useState<string>("");

  const [foto, setFoto] = React.useState<File | null>(null);

  const handleFileChange = (e: any) => {
    setFoto(e.target.files[0]);
  };

  const handlePostGgambar = async (e: any) => {
    setIsPosting(true);

    const formData = new FormData();
    if (foto != null) {
      formData.append("foto", foto!);
    }

    try {
      const response = await axios.post(
        `${dpkakpBaseUrl}/uploadGambar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      Toast.fire({
        icon: "success",
        title: `Berhasil menambahkan data gambar soal ujian keahlian baru!`,
      });
      setUrlPhoto(response.data.Url);
      setIsPosting(false);
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: `Gagal menambahkan data gambar soal ujian keahlian baru!`,
      });
      setIsPosting(true);
    }
  };

  const handleUploadNewPhoto = (e: any) => {
    setUrlPhoto("");
    setFoto(null);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
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
          <h1 className="font-bold  font-calsans text-gray-200 text-4xl -mt-2 leading-none">
            Upload Gambar <br />
            <span className=" bg-clip-text text-transparent bg-gradient-to-r leading-none pt-0 from-blue-500 to-teal-400">
              Soal Ujian Keahlian
            </span>
          </h1>
        </div>
        <div className="flex flex-col w-full max-w-md mx-auto z-50 px-10 -mt-14">
          {urlPhoto == "" ? (
            <fieldset>
              <div className="grid grid-cols-1 space-y-2">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col rounded-lg border-2 border-dashed w-full h-40 p-10 group text-center">
                    <div className="h-full w-full text-center flex flex-col items-center justify-center hover:cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      {foto == null ? (
                        <p className="pointer-none text-gray-300 text-sm">
                          <span className="text-sm">Drag and drop</span> files
                          here <br /> or{" "}
                          <a
                            href=""
                            id=""
                            className="text-blue-600 hover:underline"
                          >
                            select a file
                          </a>{" "}
                          from your computer
                        </p>
                      ) : (
                        <p className="pointer-none text-gray-200 text-sm">
                          {foto.name}
                        </p>
                      )}{" "}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
              <p className="text-sm text-gray-200 my-2">
                <span>Tipe file: doc,pdf, tipe gambar</span>
              </p>
            </fieldset>
          ) : (
            <div className="flex w-full max-w-sm items-center space-x-2 mb-2">
              <Input
                type="text"
                placeholder="URL..."
                value={generateRandomString(urlPhoto, 15)}
                readOnly
                className="text-gray-200 placeholder:text-gray-200"
              />
              <Button
                type="button"
                onClick={(e) => handleCopy(urlPhoto)}
                className="py-2 bg-blue-500 hover:bg-blue-700 duration-700"
              >
                Copy URL
              </Button>
            </div>
          )}

          {urlPhoto != "" ? (
            <button
              onClick={(e) => handleUploadNewPhoto(e)}
              className="text-white w-full bg-blue-500 hover:bg-blue-700 duration-700 rounded-xl bg-opacity-100 py-2 mt-2"
            >
              Upload Gambar Baru
            </button>
          ) : (
            <button
              onClick={(e) => handlePostGgambar(e)}
              className="text-white w-full bg-blue-500 hover:bg-blue-700 duration-700 rounded-xl bg-opacity-100 py-2 mt-2"
            >
              Upload
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default page;
