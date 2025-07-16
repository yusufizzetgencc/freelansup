"use client";

import React from "react";
import Image from "next/image";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-[#002133] flex items-center justify-center z-50">
      <div className="w-16 h-16 animate-spin-slow">
        <Image
          src="/images/loading-logo.png"
          alt="freelansup yükleniyor"
          width={64}
          height={64}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
