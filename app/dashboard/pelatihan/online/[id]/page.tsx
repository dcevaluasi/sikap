"use client";

import { elautBaseUrl } from "@/constants/urls";
import { PelatihanMasyarakat } from "@/types/product";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";

function page() {
  const paths = usePathname().split("/");
  const id = paths[paths.length - 1];
  const [pelatihan, setPelatihan] = React.useState<PelatihanMasyarakat | null>(
    null
  );
  const handleFetchingDetailPelatihan = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${elautBaseUrl}/getPelatihanUser?idPelatihan=${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("XSRF081")}`,
          },
        }
      );
      setPelatihan(response.data);
      console.log("Fetched data pelatihan : ", response);
    } catch (error) {
      console.error("Error fetching training data:", error);
      throw error;
    }
  };

  React.useEffect(() => {
    handleFetchingDetailPelatihan();
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full">
      {pelatihan != null && (
        <div className="flex flex-col gap-0 mt-32 w-2/3">
          <h1 className="font-calsans text-4xl leading-none">
            {pelatihan!.NamaPelatihan}
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">
                  {pelatihan!.NamaPelatihan}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  Materi 1. Kebijakan Pelatihan Sosial Kultural II
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mt-4 w-full">
            <div
              dangerouslySetInnerHTML={{
                __html: pelatihan?.DetailPelatihan!,
              }}
              className="text-sm  prose  text-justify group-hover:text-xs text-gray-500 prose-strong:text-gray-500 prose-p:leading-[140%] prose-strong:font-bold group-hover:duration-1000 w-full"
            />{" "}
          </div>

          {/* <div className="mt-[150vh]">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default page;
