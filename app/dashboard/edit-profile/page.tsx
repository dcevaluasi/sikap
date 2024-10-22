export const metadata = {
  title: "Edit Profile - Elektronik Layanan Pelatihan Utama Terpadu",
  description: "Page description",
};

import FormCompleteProfile from "@/components/dashboard/users/formCompleteProfile";
import Footer from "@/components/ui/footer";

export default function Page() {
  return (
    <>
      <FormCompleteProfile />
      <Footer />
    </>
  );
}
