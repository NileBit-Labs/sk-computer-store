"use client";

import { useState, useEffect } from "react";
import { fetchCategories } from "./categoryUtils";

const CategoryItem = ({ category, onSelect, selectedCategories }) => {
  const selected = selectedCategories.includes(category._id);

  const handleSelect = () => {
    onSelect(category._id);
  };

  return (
    <button
      className={`${selected ? "text-blue" : ""} group flex items-center justify-between ease-out duration-200 hover:text-blue`}
      onClick={handleSelect}
    >
      <div className="flex items-center gap-2">
        <div
          className={`cursor-pointer flex items-center justify-center rounded w-4 h-4 border ${
            selected ? "border-blue bg-blue" : "bg-white border-gray-3"
          }`}
        >
          <svg
            className={selected ? "block" : "hidden"}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.33317 2.5L3.74984 7.08333L1.6665 5"
              stroke="white"
              strokeWidth="1.94437"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span>{category.title}</span>
      </div>
      <span
        className={`${
          selected ? "text-white bg-blue" : "bg-gray-2"
        } inline-flex rounded-[30px] text-custom-xs px-2 ease-out duration-200 group-hover:text-white group-hover:bg-blue`}
      >
        {category.products}
      </span>
    </button>
  );
};

const CategoryDropdown = ({ onCategoryChange }) => {
  const [toggleDropdown, setToggleDropdown] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        console.log(categories,"categoreiesssss");
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategories((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(categoryId)) {
        newSelection.delete(categoryId);
      } else {
        newSelection.add(categoryId);
      }

      onCategoryChange(Array.from(newSelection));
      return Array.from(newSelection);
    });
  };

  return (
    <div className="bg-white shadow-1 rounded-lg">
      <div
        onClick={(e) => {
          e.preventDefault();
          setToggleDropdown(!toggleDropdown);
        }}
        className={`cursor-pointer flex items-center justify-between py-3 pl-6 pr-5.5 ${
          toggleDropdown ? "shadow-filter" : ""
        }`}
      >
        <p className="text-dark">Category</p>
        <button
          aria-label="button for category dropdown"
          aria-expanded={toggleDropdown ? "true" : "false"}
          className={`text-dark ease-out duration-200 ${toggleDropdown ? "rotate-180" : ""}`}
        >
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.43057 8.51192C4.70014 8.19743 5.17361 8.161 5.48811 8.43057L12 14.0122L18.5119 8.43057C18.8264 8.16101 19.2999 8.19743 19.5695 8.51192C19.839 8.82642 19.8026 9.29989 19.4881 9.56946L12.4881 15.5695C12.2072 15.8102 11.7928 15.8102 11.5119 15.5695L4.51192 9.56946C4.19743 9.29989 4.161 8.82641 4.43057 8.51192Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      {loading ? (
        <p className="text-center py-3">Loading categories...</p>
      ) : (
        <div
          className={`flex-col gap-3 py-6 pl-6 pr-5.5 ${toggleDropdown ? "flex" : "hidden"}`}
        >
          {categories.map((category) => (
            <CategoryItem
              key={category._id}
              category={category}
              onSelect={handleCategorySelect}
              selectedCategories={selectedCategories}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;


<div className="flex justify-center mt-15">
<div className="bg-white shadow-1 rounded-md p-2">
  <ul className="flex items-center">
    <li>
      <button
        id="paginationLeft"
        aria-label="button for pagination left"
        type="button"
        disabled
        className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px disabled:text-gray-4"
      >
        <svg
          className="fill-current"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.1782 16.1156C12.0095 16.1156 11.8407 16.0594 11.7282 15.9187L5.37197 9.45C5.11885 9.19687 5.11885 8.80312 5.37197 8.55L11.7282 2.08125C11.9813 1.82812 12.3751 1.82812 12.6282 2.08125C12.8813 2.33437 12.8813 2.72812 12.6282 2.98125L6.72197 9L12.6563 15.0187C12.9095 15.2719 12.9095 15.6656 12.6563 15.9187C12.4876 16.0312 12.347 16.1156 12.1782 16.1156Z"
            fill=""
          />
        </svg>
      </button>
    </li>

    <li>
      <a
        href="#"
        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] bg-blue text-white hover:text-white hover:bg-blue"
      >
        1
      </a>
    </li>

    <li>
      <a
        href="#"
        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-blue"
      >
        2
      </a>
    </li>

    <li>
      <a
        href="#"
        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-blue"
      >
        3
      </a>
    </li>

    <li>
      <a
        href="#"
        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-blue"
      >
        4
      </a>
    </li>

    <li>
      <a
        href="#"
        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-blue"
      >
        5
      </a>
    </li>

    <li>
      <a
        href="#"
        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-blue"
      >
        ...
      </a>
    </li>

    <li>
      <a
        href="#"
        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-blue"
      >
        10
      </a>
    </li>

    <li>
      <button
        id="paginationLeft"
        aria-label="button for pagination left"
        type="button"
        className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] hover:text-white hover:bg-blue disabled:text-gray-4"
      >
        <svg
          className="fill-current"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.82197 16.1156C5.65322 16.1156 5.5126 16.0594 5.37197 15.9469C5.11885 15.6937 5.11885 15.3 5.37197 15.0469L11.2782 9L5.37197 2.98125C5.11885 2.72812 5.11885 2.33437 5.37197 2.08125C5.6251 1.82812 6.01885 1.82812 6.27197 2.08125L12.6282 8.55C12.8813 8.80312 12.8813 9.19687 12.6282 9.45L6.27197 15.9187C6.15947 16.0312 5.99072 16.1156 5.82197 16.1156Z"
            fill=""
          />
        </svg>
      </button>
    </li>
  </ul>
</div>
</div>