"use client";

import React, { useEffect, useState } from "react";
import ListProgram from "./lists";
import { PelatihanMasyarakat } from "@/types/product";
import { elautBaseUrl } from "@/constants/urls";
import { fetchPublicTrainingData } from "@/fetchs/publicTrainingData";
import Loader from "./Loader";
import Image from "next/image";

export default function FeaturesDiklatKepelautan() {
  const [data, setData] = useState<PelatihanMasyarakat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPublicTrainingData(
          `${elautBaseUrl}/lemdik/getPelatihan`
        );
        setData(result);
      } catch (error) {
        console.error("Error fetching training data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  console.log("DATA", data);
  return (
    <section className="relative h-fit pb-10" id="explore">
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none mb-16 pb-10 h-full"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-28 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          <div className="max-w-2xl mx-auto text-center pb-5 md:pb-8">
            <h1 className="text-3xl font-calsans leading-[110%]">
              Diklat & Uji Kompetensi <br />
              Kepelautan
            </h1>
            <p className="text-base text-gray-600">
              Optimalkan potensi sumber daya laut. Bergabunglah dalam pelatihan
              masyarakat kelautan dan perikanan untuk masa depan yang
              berkelanjutan dan produktif.
            </p>
          </div>
          <ListProgram pelatihan={data} type="Kepelautan" />
        </div>
      </div>
    </section>
  );
}
