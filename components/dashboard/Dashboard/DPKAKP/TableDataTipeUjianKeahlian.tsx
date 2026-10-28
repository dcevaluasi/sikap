import React from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import Toast from "@/components/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LucideUploadCloud,
  Anchor,
  Settings,
  Search,
  X,
  BookOpen,
  Layers,
  FileQuestion,
  Inbox,
} from "lucide-react";
import { TbDatabase } from "react-icons/tb";
import { TypeUjian } from "@/types/ujian-keahlian-akp";
import { replaceProgramName } from "@/utils/dpkakp";

// ─── Constants & types ────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_DPKAKP_UJIAN_URL;

/** Max parallel "count soal" requests. */
const COUNT_CONCURRENCY = 6;
/** A cached count is shown instantly but re-validated in the background after this. */
const COUNT_TTL_MS = 60_000;
/** Count updates are batched so the table re-renders a few times, not once per request. */
const FLUSH_MS = 80;

const ROMAN_ORDER = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

type GroupKey = "ANKAPIN" | "ATKAPIN" | "OTHER";
const GROUP_KEYS: GroupKey[] = ["ANKAPIN", "ATKAPIN", "OTHER"];

type FungsiT = TypeUjian["Fungsi"][number];
type BagianT = FungsiT["Bagian"][number];

const fmt = (n: number) => n.toLocaleString("id-ID");

const authHeaders = () => ({ Authorization: `Bearer ${Cookies.get("XSRF095")}` });

// ─── Module-level caches (survive navigating away and back) ───────────────────

let typeUjianCache: TypeUjian[] | null = null;
const countCache = new Map<number, { value: number; at: number }>();

