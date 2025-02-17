/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToFavourites } from "@/redux/features/favourites-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";

const ProductItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
  };

  // add to cart
  const handleAddToCart = () => {
    // dispatch(
    //   addItemToCart({
    //     ...item,
    //     quantity: 1,
    //   })
    // );
  };

  const handleItemToFavourites = () => {
    // dispatch(
    //   addItemToFavourites({
    //     ...item,
    //     status: "available",
    //     quantity: 1,
    //   })
    // );
  };

  const handleProductDetails = () => {
    dispatch(updateproductDetails({ ...item }));
  };

  return (
    <div className="group relative rounded-2xl bg-white p-5 transition-all duration-300 hover:shadow-2xl">
      {/* Main Image Container with Enhanced Design */}
      <div className="relative mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-[#00918e]/10 to-blue-50 p-0.5">
        <div className="relative overflow-hidden rounded-xl bg-white">
          <a
            // href={`/product/${item.id}`}
            onClick={() => {
              openModal();
              handleQuickViewUpdate();
            }}
            className="block"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-[260px] w-full object-contain p-6 transition-all duration-700 ease-out group-hover:scale-105"
            />
          </a>

          {/* Action Buttons Overlay */}
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="mb-6 flex items-center gap-3 px-4">
              {/* Quick View Button */}
              <button
                onClick={() => {
                  openModal();
                  handleQuickViewUpdate();
                }}
                className="rounded-full bg-white/95 p-3 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white hover:text-[#00918e]"
                aria-label="Quick view"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Buy Button with Enhanced Design */}
              <button
                onClick={handleAddToCart}
                className="inline-flex transform items-center gap-2 rounded-lg bg-[#00918e] px-5 py-2.5 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-[#013634]"
              >
                <span>Buy</span>
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                </svg>
              </button>

              {/* Favorite Button */}
              <button
                onClick={handleItemToFavourites}
                className="rounded-full bg-white/95 p-3 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white hover:text-rose-600"
                aria-label="Add to favorites"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info with Enhanced Design */}
      <div className="space-y-2">
        <button
          onClick={() => {
            openModal();
            handleQuickViewUpdate();
          }}
          className="block text-left"
        >
          <h3 className="text-base font-medium text-gray-900 transition-colors duration-200 hover:text-[#00918e] line-clamp-2">
            {item.title}
          </h3>
        </button>

        <div className="flex items-center">
          <span className="text-xl font-bold text-gray-900">
            <span className="ml-1 text-sm font-medium text-gray-600">UGX </span>
            {item.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
