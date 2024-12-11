"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BlankoKeluar } from "@/types/blanko";
import { formatDateTime } from "@/utils";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

import CountUp from "react-countup";

import TableDataBlankoKeluarPublic from "../Pelatihan/TableDataBlankoKeluarPublic";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  XAxis,
  Pie,
  PieChart,
  Label,
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
import TableDataBlankoKeluar from "../Pelatihan/TableDataBlankoKeluar";
import { usePathname } from "next/navigation";
import TableDataSertifikatKeterampilan from "../Pelatihan/TableDataSertifikatKeterampilan";
import ChartPopoverKeterampilanAPBN from "./ChartPopoverKeterampilanAPBN";
import { BALAI_PELATIHAN } from "@/constants/pelatihan";
export const description = "A bar chart with an active bar";

const chartConfig = {
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
    color: "#F0F3FF",
  },
  other: {
    label: "SOPI",
    color: "#E0366F",
  },
  other2: {
    label: "Fisihing Master",
    color: "#60432F",
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
    color: "#F0F3FF",
  },
  other: {
    label: "SOPI",
    color: "#E0366F",
  },
  other2: {
    label: "Fisihing Master",
    color: "#60432F",
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
    color: "#F0F3FF",
  },
  other: {
    label: "BPPP Ambon",
    color: "#10375C",
  },

  other2: {
    label: "Politeknik AUP Jakarta",
    color: "#1E0342",
  },
  other3: {
    label: "LMTC",
    color: "#EB8317",
  },
} satisfies ChartConfig;

interface ChartThreeState {
  series: number[];
}

