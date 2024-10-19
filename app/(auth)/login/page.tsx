import FormLogin from "@/components/auth/FormLogin";

export const metadata = {
  title: "Login E-LAUT - Elektronik Layanan Pelatihan Umum Terpadu",
  description:
    "Ayo login segera ke E-LAUT untuk dapat melakukan pendaftaran pelatihan dan sertifikasi yang menarik, login sebagai perorangan ataupun corporate/manning agent.",
  keywords: [
    "login E-LAUT",
    "E-LAUT",
    "registrasi pelatihan",
    "sertifikasi kelautan",
    "sertifikasi perikanan",
    "pelatihan kelautan",
    "pelatihan perikanan",
    "corporate manning agent",
    "pendaftaran pelatihan",
    "e-learning kelautan",
    "e-learning perikanan",
    "BPPSDM KP",
    "pendidikan kelautan",
    "pendidikan perikanan",
    "Kementerian Kelautan dan Perikanan",
    "kementerian kelautan dan perikanan",
    "kkp",
    "login pendaftaran pelatihan",
  ],
  author: "BPPSDM KP",
  robots: "index, follow",
  canonical: "https://elaut-bppsdm.kkp.go.id/login",
  openGraph: {
    title: "Login E-LAUT - Elektronik Layanan Pelatihan Umum Terpadu",
    description:
      "Ayo login segera ke E-LAUT untuk melakukan pendaftaran pelatihan dan sertifikasi, baik untuk perorangan maupun corporate/manning agent.",
    url: "https://elaut-bppsdm.kkp.go.id/login",
    type: "website",
    site_name: "E-LAUT",
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ1qXD5spmbdpPwx426e-daa6Cd23RLxBeFw&s",
        width: 1200,
        height: 630,
        alt: "Login E-LAUT - Elektronik Layanan Pelatihan Umum Terpadu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Login E-LAUT - Elektronik Layanan Pelatihan Umum Terpadu",
    description:
      "Login ke E-LAUT untuk pendaftaran pelatihan dan sertifikasi di sektor Kelautan dan Perikanan, untuk individu maupun corporate/manning agent.",
    site: "https://elaut-bppsdm.kkp.go.id/login",
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ1qXD5spmbdpPwx426e-daa6Cd23RLxBeFw&s",
        alt: "Login E-LAUT - Elektronik Layanan Pelatihan Umum Terpadu",
      },
    ],
  },
};

export default function SignUp() {
  return (
    <>
      <FormLogin />
    </>
  );
}
