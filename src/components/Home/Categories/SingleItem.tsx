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
      <div className="max-w-[130px] w-full h-32 rounded-full relative mb-4 overflow-hidden">
        {imageUrl && (
          <div className="absolute inset-0 bg-[#F2F3F8] flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
          {item.title}
        </h3>
      </div>
    </button>
  );
};

export default SingleItem;
