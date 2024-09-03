import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import FormPelatihan from "@/components/dashboard/admin/formPelatihan";
import { Metadata } from "next";
import Link from "next/link";

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
            <div className="flex flex-col gap-2">
              <ul className="flex items-center gap-0 ">
                <li className="inline-flex items-center">
                  <Link
                    href="#"
                    className="text-gray-400 text-sm hover:text-blue-500"
                  >
                    <svg
                      className="w-5 h-auto fill-current  text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
                    </svg>
                  </Link>

                  <span className="mx-2 h-auto text-gray-400 font-medium">
                    /
                  </span>
                </li>

                <li className="inline-flex items-center">
                  <Link
                    href="/admin/lemdiklat/pelatihan/tambah-pelatihan"
                    className="text-gray-400 text-sm hover:text-blue-500"
                  >
                    Tambah Pelatihan
                  </Link>
                </li>
              </ul>
              <FormPelatihan edit={false} />
            </div>
          </>
        </div>
      </DefaultLayout>
    </>
  );
}
