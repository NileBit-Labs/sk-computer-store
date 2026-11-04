import React from "react";
import Image from "next/image";

const featureData = [
  {
    img: "/images/icons/icon-02.svg",
    title: "Best customer service",
    description: "You matter so much to us",
  },
  {
    img: "/images/icons/icon-03.svg",
    title: "100% Secure Payments",
    description: "Guaranteed secure payments",
  },
  {
    img: "/images/icons/icon-04.svg",
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
  },
];

const HeroFeature = () => {
  return (
    <div className="max-w-[1170px] w-full mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {featureData.map((item, key) => (
          <div
            className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 transition-shadow duration-300 hover:shadow-md"
            key={key}
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#00918e]/10">
              <Image src={item.img} alt="" width={28} height={28} />
            </div>

            <div>
              <h3 className="font-semibold text-base text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
