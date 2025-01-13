"use client";

import React, { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BlankoKeluar } from "@/types/blanko";
import { formatDateTime } from "@/utils";

import CountUp from "react-countup";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  Label,
  Pie,
  PieChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import TableDataSertifikatKeterampilan from "../Pelatihan/TableDataSertifikatKeterampilan";
import { PelatihanMasyarakat } from "@/types/product";
import { TrendingUp } from "lucide-react";
import TableDataPelatihanSummary from "../Pelatihan/TableDataPelatihanSummary";

export const description = "A bar chart with an active bar";

const chartConfigBidangPelatihan = {
  visitors: {
    label: "Masyarakat Dilatih",
  },
  other4: {
    label: "Budidaya",
    color: "#274754",
  },
  chrome: {
    label: "Penangkapan",
    color: "#2662D9",
  },
  safari: {
    label: "Kepelautan",
    color: "#2EB88A",
  },
  firefox: {
    label: "Pengolahan dan Pemasaran",
    color: "#e88c30",
  },
  edge: {
    label: "Mesin Perikanan",
    color: "#AF57DB",
  },
  other: {
    label: "Konservasi",
    color: "#E0366F",
  },
  other2: {
    label: "Wisata Bahari",
    color: "#60432F",
  },
  other3: {
    label: "Manajemen Perikanan",
    color: "#274754",
  },
} satisfies ChartConfig;

const chartConfigJenisPelatihan = {
  visitors: {
    label: "Masyarakat Dilatih",
  },
  chrome: {
    label: "Aspirasi",
    color: "#5335E9",
  },
  safari: {
    label: "PNBP/BLU",
    color: "#41C8ED",
  },
  firefox: {
    label: "Reguler",
    color: "#09105E",
  },
} satisfies ChartConfig;

const chartConfigProgramPelatihan = {
  visitors: {
    label: "Masyarakat Dilatih",
  },
  chrome: {
    label: "Perikanan",
    color: "#211951",
  },
  safari: {
    label: "Kelautan",
    color: "#836FFF",
  },
} satisfies ChartConfig;

const chartConfigProgramPrioritas = {
  visitors: {
    label: "Masyarakat Dilatih",
  },
  other4: {
    label: "Non Terobosan",
    color: "#274754",
  },
  chrome: {
    label: "Konservasi",
    color: "#2662D9",
  },
  safari: {
    label: "PIT",
    color: "#2EB88A",
  },
  firefox: {
    label: "Kalaju/Kalamo",
    color: "#e88c30",
  },
  edge: {
    label: "KPB",
    color: "#AF57DB",
  },
  other: {
    label: "Budidaya",
    color: "#E0366F",
  },
  other2: {
    label: "Pengawasan Pesisir",
    color: "#60432F",
  },
  other3: {
    label: "BCL",
    color: "#274754",
  },
} satisfies ChartConfig;

const chartConfigPNBP = {
  visitors: {
    label: "Sertifikat",
  },
  chrome: {
    label: "BSTF I",
    color: "#211951",
  },
  safari: {
    label: "BSTF II",
    color: "#836FFF",
  },
  firefox: {
    label: "SKN",
    color: "#15F5BA",
  },
  edge: {
    label: "SKPI",
    color: "#EB8317",
  },
  other: {
    label: "Rating Keahlian",
    color: "#10375C",
  },
  other2: {
    label: "Fisihing Master",
    color: "#1E0342",
  },
} satisfies ChartConfig;

const chartConfigLemdiklat = {
  visitors: {
    label: "Sertifikat",
  },
  chrome: {
    label: "BPPP Tegal",
    color: "#211951",
  },
  safari: {
    label: "BPPP Medan",
    color: "#836FFF",
  },
  firefox: {
    label: "BPPP Banyuwangi",
    color: "#15F5BA",
  },
  edge: {
    label: "BPPP Bitung",
    color: "#EB8317",
  },
  other: {
    label: "BPPP Ambon",
    color: "#10375C",
  },

  // other2: {
  //   label: "Politeknik AUP Jakarta",
  //   color: "#1E0342",
  // },
  // other3: {
  //   label: "LMTC",
  //   color: "#EB8317",
  // },
} satisfies ChartConfig;

