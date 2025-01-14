import PesertaUjianKeahlian from "@/components/dashboard/Dashboard/DPKAKP/PesertaUjianKeahlian";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import DefaultLayoutDPKAKP from "@/components/dashboard/Layouts/DefaultLayoutDPKAKP";
import LayoutAdmin from "@/components/dashboard/Layouts/LayoutAdmin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peserta Ujian - Dewan Penguji Keahlian Awak Kapal Perikanan",
};

export default function Home() {
  return (
    <>
      <LayoutAdmin>
        <div className="flex-1 flex flex-col">
          {/* section body top nav */}
          <nav
            aria-label="top bar"
            className="flex-none flex justify-between bg-white h-16"
          >
            {/* top bar left */}
            <ul
              aria-label="top bar left"
              aria-orientation="horizontal"
              className="flex"
            >
              {/* add button */}
              <li className="group relative">
                <span className="absolute p-1 hidden group-hover:block">
                  <ul
                    id="add"
                    role="listbox"
                    className="outline-none py-2 bg-white border rounded-md w-screen max-w-md w-dropdown-large shadow-lg focus:outline-none leading-relaxed"
                  >
                    <li role="separator" className="mb-2">
                      <label className="block px-4 py-3 font-semibold">
                        New
                      </label>
                      <hr />
                    </li>
                    <li
                      role="option"
                      className="px-6 py-1 my-1 focus:outline-none focus:bg-blue-100 hover:bg-blue-100 cursor-pointer"
                    >
                      Ticket
                    </li>
                    <li
                      role="option"
                      className="px-6 py-1 my-1 focus:outline-none focus:bg-blue-100 hover:bg-blue-100 cursor-pointer"
                    >
                      User
                    </li>
                    <li
                      role="option"
                      className="px-6 py-1 my-1 focus:outline-none focus:bg-blue-100 hover:bg-blue-100 cursor-pointer"
                    >
                      Organization
                    </li>
                    <li
                      role="option"
                      className="px-6 py-1 my-1 focus:outline-none focus:bg-blue-100 hover:bg-blue-100 cursor-pointer"
                    >
                      Search
                    </li>
                    <li role="separator" className="mb-2">
                      <label className="block px-4 py-3 font-semibold">
                        Recently Viewed
                      </label>
                      <hr />
                    </li>
                    <li
                      role="option"
                      className="px-6 py-1 my-1 focus:outline-none focus:bg-blue-100 hover:bg-blue-100 cursor-pointer"
                    >
                      <div className="flex">
                        <div className="pr-2">
                          <span
                            style={{ padding: "2px 5px", fontSize: "0.7rem" }}
                            className="font-mono rounded-sm bg-red-600 text-white leading-none"
                          >
                            O
                          </span>
                        </div>
                        <div className="flex-1">
                          <p>Vertias - ams opps issue</p>
                          <p className="text-gray-600">
                            <span>#ticket/14352</span>
                            <span className="mx-1 font-black">·</span>
                            <span>Nico Braun</span>
                          </p>
                        </div>
                      </div>
                    </li>
                    <li
                      role="option"
                      className="px-6 py-1 my-1 focus:outline-none focus:bg-blue-100 hover:bg-blue-100 cursor-pointer"
                    >
                      <div className="flex">
                        <div className="pr-2">
                          <span
                            style={{ padding: "2px 5px", fontSize: "0.7rem" }}
                            className="font-mono rounded-sm bg-yellow-400 text-black leading-none"
                          >
                            N
                          </span>
                        </div>
                        <div className="flex-1">
                          <p>Vertias - ams opps issue</p>
                          <p className="text-gray-600">
                            <span>#ticket/14352</span>
                            <span className="mx-1 font-black">·</span>
                            <span>Nico Braun</span>
                          </p>
                        </div>
                      </div>
                    </li>
                    <li
                      role="option"
                      className="px-6 py-1 my-1 focus:outline-none focus:bg-blue-100 hover:bg-blue-100 cursor-pointer"
                    >
                      <div className="flex">
                        <div className="pr-2">
                          <span
                            style={{ padding: "2px 5px", fontSize: "0.7rem" }}
                            className="font-mono rounded-sm bg-gray-500 text-white leading-none"
                          >
                            S
                          </span>
                        </div>
                        <div className="flex-1">
                          <p>Vertias - ams opps issue</p>
                          <p className="text-gray-600">
                            <span>#ticket/14352</span>
                            <span className="mx-1 font-black">·</span>
                            <span>Nico Braun</span>
                          </p>
                        </div>
                      </div>
                    </li>
                    <li
                      role="option"
                      className="px-6 py-1 my-1 focus:outline-none focus:bg-blue-100 hover:bg-blue-100 cursor-pointer"
                    >
                      <div className="flex">
                        <div className="pr-2">
                          <span
                            style={{ padding: "2px 5px", fontSize: "0.7rem" }}
                            className="font-mono rounded-sm bg-blue-600 text-white leading-none"
                          >
                            P
                          </span>
                        </div>
                        <div className="flex-1">
                          <p>Vertias - ams opps issue</p>
                          <p className="text-gray-600">
                            <span>#ticket/14352</span>
                            <span className="mx-1 font-black">·</span>
                            <span>Nico Braun</span>
                          </p>
                        </div>
                      </div>
                    </li>
                    <li
                      role="option"
                      className="px-6 py-1 my-1 focus:outline-none focus:bg-blue-100 hover:bg-blue-100 cursor-pointer"
                    >
                      <div className="flex">
                        <div className="pr-2">
                          <span
                            style={{ padding: "2px 5px", fontSize: "0.7rem" }}
                            className="font-mono rounded-sm bg-gray-800 text-white leading-none"
                          >
                            H
                          </span>
                        </div>
                        <div className="flex-1">
                          <p>Vertias - ams opps issue</p>
                          <p className="text-gray-600">
                            <span>#ticket/14352</span>
                            <span className="mx-1 font-black">·</span>
                            <span>Nico Braun</span>
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </span>
              </li>
            </ul>
            {/* to bar right  */}
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
          {/* section body header */}

          <main className="mx-5 overflow-y-scroll">
            <PesertaUjianKeahlian />
          </main>
          {/* main content */}
        </div>
      </LayoutAdmin>
    </>
  );
}
