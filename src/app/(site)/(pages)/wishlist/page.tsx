import React from "react";
import { Favourites } from "@/components/Favourites";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favourites Page | NextCommerce Nextjs E-commerce template",
  description: "This is Favourites Page for NextCommerce Template",
  // other metadata
};

const FavouritesesPage = () => {
  return (
    <main>
      <Favourites />
    </main>
  );
};

export default FavouritesesPage;