const satuanPendidikanKPConfig = {
  visitors: {
    label: "Sertifikat",
  },
  chrome: {
    label: "Politeknik AUP Jakarta",
    color: "#211951",
  },
} satisfies ChartConfig;

const pelabuhanKPConfig = {
  visitors: {
    label: "Sertifikat",
  },
  bbpi: {
    label: "BBPI Semarang",
    color: "#211951",
  },
  ppsNizamZachmanJakarta: {
    label: "PPS Kepala PPS Nizam Zachman Jakarta ",
    color: "#211951",
  },
  ppsKendari: {
    label: "PPS Kendari",
    color: "#211951",
  },
  ppsCilacap: {
    label: "PPS Cilacap",
    color: "#211951",
  },
  ppsBungus: {
    label: "PPS Bungus",
    color: "#211951",
  },
  ppsBelawan: {
    label: "PPS Belawan",
    color: "#211951",
  },
  ppsBitung: {
    label: "PPS Bitung",
    color: "#211951",
  },
  ppnAmbon: {
    label: "PPN Ambon",
    color: "#211951",
  },
  ppnPelabuhanRatu: {
    label: "PPN Pelabuhan Ratu",
    color: "#211951",
  },
  ppnTernate: {
    label: "PPN Ternate",
    color: "#211951",
  },
  ppnPrigi: {
    label: "PPN Prigi",
    color: "#211951",
  },
  ppnPemangkat: {
    label: "PPN Pemangkat",
    color: "#211951",
  },
  ppnSibolga: {
    label: "PPN Sibolga",
    color: "#211951",
  },
  ppnTual: {
    label: "PPN Tual",
    color: "#211951",
  },
  ppnKejawanan: {
    label: "PPN Kejawanan",
    color: "#211951",
  },
  ppnPekalongan: {
    label: "PPN Pekalongan",
    color: "#211951",
  },
  ppnBrondong: {
    label: "PPN Brondong",
    color: "#211951",
  },
  ppnTanjungPandan: {
    label: "PPN Tanjung Pandan",
    color: "#211951",
  },
  ppnSungailiat: {
    label: "PPN Sungailiat",
    color: "#211951",
  },
  ppnPengambengan: {
    label: "PPN Pengambengan",
    color: "#211951",
  },
  ppnKarangantu: {
    label: "PPN Karangantu",
    color: "#211951",
  },
  ppnKwandang: {
    label: "PPN Kwandang",
    color: "#211951",
  },
  pppSebatik: {
    label: "PPP Sebatik",
    color: "#211951",
  },
  pppUntia: {
    label: "PPP Untia",
    color: "#211951",
  },
} satisfies ChartConfig;

interface ChartThreeState {
  series: number[];
}

