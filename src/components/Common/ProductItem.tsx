/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToFavourites } from "@/redux/features/favourites-slice";
import { updateproductDetails } from "@/redux/features/product-details";

interface ProductItemProps {
  item: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const router = useRouter();
  const modalContext = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  const handleNavigateToDetails = () => {
    dispatch(updateproductDetails(item));
    router.push(`/product-details/${item.id || item._id}`);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    modalContext.openModal();
    dispatch(updateQuickView(item));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const productDetails = `${item.title} - ${item.price}`;
    const message = `Hello, I'm interested in this product: ${productDetails}`;
    const productUrl = `${window.location.origin}${window.location.pathname}`;
    const fullMessage = `${message}\n\nProduct Link: ${productUrl}`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappNumber = "256774077357";
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  const handleAddToFavorites = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    // CHANGE: Reduced padding (p-5 to p-4) to decrease overall card size
    <div
      onClick={handleNavigateToDetails}
      className="group relative rounded-2xl bg-white p-4 transition-all duration-300 hover:shadow-2xl cursor-pointer"
    >
      {/* CHANGE: Reduced bottom margin (mb-4 to mb-3) to decrease vertical spacing */}
      <div className="relative mb-3 overflow-hidden rounded-xl bg-gradient-to-br from-[#00918e]/10 to-blue-50 p-0.5">
        <div className="relative overflow-hidden rounded-xl bg-white">
          <div className="block w-full">
            {/* CHANGE: Reduced image height (h-[260px] to h-[200px]) to make card shorter
                 Added aspect-ratio to maintain consistent image proportions
                 Reduced padding (p-6 to p-4) */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-[200px] w-full object-contain aspect-ratio-1/1 p-4 transition-all duration-700 ease-out group-hover:scale-105"
            />
          </div>
          {/* CHANGE: Reduced margin on buttons (mb-6 to mb-4) */}
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="mb-4 flex items-center gap-3 px-4">
              <ActionButton
                onClick={handleQuickView}
                className="hover:text-[#00918e]"
                ariaLabel="Quick view"
                icon={<EyeIcon />}
              />

              {/* CHANGE: Reduced button padding (py-2.5 to py-2) */}
              <button
                onClick={handleAddToCart}
                className="inline-flex transform items-center gap-2 rounded-lg bg-[#00918e] px-5 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-[#013634]"
              >
                <span>Buy</span>
                <CartIcon />
              </button>

              <ActionButton
                onClick={handleAddToFavorites}
                className="hover:text-rose-600"
                ariaLabel="Add to favorites"
                icon={<HeartIcon />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CHANGE: Reduced spacing between elements (space-y-2 to space-y-1) */}
      <div className="space-y-1">
        <div
          className="block w-full text-left"
          onClick={handleNavigateToDetails}
        >
          {/* CHANGE: Made title slightly smaller (text-base to text-sm) 
               Added height constraints (line-clamp-2) to keep consistent height */}
          <h3 className="text-lg font-bold text-[#00918e] transition-colors duration-200 hover:text-[#025250] line-clamp-2">
            {item.title}
          </h3>
        </div>

        <div className="flex items-center">
          {/* CHANGE: Reduced price text size (text-xl to text-lg) */}
          <span className="text-sm font-medium text-gray-900">
            {formatPrice(item.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

// CHANGE: Reduced action button padding (p-3 to p-2.5) and icon size
const ActionButton: React.FC<{
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  ariaLabel: string;
  icon: React.ReactNode;
}> = ({ onClick, className, ariaLabel, icon }) => (
  <button
    onClick={onClick}
    className={`rounded-full bg-white/95 p-2.5 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white ${className}`}
    aria-label={ariaLabel}
  >
    {icon}
  </button>
);

// CHANGE: Reduced icon size (h-5 w-5 to h-4.5 w-4.5)
const EyeIcon = () => (
  <svg className="h-4.5 w-4.5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path
      fillRule="evenodd"
      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
      clipRule="evenodd"
    />
  </svg>
);

const CartIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
  </svg>
);

// CHANGE: Reduced icon size (h-5 w-5 to h-4.5 w-4.5)
const HeartIcon = () => (
  <svg className="h-4.5 w-4.5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
);

export default ProductItem;
