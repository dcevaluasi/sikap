"use client";

import { BlankoKeluar } from "@/types/blanko";
import { formatDateTime } from "@/utils";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

import TableDataBlankoKeluarPublic from "../Pelatihan/TableDataBlankoKeluarPublic";
import TableDataBlankoKeterampilanPublic from "../Pelatihan/TableDataBlankoKeterampilanPublic";

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
    "SKN Bidang Nautika",
    "SKN Bidang Teknika",
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
        .filter((item) => item.NamaProgram === "BSTF I")
        .reduce((total, item) => total + item.JumlahBlankoDiajukan, 0),
      data
        .filter((item) => item.NamaProgram === "BSTF II")
        .reduce((total, item) => total + item.JumlahBlankoDiajukan, 0),
      data
        .filter((item) => item.NamaProgram === "SKPI")
        .reduce((total, item) => total + item.JumlahBlankoDiajukan, 0),
      data
        .filter((item) => item.NamaProgram === "SOPI")
        .reduce((total, item) => total + item.JumlahBlankoDiajukan, 0),
      data
        .filter((item) => item.NamaProgram === "SKN Bidang Nautika")
        .reduce((total, item) => total + item.JumlahBlankoDiajukan, 0),
      data
        .filter((item) => item.NamaProgram === "SKN Bidang Teknika")
        .reduce((total, item) => total + item.JumlahBlankoDiajukan, 0),
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
          <div id="chartThree" className="mx-auto flex justify-center">
            <ReactApexChart
              options={options}
              series={[
                data
                  .filter((item) => item.NamaProgram === "BSTF I")
                  .reduce(
                    (total, item) => total + item.JumlahBlankoDiajukan,
                    0
                  ),
                data
                  .filter((item) => item.NamaProgram === "BSTF II")
                  .reduce(
                    (total, item) => total + item.JumlahBlankoDiajukan,
                    0
                  ),
                data
                  .filter((item) => item.NamaProgram === "SKPI")
                  .reduce(
                    (total, item) => total + item.JumlahBlankoDiajukan,
                    0
                  ),
                data
                  .filter((item) => item.NamaProgram === "SOPI")
                  .reduce(
                    (total, item) => total + item.JumlahBlankoDiajukan,
                    0
                  ),

                data
                  .filter((item) => item.NamaProgram === "SKN Bidang Nautika")
                  .reduce(
                    (total, item) => total + item.JumlahBlankoDiajukan,
                    0
                  ),
                data
                  .filter((item) => item.NamaProgram === "SKN Bidang Teknika")
                  .reduce(
                    (total, item) => total + item.JumlahBlankoDiajukan,
                    0
                  ),
              ]}
              type="donut"
            />
          </div>
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

      <div className="flex gap-2 flex-col mt-10">
        <h5 className="text-xl font-semibold text-black">
          Total Perkiraan Penerimaan PNBP
        </h5>
        <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
          {[
            {
              label: "BSTF I",
              color: "bg-primary",
              multiplier: 1157000,
            },
            {
              label: "BSTF II",
              color: "bg-[#8FD0EF]",
              multiplier: 614000,
            },
            {
              label: "SKPI",
              color: "bg-[#026bec]",
              multiplier: 549000,
            },
            {
              label: "SOPI",
              color: "bg-[#991dce]",
              multiplier: 669000,
            },
            {
              label: "SKN Bidang Nautika",
              color: "bg-[#25ca46]",
              multiplier: 763000,
            },
            {
              label: "SKN Bidang Teknika",
              color: "bg-[#12e7d2]",
              multiplier: 577000,
            },
          ].map((item, index) => (
            <div className="w-full px-8 " key={index}>
              <div className="flex w-full items-center">
                <span
                  className={`mr-2 block h-3 w-full max-w-3 rounded-full ${item.color}`}
                ></span>
                <p className="flex w-full justify-between text-sm font-medium text-black">
                  <span>
                    {item.label} - Rp {item.multiplier.toLocaleString("id-ID")}
                  </span>
                </p>
                <span>
                  Rp.
                  {(
                    data
                      .filter((d) => d.NamaProgram === item.label)
                      .reduce((total, d) => total + d.JumlahBlankoDiajukan, 0) *
                    item.multiplier
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
        <TableDataBlankoKeterampilanPublic />
      </div>
    </div>
  );
};

export default ChartPopoverKeterampilan;
