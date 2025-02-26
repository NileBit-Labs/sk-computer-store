/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToFavourites } from "@/redux/features/favourites-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { updateproductDetails } from "@/redux/features/product-details";
import { useRouter } from "next/navigation";

const SingleListItem = ({ item }: { item: Product }) => {
  const router = useRouter();
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
  };

  const handleNavigateToDetails = () => {
    dispatch(updateproductDetails(item));
    router.push(`/product-details/${item.id || item._id}`);
  };

  // add to cart
  const handleAddToCart = () => {
    // Format the product details
    const productDetails = `${item.title} - ${item.price}`;

    // Create message
    const message = `Hello, I'm interested in this product: ${productDetails}`;

    // Get current URL
    const productUrl = `${window.location.origin}${window.location.pathname}`;

    // Combine message with URL
    const fullMessage = `${message}\n\nProduct Link: ${productUrl}`;

    // Encode the message
    const encodedMessage = encodeURIComponent(fullMessage);

    // WhatsApp number
    const whatsappNumber = "256774077357";

    // Create and open WhatsApp URL
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  const handleItemToFavourites = () => {
    dispatch(
      addItemToFavourites({
        id: Number(item.id),
        title: item.title,
        price: Number(item.price),
        discountedPrice: item.discountedPrice
          ? Number(item.discountedPrice)
          : Number(item.price),
        quantity: 1,
        imageUrl: item.imageUrl,
        imgs: item.imgs,
      })
    );
  };

  return (
    <div className="group relative rounded-2xl bg-white p-4 transition-all duration-300 hover:shadow-2xl">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Product Image Section */}
        <div className="relative w-full md:w-1/3">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#00918e]/10 to-blue-50 p-0.5">
            <div className="relative overflow-hidden rounded-xl bg-white">
              <a
                onClick={() => {
                  openModal();
                  handleQuickViewUpdate();
                }}
                className="block"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-[180px] md:h-[220px] w-full object-contain p-4 transition-all duration-700 ease-out group-hover:scale-105"
                />
              </a>

              {/* Action buttons overlay */}
              <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
                <div className="mb-4 flex items-center gap-3 px-4">
                  <button
                    onClick={() => {
                      openModal();
                      handleQuickViewUpdate();
                    }}
                    className="rounded-full bg-white/95 p-2.5 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white hover:text-[#00918e]"
                    aria-label="Quick view"
                  >
                    <svg
                      className="h-4.5 w-4.5"
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

                  <button
                    onClick={handleItemToFavourites}
                    className="rounded-full bg-white/95 p-2.5 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white hover:text-rose-600"
                    aria-label="Add to favorites"
                  >
                    <svg
                      className="h-4.5 w-4.5"
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
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-2/3 flex flex-col justify-between">
          <div className="space-y-2">
            <button
              onClick={handleNavigateToDetails}
              className="block text-left"
            >
              <h3 className="text-xl font-bold text-[#00918e] transition-colors duration-200 hover:text-[#025250] line-clamp-2">
                {item.title}
              </h3>
            </button>

            {/* Price and Stock Section */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-900">
                  <span className="ml-1 text-sm font-medium text-gray-600">
                    UGX{" "}
                  </span>
                  {item.price}
                </span>
                {item.discountedPrice && (
                  <span className="text-sm line-through text-gray-500">
                    <span className="text-xs">UGX </span>
                    {item.discountedPrice}
                  </span>
                )}
              </div>

              {/* In Stock Indicator - New addition */}
              <div className="flex items-center gap-1">
                {Number(item.stock) > 0 ? (
                  <div className="flex items-center text-green-600">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-1 text-sm font-medium">In Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-1 text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Description - New addition */}
            <p className="text-sm text-gray-600 line-clamp-2 hidden md:block">
              {item.description || "Product description not available."}
            </p>

            {/* Rating Section - Enhanced from the original */}
            <div className="flex items-center gap-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < (item.rating || 5)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              <span className="ml-1 text-xs text-gray-600">
                ({item.stock || 0} reviews)
              </span>
            </div>
          </div>

          {/* Buy Button and Delivery Info - New layout */}
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <button
              onClick={handleAddToCart}
              className="inline-flex transform items-center gap-2 rounded-lg bg-[#00918e] px-6 py-2.5 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-[#013634]"
            >
              <span>Buy Now</span>
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
            </button>

            {/* Delivery Info - New addition */}
            <div className="flex items-center text-gray-600">
              <svg
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-5a1 1 0 00-1-1h-8a1 1 0 00-.707.293l-2.58 2.58A1 1 0 008 6v2H3a1 1 0 00-1 1v6a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h2.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-1h-1.05a2.5 2.5 0 00-4.9 0h-2.1a2.5 2.5 0 00-4.9 0H4a1 1 0 01-1-1V6a1 1 0 00-1-1h4a1 1 0 001-1V3a1 1 0 00-1-1H3zm9 3.5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h1z" />
              </svg>
              <span className="text-xs">Free delivery within Kampala</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListItem;
