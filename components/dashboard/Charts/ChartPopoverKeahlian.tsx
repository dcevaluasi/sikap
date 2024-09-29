"use client";

import { BlankoKeluar } from "@/types/blanko";
import { formatDateTime } from "@/utils";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

import CountUp from "react-countup";

import TableDataBlankoKeluarPublic from "../Pelatihan/TableDataBlankoKeluarPublic";

interface ChartThreeState {
  series: number[];
}

const options2: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: [
    "#3C50E0", // blue
    "#6577F3", // light blue
    "#026bec", // blue
    "#991dce", // purple
    "#0FADCF", // cyan
    "#25ca46", // green
    "#12e7d2", // light cyan
    "#2D42FF", // blue
    "#4C5EFF", // light blue
    "#0033CC", // dark blue
    "#8A2BE2", // blue-violet
    "#4682B4", // steel blue
    "#5F9EA0", // cadet blue
    "#00CED1", // dark turquoise
    "#20B2AA", // light sea green
    "#3CB371", // medium sea green
    "#7FFFD4", // aquamarine
  ],

  labels: [
    "PUKAKP I (Aceh)",
    "PUKAKP II (Medan)",
    "PUKAKP III (Lampung)",
    "PUKAKP IV (Jakarta)",
    "PUKAKP V (Tegal)",
    "PUKAKP VI (Tegal)",
    "PUKAKP VII (Banyuwangi)",
    "PUKAKP VIII (Kupang)",
    "PUKAKP IX (Pontianak)",
    "PUKAKP X (Bitung)",
    "PUKAKP XI (Bitung)",
    "PUKAKP XII (Bone)",
    "PUKAKP XIII (Ambon)",
    "PUKAKP XIV (Ambon)",
    "PUKAKP XV (Sorong)",
    "PUKAKP XVI (Sorong)",
    "PUKAKP XVII (Dumai)",
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
          width: 570,
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

const options1: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "pie",
  },
  colors: [
    "#3C50E0",
    "#6577F3",
    "#026bec",
    "#991dce",
    "#0FADCF",
    "#25ca46",
    "#12e7d2",
  ],
  labels: [
    "Ahli Nautika Kapal Penangkap Ikan Tingkat I",
    "Ahli Teknika Kapal Penangkap Ikan Tingkat I",
    "Ahli Nautika Kapal Penangkap Ikan Tingkat II",
    "Ahli Teknika Kapal Penangkap Ikan Tingkat II",
    "Ahli Nautika Kapal Penangkap Ikan Tingkat III",
    "Ahli Teknika Kapal Penangkap Ikan Tingkat III",
    "Rating Keahlian",
  ],
  legend: {
    show: true,
    position: "bottom",
  },
  // title: {
  //   text: "Grafik Jumlah per Jenis Pendidikan",
  //   style: {
  //     fontFamily: "Plus Sans Jakarta",
  //   },
  // },
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

