import BankSoalPelatihan from "@/components/dashboard/Dashboard/BankSoalPelatihan";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bank Soal Pre-Test & Post-Test",
};

export default function Page() {
    return (
        <>
            <DefaultLayout>
                <BankSoalPelatihan />
            </DefaultLayout>
        </>
    );
}
