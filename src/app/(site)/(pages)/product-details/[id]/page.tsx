"use client";

import React from "react";
import { useParams } from "next/navigation";
import ProductDetails from "@/components/Common/ProductDetails";

const ProductDetailsPage = () => {
  const params = useParams();
  const productId = params.id;

  return (
    <div className="min-h-screen">
      <ProductDetails productId={productId} />
    </div>
  );
};

export default ProductDetailsPage;
