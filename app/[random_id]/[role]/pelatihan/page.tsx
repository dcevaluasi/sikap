import ECommerce from "@/components/dashboard/Dashboard/E-commerce";
import Pelatihan from "@/components/dashboard/Dashboard/Pelatihan";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import LayoutAdminElaut from "@/components/dashboard/Layouts/LayoutAdminElaut";
import { Metadata } from "next";
import { TbSchool } from "react-icons/tb";

export const metadata: Metadata = {
  title: "Database Pelatihan - Elektronik Layanan Pelatihan KP Utama Terpadu",
};

export default function Home() {
  return (
    <>
      <LayoutAdminElaut>
        <section className="flex-1 flex flex-col">
          <nav
            aria-label="top bar"
            className="flex-none flex justify-between bg-white h-16"
          >
            <ul
              aria-label="top bar left"
              aria-orientation="horizontal"
              className="flex"
            ></ul>
            <ul
              aria-label="top bar right"
              aria-orientation="horizontal"
              className="px-8 flex items-center"
            >
              <li className="relative">
                <input
                  title="Search Bar"
                  aria-label="search bar"
                  role="search"
                  className="pr-8 pl-4 py-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out focus:border-black focus:cursor-text w-4 focus:w-64 placeholder-transparent focus:placeholder-gray-500"
                  type="text"
                  placeholder="Search Chi Desk Support"
                />
                <i className="pointer-events-none absolute top-0 right-0 h-full flex items-center pr-3">
                  <svg
                    className="fill-current w-4 h-4 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
                  </svg>
                </i>
              </li>

              <li className="h-10 w-10 ml-3">
                <button
                  title="Page Menu"
                  aria-label="page menu"
                  className="h-full w-full rounded-full border focus:outline-none focus:shadow-outline"
                >
                  <img
                    className="h-full w-full rounded-full mx-auto"
                    src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/me.jpg"
                  />
                </button>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col w-full">
            <div className="flex flex-row gap-2 items-center">
              <header
                aria-label="page caption"
                className="flex-row w-full flex h-20 items-center gap-2 bg-gray-100 border-t px-4"
              >
                <TbSchool className="text-3xl" />
                <div className="flex flex-col">
                  <h1 id="page-caption" className="font-semibold text-lg">
                    Database Pelatihan
                  </h1>
                  <p className="font-medium text-gray-400 text-base">
                    Tambahkan data pelatihan yang ada di lembaga diklat mu!
                  </p>
                </div>
              </header>
            </div>
          </div>
          <main className="w-full h-full">
            <Pelatihan />
          </main>
        </section>
      </LayoutAdminElaut>
    </>
  );
}
