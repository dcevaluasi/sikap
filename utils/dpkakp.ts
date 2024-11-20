export function containsPukakp(text: string): boolean {
    return /pukakp/i.test(text);
}

export function replaceProgramName(word: string): string {
    if (word.includes("ANKAPIN")) {
        return word.replace("ANKAPIN", "Ahli Nautika Kapal Penangkap Ikan");
    } else if (word.includes("ATKAPIN")) {
        return word.replace("ATKAPIN", "Ahli Teknika Kapal Penangkap Ikan");
    }
    return word; // Return the word unchanged if it doesn't match
}