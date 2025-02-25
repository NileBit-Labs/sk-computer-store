/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import Navigation from "swiper";
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
import { fetchGadgetsByCategories } from "../ShopWithSidebar/categoryUtils";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

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

  useEffect(() => {
    if (product?.category || product?.categoryId || product?._id) {
      fetchRelatedProducts(product.category);
    }
  }, [product]);

  const fetchRelatedProducts = async (category: string) => {
    try {
      setIsLoading(true);
      console.log("Fetching related products for category:", category);
      const categoryId = product.categoryId || product._id || category;
      console.log("Using categoryId:", categoryId);

      const items = await fetchGadgetsByCategories([categoryId]);
      console.log("Fetched items:", items);

      const filteredItems = items
        .filter(
          (item: RelatedProduct) =>
            item.id !== Number(product.id) && item._id !== product._id
        )
        .slice(0, 8);

      console.log("Filtered items:", filteredItems);
      setRelatedProducts(filteredItems);
    } catch (error) {
      console.error("Error fetching related products:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="max-w-7xl mx-auto px-4 py-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-6">
          <div className="aspect-square relative bg-gray-50 rounded-2xl overflow-hidden">
            <Image
              src={product.imgs?.previews?.[selectedImage] || product.imageUrl}
              alt={product.title}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {product.imgs?.previews && product.imgs.previews.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.imgs.previews.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`
                    aspect-square relative bg-gray-50 rounded-xl overflow-hidden
                    ${selectedImage === index ? "ring-2 ring-[#00918e]" : ""}
                    hover:ring-2 hover:ring-[#00918e]/50 transition-all
                  `}
                >
                  <Image
                    src={img}
                    alt={`${product.title} view ${index + 1}`}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 25vw, 10vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-8">
          {/* Title and Badge */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                <Check className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">In Stock</span>
              </div>
              {/* <span className="text-sm text-gray-500">
                SKU: {product.id || product._id}
              </span> */}
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              {product.title}
            </h1>
          </div>

          {/* Price */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-600 font-medium">UGX</span>
              <span className="text-5xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.discountedPrice && Number(product.discountedPrice) > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-lg text-gray-500 line-through">
                  UGX {formatPrice(Number(product.discountedPrice))}
                </span>
                <span className="text-sm font-medium text-green-600">
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
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed">
              {product.description ||
                "No description available for this product. Please contact us for more information."}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleBuyNow}
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
              onClick={handleAddToFavourites}
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
              <span>Save</span>
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-6 py-8 border-y border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <Truck className="w-6 h-6 text-[#00918e]" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Delivery Country-wide
                </h3>
                <p className="text-sm text-gray-500">
                  At a small fee depending on your location.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <Shield className="w-6 h-6 text-[#00918e]" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Warranty</h3>
                <p className="text-sm text-gray-500">1 Year Warranty</p>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-500">Category:</span>
              <span className="font-medium capitalize px-3 py-1 bg-gray-100 rounded-full">
                {product.category || "General"}
              </span>
            </div>
            {product.tags && product.tags.length > 0 && (
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

      {/* Related Products Section */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || relatedProducts.length <= 4}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || relatedProducts.length <= 4}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-xl h-64 animate-pulse"
              ></div>
            ))}
          </div>
        ) : relatedProducts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No related products found</p>
          </div>
        ) : (
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            slidesPerView={4}
            spaceBetween={24}
            className="related-products-slider"
            navigation={true} // Add this
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
          >
            {relatedProducts.map((relatedProduct) => (
              <SwiperSlide key={relatedProduct.id || relatedProduct._id}>
                <a
                  href={`/product/${relatedProduct.id || relatedProduct._id}`}
                  className="block"
                >
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <div className="aspect-square relative">
                      <Image
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2 truncate">
                        {relatedProduct.title}
                      </h3>
                      <p className="text-[#00918e] font-medium">
                        UGX {formatPrice(relatedProduct.price)}
                      </p>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
