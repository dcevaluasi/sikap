import {
  EXAM_THRESHOLD,
  PRACTICE_WEIGHT,
  THEORY_WEIGHT,
} from "@/constants/globals";
import { roundUpScore } from "@/components/utils/dpkakp/scoring";
import { UsersUjian } from "@/types/ujian-keahlian-akp";

/* ------------------------------------------------------------------ */
/*  Pure scoring helpers for the "Rekapitulasi Nilai" table.            */
/*  Every formula lives here once, instead of being repeated per cell.  */
/* ------------------------------------------------------------------ */

export type ScoreKey =
  | "NilaiF1B1"
  | "NilaiF1B2"
  | "NilaiF1B3"
  | "NilaiF2B1"
  | "NilaiF3B1"
  | "NilaiF3B2"
  | "NilaiF4B1";

export type FunctionGroup = "f1" | "f2" | "f3" | "f4";

/** Header colours per group, as used in the printed recap. */
export const GROUP_COLORS: Record<FunctionGroup | "base" | "summary", string> = {
  base: "#338BF6",
  f1: "#EA8F02",
  f2: "#625BF9",
  f3: "#0796A6",
  f4: "#16A34A",
  summary: "#595959",
};

/** Rewarding, Updating and TRYOUT exams have a single bagian per function. */
export const isSingleBagianExam = (type = "") =>
  ["Rewarding", "Updating", "TRYOUT"].some((t) => type.includes(t));

/** Only ATKAPIN I (Updating) has a fourth function (F4, stored in NilaiF4B1). */
export const hasF4Exam = (type = "") => type === "ATKAPIN I (Updating)";

/** Level II exams (ANKAPIN II / ATKAPIN II) have no F1B3. */
export const isLevelTwoExam = (type = "") =>
  type === "ANKAPIN II" || type === "ATKAPIN II";

export const isPassing = (value: number) => value >= EXAM_THRESHOLD;

const average = (...values: number[]) =>
  values.reduce((sum, v) => sum + v, 0) / values.length;

export const scoreOf = (peserta: UsersUjian, key: ScoreKey): number =>
  (peserta?.[key] as number) || 0;

/** Theory score of each function (F1, F2, F3, and F4 on ATKAPIN I (Updating)) for one participant. */
export function functionScores(peserta: UsersUjian, type: string) {
  const s = (key: ScoreKey) => scoreOf(peserta, key);

  if (isSingleBagianExam(type)) {
    return {
      f1: s("NilaiF1B1"),
      f2: s("NilaiF2B1"),
      f3: s("NilaiF3B1"),
      f4: hasF4Exam(type) ? s("NilaiF4B1") : undefined,
    };
  }

  return {
    f1: isLevelTwoExam(type)
      ? average(s("NilaiF1B1"), s("NilaiF1B2"))
      : average(s("NilaiF1B1"), s("NilaiF1B2"), s("NilaiF1B3")),
    f2: s("NilaiF2B1"),
    f3: average(s("NilaiF3B1"), s("NilaiF3B2")),
    f4: undefined,
  };
}

/** Theory (cumulative), comprehensive and final score for one participant. */
export function computeRekap(peserta: UsersUjian, type: string) {
  const { f1, f2, f3, f4 } = functionScores(peserta, type);
  const withF4 = hasF4Exam(type);

  const theory = withF4 ? average(f1, f2, f3, f4 || 0) : average(f1, f2, f3);

  const kompreValues = [
    peserta?.NilaiKomprensifF1 || 0,
    peserta?.NilaiKomprensifF2 || 0,
    peserta?.NilaiKomprensifF3 || 0,
  ];
  if (withF4) kompreValues.push(peserta?.NilaiKomprensifF4 || 0);
  const kompre = average(...kompreValues);

  return {
    theory: roundUpScore(theory),
    kompre,
    final: roundUpScore(theory * THEORY_WEIGHT + kompre * PRACTICE_WEIGHT),
  };
}

/* ------------------------------------------------------------------ */
/*  Column layout of the score part of the recap table                  */
/* ------------------------------------------------------------------ */
export type ScoreColumn =
  | {
    kind: "bagian";
    label: string;
    group: FunctionGroup;
    key: ScoreKey;
    /** Firestore suffix used to load the participant's answer history. */
    bagian: string;
    /** Bold, green when passing (used for F2 on multi-bagian exams). */
    emphasize?: boolean;
  }
  | {
    kind: "total";
    label: string;
    group: FunctionGroup;
    value: (peserta: UsersUjian) => number;
  };

export function getScoreColumns(type: string): ScoreColumn[] {
  if (isSingleBagianExam(type)) {
    const columns: ScoreColumn[] = [
      { kind: "bagian", label: "F1", group: "f1", key: "NilaiF1B1", bagian: "F1" },
      { kind: "bagian", label: "F2", group: "f2", key: "NilaiF2B1", bagian: "F2" },
      { kind: "bagian", label: "F3", group: "f3", key: "NilaiF3B1", bagian: "F3" },
    ];
    if (hasF4Exam(type)) {
      columns.push({ kind: "bagian", label: "F4", group: "f4", key: "NilaiF4B1", bagian: "F4" });
    }
    return columns;
  }

  const columns: ScoreColumn[] = [
    { kind: "bagian", label: "F1B1", group: "f1", key: "NilaiF1B1", bagian: "F1B1" },
    { kind: "bagian", label: "F1B2", group: "f1", key: "NilaiF1B2", bagian: "F1B2" },
    { kind: "total", label: "Total F1", group: "f1", value: (p) => functionScores(p, type).f1 },
    { kind: "bagian", label: "F2", group: "f2", key: "NilaiF2B1", bagian: "F2B1", emphasize: true },
    { kind: "bagian", label: "F3B1", group: "f3", key: "NilaiF3B1", bagian: "F3B1" },
    { kind: "bagian", label: "F3B2", group: "f3", key: "NilaiF3B2", bagian: "F3B2" },
    { kind: "total", label: "Total F3", group: "f3", value: (p) => functionScores(p, type).f3 },
  ];

  if (!isLevelTwoExam(type)) {
    columns.splice(2, 0, {
      kind: "bagian",
      label: "F1B3",
      group: "f1",
      key: "NilaiF1B3",
      bagian: "F1B3",
    });
  }
  return columns;
}