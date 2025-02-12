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

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const { openCartModal } = useCartModalContext();

  const product = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

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
        {/* Top Bar */}
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-white"></div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo and Search */}
            <div className="flex items-center justify-between w-full relative">
              <div className="flex-shrink-0 z-20">
                <HeaderLogo />
              </div>

              <div className="hidden md:block max-w-2xl mx-8 absolute left-1/2 -translate-x-1/2">
                <div className="flex">
                  <CustomSelect
                    options={options}
                    className="min-w-[160px] bg-[#49aba9] text-white hover:text-teal-200 transition-colors"
                  />
                  <div className="relative flex-1">
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-4 pr-10 py-2.5 border border-l-0 border-white rounded-r-lg focus:outline-none focus:border-teal-200 bg-[#00918e] text-white placeholder-teal-200"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-200 hover:text-white transition-colors">
                      <Search size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="flex items-center space-x-2 z-20 text-white"
                style={{ paddingRight: "70px" }}
              >
                <Phone size={18} className="text-teal-200 flex-shrink-0" />
                <span className="text-sm hover:underline transition-colors">
                  24/7 Support:
                  <br />
                  (+256) 394-822-154
                </span>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-6">
              <Link
                href="/favourites"
                className="hidden md:flex items-center gap-2 text-white hover:text-teal-200 hover:underline transition-colors"
              >
                <Heart size={22} />
                <div className="flex flex-col">
                  <span className="text-xs font-medium">Favourites</span>
                  <span className="text-sm">{product.length} items</span>
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

        {/* Navigation */}
        <nav
          className={`border-t border-white ${stickyMenu ? "py-2" : "py-3"} max-w-2xl mx-auto px-4`}
        >
          <div className="max-w-7xl mx-auto px-4 flex justify-center">
            <ul
              className={`md:flex items-center space-x-8 ${navigationOpen ? "block" : "hidden"}`}
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
                  href="/contact"
                  className="text-white hover:text-teal-200 hover:underline transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="h-[0px]"></div>
    </>
  );
};

export default Header;
