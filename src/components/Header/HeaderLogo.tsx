import React from "react";
import Link from "next/link";
import Image from "next/image";

const HeaderLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="flex flex-col absolute">
        <Image
          src="/images/logo/SK_logo.jpg"
          alt="SK Logo"
          width={150}
          height={150}
          className="rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-all duration-700" />
      </div>
    </Link>
  );
};

export default HeaderLogo;
