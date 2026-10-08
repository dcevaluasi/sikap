"use client";

import Toast from "@/components/toast";
import { dpkakpBaseUrl } from "@/constants/urls";
import { UserInformationDPKAKP } from "@/types/dpkakp";
import axios from "axios";
import Cookies from "js-cookie";
import { LucideClipboardPen } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoGridOutline } from "react-icons/io5";
import { MdOutlineComputer } from "react-icons/md";
import { TbDatabaseEdit } from "react-icons/tb";

// ─── Helpers ────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  if (!name) return "A";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getPageTitle(pathname: string): string {
  if (pathname.includes("/ujian") && !pathname.includes("/tryout")) return "Pelaksanaan Ujian";
  if (pathname.includes("/tryout")) return "Tryout";
  if (pathname.includes("/bank-soal")) return "Bank Soal Ujian";
  if (pathname.includes("/penguji")) return "Database Penguji";
  return "Dashboard";
}

// ─── Tooltip wrapper (shown when sidebar is collapsed) ──────────────────────

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      {children}
      <span
        className="
          pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3
          whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2 py-1
          opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-lg
        "
      >
        {label}
      </span>
    </div>
  );
}

// ─── Nav Item ───────────────────────────────────────────────────────────────

type NavItemProps = {
  href: string;
  icon: JSX.Element;
  label: string;
  active?: boolean;
  isCollapsed: boolean;
};

function NavItem({ href, icon, label, active, isCollapsed }: NavItemProps) {
  return (
    <Tooltip label={isCollapsed ? label : ""}>
      <a
        href={href}
        className={`
          group flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm font-medium
          transition-all duration-200 border border-transparent
          ${active
            ? "bg-blue-500/20 text-white border-blue-400/30 shadow-sm"
            : "text-blue-200/80 hover:bg-white/5 hover:text-white hover:border-white/10"
          }
        `}
      >
        <span
          className={`
            flex-shrink-0 w-5 h-5 transition-transform duration-200
            group-hover:scale-110
            ${active ? "text-blue-300" : ""}
          `}
        >
          {icon}
        </span>
        {!isCollapsed && (
          <span className="truncate transition-all duration-200">{label}</span>
        )}
        {active && !isCollapsed && (
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
        )}
      </a>
    </Tooltip>
  );
}

