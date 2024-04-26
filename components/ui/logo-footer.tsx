import Image from "next/image";
import Link from "next/link";

export default function LogoFooter() {
  return (
    <Link
      href="/"
      className="flex flex-row gap-2 items-center"
      aria-label="Cruip"
    >
      <Image
        className="w-16 md:w-16"
        width={0}
        height={0}
        src={"/logo-kkp-white.png"}
        alt="Kementrian Kelautan dan Perikanan RI Logo"
      />
      <Image
        className="w-20 md:w-20"
        width={0}
        height={0}
        src={"/images/logo-bppsdm-white.png"}
        alt="BPPSDM Logo"
      />
    </Link>
  );
}