"use client";

import Toast from "@/components/toast";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { Progress } from "@/components/ui/progress";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dpkakpBaseUrl } from "@/constants/urls";
import {
  GolonganDewanPenguji,
  JabatanDewanPenguji,
  PendidikanDewanPenguji,
} from "@/types/dpkakp";

function FormAsesorPage() {
  const router = useRouter();

  const [progress, setProgress] = React.useState(20);
  const [formPage, setFormPage] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [dataJabatan, setDataJabatan] = React.useState<JabatanDewanPenguji[]>(
    []
  );
  const [dataPendidikan, setDataPendidikan] = React.useState<
    PendidikanDewanPenguji[]
  >([]);
  const [dataGolongan, setDataGolongan] = React.useState<
    GolonganDewanPenguji[]
  >([]);
  const handlFetchingDataMaster = async () => {
    try {
      const response = await axios.get(`${dpkakpBaseUrl}/getDataMaster`);
      setDataPendidikan(response.data!.Education);
      setDataGolongan(response.data!.Golongan);
      setDataJabatan(response.data!.Jabatan);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log({ dataGolongan });
  console.log({ dataPendidikan });
  console.log({ dataJabatan });

  const [namaUserDpkakp, setNamaUserDpkakp] = React.useState<string>("");
  const [typeDpkakp, setTypeDpkakp] = React.useState<string>("");
  const [nik, setNik] = React.useState<string>("");
  const [alamat, setAlamat] = React.useState<string>("");
  const [provinsi, setProvinsi] = React.useState<string>("");
  const [cities, setCities] = React.useState<string>("");
  const [asalInstansi, setAsalInstansi] = React.useState<string>("");
  const [nomorTelpon, setNomorTelpon] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  const [namaUserDpkakpError, setNamaUserDpkakpError] =
    React.useState<boolean>(false);
  const [typeDpkakpError, setTypeDpkakpError] = React.useState<boolean>(false);
  const [nikError, setNikError] = React.useState<boolean>(false);
  const [alamatError, setAlamatError] = React.useState<boolean>(false);
  const [provinsiError, setProvinsiError] = React.useState<boolean>(false);
  const [citiesError, setCitiesError] = React.useState<boolean>(false);
  const [asalInstansiError, setAsalInstansiError] =
    React.useState<boolean>(false);
  const [nomorTelponError, setNomorTelponError] =
    React.useState<boolean>(false);
  const [emailError, setEmailError] = React.useState<boolean>(false);

  const [jabatanError, setJabatanError] = React.useState<boolean>(false);
  const [pendidikanTerakhirError, setPendidikanTerakhirError] =
    React.useState<boolean>(false);
  const [golonganError, setGolonganError] = React.useState<boolean>(false);
  const [tipeKeahlianError, setTipeKeahlianError] =
    React.useState<boolean>(false);
  const [pengalamanBerlayarError, setPengalamanBerlayarError] =
    React.useState<boolean>(false);
  const [pengalamanError, setPengalamanError] = React.useState<boolean>(false);

  const [jabatan, setJabatan] = React.useState<string>("");
  const [pendidikanTerakhir, setPendidikanTerakhir] =
    React.useState<string>("");
  const [golongan, setGolongan] = React.useState<string>("");
  const [tipeKeahlian, setTipeKeahlian] = React.useState<string>("");
  const [foto, setFoto] = React.useState<File | null>(null);
  const [pegalamanBerlayar, setPengalamanBerlayar] = React.useState<string>("");
  const [pengalaman, setPengalaman] = React.useState<string>("");

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

  const [ijazahError, setIjazahError] = React.useState<boolean>(false);
  const [sertifikatKeahlianError, setSertifikatKeahlianError] =
    React.useState<boolean>(false);
  const [sertifikatTotError, setSertifikatTotError] =
    React.useState<boolean>(false);
  const [sertifikatToeError, setSertifikatToeError] =
    React.useState<boolean>(false);
  const [sertifikatToeSimulatorError, setSertifikatToeSimulatorError] =
    React.useState<boolean>(false);
  const [sertifikatAuditorError, setSertifikatAuditorError] =
    React.useState<boolean>(false);
  const [bukuPelautError, setBukuPelautError] = React.useState<boolean>(false);

  const handleClickNext = () => {
    const isNamaUserDpkakpError = namaUserDpkakp === "";
    const isNikError = nik === "";
    const isAlamatError = alamat === "";
    const isProvinsiError = provinsi === "";
    const isCitiesError = cities === "";
    const isAsalInstansiError = asalInstansi === "";
    const isNomorTelponError = nomorTelpon === "";
    const isEmailError = email === "";

    const isJabatanError = jabatan === "";
    const isPendidikanTerakhirError = pendidikanTerakhir === "";
    const isGolonganError = golongan === "";
    const isTipeKeahlianError = tipeKeahlian === "";
    const isPengalamanBerlayarError = pegalamanBerlayar === "";
    const isPengalamanError = pengalaman === "";
    const isIjazahError = ijazah === null;
    const isSertifikatKeahlianError = sertifikatKeahlian === null;
    const isSertifikatTotError = sertifikatTot === null;
    const isSertifikatToeError = sertifikatToe === null;
    const isSertifikatToeSimulatorError = sertifikatToeSimulator === null;
    const isSertifikatAuditorError = sertifikatAuditor === null;
    const isBukuPelautError = bukuPelaut === null;

    if (currentPage == 1) {
      if (
        isNamaUserDpkakpError ||
        isNikError ||
        isAlamatError ||
        isProvinsiError ||
        isCitiesError ||
        isAsalInstansiError ||
        isNomorTelponError ||
        isEmailError
      ) {
        setNamaUserDpkakpError(isNamaUserDpkakpError);
        setNikError(isNikError);
        setAlamatError(isAlamatError);
        setProvinsiError(isProvinsiError);
        setCitiesError(isCitiesError);
        setAsalInstansiError(isAsalInstansiError);
        setNomorTelponError(isNomorTelponError);
        setEmailError(isEmailError);

        window.scrollTo(0, 0);
      } else {
        setCurrentPage((prevPage) => prevPage + 1);

        if (currentPage === 1) {
          setNamaUserDpkakpError(false);
          setNikError(false);
          setAlamatError(false);
          setProvinsiError(false);
          setCitiesError(false);
          setAsalInstansiError(false);
          setNomorTelponError(false);
          setEmailError(false);
        }

        window.scrollTo(0, 0);
      }
    } else if (currentPage == 2) {
      if (
        isJabatanError ||
        isGolonganError ||
        isTipeKeahlianError ||
        isPengalamanBerlayarError ||
        isPengalamanError ||
        isPendidikanTerakhirError
      ) {
        setJabatanError(isJabatanError);
        setGolonganError(isGolonganError);
        setTipeKeahlianError(isTipeKeahlianError);
        setPengalamanBerlayarError(isPengalamanBerlayarError);
        setPengalamanError(isPengalamanError);
        setPendidikanTerakhirError(isPendidikanTerakhirError);

        window.scrollTo(0, 0);
      } else {
        setCurrentPage((prevPage) => prevPage + 1);

        setJabatanError(false);
        setPendidikanTerakhirError(false);
        setGolonganError(false);
        setTipeKeahlianError(false);
        setPengalamanBerlayarError(false);
        setPengalamanError(false);

        window.scrollTo(0, 0);
      }
    } else if (currentPage === 3) {
      if (
        isIjazahError ||
        isSertifikatKeahlianError ||
        isSertifikatTotError ||
        isSertifikatToeError ||
        isSertifikatToeSimulatorError ||
        isSertifikatAuditorError ||
        isBukuPelautError
      ) {
        setIjazahError(isIjazahError);
        setSertifikatKeahlianError(isSertifikatKeahlianError);
        setSertifikatTotError(isSertifikatTotError);
        setSertifikatToeError(isSertifikatToeError);
        setSertifikatToeSimulatorError(isSertifikatToeSimulatorError);
        setSertifikatAuditorError(isSertifikatAuditorError);
        setBukuPelautError(isBukuPelautError);

        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleSubmitForm = async () => {
    const isIjazahError = ijazah === null;
    const isSertifikatKeahlianError = sertifikatKeahlian === null;
    const isSertifikatTotError = sertifikatTot === null;
    const isSertifikatToeError = sertifikatToe === null;
    const isSertifikatToeSimulatorError = sertifikatToeSimulator === null;
    const isSertifikatAuditorError = sertifikatAuditor === null;
    const isBukuPelautError = bukuPelaut === null;

    if (currentPage === 3) {
      if (
        isIjazahError ||
        isSertifikatKeahlianError ||
        isSertifikatTotError ||
        isSertifikatToeError ||
        isSertifikatToeSimulatorError ||
        isSertifikatAuditorError ||
        isBukuPelautError
      ) {
        setIjazahError(isIjazahError);
        setSertifikatKeahlianError(isSertifikatKeahlianError);
        setSertifikatTotError(isSertifikatTotError);
        setSertifikatToeError(isSertifikatToeError);
        setSertifikatToeSimulatorError(isSertifikatToeSimulatorError);
        setSertifikatAuditorError(isSertifikatAuditorError);
        setBukuPelautError(isBukuPelautError);

        window.scrollTo(0, 0);
      } else {
        const formData = new FormData();

        // Append string data
        formData.append("NamaUsersDpkakp", namaUserDpkakp);
        formData.append("TypeDpkapk", typeDpkakp);
        formData.append("Nik", nik);
        formData.append("Alamat", alamat);
        formData.append("Provinsi", provinsi);
        formData.append("Cities", cities);
        formData.append("AsalInstansi", asalInstansi);
        formData.append("NomorTelpon", nomorTelpon);
        formData.append("Email", email);
        formData.append("Jabatan", jabatan);
        formData.append("Pendidikan", pendidikanTerakhir);
        formData.append("Golongan", golongan);
        formData.append("TipeKeahlian", tipeKeahlian);
        formData.append("PengalamanBerlayar", pegalamanBerlayar);

        // Append file data
        if (foto) formData.append("Foto", foto);
        if (ijazah) formData.append("Ijazah", ijazah);
        if (sertifikatKeahlian)
          formData.append("SertifikatKeahlian", sertifikatKeahlian);
        if (sertifikatTot) formData.append("SertifikatTot", sertifikatTot);
        if (sertifikatToe) formData.append("SertifikatToe", sertifikatToe);
        if (sertifikatToeSimulator)
          formData.append("SertifikatToeSimulator", sertifikatToeSimulator);
        if (sertifikatAuditor)
          formData.append("SertifikatAuditor", sertifikatAuditor);
        if (sertifikatLainnya)
          formData.append("SertifikatLainnya", sertifikatLainnya);
        if (bukuPelaut) formData.append("BukuPelaut", bukuPelaut);

        try {
          const response = await axios.post(
            `${dpkakpBaseUrl}/formDataDpkakp`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Form submitted successfully:", response.data);
          Toast.fire({
            icon: "success",
            title: `Sukses melakukan mengupload data diri anggota dewan penguji awak kapal perirkanan!`,
          });
          setCurrentPage(1);
          handleClearFormPengujiDPKAKP();
        } catch (error) {
          console.error("Error submitting form:", error);
          Toast.fire({
            icon: "error",
            title: `Gagal mengupload data, harap coba lagi nanti!`,
          });
        }
        window.scrollTo(0, 0);
      }
    }
  };

  console.log(currentPage);
  const handleClickPrev = () => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage - 1;
      return newPage;
    });

    setNamaUserDpkakpError(false);
    setNikError(false);
    setAlamatError(false);
    setProvinsiError(false);
    setCitiesError(false);
    setAsalInstansiError(false);
    setNomorTelponError(false);
    setEmailError(false);

    setJabatanError(false);
    setGolonganError(false);
    setTipeKeahlianError(false);
    setPengalamanBerlayarError(false);
    setPengalamanError(false);

    window.scrollTo(0, 0);
  };

  console.log(currentPage);

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

  React.useEffect(() => {
    handlFetchingDataMaster();
  }, []);

  return (
    <main className="bg-darkDPKAKP w-full h-full pb-24 flex items-center justify-center relative">
      <Image
        className="absolute w-[300px] opacity-10 z-10"
        src={"/dpkakp/logo.png"}
        width={0}
        height={0}
        alt="DPKAKP Logo"
      />
      <section className="relative h-full space-y-6 pb-8 pt-16 md:h-full md:pb-12 md:pt-14 lg:py-44 w-full flex items-center justify-center flex-col px-10">
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
          <h1 className="font-bold text-gray-200 text-2xl md:text-4xl md:max-w-md leading-[100%] mt-2">
            Data Penguji Sertifikasi Keahlian Awak Kapal Perikanan
          </h1>
          {/* <p className="font-jakarta max-w-[42rem] leading-[100%] text-gray-400  sm:text-lg sm:leading-8">
            Dalam mengindentifikasi dan memutakhirkan data dari calon tenaga
            penguji keahlian awak kapal perikanan.
          </p> */}
        </div>
        <div className="w-full md:max-w-md flex flex-col gap-1">
          <Progress value={progress} className="w-full" />
          <div className="flex w-full items-center justify-between">
            <p className="text-white text-sm">
              {currentPage == 1
                ? "Data Diri"
                : currentPage == 2
                ? "Data Pekerjaan"
                : "Data Sertifikasi "}
            </p>
            <p className="text-white text-sm">{currentPage}/3</p>
          </div>
        </div>
        <div
          className={`${
            currentPage == 2 && "h-screen"
          } flex flex-col gap-3 w-full h-full  max-w-md mx-auto z-50`}
        >
          {currentPage == 1 && (
            <>
              <div className="flex flex-col gap-1 mt-8">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8 -mt-4">
                  Nama User
                </p>
                <input
                  type="text"
                  value={namaUserDpkakp}
                  onChange={(e) => setNamaUserDpkakp(e.target.value)}
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                  placeholder="Enter your name"
                />
                {namaUserDpkakpError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    Nama lengkap beserta gelar belum diisi
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  NIK
                </p>
                <input
                  type="text"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                  placeholder="Enter your NIK"
                />
                {nikError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    NIK kamu belum diisi
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Alamat
                </p>
                <input
                  type="text"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                  placeholder="Enter your address"
                />
                {alamatError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    Alamat lengkap-mu belum diisi
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Provinsi
                </p>
                <input
                  type="text"
                  value={provinsi}
                  onChange={(e) => setProvinsi(e.target.value)}
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                  placeholder="Enter your province"
                />
                {provinsiError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    Pilih provinsi terlebih dahulu
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Kota/Kabupaten
                </p>
                <input
                  type="text"
                  value={cities}
                  onChange={(e) => setCities(e.target.value)}
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                  placeholder="Enter your city"
                />
                {citiesError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    Pilih kabupaten atau kota-mu
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Asal Instansi
                </p>
                <input
                  type="text"
                  value={asalInstansi}
                  onChange={(e) => setAsalInstansi(e.target.value)}
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                  placeholder="Enter your institution"
                />

                {asalInstansiError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    Asal instansi belum diisi
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Nomor Telepon
                </p>
                <input
                  type="tel"
                  value={nomorTelpon}
                  onChange={(e) => setNomorTelpon(e.target.value)}
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                  placeholder="Enter your phone number"
                />

                {nomorTelponError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    No telepon mu belum diisi
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Email
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                  placeholder="Enter your email"
                />
                {emailError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    Alamat email-mu belum diisi
                  </p>
                )}
              </div>
            </>
          )}

          {currentPage == 2 && (
            <>
              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Pendidikan Terakhir
                </p>
                <select
                  value={pendidikanTerakhir}
                  onChange={(e) => setPendidikanTerakhir(e.target.value)}
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                  required
                >
                  <option value="" disabled>
                    Pilih Pendidikan Terakhir
                  </option>
                  {dataPendidikan.map((pendidikan, index) => (
                    <option className="text-black" value={pendidikan.Name}>
                      {pendidikan.Name +
                        " - " +
                        pendidikan.Description +
                        " - " +
                        pendidikan.Simpeg}
                    </option>
                  ))}
                </select>
                {pendidikanTerakhirError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    pendidikan terakhir-mu belum diisi
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Jabatan
                </p>
                <select
                  value={jabatan}
                  onChange={(e) => setJabatan(e.target.value)}
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                  required
                >
                  <option value="" disabled>
                    Pilih Jabatan
                  </option>
                  {dataJabatan.map((jabatan, index) => (
                    <option className="text-black" value={jabatan.Name}>
                      {jabatan.Name +
                        " - " +
                        jabatan.Jenjang +
                        " - " +
                        jabatan.Urutan}
                    </option>
                  ))}
                </select>
                {jabatanError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    jabatan-mu belum diisi
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Golongan
                </p>

                <select
                  value={golongan}
                  onChange={(e) => setGolongan(e.target.value)}
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                  required
                >
                  <option value="" disabled>
                    Pilih Golongan
                  </option>
                  {dataGolongan.map((golongan, index) => (
                    <option className="text-black" value={golongan.Name}>
                      {golongan.Name +
                        " - " +
                        golongan.Description +
                        " - " +
                        golongan.Simpeg}
                    </option>
                  ))}
                </select>
                {golonganError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    golongan-mu belum diisi
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Tipe Keahlian
                </p>
                <select
                  value={tipeKeahlian}
                  onChange={(e) => setTipeKeahlian(e.target.value)}
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                  required
                >
                  <option value="" disabled>
                    Select your expertise type
                  </option>
                  <option
                    className="text-black"
                    value="Ahli Nautika Penangkap Ikan"
                  >
                    Ahli Nautika Penangkap Ikan
                  </option>
                  <option
                    className="text-black"
                    value="Ahli Teknika Penangkap Ikan"
                  >
                    Ahli Teknika Penangkap Ikan
                  </option>
                </select>

                {tipeKeahlianError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    tipe keahlian-mu belum diisi
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Pengalaman Berlayar
                </p>
                <input
                  type="text"
                  value={pegalamanBerlayar}
                  onChange={(e) => setPengalamanBerlayar(e.target.value)}
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                  placeholder="Enter your sailing experience"
                />
                {pengalamanBerlayarError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    Pengalaman berlayar belum diisi
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Pengalaman
                </p>
                <input
                  type="text"
                  value={pengalaman}
                  onChange={(e) => setPengalaman(e.target.value)}
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                  placeholder="Enter your experience"
                />
                {pengalamanError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    pengalaman belum diisi
                  </p>
                )}
              </div>
            </>
          )}

          {currentPage == 3 && (
            <>
              {/* Add file inputs for each file type state */}
              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Upload Foto
                </p>
                <input
                  type="file"
                  onChange={(e) =>
                    setFoto(e.target.files ? e.target.files[0] : null)
                  }
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                />
              </div>

              {/* Repeat the file upload fields for each document */}
              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Upload Ijazah
                </p>
                <input
                  type="file"
                  onChange={(e) =>
                    setIjazah(e.target.files ? e.target.files[0] : null)
                  }
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                />
                {ijazahError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    Upload ijazah mu terlebih dahulu
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Upload Sertifikat Keahlian
                </p>
                <input
                  type="file"
                  onChange={(e) =>
                    setSertifikatKeahlian(
                      e.target.files ? e.target.files[0] : null
                    )
                  }
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                />
                {sertifikatKeahlianError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    Upload sertififkat keahlian terlebih dahulu
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Upload Sertifikat TOT 6.09
                </p>
                <input
                  type="file"
                  onChange={(e) =>
                    setSertifikatTot(e.target.files ? e.target.files[0] : null)
                  }
                  className="border rounded-xl  text-white border-gray-500 bg-transparent w-full"
                />
                {sertifikatTotError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    Upload sertifikat TOT 6.09-mu
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Upload Sertifikat TOE 3.12
                </p>
                <input
                  type="file"
                  onChange={(e) =>
                    setSertifikatToe(e.target.files ? e.target.files[0] : null)
                  }
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                />
                {sertifikatToeError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    Upload sertifikat TOE 3.12-mu
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Upload Sertifikat TOE Simulator 6.10
                </p>
                <input
                  type="file"
                  onChange={(e) =>
                    setSertifikatToeSimulator(
                      e.target.files ? e.target.files[0] : null
                    )
                  }
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                />
                {sertifikatToeSimulatorError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    Upload sertifikat TOE Simulator 6.10 mu
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Upload Sertifikat Auditor
                </p>
                <input
                  type="file"
                  onChange={(e) =>
                    setSertifikatAuditor(
                      e.target.files ? e.target.files[0] : null
                    )
                  }
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                />
                {sertifikatAuditorError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    Upload sertifikat Auditor-mu
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Upload Sertifikat Lainnya
                </p>
                <input
                  type="file"
                  onChange={(e) =>
                    setSertifikatLainnya(
                      e.target.files ? e.target.files[0] : null
                    )
                  }
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-jakarta leading-[100%] text-gray-400 sm:text-sm sm:leading-8">
                  Upload Buku Pelaut
                </p>
                <input
                  type="file"
                  onChange={(e) =>
                    setBukuPelaut(e.target.files ? e.target.files[0] : null)
                  }
                  className="border rounded-xl text-white border-gray-500 bg-transparent w-full"
                />
                {bukuPelautError && (
                  <p className="font-jakarta leading-[100%] text-rose-600 text-xs sm:leading-8">
                    Upload buku pelaut-mu
                  </p>
                )}
              </div>
            </>
          )}

          <div className="flex w-full gap-2">
            {currentPage != 1 && (
              <button
                onClick={(e) => handleClickPrev()}
                className="text-white w-full bg-blue-950 rounded-xl bg-opacity-100 py-2"
              >
                Sebelumnya
              </button>
            )}
            {currentPage >= 1 && currentPage < 3 ? (
              <button
                onClick={(e) => handleClickNext()}
                className="text-white w-full bg-blue-950 rounded-xl bg-opacity-100 py-2"
              >
                Selanjutnya
              </button>
            ) : (
              <button
                onClick={(e) => handleSubmitForm()}
                className="text-white w-full bg-blue-950 rounded-xl bg-opacity-100 py-2"
              >
                Kirim
              </button>
            )}
          </div>

          {/* <button
            onClick={handleClearFormPengujiDPKAKP}
            className="text-white w-full bg-gray-500 rounded-xl bg-opacity-100 py-2 mt-1 mb-7"
          >
            Clear Form
          </button> */}
        </div>
      </section>
    </main>
  );
}

export default FormAsesorPage;
