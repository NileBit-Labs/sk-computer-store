"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CustomSelect from "./CustomSelect";
import { Phone, Heart, Search, ShoppingCart, User, Clock } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import HeaderLogo from "./HeaderLogo";
import ProductSearch from "./ProductSearch";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const { openCartModal } = useCartModalContext();

  const product = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const favouritesItems = useAppSelector(
    (state) => state.FavouritesReducer.items
  );

  const handleOpenCartModal = () => {
    openCartModal();
  };

  // Sticky menu
  useEffect(() => {
    const handleStickyMenu = () => {
      setStickyMenu(window.scrollY >= 80);
    };
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  const options = [
    { label: "All Categories", value: "0" },
    { label: "Desktop", value: "1" },
    { label: "Laptop", value: "2" },
    { label: "Monitor", value: "3" },
    { label: "Phone", value: "4" },
    { label: "Watch", value: "5" },
    { label: "Mouse", value: "6" },
    { label: "Tablet", value: "7" },
  ];

  return (
    <>
      <header
        className={`fixed left-0 top-0 w-full z-50 bg-[#00918e] transition-all duration-300 ${
          stickyMenu ? "shadow-lg" : ""
        }`}
      >
        {/* Top Bar - slightly reduced */}
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-white"></div>
        </div>

        {/* Main Header - slightly reduced */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo and Search */}
            <div className="flex items-center justify-between w-full relative">
              <div className="flex-shrink-0 z-20">
                <HeaderLogo />
              </div>

              <ProductSearch />

              <div className="hidden md:flex items-center space-x-2 z-20 text-white">
                <Phone size={18} className="text-teal-200 flex-shrink-0" />

                <a
                  href="tel:+256774077357"
                  className="hover:underline transition-colors"
                >
                  <span className="text-sm hover:underline transition-colors">
                    24/7 Support:
                    <br />
                    (+256) 774-077-357
                  </span>
                </a>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-6 ml-5">
              <Link
                href="/favourites"
                className="hidden md:flex items-center gap-2 text-white hover:text-teal-200 hover:underline transition-colors"
              >
                <Heart size={22} />
                <div className="flex flex-col">
                  <span className="text-xs font-medium">Favourites</span>
                  <span className="text-sm">
                    {favouritesItems.length || 0} items
                  </span>
                </div>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setNavigationOpen(!navigationOpen)}
                className="md:hidden p-2 hover:bg-teal-200 rounded-lg transition-colors"
              >
                <div className="w-6 h-4 flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-white transition-all ${
                      navigationOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-white transition-all ${
                      navigationOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-white transition-all ${
                      navigationOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation - slightly reduced */}
        <nav
          className={`border-t border-white ${stickyMenu ? "py-2" : "py-2.5"} max-w-2xl mx-auto px-4`}
        >
          <div className="max-w-7xl mx-auto px-4 flex justify-center">
            <ul
              className={`md:flex items-center space-x-8 ${
                navigationOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-teal-200 hover:underline transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop-with-sidebar"
                  className="text-white hover:text-teal-200 hover:underline transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/aboutus"
                  className="text-white hover:text-teal-200 hover:underline transition-colors"
                >
                  About Us
                </Link>
              </li>
              {/* Favourites and Phone number for mobile - only shows in opened menu */}
              <li className="md:hidden mt-4 pt-4 border-t border-teal-200">
                <div className="flex items-center space-x-2">
                  <Heart size={18} className="text-teal-200 flex-shrink-0" />
                  <a
                    href="/favourites"
                    className="text-white hover:text-teal-200 hover:underline transition-colors"
                  >
                    <span>Favourites</span> <br />
                    <span>{favouritesItems.length || 0} items</span>
                  </a>
                </div>
              </li>
              <li className="md:hidden mt-4 pt-4">
                <div className="flex items-center space-x-2">
                  <Phone size={18} className="text-teal-200 flex-shrink-0" />
                  <a
                    href="tel:+256774077357"
                    className="text-white hover:text-teal-200 hover:underline transition-colors"
                  >
                    <span>24/7 Support: (+256) 774-077-357</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {/* Slightly increased from original to accommodate header */}
      <div className="h-[120px]"></div>
    </>
  );
};

export default Header;
