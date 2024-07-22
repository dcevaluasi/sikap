"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/components/styles/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/dashboard/common/Loader";

import { Delius_Unicase, Inter, Plus_Jakarta_Sans } from "next/font/google";

import localFont from "next/font/local";
import axios from "axios";

const myFont = localFont({
  src: "../font/calsans.ttf",
  variable: "--font-calsans",
});

const inter = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const delius = Delius_Unicase({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-delius",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} ${myFont.variable} ${delius.variable} `}
      >
        <div className="h-screen max-h-screen overflow-y-hidden">
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
