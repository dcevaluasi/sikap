import * as XLSX from 'xlsx'

import { Ujian, UsersUjian } from '@/types/ujian-keahlian-akp'
import {
  EXAM_THRESHOLD,
  PRACTICE_WEIGHT,
  THEORY_WEIGHT,
} from '@/constants/globals'

export function roundUpScore(value: number): number {
  return Math.ceil(value)
}

export function checkLulus(userUjian: UsersUjian, ujian: Ujian): string {
  let finalScore: number

  if (ujian.TypeUjian.includes('Rewarding')) {
    finalScore = roundUpScore(
      (((userUjian.NilaiF1B1 || 0) +
        (userUjian.NilaiF2B1 || 0) +
        (userUjian.NilaiF3B1 || 0)) /
        3) *
        THEORY_WEIGHT +
        ((userUjian.NilaiKomprensifF1 +
          userUjian.NilaiKomprensifF2 +
          userUjian.NilaiKomprensifF3) /
          3) *
          PRACTICE_WEIGHT,
    )
  } else if (
    ujian.TypeUjian === 'ANKAPIN II' ||
    ujian.TypeUjian === 'ATKAPIN II'
  ) {
    finalScore = roundUpScore(
      ((((userUjian.NilaiF1B1 || 0) + (userUjian.NilaiF1B2 || 0)) / 2 +
        (userUjian.NilaiF2B1 || 0) +
        ((userUjian.NilaiF3B1 || 0) + (userUjian.NilaiF3B2 || 0)) / 2) /
        3) *
        THEORY_WEIGHT +
        ((userUjian.NilaiKomprensifF1 +
          userUjian.NilaiKomprensifF2 +
          userUjian.NilaiKomprensifF3) /
          3) *
          PRACTICE_WEIGHT,
    )
  } else {
    finalScore = roundUpScore(
      ((((userUjian.NilaiF1B1 || 0) +
        (userUjian.NilaiF1B2 || 0) +
        (userUjian.NilaiF1B3 || 0)) /
        3 +
        (userUjian.NilaiF2B1 || 0) +
        ((userUjian.NilaiF3B1 || 0) + (userUjian.NilaiF3B2 || 0)) / 2) /
        3) *
        THEORY_WEIGHT +
        ((userUjian.NilaiKomprensifF1 +
          userUjian.NilaiKomprensifF2 +
          userUjian.NilaiKomprensifF3) /
          3) *
          PRACTICE_WEIGHT,
    )
  }

  return finalScore >= EXAM_THRESHOLD ? 'LULUS' : 'TIDAK LULUS'
}

export function countLulus(
  usersUjian: UsersUjian[],
  ujian: Ujian,
): { lulus: number; tidakLulus: number } {
  let lulusCount = 0
  let tidakLulusCount = 0

  usersUjian.forEach((userUjian) => {
    const result = checkLulus(userUjian, ujian) // Reuse the checkLulus function
    if (result === 'LULUS') {
      lulusCount++
    } else {
      tidakLulusCount++
    }
  })

  return { lulus: lulusCount, tidakLulus: tidakLulusCount }
}

