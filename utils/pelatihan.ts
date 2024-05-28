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