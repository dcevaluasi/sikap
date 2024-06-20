"use client";

import Toast from "@/components/toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

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
import Image from "next/image";
import { TbFileStack, TbMapPinSearch, TbUserEdit } from "react-icons/tb";

import { Progress } from "@/components/ui/progress";
import { MdWorkOutline } from "react-icons/md";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { User } from "@/types/user";
import { Bounce } from "react-awesome-reveal";
import { HashLoader } from "react-spinners";

function FormCompleteProfile() {
  const router = useRouter();

  /* token user */
  const token = Cookies.get("XSRF081");

  /* state variable to store basic user information to register */
  const [name, setName] = React.useState<string>("");
  const [nik, setNik] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [tanggalLahir, setTanggalLahir] = React.useState<string>("");
  const [tempatLahir, setTempatLahir] = React.useState("");
  const [jenisKelamin, setJenisKelamin] = React.useState("");
  const [pekerjaan, setPekerjaan] = React.useState("");
  const [golonganDarah, setGolonganDarah] = React.useState("");
  const [statusMenikah, setStatusMenikah] = React.useState("");
  const [pendidikanTerakhir, setPendidikanTerakhir] = React.useState("");
  const [kewarganegaraan, setKewarganegaraan] = React.useState("");
  const [ibuKandung, setIbuKandung] = React.useState("");
  const [negaraTujuanBekerja, setNegaraTujuanBekerja] = React.useState("");

  const [foto, setFoto] = React.useState<any>(null);
  const [ktp, setKtp] = React.useState<any>(null);
  const [kk, setKk] = React.useState<any>(null);
  const [ijazah, setIjazah] = React.useState<any>(null);
  const [suratKesehatan, setSuratKesehatan] = React.useState<any>(null);

  const handleFotoChange = (event: any) => {
    setFoto(event.target.files[0]);
  };

  const handleKtpChange = (event: any) => {
    setKtp(event.target.files[0]);
  };

  const handleKkChange = (event: any) => {
    setKk(event.target.files[0]);
  };

  const handleIjazahChange = (event: any) => {
    setIjazah(event.target.files[0]);
  };

  const handleSuratKesehatanChange = (event: any) => {
    setSuratKesehatan(event.target.files[0]);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This smooth scrolling is optional, you can remove it if you want instant scrolling
    });
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [isLoadingCompleteProfile, setIsLoadingCompleteProfile] =
    React.useState<boolean>(false);

  const [userDetail, setUserDetail] = React.useState<User | null>(null);

  const handleFetchingUserDetail = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/users/getUsersById`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log({ response });
      setUserDetail(response.data);
      setName(response.data?.Nama);
      setNik(response.data?.Nik);
      setPhoneNumber(response.data?.NoTelpon);
    } catch (error) {
      console.error("Error posting training data:", error);
      throw error;
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      handleFetchingUserDetail();
    }, 1000);
  }, []);

  const handleCompleteProfileUser = async () => {
    setIsLoadingCompleteProfile(true);
    console.log(
      name,
      nik,
      phoneNumber,
      email,
      tanggalLahir,
      tempatLahir,
      jenisKelamin,
      pekerjaan,
      golonganDarah,
      statusMenikah,
      pendidikanTerakhir,
      kewarganegaraan,
      ibuKandung,
      negaraTujuanBekerja
    );
    console.log({ suratKesehatan });
    console.log({ foto });
    console.log({ ktp });
    console.log({ kk });
    console.log({ ijazah });

    const formData = new FormData();
    formData.append("Nama", name);
    formData.append("Nik", nik);
    formData.append("NoTelpon", phoneNumber);
    formData.append("Email", email);
    formData.append("TanggalLahir", tanggalLahir);
    formData.append("TempatLahir", tempatLahir);
    formData.append("JenisKelamin", jenisKelamin);
    formData.append("Pekerjaan", pekerjaan);
    formData.append("GolonganDarah", golonganDarah);
    formData.append("StatusMenikah", statusMenikah);
    formData.append("PendidikanTerakhir", pendidikanTerakhir);
    formData.append("Kewarganegaraan", kewarganegaraan);
    formData.append("IbuKandung", ibuKandung);
    formData.append("NegaraTujuanBekerja", negaraTujuanBekerja);
    formData.append("Fotos", foto);
    formData.append("Ktps", ktp);
    formData.append("KKs", kk);
    formData.append("Ijazahs", ijazah);
    formData.append("SuratKesehatans", suratKesehatan);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/updateUsers`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log({ response });
      Toast.fire({
        icon: "success",
        title: `Berhasil mengupdate data profile-mu!`,
      });
      setIsLoadingCompleteProfile(false);
      router.push("/dashboard");
    } catch (error) {
      console.error({ error });
      Toast.fire({
        icon: "error",
        title: `Gagal mengupdate data profile-mu!`,
      });
      setIsLoadingCompleteProfile(false);
    }
  };

  const [formTab, setFormTab] = React.useState("FormDataUtamaUser");
  const [indexFormTab, setIndexFormTab] = React.useState(0);

  const FormDataAlamatUser = () => {
    return (
      <form
        autoComplete="off"
        className={`${indexFormTab == 1 ? "block" : "hidden"}`}
      >
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Provinsi <span className="text-red-600">*</span>
            </label>
            <Select>
              <SelectTrigger className="w-full text-base py-6">
                <SelectValue placeholder="Pilih provinsi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Jakarta">DKI Jakarta</SelectItem>
                <SelectItem value="Jawa Tengah">Jawa Tengah</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Kabupaten/Kota <span className="text-red-600">*</span>
            </label>
            <Select>
              <SelectTrigger className="w-full text-base py-6">
                <SelectValue placeholder="Pilih kabupaten/kota" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Jakarta Utara">Jakarta Utara</SelectItem>
                <SelectItem value="Jakarta Timur">Jakarta Timur</SelectItem>
                <SelectItem value="Jakarta Selatan">Jakarta Selatan</SelectItem>
                <SelectItem value="Jakarta Barat">Jakarta Barat</SelectItem>
                <SelectItem value="Jakarta Pusat">Jakarta Pusat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Kecamatan <span className="text-red-600">*</span>
            </label>
            <Select>
              <SelectTrigger className="w-full text-base py-6">
                <SelectValue placeholder="Pilih kecamatan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Menteng">Menteng</SelectItem>
                <SelectItem value="Gambir">Gambir</SelectItem>
                <SelectItem value="Glodok">Glodok</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Desa <span className="text-red-600">*</span>
            </label>
            <input
              id="phone desa"
              type="text"
              name="desa"
              className="form-input w-full text-black"
              placeholder="Masukkan desa"
              required
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-wrap -mx-3 mb-1">
            <div className="w-full px-3">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="email"
              >
                RT <span className="text-red-600">*</span>
              </label>
              <input
                id="rt"
                type="text"
                name="rt"
                className="form-input w-full text-black"
                placeholder="Masukkan RT"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-1">
            <div className="w-full px-3">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="email"
              >
                RW <span className="text-red-600">*</span>
              </label>
              <input
                id="phone number"
                type="text"
                className="form-input w-full text-black"
                placeholder="Masukkan RW"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Alamat Domisili <span className="text-red-600">*</span>
            </label>
            <textarea
              id="phone number"
              rows={4}
              className="form-input w-full text-black"
              placeholder="Masukkan alamat domisili"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Kode Pos <span className="text-red-600">*</span>
            </label>
            <input
              id="phone number"
              type="text"
              className="form-input w-full text-black"
              placeholder="Masukkan Kode Pos"
              required
            />
          </div>
        </div>
      </form>
    );
  };

  const FormDataRiwayatPekerjaanUser = () => {
    return (
      <form
        autoComplete="off"
        className={`${indexFormTab == 2 ? "block" : "hidden"}`}
      >
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Nama Perusahaan Tempat Kerja/Kelompok{" "}
              <span className="text-red-600">*</span> <br />
              <span className="text-gray-500">Jika tidak ada isi (-)</span>
            </label>
            <input
              id="phone number"
              type="text"
              className="form-input w-full text-black"
              placeholder="Masukkan Nama Perusahaan/Tempat Kerja"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Lokasi Perusahaan Tempat Kerja/Kelompok{" "}
              <span className="text-red-600">*</span> <br />
              <span className="text-gray-500">Jika tidak ada isi (-)</span>
            </label>
            <input
              id="phone number"
              type="text"
              className="form-input w-full text-black"
              placeholder="Masukkan Lokasi Perusahaan/Tempat Kerja"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Jenis Usaha <span className="text-red-600">*</span>
              <br />
              <span className="text-gray-500">Jika tidak ada isi Lainnya</span>
            </label>
            <Select>
              <SelectTrigger className="w-full text-base py-6">
                <SelectValue placeholder="Pilih Jenis Usaha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Budidaya">Budidaya</SelectItem>
                <SelectItem value="Penangkapan">Penangkapan</SelectItem>
                <SelectItem value="Pengolahan">Pengolahan</SelectItem>
                <SelectItem value="Lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Kapasitas Produksi <span className="text-red-600">*</span>
              <br />
              <span className="text-gray-500">
                Isi dalam satuan KG, Jika tidak ada isi (0)
              </span>
            </label>
            <input
              id="phone number"
              type="number"
              className="form-input w-full text-black"
              placeholder="Masukkan kapasitas produksi"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Gaji <span className="text-red-600">*</span> <br />
              <span className="text-gray-500">Jika tidak ada isi (-)</span>
            </label>
            <input
              id="phone number"
              type="number"
              className="form-input w-full text-black"
              placeholder="Masukkan gaji"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Nama Kapal <span className="text-red-600">*</span> <br />
              <span className="text-gray-500">Jika tidak ada isi (-)</span>
            </label>
            <input
              id="phone number"
              type="text"
              className="form-input w-full text-black"
              placeholder="Masukkan nama kapal"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Jenis Alat Tangkap <span className="text-red-600">*</span>
              <br />
              <span className="text-gray-500">Jika tidak ada isi Lainnya</span>
            </label>
            <Select>
              <SelectTrigger className="w-full text-base py-6">
                <SelectValue placeholder="Pilih Jenis Usaha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pancing">Pancing</SelectItem>
                <SelectItem value="Jaring">Jaring</SelectItem>
                <SelectItem value="Perangkap">Perangkap</SelectItem>
                <SelectItem value="Lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    );
  };

  console.log({ indexFormTab });
  console.log({ formTab });

  return (
    <section className="relative w-full">
      <Image
        src={"/illustrations/success.jpg"}
        alt={"Form Complete Profile"}
        width={0}
        height={0}
        className="fixed -z-10 w-[450px] -bottom-10 left-10 animate-float"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:-mt-8">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-0 md:pb-0">
            <h1 className="font-bold text-4xl leading-[100%] md:text-4xl text-black font-calsans">
              Lengkapi Data Akun Pengguna E-Laut
            </h1>
            <p className="text-base text-gray-600 max-w-4x">
              Hanya isi sekali bisa digunakan untuk setiap proses pendaftaran,
              segera lengkapi data-mu!
            </p>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto mt-5">
            <div className="flex items-center justify-between">
              {indexFormTab == 0 ? (
                <h2 className="font-bold text-2xl leading-[100%] my-6 md:text-2xl text-black font-calsans flex items-center gap-1">
                  <TbUserEdit />
                  <span className="mt-2">Data Pribadi</span>
                </h2>
              ) : indexFormTab == 1 ? (
                <h2 className="font-bold text-2xl leading-[100%] my-6 md:text-2xl text-black font-calsans flex items-center gap-1">
                  <TbMapPinSearch />
                  <span className="mt-2">Alamat Domisili</span>
                </h2>
              ) : indexFormTab == 2 ? (
                <h2 className="font-bold text-2xl leading-[100%] my-6 md:text-2xl text-black font-calsans flex items-center gap-1">
                  <MdWorkOutline />
                  <span className="mt-1">Riwayat Pekerjaan</span>
                </h2>
              ) : (
                <h2 className="font-bold text-2xl leading-[100%] my-6 md:text-2xl text-black font-calsans flex items-center gap-1">
                  <TbFileStack />
                  <span className="mt-2">Berkas dan Dokumen</span>
                </h2>
              )}

              <p className="text-base">
                {indexFormTab == 0 ? (
                  <span className="font-bold  leading-[100%] my-6 text-blue-500 ">
                    1
                  </span>
                ) : indexFormTab == 1 ? (
                  <span className="font-bold  leading-[100%] my-6 text-blue-500 ">
                    2
                  </span>
                ) : indexFormTab == 2 ? (
                  <span className="font-bold  leading-[100%] my-6 text-blue-500 ">
                    3
                  </span>
                ) : (
                  <span className="font-bold  leading-[100%] my-6 text-blue-500 ">
                    4
                  </span>
                )}{" "}
                of 4
              </p>
            </div>
            <div className="flex w-full -mt-2 mb-4">
              <Progress
                value={(indexFormTab + 1) * 25}
                className="text-blue-500"
                max={4}
              />
            </div>
            <div>
              <div className={`${indexFormTab == 0 ? "block" : "hidden"}`}>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
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
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="nik"
                    >
                      NIK <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="nik"
                      type="text"
                      className="form-input w-full text-black"
                      placeholder="Masukkan NIK"
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                      required
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      No Telpon <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="phone_number"
                      type="text"
                      className="form-input w-full text-black"
                      placeholder="Masukkan no telpon"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
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
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Tanggal Lahir <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="phone number"
                      type="date"
                      className="form-input w-full text-black"
                      placeholder="Masukkan tanggal lahir"
                      required
                      value={tanggalLahir}
                      onChange={(e) => setTanggalLahir(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Tempat Lahir <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="tempat_lahir"
                      type="text"
                      className="form-input w-full text-black"
                      placeholder="Masukkan tempat lahir"
                      required
                      value={tempatLahir}
                      onChange={(e) => setTempatLahir(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Jenis Kelamin <span className="text-red-600">*</span>
                    </label>
                    <Select
                      value={jenisKelamin}
                      onValueChange={(value) => setJenisKelamin(value)}
                    >
                      <SelectTrigger className="w-full text-base py-6">
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Laki - Laki">Laki - Laki</SelectItem>
                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Pekerjaan <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="pekerjaan"
                      type="text"
                      className="form-input w-full text-black"
                      placeholder="Masukkan Pekerjaan"
                      required
                      value={pekerjaan}
                      onChange={(e) => setPekerjaan(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Golongan Darah <span className="text-red-600">*</span>
                    </label>
                    <Select
                      value={golonganDarah}
                      onValueChange={(value) => setGolonganDarah(value)}
                    >
                      <SelectTrigger className="w-full text-base py-6">
                        <SelectValue placeholder="Pilih golongan darah" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="O">O</SelectItem>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="AB">AB</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Status Menikah <span className="text-red-600">*</span>
                    </label>
                    <Select
                      value={statusMenikah}
                      onValueChange={(value) => setStatusMenikah(value)}
                    >
                      <SelectTrigger className="w-full text-base py-6">
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Belum">Belum</SelectItem>
                        <SelectItem value="Sudah">Sudah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Pendidikan Terakhir{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <Select
                      value={pendidikanTerakhir}
                      onValueChange={(value) => setPendidikanTerakhir(value)}
                    >
                      <SelectTrigger className="w-full text-base py-6">
                        <SelectValue placeholder="Pilih pendidikan terakhir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tidak/Belum Sekolah">
                          Tidak/Belum Sekolah
                        </SelectItem>
                        <SelectItem value="SD/Sederajat">
                          SD/Sederajat
                        </SelectItem>
                        <SelectItem value="SMP/Sederajat">
                          SMP/Sederajat
                        </SelectItem>
                        <SelectItem value="SMA/Sederajat">
                          SMA/Sederajat
                        </SelectItem>
                        <SelectItem value="DI/DII/DIII/Sederajat">
                          DI/DII/DIII/Sederajat
                        </SelectItem>
                        <SelectItem value="S1/DIV/Sederajat">
                          S1/DIV/Sederajat
                        </SelectItem>
                        <SelectItem value="S2/Sederajat">
                          S2/Sederajat
                        </SelectItem>
                        <SelectItem value="S3/Sederajat">
                          S3/Sederajat
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Kewarganegaraan <span className="text-red-600">*</span>
                    </label>
                    <Select
                      value={kewarganegaraan}
                      onValueChange={(value) => setKewarganegaraan(value)}
                    >
                      <SelectTrigger className="w-full text-base py-6">
                        <SelectValue placeholder="Pilih kewarganegaraan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WNI">WNI</SelectItem>
                        <SelectItem value="WNA">WNA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Ibu Kandung <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="ibu_kandung"
                      type="text"
                      className="form-input w-full text-black"
                      placeholder="Masukkan ibu kandung"
                      required
                      value={ibuKandung}
                      onChange={(e) => setIbuKandung(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Negara Tujuan Bekerja{" "}
                      <span className="text-red-600">*</span> <br />
                      <span className="text-gray-500">
                        Jika tidak ada isi (-)
                      </span>
                    </label>
                    <input
                      id="negara_tujuan"
                      type="text"
                      className="form-input w-full text-black"
                      placeholder="Masukkan negara tujuan"
                      value={negaraTujuanBekerja}
                      onChange={(e) => setNegaraTujuanBekerja(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className={`${indexFormTab == 1 ? "block" : "hidden"}`}>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Provinsi <span className="text-red-600">*</span>
                    </label>
                    <Select>
                      <SelectTrigger className="w-full text-base py-6">
                        <SelectValue placeholder="Pilih provinsi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Jakarta">DKI Jakarta</SelectItem>
                        <SelectItem value="Jawa Tengah">Jawa Tengah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Kabupaten/Kota <span className="text-red-600">*</span>
                    </label>
                    <Select>
                      <SelectTrigger className="w-full text-base py-6">
                        <SelectValue placeholder="Pilih kabupaten/kota" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Jakarta Utara">
                          Jakarta Utara
                        </SelectItem>
                        <SelectItem value="Jakarta Timur">
                          Jakarta Timur
                        </SelectItem>
                        <SelectItem value="Jakarta Selatan">
                          Jakarta Selatan
                        </SelectItem>
                        <SelectItem value="Jakarta Barat">
                          Jakarta Barat
                        </SelectItem>
                        <SelectItem value="Jakarta Pusat">
                          Jakarta Pusat
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Kecamatan <span className="text-red-600">*</span>
                    </label>
                    <Select>
                      <SelectTrigger className="w-full text-base py-6">
                        <SelectValue placeholder="Pilih kecamatan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Menteng">Menteng</SelectItem>
                        <SelectItem value="Gambir">Gambir</SelectItem>
                        <SelectItem value="Glodok">Glodok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Desa <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="phone desa"
                      type="text"
                      name="desa"
                      className="form-input w-full text-black"
                      placeholder="Masukkan desa"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-wrap -mx-3 mb-1">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        RT <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="rt"
                        type="text"
                        name="rt"
                        className="form-input w-full text-black"
                        placeholder="Masukkan RT"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-1">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        RW <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="phone number"
                        type="text"
                        className="form-input w-full text-black"
                        placeholder="Masukkan RW"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Alamat Domisili <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="phone number"
                      rows={4}
                      className="form-input w-full text-black"
                      placeholder="Masukkan alamat domisili"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Kode Pos <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="phone number"
                      type="text"
                      className="form-input w-full text-black"
                      placeholder="Masukkan Kode Pos"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={`${indexFormTab == 2 ? "block" : "hidden"}`}>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Nama Perusahaan Tempat Kerja/Kelompok{" "}
                      <span className="text-red-600">*</span> <br />
                      <span className="text-gray-500">
                        Jika tidak ada isi (-)
                      </span>
                    </label>
                    <input
                      id="phone number"
                      type="text"
                      className="form-input w-full text-black"
                      placeholder="Masukkan Nama Perusahaan/Tempat Kerja"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Lokasi Perusahaan Tempat Kerja/Kelompok{" "}
                      <span className="text-red-600">*</span> <br />
                      <span className="text-gray-500">
                        Jika tidak ada isi (-)
                      </span>
                    </label>
                    <input
                      id="phone number"
                      type="text"
                      className="form-input w-full text-black"
                      placeholder="Masukkan Lokasi Perusahaan/Tempat Kerja"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Jenis Usaha <span className="text-red-600">*</span>
                      <br />
                      <span className="text-gray-500">
                        Jika tidak ada isi Lainnya
                      </span>
                    </label>
                    <Select>
                      <SelectTrigger className="w-full text-base py-6">
                        <SelectValue placeholder="Pilih Jenis Usaha" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Budidaya">Budidaya</SelectItem>
                        <SelectItem value="Penangkapan">Penangkapan</SelectItem>
                        <SelectItem value="Pengolahan">Pengolahan</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Kapasitas Produksi <span className="text-red-600">*</span>
                      <br />
                      <span className="text-gray-500">
                        Isi dalam satuan KG, Jika tidak ada isi (0)
                      </span>
                    </label>
                    <input
                      id="phone number"
                      type="number"
                      className="form-input w-full text-black"
                      placeholder="Masukkan kapasitas produksi"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Gaji <span className="text-red-600">*</span> <br />
                      <span className="text-gray-500">
                        Jika tidak ada isi (-)
                      </span>
                    </label>
                    <input
                      id="phone number"
                      type="number"
                      className="form-input w-full text-black"
                      placeholder="Masukkan gaji"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Nama Kapal <span className="text-red-600">*</span> <br />
                      <span className="text-gray-500">
                        Jika tidak ada isi (-)
                      </span>
                    </label>
                    <input
                      id="phone number"
                      type="text"
                      className="form-input w-full text-black"
                      placeholder="Masukkan nama kapal"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Jenis Alat Tangkap <span className="text-red-600">*</span>
                      <br />
                      <span className="text-gray-500">
                        Jika tidak ada isi Lainnya
                      </span>
                    </label>
                    <Select>
                      <SelectTrigger className="w-full text-base py-6">
                        <SelectValue placeholder="Pilih Jenis Usaha" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pancing">Pancing</SelectItem>
                        <SelectItem value="Jaring">Jaring</SelectItem>
                        <SelectItem value="Perangkap">Perangkap</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className={`${indexFormTab == 3 ? "block" : "hidden"}`}>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3 ">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      File Surat Kesehatan{" "}
                      <span className="text-red-600">*</span>
                      <br />
                      <span className="text-gray-600">
                        Anda wajib mengisi dokumen ini karena mempunya surat
                        kesehatan
                      </span>
                    </label>
                    <input
                      type="file"
                      className=" text-black h-10 text-base flex items-center cursor-pointer w-full border border-neutral-200 rounded-md"
                      required
                      onChange={handleSuratKesehatanChange}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3 ">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Pas Foto <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      className=" text-black h-10 text-base flex items-center cursor-pointer w-full border border-neutral-200 rounded-md"
                      required
                      onChange={handleFotoChange}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3 ">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      File KTP <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      className=" text-black h-10 text-base flex items-center cursor-pointer w-full border border-neutral-200 rounded-md"
                      required
                      onChange={handleKtpChange}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      File Kartu Keluarga{" "}
                      <span className="text-red-600">*</span>
                    </label>

                    <input
                      type="file"
                      className=" text-black h-10 text-base flex items-center cursor-pointer w-full border border-neutral-200 rounded-md"
                      required
                      onChange={handleKkChange}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full px-3 ">
                    <label
                      className="block text-gray-800 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Ijazah <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      className=" text-black h-10 text-base flex items-center cursor-pointer w-full border border-neutral-200 rounded-md"
                      required
                      onChange={handleIjazahChange}
                    />
                  </div>
                </div>

                <div className="text-sm text-gray-800 text-left mt-3">
                  Demi alasan keamanan maka Anda wajib mengisi foto/file
                  <span className="underline text-blue-500 font-medium">
                    {" "}
                    KTP, KK, Akta, Ijazah
                  </span>{" "}
                  untuk memvalidasi kepemilikan KTP.
                </div>
              </div>
              <div className="flex -mx-3 mt-5 gap-2 px-3">
                <div className={`w-full ${indexFormTab == 0 && "hidden"}`}>
                  <button
                    type="submit"
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                    onClick={(e) => {
                      setIndexFormTab(indexFormTab - 1);
                      scrollToTop();
                    }}
                  >
                    Sebelumnya
                  </button>
                </div>
                <div
                  className={`w-full ${indexFormTab == 3 ? "hidden" : "block"}`}
                >
                  <button
                    type="submit"
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                    onClick={(e) => {
                      setIndexFormTab(indexFormTab + 1);
                      scrollToTop();
                    }}
                  >
                    Selanjutnya
                  </button>
                </div>
                {/* <AlertDialog>
                  <AlertDialogTrigger asChild> */}
                <div
                  className={`w-full ${indexFormTab == 3 ? "block" : "hidden"}`}
                >
                  <button
                    onClick={(e) => {
                      handleCompleteProfileUser();
                    }}
                    className="btn text-white flex items-center justify-center bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    {isLoadingCompleteProfile ? (
                      <HashLoader color="#FFFFFF" size={20} />
                    ) : (
                      <span>Upload</span>
                    )}
                  </button>
                </div>
                {/* </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-lg">
                    <AlertDialogHeader className="flex items-center">
                      <AlertDialogTitle className="text-2xl">
                        Apakah anda yakin?
                      </AlertDialogTitle>

                      <Image
                        className="w-[60%]"
                        src={"/illustrations/598.jpg"}
                        width={0}
                        height={0}
                        alt="Apakah anda yakin?"
                      />

                      <AlertDialogDescription className="text-base leading-[130%] -mt-10">
                        Pastikan data anda terisi dengan sesuai dan berkas yang
                        diupload valid dan bener sesuai identitas diri!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className=" py-6 text-base">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-blue-500 py-6 text-base"
                        onClick={(e) => {
                          handleCompleteProfileUser();
                        }}
                      >
                        Upload
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormCompleteProfile;
