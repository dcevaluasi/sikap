"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import { HiCheckBadge, HiMiniUserGroup, HiTrash } from "react-icons/hi2";
import { GiBattery75, GiPapers, GiReceiveMoney } from "react-icons/gi";
import { MdSchool } from "react-icons/md";
import ChartFour from "../Charts/ChartFour";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import { LemdiklatDetailInfo } from "@/types/lemdiklat";
import {
  RiLogoutCircleRFill,
  RiShipFill,
  RiVerifiedBadgeFill,
} from "react-icons/ri";
import { Blanko, BlankoKeluar } from "@/types/blanko";
import TableDataPublicBlanko from "../Pelatihan/TableDataPublicBlanko";
// import MapOne from "../Maps/MapOne";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "flowbite-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChartPopover from "../Charts/ChartPopover";
import ChartPopoverKeluar from "../Charts/ChartPopoverKeluar";
import { formatDateTime } from "@/utils";
import ChartPopoverKeahlian from "../Charts/ChartPopoverKeahlian";
import TableDataBlankoKeluarPublic from "../Pelatihan/TableDataBlankoKeluarPublic";
import ChartBlankoAwal from "../Charts/ChartBlankoAwal";
import ChartPopoverKeterampilan from "../Charts/ChartPopoverKeterampilan";
import ChartCertificatesMonthly from "../Charts/ChartCertificatesMonthly";

const AKP: React.FC = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const token = Cookies.get("XSRF091");

  const [lemdikData, setLemdikData] =
    React.useState<LemdiklatDetailInfo | null>(null);

  const fetchInformationLemdiklat = async () => {
    try {
      const response = await axios.get(`${baseUrl}/lemdik/getLemdik`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLemdikData(response.data);
      Cookies.set("IDLemdik", response.data.data.IdLemdik);
      console.log("LEMDIK INFO: ", response);
    } catch (error) {
      console.error("LEMDIK INFO: ", error);
    }
  };

  const [data, setData] = React.useState<BlankoKeluar[]>([]);
  const handleFetchingBlanko = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BLANKO_AKAPI_URL}/adminpusat/getBlankoKeluar`
      );
      console.log("RESPONSE BLANKO KELUAR : ", response);
      setData(response.data.data);
    } catch (error) {
      console.error("ERROR BLANKO KELUAR : ", error);
      throw error;
    }
  };

  const [dataBlanko, setDataBlanko] = React.useState<Blanko[]>([]);
  const handleFetchingBlankoMaster = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BLANKO_AKAPI_URL}/adminpusat/getBlanko`
      );
      console.log("RESPONSE BLANKO : ", response);
      setDataBlanko(response.data.data);
    } catch (error) {
      console.error("ERROR BLANKO : ", error);
      throw error;
    }
  };

  const [selectedId, setSelectedId] = React.useState<number>(0);

  React.useEffect(() => {
    fetchInformationLemdiklat();
    handleFetchingBlanko();
    handleFetchingBlankoMaster();
  }, []);

  return (
    <>
      <div className="flex flex-col mb-8">
        <div className="flex flex-row gap-2 items-center">
          <RiShipFill className="text-4xl" />
          <div className="flex flex-col">
            <h1 className="text-4xl text-gray-900 font-medium leading-[100%] font-calsans">
              Dashboard Sertifikasi Awak
              <br />
              Kapal Perikanan
            </h1>
            <p className="font-normal italic leading-[110%] text-gray-400 text-base max-w-4xl">
              The data presented is obtained through the AKAPI application and
              processed by the Maritime and Fisheries Training Center operator,
              and is valid to {formatDateTime()}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 h-fit max-h-fit md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <Popover>
          <PopoverTrigger asChild>
            <span onClick={(e) => setSelectedId(0)}>
              <CardDataStats
                title="Total Persedian Blanko"
                total={dataBlanko
                  .reduce((total, item) => total + item.JumlahPengadaan, 0)
                  .toString()}
                rate="0%"
                levelUp
              >
                <GiPapers className="text-primary text-3xl group-hover:scale-110" />
              </CardDataStats>
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-150">
            <ChartBlankoAwal data={dataBlanko} />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <span onClick={(e) => setSelectedId(0)}>
              <CardDataStats
                title="Sisa Blanko"
                total={(
                  dataBlanko.reduce(
                    (total, item) => total + item.JumlahPengadaan,
                    0
                  ) -
                  data.reduce(
                    (total, item) => total + item.JumlahBlankoDisetujui,
                    0
                  )
                ).toString()}
                rate=""
                levelDown
              >
                <GiBattery75 className="text-primary text-3xl" />
              </CardDataStats>
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-150">
            <ChartPopover data={dataBlanko} />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <span onClick={(e) => setSelectedId(0)}>
              <CardDataStats
                title="Total Blanko Terpakai"
                total={data
                  .reduce(
                    (total, item) => total + item.JumlahBlankoDisetujui,
                    0
                  )
                  .toString()}
                rate="0%"
                levelUp
              >
                <RiLogoutCircleRFill className="text-primary text-3xl" />
              </CardDataStats>
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-150">
            <ChartPopoverKeluar data={data} />
          </PopoverContent>
        </Popover>

        <span onClick={(e) => setSelectedId(1)}>
          <CardDataStats
            title="Total Sertifikat Keahlian"
            total={data
              .filter(
                (item) => item.TipeBlanko === "Certificate of Competence (CoC)"
              )
              .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0)
              .toString()}
            rate=""
            levelDown
          >
            <HiCheckBadge className="text-primary text-3xl" />
          </CardDataStats>
        </span>

        <span onClick={(e) => setSelectedId(2)}>
          <CardDataStats
            title="Total Sertifikat Keterampilan"
            total={
              data
                .filter(
                  (item) =>
                    item.TipeBlanko === "Certificate of Proficiency (CoP)"
                )
                .reduce((total, item) => total + item.JumlahBlankoDisetujui, 0)
                .toString() +
              "/" +
              dataBlanko
                .filter(
                  (item) =>
                    item.TipeBlanko === "Certificate of Proficiency (CoP)"
                )
                .reduce((total, item) => total + item.JumlahPengadaan, 0)
                .toString()
            }
            rate=""
            levelDown
          >
            <MdSchool className="text-primary text-3xl" />
          </CardDataStats>
        </span>

        <CardDataStats
          title="Total Blanko Rusak"
          total={"0f"}
          rate=""
          levelDown
        >
          <HiTrash className="text-primary text-3xl" />
        </CardDataStats>
      </div>
      <div className="w-full mt-8">
        {/* <div className="mt-4 mb-6 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <ChartOne />
          <ChartTwo />
        </div> */}

        {selectedId == 0 && <ChartCertificatesMonthly data={data!} />}

        {selectedId == 1 && <ChartPopoverKeahlian data={data!} />}

        {selectedId == 2 && <ChartPopoverKeterampilan data={data!} />}
      </div>
    </>
  );
};

export default AKP;
