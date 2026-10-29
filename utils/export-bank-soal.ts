import * as XLSX from "xlsx";
import type { SoalUjianBagian } from "@/types/ujian-keahlian-akp";

/** kode_materi -> "<kode> <nama materi>" */
export const MATERI_CODES: Record<string, string> = {
  "AT.1.1": "AT.1.1 Pengoperasian mesin-mesin penggerak (Manage the operation of propulsion plant machinery)",
  "AT.1.2": "AT.1.2 Merencanakan dan Menjadwalkan Kegiatan Operasional (Plan and schedule operations)",
  "AT.1.3": "AT.1.3 Pengoperasian, Pengawasan, Penilaian Kinerja, dan Pemeliharaan Instalasi mesin penggerak serta Mesin-Mesin Bantu (Operation, surveillance, performance assessment and maintaining safety of propulsion plant and auxiliary machinery)",
  "AT.1.4": "AT.1.4 Operasi Bahan bakar, Pelumas dan Operasional Ballast (Manage fuel, lubrication and ballast operations)",
  "AT.2.1": "AT.2.1 Operasi Kelistrikan dan peralatan kontrol elektronik (Manage operation of electrical and electronic control equipment)",
  "AT.2.2": "AT.2.2 Pemecahan masalah, Tindakan korektif peralatan kontrol kelistrikan dan elektronik ke kondisi normal (Manage troubleshooting, restoration of electrical and electronic control equipment to operating condition)",
  "AT.3.1": "AT.3.1 Prosedur perawatan dan perbaikan yang efektif (Manage safe and effective maintenance and repair procedures)",
  "AT.3.2": "AT.3.2 Pendeteksian dan identifikasi kegagalan fungsi serta tindakan perbaikan (Detect and identify the cause of machinery malfunction and correct faults)",
  "AT.3.3": "AT.3.3 Praktik keselamatan kerja (Ensure safe working practices)",
  "AT.4.1": "AT.4.1 Stabilitas (Control trim and stability)",
  "AT.4.2": "AT.4.2 Keselamatan awak kapal dan operasional peralatan keselamatan serta pemadam kebakaran (Maintain safety of the vessel and crew and the operational condition of lifesaving and fire fighting appliances)",
  "AT.4.3": "AT.4.3 Membangun kesiapsiagaan dan penanganan kondisi darurat (Develop emergency and damage control plans and handle emergency situations)",
  "AT.4.4": "AT.4.4 Shipboard Personnel Management And Training",
  "AT.4.5": "AT.4.5 Related international maritime conventions, recommendations and national legislation",
  "AT.4.6": "AT.4.6 Task and Workload Management",
  "AT.4.7": "AT.4.7 Application of effective resource management at a management level",
  "AT.4.8": "AT.4.8 Decision Making Technique",
  "AN.1.1": "AN.1.1 Merencanakan Pelayaran dan Melaksanakan Navigasi (Plan Voyage and Conduct Navigation)",
  "AN.1.2": "AN.1.2 Menentukan Posisi dan Akurasi hasil Penentuan Posisi dengan berbagai metode (Determining the Position and Accuracy of Positioning by Any Means)",
  "AN.1.3": "AN.1.3 Menentukan dan Memperhitungkan Kesalahan Pedoman Kompas",
  "AN.1.4": "AN.1.4 Koordinasi Operasi Pencarian dan Penyelamatan (Coordinate search and Rescue Operations)",
  "AN.1.5": "AN.1.5 Menerapkan Pengaturan dan Prosedur Dinas Jaga (Establish Watchkeeping Arrangement and Procedures)",
  "AN.1.6": "AN.1.6 Memperkirakan Kondisi Cuaca dan Oseanografi (Forecast Weather and Oceanografic Conditions)",
  "AN.1.7": "AN.1.7 Menanggapi Keadaan Darurat (Respond to Navigation Emergency)",
  "AN.1.8": "AN.1.8 Olah Gerak dan Pengendalian Kapal Penangkap Ikan (Fishing Vessel Manouvering and Handling)",
  "AN.1.9": "AN.1.9 Permesinan Kapal Perikanan (Fishing Vessel Power Plant)",
  "AN.1.10": "AN.1.10 Menjaga keselamatan navigasi melalui penggunaan informasi dari peralatan dan sistem navigasi untuk membantu pengambilan keputusan komando Mengoperasikan Radar (Operate Radar)",
  "AN.1.11": "AN.1.11 Menjaga keselamatan navigasi melalui penggunaan informasi ECDIS dan sistem navigasi untuk membantu pengambilan keputusan komando",
  "AN.1.12": "AN.1.12 Penggunaan IMO Standard Marine Communication Phrases dan penggunaan bahasa Inggris dalam forum tertulis maupun lisan",
  "AN.1.13": "AN.1.13 Mengirim dan menerima informasi isyarat visual (Transmit and Receuve information by visual signaling)",
  "AN.2.1": "AN.2.1 Penanganan dan Penyimpanan Hasil Tangkapan (Catch Handling and Stowage)",
  "AN.3.1": "AN.3.1 Kontrol Trim dan Stabilitas (Control Trim and Stability)",
  "AN.3.2": "AN.3.2 Memantau dan Memastikan kepatuhan yang berlaku serta penerapan langkah-langkah yang diperlukan untuk menjamin keselamatan jiwa di laut dan melindungi lingkungan laut",
  "AN.3.3": "AN.3.3 Menjaga Keselamatan Awak Kapal dan Kondisi Operasional alat penyelamat jiwa serta pemadaman kebakaran (maintain safety of the vessel's crew and the operational condition of life-saving and fire-fighring appliances)",
  "AN.3.4": "AN.3.4 Mengatur dan Mengelola Penyediaan Peralatan Medis diatas Kapal Perikanan (organize and manege the provision on medical care on board)",
};

