import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import CountUp from "react-countup";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  const pathname = usePathname();
  return (
    <div
      className={`${
        pathname.includes("akp") &&
        "flex gap-2 items-center duration-1000 group"
      } rounded-xl border border-stroke bg-white hover:cursor-pointer px-7.5 py-6 shadow-default relative`}
    >
      <div
        className={`flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 ${
          pathname.includes("akp") && "h-20 w-20"
        }`}
      >
        <div
          className={`${
            pathname.includes("akp") &&
            "h-20 w-20 flex items-center justify-center"
          } group-hover:scale-110 duration-700 group-hover:-rotate-[30deg]`}
        >
          {" "}
          {children}
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between w-full">
        <div className="w-full">
          <h4
            className={`${pathname.includes(
              "akp" && "text-2xl"
            )} text-title-md font-bold text-black`}
          >
            <CountUp className="text-3xl" start={0} end={parseInt(total)} />
          </h4>
          <div className="w-full flex justify-between items-center">
            <span className="text-sm font-medium text-gray-800">{title}</span>
            {title != "Jumlah Blanko Rusak" && (
              <span className="flex items-center w-fit self-end text-xs text-blue-600">
                Lihat Detail <MdOutlineKeyboardArrowRight />
              </span>
            )}
          </div>
        </div>

        {}
      </div>
    </div>
  );
};

export default CardDataStats;
