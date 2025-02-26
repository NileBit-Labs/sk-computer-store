"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import CustomSelect from "./CustomSelect";
import { Phone, Heart, Search, ShoppingCart, Home, ShoppingBag, Info } from "lucide-react";
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
  const menuRef = useRef(null);

  const product = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const favouritesItems = useAppSelector(
    (state) => state.FavouritesReducer.items
  );

  const handleOpenCartModal = () => {
    openCartModal();
  };

  const closeMenu = () => {
    setNavigationOpen(false);
  };

  // Sticky menu
  useEffect(() => {
    const handleStickyMenu = () => {
      setStickyMenu(window.scrollY >= 80);
    };
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  // Close mobile menu when clicking outside or on menu items
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (navigationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigationOpen]);

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
                onClick={(e) => {
                  e.stopPropagation();
                  setNavigationOpen(!navigationOpen);
                }}
                className="md:hidden p-2 hover:bg-teal-700 rounded-lg transition-colors"
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
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-8">
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
            </ul>
            
            {/* Mobile Navigation */}
            {navigationOpen && (
              <div 
                className="md:hidden absolute right-4 top-24 w-48 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
                ref={menuRef}
              >
                <ul className="py-2">
                  <li>
                    <Link
                      href="/"
                      onClick={closeMenu}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 transition-colors"
                    >
                      <Home size={18} className="text-[#00918e] mr-3" />
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop-with-sidebar"
                      onClick={closeMenu}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 transition-colors"
                    >
                      <ShoppingBag size={18} className="text-[#00918e] mr-3" />
                      <span>Shop</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/aboutus"
                      onClick={closeMenu}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 transition-colors"
                    >
                      <Info size={18} className="text-[#00918e] mr-3" />
                      <span>About Us</span>
                    </Link>
                  </li>
                  <li className="border-t border-gray-100">
                    <Link
                      href="/favourites"
                      onClick={closeMenu}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 transition-colors"
                    >
                      <Heart size={18} className="text-[#00918e] mr-3" />
                      <div className="flex flex-col">
                        <span>Favourites</span>
                        <span className="text-xs text-gray-500">{favouritesItems.length || 0} items</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <a
                      href="tel:+256774077357"
                      onClick={closeMenu}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 transition-colors"
                    >
                      <Phone size={18} className="text-[#00918e] mr-3" />
                      <div className="flex flex-col">
                        <span>Support</span>
                        <span className="text-xs text-gray-500">(+256) 774-077-357</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>
      {/* Slightly increased from original to accommodate header */}
      <div className="h-[120px]"></div>
    </>
  );
};

export default Header;