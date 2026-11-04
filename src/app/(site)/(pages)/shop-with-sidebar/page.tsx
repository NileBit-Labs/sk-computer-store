import React, { Suspense } from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import { Metadata } from "next";

// Note: Metadata can only be used in Server Components, not in Client Components
// Since we need to use client-side functionality like useSearchParams,
// we need to move the metadata to a separate exported constant
export const metadata: Metadata = {
  title: "Shop Page | SK Computer Store",
  description: "This is Shop Page for SK Computer Store",
  // other metadata
};

const ShopWithSidebarPage = () => {
  return (
    <main>
      <Suspense fallback={<div>Loading shop…</div>}><ShopWithSidebar /></Suspense>
    </main>
  );
};

export default ShopWithSidebarPage;
