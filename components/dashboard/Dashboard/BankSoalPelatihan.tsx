"use client";

import React from "react";
import { TbDatabase } from "react-icons/tb";
import TableDataBankSoalPelatihan from "../Pelatihan/TableDataBankSoalPelatihan";

const BankSoalPelatihan: React.FC = () => {
    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-row gap-2 items-center">
                    <TbDatabase className="text-4xl" />
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-medium leading-[100%] font-calsans">
                            Bank Soal Pelatihan
                        </h1>
                        <p className="font-medium text-gray-400 text-base">
                            Upload Bank Soal Untuk Pelaksanaan Pre-Test dan Post-Test Pelatihan Yang Diselenggarakan!
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 md:mt-6 2xl:mt-7.5">
                <TableDataBankSoalPelatihan />
            </div>
        </>
    );
};

export default BankSoalPelatihan;
