import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToFavourites } from "@/redux/features/favourites-slice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const product = useSelector(
    (state: { productDetails: any }) => state.productDetails
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Handlers
  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        ...product,
        quantity: quantity,
      })
    );
  };

  const handleAddToFavourites = () => {
    dispatch(
      addItemToFavourites({
        ...product,
        status: "available",
        quantity: 1,
      })
    );
  };

  if (!product) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-96 bg-[#F6F7FB] rounded-lg overflow-hidden">
            <Image
              src={product.imgs?.previews[selectedImage]}
              alt={product.title}
              className="object-contain"
              fill
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.imgs?.previews.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-24 bg-[#F6F7FB] rounded-md overflow-hidden ${
                  selectedImage === index ? "ring-2 ring-blue" : ""
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.title} preview ${index + 1}`}
                  className="object-contain"
                  fill
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold text-dark">{product.title}</h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Image
                  key={index}
                  src="/images/icons/icon-star.svg"
                  alt="star"
                  width={20}
                  height={20}
                />
              ))}
            </div>
            <span className="text-dark-4">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-dark">
              ${product.discountedPrice}
            </span>
            <span className="text-xl text-dark-4 line-through">
              ${product.price}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-dark">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="px-8 py-3 bg-blue text-white rounded-md hover:bg-blue-dark transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={handleAddToFavourites}
                className="p-3 border rounded-md hover:text-blue transition-colors"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 16 16">
                  <path d="M7.99992 2.97255C6.45855 1.5935 4.73256 1.40058 3.33376 2.03998C1.85639 2.71528 0.833252 4.28336 0.833252 6.0914C0.833252 7.86842 1.57358 9.22404 2.5444 10.3172C3.32183 11.1926 4.2734 11.9253 5.1138 12.5724C5.30431 12.7191 5.48911 12.8614 5.66486 12.9999C6.00636 13.2691 6.37295 13.5562 6.74447 13.7733C7.11582 13.9903 7.53965 14.1667 7.99992 14.1667C8.46018 14.1667 8.88401 13.9903 9.25537 13.7733C9.62689 13.5562 9.99348 13.2691 10.335 12.9999C10.5107 12.8614 10.6955 12.7191 10.886 12.5724C11.7264 11.9253 12.678 11.1926 13.4554 10.3172C14.4263 9.22404 15.1666 7.86842 15.1666 6.0914C15.1666 4.28336 14.1434 2.71528 12.6661 2.03998C11.2673 1.40058 9.54129 1.5935 7.99992 2.97255Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Product Description */}
          <div className="border-t pt-6 space-y-4">
            <h2 className="text-xl font-semibold text-dark">
              Product Description
            </h2>
            <p className="text-dark-4">
              {product.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
