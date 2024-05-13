import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import FormPelatihan from "@/components/dashboard/admin/formPelatihan";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Dashboard | Sistem Informasi Ujian Sertifikasi Kompetensi & Profesi KP",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
          <>
            {/* Header Tabel Data Pelatihan */}
            <div className="flex flex-wrap items-center mb-3 justify-between gap-3 sm:flex-nowrap">
              {/* Button Ajukan Permohonan Buka Pelatihan */}
            </div>

            {/* List Data Pelatihan */}
            <div>
              <FormPelatihan />
            </div>
          </>
        </div>
      </DefaultLayout>
    </>
  );
}
