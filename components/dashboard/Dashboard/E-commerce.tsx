"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import { HiCheckBadge, HiMiniUserGroup } from "react-icons/hi2";
import { GiReceiveMoney } from "react-icons/gi";
import { MdSchool } from "react-icons/md";
import ChartFour from "../Charts/ChartFour";
import Cookies from "js-cookie";
import axios from "axios";
import { LemdiklatDetailInfo } from "@/types/lemdiklat";
// import MapOne from "../Maps/MapOne";

const ECommerce: React.FC = () => {
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

  React.useEffect(() => {
    fetchInformationLemdiklat();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total Masyarakat Dilatih"
          total="14.509"
          rate="0.43%"
          levelUp
        >
          <HiMiniUserGroup className="text-primary text-xl" />
        </CardDataStats>
        <CardDataStats
          title="Total Bersertifikat Kompetensi"
          total="2.450"
          rate="4.35%"
          levelUp
        >
          <HiCheckBadge className="text-primary text-xl" />
        </CardDataStats>
        <CardDataStats
          title="Total PNBP"
          total="Rp 18.4 M"
          rate="2.59%"
          levelUp
        >
          <GiReceiveMoney className="text-primary text-xl" />
        </CardDataStats>
        <CardDataStats
          title="Total Pelatihan"
          total={
            lemdikData != null
              ? lemdikData!.data!.Pelatihan!.length.toString()
              : "0"
          }
          rate="0.95%"
          levelDown
        >
          <MdSchool className="text-primary text-xl" />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <ChartFour />
      </div>
    </>
  );
};

export default ECommerce;