export function exportToExcelFinalScoring({
  dataUjian,
  data,
}: {
  dataUjian: Ujian[]
  data: UsersUjian[]
}) {
  // Format data untuk ekspor
  const isRewarding =
    dataUjian[0]?.TypeUjian.includes('Rewarding') ||
    dataUjian[0]?.TypeUjian.includes('TRYOUT')
  const isTingkatII =
    dataUjian[0]?.TypeUjian == 'ANKAPIN II' ||
    dataUjian[0]?.TypeUjian == 'ATKAPIN II'

  const formattedData = isRewarding
    ? data.map((pesertaUjian, index) => ({
        No: index + 1,
        'Nomor Ujian': pesertaUjian?.NomorUjian || '-',
        'Nama Peserta': pesertaUjian?.Nama || '-',
        'Nilai F1': pesertaUjian?.NilaiF1B1 || 0,
        'Nilai F2': pesertaUjian?.NilaiF2B1 || 0,
        'Nilai F3': pesertaUjian?.NilaiF3B1 || 0,
        'Nilai Kumulatif': roundUpScore(
          ((pesertaUjian?.NilaiF1B1 || 0) +
            (pesertaUjian?.NilaiF2B1 || 0) +
            (pesertaUjian?.NilaiF3B1 || 0)) /
            3,
        ),
        'Nilai Komprehensif 1': pesertaUjian?.NilaiKomprensifF1 || 0,
        'Nilai Komprehensif 2': pesertaUjian?.NilaiKomprensifF2 || 0,
        'Nilai Komprehensif 3': pesertaUjian?.NilaiKomprensifF3 || 0,
        'Total Komprehensif': roundUpScore(
          (pesertaUjian?.NilaiKomprensifF1 +
            pesertaUjian?.NilaiKomprensifF2 +
            pesertaUjian?.NilaiKomprensifF3) /
            3,
        ),
        'Nilai Final': roundUpScore(
          (((pesertaUjian?.NilaiF1B1 || 0) +
            (pesertaUjian?.NilaiF2B1 || 0) +
            (pesertaUjian?.NilaiF3B1 || 0)) /
            3) *
            THEORY_WEIGHT +
            ((pesertaUjian?.NilaiKomprensifF1 +
              pesertaUjian?.NilaiKomprensifF2 +
              pesertaUjian?.NilaiKomprensifF3) /
              3) *
              PRACTICE_WEIGHT,
        ),
        Kelulusan: checkLulus(pesertaUjian, dataUjian[0]),
      }))
    : data.map((pesertaUjian, index) => ({
        No: index + 1,
        'Nomor Ujian': pesertaUjian?.NomorUjian || '-',
        'Nama Peserta': pesertaUjian?.Nama || '-',
        'Nilai F1B1': pesertaUjian?.NilaiF1B1 || 0,
        'Nilai F1B2': pesertaUjian?.NilaiF1B2 || 0,
        'Nilai F1B3': pesertaUjian?.NilaiF1B3 || 0,
        'Total F1': isRewarding
          ? roundUpScore((pesertaUjian?.NilaiF1B1 || 0) / 1)
          : isTingkatII
          ? roundUpScore(
              ((pesertaUjian?.NilaiF1B1 || 0) +
                (pesertaUjian?.NilaiF1B2 || 0)) /
                2,
            )
          : roundUpScore(
              ((pesertaUjian?.NilaiF1B1 || 0) +
                (pesertaUjian?.NilaiF1B2 || 0) +
                (pesertaUjian?.NilaiF1B3 || 0)) /
                3,
            ),
        'Nilai F2': pesertaUjian?.NilaiF2B1 || 0,
        'Nilai F3B1': pesertaUjian?.NilaiF3B1 || 0,
        'Nilai F3B2': pesertaUjian?.NilaiF3B2 || 0,
        'Total F3': roundUpScore(
          ((pesertaUjian?.NilaiF3B1 || 0) + (pesertaUjian?.NilaiF3B2 || 0)) / 2,
        ),
        'Nilai Kumulatif': isRewarding
          ? roundUpScore(
              ((pesertaUjian?.NilaiF1B1 || 0) +
                (pesertaUjian?.NilaiF2B1 || 0) +
                (pesertaUjian?.NilaiF3B1 || 0)) /
                3,
            )
          : isTingkatII
          ? roundUpScore(
              (((pesertaUjian?.NilaiF1B1 || 0) +
                (pesertaUjian?.NilaiF1B2 || 0)) /
                2 +
                (pesertaUjian?.NilaiF2B1 || 0) +
                ((pesertaUjian?.NilaiF3B1 || 0) +
                  (pesertaUjian?.NilaiF3B2 || 0)) /
                  2) /
                3,
            )
          : roundUpScore(
              (((pesertaUjian?.NilaiF1B1 || 0) +
                (pesertaUjian?.NilaiF1B2 || 0) +
                (pesertaUjian?.NilaiF1B3 || 0)) /
                3 +
                (pesertaUjian?.NilaiF2B1 || 0) +
                ((pesertaUjian?.NilaiF3B1 || 0) +
                  (pesertaUjian?.NilaiF3B2 || 0)) /
                  2) /
                3,
            ),
        'Nilai Komprehensif 1': pesertaUjian?.NilaiKomprensifF1 || 0,
        'Nilai Komprehensif 2': pesertaUjian?.NilaiKomprensifF2 || 0,
        'Nilai Komprehensif 3': pesertaUjian?.NilaiKomprensifF3 || 0,
        'Total Komprehensif': roundUpScore(
          (pesertaUjian?.NilaiKomprensifF1 +
            pesertaUjian?.NilaiKomprensifF2 +
            pesertaUjian?.NilaiKomprensifF3) /
            3,
        ),
        'Nilai Final': isRewarding
          ? roundUpScore(
              (((pesertaUjian?.NilaiF1B1 || 0) +
                (pesertaUjian?.NilaiF2B1 || 0) +
                (pesertaUjian?.NilaiF3B1 || 0)) /
                3) *
                THEORY_WEIGHT +
                ((pesertaUjian?.NilaiKomprensifF1 +
                  pesertaUjian?.NilaiKomprensifF2 +
                  pesertaUjian?.NilaiKomprensifF3) /
                  3) *
                  PRACTICE_WEIGHT,
            )
          : isTingkatII
          ? roundUpScore(
              ((((pesertaUjian?.NilaiF1B1 || 0) +
                (pesertaUjian?.NilaiF1B2 || 0)) /
                2 +
                (pesertaUjian?.NilaiF2B1 || 0) +
                ((pesertaUjian?.NilaiF3B1 || 0) +
                  (pesertaUjian?.NilaiF3B2 || 0)) /
                  2) /
                3) *
                THEORY_WEIGHT +
                ((pesertaUjian?.NilaiKomprensifF1 +
                  pesertaUjian?.NilaiKomprensifF2 +
                  pesertaUjian?.NilaiKomprensifF3) /
                  3) *
                  PRACTICE_WEIGHT,
            )
          : roundUpScore(
              ((((pesertaUjian?.NilaiF1B1 || 0) +
                (pesertaUjian?.NilaiF1B2 || 0) +
                (pesertaUjian?.NilaiF1B3 || 0)) /
                3 +
                (pesertaUjian?.NilaiF2B1 || 0) +
                ((pesertaUjian?.NilaiF3B1 || 0) +
                  (pesertaUjian?.NilaiF3B2 || 0)) /
                  2) /
                3) *
                THEORY_WEIGHT +
                ((pesertaUjian?.NilaiKomprensifF1 +
                  pesertaUjian?.NilaiKomprensifF2 +
                  pesertaUjian?.NilaiKomprensifF3) /
                  3) *
                  PRACTICE_WEIGHT,
            ),
        Kelulusan: checkLulus(pesertaUjian, dataUjian[0]),
      }))

  // Membuat worksheet dari data
  const worksheet = XLSX.utils.json_to_sheet(formattedData)

  // Add red cell background color for each value < 50 in the specified columns
  const columnsToCheck = [
    'Nilai F1B1',
    'Nilai F1B2',
    'Nilai F1B3',
    'Total F1',
    'Nilai F2',
    'Nilai F3B1',
    'Nilai F3B2',
    'Total F3',
    'Nilai Kumulatif',
    'Nilai Komprehensif',
  ]

  // Get the range of the sheet
  const range = worksheet['!ref']
  const rows = XLSX.utils.decode_range(range!)

  // Loop through each cell in the columns to check if the value is < 50
  for (let row = rows.s.r; row <= rows.e.r; row++) {
    for (let col = rows.s.c; col <= rows.e.c; col++) {
      const cell = worksheet[XLSX.utils.encode_cell({ r: row, c: col })]

      // Check if the column is in the columnsToCheck array
      const columnName = Object.keys(formattedData[0])[col]
      if (columnsToCheck.includes(columnName)) {
        // If the value is less than 50, apply a red background
        if (cell && !isNaN(cell.v) && cell.v < EXAM_THRESHOLD) {
          if (!cell.s) cell.s = {} // Create style if not already present
          cell.s.fill = {
            fgColor: { rgb: 'FF0000' }, // Red background color
          }
        }
      }
    }
  }

  // Membuat workbook dan menambahkan worksheet dengan nama yang baru
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Rekapitulasi Nilai Lengkap',
  )

  // Menyimpan file Excel
  XLSX.writeFile(workbook, `Rekapitulasi_Nilai_${dataUjian[0]!.TypeUjian}.xlsx`)
}
