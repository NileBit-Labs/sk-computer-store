import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-02-17",
});

export async function fetchCategories() {
  const query = `*[_type == "category"] {
    _id,
    title,
    "imageUrl": image.asset->url,
    image,
    "products": count(*[_type == "gadget" && references(^._id)])
  }`;

  return await client.fetch(query);
}

// const categoryQuery = `*[_type == "category"]{
//   _id,
//   title
// }`

// // Log the results
// const categories = await client.fetch(categoryQuery)
// console.log('Categories:', categories)

export async function fetchGadgetsByCategories(categoryIds: string[] = []) {
  const query = `*[_type == "gadget" ${
    categoryIds.length > 0
      ? "&& count((categories[]->_id)[@ in $categories]) > 0"
      : ""
  }] {
      _id,
      title,
      description,
      price,
      "imageUrl": image.asset->url,
      stock,
      "categories": categories[]->{ 
        _id, 
        title,
        image
      }
    }`;

  return await client.fetch(query, { categories: categoryIds });
}
