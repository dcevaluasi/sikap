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
import {
  TbBox,
  TbFileStack,
  TbMapPinSearch,
  TbMoneybag,
  TbUserEdit,
} from "react-icons/tb";

import { Progress } from "@/components/ui/progress";
import { MdWorkOutline } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";

function FormRegistrationTraining() {
  const router = useRouter();

  /* state variable to store basic user information to register */
  const [name, setName] = React.useState<string>("");
  const [nik, setNik] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

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

  const handleDummySignUp = (e: any) => {
    e.preventDefault();
    localStorage.setItem("nameDummy", name);
    localStorage.setItem("emailDummy", email);
    localStorage.setItem("passwordDummy", password);
    localStorage.setItem("isRegisteredDummy", "true");
    router.push("/users/dashboard");
  };

  React.useEffect(() => {}, []);

  const [formTab, setFormTab] = React.useState("FormFasilitas");
  const [indexFormTab, setIndexFormTab] = React.useState(0);

  const [isTakeFacilityHome, setIsTakeFacilityHome] = React.useState(false);
  const [isTakeFacilityFood, setIsTakeFacilityFood] = React.useState(false);

  const FormFasilitas = () => {
    return (
      <form
        onSubmit={(e) => handleRegistrasiAkun(e)}
        autoComplete="off"
        className={`${indexFormTab == 0 ? "block" : "hidden"}`}
      >
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm md:text-lg font-medium mb-1"
              htmlFor="email"
            >
              Pilih Paket Penginapan <span className="text-red-600">*</span>
            </label>
            <div className="flex items-center space-x-2 py-3">
              <Checkbox
                id="terms"
                checked={isTakeFacilityHome}
                onClick={(e) => setIsTakeFacilityHome(!isTakeFacilityHome)}
              />
              <label
                htmlFor="terms"
                className="text-sm md:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ambil Fasilitas Penginapan
              </label>
            </div>
            {isTakeFacilityHome && (
              <Select>
                <SelectTrigger className="w-full text-base py-6">
                  <SelectValue placeholder="Pilih paket penginapan" />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectItem value="Paket BAHARI RESIDANCE-UMUM A Rp 215.000">
                    Paket BAHARI RESIDANCE-UMUM A Rp 215.000
                  </SelectItem>
                  <SelectItem value="Paket BAHARI RESIDANCE-UMUM B Rp 110.000">
                    Paket BAHARI RESIDANCE-UMUM B Rp 110.000
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm md:text-lg font-medium mb-1"
              htmlFor="email"
            >
              Pilih Paket Konsumsi <span className="text-red-600">*</span>
            </label>
            <div className="flex items-center space-x-2 py-3">
              <Checkbox
                id="terms"
                checked={isTakeFacilityFood}
                onClick={(e) => setIsTakeFacilityFood(!isTakeFacilityFood)}
              />
              <label
                htmlFor="terms"
                className="text-sm md:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ambil Paket Konsumsi
              </label>
            </div>
            {isTakeFacilityFood && (
              <Select>
                <SelectTrigger className="w-full text-base py-6">
                  <SelectValue placeholder="Pilih paket konsumsi" />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectItem
                    value="(Menginap) Tipe Paket Fullboard, Paket 3x Makan & Snack Rp.
                    300.000"
                  >
                    (Menginap) Tipe Paket Fullboard, Paket 3x Makan & Snack Rp.
                    300.000
                  </SelectItem>
                  <SelectItem
                    value="(Tidak Menginap) Tipe Paket Fullboard, Paket 1x Makan &
                    Snack Rp. 150.000"
                  >
                    (Tidak Menginap) Tipe Paket Fullboard, Paket 1x Makan &
                    Snack Rp. 150.000
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </form>
    );
  };

  const FormPembayaran = () => {
    return (
      <form
        onSubmit={(e) => handleRegistrasiAkun(e)}
        autoComplete="off"
        className={`${indexFormTab == 1 ? "block" : "hidden"}`}
      >
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Metode Pembayaran <span className="text-red-600">*</span>
            </label>
            <Select>
              <SelectTrigger className="w-full text-base py-6">
                <SelectValue placeholder="Pilih metode pembayaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bayar Dengan Transfer">
                  Bayar Dengan Transfer
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
              Rincian Harga <span className="text-red-600"></span>
            </label>
            <Select>
              <SelectTrigger className="w-full text-base py-16">
                <div className="flex flex-col items-start gap-1">
                  <p className="font-medium font-calsans text-lg text-left">
                    Pelatihan
                  </p>
                  <p className="text-left">
                    Diklat Pembesaran Udang Vaname <br />
                    Lvl. Teknisi
                  </p>
                  <p className="font-medium font-calsans">Rp. 110.000</p>
                </div>
              </SelectTrigger>
            </Select>
            <Select>
              <SelectTrigger className="w-full text-base  py-16 mt-2">
                <div className="flex flex-col items-start gap-1">
                  <p className="font-medium font-calsans text-lg text-left">
                    Penginapan
                  </p>
                  <p className="text-left">
                    Paket BAHARI RESIDANCE-UMUM <br />B Rp 110.000
                  </p>
                  <p className="font-medium font-calsans">Rp. 300.000</p>
                </div>
              </SelectTrigger>
            </Select>
            <Select>
              <SelectTrigger className="w-full text-base py-16 mt-2">
                <div className="flex flex-col items-start gap-1">
                  <p className="font-medium font-calsans text-lg text-left">
                    Konsumsi
                  </p>
                  <p className="text-left">
                    Tipe Paket Fullboard, Paket 3x
                    <br /> Makan & Snack
                  </p>
                  <p className="font-medium font-calsans">Rp. 850.000</p>
                </div>
              </SelectTrigger>
            </Select>
            <div className="h-1 w-full rounded-full my-2 bg-blue-500"></div>
            <div className="flex items-center justify-between">
              <p className="font-bold text-lg">Total</p>
              <p className="font-bold text-blue-500 text-3xl">Rp. 1.260.000</p>
            </div>
            <div className="flex items-center space-x-2 py-3 mt-5">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-base  peer-disabled:cursor-not-allowed text-gray-500 peer-disabled:opacity-70"
              >
                Dengan melakukan pendaftaran, saya setuju dengan Kebijakan{" "}
                <span className="text-blue-500 font-bold">Privasi</span> dan{" "}
                <span className="text-blue-500 font-bold">
                  Syarat & Ketentuan
                </span>{" "}
                Kementrian Kelautan dan Perikanan Republik Indonesia
              </label>
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <section className="relative w-full -mt-5">
      <div className="max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-6 md:-mt-8">
        <div className="pb-12  md:pb-20">
          {/* Form */}
          <div className="max-w-sm md:max-w-7xl mx-auto mt-5 md:mt-10">
            <div className="flex items-center justify-between">
              {indexFormTab == 0 ? (
                <h2 className="font-bold text-2xl md:text-3xl leading-[100%] my-6 text-black font-calsans flex items-center gap-1">
                  <TbBox />
                  <span className="mt-2">Pilih Fasilitas</span>
                </h2>
              ) : (
                <h2 className="font-bold text-2xl leading-[100%] my-6 md:text-2xl text-black font-calsans flex items-center gap-1">
                  <TbMoneybag />
                  <span className="mt-2">Pembayaran</span>
                </h2>
              )}

              <p className="text-base">
                {indexFormTab == 0 ? (
                  <span className="font-bold  leading-[100%] my-6 text-blue-500 ">
                    1
                  </span>
                ) : (
                  <span className="font-bold  leading-[100%] my-6 text-blue-500 ">
                    2
                  </span>
                )}{" "}
                of 2
              </p>
            </div>
            <div className="flex w-full -mt-2 mb-4">
              <Progress value={(indexFormTab + 1) * 50} max={2} />
            </div>
            <FormFasilitas />
            <FormPembayaran />
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
                className={`w-full ${indexFormTab == 1 ? "hidden" : "block"}`}
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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div
                    className={`w-full ${
                      indexFormTab == 1 ? "block" : "hidden"
                    }`}
                  >
                    <button
                      type="submit"
                      className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                    >
                      Daftar
                    </button>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-lg">
                  <AlertDialogHeader className="flex items-center">
                    <AlertDialogTitle className="text-2xl leading-8">
                      Berhasil Melakukan Registrasi
                    </AlertDialogTitle>
                    <Image
                      className="w-[40%] py-4 animate-float"
                      src={"/illustrations/approved.png"}
                      width={0}
                      height={0}
                      alt="Apakah anda yakin?"
                    />
                    <AlertDialogDescription className="text-base leading-[130%]">
                      Nantikan informasi lebih lanjut terkait pelatihan ini,
                      operator akan menghubungi anda melalui whatsapp!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={(e) => router.push("/pelatihan")}
                      className=" py-6 text-base"
                    >
                      Oke
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormRegistrationTraining;
