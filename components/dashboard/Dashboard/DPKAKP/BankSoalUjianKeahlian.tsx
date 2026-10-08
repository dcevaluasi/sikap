"use client";

import React from "react";
import { TbDatabase } from "react-icons/tb";
import TableDataBankSoalUjianKeahlian from "./TableDataBankSoalUjianKeahlian";
import { usePathname } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { dpkakpBaseUrl } from "@/constants/urls";
import {
  getIdUjianKeahlianInBankSoal,
  getIdUjianKeahlianInBankSoal2,
} from "@/components/utils/dpkakp/pathname";
import Cookies from "js-cookie";
import { Bagian, FungsiUjian, TypeUjian } from "@/types/ujian-keahlian-akp";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { replaceProgramName } from "@/utils/dpkakp";

// ─── Breadcrumb ────────────────────────────────────────────────────────────────

function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <ChevronRight className="w-3 h-3 flex-shrink-0" />}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-blue-600 transition-colors font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-700 font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// ─── Skeleton header ──────────────────────────────────────────────────────────

function SkeletonHeader() {
  return (
    <div className="animate-pulse mb-6">
      <div className="flex gap-2 mb-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 w-24 bg-gray-200 rounded" />
        ))}
      </div>
      <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="w-12 h-12 bg-gray-200 rounded-xl flex-shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-5 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-100 rounded w-full" />
        </div>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const BankSoalUjianKeahlian: React.FC = () => {
  const [data, setData] = React.useState<TypeUjian | null>(null);
  const [dataBagian, setDataBagian] = React.useState<Bagian | null>(null);
  const [dataFungsi, setDataFungsi] = React.useState<FungsiUjian | null>(null);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  const pathname = usePathname();

  const handleFetchingTypeUjian = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getTypeUjian?id=${getIdUjianKeahlianInBankSoal2(pathname!)}`,
        { headers: { Authorization: `Bearer ${Cookies.get("XSRF095")}` } }
      );
      setData(response.data.data[0]!);
    } catch (error) {
      console.error("Error fetching tipe ujian:", error);
    }
  };

  const handleFetchingBagianUjian = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getBagian?id=${getIdUjianKeahlianInBankSoal(pathname!)}`,
        { headers: { Authorization: `Bearer ${Cookies.get("XSRF095")}` } }
      );
      setDataBagian(response.data.data[0]!);
    } catch (error) {
      console.error("Error fetching bagian ujian:", error);
    }
  };

  const handleFetchingFungsiUjian = async () => {
    if (!dataBagian?.IdFungsi) return;
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getFungsi?id=${dataBagian.IdFungsi}`,
        { headers: { Authorization: `Bearer ${Cookies.get("XSRF095")}` } }
      );
      setDataFungsi(response.data.data[0]!);
    } catch (error) {
      console.error("Error fetching fungsi ujian:", error);
    } finally {
      setIsFetching(false);
    }
  };

  React.useEffect(() => {
    Promise.all([handleFetchingTypeUjian(), handleFetchingBagianUjian()]).finally(() => {
      setIsFetching(false);
    });
  }, []);

  React.useEffect(() => {
    if (dataBagian?.IdFungsi) {
      handleFetchingFungsiUjian();
    }
  }, [dataBagian]);

  // ── Color theme based on ANKAPIN / ATKAPIN ─────────────────────────────
  const isATKAPIN = data?.NamaTypeUjian?.includes("ATKAPIN");
  const accentClass = isATKAPIN
    ? "from-emerald-500 to-emerald-700"
    : "from-blue-500 to-blue-700";
  const iconBgClass = isATKAPIN ? "bg-emerald-100" : "bg-blue-100";
  const iconColorClass = isATKAPIN ? "text-emerald-600" : "text-blue-600";
  const badgeClass = isATKAPIN
    ? "bg-emerald-100 text-emerald-700"
    : "bg-blue-100 text-blue-700";

  return (
    <div className="flex flex-col gap-6">
      {isFetching ? (
        <SkeletonHeader />
      ) : (
        <>
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              {
                label: "Bank Soal",
                href: "/lembaga/dpkakp/admin/dashboard/bank-soal",
              },
              { label: data?.NamaTypeUjian ?? "" },
              { label: dataBagian?.NamaBagian ?? "" },
            ]}
          />

          {/* Page hero card */}
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Gradient top bar */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${accentClass}`} />
            <div className="flex items-start gap-4 p-5">
              <div className={`flex-shrink-0 p-3 rounded-xl ${iconBgClass}`}>
                <TbDatabase className={`w-6 h-6 ${iconColorClass}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h1 className="font-bold text-gray-900 text-base leading-snug">
                      Bank Soal{" "}
                      {[data?.NamaTypeUjian, dataFungsi?.NamaFungsi, dataBagian?.NamaBagian]
                        .filter(Boolean)
                        .join(" — ")}
                    </h1>
                    {data?.NamaTypeUjian && (
                      <p className="text-sm text-gray-400 mt-0.5">
                        {replaceProgramName(data.NamaTypeUjian)}
                      </p>
                    )}
                  </div>
                  {data?.NamaTypeUjian && (
                    <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}>
                      {data.NamaTypeUjian.includes("ANKAPIN") ? "ANKAPIN" : "ATKAPIN"}
                    </span>
                  )}
                </div>

                {/* Meta pills */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {dataFungsi?.NamaFungsi && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      Fungsi: <strong className="text-gray-700">{dataFungsi.NamaFungsi}</strong>
                    </span>
                  )}
                  {dataBagian?.NamaBagian && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      Bagian: <strong className="text-gray-700">{dataBagian.NamaBagian}</strong>
                    </span>
                  )}
                  {dataBagian?.SoalUjianBagian && (
                    <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                      Total Soal: <strong className="text-blue-700">{dataBagian.SoalUjianBagian.length}</strong>
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-400 mt-3">
                  Upload dan kelola bank soal untuk pelaksanaan Ujian Keahlian Awak Kapal Perikanan.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Table */}
      <div>
        <TableDataBankSoalUjianKeahlian />
      </div>
    </div>
  );
};

export default BankSoalUjianKeahlian;
