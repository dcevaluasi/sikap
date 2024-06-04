export type LemdiklatDetailInfo = {
    Pesan:string;
    data: LemdiklatDetail;
}

export type LemdiklatDetail = {
    IdLemdik: number;
    NamaLemdik: string;
    NoTelpon: number;
    Email: string;
    Password:string;
    Alamat: string;
    Deskripsi:string;
    CreateAt:string;
    UpdateAt:string;
    LastNoSertif: string;
    Pelatihan: Pelatihan;
}

export type Pelatihan = {
    IdPelatihan: number;
    IdLemdik: string;
    KodePelatihan: string;
    NamaPelatihan: string;
    PenyelenggaraPelatihan: string;
    DetailPelatihan: string;
    JenisPelatihan: string;
    BidangPelatihan: string;
    DukunganProgramTerobosan: string;
    TanggalMulaiPelatihan: string;
    TanggalBerakhirPelatihan: string;
    HargaPelatihan: string;
    Instruktur: string;
    FotoPelatihan: string;
    Status: string;
    MemoPusat: string;
    SilabusPelatihan: string;
    LokasiPelatihan: string;
    PelaksanaanPelatihan: string;
    UjiKompetensi: string;
    KoutaPelatihan: string; // type from be, should be KuotaPelatihan
    AsalPelatihan: string;
    JenisSertifikat: string;
    TtdSertifikat: string;
    NoSertifikat: string;
    IdSaranaPrasarana: string;
    IdKonsumsi: string;
    CreatedAt: string;
    UpdatedAt: string;
  };