import Image from "next/image";

export default function SertifikatPage2() {
  return (
    <div className="w-full border flex flex-col gap-4 border-gray-300 px-10 py-6 rounded-md font-cambria leading-[120%] !h-[120vh]">
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-col font-cambria text-center">
            <p className="font-extrabold max-w-md w-full italic">
              Good Aquaculture Practices (GAqP) Training For Students in the
              Marine and Fisheries Education Units
            </p>
            <p className="font-extrabold max-w-3xl">19 – 21 February 2024</p>
          </div>
        </div>
      </div>

      <table
        border={1}
        className="text-center border border-black-2 p-2 rounded-md"
      >
        <tr>
          <td
            rowSpan={2}
            className="border border-black-2 p-2 font-extrabold text-lg"
          >
            NO.
          </td>
          <td
            rowSpan={2}
            className="border border-black-2 p-2 font-extrabold text-lg"
          >
            COURSES
          </td>
          <td
            colSpan={3}
            className="border border-black-2 p-2 font-extrabold text-lg"
          >
            JAM PELATIHAN
          </td>
        </tr>
        <tr>
          <td className="border border-black-2 p-2 font-extrabold text-lg">
            T
          </td>
          <td className="border border-black-2 p-2 font-extrabold text-lg">
            P
          </td>
        </tr>
        <tr>
          <td className="border border-black-2 p-2 font-black">I</td>
          <td className="border border-black-2 font-black p-2 text-left">
            GENERAL COMPETENCY
          </td>
          <td className="border border-black-2 p-2"></td>
          <td className="border border-black-2 p-2"></td>
        </tr>
        <tr>
          <td className="border border-black-2 p-2">1.</td>
          <td className="border border-black-2 p-2 text-left">
            GAqP Certification Policy
          </td>
          <td className="border border-black-2 p-2">1</td>
          <td className="border border-black-2 p-2">3</td>
        </tr>
        <tr>
          <td className="border border-black-2 p-2 font-black">II</td>
          <td className="border border-black-2 font-black p-2 text-left">
            CORE COMPETENCIES
          </td>
          <td className="border border-black-2 p-2"></td>
          <td className="border border-black-2 p-2"></td>
        </tr>
        <tr>
          <td className="border border-black-2 p-2">2.</td>
          <td className="border border-black-2 p-2 text-left">
            Food Hazards, International and National Requirements
          </td>
          <td className="border border-black-2 p-2">1</td>
          <td className="border border-black-2 p-2">3</td>
        </tr>
        <tr>
          <td className="border border-black-2 p-2">3.</td>
          <td className="border border-black-2 p-2 text-left">
            Indonesian National GAqP Food Safety Standard Requirements
          </td>
          <td className="border border-black-2 p-2">1</td>
          <td className="border border-black-2 p-2">3</td>
        </tr>
        <tr>
          <td className="border border-black-2 p-2">4.</td>
          <td className="border border-black-2 p-2 text-left">
            Aquaculture Quality and Safety Guarantee System Mechanism for
            Fishery Products
          </td>
          <td className="border border-black-2 p-2">1</td>
          <td className="border border-black-2 p-2">3</td>
        </tr>
        <tr>
          <td className="border border-black-2 p-2">4.</td>
          <td className="border border-black-2 p-2 text-left">
            Aquaculture Unit Risk Management
          </td>
          <td className="border border-black-2 p-2">1</td>
          <td className="border border-black-2 p-2">3</td>
        </tr>
        <tr>
          <td className="border border-black-2 p-2">4.</td>
          <td className="border border-black-2 p-2 text-left">
            Fish Health Management and Biosecurity
          </td>
          <td className="border border-black-2 p-2">1</td>
          <td className="border border-black-2 p-2">3</td>
        </tr>
        <tr>
          <td className="border border-black-2 p-2">4.</td>
          <td className="border border-black-2 p-2 text-left">
            Traceability in the Fish Aquaculture Unit
          </td>
          <td className="border border-black-2 p-2">1</td>
          <td className="border border-black-2 p-2">3</td>
        </tr>
        <tr>
          <td className="border border-black-2 p-2">4.</td>
          <td className="border border-black-2 p-2 text-left">
            Aquaculture Process Control Procedures
          </td>
          <td className="border border-black-2 p-2">1</td>
          <td className="border border-black-2 p-2">3</td>
        </tr>
        <tr>
          <td
            colSpan={2}
            className="font-extrabold text-lg border border-black-2 p-2"
          >
            JUMLAH TOTAL
          </td>
          <td className="border border-black-2 p-2 font-extrabold">4</td>
          <td className="border border-black-2 p-2 font-extrabold">12</td>
        </tr>
      </table>
    </div>
  );
}
