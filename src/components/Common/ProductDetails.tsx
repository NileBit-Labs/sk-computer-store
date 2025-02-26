/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
// import Navigation from "swiper";
import {
  Check,
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { addItemToFavourites } from "@/redux/features/favourites-slice";
import { useAppSelector } from "@/redux/store";
import {
  fetchCategories,
  fetchGadgetsByCategories,
} from "../ShopWithSidebar/categoryUtils";

// Import Swiper styles
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { client } from "@/sanity/lib/client";
import { updateproductDetails } from "@/redux/features/product-details";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  productId?: string | string[];
}

interface RelatedProduct {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  _id?: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const product = useAppSelector((state) => state.productDetailsReducer.value);
  console.log("Product from Redux:", product);

  // Initialize Swiper ref
  const swiperRef = React.useRef(null);

  // Add this state for other products
  const [otherProducts, setOtherProducts] = useState([]);
  const [isLoadingOtherProducts, setIsLoadingOtherProducts] = useState(true);

  const router = useRouter();
  const handleNavigateToDetails = () => {
    dispatch(updateproductDetails(product));
    router.push(`/product-details/${product.id || product._id}`);
  };

  // Add this function to fetch random products
  const fetchOtherProducts = async () => {
    try {
      setIsLoadingOtherProducts(true);
      const allProducts = await fetchAllGadgets();

      // Filter out the current product
      const filteredProducts = allProducts
        .filter(
          (item) =>
            item._id !== product._id &&
            item.id !== product.id &&
            String(item.id) !== String(product.id)
        )
        // Randomly shuffle the array (Fisher-Yates algorithm)
        .sort(() => 0.5 - Math.random())
        // Take only 10 products
        .slice(0, 10);

      setOtherProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching other products:", error);
    } finally {
      setIsLoadingOtherProducts(false);
    }
  };

  // Add this function to fetch all gadgets
  // (you might already have something similar in your codebase)
  const fetchAllGadgets = async () => {
    const query = `*[_type == "gadget"] {
    _id,
    id,
    title,
    price,
    "imageUrl": image.asset->url
  }`;

    // If you're using the Sanity client directly in this component
    return await client.fetch(query);
  };

  // Call the function in useEffect
  useEffect(() => {
    if (product) {
      fetchOtherProducts();
    }
  }, [product]);

