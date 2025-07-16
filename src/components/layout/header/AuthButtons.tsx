"use client";

import React from "react";
import Link from "next/link";

const AuthButtons = () => {
  return (
    <div className="flex gap-3">
      <Link
        href="/login"
        className="px-5 py-2 text-sm rounded-full border border-[#ffb900] text-[#ffb900] bg-transparent hover:bg-[#ffb900] hover:text-[#002133] shadow-sm hover:shadow-lg transition-all duration-200"
      >
        Giriş Yap
      </Link>
      <Link
        href="/register"
        className="px-5 py-2 text-sm rounded-full bg-[#ffb900] text-[#002133] hover:bg-[#ffde59] shadow-sm hover:shadow-lg transition-all duration-200"
      >
        Kayıt Ol
      </Link>
    </div>
  );
};

export default AuthButtons;
