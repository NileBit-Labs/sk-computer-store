import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SK Computer Store",
  description: "This is Home for SK Computer Store",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
