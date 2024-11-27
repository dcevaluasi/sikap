"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";
import {
  DetailPelatihanMasyarakat,
  PelatihanMasyarakat,
} from "@/types/product";

export function ProgressBarPesertaPelatihan({
  pelatihan,
}: {
  pelatihan: DetailPelatihanMasyarakat;
}) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(
      () => setProgress(pelatihan.UserPelatihan!.length),
      500
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-1 text-gray-600">
      <Progress
        value={progress}
        max={parseInt(pelatihan?.KoutaPelatihan)}
        className="w-full"
      />
      <p className="text-gray-600 text-xs">
        Pendaftar : {pelatihan?.UserPelatihan.length} Pendaftar/
        {pelatihan?.KoutaPelatihan} Kuota Pendaftar
      </p>
    </div>
  );
}
