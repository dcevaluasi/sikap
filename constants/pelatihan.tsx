import {
  BidangPelatihan,
  JenisPelatihan,
  PelaksanaanPelatihan,
} from "@/types/pelatihan";

export const BIDANG_PELATIHAN: BidangPelatihan[] = [
  {
    Id: "BP001",
    Name: "Budidaya",
    Description:
      "Pelatihan ini mencakup teknik budidaya ikan, udang, dan biota perairan lainnya dengan fokus pada metode yang berkelanjutan dan efisien. Tujuan dari pelatihan ini adalah untuk meningkatkan produktivitas budidaya melalui pengenalan teknologi baru, manajemen kualitas air, pakan, serta pengendalian penyakit.",
    Image: "/images/bidangPelatihan/budidaya.png",
    Illustration: "/images/illustrations/penangkapan.png",
    Pelatihan: [
      "Pelatihan Budidaya Ikan Air Tawar",
      "Pelatihan Budidaya Udang Vannamei",
      "Pelatihan Manajemen Kesehatan Ikan dan Lingkungan",
    ],
  },
  {
    Id: "BP002",
    Name: "Konservasi",
    Description:
      "Pelatihan ini menitikberatkan pada upaya konservasi sumber daya kelautan dan perikanan, termasuk rehabilitasi terumbu karang, pengelolaan kawasan konservasi laut, dan pemulihan ekosistem pesisir.",
    Image: "/images/bidangPelatihan/konservasi.png",
    Illustration: "/images/illustrations/konservasi.jpg",
    Pelatihan: [
      "Pelatihan Rehabilitasi Terumbu Karang",
      "Pelatihan Pengelolaan Kawasan Konservasi Laut",
      "Pelatihan Pemulihan Ekosistem Pesisir",
    ],
  },

  {
    Id: "BP003",
    Name: "Pengolahan & Pemasaran",
    Description:
      "Pelatihan ini bertujuan untuk meningkatkan keterampilan dalam pengolahan produk perikanan, dari pasca panen hingga siap dipasarkan. Selain itu, peserta juga akan mempelajari strategi pemasaran produk perikanan untuk meningkatkan daya saing di pasar lokal dan internasional.",
    Image: "/images/bidangPelatihan/pengolahanPemasaran.png",
    Illustration: "/images/illustrations/pengolahanPemasaran.jpg",
    Pelatihan: [
      "Pelatihan Pengolahan Produk Perikanan",
      "Pelatihan Teknik Pengemasan dan Penyimpanan Ikan",
      "Pelatihan Strategi Pemasaran Produk Perikanan",
    ],
  },
  {
    Id: "BP004",
    Name: "SD Perikanan",
    Description:
      "Pelatihan ini berfokus pada pengembangan sumber daya manusia di sektor perikanan, termasuk peningkatan kapasitas manajerial, pengelolaan sumber daya alam, dan pengetahuan tentang regulasi serta kebijakan di bidang perikanan.",
    Image: "/images/bidangPelatihan/sd-perikanan.png",
    Illustration: "/images/illustrations/sdPerikanan.jpg",
    Pelatihan: [
      "Pelatihan Manajemen Sumber Daya Perikanan",
      "Pelatihan Kebijakan dan Regulasi Perikanan",
      "Pelatihan Pengembangan Kapasitas SDM Perikanan",
    ],
  },

  {
    Id: "BP005",
    Name: "Penangkapan",
    Description:
      "Pelatihan ini berfokus pada teknik dan teknologi penangkapan ikan yang efektif dan ramah lingkungan. Materi pelatihan meliputi pengoperasian alat tangkap, navigasi, keselamatan kerja, serta regulasi penangkapan yang berkelanjutan.",
    Image: "/images/bidangPelatihan/penangkapan.png",
    Illustration: "/images/illustrations/budidaya.png",
    Pelatihan: [
      "Pelatihan Pengoperasian Alat Tangkap Ikan",
      "Pelatihan Navigasi Kapal Penangkap Ikan",
      "Pelatihan Keselamatan Kerja di Laut",
    ],
  },
  {
    Id: "BP006",
    Name: "Mesin Perikanan",
    Description:
      "Pelatihan ini meliputi pengoperasian, pemeliharaan, dan perbaikan mesin-mesin yang digunakan dalam industri perikanan, seperti mesin kapal, mesin pengolahan ikan, dan alat bantu penangkapan ikan.",
    Image: "/images/bidangPelatihan/mesin-perikanan.png",
    Illustration: "/images/illustrations/mesinPerikanan.jpg",
    Pelatihan: [
      "Pelatihan Pemeliharaan Mesin Kapal Perikanan",
      "Pelatihan Perbaikan Mesin Pengolahan Ikan",
      "Pelatihan Teknologi Alat Bantu Penangkapan",
    ],
  },
  {
    Id: "BP007",
    Name: "Wisata Bahari",
    Description:
      "Pelatihan ini dirancang untuk meningkatkan kemampuan dalam mengelola wisata bahari, termasuk pengembangan destinasi wisata, pelayanan wisata, serta pengelolaan lingkungan laut yang mendukung pariwisata berkelanjutan.",
    Image: "/images/bidangPelatihan/wisataBahari.png",
    Illustration: "/images/illustrations/wisataBahari.jpg",
    Pelatihan: [
      "Pelatihan Pengembangan Destinasi Wisata Bahari",
      "Pelatihan Pengelolaan Ekowisata Pesisir",
      "Pelatihan Pemandu Wisata Bahari",
    ],
  },
  {
    Id: "BP008",
    Name: "Pengelolaan Sampah",
    Description:
      "Pelatihan ini bertujuan untuk memberikan pengetahuan dan keterampilan dalam pengelolaan sampah di kawasan pesisir dan laut, termasuk teknik pengurangan, pemanfaatan, dan daur ulang sampah plastik di laut.",
    Image: "/images/bidangPelatihan/pengolahan-pemasaran.png",
    Illustration: "/images/illustrations/pengelolaanSampah.jpg",
    Pelatihan: [
      "Pelatihan Pengelolaan Sampah Pesisir",
      "Pelatihan Daur Ulang Sampah Plastik di Laut",
      "Pelatihan Pengurangan Sampah di Kawasan Wisata Bahari",
    ],
  },
];