const ChartDetailMasyarakatDilatih: React.FC<{
  data: PelatihanMasyarakat[];
}> = ({ data }) => {
  const [selectedLemdiklat, setSelectedLemdiklat] =
    React.useState<string>("All");

  const [state, setState] = useState<ChartThreeState>({
    series: [],
  });

  const [
    stateMasyarakatDilatihByBidangPelatihan,
    setStateMasyarakatDilatihByBidangPelatihan,
  ] = useState<ChartThreeState>({
    series: [],
  });

  const [
    stateMasyarakatDilatihByJenisPelatihan,
    setStateMasyarakatDilatihByJenisPelatihan,
  ] = useState<ChartThreeState>({
    series: [],
  });

  const [
    stateMasyarakatDilatihByProgramPelatihan,
    setStateMasyarakatDilatihByProgramPelatihan,
  ] = useState<ChartThreeState>({
    series: [],
  });

  const [
    stateMasyarakatDilatihByProgramPrioritas,
    setStateMasyarakatDilatihByProgramPrioritas,
  ] = useState<ChartThreeState>({
    series: [],
  });

  React.useEffect(() => {
    const dataMasyarakatDilatihByBidangPelatihan = [
      data
        .filter((item) => item.BidangPelatihan === "Budidaya")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter((item) => item.BidangPelatihan === "Penangkapan")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter((item) => item.BidangPelatihan === "Kepelautan")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter((item) => item.BidangPelatihan === "Pengolahan dan Pemasaran")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter((item) => item.BidangPelatihan === "Mesin Perikanan")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter((item) => item.BidangPelatihan === "Konservasi")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter((item) => item.BidangPelatihan === "Wisata Bahari")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter((item) => item.BidangPelatihan === "Manajemen Perikanan")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
    ];

    const dataMasyarakatDilatihByJenisPelatihan = [
      data
        .filter((item) => item.JenisPelatihan === "Aspirasi")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter((item) => item.JenisPelatihan === "PNBP/BLU")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter((item) => item.JenisPelatihan === "Reguler")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
    ];

    const dataMasyarakatDilatihByProgramPelatihan = [
      data
        .filter((item) => item.JenisProgram === "Perikanan")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter((item) => item.JenisProgram === "Kelautan")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
    ];

    const dataMasyarakatDilatihByProgramPrioritas = [
      data
        .filter((item) => item.DukunganProgramTerobosan === "Non Terobosan")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter((item) => item.DukunganProgramTerobosan === "Konservasi")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter((item) => item.DukunganProgramTerobosan === "PIT")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter((item) => item.DukunganProgramTerobosan === "Kalaju/Kalamo")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter((item) => item.DukunganProgramTerobosan === "KPB")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter((item) => item.DukunganProgramTerobosan === "Budidaya")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter(
          (item) => item.DukunganProgramTerobosan === "Pengawasan Pesisir"
        )
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
      data
        .filter((item) => item.DukunganProgramTerobosan === "BCL")
        .reduce((total, item) => total + item.JumlahPeserta!, 0),
    ];

    setStateMasyarakatDilatihByBidangPelatihan({
      series: dataMasyarakatDilatihByBidangPelatihan,
    });

    setStateMasyarakatDilatihByJenisPelatihan({
      series: dataMasyarakatDilatihByJenisPelatihan,
    });

    setStateMasyarakatDilatihByProgramPelatihan({
      series: dataMasyarakatDilatihByProgramPelatihan,
    });

    setStateMasyarakatDilatihByProgramPrioritas({
      series: dataMasyarakatDilatihByProgramPrioritas,
    });
  }, [selectedLemdiklat, data]);

  const chartDataMasyarakatDilatihByBidangPelatihan = [
    {
      browser: "chrome",
      visitors: stateMasyarakatDilatihByBidangPelatihan.series[1],
      fill: "var(--color-chrome)",
    },
    {
      browser: "safari",
      visitors: stateMasyarakatDilatihByBidangPelatihan.series[2],
      fill: "var(--color-safari)",
    },
    {
      browser: "firefox",
      visitors: stateMasyarakatDilatihByBidangPelatihan.series[3],
      fill: "var(--color-firefox)",
    },
    {
      browser: "edge",
      visitors: stateMasyarakatDilatihByBidangPelatihan.series[4],
      fill: "var(--color-edge)",
    },
    {
      browser: "other",
      visitors: stateMasyarakatDilatihByBidangPelatihan.series[5],
      fill: "var(--color-other)",
    },
    {
      browser: "other2",
      visitors: stateMasyarakatDilatihByBidangPelatihan.series[6],
      fill: "var(--color-other2)",
    },
    {
      browser: "other3",
      visitors: stateMasyarakatDilatihByBidangPelatihan.series[7],
      fill: "var(--color-other3)",
    },
    {
      browser: "other4",
      visitors: stateMasyarakatDilatihByBidangPelatihan.series[0],
      fill: "var(--color-other4)",
    },
  ];

  const chartDataMasyarakatDilatihByJenisPelatihan = [
    {
      browser: "chrome",
      name: "Aspirasi",
      visitors: stateMasyarakatDilatihByJenisPelatihan.series[0],
      fill: "#5335E9",
    },
    {
      browser: "safari",
      name: "PNBP/BLU",
      visitors: stateMasyarakatDilatihByJenisPelatihan.series[1],
      fill: "#41C8ED",
    },
    {
      browser: "firefox",
      name: "Reguler",
      visitors: stateMasyarakatDilatihByJenisPelatihan.series[2],
      fill: "#09105E",
    },
  ];

  const chartDataMasyarakatDilatihByProgramPelatihan = [
    {
      browser: "chrome",
      name: "Perikanan",
      visitors: stateMasyarakatDilatihByProgramPelatihan.series[0],
      fill: "#211951",
    },
    {
      browser: "safari",
      name: "Kelautan",
      visitors: stateMasyarakatDilatihByProgramPelatihan.series[1],
      fill: "#836FFF",
    },
  ];

  const chartDataMasyarakatDilatihByProgramPrioritas = [
    {
      browser: "chrome",
      name: "Konservasi",
      visitors: stateMasyarakatDilatihByProgramPrioritas.series[1],
      fill: "#2662D9",
    },
    {
      browser: "safari",
      name: "PIT",
      visitors: stateMasyarakatDilatihByProgramPrioritas.series[2],
      fill: "#2EB88A",
    },
    {
      browser: "firefox",
      name: "Kalaju/Kalamo",
      visitors: stateMasyarakatDilatihByProgramPrioritas.series[3],
      fill: "#e88c30",
    },
    {
      browser: "edge",
      name: "KPB",
      visitors: stateMasyarakatDilatihByProgramPrioritas.series[4],
      fill: "#AF57DB",
    },
    {
      browser: "other",
      name: "Budidaya",
      visitors: stateMasyarakatDilatihByProgramPrioritas.series[5],
      fill: "#E0366F",
    },
    {
      browser: "other2",
      name: "Pengawasan Pesisir",
      visitors: stateMasyarakatDilatihByProgramPrioritas.series[6],
      fill: "#60432F",
    },
    {
      browser: "other3",
      name: "BCL",
      visitors: stateMasyarakatDilatihByProgramPrioritas.series[7],
      fill: "#274754",
    },
    {
      browser: "other4",
      name: "Non Terobosan",
      visitors: stateMasyarakatDilatihByProgramPrioritas.series[0],
      fill: "#274754",
    },
  ];

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-5 w-full">
      <div className="mb-3 justify-between gap-4 sm:flex w-full">
        <div>
          <h5 className="text-xl font-semibold text-black">
            Total Masyarakat Dilatih
          </h5>
          <p className="italic text-sm">{formatDateTime()}</p>
        </div>
      </div>

      <div className="flex gap-2 w-full mb-4">
        <Card className="w-full ">
          <CardHeader>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <CardTitle>Berdasarkan Bidang Pelatihan</CardTitle>
                <CardDescription>27 May 2024 - Now 2025</CardDescription>
              </div>
              <div className="flex bg-gray-100 text-sm text-black px-3 py-2 rounded-full">
                Masyarakat Dilatih:{" "}
                {chartDataMasyarakatDilatihByBidangPelatihan
                  .reduce((sum, item) => sum + item.visitors, 0)
                  .toLocaleString("ID")}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfigBidangPelatihan}
              className="aspect-auto h-[350px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={chartDataMasyarakatDilatihByBidangPelatihan}
                height={300}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="browser"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) =>
                    chartConfigBidangPelatihan[
                      value as keyof typeof chartConfigBidangPelatihan
                    ]?.label
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="visitors"
                  strokeWidth={2}
                  radius={8}
                  maxBarSize={100} // Limit the maximum bar size
                >
                  <LabelList
                    position="inside"
                    offset={12}
                    className="fill-white text-white"
                    fontSize={12}
                    fill="#000"
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Showing total certificate issued since 27 May 2024
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="flex gap-2 w-full">
        <Card className="flex flex-col w-[33.3%]">
          <CardHeader className="items-center pb-0">
            <CardTitle>Program Pelatihan</CardTitle>
            {/* <CardDescription>Pendidikan Tinggi</CardDescription> */}
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfigProgramPelatihan}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartDataMasyarakatDilatihByProgramPelatihan}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={0}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-black text-3xl font-bold"
                            >
                              {chartDataMasyarakatDilatihByProgramPelatihan
                                .reduce((sum, item) => sum + item.visitors, 0)
                                .toLocaleString("ID")}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-gray-400"
                            >
                              Masyarakat Dilatih
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-1 text-sm items-center flex text-center">
            <div className="flex items-center gap-2 font-medium leading-none">
              Updated last minute <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
            <div className="mt-4 flex gap-2">
              {chartDataMasyarakatDilatihByProgramPelatihan.map(
                (entry: any) => (
                  <div key={entry.name} className="flex gap-2 items-center">
                    <div
                      className="w-4 h-4"
                      style={{ backgroundColor: entry.fill }}
                    ></div>
                    <span className="text-sm">{entry.name}</span>
                  </div>
                )
              )}
            </div>
          </CardFooter>
        </Card>
        <Card className="flex flex-col w-[33.3%]">
          <CardHeader className="items-center pb-0">
            <CardTitle>Jenis Pelatihan</CardTitle>
            {/* <CardDescription>Pendidikan Tinggi</CardDescription> */}
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfigJenisPelatihan}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartDataMasyarakatDilatihByJenisPelatihan}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={0}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-black text-3xl font-bold"
                            >
                              {chartDataMasyarakatDilatihByJenisPelatihan
                                .reduce((sum, item) => sum + item.visitors, 0)
                                .toLocaleString("ID")}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-gray-400"
                            >
                              Masyarakat Dilatih
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-1 text-sm items-center flex text-center">
            <div className="flex items-center gap-2 font-medium leading-none">
              Updated last minute <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>

            <div className="mt-4 flex gap-2">
              {chartDataMasyarakatDilatihByJenisPelatihan.map((entry: any) => (
                <div key={entry.name} className="flex gap-2 items-center">
                  <div
                    className="w-4 h-4"
                    style={{ backgroundColor: entry.fill }}
                  ></div>
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardFooter>
        </Card>
        <Card className="flex flex-col w-[33.3%]">
          <CardHeader className="items-center pb-0">
            <CardTitle>Mendukung Program Terobosan</CardTitle>
            {/* <CardDescription>Pendidikan Tinggi</CardDescription> */}
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfigProgramPrioritas}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartDataMasyarakatDilatihByProgramPrioritas}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={0}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-black text-3xl font-bold"
                            >
                              {chartDataMasyarakatDilatihByProgramPrioritas
                                .reduce((sum, item) => sum + item.visitors, 0)
                                .toLocaleString("ID")}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-gray-400"
                            >
                              Masyarakat Dilatih
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-1 text-sm items-center flex text-center">
            <div className="flex items-center gap-2 font-medium leading-none">
              Updated last minute <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>

            <div className="mt-4 flex gap-1 flex-wrap">
              {chartDataMasyarakatDilatihByProgramPrioritas.map(
                (entry: any) => (
                  <div key={entry.name} className="flex gap-2 items-center">
                    <div
                      className="w-4 h-4"
                      style={{ backgroundColor: entry.fill }}
                    ></div>
                    <span className="text-sm">{entry.name}</span>
                  </div>
                )
              )}
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="flex gap-2 flex-col mt-10">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Daftar Pelatihan</CardTitle>
            <CardDescription>
              {" "}
              Yang Telah Dilaksanakan atau Akan Dilaksanakan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TableDataPelatihanSummary data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChartDetailMasyarakatDilatih;
