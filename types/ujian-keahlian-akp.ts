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

type UsersUjian = {}

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