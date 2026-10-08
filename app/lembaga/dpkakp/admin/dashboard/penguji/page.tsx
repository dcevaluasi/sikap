"use client";

import React from "react";
import TableDataDewanenguji from "@/components/dashboard/Pelatihan/TableDataPenguji";
import LayoutAdmin from "@/components/dashboard/Layouts/LayoutAdmin";

const Blanko: React.FC = () => {
  return (
    <>
      <LayoutAdmin>
        <TableDataDewanenguji />
      </LayoutAdmin>
    </>
  );
};

export default Blanko;
