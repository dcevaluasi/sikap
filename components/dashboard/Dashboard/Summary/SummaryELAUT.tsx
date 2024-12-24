"use client";
import React from "react";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import { LemdiklatDetailInfo } from "@/types/lemdiklat";
import { Blanko, BlankoKeluar, BlankoRusak } from "@/types/blanko";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChartMasyarakatDilatihMonthly from "../../Charts/ChartMasyarakatDilatihMonthly";
import ChartDetailMasyarakatDilatih from "../../Charts/ChartDetailMasyarakatDilatih";
import ChartSertifikasiKompetensiMonthly from "../../Charts/ChartSertifikasiKompetensiMonthly";
import { BALAI_PELATIHAN } from "@/constants/pelatihan";

const SummaryELAUT: React.FC = () => {
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
      setData(response.data.data);
    } catch (error) {
      console.error("ERROR BLANKO KELUAR : ", error);
      throw error;
    }
  };

  const [blankoRusak, setBlankoRusak] = React.useState<BlankoRusak[]>([]);

  const handleFetchingBlankoRusak = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BLANKO_AKAPI_URL}/adminpusat/getBlankoRusak`
      );
      setBlankoRusak(response.data.data);
    } catch (error) {
      console.error("ERROR BLANKO RUSAK : ", error);
      throw error;
    }
  };

  const [dataBlanko, setDataBlanko] = React.useState<Blanko[]>([]);
  const handleFetchingBlankoMaster = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BLANKO_AKAPI_URL}/adminpusat/getBlanko`
      );
      setDataBlanko(response.data.data);
    } catch (error) {
      console.error("ERROR BLANKO : ", error);
      throw error;
    }
  };

  React.useEffect(() => {
    // Fungsi untuk fetch data
    const fetchAllData = () => {
      fetchInformationLemdiklat();
      handleFetchingBlankoRusak();
      handleFetchingBlanko();
      handleFetchingBlankoMaster();
    };

    // Panggil pertama kali saat komponen di-mount
    fetchAllData();

    // Atur interval untuk refresh data setiap 30 detik
    const intervalId = setInterval(() => {
      fetchAllData();
    }, 3000); // 30 detik (atur sesuai kebutuhan)

    // Cleanup interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, []);

  const [selectedBalaiPelatihan, setSelectedBalaiPelatihan] =
    React.useState<string>("All");

  return (
    <>
      <div className="flex flex-col "></div>

      <div className="w-full">
        <Tabs defaultValue={"CoC"} className="w-full mb-3">
          <TabsList className="flex gap-2 w-full">
            <TabsTrigger value="CoC" className="w-full">
              Masyarakat Dilatih
            </TabsTrigger>
            <TabsTrigger value="CoP" className="w-full">
              SDM KP Berkompetensi
            </TabsTrigger>
          </TabsList>
          <TabsContent value="CoC">
            <>
              <ChartMasyarakatDilatihMonthly data={data!} />

              <Tabs
                defaultValue={selectedBalaiPelatihan}
                className="w-full mb-3"
              >
                <TabsList className="w-full">
                  <TabsTrigger
                    onClick={() => setSelectedBalaiPelatihan("All")}
                    value={"All"}
                  >
                    All
                  </TabsTrigger>
                  {BALAI_PELATIHAN.map((balaiPelatihan, index) => (
                    <TabsTrigger
                      onClick={() =>
                        setSelectedBalaiPelatihan(balaiPelatihan.Name)
                      }
                      key={index}
                      value={balaiPelatihan!.Name}
                    >
                      {balaiPelatihan!.Name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value={selectedBalaiPelatihan}>
                  <ChartDetailMasyarakatDilatih data={data!} />
                </TabsContent>
              </Tabs>
            </>
          </TabsContent>
          <TabsContent value="CoP">
            <>
              <ChartSertifikasiKompetensiMonthly data={data!} />
              <ChartDetailMasyarakatDilatih data={data!} />
            </>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default SummaryELAUT;