const ChartPopoverKeahlian: React.FC<{ data: BlankoKeluar[] }> = ({ data }) => {
  const [state, setState] = useState<ChartThreeState>({
    series: [
      data
        .filter(
          (item) =>
            item.NamaProgram === "Ahli Nautika Kapal Penangkap Ikan Tingkat I"
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) =>
            item.NamaProgram === "Ahli Teknika Kapal Penangkap Ikan Tingkat I"
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) =>
            item.NamaProgram === "Ahli Nautika Kapal Penangkap Ikan Tingkat II"
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) =>
            item.NamaProgram === "Ahli Teknika Kapal Penangkap Ikan Tingkat II"
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) =>
            item.NamaProgram === "Ahli Nautika Kapal Penangkap Ikan Tingkat III"
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter(
          (item) =>
            item.NamaProgram === "Ahli Teknika Kapal Penangkap Ikan Tingkat III"
        )
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
      data
        .filter((item) => item.NamaProgram === "Rating Keahlian")
        .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
    ],
  });

  const totalSum = [
    {
      label: "Ujian Ahli Nautika Kapal Penangkap Ikan Tingkat I",
      color: "bg-primary",
      multiplier: 565000,
    },
    {
      label: "Ujian Ahli Teknika Kapal Penangkap Ikan Tingkat I",
      color: "bg-[#8FD0EF]",
      multiplier: 565000,
    },
    {
      label: "Ujian Ahli Nautika Kapal Penangkap Ikan Tingkat II",
      color: "bg-[#026bec]",
      multiplier: 540000,
    },
    {
      label: "Ujian Ahli Teknika Kapal Penangkap Ikan Tingkat II",
      color: "bg-[#991dce]",
      multiplier: 540000,
    },
    {
      label: "Ujian Ahli Nautika Kapal Penangkap Ikan Tingkat III",
      color: "bg-[#0FADCF]",
      multiplier: 693000,
    },
    {
      label: "Ujian Ahli Teknika Kapal Penangkap Ikan Tingkat III",
      color: "bg-[#25ca46]",
      multiplier: 693000,
    },
    {
      label: "Ujian Rating Keahlian",
      color: "bg-[#12e7d2]",
      multiplier: 2031000,
    },
  ].reduce(
    (acc, item) => {
      const totalBlanko = data
        .filter((d) => "Ujian " + d.NamaProgram === item.label)
        .reduce((total, d) => total + d.JumlahBlankoDisetujui, 0);

      const totalAmount = totalBlanko * item.multiplier;

      acc.totalAmount += totalAmount;
      acc.totalBlanko += totalBlanko;

      return acc;
    },
    { totalAmount: 0, totalBlanko: 0 }
  );

  const totalSum2 = [
    {
      label: "Diklat ANKAPIN I",
      color: "bg-primary",
      multiplier: 19158000,
    },
    {
      label: "Diklat ATKAPIN I",
      color: "bg-[#8FD0EF]",
      multiplier: 15404000,
    },
    {
      label: "Diklat ANKAPIN II",
      color: "bg-[#026bec]",
      multiplier: 10142000,
    },
    {
      label: "Diklat ATKAPIN II",
      color: "bg-[#991dce]",
      multiplier: 10547000,
    },
    {
      label: "Diklat ANKAPIN III (Upgrading)",
      color: "bg-[#0FADCF]",
      multiplier: 3940000,
    },
    {
      label: "Diklat ATKAPIN III (Upgrading)",
      color: "bg-[#25ca46]",
      multiplier: 4217000,
    },
    {
      label: "Pembaharuan Portfolio Spanyol",
      color: "bg-[#12e7d2]",
      multiplier: 1828000,
    },
  ].reduce(
    (acc, item) => {
      const totalBlanko = data
        .filter((d) => d.NamaProgram === item.label)
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

  // Function to reset the chart series
  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [65, 34, 12, 56],
    }));
  };

  // Call handleReset when needed
  // If this should be called initially, uncomment the next line
  // useEffect(() => handleReset(), []);

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-5 w-full">
      <div className="mb-3 justify-between gap-4 sm:flex w-full">
        <div>
          <h5 className="text-xl font-semibold text-black">
            Total Sertifikat Ujian Keahlian
          </h5>
          <p className="italic text-sm">{formatDateTime()}</p>
        </div>
      </div>

      <div className="mb-2 mt-4 border-t border-t-gray-200  pt-5 flex gap-3 items-start">
        <div id="chartThree" className="mx-auto flex flex-col justify-center">
          <h5 className="text-sm font-semibold text-black leading-[110%]">
            Grafik Jumlah Sertifikat <br /> Diterbitkan per Jenis Pendidikan
          </h5>
          <ReactApexChart
            options={options1}
            series={[
              data
                .filter(
                  (item) =>
                    item.NamaProgram ===
                    "Ahli Nautika Kapal Penangkap Ikan Tingkat I"
                )
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter(
                  (item) =>
                    item.NamaProgram ===
                    "Ahli Teknika Kapal Penangkap Ikan Tingkat I"
                )
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter(
                  (item) =>
                    item.NamaProgram ===
                    "Ahli Nautika Kapal Penangkap Ikan Tingkat II"
                )
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter(
                  (item) =>
                    item.NamaProgram ===
                    "Ahli Teknika Kapal Penangkap Ikan Tingkat II"
                )
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter(
                  (item) =>
                    item.NamaProgram ===
                    "Ahli Nautika Kapal Penangkap Ikan Tingkat III"
                )
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter(
                  (item) =>
                    item.NamaProgram ===
                    "Ahli Teknika Kapal Penangkap Ikan Tingkat III"
                )
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter((item) => item.NamaProgram === "Rating Keahlian")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
            ]}
            type="donut"
          />
        </div>
        <div id="chartThree" className="mx-auto  flex flex-col justify-center">
          <h5 className="text-sm font-semibold text-black leading-[110%]">
            Grafik Jumlah Sertifikat <br /> Diterbitkan per Pelaksana Ujian
          </h5>
          <ReactApexChart
            options={options2}
            series={[
              data
                .filter((item) => item.NamaPelaksana === "PUKAKP I (Aceh)")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter((item) => item.NamaPelaksana === "PUKAKP II (Medan)")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter((item) => item.NamaPelaksana === "PUKAKP III (Lampung)")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter((item) => item.NamaPelaksana === "PUKAKP IV (Jakarta)")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter((item) => item.NamaPelaksana === "PUKAKP V (Tegal)")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter((item) => item.NamaPelaksana === "PUKAKP VI (Tegal)")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter(
                  (item) => item.NamaPelaksana === "PUKAKP VII (Banyuwangi)"
                )
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter((item) => item.NamaPelaksana === "PUKAKP VIII (Kupang)")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter(
                  (item) => item.NamaPelaksana === "PUKAKP IX (Pontianak)"
                )
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter((item) => item.NamaPelaksana === "PUKAKP X (Bitung)")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter((item) => item.NamaPelaksana === "PUKAKP XI (Bitung)")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter((item) => item.NamaPelaksana === "PUKAKP XII (Bone)")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter((item) => item.NamaPelaksana === "PUKAKP XIII (Ambon)")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter((item) => item.NamaPelaksana === "PUKAKP XIV (Ambon)")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter((item) => item.NamaPelaksana === "PUKAKP XV (Sorong)")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter((item) => item.NamaPelaksana === "PUKAKP XVI (Sorong)")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter((item) => item.NamaPelaksana === "PUKAKP XVII (Dumai)")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
            ]}
            type="donut"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-col mt-10 mx-12">
        <div className="flex flex-col pb-2 border-b border-b-gray-300">
          <h5 className="text-xl font-semibold text-black">
            Total Perkiraan Penerimaan PNBP
          </h5>
          <p className="italic text-sm -mt-1">
            The unit prices used in this data were obtained from{" "}
            <span className="font-semibold">BPPP Tegal</span>
          </p>
        </div>

        <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
          {[
            {
              label: "Ujian Ahli Nautika Kapal Penangkap Ikan Tingkat I",
              color: "bg-primary",
              multiplier: 565000,
            },
            {
              label: "Ujian Ahli Teknika Kapal Penangkap Ikan Tingkat I",
              color: "bg-[#8FD0EF]",
              multiplier: 565000,
            },
            {
              label: "Ujian Ahli Nautika Kapal Penangkap Ikan Tingkat II",
              color: "bg-[#026bec]",
              multiplier: 540000,
            },
            {
              label: "Ujian Ahli Teknika Kapal Penangkap Ikan Tingkat II",
              color: "bg-[#991dce]",
              multiplier: 540000,
            },
            {
              label: "Ujian Ahli Nautika Kapal Penangkap Ikan Tingkat III",
              color: "bg-[#0FADCF]",
              multiplier: 693000,
            },
            {
              label: "Ujian Ahli Teknika Kapal Penangkap Ikan Tingkat III",
              color: "bg-[#25ca46]",
              multiplier: 693000,
            },
            {
              label: "Ujian Rating Keahlian",
              color: "bg-[#12e7d2]",
              multiplier: 2031000,
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
                      .filter((d) => "Ujian " + d.NamaProgram === item.label)
                      .reduce(
                        (total, d) => total + d.JumlahBlankoDisetujui,
                        0
                      ) * item.multiplier
                  ).toLocaleString("id-ID")}{" "}
                  <span className="font-semibold text-xs ml-3">
                    (
                    {data
                      .filter((d) => "Ujian " + d.NamaProgram === item.label)
                      .reduce((total, d) => total + d.JumlahBlankoDisetujui, 0)
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
      </div>
      {/* 
      <div className="mb-3 justify-between gap-4 sm:flex w-full">
        <div>
          <h5 className="text-xl font-semibold text-black">
            Total Sertifikat Diklat Keahlian
          </h5>
          <p className="italic text-sm">{formatDateTime()}</p>
        </div>
      </div>

      <div className="mb-2 mt-4 border-t border-t-gray-200  pt-5 flex gap-3 items-start">
        <div id="chartThree" className="mx-auto flex flex-col justify-center">
          <h5 className="text-sm font-semibold text-black leading-[110%]">
            Grafik Jumlah Sertifikat <br /> Diterbitkan per Jenis Diklat
          </h5>
          <ReactApexChart
            options={options1}
            series={[
              data
                .filter(
                  (item) =>
                    item.NamaProgram ===
                    "Ahli Nautika Kapal Penangkap Ikan Tingkat I"
                )
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter(
                  (item) =>
                    item.NamaProgram ===
                    "Ahli Teknika Kapal Penangkap Ikan Tingkat I"
                )
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter(
                  (item) =>
                    item.NamaProgram ===
                    "Ahli Nautika Kapal Penangkap Ikan Tingkat II"
                )
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter(
                  (item) =>
                    item.NamaProgram ===
                    "Ahli Teknika Kapal Penangkap Ikan Tingkat II"
                )
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter(
                  (item) =>
                    item.NamaProgram ===
                    "Ahli Nautika Kapal Penangkap Ikan Tingkat III"
                )
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter(
                  (item) =>
                    item.NamaProgram ===
                    "Ahli Teknika Kapal Penangkap Ikan Tingkat III"
                )
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
              data
                .filter((item) => item.NamaProgram === "Rating Keahlian")
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0),
            ]}
            type="donut"
          />
        </div>
      </div> */}

      {/* <div className="flex gap-2 flex-col mt-10 mx-12">
        <div className="flex flex-col pb-2 border-b border-b-gray-300">
          <h5 className="text-xl font-semibold text-black">
            Total Perkiraan Penerimaan PNBP
          </h5>
          <p className="italic text-sm -mt-1">
            The unit prices used in this data were obtained from{" "}
            <span className="font-semibold">BPPP Tegal</span>
          </p>
        </div>

        <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
          {[
            {
              label: "Diklat ANKAPIN I",
              color: "bg-primary",
              multiplier: 19158000,
            },
            {
              label: "Diklat ATKAPIN I",
              color: "bg-[#8FD0EF]",
              multiplier: 15404000,
            },
            {
              label: "Diklat ANKAPIN II",
              color: "bg-[#026bec]",
              multiplier: 10142000,
            },
            {
              label: "Diklat ATKAPIN II",
              color: "bg-[#991dce]",
              multiplier: 10547000,
            },
            {
              label: "Diklat ANKAPIN III (Upgrading)",
              color: "bg-[#0FADCF]",
              multiplier: 3940000,
            },
            {
              label: "Diklat ATKAPIN III (Upgrading)",
              color: "bg-[#25ca46]",
              multiplier: 4217000,
            },
            {
              label: "Pembaharuan Portfolio Spanyol",
              color: "bg-[#12e7d2]",
              multiplier: 1828000,
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
                      {item.label == "Diklat ATKAPIN III (Upgrading)" ||
                      item.label == "Diklat ANKAPIN III (Upgrading)"
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
                      .filter((d) => d.NamaProgram === item.label)
                      .reduce(
                        (total, d) => total + d.JumlahBlankoDisetujui,
                        0
                      ) * item.multiplier
                  ).toLocaleString("id-ID")}{" "}
                  <span className="font-semibold text-xs ml-3">
                    (
                    {data
                      .filter((d) => d.NamaProgram === item.label)
                      .reduce((total, d) => total + d.JumlahBlankoDisetujui, 0)
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
                  end={totalSum2.totalAmount}
                />
              </h5>
              <span className="font-semibold text-xs ml-3">
                ({totalSum2.totalBlanko}
                Sertifikat )
              </span>
            </div>
          </div>
        </div>

        <TableDataBlankoKeluarPublic />
      </div> */}
    </div>
  );
};

export default ChartPopoverKeahlian;
