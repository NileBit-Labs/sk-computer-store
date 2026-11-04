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
    <div
      onClick={handleNavigateToDetails}
      className="group relative flex h-full w-full cursor-pointer flex-col rounded-2xl border border-gray-200 bg-white p-3 md:p-4
                 transition-all duration-300 hover:-translate-y-1 hover:border-[#00918e]/40 hover:shadow-xl"
    >
      <div className="relative mb-3 overflow-hidden rounded-xl bg-gray-50">
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          className="aspect-square h-[140px] w-full object-contain p-2 transition-transform duration-500 ease-out
                     group-hover:scale-105 md:h-[200px] md:p-4"
        />

        {/* Quick view + favourite: always visible on touch screens, on hover for desktop */}
        <div
          className="absolute right-2 top-2 flex flex-col gap-2 transition-all duration-300
                     md:translate-x-2 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100"
        >
          <ActionButton
            onClick={handleAddToFavorites}
            className="hover:text-rose-600"
            ariaLabel="Add to favourites"
            icon={<HeartIcon />}
          />
          <ActionButton
            onClick={handleQuickView}
            className="hover:text-[#00918e]"
            ariaLabel="Quick view"
            icon={<EyeIcon />}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <h3
          className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-gray-900
                     transition-colors duration-200 group-hover:text-[#00918e] md:min-h-[3rem] md:text-base md:leading-6"
        >
          {item.title}
        </h3>

        <p className="mt-1 text-base font-bold text-[#00918e] md:text-lg">
          {formatPrice(item.price)}
        </p>

        <button
          onClick={handleAddToCart}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#00918e] px-3 py-2
                     text-xs font-medium text-white transition-colors duration-200 hover:bg-[#007a78]
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00918e] focus-visible:ring-offset-2 md:text-sm"
        >
          <CartIcon />
          <span>Order on WhatsApp</span>
        </button>
      </div>
    </div>
  );
};

const ActionButton: React.FC<{
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  ariaLabel: string;
  icon: React.ReactNode;
}> = ({ onClick, className, ariaLabel, icon }) => (
  <button
    onClick={onClick}
    className={`rounded-full bg-white/95 text-gray-800 shadow-lg 
               transition-all duration-200 hover:scale-110 hover:bg-white 
               p-1.5 md:p-2.5 ${className}`}
    aria-label={ariaLabel}
  >
    {icon}
  </button>
);

const EyeIcon = () => (
  <svg
    className="h-3.5 w-3.5 md:h-4.5 md:w-4.5"
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
);

const CartIcon = () => (
  <svg
    className="h-3 w-3 md:h-4 md:w-4"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
  </svg>
);

const HeartIcon = () => (
  <svg
    className="h-3.5 w-3.5 md:h-4.5 md:w-4.5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
);

export default ProductItem;
