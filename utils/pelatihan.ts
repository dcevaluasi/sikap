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
