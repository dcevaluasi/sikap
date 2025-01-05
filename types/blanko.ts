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

export type BlankoRusak = {
    IdBlankoRusak: number;
    IdBlankoKeluar: number;
    NoSeri: string;
    Tipe: string;
    Keterangan: string;
    TanggalRusak: string;
    FotoDokumen: string;
    CreatedAt: string;
    UpdatedAt: string;
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
    Longitude?: string,
    Latitude?: string,
    SasaranMasyarakat: string,
    TipePengambilan: string,
    PetugasYangMenerima: string,
    PetugasYangMemberi: string,
    LinkDataDukung: string,
    CreatedAt: string,
    UpdatedAt: string,
    Keterangan: string
}

export type PengirimanSertifikat = {
    IdPengirimanSertifikat: number;
    NamaPenerima: string;
    NomorTelpon: string;
    Alamat: string;
    NoResi: string;
    BuktiResi: string;
    NominalPengiriman: string;
    TtdTerimaPengiriman: string;
    BuktiPengirimanSertifikat: string;
    BuktiPenerimaanSertifikat: string;
    ListSertifikatDikirimkan: string;
    CreateAt: string;
    UpdateAt: string;
    Status: string;
}