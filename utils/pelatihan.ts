export function getPenyeleggara(city: string): string {
  switch (city.toLowerCase()) {
    case 'tegal':
      return 'BPPP Tegal'
    case 'medan':
      return 'BPPP Medan'
    case 'ambon':
      return 'BPPP Ambon'
    case 'banyuwangi':
      return 'BPPP Banyuwangi'
    case 'bitung':
      return 'BPPP Bitung'
    default:
      return 'Penyeleggara not found'
  }
}

export function extractPathAfterBppp(path: string): string {
    const prefix = "/bppp/";
    const index = path.indexOf(prefix);

    if (index !== -1) {
        // Extract the part after "/bppp/"
        return path.substring(index + prefix.length);
    }

    // Return an empty string or handle the case when "/bppp/" is not found
    return "";
}

export function convertIdSarpras(arr: number[]): string {
  return arr.join(',');
}

export function addFiveYears(dateString: string) {
  // Buat objek Date dari string tanggal
  const date = new Date(dateString);

  // Tambahkan 5 tahun ke tanggal
  date.setFullYear(date.getFullYear() + 5);

  // Format tanggal baru
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}