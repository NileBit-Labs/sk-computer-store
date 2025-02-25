import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-02-17",
});

export async function fetchGadgets(limit = 12) {
  // Adding a limit parameter and ordering by _createdAt to get newest items first
  const query = `*[_type == "gadget"] | order(_createdAt desc)[0...${limit}]{
    _id,
    title,
    description,
    price,
    "imageUrl": image.asset->url,
    "imgs": coalesce(images[].asset->url, [image.asset->url]),
    categories[]-> { title },
    stock,
    _createdAt
  }`;

  try {
    const gadgets = await client.fetch(query);
    console.log(`Fetched ${gadgets.length} gadgets`);

    // Transform data to match the expected format in ProductItem component
    return gadgets.map((gadget) => ({
      id: gadget._id,
      title: gadget.title,
      price: Number(gadget.price),
      imageUrl: gadget.imageUrl,
      imgs: gadget.imgs,
      description: gadget.description,
      stock: gadget.stock,
      categories: gadget.categories?.map((cat) => cat.title) || [],
    }));
  } catch (error) {
    console.error("Error fetching gadgets:", error);
    return [];
  }
}

export async function fetchNewArrivals(limit = 8) {
  // This function specifically gets new arrivals
  // Order by _createdAt to get the newest items first
  const query = `*[_type == "gadget"] | order(_createdAt desc)[0...${limit}]{
    _id,
    title,
    description,
    price,
    "imageUrl": image.asset->url,
    "imgs": coalesce(images[].asset->url, [image.asset->url]),
    categories[]-> { title },
    stock,
    _createdAt
  }`;

  try {
    const newArrivals = await client.fetch(query);
    console.log(`Fetched ${newArrivals.length} new arrivals`);

    // Transform data to match the expected format in ProductItem component
    return newArrivals.map((gadget) => ({
      id: gadget._id,
      title: gadget.title,
      price: Number(gadget.price),
      imageUrl: gadget.imageUrl,
      imgs: gadget.imgs,
      description: gadget.description,
      stock: gadget.stock,
      categories: gadget.categories?.map((cat) => cat.title) || [],
    }));
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return [];
  }
}
