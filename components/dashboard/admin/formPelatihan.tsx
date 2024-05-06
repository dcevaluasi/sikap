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
import React, { FormEvent, useRef } from "react";

import { BiBed } from "react-icons/bi";

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
import {
  TbFileStack,
  TbMapPinSearch,
  TbSchool,
  TbUserEdit,
} from "react-icons/tb";

import { Progress } from "@/components/ui/progress";
import { MdOutlineFastfood, MdWorkOutline } from "react-icons/md";
import { Editor } from "@tinymce/tinymce-react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { HiUserGroup } from "react-icons/hi2";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

type Checked = DropdownMenuCheckboxItemProps["checked"];

function FormPelatihan() {
  const router = useRouter();

  /* state variable to store basic user information to register */
  const [name, setName] = React.useState<string>("");
  const [nik, setNik] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This smooth scrolling is optional, you can remove it if you want instant scrolling
    });
  };

  /* function to generate data in type FormData */
  const convertDataToFormData = () => {
    const data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("password", password);

    return data;
  };

  const [isInputError, setIsInputError] = React.useState(false);

  const handleRegistrasiAkun = (e: FormEvent) => {
    if (name == "" || nik == "" || phoneNumber == "" || password == "") {
      Toast.fire({
        icon: "error",
        title: `Tolong lengkapi data registrasi!`,
      });
      setIsInputError(true);
    } else {
      Toast.fire({
        icon: "success",
        title: `Berhasil melakukan registrasi akun!`,
      });
      router.push("/dashbord/profile");
    }
  };

  const [imageIndex, setImageIndex] = React.useState(0);
  const images = ["/images/hero-img2.jpg"];

  const editorRef = useRef(null);

  const handleDummySignUp = (e: any) => {
    e.preventDefault();
    localStorage.setItem("nameDummy", name);
    localStorage.setItem("emailDummy", email);
    localStorage.setItem("passwordDummy", password);
    localStorage.setItem("isRegisteredDummy", "true");
    router.push("/users/dashboard");
  };

  React.useEffect(() => {}, []);

  const [formTab, setFormTab] = React.useState("FormDataPelatihan");
  const [indexFormTab, setIndexFormTab] = React.useState(0);

  const FormDataPelatihan = () => {
    return (
      <form
        onSubmit={(e) => handleRegistrasiAkun(e)}
        autoComplete="off"
        className={`${indexFormTab == 0 ? "block" : "hidden"}`}
      >
        <div className="flex gap-2 w-full">
          <div className="flex flex-wrap -mx-3 mb-1 w-full">
            <div className="w-full px-3">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="name"
              >
                Kode Pelatihan <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                type="text"
                className="form-input w-full text-black border-gray-300 rounded-md"
                placeholder="Masukkan kode pelatihan"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-1 w-full">
            <div className="w-full px-3">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="name"
              >
                Judul Pelatihan <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                type="text"
                className="form-input w-full text-black border-gray-300 rounded-md"
                placeholder="Masukkan judul pelatihan"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full">
          <div className="flex flex-wrap -mx-3 mb-1 w-full">
            <div className="w-full px-3">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="name"
              >
                Penyelenggara Pelatihan <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                type="text"
                className="form-input w-full text-black border-gray-300 rounded-md"
                placeholder="BPPP Tegal"
                required
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-1 w-full">
            <div className="w-full px-3">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="name"
              >
                Jenis Pelatihan <span className="text-red-600">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full text-base py-5">
                  <SelectValue placeholder="Pilih jenis pelatihan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aspirasi">Aspirasi</SelectItem>
                  <SelectItem value="PNBP/BLU">PNBP/BLU</SelectItem>
                  <SelectItem value="Reguler">Reguler</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full">
          <div className="flex flex-wrap -mx-3 mb-1 w-full">
            <div className="w-full px-3">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="name"
              >
                Lokasi Pelatihan <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                type="text"
                className="form-input w-full text-black border-gray-300 rounded-md"
                placeholder="Masukkan lokasi pelatihan"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-1 w-full">
            <div className="w-full px-3">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="email"
              >
                Pelaksanaan Pelatihan <span className="text-red-600">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full text-base py-5">
                  <SelectValue placeholder="Pilih pelaksanaan pelatihan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Offline/Klasikal">Klasikal</SelectItem>
                  <SelectItem value="Online+Offline/Blended">
                    Blended
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full">
          <div className="flex flex-wrap -mx-3 mb-1 w-full">
            <div className="w-full px-3">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="email"
              >
                Bidang Pelatihan <span className="text-red-600">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full text-base py-5">
                  <SelectValue placeholder="Pilih bidang pelatihan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Budidaya">Budidaya</SelectItem>
                  <SelectItem value="Penangkapan">Penangkapan</SelectItem>
                  <SelectItem value="Kepelautan">Kepelautan</SelectItem>
                  <SelectItem value="Pengolahan dan Pemasaran">
                    Pengolahan dan Pemasaran
                  </SelectItem>
                  <SelectItem value="Mesin Perikanan">
                    Mesin Perikanan
                  </SelectItem>
                  <SelectItem value="Konservasi">Konservasi</SelectItem>
                  <SelectItem value="Wisata Bahari">Wisata Bahari</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-1 w-full">
            <div className="w-full px-3">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="email"
              >
                Dukungan Program Prioritas{" "}
                <span className="text-red-600">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full text-base py-5">
                  <SelectValue placeholder="Pilih dukungan program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Non Terobosan">Non Terobosan</SelectItem>
                  <SelectItem value="Offline/Klasikal">Konservasi</SelectItem>
                  <SelectItem value="PIT">PIT</SelectItem>
                  <SelectItem value="Kalaju/Kalamo">Kalaju/Kalamo</SelectItem>
                  <SelectItem value="Budidaya">Budidaya</SelectItem>
                  <SelectItem value="Pengawasan Pesisir">
                    Pengawasan Pesisir
                  </SelectItem>
                  <SelectItem value="BCL">BCL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="w-full">
          <label
            className="block text-gray-800 text-sm font-medium mb-1"
            htmlFor="name"
          >
            Dengan Uji Kompetensi <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <div>
              <Checkbox />
            </div>
            <div className="space-y-1 leading-none">
              <label>Uji Kompetensi Pelatihan</label>
              <p className="text-xs text-gray-600">
                You can manage your mobile notifications in the page.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap mb-1 w-full">
          <div className="w-full">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="name"
            >
              Harga Pelatihan <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              type="number"
              className="form-input w-full text-black border-gray-300 rounded-md"
              placeholder="Rp"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="nik"
            >
              Deksripsi dan Detail Pelatihan{" "}
              <span className="text-red-600">*</span>
            </label>
            <Editor
              apiKey="k57su57nca9wkw2nfu648b5qu33298cwdclx5wwbdji2djbl"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",

                content_style:
                  "body { font-family:Plus Jakarta Sans,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>
        </div>
      </form>
    );
  };

  const FormDataAlamatUser = () => {
    return (
      <form
        onSubmit={(e) => handleRegistrasiAkun(e)}
        autoComplete="off"
        className={`${indexFormTab == 3 ? "block" : "hidden"}`}
      >
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Sediakan Fasilitas Penginapan{" "}
              <span className="text-red-600">*</span>
            </label>
            <Select>
              <SelectTrigger className="w-full text-base py-6">
                <SelectValue placeholder="Sediakan fasilitas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ya">Ya</SelectItem>
                <SelectItem value="Tidak">Tidak</SelectItem>
                <SelectItem value="Gratis">Gratis</SelectItem>
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
              Pilih Paket Fasilitas Penginapan{" "}
              <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <div>
                  <Checkbox />
                </div>
                <div className="space-y-1 leading-none">
                  <label>Paket Residance Bahari Tipe A Rp. 215.000</label>
                  <p className="text-xs text-gray-600">
                    You can manage your mobile notifications in the page.
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <div>
                  <Checkbox />
                </div>
                <div className="space-y-1 leading-none">
                  <label>Paket Residance Bahari Tipe B Rp. 110.000</label>
                  <p className="text-xs text-gray-600">
                    You can manage your mobile notifications in the page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  };

  const FormPesertaPelatihan = () => {
    return (
      <form
        onSubmit={(e) => handleRegistrasiAkun(e)}
        autoComplete="off"
        className={`${indexFormTab == 1 ? "block" : "hidden"}`}
      >
        <div className="flex gap-1 w-full">
          <div className="flex w-full flex-wrap -mx-3 mb-1">
            <div className="w-full px-3">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="email"
              >
                Asal Peserta Pelatihan <span className="text-red-600">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full text-base py-6">
                  <SelectValue placeholder="Pilih asal peserta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jawa Tengah">Masyarakat Umum</SelectItem>
                  <SelectItem value="Jakarta">
                    Karyawan/Pegawai dari
                    PT/Mitra/Kelompok/Instansi/Sekolah/Universitas
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flexw w-full flex-wrap -mx-3 mb-1">
            <div className="w-full px-3">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="email"
              >
                Kuota Peserta <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                type="number"
                className="form-input w-full text-black border-gray-300 rounded-md py-3"
                placeholder="(Orang)"
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
              Data by Name by Address Peserta Pelatihan{" "}
              <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-1">
              <Input
                id="phone number"
                type="file"
                className="w-full text-black h-10 text-base flex items-center"
                placeholder="Masukkan desa"
                required
              />
              <button
                type="submit"
                className="btn text-white bg-green-600 hover:bg-green-700 py-0 w-[250px] px-0 text-sm"
                onClick={(e) => {
                  setIndexFormTab(indexFormTab + 1);
                  scrollToTop();
                }}
              >
                <PiMicrosoftExcelLogoFill />
                Unduh Template
              </button>
            </div>
            <p className="text-gray-700 text-xs mt-1">
              *Jika asal peserta merupakan Karyawan/Pegawai dari
              PT/Mitra/Kelompok/Instansi/Sekolah/Universitas
            </p>
          </div>
        </div>
      </form>
    );
  };

  const FormDataRiwayatPekerjaanUser = () => {
    return (
      <form
        onSubmit={(e) => handleRegistrasiAkun(e)}
        autoComplete="off"
        className={`${indexFormTab == 2 ? "block" : "hidden"}`}
      >
        <div className="w-full gap-1 flex">
          <div className="flex flex-wrap -mx-3 mb-1 w-full">
            <div className="w-full px-3">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="email"
              >
                Asal Sertifikat <span className="text-red-600">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full text-base py-6">
                  <SelectValue placeholder="Pilih asal sertifikat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jawa Tengah">
                    Badan Pengembangan dan Penyuluhan Sumber Daya Manusia,
                    Kementerian Kelautan dan Perikanan
                  </SelectItem>
                  <SelectItem value="Jakarta">
                    Direktorat Jendral Perhubungan Laut, Kementerian Perhubungan
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Jenis Sertifikat <span className="text-red-600">*</span>
            </label>
            <Select>
              <SelectTrigger className="w-full text-base py-6">
                <SelectValue placeholder="Pilih jenis sertifikat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Jawa Tengah">
                  Sertifikat Pelatihan Teknis
                </SelectItem>
                <SelectItem value="Jakarta">
                  Sertifikat Pelatihan Umum
                </SelectItem>
                <SelectItem value="Jakarta">
                  Sertifikat Pelatihan Kepelautan
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
              Tanda Tangan Sertifikat <span className="text-red-600">*</span>
            </label>
            <Select>
              <SelectTrigger className="w-full text-base py-6">
                <SelectValue placeholder="Pilih tanda tangan sertifikat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kepala BPPSDM">Kepala BPPSDM</SelectItem>
                <SelectItem value="Kepala Balai">Kepala Balai</SelectItem>
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
              No Sertifikat <span className="text-red-600">*</span>
            </label>
            <input
              id="phone number"
              type="text"
              className="form-input w-full text-black border-gray-300 rounded-md"
              placeholder="B.494/BPPP.TGL/RDSM.510/I/2024/XXXPESERTA"
              required
              readOnly
            />
          </div>
        </div>
      </form>
    );
  };

  const FormPemberkasanUser = () => {
    return (
      <form
        onSubmit={(e) => handleRegistrasiAkun(e)}
        autoComplete="off"
        className={`${indexFormTab == 4 ? "block" : "hidden"}`}
      >
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Sediakan Paket Konsumsi <span className="text-red-600">*</span>
            </label>
            <Select>
              <SelectTrigger className="w-full text-base py-6">
                <SelectValue placeholder="Sediakan paket konsumsi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ya">Ya</SelectItem>
                <SelectItem value="Tidak">Tidak</SelectItem>
                <SelectItem value="Gratis">Gratis</SelectItem>
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
              Pilih Paket Konsumsi <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <div>
                  <Checkbox />
                </div>
                <div className="space-y-1 leading-none">
                  <label>
                    (Menginap) Full Pack 1x Makan & 3x Snack Rp. 110.000
                  </label>
                  <p className="text-xs text-gray-600">
                    You can manage your mobile notifications in the page.
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <div>
                  <Checkbox />
                </div>
                <div className="space-y-1 leading-none">
                  <label>
                    (Tidak Mengginap) Full Pack 1x Makan & 1x Snack Rp. 60.000
                  </label>
                  <p className="text-xs text-gray-600">
                    You can manage your mobile notifications in the page.
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <div>
                  <Checkbox />
                </div>
                <div className="space-y-1 leading-none">
                  <label>Only Snack 2x Snack Rp. 60.000</label>
                  <p className="text-xs text-gray-600">
                    You can manage your mobile notifications in the page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  };

  console.log({ indexFormTab });
  console.log({ formTab });

  return (
    <section className="relative w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:-mt-8">
        <div className="pb-12 md:pb-20">
          {/* Form */}
          <div className="mt-5">
            <div className="flex items-center justify-between">
              {indexFormTab == 0 ? (
                <div className="flex flex-col gap-1 my-4">
                  <h2 className="font-bold text-2xl leading-[100%] md:text-2xl text-black font-calsans flex items-center gap-1">
                    <TbSchool />
                    <span className="mt-2">Data Pelatihan</span>
                  </h2>
                  <p className="text-sm text-gray-600 max-w-md">
                    Lengkapi data pelatihan yang akan disimpan dalam database
                    dengan detail!
                  </p>
                </div>
              ) : indexFormTab == 1 ? (
                <h2 className="font-bold text-2xl leading-[100%] my-6 md:text-2xl text-black font-calsans flex items-center gap-1">
                  <HiUserGroup />
                  <span className="mt-2">Peserta Pelatihan</span>
                </h2>
              ) : indexFormTab == 2 ? (
                <h2 className="font-bold text-2xl leading-[100%] my-6 md:text-2xl text-black font-calsans flex items-center gap-1">
                  <TbFileStack />
                  <span className="mt-2">Sertifikat</span>
                </h2>
              ) : indexFormTab == 3 ? (
                <h2 className="font-bold text-2xl leading-[100%] my-6 md:text-2xl text-black font-calsans flex items-center gap-1">
                  <BiBed />
                  <span className="mt-1">Fasilitas Penginapan</span>
                </h2>
              ) : (
                <h2 className="font-bold text-2xl leading-[100%] my-6 md:text-2xl text-black font-calsans flex items-center gap-1">
                  <MdOutlineFastfood />
                  <span className="mt-2">Paket Konsumsi</span>
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
                ) : indexFormTab == 3 ? (
                  <span className="font-bold  leading-[100%] my-6 text-blue-500 ">
                    4
                  </span>
                ) : (
                  <span className="font-bold  leading-[100%] my-6 text-blue-500 ">
                    5
                  </span>
                )}{" "}
                of 5
              </p>
            </div>
            <div className="flex w-full -mt-2 mb-4">
              <Progress value={(indexFormTab + 1) * 20} max={100} />
            </div>
            <FormDataPelatihan />
            <FormPesertaPelatihan />
            <FormDataAlamatUser />
            <FormDataRiwayatPekerjaanUser />
            <FormPemberkasanUser />
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
                className={`w-full ${indexFormTab == 4 ? "hidden" : "block"}`}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormPelatihan;
