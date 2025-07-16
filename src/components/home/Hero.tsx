"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className=" text-white py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Sol içerik */}
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl text-black sm:text-5xl font-bold leading-tight mb-6">
            Yeteneklerini Parlat,
            <span className="text-[#ffb900]">Freelansup</span> ile İşini Büyüt!
          </h1>
          <p className="text-lg  text-black mb-8">
            Freelansup, freelancer&apos;lar ve iş verenleri modern bir
            platformda buluşturur. Hemen kaydol, yeteneklerini sergile, iş al
            veya ver.
          </p>
          <Link
            href="/register"
            className="inline-block px-6 py-3 bg-[#ffb900] text-[#002133] font-medium rounded-full shadow hover:bg-[#ffde59] transition duration-200"
          >
            Hemen Başla
          </Link>
        </motion.div>

        {/* Sağ görsel */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image
            src="/images/hero-images2.png"
            alt="freelance illustration"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
