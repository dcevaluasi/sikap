"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import axios from "axios";
import Cookies from "js-cookie";
import { LemdiklatDetailInfo } from "@/types/lemdiklat";
import { dpkakpBaseUrl } from "@/constants/urls";
import { UserInformationDPKAKP } from "@/types/dpkakp";

export default function DefaultLayoutDPKAKP({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const token = Cookies.get("XSRF095");

  const [dpkakpData, setDpkakpData] =
    React.useState<UserInformationDPKAKP | null>(null);

  const fetchInformationDPKAKP = async () => {
    try {
      const response = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getAdminPusat`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDpkakpData(response.data.data);

      console.log("DPKAKP INFO: ", response);
    } catch (error) {
      console.error("DPKAKP INFO: ", error);
    }
  };

  React.useEffect(() => {
    fetchInformationDPKAKP();
  }, []);

  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen ">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div
          className={`relative flex flex-1 h-screen flex-col overflow-x-hidden`}
        >
          {/* <!-- ===== Header Start ===== --> */}

          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            dpkakpInfo={dpkakpData!}
          />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className="h-screen">
            <div className="mx-auto max-w-screen-2xl h-screen scrollbar-hide p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