// matches a leading code such as "AT.1.1" or "AN.1.13"
const CODE_PREFIX = /^A[TN]\.\d+\.\d+/i;

const normalize = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();
// removes the trailing "(English translation)" part
const stripParen = (s: string) => s.replace(/\s*\([^()]*\)\s*$/, "");
// removes the leading code (and separator) from a label
const stripCode = (s: string) =>
  s.trim().replace(CODE_PREFIX, "").replace(/^[\s\-–:]+/, "").trim();

// every way a materi can be written (with/without code, with/without English) -> kode
const NAME_TO_CODE = new Map<string, string>();
Object.entries(MATERI_CODES).forEach(([code, label]) => {
  const name = stripCode(label);
  NAME_TO_CODE.set(normalize(label), code);
  NAME_TO_CODE.set(normalize(name), code);
  const short = normalize(stripParen(name));
  if (!NAME_TO_CODE.has(short)) NAME_TO_CODE.set(short, code);
});

/** Returns the kode_materi for a materi value. Empty string if not found. */
export const getKodeMateri = (materi?: string | null): string => {
  if (!materi) return "";
  const trimmed = materi.trim();
  // value starts with a code, e.g. "AN.1.13" or "AN.1.13 Mengirim dan menerima ..."
  const prefix = trimmed.match(CODE_PREFIX);
  if (prefix) return prefix[0].toUpperCase();
  return (
    NAME_TO_CODE.get(normalize(trimmed)) ??
    NAME_TO_CODE.get(normalize(stripParen(trimmed))) ??
    ""
  );
};

/**
 * Label for the UI: "AT.1.1 Pengoperasian mesin-mesin penggerak (...)".
 * - name only            -> code is added in front
 * - code + name already  -> returned in the same format (no double code)
 * - code only            -> full label is taken from MATERI_CODES
 * - unknown name         -> returned unchanged
 */
export const formatMateriLabel = (materi?: string | null): string => {
  if (!materi) return "";
  const trimmed = materi.trim();
  const code = getKodeMateri(trimmed);
  if (!code) return trimmed;

  if (CODE_PREFIX.test(trimmed)) {
    const rest = stripCode(trimmed);
    return rest ? `${code} ${rest}` : MATERI_CODES[code] ?? code;
  }

  return `${code} ${trimmed}`;
};

export interface BankSoalFileInfo {
  tipeUjian?: string | null; // e.g. "ANKAPIN I (Updating)"
  bagian?: string | null; // e.g. "F1"
}

// keeps spaces and parentheses, removes characters that are not allowed in file names
const cleanFileSegment = (s?: string | null) =>
  (s ?? "").replace(/[\\/:*?"<>|]+/g, " ").replace(/\s+/g, " ").trim();

/** "<tipe ujian>_<bagian>.xlsx", e.g. "ANKAPIN I (Updating)_F1.xlsx" */
export const buildBankSoalFileName = (info: BankSoalFileInfo = {}): string => {
  const tipeUjian = cleanFileSegment(info.tipeUjian);
  const bagian = cleanFileSegment(info.bagian);
  const parts = [tipeUjian || "bank-soal", bagian].filter(Boolean);
  return `${parts.join("_").slice(0, 150)}.xlsx`;
};

// tipe ujian names look like "ANKAPIN I (Updating)" / "ATKAPIN II"
const TIPE_UJIAN_PATTERN = /^(AN|AT)KAPIN\b/i;

/**
 * Searches any object (e.g. the Bagian data from the API) for the tipe ujian name,
 * so it works whatever the field is called. Returns "" if none is found.
 */
export const findTipeUjianName = (source: unknown, depth = 0): string => {
  if (typeof source === "string") {
    const value = source.trim();
    return TIPE_UJIAN_PATTERN.test(value) ? value : "";
  }
  if (!source || typeof source !== "object" || depth > 4) return "";

  for (const [key, value] of Object.entries(source as Record<string, unknown>)) {
    if (key === "SoalUjianBagian") continue; // skip the (large) soal list
    const found = findTipeUjianName(value, depth + 1);
    if (found) return found;
  }
  return "";
};

/** Downloads all soal as .xlsx: no, soal, gambar_soal, jawaban_benar, A, B, C, D, kode_materi */
export const downloadBankSoalExcel = (
  soalList: SoalUjianBagian[],
  fileInfo: BankSoalFileInfo = {}
) => {
  const header = [
    "no",
    "soal",
    "gambar_soal",
    "jawaban_benar",
    "A",
    "B",
    "C",
    "D",
    "kode_materi",
  ];

  const rows = soalList.map((soal, index) => ({
    no: index + 1,
    soal: soal.Soal ?? "",
    gambar_soal: soal.GambarSoal ?? "",
    jawaban_benar: soal.JawabanBenar ?? "",
    A: soal.Jawaban?.[1]?.NameJawaban ?? "",
    B: soal.Jawaban?.[2]?.NameJawaban ?? "",
    C: soal.Jawaban?.[3]?.NameJawaban ?? "",
    D: soal.Jawaban?.[4]?.NameJawaban ?? "",
    kode_materi: getKodeMateri(soal.Materi),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows, { header });
  worksheet["!cols"] = [
    { wch: 5 },
    { wch: 60 },
    { wch: 35 },
    { wch: 14 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 14 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Soal");

  XLSX.writeFile(workbook, buildBankSoalFileName(fileInfo));
};