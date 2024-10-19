import FormRegistrasi from "@/components/auth/FormRegistrasi";

export const metadata = {
  title: "Registrasi E-Laut - Elektronik Layanan Pelatihan Umum Terpadu",
  description:
    "Ayo lakukan registrasi segera ke E-LAUT untuk mengikuti pelatihan dan sertifikasi yang menarik, registrasi sebagai perorangan ataupun corporate/manning agent.",
  keywords: [
    "registrasi E-LAUT",
    "E-LAUT",
    "pendaftaran pelatihan",
    "sertifikasi kelautan",
    "sertifikasi perikanan",
    "pelatihan kelautan",
    "pelatihan perikanan",
    "corporate manning agent",
    "registrasi pelatihan",
    "e-learning kelautan",
    "e-learning perikanan",
    "BPPSDM KP",
    "pendidikan kelautan",
    "pendidikan perikanan",
    "Kementerian Kelautan dan Perikanan",
    "kkp",
    "registrasi pelatihan kelautan",
    "registrasi corporate manning agent",
  ],
  author: "BPPSDM KP",
  robots: "index, follow",
  canonical: "https://elaut-bppsdm.kkp.go.id/registrasi",
  openGraph: {
    title: "Registrasi E-Laut - Elektronik Layanan Pelatihan Umum Terpadu",
    description:
      "Ayo lakukan registrasi segera ke E-LAUT untuk mengikuti pelatihan dan sertifikasi menarik, baik sebagai perorangan ataupun corporate/manning agent.",
    url: "https://elaut-bppsdm.kkp.go.id/registrasi",
    type: "website",
    site_name: "E-LAUT",
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ1qXD5spmbdpPwx426e-daa6Cd23RLxBeFw&s",
        width: 1200,
        height: 630,
        alt: "Registrasi E-LAUT - Elektronik Layanan Pelatihan Umum Terpadu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Registrasi E-LAUT - Elektronik Layanan Pelatihan Umum Terpadu",
    description:
      "Registrasi segera ke E-LAUT untuk pendaftaran pelatihan dan sertifikasi di sektor Kelautan dan Perikanan, baik sebagai individu maupun corporate/manning agent.",
    site: "https://elaut-bppsdm.kkp.go.id/registrasi",
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ1qXD5spmbdpPwx426e-daa6Cd23RLxBeFw&s",
        alt: "Registrasi E-LAUT - Elektronik Layanan Pelatihan Umum Terpadu",
      },
    ],
  },
};

export default function SignUp() {
  return (
    <>
      <FormRegistrasi />
    </>
  );
}
