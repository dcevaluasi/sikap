import React from "react";

import { UserInformationDPKAKP } from "@/types/dpkakp";
import { Ujian, UsersUjian } from "@/types/ujian-keahlian-akp";
import { checkLulus, countLulus } from "@/components/utils/dpkakp/scoring";
import { generateTanggalPelatihan, shortenName } from "@/utils/text";
import { cn } from "@/lib/utils";
import HeaderDPAKP from "./HeaderDPKAKP";
import { computeRekap, getScoreColumns, GROUP_COLORS, isPassing, ScoreColumn, scoreOf } from "./rekap-scoring";


const KETUA_DPKAKP = "Achmad Subijakto, A.Pi., MP.";
/** Rows per printed page before a page break is inserted. */
const ROWS_PER_PAGE = 25;

const cell = "border border-gray-400 px-2 py-3 text-center align-middle";
const passColor = (value: number) => (isPassing(value) ? "text-green-600" : "text-rose-500");

type Props = {
  ujian: Ujian;
  peserta: UsersUjian[];
  dataPukakp: UserInformationDPKAKP | null;
  /** Opens the answer history of one participant for one bagian. */
  onShowHistory: (idUserUjian: number, bagian: string) => void;
};

function ScoreCell({
  column,
  peserta,
  onShowHistory,
}: {
  column: ScoreColumn;
  peserta: UsersUjian;
  onShowHistory: Props["onShowHistory"];
}) {
  if (column.kind === "total") {
    const value = column.value(peserta);
    return <td className={cn(cell, "font-bold", passColor(value))}>{value.toFixed(2)}</td>;
  }

  const value = scoreOf(peserta, column.key);
  const tone =
    value === 0
      ? "bg-rose-500 font-semibold text-white"
      : !isPassing(value)
        ? "text-rose-500"
        : column.emphasize
          ? "text-green-600"
          : "text-black";

  return (
    <td className={cn(cell, "p-0", tone, column.emphasize && "font-bold")}>
      <button
        type="button"
        title={`Lihat riwayat jawaban ${column.label}`}
        onClick={() => onShowHistory(peserta.IdUserUjian, column.bagian)}
        className="h-full w-full px-2 py-3 transition-colors duration-300 hover:bg-blue-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
      >
        {value}
      </button>
    </td>
  );
}

function Signature({ title, subtitle, name, nip }: { title: string; subtitle?: string; name?: string; nip?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center capitalize">
      <p className="text-sm font-semibold leading-none">{title}</p>
      {subtitle && <p className="text-xs">{subtitle}</p>}
      <p className="mt-14 w-full min-w-48 border-b border-black pb-5 text-sm">{name}</p>
      {nip && <p className="text-sm">NIP. {nip}</p>}
    </div>
  );
}

