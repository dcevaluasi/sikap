import React from "react";

import LandingDPKAKP from "./pages/landing";

export const metadata = {
  title: "DPKAKP - Dewan Penguji Keahlian Awak Kapal Perikanan",
  description:
    "Dewan yang menyelenggarakan Ujian Keahlian Awak Kapal Perikanan untuk mendapatkan Sertifikat Keahlian Awak Kapal Perikanan sesuai dengan standar Kompetensi Nasional dan Internasional.",
  icons: ["/dpkakp/logo.png"],
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
    "STCWF",
  ],

  authors: [
    { name: "Kementrian Kelautan dan Perikanan" },
    {
      name: "Badan Penyuluhan dan Pengembangan Sumber Daya Manusia Kelautan dan Perikanan",
    },
    { name: "Pusat Pelatihan Kelautan dan Perikanan" },
  ],

  publisher: "Kementrian Kelautan dan Perikanan",
  url: "/dpkakp/logo.png",
  referrer: "origin-when-cross-origin",
  type: "website",
  robots: "index, follow",
  og: {
    title: "DPKAKP - Dewan Penguji Keahlian Awak Kapal Perikanan",
    description:
      "Dewan yang menyelenggarakan Ujian Keahlian Awak Kapal Perikanan untuk mendapatkan Sertifikat Keahlian Awak Kapal Perikanan sesuai dengan standar Kompetensi Nasional dan Internasional.",
    type: "website",
    url: "/dpkakp/logo.png",
    image: "/dpkakp/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "DPKAKP - Dewan Penguji Keahlian Awak Kapal Perikanan",
    description:
      "Dewan yang menyelenggarakan Ujian Keahlian Awak Kapal Perikanan untuk mendapatkan Sertifikat Keahlian Awak Kapal Perikanan sesuai dengan standar Kompetensi Nasional dan Internasional.",
    image: "/dpkakp/logo.png",
  },
};

export default function page() {
  return <LandingDPKAKP />;
}
