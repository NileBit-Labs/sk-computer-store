import Home from "@/components/Home";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.skcomputerstore.com"),
  title: "SK Computer Store | Laptops & Technology in Kampala",
  description: "Shop laptops, desktops and accessories at SK Computer Store in Wandegeya, Kampala. Contact our team for products and computer services.",
  openGraph: {
    type: "website",
    title: "SK Computer Store | Laptops & Technology in Kampala",
    description: "Shop laptops, desktops and accessories, with personal support from our team in Wandegeya, Kampala.",
    url: "https://www.skcomputerstore.com/",
    siteName: "SK Computer Store",
    images: [{ url: "/images/hero/sk-hero-studio.png", width: 1672, height: 941, alt: "A laptop at SK Computer Store" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SK Computer Store | Laptops & Technology in Kampala",
    description: "Shop laptops, desktops and accessories at SK Computer Store in Wandegeya, Kampala.",
    images: ["/images/hero/sk-hero-studio.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