const snapshotCounts = () => {
  const out: Record<number, number> = {};
  countCache.forEach((v, k) => {
    out[k] = v.value;
  });
  return out;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGroup(name: string): GroupKey {
  if (name.includes("ANKAPIN")) return "ANKAPIN";
  if (name.includes("ATKAPIN")) return "ATKAPIN";
  return "OTHER";
}

/**
 * Extract the Roman numeral suffix from a name like "ANKAPIN I", "ATKAPIN III".
 * Falls back to the full name if none found.
 */
function extractRoman(name: string): string {
  const match = name.match(/\b(I{1,3}|IV|VI{0,3}|IX|XI{0,3})\b/);
  return match ? match[1] : name;
}

function bagianIdsOf(t: TypeUjian): number[] {
  const ids: number[] = [];
  for (const f of t.Fungsi ?? []) for (const b of f.Bagian ?? []) ids.push(b.IdBagian);
  return ids;
}

const fungsiBagianIds = (f: FungsiT): number[] => (f.Bagian ?? []).map((b) => b.IdBagian);

/** All bagian ids, with the given group first so the visible tab fills in first. */
function collectBagianIds(list: TypeUjian[], firstGroup: GroupKey): number[] {
  const first: number[] = [];
  const rest: number[] = [];
  for (const t of list) {
    (getGroup(t.NamaTypeUjian) === firstGroup ? first : rest).push(...bagianIdsOf(t));
  }
  return [...first, ...rest];
}

async function fetchBagianCount(id: number, signal: AbortSignal): Promise<number> {
  const res = await axios.get(`${BASE_URL}/adminPusat/getBagian`, {
    params: { id },
    headers: authHeaders(),
    signal,
  });
  return res.data?.data?.[0]?.SoalUjianBagian?.length ?? 0;
}

/** Total soal across a set of bagian, from the shared counts map (no extra requests). */
function sumCounts(ids: number[], counts: Record<number, number>) {
  let total = 0;
  let loaded = 0;
  let failed = 0;
  for (const id of ids) {
    const c = counts[id];
    if (c === undefined) continue; // not fetched yet
    loaded += 1;
    if (c < 0) failed += 1; // -1 = failed to load
    else total += c;
  }
  return { total, failed, loading: loaded < ids.length };
}

type SoalSum = ReturnType<typeof sumCounts>;

// ─── Config ───────────────────────────────────────────────────────────────────

const GROUP_CONFIG = {
  ANKAPIN: {
    label: "ANKAPIN",
    fullName: "Ahli Nautika Kapal Penangkap Ikan",
    icon: <Anchor className="w-4 h-4" />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badgeBg: "bg-blue-100 text-blue-700",
    accentBorder: "border-blue-100",
    cardTop: "bg-gradient-to-r from-blue-500 to-blue-700",
    linkClass:
      "hover:bg-blue-500 hover:text-white text-blue-600 border-blue-200 bg-blue-50/60",
    uploadClass: "bg-blue-600 hover:bg-blue-700 text-white",
    tabActive:
      "data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm",
    numBg: "bg-blue-600",
  },
  ATKAPIN: {
    label: "ATKAPIN",
    fullName: "Ahli Teknika Kapal Penangkap Ikan",
    icon: <Settings className="w-4 h-4" />,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badgeBg: "bg-emerald-100 text-emerald-700",
    accentBorder: "border-emerald-100",
    cardTop: "bg-gradient-to-r from-emerald-500 to-emerald-700",
    linkClass:
      "hover:bg-emerald-500 hover:text-white text-emerald-600 border-emerald-200 bg-emerald-50/60",
    uploadClass: "bg-emerald-600 hover:bg-emerald-700 text-white",
    tabActive:
      "data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-sm",
    numBg: "bg-emerald-600",
  },
  OTHER: {
    label: "Lainnya",
    fullName: "",
    icon: <TbDatabase className="w-4 h-4" />,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
    badgeBg: "bg-gray-100 text-gray-700",
    accentBorder: "border-gray-100",
    cardTop: "bg-gradient-to-r from-gray-500 to-gray-700",
    linkClass: "hover:bg-gray-500 hover:text-white text-gray-600 border-gray-200 bg-gray-50/60",
    uploadClass: "bg-gray-600 hover:bg-gray-700 text-white",
    tabActive:
      "data-[state=active]:bg-gray-600 data-[state=active]:text-white data-[state=active]:shadow-sm",
    numBg: "bg-gray-600",
  },
};

type GroupCfg = (typeof GROUP_CONFIG)[GroupKey];

// ─── Hook: soal counts per bagian (cached, deduped, concurrency-limited) ──────

function useBagianCounts() {
  const [counts, setCounts] = React.useState<Record<number, number>>(snapshotCounts);

  const ctrlRef = React.useRef<AbortController | null>(null);
  const inflightRef = React.useRef<Set<number>>(new Set());
  const bufferRef = React.useRef<Record<number, number>>({});
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const flush = React.useCallback(() => {
    timerRef.current = null;
    const batch = bufferRef.current;
    bufferRef.current = {};
    setCounts((prev) => ({ ...prev, ...batch }));
  }, []);

  // One AbortController per mount: leaving the page cancels pending requests.
  React.useEffect(() => {
    ctrlRef.current = new AbortController();
    inflightRef.current = new Set();
    return () => {
      ctrlRef.current?.abort();
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, []);

  const loadCounts = React.useCallback(
    async (ids: number[], force = false) => {
      const ctrl = ctrlRef.current;
      if (!ctrl) return;
      const { signal } = ctrl;
      const inflight = inflightRef.current;
      const now = Date.now();

      // Skip ids that are fresh in cache or already being fetched.
      const queue = Array.from(new Set(ids)).filter((id) => {
        if (!force && inflight.has(id)) return false;
        const hit = countCache.get(id);
        return force || !hit || now - hit.at > COUNT_TTL_MS;
      });
      if (queue.length === 0) return;
      queue.forEach((id) => inflight.add(id));

      const worker = async () => {
        while (queue.length > 0 && !signal.aborted) {
          const id = queue.shift()!;
          try {
            const value = await fetchBagianCount(id, signal);
            countCache.set(id, { value, at: Date.now() });
            bufferRef.current[id] = value;
          } catch (err) {
            if (axios.isCancel(err)) return;
            bufferRef.current[id] = -1; // -1 = failed, not cached so it retries next visit
          } finally {
            inflight.delete(id);
          }
          if (!timerRef.current) timerRef.current = setTimeout(flush, FLUSH_MS);
        }
      };

      await Promise.all(
        Array.from({ length: Math.min(COUNT_CONCURRENCY, queue.length) }, worker)
      );
    },
    [flush]
  );

  return { counts, loadCounts };
}

// ─── Small components ─────────────────────────────────────────────────────────

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200 text-inherit rounded px-0.5">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}

function SkeletonTabs() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Fake stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl border p-5 flex gap-4">
            <div className="w-11 h-11 rounded-xl bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-7 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
      {/* Fake tab bar + search */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
          <div className="h-9 w-32 bg-gray-300 rounded-xl" />
          <div className="h-9 w-32 bg-gray-200 rounded-xl" />
        </div>
        <div className="h-10 w-72 bg-gray-100 rounded-xl hidden md:block" />
      </div>
      {/* Fake table rows */}
      <div className="bg-white rounded-2xl border divide-y">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-6 p-5">
            <div className="h-10 w-1/4 bg-gray-200 rounded-xl" />
            <div className="h-10 w-1/4 bg-gray-100 rounded-xl" />
            <div className="h-10 w-1/4 bg-gray-100 rounded-xl" />
            <div className="h-10 flex-1 bg-gray-100 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  iconBg,
  iconColor,
  progress,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub?: React.ReactNode;
  iconBg: string;
  iconColor: string;
  /** 0–100. Shows a thin progress bar while a value is still being computed. */
  progress?: number;
}) {
  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-start gap-4 overflow-hidden">
      <div
        className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-black text-gray-900 leading-tight tabular-nums">
          {fmt(value)}
        </p>
        {sub && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{sub}</p>}
      </div>
      {progress !== undefined && progress < 100 && (
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gray-100">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

/** Pure display: the count is fetched once by the parent, not per row. */
const SoalCountBadge = React.memo(function SoalCountBadge({
  count,
  cfg,
}: {
  count: number | undefined;
  cfg: GroupCfg;
}) {
  if (count === undefined) {
    return <span className="text-gray-400 text-xs animate-pulse">Memuat...</span>;
  }
  if (count < 0) {
    return (
      <span className="text-gray-400 text-xs" title="Gagal memuat jumlah soal">
        –
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold ${count > 0
        ? `${cfg.badgeBg} ring-1 ring-inset ${cfg.accentBorder}`
        : "bg-gray-100 text-gray-500"
        }`}
    >
      {fmt(count)} Soal
    </span>
  );
});

/** Total soal for a program (pill) or a fungsi (text line), summed from its bagian. */
function TotalSoal({
  sum,
  cfg,
  variant,
}: {
  sum: SoalSum;
  cfg: GroupCfg;
  variant: "pill" | "text";
}) {
  if (sum.loading) {
    return <span className="text-gray-400 text-xs animate-pulse">Menghitung...</span>;
  }

  // If some bagian failed, the total is incomplete: show "1.200+" and explain on hover.
  const partial = sum.failed > 0;
  const title = partial ? `${sum.failed} bagian gagal dimuat, total belum lengkap` : undefined;
  const value = `${fmt(sum.total)}${partial ? "+" : ""} Soal`;

  if (variant === "text") {
    return (
      <span className="text-xs text-gray-500" title={title}>
        Total: <span className="font-semibold text-gray-700 tabular-nums">{value}</span>
      </span>
    );
  }

  return (
    <span
      title={title}
      className={`inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${sum.total > 0
        ? `${cfg.badgeBg} ring-1 ring-inset ${cfg.accentBorder}`
        : "bg-gray-100 text-gray-500"
        }`}
    >
      <FileQuestion className="w-3.5 h-3.5" />
      Total: {value}
    </span>
  );
}

// ─── Table rows for one program ───────────────────────────────────────────────

const ProgramRows = React.memo(function ProgramRows({
  typeUjian,
  cfg,
  counts,
  query,
  onImport,
}: {
  typeUjian: TypeUjian;
  cfg: GroupCfg;
  counts: Record<number, number>;
  query: string;
  onImport: (id: string) => void;
}) {
  const roman = extractRoman(typeUjian.NamaTypeUjian);
  const programTotal = sumCounts(bagianIdsOf(typeUjian), counts);

  const fungsiList: (FungsiT | null)[] = typeUjian.Fungsi?.length ? typeUjian.Fungsi : [null];
  const typeUjianRowSpan = fungsiList.reduce((acc, f) => acc + (f?.Bagian?.length || 1), 0);

  return (
    <>
      {fungsiList.flatMap((fungsi, fIndex) => {
        const bagianList: (BagianT | null)[] = fungsi?.Bagian?.length ? fungsi.Bagian : [null];
        const fungsiRowSpan = bagianList.length;
        const fungsiTotal = sumCounts(fungsi ? fungsiBagianIds(fungsi) : [], counts);

        return bagianList.map((bagian, bIndex) => {
          const isFirstTypeUjianRow = fIndex === 0 && bIndex === 0;
          const isFirstFungsiRow = bIndex === 0;

          return (
            <tr
              key={`${typeUjian.IdTypeUjian}-${fungsi?.IdFungsi || fIndex}-${bagian?.IdBagian || bIndex}`}
              className="hover:bg-gray-50/40 transition-colors"
            >
              {isFirstTypeUjianRow && (
                <td
                  rowSpan={typeUjianRowSpan}
                  className="px-6 py-5 align-top border-r border-gray-200"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-xl ${cfg.numBg} flex items-center justify-center shadow-sm`}
                      >
                        <span className="text-white font-black text-sm">{roman}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm leading-snug">
                          <Highlight text={typeUjian.NamaTypeUjian} query={query} />
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {replaceProgramName(typeUjian.NamaTypeUjian)}
                    </p>
                    <TotalSoal sum={programTotal} cfg={cfg} variant="pill" />
                    <button
                      onClick={() => onImport(typeUjian.IdTypeUjian.toString())}
                      className={`mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm w-fit ${cfg.uploadClass}`}
                    >
                      <LucideUploadCloud className="w-4 h-4" /> Import Bank Soal
                    </button>
                  </div>
                </td>
              )}

              {isFirstFungsiRow && (
                <td
                  rowSpan={fungsiRowSpan}
                  className="px-6 py-5 align-top border-r border-gray-200"
                >
                  {fungsi ? (
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Fungsi {fIndex + 1}
                      </span>
                      <span className="text-sm font-semibold text-gray-700 leading-snug">
                        {fungsi.NamaFungsi}
                      </span>
                      <TotalSoal sum={fungsiTotal} cfg={cfg} variant="text" />
                    </div>
                  ) : (
                    <span className="text-gray-400 italic text-xs">Belum ada fungsi</span>
                  )}
                </td>
              )}

              <td className="px-6 py-4 align-middle border-r border-gray-200">
                {bagian ? (
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg ${cfg.iconBg}`}>
                      <TbDatabase className={`w-4 h-4 ${cfg.iconColor}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{bagian.NamaBagian}</span>
                  </div>
                ) : (
                  <span className="text-gray-400 italic text-xs">Belum ada bagian</span>
                )}
              </td>

              <td className="px-6 py-4 align-middle text-center border-r border-gray-200">
                {bagian ? <SoalCountBadge count={counts[bagian.IdBagian]} cfg={cfg} /> : "-"}
              </td>

              <td className="px-6 py-4 align-middle text-right">
                {bagian && (
                  <Link
                    href={`/lembaga/dpkakp/admin/dashboard/bank-soal/${typeUjian.IdTypeUjian}/${bagian.IdBagian}`}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border transition-all hover:shadow-sm ${cfg.linkClass}`}
                  >
                    Lihat Soal
                  </Link>
                )}
              </td>
            </tr>
          );
        });
      })}
    </>
  );
});

// ─── Main Component ────────────────────────────────────────────────────────────

const TableDataTipeUjianKeahlian: React.FC = () => {
  // Start from cache when we have it: revisiting the page renders instantly.
  const [data, setData] = React.useState<TypeUjian[]>(() => typeUjianCache ?? []);
  const [isFetching, setIsFetching] = React.useState(typeUjianCache === null);
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [fileExcel, setFileExcel] = React.useState<File | null>(null);
  const [selectedIdTypeUjian, setSelectedIdTypeUjian] = React.useState("");
  const [isUploading, setIsUploading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<GroupKey>("ANKAPIN");
  const [query, setQuery] = React.useState("");

  // Keeps typing responsive: filtering runs on the deferred value.
  const deferredQuery = React.useDeferredValue(query);
  const isSearching = deferredQuery.trim() !== "";

  const { counts, loadCounts } = useBagianCounts();

  const activeTabRef = React.useRef(activeTab);
  activeTabRef.current = activeTab;

  // ── Data ────────────────────────────────────────────────────────────────────

  const fetchData = React.useCallback(async (silent = false): Promise<TypeUjian[] | null> => {
    if (!silent) setIsFetching(true);
    try {
      const res = await axios.get(`${BASE_URL}/adminPusat/getTypeUjian`, {
        headers: authHeaders(),
      });
      const list: TypeUjian[] = res.data?.data ?? [];
      typeUjianCache = list;
      setData(list);
      return list;
    } catch (e) {
      console.error("Error fetching tipe ujian:", e);
      return null;
    } finally {
      setIsFetching(false);
    }
  }, []);

  // Cached data → refresh quietly in the background. No cache → show skeleton.
  React.useEffect(() => {
    fetchData(typeUjianCache !== null);
  }, [fetchData]);

  // Whenever the program list changes, fill in soal counts (visible tab first).
  React.useEffect(() => {
    if (data.length === 0) return;
    loadCounts(collectBagianIds(data, activeTabRef.current));
  }, [data, loadCounts]);

  const handleUpload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!fileExcel) return;
    setIsUploading(true);
    const form = new FormData();
    form.append("IdTypeUjian", selectedIdTypeUjian);
    form.append("file", fileExcel);
    try {
      await axios.post(`${BASE_URL}/importUjian`, form);
      Toast.fire({ icon: "success", title: "Berhasil mengupload bank soal ujian keahlian!" });
    } catch {
      Toast.fire({ icon: "error", title: "Gagal mengupload bank soal ujian keahlian!" });
    } finally {
      setIsUploading(false);
      setIsOpenDialog(false);
      setFileExcel(null);
    }

    // Refresh quietly (no skeleton flash) and recount only the program we just imported into.
    const list = await fetchData(true);
    const imported = (list ?? data).find((t) => t.IdTypeUjian.toString() === selectedIdTypeUjian);
    if (imported) loadCounts(bagianIdsOf(imported), true);
  };

  const openImport = React.useCallback((id: string) => {
    setSelectedIdTypeUjian(id);
    setIsOpenDialog(true);
  }, []);

  // ── Derived data ────────────────────────────────────────────────────────────

  // Group & sort by Roman numeral
  const grouped = React.useMemo(() => {
    const groups: Record<GroupKey, TypeUjian[]> = { ANKAPIN: [], ATKAPIN: [], OTHER: [] };
    data.forEach((item) => groups[getGroup(item.NamaTypeUjian)].push(item));
    GROUP_KEYS.forEach((key) => {
      groups[key].sort((a, b) => {
        const ai = ROMAN_ORDER.indexOf(extractRoman(a.NamaTypeUjian));
        const bi = ROMAN_ORDER.indexOf(extractRoman(b.NamaTypeUjian));
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      });
    });
    return groups;
  }, [data]);

  // Lowercased searchable text per program, built once per data change (not per keystroke).
  const searchIndex = React.useMemo(() => {
    const index = new Map<TypeUjian["IdTypeUjian"], string>();
    data.forEach((t) => {
      const parts: string[] = [t.NamaTypeUjian, String(replaceProgramName(t.NamaTypeUjian) ?? "")];
      (t.Fungsi ?? []).forEach((f) => {
        parts.push(f.NamaFungsi);
        (f.Bagian ?? []).forEach((b) => parts.push(b.NamaBagian));
      });
      index.set(t.IdTypeUjian, parts.join("\n").toLowerCase());
    });
    return index;
  }, [data]);

  const filteredGrouped = React.useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (!q) return grouped;
    const out: Record<GroupKey, TypeUjian[]> = { ANKAPIN: [], ATKAPIN: [], OTHER: [] };
    GROUP_KEYS.forEach((key) => {
      out[key] = grouped[key].filter((t) => searchIndex.get(t.IdTypeUjian)?.includes(q));
    });
    return out;
  }, [grouped, searchIndex, deferredQuery]);

  const availableTabs = React.useMemo(
    () => GROUP_KEYS.filter((g) => filteredGrouped[g].length > 0),
    [filteredGrouped]
  );

  const matchedCount = availableTabs.reduce((n, g) => n + filteredGrouped[g].length, 0);

  // Keep the active tab valid when data arrives or the search narrows the results.
  React.useEffect(() => {
    if (availableTabs.length > 0 && !availableTabs.includes(activeTab)) {
      setActiveTab(availableTabs[0]);
    }
  }, [availableTabs, activeTab]);

  const stats = React.useMemo(() => {
    let totalFungsi = 0;
    let totalBagian = 0;
    let loaded = 0;
    let failed = 0;
    let totalSoal = 0;
    let emptyBagian = 0;
    const soalPerGroup: Record<GroupKey, number> = { ANKAPIN: 0, ATKAPIN: 0, OTHER: 0 };

    data.forEach((t) => {
      const group = getGroup(t.NamaTypeUjian);
      (t.Fungsi ?? []).forEach((f) => {
        totalFungsi += 1;
        (f.Bagian ?? []).forEach((b) => {
          totalBagian += 1;
          const c = counts[b.IdBagian];
          if (c === undefined) return;
          loaded += 1;
          if (c < 0) {
            failed += 1;
            return;
          }
          totalSoal += c;
          soalPerGroup[group] += c;
          if (c === 0) emptyBagian += 1;
        });
      });
    });

    return {
      totalProgram: data.length,
      totalFungsi,
      totalBagian,
      loaded,
      failed,
      totalSoal,
      emptyBagian,
      soalPerGroup,
      isCounting: loaded < totalBagian,
      progress: totalBagian ? (loaded / totalBagian) * 100 : 100,
    };
  }, [data, counts]);

  const groupSummary = (values: Record<GroupKey, number>) =>
    GROUP_KEYS.filter((g) => grouped[g].length > 0)
      .map((g) => `${GROUP_CONFIG[g].label} ${fmt(values[g])}`)
      .join(", ");

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Upload Dialog ─────────────────────────────────────────────── */}
      <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-100">
                <TbDatabase className="h-4 w-4 text-blue-600" />
              </div>
              Import Bank Soal Ujian
            </AlertDialogTitle>
            <AlertDialogDescription>
              Upload file Excel yang berisi soal ujian. Pastikan format sesuai template.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              File Soal <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setFileExcel(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-600
                file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0
                file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 border border-gray-200 rounded-xl p-2 cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              * Download template, isi data, lalu upload file Excel (.xlsx)
            </p>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUploading}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleUpload}
              disabled={!fileExcel || isUploading}
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <LucideUploadCloud className="w-4 h-4" />
              {isUploading ? "Mengupload..." : "Upload"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Content ───────────────────────────────────────────────────── */}
      {isFetching ? (
        <SkeletonTabs />
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <TbDatabase className="w-12 h-12 mb-4 opacity-30" />
          <p className="font-medium">Belum ada data bank soal</p>
          <p className="text-sm mt-1 opacity-70">Data tipe ujian keahlian belum tersedia</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* ── Stat cards ──────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
              icon={<FileQuestion className="w-5 h-5" />}
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
              label="Total bank soal"
              value={stats.totalSoal}
              progress={stats.isCounting ? stats.progress : undefined}
              sub={
                stats.isCounting
                  ? `Menghitung ${stats.loaded} dari ${stats.totalBagian} bagian...`
                  : stats.failed > 0
                    ? `${stats.failed} bagian gagal dimuat`
                    : groupSummary(stats.soalPerGroup)
              }
            />
            <StatCard
              icon={<BookOpen className="w-5 h-5" />}
              iconBg="bg-emerald-100"
              iconColor="text-emerald-600"
              label="Total program"
              value={stats.totalProgram}
              sub={groupSummary({
                ANKAPIN: grouped.ANKAPIN.length,
                ATKAPIN: grouped.ATKAPIN.length,
                OTHER: grouped.OTHER.length,
              })}
            />
            <StatCard
              icon={<Layers className="w-5 h-5" />}
              iconBg="bg-violet-100"
              iconColor="text-violet-600"
              label="Total bagian"
              value={stats.totalBagian}
              sub={`Dari ${fmt(stats.totalFungsi)} fungsi`}
            />
            <StatCard
              icon={<Inbox className="w-5 h-5" />}
              iconBg="bg-amber-100"
              iconColor="text-amber-600"
              label="Bagian belum ada soal"
              value={stats.emptyBagian}
              sub={
                stats.isCounting
                  ? "Menghitung..."
                  : stats.emptyBagian === 0
                    ? "Semua bagian sudah terisi"
                    : "Import bank soal untuk melengkapi"
              }
            />
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as GroupKey)}
            className="space-y-6"
          >
            {/* ── Toolbar: tab bar + search ───────────────────────────── */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              {availableTabs.length > 0 && (
                <TabsList className="flex w-fit gap-1 p-1.5 bg-gray-100/80 rounded-2xl border border-gray-200 h-auto">
                  {availableTabs.map((tabKey) => {
                    const cfg = GROUP_CONFIG[tabKey];
                    return (
                      <TabsTrigger
                        key={tabKey}
                        value={tabKey}
                        className={`
                          flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                          text-gray-500 transition-all duration-200
                          data-[state=inactive]:hover:bg-white data-[state=inactive]:hover:text-gray-700
                          data-[state=inactive]:hover:shadow-sm
                          ${cfg.tabActive}
                        `}
                      >
                        {cfg.icon}
                        {cfg.label}
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === tabKey
                            ? "bg-white/25 text-white"
                            : "bg-gray-200 text-gray-500"
                            }`}
                        >
                          {filteredGrouped[tabKey].length}
                        </span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              )}

              <div className="relative w-full md:w-80 md:ml-auto">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setQuery("");
                  }}
                  placeholder="Cari program (tipe ujian)..."
                  aria-label="Cari program tipe ujian"
                  className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-gray-200 rounded-xl shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Hapus pencarian"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {isSearching && matchedCount > 0 && (
              <p className="text-xs text-gray-500 -mt-3">
                {matchedCount} dari {data.length} program cocok dengan &ldquo;{deferredQuery.trim()}
                &rdquo;
              </p>
            )}

            {/* ── No search results ───────────────────────────────────── */}
            {availableTabs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-200">
                <Search className="w-10 h-10 mb-3 opacity-30" />
                <p className="font-medium text-gray-600">
                  Tidak ada program untuk &ldquo;{deferredQuery.trim()}&rdquo;
                </p>
                <p className="text-sm mt-1">Coba kata kunci lain, misalnya nama program atau bagian.</p>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="mt-4 px-4 py-2 text-xs font-semibold rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Hapus pencarian
                </button>
              </div>
            )}

            {/* ── Tab content ─────────────────────────────────────────── */}
            {availableTabs.map((tabKey) => {
              const cfg = GROUP_CONFIG[tabKey];
              const items = filteredGrouped[tabKey];

              return (
                <TabsContent key={tabKey} value={tabKey} className="mt-0 focus-visible:outline-none">
                  {/* Sub-header */}
                  <div className="flex items-center gap-3 mb-5">
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">{cfg.label}</span>
                      {cfg.fullName && ` — ${cfg.fullName}`}
                    </p>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                      {items.length} program
                    </span>
                  </div>

                  {/* Table View */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal border-collapse">
                        <thead className="bg-gray-50/80 text-gray-500 font-semibold border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-4 w-[25%] border-r border-gray-200">
                              Program (Tipe Ujian)
                            </th>
                            <th className="px-6 py-4 w-[25%] border-r border-gray-200">Fungsi</th>
                            <th className="px-6 py-4 w-[25%] border-r border-gray-200">Bagian</th>
                            <th className="px-6 py-4 text-center border-r border-gray-200">
                              Total Soal
                            </th>
                            <th className="px-6 py-4 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {items.map((typeUjian) => (
                            <ProgramRows
                              key={typeUjian.IdTypeUjian}
                              typeUjian={typeUjian}
                              cfg={cfg}
                              counts={counts}
                              query={deferredQuery}
                              onImport={openImport}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      )}
    </>
  );
};

export default TableDataTipeUjianKeahlian;