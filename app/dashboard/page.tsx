"use client";

import { usePathname, useSearchParams } from "next/navigation";
import HeroBPPP from "@/components/hero-bppp";
import React from "react";
import { PelatihanMasyarakat } from "@/types/product";
import axios, { AxiosResponse } from "axios";
import { extractPathAfterBppp, getPenyeleggara } from "@/utils/pelatihan";
import TrainingTypeSection from "@/components/trainingTypeSection";
import BPPPServices from "@/components/bppp-services";
import BPPPTrainings from "@/components/bppp-trainings";
import { capitalize } from "@/utils/text";
import Cookies from "js-cookie";
import { User } from "@/types/user";
import UserService from "@/components/user-service";
import UserDocuments from "@/components/user-documents";
import Footer from "@/components/ui/footer";

export default function Page() {
  const token = Cookies.get("XSRF081");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [userDetail, setUserDetail] = React.useState<User | null>(null);

  const handleFetchingUserDetail = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/getUserPelatihan`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log({ response });
      setUserDetail(response.data);
    } catch (error) {
      console.error("Error posting training data:", error);
      throw error;
    }
  };

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      handleFetchingUserDetail();
    }, 1000);
  }, []);

  return (
    <>
      <HeroSection user={userDetail} />
      <Footer />
    </>
  );
}

function HeroSection({ user }: { user: User | null }) {
  return (
    <section className="relative h-fit flex flex-col items-center justify-center -mt-10">
      <div className="absolute w-full h-full bg-gray-900 bg-opacity-100"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 z-[40]">
        {/* Hero content */}
        <div className="pt-0 md:pt-40 ">
          {/* Section header */}

          <div className="text-center pb-12 md:pb-16 flex flex-col items-center justify-center z-[50]">
            <h1 className="text-4xl md:text-[2.9rem] font-extrabold leading-tighter tracking-tighter mb-3 -mt-2 text-white font-calsans">
              Dashboard <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                {user == null ? "" : user.Nama}
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-base text-gray-200 mb-8">
                Aplikasi Pelatihan serta sertifikasi KP yang dikembangkan oleh
                BPPSDMKP untuk menjaring masyarakat KP, aparatur KP, dll untuk
                meningkatkan kompetensi di bidang KP
              </p>
            </div>
          </div>
        </div>
      </div>
      <UserService user={user} />
    </section>
  );
}
