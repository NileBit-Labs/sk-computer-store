import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SK Computer Store | Nextjs E-commerce template",
  description: "This is Home for SK Computer Store Template",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
