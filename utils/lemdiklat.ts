export function convertToBPPP(city: string): string {
    const cityMap: { [key: string]: string } = {
        'medan': 'BPPP Medan',
        'banyuwangi': 'BPPP Banyuwangi',
        'tegal': 'BPPP Tegal',
        'bitung': 'BPPP Bitung',
        'ambon': 'BPPP Ambon'
    };

    return cityMap[city.toLowerCase()] || 'Unknown City';
}