import React from "react";
import { Favourites } from "@/components/Favourites";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favourites Page | SK Computer Store",
  description: "This is Favourites Page for SK Computer Store",
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
