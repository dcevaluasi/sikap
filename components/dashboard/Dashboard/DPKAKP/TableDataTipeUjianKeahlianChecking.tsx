'use client'

import React from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { dpkakpBaseUrl } from "@/constants/urls";
import { TypeUjian } from "@/types/ujian-keahlian-akp";
import Toast from "@/components/toast";
import Loader from "@/components/Loader";
import { HashLoader } from "react-spinners";
import { Textarea } from "@/components/ui/textarea";



const TableDataTipeUjianKeahlianChecking: React.FC = () => {
  const [data, setData] = React.useState<TypeUjian[]>([]);
  const [soalUjianBagian, setSoalUjianBagian] = React.useState<any[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const [selectedIdTypeUjian, setSelectedIdTypeUjian] = React.useState<string>("");
  const [idFungsiSelected, setIdFungsiSelected] = React.useState<string>("");

  const [inputSoal, setInputSoal] = React.useState<string>("");
  const [isDuplicate, setIsDuplicate] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    handleFetchingTypeUjian();
  }, []);

  const handleFetchingTypeUjian = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getTypeUjianNoJwt?token=TUjian2025`,
      );
      setData(response.data.data);
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching tipe ujian:", error);
      setIsFetching(false);
    }
  };

  const handleFetchingBagianUjian = async (idBagian: string) => {

    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getBagianNoJwt?id=${idBagian}&token=TUjian2025`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF095")}`,
          },
        }
      );
      const soalList = response.data!.data[0]!.SoalUjianBagian;
      setSoalUjianBagian(soalList);
    } catch (error) {
      console.error("Error fetching bagian ujian:", error);
    }
  };

  const sanitizeText = (text: string) => {
    return text.trim().replace(/[:?、。!]+$/g, "").trim();
  };

  const checkDuplicate = (value: string) => {
    setInputSoal(value);

    const cleanedInput = sanitizeText(value);
    const exists = soalUjianBagian.some(
      (soal) => sanitizeText(soal.Soal) === cleanedInput
    );

    setIsDuplicate(exists);

    if (cleanedInput.length > 0) {
      Toast.fire({
        icon: exists ? "error" : "success",
        title: exists
          ? "Soal ini sudah ada di database (duplikat)"
          : "Soal ini belum ada, aman digunakan!",
      });
    }
  };



  return (
    <div className="space-y-4 mb-4 max-w-4xl w-full">
      {
        isFetching ? <div className="flex items-center justify-center  ">
          {/* <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div> */}
          <HashLoader color="#338CF5" size={50} />
        </div> : <div className="flex flex-col gap-3"> {/* Select Type Ujian */}
          <div>
            <Label htmlFor="typeUjian" className='text-gray-200'>Pilih Tipe Ujian</Label>
            <Select
              value={selectedIdTypeUjian}
              onValueChange={(value) => {
                setSelectedIdTypeUjian(value);
                setIdFungsiSelected("");
                setSoalUjianBagian([]);
                setIsDuplicate(null);
                setInputSoal("");
              }}
            >
              <SelectTrigger className="max-w-4xl w-full text-gray-200">
                <SelectValue placeholder="-- Pilih Tipe Ujian --" />
              </SelectTrigger>
              <SelectContent>
                {data.map((type) => (
                  <SelectItem key={type.IdTypeUjian} value={type.IdTypeUjian.toString()}>
                    {type.NamaTypeUjian}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Select Bagian */}
          {selectedIdTypeUjian && (
            <div>
              <Label htmlFor="bagian" className='text-gray-200'>Pilih Bagian</Label>
              <Select
                value={idFungsiSelected}
                onValueChange={(value) => {
                  setIdFungsiSelected(value);
                  handleFetchingBagianUjian(value);
                  setInputSoal("");
                  setIsDuplicate(null);
                }}
              >
                <SelectTrigger className="max-w-4xl w-full text-gray-200">
                  <SelectValue placeholder="-- Pilih Bagian --" />
                </SelectTrigger>
                <SelectContent>
                  {data
                    .find((type) => type.IdTypeUjian.toString() === selectedIdTypeUjian)
                    ?.Fungsi.flatMap((fungsi) =>
                      fungsi.Bagian.map((bagian) => (
                        <SelectItem key={bagian.IdBagian} value={bagian.IdBagian.toString()}>
                          {fungsi.NamaFungsi} - {bagian.NamaBagian}
                        </SelectItem>
                      ))
                    )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Input Soal untuk Dicek */}
          {idFungsiSelected && (
            <div>
              <Label htmlFor="soalCheck" className="text-gray-200">Cek Duplikasi Soal</Label>

              <Textarea
                value={inputSoal}
                className="text-gray-200 max-w-4xl w-full resize-none"
                onChange={(e) => checkDuplicate(e.target.value)}
                placeholder="Tulis atau paste soal di sini..."
                rows={5}
              />


            </div>
          )}</div>
      }


    </div>
  );
};

export default TableDataTipeUjianKeahlianChecking;
