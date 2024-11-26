"use client";

import ECommerce from "@/components/dashboard/Dashboard/E-commerce";
import LayoutAdminElaut from "@/components/dashboard/Layouts/LayoutAdminElaut";

import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  return (
    <>
      <LayoutAdminElaut>
        <ECommerce />
      </LayoutAdminElaut>
    </>
  );
}
