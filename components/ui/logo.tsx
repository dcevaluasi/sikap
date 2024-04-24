import Image from "next/image";
import Link from "next/link";

export default function Logo() {
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
        src={"/logo-elaut.png"}
        alt="ELAUT Logo"
      />
      <Image
        className="w-20 md:w-20"
        width={0}
        height={0}
        src={"/images/logo-bppsdm.png"}
        alt="BPPSDM Logo"
      />
    </Link>
  );
}
