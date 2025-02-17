import { createClient } from '@sanity/client';
import { Product } from "@/types/product";
import imageUrlBuilder from '@sanity/image-url';

// Initialize the Sanity client using environment variables
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-02-17',
});

// // Initialize the image URL builder
// const builder = imageUrlBuilder(client);

// // Function to generate image URL from Sanity image reference
// function urlFor(source: any) {
//   return builder.image(source);
// }

// // Function to transform Sanity data to match your Product type
// function transformSanityData(sanityGadget: any): Product {
//   return {
//     id: sanityGadget._id,
//     title: sanityGadget.title,
//     price: sanityGadget.price,
//     discountedPrice: sanityGadget.price, // You might want to add a discount field to your Sanity schema
//     reviews: 0, // You might want to add a reviews field to your Sanity schema
//     imgs:sanityGadget.image,
//     // imgs: {
//     //   thumbnails: [
//     //     urlFor(sanityGadget.image).width(300).url() || '',
//     //     urlFor(sanityGadget.image).width(300).url() || '',
//     //   ],
//     //   previews: [
//     //     urlFor(sanityGadget.image).width(800).url() || '',
//     //     urlFor(sanityGadget.image).width(800).url() || '',
//     //   ],
//     // },
//   };
// }

// // Main function to fetch products from Sanity
// export async function fetchProducts(): Promise<Product[]> {
//   const query = `
//     *[_type == "gadget"] {
//       _id,
//       title,
//       price,
//      "imageUrl": image.asset->url,
//       categories[]->{
//         title
//       }
//     }
//   `;

//   try {
//     const sanityData = await client.fetch(query);
//     return sanityData.map(transformSanityData);
//   } catch (error) {
//     console.error('Error fetching products from Sanity:', error);
//     return [];
//   }
// }

// // Usage example:
// export async function getShopData(): Promise<Product[]> {
//   try {
//     const products = await fetchProducts();
//     // console.log('Productssssssssssssss:', products);
//     return products;
//   } catch (error) {
//     console.error('Error getting shop data:', error);
//     return [];
//   }
// }


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