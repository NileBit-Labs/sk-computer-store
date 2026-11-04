import { Metadata } from "next";
import ProductDetails from "@/components/Common/ProductDetails";
import { client } from "@/sanity/lib/client";

type Props = { params: { id: string } };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const product = await client.fetch<{ title?: string; description?: string; imageUrl?: string } | null>(
      `*[_type == "gadget" && _id == $id][0]{title,description,"imageUrl":image.asset->url}`,
      { id: params.id }
    );
    if (!product?.title) return { title: "Product | SK Computer Store" };
    const title = `${product.title} | SK Computer Store`;
    const description = product.description?.replace(/\s+/g, " ").trim().slice(0, 160) || `Explore ${product.title} at SK Computer Store in Kampala.`;
    const image = product.imageUrl ? [product.imageUrl] : [];
    return { title, description, openGraph: { type: "website", title, description, siteName: "SK Computer Store", url: `https://www.skcomputerstore.com/product-details/${encodeURIComponent(params.id)}`, images: image }, twitter: { card: "summary_large_image", title, description, images: image } };
  } catch {
    return { title: "Product | SK Computer Store", description: "Discover products at SK Computer Store in Kampala." };
  }
}

export default function ProductDetailsPage({ params }: Props) {
  return <ProductDetails productId={params.id} />;
}
