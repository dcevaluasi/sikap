// GET ADMIN PUSAT DPKAKP
export type AdminPusatDPKAKP = {
  IdAdminPusat: number
  Nama: string
  Email: string
  Password: string
  NoTelpon: string
  Nip: string
  Status: string
}

// export TYPE SOAL
export type SoalUjianBagian = {
  IdSoalUjianBagian: number
  IdBagian: number
  GambarSoal?: string
  Soal: string
  JawabanBenar: string
  Status: string
  CreateAt: string
  UpdateAt: string
  Jawaban: Jawaban[]
}

export type Jawaban = {
  IdJawaban: number,
  IdSoalUjianBagian: number,
  NameJawaban: string,
  Status: string,
  CreateAt: string,
  UpdateAt: string
}

export type JawabanUser = {
  id_soal_bagian: string,
  jawaban_pengguna: string,
}

export type Bagian = {
  IdBagian: number
  IdFungsi: number
  NamaBagian: string
  CreateAt: string
  UpdateAt: string
  PaketBagian: PaketBagianDetail[]
}

export type FungsiUjian = {
  IdFungsi: number
  IdTypeUjian: number
  NamaFungsi: string
  CreateAt: string
  UpdateAt: string
  Bagian: Bagian[]
}

export type UjianKeahlian = {
  Pesan: string;
  data: Ujian[]
}

export type Ujian = {
  IdUjian: number
  IdTypeUjian: number
  IdPengawasUjian: string;
  TypeUjian: string
  NamaUjian: string
  TempatUjian: string
  PUKAKP: string
  NamaPengawasUjian: string
  NamaVasilitatorUjian: string
  TanggalMulaiUjian: string
  TanggalBerakhirUjian: string
  WaktuUjian: string
  JumlahPesertaUjian: number
  Status: string
  WaktuF1B1: string;
  WaktuF1B2: string;
  WaktuF1B3: string;
  WaktuF1: string;
  WaktuF2: string;
  WaktuF2B1: string;
  WaktuF3: string;
  WaktuF3B1: string;
  WaktuF3B2: string;
  CreateAt: string
  UpdateAt: string
  FilePermohonan: string;
  UsersUjian: UsersUjian[]
}

export type UsersUjian = {
  IdUserUjian: number;
  Nama: string;
  Nik: string;
  TempatLahir: string;
  TanggalLahir: string;
  NomorUjian: string;
  JenisKelamin: string;
  Instansi: string;
  IdUjian: number;
  IdCodeAksesUsersBagian: number;
  NilaiF1B1: number;
  NilaiF1B2: number;
  NilaiF1B3: number;
  NilaiF2B1: number;
  NilaiF3B1: number;
  NilaiF3B2: number;
  NilaiKomprensif: number;
  NilaiKomprensifF1: number;
  NilaiKomprensifF2: number;
  NilaiKomprensifF3: number;
  CreteAt: string;
  Status: string;
  UpdateAt: string;
  CodeAksesUsersBagian: CodeAksesUsersBagian[];
}

export type ImageSoalUjian = {
  CodeUnik: string;
  CreateAt: string;
  Gambar: string;
  IdGambarSoal: number;
  UpdateAt: string;
}

export type CodeAksesUsersBagian = {
  IdCodeAksesUsersBagian: number,
  IdUserUjian: number,
  IdBagian: number,
  NamaBagian: string,
  KodeAkses: string,
  CreteAt: string,
  UpdateAt: string
}

export type TypeUjian = {
  IdTypeUjian: number
  NamaTypeUjian: string
  CreateAt: string
  UpdateAt: string
  Fungsi: FungsiUjian[]
  Ujian: Ujian[]
}

export type SoalBagian = {
  Bagian: string;
  Fungsi: string;
  Soal: SoalUjianBagian[];
  Ujian: string;
  jumlah: number;
  waktu?: number;
}

export type PaketBagianDetail = {
  IdBagian: number;
  IdPaketBagian: number
  Paket: number
  SoalUjianBagian: SoalUjianBagian[]
}