// ─── Main Layout ─────────────────────────────────────────────────────────────

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPelaksanaanOpen, setIsPelaksanaanOpen] = useState(true);
  const [dataAdmin, setDataAdmin] = useState<UserInformationDPKAKP | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const isPenguji = Cookies.get("IsPUKAKP") === "penguji";
  const isPUKAKP = Cookies.get("IsPUKAKP") ?? "false";

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const handleLogOut = async () => {
    setIsLoggingOut(true);
    await new Promise((r) => setTimeout(r, 400)); // brief visual feedback
    Cookies.remove("XSRF095");
    Cookies.remove("IsPUKAKP");
    Cookies.remove("PUKAKP");
    Cookies.remove("IdUsersDpkakp");
    Cookies.remove("NamaUsersDpkakp");

    Toast.fire({
      icon: "success",
      title: "Berhasil logout dari admin DPKAKP!",
    });

    router.replace("/lembaga/dpkakp/admin/auth/login");
  };

  const fetchAdminData = async () => {
    try {
      const { data } = await axios.get(`${dpkakpBaseUrl}/adminPusat/getAdminPusat`, {
        headers: { Authorization: `Bearer ${Cookies.get("XSRF095")}` },
      });
      setDataAdmin(data.data);
      Cookies.set("PUKAKP", data.data.Nama);
    } catch (error) {
      console.error("Failed to fetch admin data", error);
    }
  };

  const fetchDataPenguji = async () => {
    try {
      const { data } = await axios.get(`${dpkakpBaseUrl}/penguji/getUsersDewan`, {
        headers: { Authorization: `Bearer ${Cookies.get("XSRF095")}` },
      });
      Cookies.set("NamaUsersDpkakp", data?.data?.NamaUsersDpkakp);
      Cookies.set("IdUsersDpkakp", data?.data?.IdUsersDpkakp!);
    } catch (error) {
      console.error("Failed to fetch penguji data", error);
    }
  };

  useEffect(() => {
    isPenguji ? fetchDataPenguji() : fetchAdminData();
  }, []);

  const displayName =
    dataAdmin?.Nama ??
    Cookies.get("NamaUsersDpkakp") ??
    "Admin";
  const displaySub = dataAdmin
    ? `${dataAdmin.Status ? dataAdmin.Status + " · " : ""}${dataAdmin.Nip || dataAdmin.Email}`
    : isPenguji
    ? "Dewan Penguji"
    : "";

  const pageTitle = getPageTitle(pathname);

  // ─── Sidebar content (shared between desktop + mobile) ──────────────────

  const sidebarContent = (
    <>
      {/* Logo + Toggle */}
      <div
        className={`
          flex items-center h-16 px-4 border-b border-white/10
          ${isCollapsed ? "justify-center" : "justify-between"}
        `}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex-shrink-0">
            <Image
              src="/lembaga/logo/logo-sertifikasi-akp.png"
              alt="Logo SIKAP"
              width={36}
              height={36}
              className="rounded-lg"
            />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white leading-tight truncate">SIKAP</p>
              <p className="text-[10px] text-blue-300/80 leading-tight truncate">
                Admin DPKAKP
              </p>
            </div>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className={`
            flex-shrink-0 p-1.5 rounded-lg text-blue-300 hover:text-white
            hover:bg-white/10 transition-all duration-200
            ${isCollapsed ? "hidden" : "block"}
          `}
          title="Tutup sidebar"
        >
          <FaChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Expand button when collapsed */}
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="mx-auto mt-2 flex items-center justify-center p-1.5 rounded-lg text-blue-300
            hover:text-white hover:bg-white/10 transition-all duration-200"
          title="Buka sidebar"
        >
          <FaChevronRight className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-1 space-y-0.5">
        {!isCollapsed && (
          <p className="px-4 mb-2 text-[10px] font-semibold text-blue-400/60 uppercase tracking-widest">
            Menu
          </p>
        )}

        {isPUKAKP === "true" || isPUKAKP === "penguji" ? (
          /* PUKAKP role: single ujian link */
          <NavItem
            href="/lembaga/pukakp/admin/dashboard/ujian"
            icon={<MdOutlineComputer className="w-full h-full" />}
            label="Pelaksanaan Ujian"
            active={pathname.includes("/ujian")}
            isCollapsed={isCollapsed}
          />
        ) : (
          /* DPKAKP role: full menu */
          <>
            {/* Pelaksanaan Ujian group */}
            <Tooltip label={isCollapsed ? "Pelaksanaan Ujian" : ""}>
              <button
                onClick={() => setIsPelaksanaanOpen((prev) => !prev)}
                className={`
                  group flex items-center gap-3 w-full mx-2 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200 border
                  ${pathname.includes("/ujian") || pathname.includes("/tryout")
                    ? "bg-blue-500/20 text-white border-blue-400/30"
                    : "text-blue-200/80 hover:bg-white/5 hover:text-white border-transparent hover:border-white/10"
                  }
                `}
                style={{ width: isCollapsed ? "calc(100% - 1rem)" : "calc(100% - 1rem)" }}
              >
                <span className="flex-shrink-0 w-5 h-5 group-hover:scale-110 transition-transform duration-200">
                  <IoGridOutline className="w-full h-full" />
                </span>
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left truncate">Pelaksanaan Ujian</span>
                    <FaChevronRight
                      className={`w-3 h-3 flex-shrink-0 transition-transform duration-300 ${isPelaksanaanOpen ? "rotate-90" : ""}`}
                    />
                  </>
                )}
              </button>
            </Tooltip>

            {/* Sub-items */}
            {isPelaksanaanOpen && !isCollapsed && (
              <div className="ml-4 pl-3 border-l border-white/10 space-y-0.5 mt-0.5">
                <NavItem
                  href="/lembaga/dpkakp/admin/dashboard/ujian"
                  icon={<MdOutlineComputer className="w-full h-full" />}
                  label="Ujian"
                  active={pathname.includes("/ujian") && !pathname.includes("/tryout")}
                  isCollapsed={isCollapsed}
                />
                <NavItem
                  href="/lembaga/dpkakp/admin/dashboard/tryout"
                  icon={<LucideClipboardPen className="w-full h-full" />}
                  label="Tryout"
                  active={pathname.includes("/tryout")}
                  isCollapsed={isCollapsed}
                />
              </div>
            )}

            {!isCollapsed && (
              <p className="px-4 mt-4 mb-2 text-[10px] font-semibold text-blue-400/60 uppercase tracking-widest">
                Data
              </p>
            )}

            <NavItem
              href="/lembaga/dpkakp/admin/dashboard/bank-soal"
              icon={<TbDatabaseEdit className="w-full h-full" />}
              label="Bank Soal Ujian"
              active={pathname.includes("/bank-soal")}
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/lembaga/dpkakp/admin/dashboard/penguji"
              icon={<HiMiniUserGroup className="w-full h-full" />}
              label="Database Penguji"
              active={pathname.includes("/penguji")}
              isCollapsed={isCollapsed}
            />
          </>
        )}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-white/10 p-3">
        {/* User info */}
        {!isCollapsed && (
          <div className="flex items-center gap-3 mb-3 px-2 py-2 rounded-xl bg-white/5">
            {/* Avatar */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500
              flex items-center justify-center text-white text-xs font-bold shadow">
              {getInitials(displayName)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{displayName}</p>
              <p className="text-[10px] text-blue-300/70 truncate">{displaySub}</p>
            </div>
          </div>
        )}

        {isCollapsed && (
          <Tooltip label={displayName}>
            <div className="mx-auto mb-3 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500
              flex items-center justify-center text-white text-xs font-bold shadow cursor-default">
              {getInitials(displayName)}
            </div>
          </Tooltip>
        )}

        {/* Logout button */}
        <Tooltip label={isCollapsed ? "Logout" : ""}>
          <button
            onClick={handleLogOut}
            disabled={isLoggingOut}
            className={`
              flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium
              text-red-400/90 hover:text-red-300 hover:bg-red-500/10
              transition-all duration-200 border border-transparent hover:border-red-500/20
              ${isLoggingOut ? "opacity-60 cursor-not-allowed" : ""}
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            <FaSignOutAlt
              className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isLoggingOut ? "animate-spin" : ""}`}
            />
            {!isCollapsed && (
              <span>{isLoggingOut ? "Keluar..." : "Keluar"}</span>
            )}
          </button>
        </Tooltip>
      </div>
    </>
  );

  return (
    <div className="h-screen w-full flex bg-gray-50 text-gray-800 overflow-hidden">
      {/* ── Mobile overlay ─────────────────────────────────────── */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ────────────────────────────────────────────── */}
      <aside
        className={`
          fixed lg:relative z-30 flex flex-col h-full
          bg-gradient-to-b from-blue-950 to-blue-900
          shadow-2xl text-white
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-[72px]" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {sidebarContent}
      </aside>

      {/* ── Main ────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Top bar */}
        <header className="flex-shrink-0 flex items-center justify-between h-16 px-6
          bg-white border-b border-gray-200 shadow-sm z-10">
          <div className="flex items-center gap-4">
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700
                hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Page title */}
            <div>
              <h1 className="text-base font-semibold text-gray-800 leading-tight">{pageTitle}</h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                Sistem Informasi Ujian Keahlian Awak Kapal Perikanan
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* User chip */}
            <div className="hidden sm:flex items-center gap-2.5 pl-3 pr-4 py-1.5 rounded-full
              bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors cursor-default">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600
                flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                {getInitials(displayName)}
              </div>
              <div className="leading-tight">
                <p className="text-xs font-semibold text-gray-700 whitespace-nowrap">{displayName}</p>
                {displaySub && (
                  <p className="text-[10px] text-gray-400 whitespace-nowrap">{displaySub}</p>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
