"use client";

import React, { useEffect, useState } from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import { fetchOffers } from "./offerData";
import { motion } from "framer-motion";
import { offer } from "@/sanity/schemaTypes/offers";

const calculateDiscountedPrice = (price, discount) => {
  return (price - (price * discount) / 100).toFixed(0);
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const handleAddToCart = (product) => {
  const productDetails = `${product.title} - ${product.discount}%`;
  const discountedPrice = calculateDiscountedPrice(product.price, product.discount);
  const message = `Hello, I'm interested in this product: ${productDetails}\nPrice: UGX ${discountedPrice} (Original: UGX ${product.price})`;
  const productUrl = `${window.location.origin}${window.location.pathname}`;
  const fullMessage = `${message}\n\nProduct Link: ${productUrl}`;
  const encodedMessage = encodeURIComponent(fullMessage);
  const whatsappNumber = "256774077357";
  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
    "_blank"
  );
};

const PromoCard = ({ product, openModal, handleQuickViewUpdate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative h-[215px] overflow-hidden rounded-2xl bg-gradient-to-br from-white to-orange-50 p-6 shadow-md ring-1 ring-gray-200 hover:shadow-xl hover:ring-orange-300 transition-shadow group cursor-pointer"
      onClick={() => handleAddToCart(product)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern-orange.svg')] bg-repeat" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-300 opacity-20 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#00918e] opacity-10 rounded-full blur-2xl"></div>

      {/* Content Container */}
      <div className="relative flex justify-between items-start gap-4 z-10 h-full">
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-2">
            {/* Discount Badge */}
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-orange-100 text-orange-800 shadow-sm">
              <span className="animate-pulse mr-1">🔥</span>
              {product.discount}% OFF
            </span>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 leading-tight max-w-[200px] line-clamp-2">
              {product.title}
            </h3>

            {/* Price Section */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-orange-600 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Limited time offer
              </p>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-orange">
                  <span className="text-sm">UGX</span>{" "}
                  {parseInt(
                    calculateDiscountedPrice(product.price, product.discount)
                  )}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  <span className="text-[10px]">UGX</span> {product.price}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Image */}
        <motion.div
          className="relative w-40 h-40 transform transition-all duration-500"
          whileHover={{ scale: 1.1, rotate: -5 }}
          // animate={{ y: [0, -5, 0] }}
          // transition={{
          //   y: {
          //     repeat: Infinity,
          //     duration: 2,
          //     ease: "easeInOut",
          //   },
          // }}
        >
          <div className="absolute inset-4 bg-[#00918e]/15 blur-2xl rounded-full"></div>
          <div className="relative">
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={160}
              height={160}
              className="object-contain drop-shadow-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getOffers = async () => {
      const data = await fetchOffers();
      setProducts(data.slice(0, 2));
    };

    getOffers();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-[#e6f4f4] via-[#f3f4f6] to-[#f3f4f6] overflow-hidden pt-6 pb-14 md:py-12">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#00918e]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 xl:grid-cols-3 gap-10"
        >
          {/* Main Carousel */}
          <motion.div variants={itemVariants} className="xl:col-span-2">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <HeroCarousel />
            </div>
          </motion.div>

          {/* Promo Cards */}
          <div className="flex flex-col justify-between gap-4">
            {products.map((product, index) => (
              <PromoCard
                key={product._id || index}
                product={product}
                openModal={undefined}
                handleQuickViewUpdate={undefined}
              />
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div variants={itemVariants} className="mt-10">
          <HeroFeature />
        </motion.div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 7s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
