export type Pelatihan = {
    Id: string;
    KodePelatihan: string;
    CoverPelatihan: string;
    JudulPelatihan: string;
    TanggalPendaftaran: string;
    DeskripsiPelatihan: string;
    DetailPelatihan: string;
    HargaPelatihan: number;
    BidangPelatihan: string;
    ListFasilitasPenginapan: FasilitasPenginapan[];
    ListFasilitasKonsumsi: FasilitasKonsumsi[];
    DenganSertifikasi: boolean;
    PelaksanaanPelatihan: string;
    DukunganProgramTerobosan: string;
    LokasiPelatihan: string;
}

export type FasilitasPenginapan = {
    Id: string;
    NamaFasilitas: string;
    HargaFasilitas: number;
    Satuan: string;
}

export type FasilitasKonsumsi = {
    Id: string;
    NamaPaketMakanan: string;
    HargaPaketMakanan: number;
}