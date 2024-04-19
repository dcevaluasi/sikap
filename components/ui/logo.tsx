import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex flex-row gap-2 items-center"
      aria-label="Cruip"
    >
      {/* <svg
        className="w-14 h-14"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            cx="21.152%"
            cy="86.063%"
            fx="21.152%"
            fy="86.063%"
            r="79.941%"
            id="footer-logo"
          >
            <stop stopColor="#4FD1C5" offset="0%" />
            <stop stopColor="#81E6D9" offset="25.871%" />
            <stop stopColor="#338CF5" offset="100%" />
          </radialGradient>
        </defs>
        <rect
          width="32"
          height="32"
          rx="16"
          fill="url(#footer-logo)"
          fillRule="nonzero"
        />
      </svg> */}
      <Image
        className="w-24"
        width={0}
        height={0}
        src={'/images/logo-bppsdm.png'}
        alt="BPPSDM Logo"
      />
    </Link>
  )
}
