import AKP from "@/components/dashboard/Dashboard/AKP";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard AKAPI - Aplikasi Awak Kapal Perikanan",
};

export default function page() {
  return (
    <section className="m-16">
      <AKP />
    </section>
  );
}
