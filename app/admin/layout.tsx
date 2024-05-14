"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/components/styles/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/dashboard/common/Loader";

import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import localFont from "next/font/local";

const myFont = localFont({
  src: "../font/calsans.ttf",
  variable: "--font-calsans",
});

const inter = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} ${myFont.variable}`}
      >
        <div>{loading ? <Loader /> : children}</div>
      </body>
    </html>
  );
}
