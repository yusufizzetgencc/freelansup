// src/components/dashboard/home/Greeting.tsx
"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";

const Greeting = () => {
  const { data: session } = useSession();
  const username = session?.user?.username ?? "Kullanıcı";
  const image = session?.user?.image;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-8 flex items-center gap-4 bg-gradient-to-r from-[#ffde59] to-[#ffb900] rounded-2xl shadow-lg p-6 backdrop-blur-sm transition-all duration-300"
    >
      <Image
        src={image || "/default-avatar.png"}
        alt="Profil"
        width={80}
        height={80}
        className="w-17 h-17 rounded-full border-1 border-white shadow-md ring-2 ring-white"
      />
      <div>
        <h1 className="text-2xl font-bold text-[#002133]">
          Merhaba, {username} 👋
        </h1>
        <p className="text-sm text-[#002133]/80">
          Kontrol paneline hoş geldin.
        </p>
      </div>
    </motion.div>
  );
};

export default Greeting;
