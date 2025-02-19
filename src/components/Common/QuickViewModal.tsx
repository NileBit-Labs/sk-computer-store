"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";
import { resetQuickView } from "@/redux/features/quickView-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import { ZoomIn, X, ShoppingBag, Heart, Star, Check } from "lucide-react";

const QuickViewModal = () => {
  const { isModalOpen, closeModal } = useModalContext();
  const { openPreviewModal } = usePreviewSlider();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const product = useAppSelector((state) => state.quickViewReducer.value);

  const handlePreviewSlider = () => {
    dispatch(updateproductDetails(product));
    openPreviewModal();
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addItemToCart({
          ...product,
          id: Number(product.id),
          quantity,
          discountedPrice: Number(product.discountedPrice),
        })
      );
      closeModal();
    }
  };

  const formatPrice = (price: number) =>
    price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".modal-content")) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setQuantity(1);
    };
  }, [isModalOpen, closeModal]);

  if (!product) return null;

  return (
    <div
      className={`
      fixed inset-0 
      ${isModalOpen ? "opacity-100 z-[9999]" : "opacity-0 pointer-events-none"} 
      transition-opacity duration-300 
      bg-black/60 backdrop-blur-sm 
      overflow-y-auto
    `}
    >
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
        <div
          className="
          bg-white rounded-2xl shadow-2xl 
          w-full max-w-4xl p-8 
          relative modal-content
          transform transition-transform duration-300
          ${isModalOpen ? 'scale-100' : 'scale-95'}
        "
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="
              absolute right-6 top-6 
              p-2 rounded-full 
              bg-gray-100 hover:bg-gray-200 
              transition-colors duration-200
            "
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="relative group">
              <div
                className="
                aspect-square 
                bg-gray-50 
                rounded-xl 
                overflow-hidden
                shadow-lg
              "
              >
                <button
                  onClick={handlePreviewSlider}
                  className="
                    absolute top-4 right-4 
                    bg-white/95 p-2.5 
                    rounded-lg shadow-md 
                    hover:bg-white 
                    transition-all duration-200 
                    z-10
                    opacity-0 group-hover:opacity-100
                    transform translate-y-2 group-hover:translate-y-0
                  "
                  aria-label="Zoom image"
                >
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </button>
                <Image
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="
                    object-contain w-full h-full 
                    transition-transform duration-500 
                    group-hover:scale-110
                  "
                />
              </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col h-full space-y-6">
              {/* <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-4">
                SALE 20% OFF
              </span> */}

              <h2 className="text-3xl font-bold text-gray-900">
                {product.title}
              </h2>

              {/* Ratings */}
              <div className="flex items-center">
                {/* <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${star <= 3 ? "text-yellow-400" : "text-gray-200"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">4.7</span>
                </div> */}
                <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                  <Check className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">In Stock</span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-600 font-medium">UGX</span>
                  <span className="text-4xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>

              {/* Quantity */}
              {/* <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Quantity
                </span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div> */}

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="
                    flex-1 bg-[#00918e] text-white 
                    px-6 py-4 rounded-xl font-medium 
                    hover:bg-[#013634] 
                    transition-colors duration-200
                    flex items-center justify-center gap-3
                    shadow-lg shadow-[#00918e]/20
                  "
                >
                  <span>Buy Now</span>
                  <ShoppingBag className="w-5 h-5" />
                </button>
                <button
                  className="
                  flex items-center justify-center gap-3 
                  px-6 py-4 
                  border-2 border-gray-200 
                  rounded-xl 
                  text-gray-700 
                  hover:border-gray-300 hover:bg-gray-50 
                  transition-all duration-200
                "
                >
                  <Heart className="w-5 h-5" />
                  <span>Favorite</span>
                </button>
              </div>

              {/* Additional Details */}
              <div className="border-t border-gray-100 pt-6 mt-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-medium capitalize px-3 py-1 bg-gray-100 rounded-full">
                      {product.category || "General"}
                    </span>
                  </div>
                  {product.tags && (
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-500">Tags:</span>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="
                              px-3 py-1 
                              bg-gray-100 
                              rounded-full 
                              text-xs font-medium 
                              text-gray-600
                              hover:bg-gray-200
                              transition-colors duration-200
                              cursor-pointer
                            "
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