const ChartPopoverKeterampilan: React.FC<{ data: BlankoKeluar[] }> = ({
  data,
}) => {
  const [selectedLemdiklat, setSelectedLemdiklat] =
    React.useState<string>("BPPP Tegal");

  const [state, setState] = useState<ChartThreeState>({
    series: [],
  });

  const [statePNBP, setStatePNBP] = useState<ChartThreeState>({
    series: [],
  });

  React.useEffect(() => {
    const updatedSeries = [
      data
        .filter(
          (item) =>
            item.NamaProgram === "Basic Safety Training Fisheries I" &&
            item.AsalPendapatan == "APBN" &&
            item.NamaPelaksana == selectedLemdiklat
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) =>
            item.NamaProgram === "Basic Safety Training Fisheries II" &&
            item.AsalPendapatan == "APBN" &&
            item.NamaPelaksana == selectedLemdiklat
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) =>
            item.NamaProgram === "Sertifikat Kecakapan Nelayan" &&
            item.AsalPendapatan == "APBN" &&
            item.NamaPelaksana == selectedLemdiklat
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) =>
            item.NamaProgram === "Sertifikat Keterampilan Penanganan Ikan" &&
            item.AsalPendapatan == "APBN" &&
            item.NamaPelaksana == selectedLemdiklat
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) =>
            item.NamaProgram === "SOPI" &&
            item.AsalPendapatan == "APBN" &&
            item.NamaPelaksana == selectedLemdiklat
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) =>
            item.NamaProgram === "Fishing Master" &&
            item.AsalPendapatan == "APBN" &&
            item.NamaPelaksana == selectedLemdiklat
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
    ];

    const updatedSeriesPNBP = [
      data
        .filter(
          (item) =>
            item.NamaProgram === "Basic Safety Training Fisheries I" &&
            item.AsalPendapatan == "PNBP" &&
            item.NamaPelaksana == selectedLemdiklat
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) =>
            item.NamaProgram === "Basic Safety Training Fisheries II" &&
            item.AsalPendapatan == "PNBP" &&
            item.NamaPelaksana == selectedLemdiklat
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) =>
            item.NamaProgram === "Sertifikat Kecakapan Nelayan" &&
            item.AsalPendapatan == "PNBP" &&
            item.NamaPelaksana == selectedLemdiklat
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) =>
            item.NamaProgram === "Sertifikat Keterampilan Penanganan Ikan" &&
            item.AsalPendapatan == "PNBP" &&
            item.NamaPelaksana == selectedLemdiklat
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) =>
            item.NamaProgram === "SOPI" &&
            item.AsalPendapatan == "PNBP" &&
            item.NamaPelaksana == selectedLemdiklat
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) =>
            item.NamaProgram === "Fishing Master" &&
            item.AsalPendapatan == "PNBP" &&
            item.NamaPelaksana == selectedLemdiklat
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
    ];

    setState({ series: updatedSeries });
    setStatePNBP({ series: updatedSeriesPNBP });
  }, [selectedLemdiklat, data]);

  const [stateLemdiklat, setStateLemdiklat] = useState<ChartThreeState>({
    series: [
      data
        .filter((item) => item.NamaPelaksana === "BPPP Tegal")
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter((item) => item.NamaPelaksana === "BPPP Medan")
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter((item) => item.NamaPelaksana === "BPPP Banyuwangi")
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter((item) => item.NamaPelaksana === "BPPP Bitung")
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter((item) => item.NamaPelaksana === "BPPP Ambon")
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter((item) => item.NamaPelaksana === "Politeknik AUP Jakarta")
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter((item) => item.NamaPelaksana === "LMTC")
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
    ],
  });

  const [stateLemdiklatBSTFI, setStateLemdiklatBSTFI] =
    useState<ChartThreeState>({
      series: [
        data
          .filter(
            (item) =>
              item.NamaPelaksana === "BPPP Tegal" &&
              item.NamaProgram === "Basic Safety Training Fisheries I"
          )
          .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
        data
          .filter(
            (item) =>
              item.NamaPelaksana === "BPPP Medan" &&
              item.NamaProgram === "Basic Safety Training Fisheries I"
          )
          .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
        data
          .filter(
            (item) =>
              item.NamaPelaksana === "BPPP Banyuwangi" &&
              item.NamaProgram === "Basic Safety Training Fisheries I"
          )
          .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
        data
          .filter(
            (item) =>
              item.NamaPelaksana === "BPPP Bitung" &&
              item.NamaProgram === "Basic Safety Training Fisheries I"
          )
          .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
        data
          .filter(
            (item) =>
              item.NamaPelaksana === "BPPP Ambon" &&
              item.NamaProgram === "Basic Safety Training Fisheries I"
          )
          .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
        data
          .filter(
            (item) =>
              item.NamaPelaksana === "Politeknik AUP Jakarta" &&
              item.NamaProgram === "Basic Safety Training Fisheries I"
          )
          .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      ],
    });

  const [stateLemdiklatBSTFII, setStateLemdiklatBSTFII] =
    useState<ChartThreeState>({
      series: [
        data
          .filter(
            (item) =>
              item.NamaPelaksana === "BPPP Tegal" &&
              item.NamaProgram === "Basic Safety Training Fisheries II"
          )
          .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
        data
          .filter(
            (item) =>
              item.NamaPelaksana === "BPPP Medan" &&
              item.NamaProgram === "Basic Safety Training Fisheries II"
          )
          .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
        data
          .filter(
            (item) =>
              item.NamaPelaksana === "BPPP Banyuwangi" &&
              item.NamaProgram === "Basic Safety Training Fisheries II"
          )
          .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
        data
          .filter(
            (item) =>
              item.NamaPelaksana === "BPPP Bitung" &&
              item.NamaProgram === "Basic Safety Training Fisheries II"
          )
          .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
        data
          .filter(
            (item) =>
              item.NamaPelaksana === "BPPP Ambon" &&
              item.NamaProgram === "Basic Safety Training Fisheries II"
          )
          .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
        data
          .filter(
            (item) =>
              item.NamaPelaksana === "Politeknik AUP Jakarta" &&
              item.NamaProgram === "Basic Safety Training Fisheries II"
          )
          .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      ],
    });

  const totalSum = [
    {
      label: "Basic Safety Training Fisheries I",
      color: "bg-primary",
      multiplier: 565000,
    },
    {
      label: "Basic Safety Training Fisheries II",
      color: "bg-[#8FD0EF]",
      multiplier: 565000,
    },
  ].reduce(
    (acc, item) => {
      const totalBlanko = data
        .filter(
          (d) => d.NamaProgram === item.label && d.NamaPelaksana != "LMTC"
        )
        .reduce((total, d) => total + d.JumlahBlankoDisetujui, 0);

      const totalAmount = totalBlanko * item.multiplier;

      acc.totalAmount += totalAmount;
      acc.totalBlanko += totalBlanko;

      return acc;
    },
    { totalAmount: 0, totalBlanko: 0 }
  );

  // Log state to debug
  useEffect(() => {
    console.log("Chart state:", state);
  }, [state]);

  const chartData = [
    {
      browser: "chrome",
      visitors: state.series[0],
      fill: "var(--color-chrome)",
    },
    {
      browser: "safari",
      visitors: state.series[1],
      fill: "var(--color-safari)",
    },
    {
      browser: "firefox",
      visitors: state.series[2],
      fill: "var(--color-firefox)",
    },
    { browser: "edge", visitors: state.series[3], fill: "var(--color-edge)" },
    { browser: "other", visitors: state.series[4], fill: "var(--color-other)" },
    {
      browser: "other2",
      visitors: state.series[5],
      fill: "var(--color-other2)",
    },
  ];

  const chartDataPNBP = [
    {
      browser: "chrome",
      visitors: statePNBP.series[0],
      fill: "var(--color-chrome)",
    },
    {
      browser: "safari",
      visitors: statePNBP.series[1],
      fill: "var(--color-safari)",
    },
    {
      browser: "firefox",
      visitors: statePNBP.series[2],
      fill: "var(--color-firefox)",
    },
    {
      browser: "edge",
      visitors: statePNBP.series[3],
      fill: "var(--color-edge)",
    },
    {
      browser: "other",
      visitors: statePNBP.series[4],
      fill: "var(--color-other)",
    },
    {
      browser: "other2",
      visitors: statePNBP.series[5],
      fill: "var(--color-other2)",
    },
  ];

  // const chartDataPNBP = [
  //   {
  //     browser: "chrome",
  //     visitors: statePNBP.series[0],
  //     fill: "var(--color-chrome)",
  //   },
  //   {
  //     browser: "safari",
  //     visitors: statePNBP.series[1],
  //     fill: "var(--color-safari)",
  //   },
  //   {
  //     browser: "firefox",
  //     visitors: statePNBP.series[2],
  //     fill: "var(--color-firefox)",
  //   },
  //   {
  //     browser: "edge",
  //     visitors: statePNBP.series[3],
  //     fill: "var(--color-edge)",
  //   },
  //   {
  //     browser: "other",
  //     visitors: statePNBP.series[4],
  //     fill: "var(--color-other)",
  //   },
  //   {
  //     browser: "other2",
  //     visitors: statePNBP.series[5],
  //     fill: "var(--color-other2)",
  //   },
  // ];

  const chartDataLemdiklat = [
    {
      browser: "chrome",
      visitors: stateLemdiklat.series[0],
      fill: "var(--color-chrome)",
    },
    {
      browser: "safari",
      visitors: stateLemdiklat.series[1],
      fill: "var(--color-safari)",
    },
    {
      browser: "firefox",
      visitors: stateLemdiklat.series[2],
      fill: "var(--color-firefox)",
    },
    {
      browser: "edge",
      visitors: stateLemdiklat.series[3],
      fill: "var(--color-edge)",
    },
    {
      browser: "other",
      visitors: stateLemdiklat.series[4],
      fill: "var(--color-other)",
    },
    {
      browser: "other2",
      visitors: stateLemdiklat.series[5],
      fill: "var(--color-other2)",
    },
    {
      browser: "other3",
      visitors: stateLemdiklat.series[6],
      fill: "var(--color-other3)",
    },
  ];

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-5 w-full">
      <div className="mb-3 justify-between gap-4 sm:flex w-full">
        <div>
          <h5 className="text-xl font-semibold text-black">
            Total Sertifikat Diklat Keterampilan
          </h5>
          <p className="italic text-sm">{formatDateTime()}</p>
        </div>
      </div>

      <Tabs defaultValue={selectedLemdiklat} className="w-full mb-3">
        <TabsList>
          {BALAI_PELATIHAN.map((balaiPelatihan, index) => (
            <TabsTrigger
              onClick={() => setSelectedLemdiklat(balaiPelatihan.Name)}
              value={balaiPelatihan!.Name}
            >
              {balaiPelatihan!.Name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedLemdiklat}>
          <div className="flex gap-2 w-full">
            <Card className="w-[50%] h-full">
              <CardHeader>
                <CardTitle>Diklat yang menggunakan APBN</CardTitle>
                <CardDescription>27 May 2024 - Now 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="browser"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) =>
                        chartConfig[value as keyof typeof chartConfig]?.label
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
                      max={20000}
                      activeIndex={2}
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

            <Card className="w-[50%] h-full">
              <CardHeader>
                <CardTitle>Diklat yang menghasilkan PNBP</CardTitle>
                <CardDescription>27 May 2024 - Now 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfigPNBP} className="">
                  <BarChart accessibilityLayer data={chartDataPNBP}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="browser"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) =>
                        chartConfigPNBP[value as keyof typeof chartConfigPNBP]
                          ?.label
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
                      activeIndex={2}
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
        </TabsContent>
      </Tabs>

      <div className="flex gap-2 flex-col mt-10">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              Total Perkiraan Penerimaan PNBP (Non SKN dan SKPI)
            </CardTitle>
            <CardDescription>
              {" "}
              The unit prices used in this data were obtained from{" "}
              <span className="font-semibold">BPPP Tegal</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8 flex flex-wrap items-center justify-center gap-y-3 mt-0 border-t border-t-gray-200">
              {[
                {
                  label: "Basic Safety Training Fisheries I",
                  color: "bg-primary",
                  multiplier: 565000,
                },
                {
                  label: "Basic Safety Training Fisheries II",
                  color: "bg-[#8FD0EF]",
                  multiplier: 565000,
                },
              ].map((item, index) => (
                <div className="w-full px-8 " key={index}>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex gap-1 w-full items-center">
                      <span
                        className={`mr-2 block h-3 w-full max-w-3 rounded-full ${item.color}`}
                      ></span>
                      <p className="flex w-full justify-between text-sm font-medium text-black">
                        <span>
                          {item.label}{" "}
                          {item.label ==
                            "Ujian Ahli Teknika Kapal Penangkap Ikan Tingkat III" ||
                          item.label ==
                            "Ujian Ahli Nautika Kapal Penangkap Ikan Tingkat III"
                            ? "SKK 60 Mil"
                            : ""}{" "}
                          - Rp {item.multiplier.toLocaleString("id-ID")}
                        </span>
                      </p>
                    </div>

                    <span className="w-full flex items-end justify-end">
                      Rp.
                      {(
                        data
                          .filter(
                            (d) =>
                              d.NamaProgram === item.label &&
                              d.NamaPelaksana !== "LMTC"
                          )
                          .reduce(
                            (total, d) => total + d.JumlahBlankoDisetujui,
                            0
                          ) * item.multiplier
                      ).toLocaleString("id-ID")}{" "}
                      <span className="font-semibold text-xs ml-3">
                        (
                        {data
                          .filter(
                            (d) =>
                              d.NamaProgram === item.label &&
                              d.NamaPelaksana !== "LMTC"
                          )
                          .reduce(
                            (total, d) => total + d.JumlahBlankoDisetujui,
                            0
                          )
                          .toLocaleString("id-ID")}
                        Sertifikat )
                      </span>
                    </span>
                  </div>
                </div>
              ))}
              <div className="w-full flex justify-end items-center px-8">
                <div className="flex gap-1 items-end">
                  <h5 className="text-3xl font-bold text-black">
                    Rp{" "}
                    <CountUp
                      start={0}
                      duration={12.75}
                      end={totalSum.totalAmount}
                    />
                  </h5>
                  <span className="font-semibold text-xs ml-3">
                    ({totalSum.totalBlanko}
                    Sertifikat )
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Showing total certificate issued since 27 May 2024
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* <div className="flex gap-2 flex-col mt-10">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              Total Perkiraan Penerimaan PNBP Per Lemdiklat (Non SKN dan SKPI)
            </CardTitle>
            <CardDescription>
              {" "}
              The unit prices used in this data were obtained from{" "}
              <span className="font-semibold">BPPP Tegal</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Nama Pelaksana
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Basic Safety Training Fisheries I
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Basic Safety Training Fisheries II
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  <tr>
                    <td className="px-6 py-4">BPPP Tegal</td>
                    <td className="px-6 py-4">
                      {data
                        .filter(
                          (item) =>
                            item.NamaPelaksana === "BPPP Tegal" &&
                            item.NamaProgram ===
                              "Basic Safety Training Fisheries I"
                        )
                        .reduce(
                          (total, item) => total + item.JumlahBlankoDisetujui,
                          0
                        )}{" "}
                      Sertifikat
                      <span className="font-bold">
                        {" "}
                        ( Rp{" "}
                        {(
                          data
                            .filter(
                              (item) =>
                                item.NamaPelaksana === "BPPP Tegal" &&
                                item.NamaProgram ===
                                  "Basic Safety Training Fisheries I"
                            )
                            .reduce(
                              (total, item) =>
                                total + item.JumlahBlankoDisetujui,
                              0
                            ) * 565000
                        ).toLocaleString("id-ID")}
                        )
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {data
                        .filter(
                          (item) =>
                            item.NamaPelaksana === "BPPP Tegal" &&
                            item.NamaProgram ===
                              "Basic Safety Training Fisheries II"
                        )
                        .reduce(
                          (total, item) => total + item.JumlahBlankoDisetujui,
                          0
                        )}{" "}
                      Sertifikat
                      <span className="font-bold">
                        {" "}
                        ( Rp{" "}
                        {(
                          data
                            .filter(
                              (item) =>
                                item.NamaPelaksana === "BPPP Tegal" &&
                                item.NamaProgram ===
                                  "Basic Safety Training Fisheries II"
                            )
                            .reduce(
                              (total, item) =>
                                total + item.JumlahBlankoDisetujui,
                              0
                            ) * 565000
                        ).toLocaleString("id-ID")}
                        )
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">BPPP Medan</td>

                    <td className="px-6 py-4">
                      {data
                        .filter(
                          (item) =>
                            item.NamaPelaksana === "BPPP Medan" &&
                            item.NamaProgram ===
                              "Basic Safety Training Fisheries I"
                        )
                        .reduce(
                          (total, item) => total + item.JumlahBlankoDisetujui,
                          0
                        )}{" "}
                      Sertifikat
                      <span className="font-bold">
                        {" "}
                        ( Rp{" "}
                        {(
                          data
                            .filter(
                              (item) =>
                                item.NamaPelaksana === "BPPP Medan" &&
                                item.NamaProgram ===
                                  "Basic Safety Training Fisheries I"
                            )
                            .reduce(
                              (total, item) =>
                                total + item.JumlahBlankoDisetujui,
                              0
                            ) * 565000
                        ).toLocaleString("id-ID")}
                        )
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {data
                        .filter(
                          (item) =>
                            item.NamaPelaksana === "BPPP Medan" &&
                            item.NamaProgram ===
                              "Basic Safety Training Fisheries II"
                        )
                        .reduce(
                          (total, item) => total + item.JumlahBlankoDisetujui,
                          0
                        )}{" "}
                      Sertifikat
                      <span className="font-bold">
                        {" "}
                        ( Rp{" "}
                        {(
                          data
                            .filter(
                              (item) =>
                                item.NamaPelaksana === "BPPP Medan" &&
                                item.NamaProgram ===
                                  "Basic Safety Training Fisheries II"
                            )
                            .reduce(
                              (total, item) =>
                                total + item.JumlahBlankoDisetujui,
                              0
                            ) * 565000
                        ).toLocaleString("id-ID")}
                        )
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">BPPP Banyuwangi</td>
                    <td className="px-6 py-4">
                      {data
                        .filter(
                          (item) =>
                            item.NamaPelaksana === "BPPP Banyuwangi" &&
                            item.NamaProgram ===
                              "Basic Safety Training Fisheries I"
                        )
                        .reduce(
                          (total, item) => total + item.JumlahBlankoDisetujui,
                          0
                        )}{" "}
                      Sertifikat
                      <span className="font-bold">
                        {" "}
                        ( Rp{" "}
                        {(
                          data
                            .filter(
                              (item) =>
                                item.NamaPelaksana === "BPPP Banyuwangi" &&
                                item.NamaProgram ===
                                  "Basic Safety Training Fisheries I"
                            )
                            .reduce(
                              (total, item) =>
                                total + item.JumlahBlankoDisetujui,
                              0
                            ) * 565000
                        ).toLocaleString("id-ID")}
                        )
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {data
                        .filter(
                          (item) =>
                            item.NamaPelaksana === "BPPP Banyuwangi" &&
                            item.NamaProgram ===
                              "Basic Safety Training Fisheries II"
                        )
                        .reduce(
                          (total, item) => total + item.JumlahBlankoDisetujui,
                          0
                        )}{" "}
                      Sertifikat
                      <span className="font-bold">
                        {" "}
                        ( Rp{" "}
                        {(
                          data
                            .filter(
                              (item) =>
                                item.NamaPelaksana === "BPPP Banyuwangi" &&
                                item.NamaProgram ===
                                  "Basic Safety Training Fisheries II"
                            )
                            .reduce(
                              (total, item) =>
                                total + item.JumlahBlankoDisetujui,
                              0
                            ) * 565000
                        ).toLocaleString("id-ID")}
                        )
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">BPPP Bitung</td>
                    <td className="px-6 py-4">
                      {data
                        .filter(
                          (item) =>
                            item.NamaPelaksana === "BPPP Bitung" &&
                            item.NamaProgram ===
                              "Basic Safety Training Fisheries I"
                        )
                        .reduce(
                          (total, item) => total + item.JumlahBlankoDisetujui,
                          0
                        )}{" "}
                      Sertifikat
                      <span className="font-bold">
                        {" "}
                        ( Rp{" "}
                        {(
                          data
                            .filter(
                              (item) =>
                                item.NamaPelaksana === "BPPP Bitung" &&
                                item.NamaProgram ===
                                  "Basic Safety Training Fisheries I"
                            )
                            .reduce(
                              (total, item) =>
                                total + item.JumlahBlankoDisetujui,
                              0
                            ) * 565000
                        ).toLocaleString("id-ID")}
                        )
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {data
                        .filter(
                          (item) =>
                            item.NamaPelaksana === "BPPP Bitung" &&
                            item.NamaProgram ===
                              "Basic Safety Training Fisheries II"
                        )
                        .reduce(
                          (total, item) => total + item.JumlahBlankoDisetujui,
                          0
                        )}{" "}
                      Sertifikat
                      <span className="font-bold">
                        {" "}
                        ( Rp{" "}
                        {(
                          data
                            .filter(
                              (item) =>
                                item.NamaPelaksana === "BPPP Bitung" &&
                                item.NamaProgram ===
                                  "Basic Safety Training Fisheries II"
                            )
                            .reduce(
                              (total, item) =>
                                total + item.JumlahBlankoDisetujui,
                              0
                            ) * 565000
                        ).toLocaleString("id-ID")}
                        )
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">BPPP Ambon</td>
                    <td className="px-6 py-4">
                      {data
                        .filter(
                          (item) =>
                            item.NamaPelaksana === "BPPP Ambon" &&
                            item.NamaProgram ===
                              "Basic Safety Training Fisheries I"
                        )
                        .reduce(
                          (total, item) => total + item.JumlahBlankoDisetujui,
                          0
                        )}{" "}
                      Sertifikat
                      <span className="font-bold">
                        {" "}
                        ( Rp{" "}
                        {(
                          data
                            .filter(
                              (item) =>
                                item.NamaPelaksana === "BPPP Ambon" &&
                                item.NamaProgram ===
                                  "Basic Safety Training Fisheries I"
                            )
                            .reduce(
                              (total, item) =>
                                total + item.JumlahBlankoDisetujui,
                              0
                            ) * 565000
                        ).toLocaleString("id-ID")}
                        )
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {data
                        .filter(
                          (item) =>
                            item.NamaPelaksana === "BPPP Ambon" &&
                            item.NamaProgram ===
                              "Basic Safety Training Fisheries II"
                        )
                        .reduce(
                          (total, item) => total + item.JumlahBlankoDisetujui,
                          0
                        )}{" "}
                      Sertifikat
                      <span className="font-bold">
                        {" "}
                        ( Rp{" "}
                        {(
                          data
                            .filter(
                              (item) =>
                                item.NamaPelaksana === "BPPP Ambon" &&
                                item.NamaProgram ===
                                  "Basic Safety Training Fisheries II"
                            )
                            .reduce(
                              (total, item) =>
                                total + item.JumlahBlankoDisetujui,
                              0
                            ) * 565000
                        ).toLocaleString("id-ID")}
                        )
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Politeknik AUP Jakarta</td>
                    <td className="px-6 py-4">
                      {data
                        .filter(
                          (item) =>
                            item.NamaPelaksana === "Politeknik AUP Jakarta" &&
                            item.NamaProgram ===
                              "Basic Safety Training Fisheries I"
                        )
                        .reduce(
                          (total, item) => total + item.JumlahBlankoDisetujui,
                          0
                        )}{" "}
                      Sertifikat
                      <span className="font-bold">
                        {" "}
                        ( Rp{" "}
                        {(
                          data
                            .filter(
                              (item) =>
                                item.NamaPelaksana ===
                                  "Politeknik AUP Jakarta" &&
                                item.NamaProgram ===
                                  "Basic Safety Training Fisheries I"
                            )
                            .reduce(
                              (total, item) =>
                                total + item.JumlahBlankoDisetujui,
                              0
                            ) * 565000
                        ).toLocaleString("id-ID")}
                        )
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {data
                        .filter(
                          (item) =>
                            item.NamaPelaksana === "Politeknik AUP Jakarta" &&
                            item.NamaProgram ===
                              "Basic Safety Training Fisheries II"
                        )
                        .reduce(
                          (total, item) => total + item.JumlahBlankoDisetujui,
                          0
                        )}{" "}
                      Sertifikat
                      <span className="font-bold">
                        {" "}
                        ( Rp{" "}
                        {(
                          data
                            .filter(
                              (item) =>
                                item.NamaPelaksana ===
                                  "Politeknik AUP Jakarta" &&
                                item.NamaProgram ===
                                  "Basic Safety Training Fisheries II"
                            )
                            .reduce(
                              (total, item) =>
                                total + item.JumlahBlankoDisetujui,
                              0
                            ) * 565000
                        ).toLocaleString("id-ID")}
                        )
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">
                      Liam Maritime Training Center (LMTC)
                    </td>
                    <td className="px-6 py-4">
                      {data
                        .filter(
                          (item) =>
                            item.NamaPelaksana === "LMTC" &&
                            item.NamaProgram ===
                              "Basic Safety Training Fisheries I"
                        )
                        .reduce(
                          (total, item) => total + item.JumlahBlankoDisetujui,
                          0
                        )}{" "}
                      Sertifikat
                    </td>
                    <td className="px-6 py-4">
                      {data
                        .filter(
                          (item) =>
                            item.NamaPelaksana === "LMTC" &&
                            item.NamaProgram ===
                              "Basic Safety Training Fisheries II"
                        )
                        .reduce(
                          (total, item) => total + item.JumlahBlankoDisetujui,
                          0
                        )}{" "}
                      Sertifikat
                    </td>
                  </tr>
                  <tr className="text-xl">
                    <td className="px-6 py-4 font-bold">TOTAL</td>
                    <td className="px-6 py-4">
                      138 Sertifikat{" "}
                      <span className="font-bold">(Rp.77.970.000)</span>
                    </td>
                    <td className="px-6 py-4">
                      1.759 Sertifikat{" "}
                      <span className="font-bold"> (Rp.993.835.000)</span>
                    </td>
                  </tr>
                  <tr className="text-xl border">
                    <td className="px-6 py-4 font-bold">GRAND TOTAL</td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4 font-bold">
                      1.897 Sertifikat (Rp 1,071,805,000)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Showing total certificate issued since 27 May 2024
            </div>
          </CardFooter>
        </Card>
      </div> */}

      <div className="flex gap-2 flex-col mt-10">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Detail Data CoP</CardTitle>
            <CardDescription>
              {" "}
              Yang telah diterbitkan pasca SE 933 Tahun 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TableDataSertifikatKeterampilan />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChartPopoverKeterampilan;
