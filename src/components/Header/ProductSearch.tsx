"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import CustomSelect from "./CustomSelect";

// Define category options for the dropdown
const categoryOptions = [
  { label: "All Categories", value: "all" },
  { label: "Electronics", value: "electronics" },
  { label: "Clothing", value: "clothing" },
  { label: "Home", value: "home" },
  { label: "Beauty", value: "beauty" },
];

const ProductSearch: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      // Construct the URL with query parameters
      const searchParams = new URLSearchParams();

      // Add search query
      searchParams.set("query", searchQuery);

      // Add category if not "all"
      if (selectedCategory.value !== "all") {
        searchParams.set("category", selectedCategory.value);
      }

      // Redirect to shop page with search parameters
      router.push(`/shop-sidebar?${searchParams.toString()}`);
    }
  };

  return (
    <div className="hidden md:block max-w-2xl mx-8 absolute left-1/2 -translate-x-1/2">
      <form onSubmit={handleSearch} className="flex">
        <CustomSelect
          options={categoryOptions}
          className="min-w-[160px] bg-[#49aba9] text-white hover:text-teal-200 transition-colors"
          onChange={(option) => setSelectedCategory(option)}
        />
        <div className="relative flex-1">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-4 pr-10 py-2 border border-l-0 border-white rounded-r-lg focus:outline-none focus:border-teal-200 bg-[#00918e] text-white placeholder-teal-200"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-200 hover:text-white transition-colors"
          >
            <Search size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductSearch;
