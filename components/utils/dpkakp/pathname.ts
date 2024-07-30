export const getIdUjianKeahlianInPathPesertaUjian = (pathname: string) => {
    const parts = pathname.split("peserta-ujian/");
    const value = parts[1].split('/')[0];

    return value
}

export const getIdUjianKeahlianInBankSoal = (pathname: string) => {
    const parts = pathname.split("bank-soal/");
    const value = parts[1].split('/')[1];

    return value
}

export const getIdUjianKeahlianInBankSoal2 = (pathname: string) => {
    const parts = pathname.split("bank-soal/");
    const value = parts[1].split('/')[0];

    return value
}