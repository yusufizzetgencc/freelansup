"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-[#001a29] text-white mt-16 pt-10 pb-6 px-4 sm:px-8 z-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo ve açıklama */}
        <div>
          <h2 className="text-[#ffb900] text-xl font-bold mb-2">freelansup</h2>
          <p className="text-sm text-gray-400">
            Yeteneklerini sergile, iş al veya iş ver. Freelansup, modern
            freelancer platformudur.
          </p>
        </div>

        {/* Menü linkleri */}
        <div>
          <h3 className="text-[#ffde59] font-semibold mb-3">Hızlı Erişim</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/" className="hover:text-[#ffb900] transition">
                Anasayfa
              </Link>
            </li>
            <li>
              <Link
                href="/kategoriler"
                className="hover:text-[#ffb900] transition"
              >
                Kategoriler
              </Link>
            </li>
            <li>
              <Link
                href="/hakkimizda"
                className="hover:text-[#ffb900] transition"
              >
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link
                href="/iletisim"
                className="hover:text-[#ffb900] transition"
              >
                İletişim
              </Link>
            </li>
          </ul>
        </div>

        {/* Sosyal medya */}
        <div>
          <h3 className="text-[#ffde59] font-semibold mb-3">Bizi Takip Et</h3>
          <div className="flex items-center gap-4 text-gray-400">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="hover:text-[#ffb900]"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="hover:text-[#ffb900]"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="hover:text-[#ffb900]"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="mailto:info@freelansup.com"
              className="hover:text-[#ffb900]"
            >
              <Mail size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Alt çizgi ve telif */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {currentYear} freelansup. Tüm hakları saklıdır.
      </div>
    </footer>
  );
};

export default Footer;
