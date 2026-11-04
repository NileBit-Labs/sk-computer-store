import React from "react";
import Link from "next/link";
import ProductItem from "@/components/Common/ProductItem";
import { fetchNewArrivals } from "@/components/Shop/shopData";

const NewArrival = async () => {
  // Fetch 12 newest products
  const products = await fetchNewArrivals(12);

  return (
    <section className="overflow-hidden pt-10 md:pt-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- section title --> */}
        <div className="mb-4 md:mb-7 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2 md:gap-2.5 font-medium text-dark mb-1 md:mb-1.5">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 md:w-5 md:h-5"
              >
                <path
                  d="M3.11826 15.4622C4.11794 16.6668 5.97853 16.6668 9.69971 16.6668H10.3007C14.0219 16.6668 15.8825 16.6668 16.8821 15.4622M3.11826 15.4622C2.11857 14.2577 2.46146 12.429 3.14723 8.77153C3.63491 6.17055 3.87875 4.87006 4.8045 4.10175M3.11826 15.4622C3.11826 15.4622 3.11826 15.4622 3.11826 15.4622ZM16.8821 15.4622C17.8818 14.2577 17.5389 12.429 16.8532 8.77153C16.3655 6.17055 16.1216 4.87006 15.1959 4.10175M16.8821 15.4622C16.8821 15.4622 16.8821 15.4622 16.8821 15.4622ZM15.1959 4.10175C14.2701 3.33345 12.947 3.33345 10.3007 3.33345H9.69971C7.0534 3.33345 5.73025 3.33345 4.8045 4.10175M15.1959 4.10175C15.1959 4.10175 15.1959 4.10175 15.1959 4.10175ZM4.8045 4.10175C4.8045 4.10175 4.8045 4.10175 4.8045 4.10175Z"
                  stroke="#00918e"
                  strokeWidth="1.5"
                />
                <path
                  d="M7.64258 6.66678C7.98578 7.63778 8.91181 8.33345 10.0003 8.33345C11.0888 8.33345 12.0149 7.63778 12.3581 6.66678"
                  stroke="#00918e"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <h2 className="font-semibold text-lg md:text-xl xl:text-heading-5 text-dark">
                New Arrivals
              </h2>
            </span>
          </div>

          <Link
            href="/shop-with-sidebar"
            className="inline-flex font-medium text-xs md:text-custom-sm py-1.5 md:py-2.5 px-4 md:px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
          >
            View All
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-8 md:py-10">
            <p>No new arrivals found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 lg:gap-6 xl:gap-7.5">
            {products.map((item, key) => (
              <ProductItem item={item} key={key} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrival;
