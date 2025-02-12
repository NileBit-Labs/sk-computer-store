import React from "react";
import BlogDetailsWithSidebar from "@/components/BlogDetailsWithSidebar";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog Details Page | SK Computer Store",
  description: "This is Blog Details Page for SK Computer Store",
  // other metadata
};

const BlogDetailsWithSidebarPage = () => {
  return (
    <main>
      <BlogDetailsWithSidebar />
    </main>
  );
};

export default BlogDetailsWithSidebarPage;
