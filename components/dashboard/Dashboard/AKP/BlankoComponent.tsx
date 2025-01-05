"use client";

import React, { ReactNode } from "react";

interface BlankoComponentProps {
  icon: ReactNode;
  title: string;
  description: string;
  table: ReactNode;
  summary?: ReactNode;
}

export const BlankoComponent: React.FC<BlankoComponentProps> = ({
  icon: Icon,
  title,
  description,
  table: TableComponent,
  summary: Summary,
}) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          {Icon}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold font-calsans leading-none uppercase">
              {title}
            </h1>
            <p className="font-medium text-gray-400 text-base leading-none">
              {description}
            </p>
          </div>
        </div>
        {Summary}
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-7.5">{TableComponent}</div>
    </>
  );
};
