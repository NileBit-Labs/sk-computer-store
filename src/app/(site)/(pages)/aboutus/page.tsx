import Aboutus from "@/components/Aboutus";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Us Page | SK Computer Store",
  description: "This is About Us Page for SK Computer Store",
  // other metadata
};

const AboutusPage = () => {
  return (
    <main>
      <Aboutus />
    </main>
  );
};

export default AboutusPage;
