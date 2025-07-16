"use client";

import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center border-b border-gray-300 focus-within:border-[#ffb900] transition">
      <input
        type="text"
        placeholder="Ne arıyorsun?"
        className="bg-transparent outline-none px-3 py-2 text-sm text-white placeholder-gray-400 w-full"
      />
      <button className="p-2 text-[#ffb900] hover:opacity-80 transition">
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
