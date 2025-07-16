"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="block">
      <div className="relative w-[120px] h-[130px]">
        <Image
          src="/images/logo.png"
          alt="freelansup logo"
          fill
          priority
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
