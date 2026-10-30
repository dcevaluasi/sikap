import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BookOpenCheck, Loader2 } from "lucide-react";

import Toast from "@/components/toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { dpkakpBaseUrl } from "@/constants/urls";
import { EXAM_THRESHOLD } from "@/constants/globals";
import { UsersUjian } from "@/types/ujian-keahlian-akp";
import { cn } from "@/lib/utils";
import { isPassing } from "./rekap-scoring";

type FieldKey = "f1" | "f2" | "f3";
type Values = Record<FieldKey, string>;

const FIELDS: { key: FieldKey; label: string }[] = [
  { key: "f1", label: "Fungsi 1 (F1)" },
  { key: "f2", label: "Fungsi 2 (F2)" },
  { key: "f3", label: "Fungsi 3 (F3)" },
];
const EMPTY: Values = { f1: "", f2: "", f3: "" };

/** Accepts "78", "78.5" or "78,5"; returns null when it isn't a score from 0 to 100. */
const parseScore = (raw: string): number | null => {
  if (!raw.trim()) return null;
  const n = Number(raw.replace(",", "."));
  return Number.isFinite(n) && n >= 0 && n <= 100 ? n : null;
};

type Props = {
  /** Participant being graded; the dialog is open while this is set. */
  peserta: UsersUjian | null;
  onClose: () => void;
  /** Called after a successful save (e.g. to refetch the table). */
  onSaved: () => void;
};

export default function NilaiKomprehensifDialog({ peserta, onClose, onSaved }: Props) {
  const [values, setValues] = React.useState<Values>(EMPTY);
  const [touched, setTouched] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const isEditing = !!peserta && peserta.NilaiKomprensifF1 !== 0;

  // Prefill when editing, start empty when grading for the first time.
  React.useEffect(() => {
    if (!peserta) return;
    setValues(
      peserta.NilaiKomprensifF1 !== 0
        ? {
            f1: String(peserta.NilaiKomprensifF1 ?? ""),
            f2: String(peserta.NilaiKomprensifF2 ?? ""),
            f3: String(peserta.NilaiKomprensifF3 ?? ""),
          }
        : EMPTY
    );
    setTouched(false);
  }, [peserta]);

  const parsed = FIELDS.map(({ key }) => parseScore(values[key]));
  const valid = parsed.every((n) => n !== null);
  const average = valid ? (parsed as number[]).reduce((a, b) => a + b, 0) / parsed.length : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!peserta || !valid || submitting) return;

    setSubmitting(true);
    try {
      await axios.post(
        `${dpkakpBaseUrl}/penguji/inputNilaiKompre?id=${peserta.IdUserUjian}`,
        {
          nilai_komprensif_f1: String(parsed[0]),
          nilai_komprensif_f2: String(parsed[1]),
          nilai_komprensif_f3: String(parsed[2]),
        },
        { headers: { Authorization: `Bearer ${Cookies.get("XSRF095")}` } }
      );
      Toast.fire({ icon: "success", title: "Berhasil menyimpan nilai komprehensif peserta ujian!" });
      onSaved();
      onClose();
    } catch (error) {
      console.error(error);
      Toast.fire({ icon: "error", title: "Gagal menyimpan nilai komprehensif, coba lagi." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AlertDialog open={!!peserta} onOpenChange={(open) => !open && !submitting && onClose()}>
      <AlertDialogContent className="w-full max-w-xl gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 shadow-xl">
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <AlertDialogHeader className="border-b border-gray-100 p-6 text-left">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="space-y-1">
                <AlertDialogTitle className="text-xl font-semibold text-gray-900">
                  {isEditing ? "Perbarui" : "Masukkan"} Nilai Komprehensif
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-gray-500">
                  Peserta:{" "}
                  <span className="font-medium capitalize text-gray-800">{peserta?.Nama}</span>
                  {peserta?.NomorUjian && <> · {peserta.NomorUjian}</>}
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>

          <div className="space-y-4 bg-gray-50 px-6 py-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {FIELDS.map(({ key, label }, i) => {
                const invalid = touched && parsed[i] === null;
                return (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label htmlFor={`kompre-${key}`} className="text-sm font-medium text-gray-700">
                      {label} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id={`kompre-${key}`}
                      inputMode="decimal"
                      autoFocus={i === 0}
                      value={values[key]}
                      disabled={submitting}
                      onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                      placeholder="0 – 100"
                      aria-invalid={invalid || undefined}
                      className={cn(
                        "h-11 w-full rounded-xl border bg-white px-3 text-center text-base font-semibold tabular-nums text-gray-900 transition focus:outline-none focus:ring-2",
                        invalid
                          ? "border-rose-400 focus:ring-rose-200"
                          : "border-gray-200 focus:border-blue-400 focus:ring-blue-100"
                      )}
                    />
                    {invalid && <p className="text-xs text-rose-500">Isi angka 0–100</p>}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm">
              <span className="text-gray-500">Rata-rata komprehensif</span>
              {average === null ? (
                <span className="text-gray-400">–</span>
              ) : (
                <span className={cn("font-semibold tabular-nums", isPassing(average) ? "text-green-600" : "text-rose-500")}>
                  {average.toFixed(2)}{" "}
                  <span className="text-xs font-normal text-gray-400">(batas {EXAM_THRESHOLD})</span>
                </span>
              )}
            </div>
          </div>

          <AlertDialogFooter className="gap-2 border-t border-gray-100 p-4 sm:space-x-0">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="h-10 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-70"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {isEditing ? "Perbarui nilai" : "Simpan nilai"}
            </button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
