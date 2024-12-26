"use client";

import { elautBaseUrl } from "@/constants/urls";
import { BlankoKeluar } from "@/types/blanko";
import { PelatihanMasyarakat } from "@/types/product";
import { formatDateTime, getMonthFromDateString } from "@/utils";
import { ApexOptions } from "apexcharts";
import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const chartOptions: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: { show: false },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: { chart: { height: 300 } },
    },
    {
      breakpoint: 1366,
      options: { chart: { height: 350 } },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  grid: {
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: true } },
  },
  dataLabels: { enabled: false },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    fillOpacity: 1,
    hover: { sizeOffset: 5 },
  },
  xaxis: {
    type: "category",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    title: { style: { fontSize: "0px" } },
    // min: 0,
    // max: 100,
  },
};

const ChartMasyarakatDilatihMonthly: React.FC<{
  data: PelatihanMasyarakat[];
}> = ({ data }) => {
  const [dataPelatihan, setDataPelatihan] = useState<PelatihanMasyarakat[]>([]);
  const [dataTotalMasyarakatDilatih, setDataTotalMasyarakatDilatih] =
    useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchPublicTrainingData = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${elautBaseUrl}/lemdik/getPelatihan`
      );
      const filteredData = response.data.data.filter(
        (item: PelatihanMasyarakat) => item.JumlahPeserta! > 0
      );
      const totalMasyarakatDilatih = filteredData.reduce(
        (sum: any, item: any) => sum + item.JumlahPeserta,
        0
      );

      setDataPelatihan(response.data.data);
      setDataTotalMasyarakatDilatih(totalMasyarakatDilatih);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchPublicTrainingData();
  }, []);

  const calculateMonthlyData = (key: keyof PelatihanMasyarakat) => {
    return Array.from({ length: 12 }, (_, i) => {
      const month = (i + 1).toString().padStart(2, "0");
      return data
        .filter(
          (item) =>
            getMonthFromDateString(item.TanggalMulaiPelatihan!) === month
        )
        .reduce(
          (total, item) =>
            total + (key === "JumlahPeserta" ? item.JumlahPeserta! : 1),
          0
        );
    });
  };

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="col-span-12 rounded-xl border mb-4 border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="mb-3 justify-between gap-4 sm:flex flex-col w-full">
          <div>
            <h5 className="text-xl font-semibold text-black">
              Total Masyarakat Dilatih
            </h5>
            <p className="italic text-sm">{formatDateTime()}</p>
          </div>
          <div className="flex w-full gap-3 sm:gap-5">
            <div className="flex min-w-47.5">
              <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
              </span>
              <div className="w-full">
                <p className="font-semibold text-primary">Total Pelatihan</p>
                <p className="text-sm font-medium">{data.length} Pelatihan</p>
              </div>
            </div>
            <div className="flex w-full">
              <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
              </span>
              <div className="w-full">
                <p className="font-semibold text-secondary">
                  Total Masyarakat Dilatih
                </p>
                <p className="text-sm font-medium">
                  {dataTotalMasyarakatDilatih} Orang
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end ">
          <div className="inline-flex items-center rounded-md bg-white p-1.5">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="rounded bg-white px-3 py-1 text-xs cursor-pointer font-medium text-black border border-gray-300"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={chartOptions}
            series={[
              {
                name: "Total Pelatihan",
                data: calculateMonthlyData("TanggalMulaiPelatihan"),
              },
              {
                name: "Total Masyarakat Dilatih",
                data: calculateMonthlyData("JumlahPeserta"),
              },
            ]}
            type="area"
            height={350}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartMasyarakatDilatihMonthly;
