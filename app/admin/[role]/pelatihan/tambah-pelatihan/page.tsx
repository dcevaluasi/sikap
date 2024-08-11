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
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-8">
          <>
            <div className="">
              <FormPelatihan edit={false} />
            </div>
          </>
        </div>
      </DefaultLayout>
    </>
  );
}