  const handleNext = () => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slidePrev();
  };

  const handleBuyNow = () => {
    const productDetails = `${product.title} - ${formatPrice(product.price)}`;
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

  const handleAddToFavourites = () => {
    dispatch(
      addItemToFavourites({
        id: Number(product.id),
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        discountedPrice: 0,
        quantity: 0,
      })
    );
  };

  const formatPrice = (price: number) =>
    price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading product details...</div>
      </div>
    );
  }

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-8"
      style={{ backgroundColor: "#f3f4f6" }}
    >
      {/* Breadcrumb */}
      <div className="mb-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-[#00918e] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </button>
      </div>
      {/* Product Information Card - Redesigned Layout */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Image Gallery - Left Side */}
        <div className="lg:w-1/2 p-6">
          {/* Main Image with border effect */}
          <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square shadow-[0_0_10px_rgba(0,145,142,0.2)] group">
            <Image
              src={product.imgs?.previews?.[selectedImage] || product.imageUrl}
              alt={product.title}
              fill
              className="object-contain p-4 transition-all duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Thumbnail Gallery */}
          {product.imgs?.previews && product.imgs.previews.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
              {product.imgs.previews.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`
                    aspect-square relative bg-gray-50 rounded-lg overflow-hidden
                    border border-gray-100 shadow-sm shadow-[#00918e]/10 group
                    ${selectedImage === index ? "ring-2 ring-[#00918e]" : ""}
                    hover:ring-2 hover:ring-[#00918e]/50 transition-all
                  `}
                >
                  <Image
                    src={img}
                    alt={`${product.title} view ${index + 1}`}
                    fill
                    className="object-contain p-2 transition-all duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 25vw, 10vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details - Right Side */}
        <div className="lg:w-1/2 flex flex-col">
          {/* Product Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-4 mb-2">
              {/* Stock status */}
              <div className="min-w-[265px]">
                {product.status === "out_of_stock" ? (
                  <div className="flex items-center gap-1.5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.99935 14.7917C10.3445 14.7917 10.6243 14.5119 10.6243 14.1667V9.16669C10.6243 8.82151 10.3445 8.54169 9.99935 8.54169C9.65417 8.54169 9.37435 8.82151 9.37435 9.16669V14.1667C9.37435 14.5119 9.65417 14.7917 9.99935 14.7917Z"
                        fill="#F23030"
                      />
                      <path
                        d="M9.99935 5.83335C10.4596 5.83335 10.8327 6.20645 10.8327 6.66669C10.8327 7.12692 10.4596 7.50002 9.99935 7.50002C9.53911 7.50002 9.16602 7.12692 9.16602 6.66669C9.16602 6.20645 9.53911 5.83335 9.99935 5.83335Z"
                        fill="#F23030"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.04102 10C1.04102 5.05247 5.0518 1.04169 9.99935 1.04169C14.9469 1.04169 18.9577 5.05247 18.9577 10C18.9577 14.9476 14.9469 18.9584 9.99935 18.9584C5.0518 18.9584 1.04102 14.9476 1.04102 10ZM9.99935 2.29169C5.74215 2.29169 2.29102 5.74283 2.29102 10C2.29102 14.2572 5.74215 17.7084 9.99935 17.7084C14.2565 17.7084 17.7077 14.2572 17.7077 10C17.7077 5.74283 14.2565 2.29169 9.99935 2.29169Z"
                        fill="#F23030"
                      />
                    </svg>
                    <span className="text-red"> Out of Stock </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.6 12.8L5.4 9.6L4 11L8.6 15.6L16.6 7.6L15.2 6.2L8.6 12.8Z"
                        fill="#00C566"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.04102 10C1.04102 5.05247 5.0518 1.04169 9.99935 1.04169C14.9469 1.04169 18.9577 5.05247 18.9577 10C18.9577 14.9476 14.9469 18.9584 9.99935 18.9584C5.0518 18.9584 1.04102 14.9476 1.04102 10ZM9.99935 2.29169C5.74215 2.29169 2.29102 5.74283 2.29102 10C2.29102 14.2572 5.74215 17.7084 9.99935 17.7084C14.2565 17.7084 17.7077 14.2572 17.7077 10C17.7077 5.74283 14.2565 2.29169 9.99935 2.29169Z"
                        fill="#00C566"
                      />
                    </svg>
                    <span className="text-green-500"> In Stock </span>
                  </div>
                )}
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
          </div>

          {/* Price Section */}
          <div className="bg-gradient-to-r from-[#00918e]/10 to-blue-50 p-6">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-600 font-medium">UGX</span>
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.discountedPrice && Number(product.discountedPrice) > 0 && (
              <div className="flex items-center gap-3 mt-2">
                <span className="text-lg text-gray-500 line-through">
                  UGX {formatPrice(Number(product.discountedPrice))}
                </span>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                  Save{" "}
                  {Math.round(
                    (((Number(product.discountedPrice) ?? 0) -
                      (Number(product.price) ?? 0)) /
                      (Number(product.discountedPrice) ?? 1)) *
                      100
                  )}
                  %
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-md font-semibold text-[#00918e] mb-2">
              Description
            </h3>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed text-sm">
                {product.description ||
                  "No description available for this product. Please contact us for more information."}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Truck className="w-5 h-5 text-[#00918e]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">
                    Delivery Country-wide
                  </h3>
                  <p className="text-xs text-gray-500">
                    At a small fee depending on your location.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Shield className="w-5 h-5 text-[#00918e]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">
                    Warranty
                  </h3>
                  <p className="text-xs text-gray-500">1 Year Warranty</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 mt-auto">
            <div className="flex gap-4">
              <button
                onClick={handleBuyNow}
                className="
            flex-1 bg-[#00918e] text-white 
            px-6 py-3 rounded-xl font-medium 
            hover:bg-[#013634] 
            transition-colors duration-200
            flex items-center justify-center gap-2
            shadow-md shadow-[#00918e]/20
          "
              >
                <span>Buy Now</span>
                <ShoppingBag className="w-4 h-4" />
              </button>
              <button
                onClick={handleAddToFavourites}
                className="
            flex items-center justify-center gap-2 
            px-4 py-3 
            border-2 border-gray-200 
            rounded-xl 
            text-gray-700 
            hover:border-gray-300 hover:bg-gray-50 
            transition-all duration-200
          "
              >
                <Heart className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Other Products Section */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Other Products</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoadingOtherProducts || otherProducts.length <= 4}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoadingOtherProducts || otherProducts.length <= 4}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isLoadingOtherProducts ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-xl h-48 md:h-64 animate-pulse"
              ></div>
            ))}
          </div>
        ) : otherProducts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No other products found</p>
          </div>
        ) : (
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            slidesPerView={4}
            spaceBetween={24}
            className="other-products-slider"
            navigation={true}
            breakpoints={{
              0: {
                slidesPerView: 4,
                spaceBetween: 8,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
            }}
          >
            {otherProducts.map((product) => (
              <SwiperSlide key={product.id || product._id}>
                <div
                  onClick={() => {
                    dispatch(updateproductDetails(product));
                    router.push(
                      `/product-details/${product.id || product._id}`
                    );
                  }}
                  className="group relative rounded-lg md:rounded-2xl bg-white transition-all duration-300 hover:shadow-lg md:hover:shadow-2xl cursor-pointer p-2 md:p-4 w-full"
                >
                  <div className="relative mb-2 md:mb-3 overflow-hidden rounded-lg md:rounded-xl bg-gradient-to-br from-[#00918e]/10 to-blue-50 p-0.5">
                    <div className="relative overflow-hidden rounded-lg md:rounded-xl bg-white">
                      <div className="block w-full">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="h-28 md:h-[200px] w-full object-contain aspect-square p-1 md:p-4 transition-all duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <div className="mb-1 md:mb-4 flex items-center gap-1 md:gap-3 px-1 md:px-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const productDetails = `${product.title} - ${product.price}`;
                              const message = `Hello, I'm interested in this product: ${productDetails}`;
                              const productUrl = `${window.location.origin}${window.location.pathname}`;
                              const fullMessage = `${message}\n\nProduct Link: ${productUrl}`;
                              const encodedMessage =
                                encodeURIComponent(fullMessage);
                              const whatsappNumber = "256774077357";
                              window.open(
                                `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
                                "_blank"
                              );
                            }}
                            className="inline-flex transform items-center gap-1 md:gap-2 rounded-lg bg-[#00918e] px-2 md:px-5 py-1 md:py-2 text-xs md:text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-[#013634]"
                          >
                            <span>Buy</span>
                            <svg
                              className="h-3 w-3 md:h-4 md:w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                            </svg>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(
                                addItemToFavourites({
                                  id: Number(product.id),
                                  title: product.title,
                                  price: Number(product.price),
                                  discountedPrice: product.discountedPrice
                                    ? Number(product.discountedPrice)
                                    : Number(product.price),
                                  quantity: 1,
                                  imageUrl: product.imageUrl,
                                  imgs: product.imgs,
                                })
                              );
                            }}
                            className="rounded-full bg-white/95 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white hover:text-rose-600 p-1 md:p-2.5"
                            aria-label="Add to favorites"
                          >
                            <svg
                              className="h-3 w-3 md:h-4.5 md:w-4.5"
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

                  <div className="space-y-0.5 md:space-y-1">
                    <div className="block w-full text-left">
                      <h3 className="text-xs md:text-lg font-bold text-[#00918e] transition-colors duration-200 hover:text-[#025250] line-clamp-1 md:line-clamp-2">
                        {product.title}
                      </h3>
                    </div>

                    <div className="flex items-center">
                      <span className="text-xs md:text-base font-medium text-gray-900">
                        {new Intl.NumberFormat("en-UG", {
                          style: "currency",
                          currency: "UGX",
                          minimumFractionDigits: 0,
                        }).format(product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
