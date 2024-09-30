"use client";

import { BlankoKeluar } from "@/types/blanko";
import { formatDateTime } from "@/utils";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

import TableDataBlankoKeluarPublic from "../Pelatihan/TableDataBlankoKeluarPublic";
import TableDataBlankoKeterampilanPublic from "../Pelatihan/TableDataBlankoKeterampilanPublic";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Data",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#3C50E0", "#6577F3", "#026bec", "#991dce", "#25ca46", "#12e7d2"],
  labels: [
    "BSTF I",
    "BSTF II",
    "SKPI",
    "SOPI",
    "SKN",
    "SKN Teknika",
    "SKN Nautika",
    "Fishing Master",
  ],
  legend: {
    show: true,
    position: "bottom",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "55%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 480,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 300,
        },
      },
    },
  ],
};

const ChartPopoverKeterampilan: React.FC<{ data: BlankoKeluar[] }> = ({
  data,
}) => {
  const [state, setState] = useState<ChartThreeState>({
    series: [
      data
        .filter(
          (item) => item.NamaProgram === "Basic Safety Training Fisheries I"
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) => item.NamaProgram === "Basic Safety Training Fisheries II"
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) =>
            item.NamaProgram === "Sertifikat Keterampilan Penanganan Ikan"
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter((item) => item.NamaProgram === "SOPI")
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter((item) => item.NamaProgram === "Sertifikat Kecakapan Nelayan")
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) => item.NamaProgram === "Sertifikat Kecakapan Nelayan Teknika"
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) => item.NamaProgram === "Sertifikat Kecakapan Nelayan Nautika"
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter((item) => item.NamaProgram === "Fishing Master")
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
    ],
  });

  // Log state to debug
  useEffect(() => {
    console.log("Chart state:", state);
  }, [state]);

  // Function to reset the chart series
  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [65, 34, 12, 56],
    }));
  };

  const chartData = options?.labels?.map((label, index) => ({
    month: label,

    mobile: state.series[index], // series data for mobile
  }));

  // Call handleReset when needed
  // If this should be called initially, uncomment the next line
  // useEffect(() => handleReset(), []);

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-5 w-full">
      <div className="mb-3 justify-between gap-4 sm:flex w-full">
        <div>
          <h5 className="text-xl font-semibold text-black">
            Total Sertifikat Keterampilan
          </h5>
          <p className="italic text-sm">{formatDateTime()}</p>
        </div>
      </div>

      <div className="mb-2">
        {data.length != 0 ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Grafik Jenis Sertifikasi Keterampilan - AKP</CardTitle>
              <CardDescription>
                {" "}
                The unit prices used in this data were obtained from{" "}
                <span className="font-semibold">BPPP Tegal</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div id="chartThree" className="mx-auto flex justify-center">
                <ChartContainer
                  config={chartConfig}
                  className="h-[400px] w-full"
                >
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => value} // Directly use the custom label
                      interval={0} // Ensures that all ticks are displayed
                      angle={-45} // Optional: Rotates labels to prevent overlap
                      textAnchor="end" // Optional: Aligns rotated labels
                      height={80}
                      tick={{ fill: "#000" }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    {/* <ChartLegend content={<ChartLegendContent />} /> */}

                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={8}>
                      <LabelList
                        position="top"
                        offset={12}
                        className="fill-foreground text-black"
                        fontSize={12}
                        fill="#000"
                      />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total certificate issued since 27 May 2024
              </div>
            </CardFooter>
          </Card>
        ) : (
          <div className="flex w-full items-center justify-center">
            <div>
              <h5 className="text-xl font-semibold text-black">
                Belum Ada Penerbitan
              </h5>
              <p className="italic text-sm">
                Sertifikat Keterampilan Belum Diterbitkan{" "}
              </p>
            </div>
          </div>
        )}
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Total Perkiraan Penerimaan PNBP</CardTitle>
          <CardDescription>
            {" "}
            The unit prices used in this data were obtained from{" "}
            <span className="font-semibold">BPPP Tegal</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
            {[
              {
                label: "Basic Safety Training Fisheries I",
                color: "bg-primary",
                multiplier: 1157000,
              },
              {
                label: "Basic Safety Training Fisheries II",
                color: "bg-[#8FD0EF]",
                multiplier: 614000,
              },
              {
                label: "Sertifikat Keterampilan Penanganan Ikan",
                color: "bg-[#026bec]",
                multiplier: 549000,
              },
              {
                label: "SOPI",
                color: "bg-[#991dce]",
                multiplier: 669000,
              },
              {
                label: "Sertifikat Kecakapan Nelayan",
                color: "bg-[#25ca46]",
                multiplier: 763000,
              },
            ].map((item, index) => (
              <div className="w-full px-8 " key={index}>
                <div className="flex w-full items-center">
                  <span
                    className={`mr-2 block h-3 w-full max-w-3 rounded-full ${item.color}`}
                  ></span>
                  <p className="flex w-full justify-between text-sm font-medium text-black">
                    <span>
                      {item.label} - Rp{" "}
                      {item.multiplier.toLocaleString("id-ID")}
                    </span>
                  </p>
                  <span>
                    Rp.
                    {(
                      data
                        .filter((d) => d.NamaProgram === item.label)
                        .reduce(
                          (total, d) => total + d.JumlahBlankoDisetujui,
                          0
                        ) * item.multiplier
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            ))}
            <div className="w-full px-8 sm:w-1/2">
              <div className="flex w-full items-center">
                <span
                  className={`mr-2 block h-3 w-full max-w-3 rounded-full `}
                ></span>
                <p className="flex w-full justify-between text-sm font-medium text-white"></p>
                <span></span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total certificate issued since 27 May 2024
          </div>
        </CardFooter>
      </Card>

      <Card className="flex gap-2 flex-col mt-2">
        <CardHeader>
          <CardTitle>Detail Data CoP</CardTitle>
          <CardDescription>
            {" "}
            The unit prices used in this data were obtained from{" "}
            <span className="font-semibold">BPPP Tegal</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {" "}
          <TableDataBlankoKeterampilanPublic />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartPopoverKeterampilan;
