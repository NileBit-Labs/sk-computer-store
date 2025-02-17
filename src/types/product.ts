// export type Product = {
//   title: string;
//   reviews: number;
//   price: number;
//   discountedPrice: number;
//   id: number;
//   imgs?: {
//     thumbnails: string[];
//     previews: string[];
//   };
// };

export type Product = {
  id: string; 
  title: string;
  description: string;
  price: number;
  imageUrl: string; 
  categories: { title: string }[]; 
  stock: number; 
};

