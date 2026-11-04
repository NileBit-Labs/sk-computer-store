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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const getOffers = async () => {
      try {
        const data = await fetchOffers();
        setOffers(data);
      } catch (error) {
        console.error("Failed to fetch offers:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    
    getOffers();
    
    // Check for mobile view on mount and resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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

  const handleAddToCart = (offer) => {
    // Format the product details
    const productDetails = `${offer.title} - ${offer.discount}%`;
    // Calculate the discounted price
    const discountedPrice = calculateDiscountedPrice(offer.price, offer.discount);
    // Create message
    const message = `Hello, I'm interested in this product: ${productDetails}\nPrice: UGX ${discountedPrice} (Original: UGX ${offer.price})`;
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

  // Mobile view render
  const renderMobileOffer = (offer) => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col h-full w-full px-4 pt-2 pb-6"
    >
      {/* Discount Badge - Top positioned for mobile */}
      <motion.div
        variants={itemVariants}
        className="self-start mb-2 z-10"
      >
        <div
          className="flex items-center gap-2 bg-[#00918e] py-1 px-3 rounded-md shadow-md"
        >
          <span className="text-xl font-bold text-white">
            {offer.discount}
            <span className="text-sm">%</span>
          </span>
          <span className="text-white font-medium text-xs leading-tight">
            SPECIAL<br />OFFER
          </span>
        </div>
      </motion.div>

      {/* Product Image - Centered */}
      <motion.div 
        variants={itemVariants} 
        className="relative w-full flex justify-center mb-3"
      >
        <div className="w-48 h-48 bg-[#00918e]/5 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <motion.div
          whileHover={{
            y: -3,
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
            width={180}
            height={180}
            className="object-contain drop-shadow-md"
          />
        </motion.div>
      </motion.div>

      {/* Product Details */}
      <motion.div variants={itemVariants} className="text-center mb-2">
        <h1
          className="font-semibold text-xl text-gray-900 transition-colors duration-200 hover:text-[#00918e] line-clamp-2 leading-tight mb-2"
        >
          {offer.title}
        </h1>
      </motion.div>

      {/* Price Display */}
      <motion.div
        variants={itemVariants}
        className="mx-auto mb-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 border border-[#00918e]/20 shadow-lg"
      >
        <div className="flex items-baseline gap-2 justify-center">
          <span className="text-2xl font-bold text-orange">
            <span className="text-sm">UGX</span>{" "}
            {parseInt(calculateDiscountedPrice(offer.price, offer.discount))}
          </span>
          <span className="text-base text-gray-500 line-through">
            <span className="text-sm">UGX</span> {offer.price}
          </span>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        variants={itemVariants}
        className="w-full flex justify-center"
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full"
        >
          <button
            onClick={() => handleAddToCart(offer)}
            className="group w-full flex items-center justify-center gap-2 bg-[#00918e] hover:bg-[#007a78] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Shop Now
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
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
          </button>
        </motion.div>
      </motion.div>

      {/* Limited Time Tag */}
      <motion.div
        variants={itemVariants}
        className="mt-3 mx-auto inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-md"
      >
        <svg
          className="w-3 h-3 text-[#ff9b50]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-gray-700 text-xs font-medium">
          Limited Time Offer
        </span>
      </motion.div>
    </motion.div>
  );

  // Desktop view render (original layout)
  const renderDesktopOffer = (offer) => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-row items-center justify-between h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={itemVariants}
        className="w-1/2 pr-8 z-10"
      >
        {/* Price Display */}
        <motion.div
          variants={itemVariants}
          className="mb-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-[#00918e]/20 shadow-lg inline-block"
        >
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-orange">
              <span className="text-xl">UGX</span>{" "}
              {parseInt(
                calculateDiscountedPrice(offer.price, offer.discount)
              )}
            </span>
            <span className="text-xl text-gray-500 line-through">
              <span className="text-lg">UGX</span> {offer.price}
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
          className="font-semibold text-4xl text-gray-900 transition-colors duration-200 hover:text-[#00918e] line-clamp-2 leading-tight mb-4"
        >
          {offer.title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-600 text-lg mb-6 max-w-md"
        >
          {offer.description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            onClick={() => handleAddToCart(offer)}
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
          </button>
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
        className="w-1/2 flex items-center justify-center h-full relative"
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
  );

  // Nothing to show (e.g. no offers in Sanity or request failed)
  if (isLoaded && offers.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden bg-white rounded-2xl"
      style={{ height: isMobile ? "400px" : "var(--hero-height, 450px)" }}
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
              {isMobile ? renderMobileOffer(offer) : renderDesktopOffer(offer)}
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