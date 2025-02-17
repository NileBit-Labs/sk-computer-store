import { createClient } from '@sanity/client';


const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-02-17',
});



export async function fetchGadgets() {
  const query = `*[_type == "gadget"]{
    _id,
    title,
    description,
    price,
    "imageUrl": image.asset->url,
    categories[]-> { title },
    stock
  }`;

  const gadgets = await client.fetch(query);
  return gadgets;
}