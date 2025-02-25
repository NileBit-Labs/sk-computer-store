"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import SingleItem from "./SingleItem";
import { removeAllItemsFromFavourites } from "@/redux/features/favourites-slice";

export const Favourites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favouritesItems = useAppSelector(
    (state) => state.FavouritesReducer.items
  );

  const handleClearFavourites = () => {
    dispatch(removeAllItemsFromFavourites());
  };

  return (
    <>
      {/* <Breadcrumb title={"Favourites"} pages={["Favourites"]} /> */}
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">Your Favourites</h2>
            {favouritesItems.length > 0 && (
              <button
                onClick={handleClearFavourites}
                className="text-blue hover:text-red transition-colors duration-200"
              >
                Clear Favourites
              </button>
            )}
          </div>

          <div className="bg-white rounded-[10px] shadow-1">
            {favouritesItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <svg
                  className="w-20 h-20 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  Your favourites list is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Add items to your favourites to see them here.
                </p>
                <a
                  href="/shop-with-sidebar"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue hover:bg-blue-700 transition duration-200"
                >
                  Browse Products
                </a>
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <div className="min-w-[1170px]">
                  {/* Table header */}
                  <div className="flex items-center py-5.5 px-10 bg-gray-50 rounded-t-[10px]">
                    <div className="min-w-[83px]"></div>
                    <div className="min-w-[387px]">
                      <p className="text-dark font-medium">Product</p>
                    </div>
                    <div className="min-w-[205px]">
                      <p className="text-dark font-medium">Unit Price</p>
                    </div>
                    <div className="min-w-[265px]">
                      <p className="text-dark font-medium">Stock Status</p>
                    </div>
                    <div className="min-w-[150px]">
                      <p className="text-dark font-medium text-right">Action</p>
                    </div>
                  </div>

                  {/* Favourites items */}
                  {favouritesItems.map((item, key) => (
                    <SingleItem item={item} key={key} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Favourites;