/** Printable recap of all scores; the ref is used for the PDF export. */
const RekapitulasiNilai = React.forwardRef<HTMLDivElement, Props>(
  ({ ujian, peserta, dataPukakp, onShowHistory }, ref) => {
    const type = ujian.TypeUjian ?? "";
    const scoreColumns = getScoreColumns(type);
    const summary = countLulus(peserta, ujian);

    const headerCell = "border border-gray-400 px-2 py-3 text-center font-semibold leading-tight text-white";

    return (
      <div ref={ref} className="bg-white p-6 text-black">
        <div className="flex flex-col items-center">
          <HeaderDPAKP />

          <h2 className="mt-5 text-center text-lg font-bold leading-tight">
            DAFTAR NILAI HASIL UJIAN KEAHLIAN AWAK KAPAL PERIKANAN
            <br />
            TINGKAT SERTIFIKAT : {type}
          </h2>

          <dl className="mt-3 grid w-full grid-cols-[max-content_auto_1fr] gap-x-2 gap-y-1 text-sm capitalize">
            <dt className="font-semibold">Tanggal Pelaksanaan</dt>
            <dd>:</dd>
            <dd>
              {generateTanggalPelatihan(ujian.TanggalMulaiUjian)} -{" "}
              {generateTanggalPelatihan(ujian.TanggalBerakhirUjian)}
            </dd>
            <dt className="font-semibold">Lokasi Pelaksanaan</dt>
            <dd>:</dd>
            <dd>{ujian.TempatUjian}</dd>
          </dl>
        </div>

        <table className="mt-6 w-full border-collapse text-sm">
          <thead>
            <tr>
              {["No", "Nomor Ujian", "Nama", "Asal"].map((label) => (
                <th key={label} className={headerCell} style={{ backgroundColor: GROUP_COLORS.base }}>
                  {label}
                </th>
              ))}
              {scoreColumns.map((col) => (
                <th key={col.label} className={headerCell} style={{ backgroundColor: GROUP_COLORS[col.group] }}>
                  {col.label}
                </th>
              ))}
              {[
                "Nilai Kumulatif",
                "K.F1",
                "K.F2",
                "K.F3",
                "Nilai Kumulatif Kompre",
                "Nilai Final",
                "HASIL",
              ].map((label) => (
                <th key={label} className={headerCell} style={{ backgroundColor: GROUP_COLORS.summary }}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {peserta.map((p, index) => {
              const rekap = computeRekap(p, type);
              const hasil = checkLulus(p, ujian);
              return (
                <tr key={p.IdUserUjian ?? index} className={cn(index % ROWS_PER_PAGE === 1 && "page-break")}>
                  <td className={cell}>{index + 1}</td>
                  <td className={cell}>{p.NomorUjian || "-"}</td>
                  <td className={cn(cell, "text-left capitalize leading-tight")}>{shortenName(p.Nama) || "-"}</td>
                  <td className={cn(cell, "text-left capitalize leading-tight")}>{p.Instansi || "-"}</td>

                  {scoreColumns.map((col) => (
                    <ScoreCell key={col.label} column={col} peserta={p} onShowHistory={onShowHistory} />
                  ))}

                  <td className={cn(cell, "bg-neutral-200 font-bold", passColor(rekap.theory))}>
                    {rekap.theory.toFixed(2)}
                  </td>
                  <td className={cell}>{p.NilaiKomprensifF1 || 0}</td>
                  <td className={cell}>{p.NilaiKomprensifF2 || 0}</td>
                  <td className={cell}>{p.NilaiKomprensifF3 || 0}</td>
                  <td className={cn(cell, "bg-neutral-200 font-bold", passColor(rekap.kompre))}>
                    {rekap.kompre.toFixed(2)}
                  </td>
                  <td className={cn(cell, "bg-neutral-200 font-bold", passColor(rekap.final))}>
                    {rekap.final.toFixed(2)}
                  </td>
                  <td className={cn(cell, "font-bold", hasil === "TIDAK LULUS" ? "text-rose-500" : "text-green-600")}>
                    {hasil}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-3 flex w-full items-start justify-between gap-6 text-sm">
          <dl className="grid grid-cols-[max-content_auto_1fr] gap-x-2 gap-y-1">
            <dt className="col-span-3 font-semibold">Hasil:</dt>
            <dt className="font-semibold">Jumlah Peserta</dt>
            <dd>:</dd>
            <dd>{peserta.length} Orang</dd>
            <dt className="font-semibold">Lulus (L)</dt>
            <dd>:</dd>
            <dd>{summary.lulus} Orang</dd>
            <dt className="font-semibold">Tidak Lulus (TL)</dt>
            <dd>:</dd>
            <dd>{summary.tidakLulus} Orang</dd>
          </dl>
          <p className="capitalize">
            {ujian.TempatUjian}, {generateTanggalPelatihan(ujian.TanggalMulaiUjian)}
          </p>
        </div>

        {dataPukakp && (
          <div className="mt-6 flex flex-col items-center gap-6">
            <div className="flex w-full items-start justify-around gap-8">
              <Signature
                title="Ketua, PUKAKP"
                subtitle={ujian.PUKAKP}
                name={dataPukakp.KetuaPukakp}
                nip={dataPukakp.NipKetua}
              />
              <Signature
                title="Sekretaris, PUKAKP"
                subtitle={ujian.PUKAKP}
                name={dataPukakp.SesPukakp}
                nip={dataPukakp.NipSes}
              />
            </div>
            <Signature title="Mengetahui, Ketua DPKAKP," name={KETUA_DPKAKP} />
          </div>
        )}
      </div>
    );
  }
);
RekapitulasiNilai.displayName = "RekapitulasiNilai";

export default RekapitulasiNilai;
