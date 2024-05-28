export type Product = {
  image: string;
  name: string;
  category: string;
  price: number;
  sold: number;
  profit: number;
};

export type PelatihanMasyarakat =  {
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
}

export type UserPelatihan = {
  CreatedAt: string;
  IdPelatihan: number;
  IdUsers: number;
  IsActive: string;
  IsKeterangan: string;
  MetodoPembayaran: string;
  NilaiPraktek: number;
  NilaiTeory: number;
  NoRegistrasi: string;
  NoSertifikat: string;
  PostTest: number;
  PreTest: number;
  StatusPembayaran: string;
  UpdateAt: string;
  WaktuPembayaran: string;
}