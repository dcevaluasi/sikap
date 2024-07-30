// GET ADMIN PUSAT DPKAKP
type AdminPusatDPKAKP = {
  IdAdminPusat: number
  Nama: string
  Email: string
  Password: string
  NoTelpon: string
  Nip: string
  Status: string
}

// TYPE SOAL
type SoalUjianBagian = {
  IdSoalUjianBagian: number
  IdBagian: number
  Soal: string
  JawabanBenar: string
  Status: string
  CreateAt: string
  UpdateAt: string
  Jawaban: Jawaban[]
}

type Jawaban = {
  IdJawaban: number,
  IdSoalUjianBagian: number,
  NameJawaban: string,
  Status: string,
  CreateAt: string,
  UpdateAt: string
}

type Bagian = {
  IdBagian: number
  IdFungsi: number
  NamaBagian: string
  CreateAt: string
  UpdateAt: string
  SoalUjianBagian: []
}

type FungsiUjian = {
  IdFungsi: number
  IdTypeUjian: number
  NamaFungsi: string
  CreateAt: string
  UpdateAt: string
  Bagian: Bagian[]
}

type UjianKeahlian = {
  Pesan: string;
  data: Ujian[]
}

type Ujian = {
  IdUjian: number
  IdTypeUjian: number
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
  CreateAt: string
  UpdateAt: string
  UsersUjian: UsersUjian[]
}

type UsersUjian = {
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
  CreteAt: string;
  Status: string;
  UpdateAt: string;
  CodeAksesUsersBagian: CodeAksesUsersBagian[];
}

type CodeAksesUsersBagian = {
  IdCodeAksesUsersBagian: number,
  IdUserUjian: number,
  IdBagian: number,
  NamaBagian: string,
  KodeAkses: string,
  CreteAt: string,
  UpdateAt: string
}

type TypeUjian = {
  IdTypeUjian: number
  NamaTypeUjian: string
  CreateAt: string
  UpdateAt: string
  Fungsi: FungsiUjian[]
  Ujian: Ujian[]
}

type SoalBagian = {
  Bagian: string;
  Fungsi: string;
  Soal: SoalUjianBagian[];
  Ujian: string;
  jumlah: number;
}