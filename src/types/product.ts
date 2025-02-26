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

import { ReactNode } from "react";

export type Product = {
  categoryId: any;
  _id: any;
  category: string;
  discountedPrice: ReactNode | Iterable<ReactNode>;
  tags: any;
  // discountedPrice: ReactI18NextChildren | Iterable<ReactI18NextChildren>;
  imgs: any;
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  categories: { title: string }[];
  stock: number;
  rating?: number;
  status?: string;
};
