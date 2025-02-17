"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import { fetchOffers } from "./offerData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const HeroCarousel = () => {
  const [offers, setOffers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getOffers = async () => {
      const data = await fetchOffers();
      setOffers(data);
      setIsLoaded(true);
    };
    getOffers();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discount = (discountPercentage / 100) * originalPrice;
    return (originalPrice - discount).toFixed(2);
  };

  return (
    <div
      className="relative overflow-hidden bg-white rounded-xl shadow-lg border border-[#00918e]"
      style={{ height: "var(--hero-height, 450px)" }}
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat" />
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00918e]/10 rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#00918e]/10 rounded-tr-full" />

      <Swiper
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="h-full"
      >
        {isLoaded ? (
          offers.map((offer) => (
            <SwiperSlide key={offer._id} className="w-full h-full">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex flex-col-reverse sm:flex-row items-center justify-between h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <motion.div
                  variants={itemVariants}
                  className="w-full sm:w-1/2 pr-0 sm:pr-8 pb-12 sm:pb-0 z-10"
                >
                  {/* Price Display - Added as a prominent feature */}
                  <motion.div
                    variants={itemVariants}
                    className="mb-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-[#00918e]/20 shadow-lg inline-block"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-[#00918e]">
                        ${calculateDiscountedPrice(offer.price, offer.discount)}
                      </span>
                      <span className="text-xl text-gray-500 line-through">
                        ${offer.price}
                      </span>
                      <span className="text-[#ff9b50] font-semibold">
                        Save {offer.discount}%
                      </span>
                    </div>
                  </motion.div>

                  <div className="relative mb-6">
                    <motion.div
                      className="flex items-center gap-2 bg-[#00918e] py-2 px-5 rounded-md w-fit shadow-md"
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="text-3xl font-bold text-white">
                        {offer.discount}
                        <span className="text-xl">%</span>
                      </span>
                      <span className="text-white font-medium text-lg leading-tight">
                        SPECIAL
                        <br />
                        OFFER
                      </span>
                    </motion.div>
                  </div>

                  <motion.h1
                    variants={itemVariants}
                    className="font-semibold text-2xl sm:text-4xl text-gray-900 leading-tight mb-4"
                  >
                    {offer.title}
                  </motion.h1>

                  <motion.p
                    variants={itemVariants}
                    className="text-gray-600 text-base sm:text-lg mb-6 max-w-md"
                  >
                    {offer.description}
                  </motion.p>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href="#"
                      className="group inline-flex items-center gap-2 bg-[#00918e] hover:bg-[#007a78] text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
                    >
                      Shop Now
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="mt-6 inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md"
                  >
                    <svg
                      className="w-4 h-4 text-[#ff9b50]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 text-sm font-medium">
                      Limited Time Offer
                    </span>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="w-full sm:w-1/2 flex items-center justify-center h-full relative"
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#00918e]/5 rounded-full" />

                  <motion.div
                    whileHover={{
                      y: -5,
                      transition: {
                        duration: 0.3,
                        yoyo: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="relative z-10"
                  >
                    <Image
                      src={offer.imageUrl}
                      alt={offer.title}
                      width={351}
                      height={358}
                      className="object-contain drop-shadow-md"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="w-12 h-12 border-t-2 border-b-2 border-[#00918e] rounded-full animate-spin" />
          </div>
        )}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #dfdfdf;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #00918e;
          transform: scale(1.3);
        }

        :root {
          --brand-primary: #00918e;
          --brand-primary-light: #e6f7f7;
          --brand-primary-dark: #007a78;
          --accent-orange: #ff9b50;
          --text-dark: #1a1a1a;
          --text-light: #6b7280;
          --background-light: #ffffff;
          --hero-height: 450px;
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;
