"use client";

import React, { useEffect, useState } from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import { fetchOffers } from "./offerData";
import { motion } from "framer-motion";

const PromoCard = ({ product }) => {
  const originalPrice = (product.price / (1 - product.discount / 100)).toFixed(
    2
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative h-[215px] overflow-hidden rounded-2xl bg-gradient-to-br from-white to-orange-50 dark:from-gray-900 dark:to-orange-950 p-6 shadow-xl border-2 border-orange-500 dark:border-orange-600 group"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern-orange.svg')] bg-repeat" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-orange-400 to-pink-500 opacity-20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-tr from-[#00918e] to-blue-400 opacity-20 rounded-full blur-xl"></div>

      {/* Content */}
      <div className="relative flex justify-between items-start gap-4 z-10">
        <div className="space-y-4">
          {/* Discount Badge */}
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300 shadow-md transform -rotate-2">
            <span className="animate-pulse mr-1">🔥</span>
            {product.discount}% OFF
          </span>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight max-w-[200px]">
            {product.title}
          </h3>

          {/* Price */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-orange-600 dark:text-orange-400 flex items-center">
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
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-[#00918e] dark:text-[#00c4c0]">
                ${product.price}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 rounded-full shadow-lg transition-all duration-200 transform"
          >
            Shop Now
            <svg
              className="ml-2 w-5 h-5 animate-bounce-x"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>

        {/* Product Image */}
        <motion.div
          className="relative w-40 h-40 transform transition-all duration-500"
          whileHover={{ scale: 1.1, rotate: -5 }}
          animate={{ y: [0, -5, 0] }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            },
          }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-[#00918e] opacity-75 blur-lg rounded-full"></div>
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

  // Animation variants
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
    <section className="relative bg-gradient-to-b from-orange-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 overflow-hidden py-16">
      {/* Background Elements */}
      <div className="absolute inset-0 max-w-full overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-b from-orange-300 to-pink-300 dark:from-orange-800 dark:to-pink-900 rounded-full filter blur-3xl opacity-20 -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-t from-[#00918e]/30 to-[#00918e]/10 dark:from-[#00918e]/30 dark:to-[#00918e]/10 rounded-full filter blur-3xl opacity-30 -z-10 animate-pulse-slow" />

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-orange-500 opacity-20 rounded-full blur-md animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-[#00918e] opacity-10 rounded-full blur-lg animate-float-reverse"></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-orange-300 opacity-20 rounded-full blur-sm animate-float-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 xl:grid-cols-3 gap-10"
        >
          {/* Main Carousel */}
          <motion.div variants={itemVariants} className="xl:col-span-2 mt-20">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#00918e]">
              <HeroCarousel />
            </div>
          </motion.div>

          {/* Promo Cards */}
          <div className="flex flex-col justify-between gap-4 mt-20">
            {products.map((product, index) => (
              <PromoCard key={product._id || index} product={product} />
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div variants={itemVariants} className="mt-16">
          <HeroFeature />
        </motion.div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes float-reverse {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes float-slow {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes pulse-slow {
          0% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.1;
          }
        }

        @keyframes bounce-x {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
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

        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
