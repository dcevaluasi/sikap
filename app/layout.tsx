import "./css/style.css";

import { Delius_Unicase, Inter, Plus_Jakarta_Sans } from "next/font/google";

import localFont from "next/font/local";

import Header from "@/components/ui/header";
import Banner from "@/components/banner";
import CallCenter from "@/components/call-center";

const myFont = localFont({
  src: "./font/calsans.ttf",
  variable: "--font-calsans",
});

const bos = localFont({
  src: "./font/bos.ttf",
  variable: "--font-bos",
});

const bosBold = localFont({
  src: "./font/bookmanoldstyle_bold.ttf",
  variable: "--font-bosBold",
});

const bosItalic = localFont({
  src: "./font/bookmanoldstyle_italic.ttf",
  variable: "--font-bosItalic",
});

const cambria = localFont({
  src: "./font/cambria.ttf",
  variable: "--font-cambria",
});

const tuwir = localFont({
  src: "./font/Tuwir.ttf",
  variable: "--font-tuwir",
});

const delius = Delius_Unicase({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-delius",
});

const inter = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/*
  METADATA WEBSITE E-LAUT
*/
export const metadata = {
  title: "DPKAKP - Dewan Penguji Keahlian Awak Kapal Perikanan",
  description:
    "Dewan yang menyelenggarakan Ujian Keahlian Awak Kapal Perikanan untuk mendapatkan Sertifikat Keahlian Awak Kapal Perikanan sesuai dengan standar Kompetensi Nasional dan Internasional.",
  icons: ["/lembaga/logo/logo-sertifikasi-akp-blue.png"],
  keywords: [
    "DPKAKP",
    "Permen-KP 33 Tahun 2021",
    "Dewan Penguji Keahlian Awak Kapal Perikanan",
    "Dewan Penguji",
    "dewan penguji keahlian awak kapal perikanan",
    "dpkakp",
    "dewan penguji",
    "ankapin I",
    "ankapin II",
    "upgrading skk 60 mil",
    "ANKAPIN-I",
    "ANKAPIN-II",
    "ANKAPIN-III",
    "ATKAPIN-I",
    "ATKAPIN-II",
    "ATKAPIN-III",
    "Ahli Nautika Kapal Penangkap Ikan Tingkat 1",
    "Ahli Nautika Kapal Penangkap Ikan Tingkat 2",
    "Ahli Nautika Kapal Penangkap Ikan Tingkat 3",
    "Ahli Teknika Kapal Penangkap Ikan Tingkat 1",
    "Ahli Teknika Kapal Penangkap Ikan Tingkat 2",
    "Ahli Teknika Kapal Penangkap Ikan Tingkat 3",
    "Rating",
    "E-LAUT",
    "Kepelautan",
    "Nahkoda",
    "Ahli Kapal",
    "Awak Kapal Perikanan",
    "Direktorat Jenderal Perikanan Tangkap",
    "DJPT",
    "Pengukuhan",
    "AKAPI",
    "Aplikasi Awak Kapal Perikanan",
    "Kelautan dan Perikanan",
    "Ahli Nautika",
    "Ahli Teknika",
    "STCWF-95",
    "STCW-F",
  ],

  authors: [
    { name: "Kementrian Kelautan dan Perikanan" },
    {
      name: "Badan Penyuluhan dan Pengembangan Sumber Daya Manusia Kelautan dan Perikanan",
    },
    { name: "Pusat Pelatihan Kelautan dan Perikanan" },
  ],

  publisher: "Kementrian Kelautan dan Perikanan",
  url: "/lembaga/logo/logo-sertifikasi-akp-blue.png",
  referrer: "origin-when-cross-origin",
  type: "website",
  robots: "index, follow",
  og: {
    title: "DPKAKP - Dewan Penguji Keahlian Awak Kapal Perikanan",
    description:
      "Dewan yang menyelenggarakan Ujian Keahlian Awak Kapal Perikanan untuk mendapatkan Sertifikat Keahlian Awak Kapal Perikanan sesuai dengan standar Kompetensi Nasional dan Internasional.",
    type: "website",
    url: "/lembaga/logo/logo-sertifikasi-akp-blue.png",
    image: "/lembaga/logo/logo-sertifikasi-akp-blue.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "DPKAKP - Dewan Penguji Keahlian Awak Kapal Perikanan",
    description:
      "Dewan yang menyelenggarakan Ujian Keahlian Awak Kapal Perikanan untuk mendapatkan Sertifikat Keahlian Awak Kapal Perikanan sesuai dengan standar Kompetensi Nasional dan Internasional.",
    image: "/lembaga/logo/logo-sertifikasi-akp-blue.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} ${myFont.variable} ${tuwir.variable} ${delius.variable} ${bos.variable} ${bosBold.variable}  ${bosItalic.variable} ${cambria.variable} antialiased bg-white text-gray-900 tracking-tight `}
      >
        <div className="flex flex-col overflow-hidden supports-[overflow:clip]:overflow-clip relative">
          {children}
          {/* <CallCenter /> */}
        </div>
      </body>
    </html>
  );
}
