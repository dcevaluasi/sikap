
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
  UserPelatihan: UserPelatihan[];
  BeritaAcara: string;
  CatatanPenerbitanByPusat: string;
  StatusApproval: string;
  PenerbitanSertifikatDiterima: string;
}

export type UserPelatihan = {
  CreatedAt: string;
  IdUserPelatihan: number;
  IdPelatihan: number;
  IdUsers: number;
  IsActice: string;
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
};

export type Pelatihan = {
  IdPelatihan: number;
  IdLemdik: number;
  KodePelatihan: string;
  NamaPelatihan: string;
  PenyelenggaraPelatihan: string;
  DetailPelatihan: string;
  FotoPelatihan: string;
  JenisPelatihan: string;
  BidangPelatihan: string;
  DukunganProgramTerobosan: string;
  TanggalMulaiTerobosan: string;
  TanggalBerakhirTerobosan: string;
  HargaPelatihan: number;
  Instruktur: string;
  Status: string;
  MemoPusat: string;
  SilabusPelatihan: string;
  PelaksanaanPelatihan: string;
  UjiKompotensi: number;
  KoutaPelatihan: number;
  AsalPelatihan: string;
  AsalSertifikat: string;
  JenisSertifikat: string;
  TtdSertifikat: string;
  NoSertifikat: string;
  StatusApproval: string;
  IdSaranaPrasarana: number;
  IdKonsumsi: string;
  ModuleMateri: string;
  CreateAt: string;
  UpdateAt: string;
  PemberitahuanDiterima: string;
  SuratPemberitahuan: string;
  CatatanPemberitahuanByPusat: string;
  PenerbitanSertifikatDiterima: string;
  BeritaAcara: string;
  CatatanPenerbitanByPusat: string;
  SarprasPelatihan: string;
  MateriPelatihan: string;
};