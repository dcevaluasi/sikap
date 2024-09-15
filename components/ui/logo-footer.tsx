import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LogoFooter() {
  const pathname = usePathname();
  const getLogoHeader = () => {
    return pathname.includes("dpkakp")
      ? "/dpkakp/logo.png"
      : "/logo-kkp-white.png";
  };
  const getSizeLogoHeader = () => {
    return pathname.includes("dpkakp") ? "w-14" : "w-16";
  };
  return (
    <Link
      href="/"
      className="flex flex-row gap-3 items-center"
      aria-label="Cruip"
    >
      <Image
        className={getSizeLogoHeader()}
        width={0}
        height={0}
        src={getLogoHeader()}
        alt="Kementrian Kelautan dan Perikanan RI Logo"
      />
      <Image
        className={getSizeLogoHeader()}
        width={0}
        height={0}
        src={"/images/logo/logo-elaut-color.png"}
        alt="Elektronik Layanan Pelatihan Kelautan dan Perikanan Utama Terpadu"
      />
    </Link>
  );
}
