"use client";

import Toast from "@/components/toast";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function FormAsesorPage() {
  const router = useRouter();

  const [namaUserDpkakp, setNamaUserDpkakp] = React.useState<string>("");
  const [typeDpkakp, setTypeDpkakp] = React.useState<string>("");
  const [nik, setNik] = React.useState<string>("");
  const [alamat, setAlamat] = React.useState<string>("");
  const [provinsi, setProvinsi] = React.useState<string>("");
  const [cities, setCities] = React.useState<string>("");
  const [asalInstansi, setAsalInstansi] = React.useState<string>("");
  const [nomorTelpon, setNomorTelpon] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [jabatan, setJabatan] = React.useState<string>("");
  const [golongan, setGolongan] = React.useState<string>("");
  const [tipeKeahlian, setTipeKeahlian] = React.useState<string>("");
  const [foto, setFoto] = React.useState<File | null>(null);
  const [pegalamanBerlayara, setPengalamanBerlayar] =
    React.useState<string>("");

  const [ijazah, setIjazah] = React.useState<File | null>(null);
  const [sertifikatKeahlian, setSertifikatKeahlian] =
    React.useState<File | null>(null);
  const [sertifikatTot, setSertifikatTot] = React.useState<File | null>(null);
  const [sertifikatToe, setSertifikatToe] = React.useState<File | null>(null);
  const [sertifikatToeSimulator, setSertifikatToeSimulator] =
    React.useState<File | null>(null);
  const [sertifikatAuditor, setSertifikatAuditor] = React.useState<File | null>(
    null
  );
  const [sertifikatLainnya, setSertifikatLainnya] = React.useState<File | null>(
    null
  );
  const [bukuPelaut, setBukuPelaut] = React.useState<File | null>(null);
  const [experience, setExperience] = React.useState<string>("");

  const handleClearFormPengujiDPKAKP = () => {
    setNamaUserDpkakp("");
    setTypeDpkakp("");
    setNik("");
    setAlamat("");
    setProvinsi("");
    setCities("");
    setAsalInstansi("");
    setNomorTelpon("");
    setEmail("");
    setJabatan("");
    setGolongan("");
    setTipeKeahlian("");
    setFoto(null);
    setPengalamanBerlayar("");
    setIjazah(null);
    setSertifikatKeahlian(null);
    setSertifikatTot(null);
    setSertifikatToe(null);
    setSertifikatToeSimulator(null);
    setSertifikatAuditor(null);
    setSertifikatLainnya(null);
    setBukuPelaut(null);
    setExperience("");
  };

  const handlePostFormPengujiDPKAKP = async (e: any) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };

  //   const handleLoginAdminDPKAKP = async (e: any) => {
  //     if (email == "" && password == "") {
  //       Toast.fire({
  //         icon: "error",
  //         title: `Isi terlebih dahulu email dan passwordmu!`,
  //       });
  //       return;
  //     } else if (email == "" && password != "") {
  //       Toast.fire({
  //         icon: "error",
  //         title: `Isi terlebih dahulu emailmu!`,
  //       });
  //       return;
  //     } else if (email != "" && password == "") {
  //       Toast.fire({
  //         icon: "error",
  //         title: `Isi terlebih dahulu passwordmu!`,
  //       });
  //       return;
  //     } else {
  //       try {
  //         const response = await axios.post(
  //           `${process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL}/adminPusat/login`,
  //           {
  //             email: email,
  //             password: password,
  //           }
  //         );
  //         if (response.status == 200) {
  //           Toast.fire({
  //             icon: "success",
  //             title: `Berhasil login, silahkan menggunakan layanan admin DPKAKP!`,
  //           });

  //           Cookies.set("XSRF095", response?.data?.t);
  //           router.replace("/dpkakp/admin/dashboard");
  //         } else {
  //           Toast.fire({
  //             icon: "error",
  //             title: response.statusText,
  //           });
  //         }
  //       } catch (e) {
  //         if (e instanceof AxiosError) {
  //           if (e.response?.status == 401) {
  //             Toast.fire({
  //               icon: "error",
  //               title: `Unauthorized, ${e.response?.data.pesan}!`,
  //             });
  //           } else {
  //             Toast.fire({
  //               icon: "error",
  //               title: `${e.response?.data.pesan}!`,
  //             });
  //           }
  //         } else {
  //           Toast.fire({
  //             icon: "error",
  //             title: `${e}!`,
  //           });
  //         }
  //       }
  //     }
  //   };

  return (
    <main className="bg-darkDPKAKP w-full h-full flex items-center justify-center relative">
      <Image
        className="absolute w-[300px] opacity-10 z-10"
        src={"/dpkakp/logo.png"}
        width={0}
        height={0}
        alt="DPKAKP Logo"
      />
      <section className="relative h-fit space-y-6 pb-8 pt-16 md:h-screen md:pb-12 md:pt-20 lg:py-44 w-full flex items-center justify-center flex-col px-10">
        <div className="container relative flex max-w-[64rem] flex-col items-center gap-2 text-center">
          <Link
            href={"/dpkakp"}
            className="rounded-2xl bg-mutedDPKAKP px-4 py-1.5 text-sm text-gray-200 font-medium"
            target="_blank"
          >
            DPKAKP
          </Link>
          <Image
            className=" w-[80px] my-2 z-10"
            src={"/dpkakp/logo.png"}
            width={0}
            height={0}
            alt="DPKAKP Logo"
          />
          <h1 className="font-bold text-gray-200 text-2xl leading-[100%] mt-2">
            Data Penguji Sertifikasi Keahlian Awak Kapal Perikanan
          </h1>
          <p className="font-jakarta max-w-[42rem] leading-[100%] text-mutedForegroundDPKAKP  sm:text-lg sm:leading-8">
            Dalam mengindentifikasi dan memutakhirkan data dari calon tenaga
            penguji keahlian awak kapal perikanan.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-md mx-auto z-50">
          <div className="flex flex-col gap-1 mt-8">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8 -mt-4">
              Nama User
            </p>
            <input
              type="text"
              value={namaUserDpkakp}
              onChange={(e) => setNamaUserDpkakp(e.target.value)}
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
              placeholder="Enter your name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              NIK
            </p>
            <input
              type="text"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
              placeholder="Enter your NIK"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Alamat
            </p>
            <input
              type="text"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
              placeholder="Enter your address"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Provinsi
            </p>
            <input
              type="text"
              value={provinsi}
              onChange={(e) => setProvinsi(e.target.value)}
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
              placeholder="Enter your province"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Kota/Kabupaten
            </p>
            <input
              type="text"
              value={cities}
              onChange={(e) => setCities(e.target.value)}
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
              placeholder="Enter your city"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Asal Instansi
            </p>
            <input
              type="text"
              value={asalInstansi}
              onChange={(e) => setAsalInstansi(e.target.value)}
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
              placeholder="Enter your institution"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Nomor Telepon
            </p>
            <input
              type="tel"
              value={nomorTelpon}
              onChange={(e) => setNomorTelpon(e.target.value)}
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Email
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Jabatan
            </p>
            <input
              type="text"
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
              placeholder="Enter your position"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Golongan
            </p>
            <input
              type="text"
              value={golongan}
              onChange={(e) => setGolongan(e.target.value)}
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
              placeholder="Enter your rank"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Tipe Keahlian
            </p>
            <input
              type="text"
              value={tipeKeahlian}
              onChange={(e) => setTipeKeahlian(e.target.value)}
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
              placeholder="Enter your expertise type"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Pengalaman Berlayar
            </p>
            <input
              type="text"
              value={pegalamanBerlayara}
              onChange={(e) => setPengalamanBerlayar(e.target.value)}
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
              placeholder="Enter your sailing experience"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Pengalaman
            </p>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
              placeholder="Enter your experience"
            />
          </div>

          {/* Add file inputs for each file type state */}
          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Upload Foto
            </p>
            <input
              type="file"
              onChange={(e) =>
                setFoto(e.target.files ? e.target.files[0] : null)
              }
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
            />
          </div>

          {/* Repeat the file upload fields for each document */}
          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Upload Ijazah
            </p>
            <input
              type="file"
              onChange={(e) =>
                setIjazah(e.target.files ? e.target.files[0] : null)
              }
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Upload Sertifikat Keahlian
            </p>
            <input
              type="file"
              onChange={(e) =>
                setSertifikatKeahlian(e.target.files ? e.target.files[0] : null)
              }
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Upload Sertifikat TOT
            </p>
            <input
              type="file"
              onChange={(e) =>
                setSertifikatTot(e.target.files ? e.target.files[0] : null)
              }
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Upload Sertifikat TOE
            </p>
            <input
              type="file"
              onChange={(e) =>
                setSertifikatToe(e.target.files ? e.target.files[0] : null)
              }
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Upload Sertifikat TOE Simulator
            </p>
            <input
              type="file"
              onChange={(e) =>
                setSertifikatToeSimulator(
                  e.target.files ? e.target.files[0] : null
                )
              }
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Upload Sertifikat Auditor
            </p>
            <input
              type="file"
              onChange={(e) =>
                setSertifikatAuditor(e.target.files ? e.target.files[0] : null)
              }
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Upload Sertifikat Lainnya
            </p>
            <input
              type="file"
              onChange={(e) =>
                setSertifikatLainnya(e.target.files ? e.target.files[0] : null)
              }
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-jakarta leading-[100%] text-mutedForegroundDPKAKP sm:text-sm sm:leading-8">
              Upload Buku Pelaut
            </p>
            <input
              type="file"
              onChange={(e) =>
                setBukuPelaut(e.target.files ? e.target.files[0] : null)
              }
              className="border rounded-xl text-white border-mutedDPKAKP bg-transparent w-full"
            />
          </div>

          <button
            onClick={(e) => handlePostFormPengujiDPKAKP(e)}
            className="text-white w-full bg-blue-950 rounded-xl bg-opacity-100 py-2"
          >
            Submit
          </button>
          <button
            onClick={handleClearFormPengujiDPKAKP}
            className="text-white w-full bg-gray-500 rounded-xl bg-opacity-100 py-2 mt-1 mb-7"
          >
            Clear Form
          </button>
        </div>
      </section>
    </main>
  );
}

export default FormAsesorPage;
