import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface CategoryItemProps {
  item: {
    _id: string;
    title: string;
    image: any; // Sanity image reference
  };
  onSelect: (categoryId: string) => void;
}

const SingleItem = ({ item, onSelect }: CategoryItemProps) => {
  const imageUrl = item.image ? urlFor(item.image).url() : null;

  return (
    <button
      onClick={() => onSelect(item._id)}
      className="group flex flex-col items-center w-full"
    >
      <div className="max-w-[130px] w-full aspect-square rounded-full relative mb-4 overflow-hidden bg-white ring-1 ring-gray-200 transition-all duration-300 group-hover:ring-2 group-hover:ring-[#00918e] group-hover:shadow-lg">
        {imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <Image
              src={imageUrl}
              alt={item.title}
              fill
              sizes="130px"
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-[#00918e] to-[#00918e] bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-[#00918e]">
          {item.title}
        </h3>
      </div>
    </button>
  );
};

export default SingleItem;
