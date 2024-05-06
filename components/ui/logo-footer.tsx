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
    </Link>
  );
}
