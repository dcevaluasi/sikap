export type BlankoResponse = {
    Pesan: string;
    data: Blanko[];
}

export type Blanko = {
    IdBlanko: number;
    Jumlah: number;
    NoSeri: string;
    TipeBlanko: string;
    TanggalPengadaan: string;
    JumlahPengadaan: number;
    CreatedAt: string;
    UpdatedAt: string;
}

export type BlankoKeluarResponse = {
    Pesan: string;
    data: BlankoKeluar[];
}

export type BlankoKeluar = {
    IdBlankoKeluar: number,
    IdBlanko: number,
    AsalPendapatan: string,
    TipeBlanko: string,
    TanggalKeluar: string,
    NamaLemdiklat: string,
    NamaPelaksana: string,
    TanggalPermohonan: string,
    LinkPermohonan: string,
    NamaProgram: string,
    TanggalPelaksanaan: string,
    JumlahPesertaLulus: number,
    JumlahBlankoDiajukan: number,
    JumlahBlankoDisetujui: number,
    NoSeriBlanko: string,
    Status: string,
    IsSd: string,
    IsCetak: boolean,
    TipePengambilan: string,
    PetugasYangMenerima: string,
    PetugasYangMemberi: string,
    LinkDataDukung: string,
    CreatedAt: string,
    UpdatedAt: string,
    Keterangan: string
}