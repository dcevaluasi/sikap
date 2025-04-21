export function capitalize(text: string): string {
  return text.replace(/\b\w/g, (match) => match.toUpperCase())
}

export function generateFullNameBalai(bppp: string): string {
  switch (bppp) {
    case 'BPPP Medan':
      return 'Balai Pelatihan dan Penyuluhan Perikanan Medan'
    case 'BPPP Tegal':
      return 'Balai Pelatihan dan Penyuluhan Perikanan Tegal'
    case 'BPPP Banyuwangi':
      return 'Balai Pelatihan dan Penyuluhan Perikanan Banyuwangi'
    case 'BPPP Ambon':
      return 'Balai Pelatihan dan Penyuluhan Perikanan Ambon'
    case 'BPPP Bitung':
      return 'Balai Pelatihan dan Penyuluhan Perikanan Bitung'
    case 'BDA Sukamandi':
      return 'Balai Diklat Aparatur Sukamandi'
    default:
      return 'Balai Pelatihan dan Penyuluhan Perikanan Testing'
  }
}

export function generateTanggalPelatihan(tanggal: string): string {
  const date = new Date(tanggal)

  // Array nama-nama hari
  const weekdays = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
  ]

  // Array nama-nama bulan
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]

  // Mengambil nama hari, tanggal, bulan, dan tahun
  const dayOfWeek = weekdays[date.getUTCDay()]
  const day = date.getUTCDate()
  const month = months[date.getUTCMonth()]
  const year = date.getUTCFullYear()

  // Mengembalikan string tanggal yang telah diformat
  return `${day} ${month} ${year}`
}

export function generateTanggalPelatihanWithoutDay(tanggal: string): string {
  const date = new Date(tanggal)

  // Array nama-nama bulan
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]

  // Mengambil nama hari, tanggal, bulan, dan tahun
  const day = date.getUTCDate()
  const month = months[date.getUTCMonth()]
  const year = date.getUTCFullYear()

  // Mengembalikan string tanggal yang telah diformat
  return `${day} ${month} ${year}`
}

export function shortenName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length <= 2) return fullName

  const firstTwo = parts.slice(0, 2).join(' ')
  const initials = parts
    .slice(2)
    .map((word) => word.charAt(0).toUpperCase() + '.')
    .join(' ')

  return `${firstTwo} ${initials}`
}
