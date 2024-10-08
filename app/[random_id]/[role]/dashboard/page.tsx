"use client";
import AKP from "@/components/dashboard/Dashboard/AKP";
import Dashboard from "@/components/dashboard/Dashboard/Dashboard";
import ECommerce from "@/components/dashboard/Dashboard/E-commerce";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  return (
    <>
      <DefaultLayout>
        {pathname.includes("pusat") ? <Dashboard /> : <ECommerce />}
      </DefaultLayout>
    </>
  );
}
