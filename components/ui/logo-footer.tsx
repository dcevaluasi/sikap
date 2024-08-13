import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LogoFooter() {
  const pathname = usePathname();
  const getLogo = () => {
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
      className="flex flex-row gap-2 items-center"
      aria-label="Cruip"
    >
      {pathname.includes("dpkakp") == false ||
      pathname.includes("akp") == false ? (
        <div className="flex flex-row gap-2 w-full">
          <Image
            className="w-16 md:w-16"
            width={0}
            height={0}
            src={getLogo()}
            alt="Kementrian Kelautan dan Perikanan RI Logo"
          />
          <Image
            className="w-20 md:w-20"
            width={0}
            height={0}
            src={"/images/logo/logo-elaut-color.png"}
            alt="Kementrian Kelautan dan Perikanan RI Logo"
          />
        </div>
      ) : (
        <Image
          className="w-16 md:w-20"
          width={0}
          height={0}
          src={getLogo()}
          alt="Kementrian Kelautan dan Perikanan RI Logo"
        />
      )}
    </Link>
  );
}