export const JENIS_PELATIHAN: JenisPelatihan[] = [
  {
    Id: "JP001",
    Name: "Aspirasi",
    Description:
      "Pelatihan Aspirasi pada Kementerian Kelautan dan Perikanan (KKP) merupakan program pelatihan yang bertujuan untuk meningkatkan kapasitas dan kemampuan sumber daya manusia di sektor kelautan dan perikanan. Program ini biasanya melibatkan berbagai pelatihan teknis dan manajerial yang ditujukan untuk nelayan, petani ikan, serta para pelaku usaha di bidang perikanan. Pelatihan ini merupakan kerja sama antara Kementerian Kelautan dan Perikanan (KKP) dengan Komisi IV DPR RI sebagai mitra kerja dengan menggunakan APBN sebagai sumber pembiayaan pelaksanaan pelatihan.",
  },
  {
    Id: "JP002",
    Name: "PNBP/BLU",
    Description:
      "Pelatihan PNBP/BLU merupakan pelatihan yang sumber pembiayaannya berasal dari peserta pelatihan yang ingin mengikuti pelatihan berdasarkan harga yang sudah ditetapkan lalu penghasilan yang diterima tersebut langsung disetorkan ke negara sebeagai Pendapatan Negara Bukan Pajak (PNBP) atau dikelola jika penyelenggaran merupakan Badan Layanan Usaha (BLU) seperti BPPP Tegal.",
  },
  {
    Id: "JP003",
    Name: "Reguler",
    Description:
      "Pelatihan Reguler merupakan pelatihan yang diselenggarakan untuk memenuhi program kerja Kementerian Kelautan dan Perikanan (KKP) yang sumber pembiayaannya berasal dari APBN atau kerja sama dengan pihak luar/organisasi yang bekerja sama dengan KKP dalam meningkatkan kapasitas dan kompetensi masyarakat dalam bidang Kelautan dan Perikanan.",
  },
];

export const PELAKSANAAN_PELATIHAN: PelaksanaanPelatihan[] = [
  {
    Id: "PP001",
    Name: "Online",
    Description:
      "Pelatihan yang dilaksanakan secara daring melalui platform digital. Peserta dapat mengikuti materi pelatihan dari lokasi masing-masing dengan menggunakan perangkat yang terhubung ke internet. Fleksibilitas waktu dan tempat menjadi keunggulan dari metode ini.",
  },
  {
    Id: "PP002",
    Name: "Klasikal",
    Description:
      "Pelatihan yang dilaksanakan secara tatap muka di tempat pelatihan fisik. Metode ini memungkinkan interaksi langsung antara peserta dan instruktur serta antar peserta, sehingga memfasilitasi diskusi dan praktek secara langsung.",
  },
  {
    Id: "PP003",
    Name: "Blended",
    Description:
      "Pelatihan yang menggabungkan metode daring (online) dan tatap muka (klasikal). Peserta dapat mengikuti sebagian materi secara online dan menyelesaikan bagian lain di tempat pelatihan fisik. Metode ini mengoptimalkan keunggulan kedua metode dengan memberikan fleksibilitas serta interaksi langsung.",
  },
];
