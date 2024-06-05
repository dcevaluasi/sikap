export type User =  {
   IdUsers: number;
   Nama: string;
   NoTelpon: number;
   Email: string;
   Password: string;
   Kota: string;
   Provinsi: string;
   Alamat: string;
   Nik: number;
   TempatLahir: string;
   TanggalLahir: string;
   JenisKelamin: string;
   Pekerjaan: string;
   GolonganDarah: string;
   StatusMenikah: string;
   Kewarganegaraan: string;
   IbuKandung: string;
   NegaraTujuanBekerja: string;
   PendidikanTerakhir: string;
   Agama: string;
   Foto: string;
   Ktp: string;
   KK: string;
   SuratKesehatan: string;
   Status: string;
   CreateAt: string;
   UpdateAt: string;
   Ijazah: string;
   KusukaUsers: string;
   Pelatihan: UserPelatihan[];
}

export type UserPelatihan = {
    CreatedAt: string;
    IdUserPelatihan: number;
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
    WaktuPembayaran: string
  };
  