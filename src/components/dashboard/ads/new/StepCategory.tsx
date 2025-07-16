"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { motion } from "framer-motion";
import * as FaIcons from "react-icons/fa";

interface StepCategoryProps {
  next: () => void;
  setCategoryId: (id: string) => void;
}

export default function StepCategory({
  next,
  setCategoryId,
}: StepCategoryProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const categories = [
    {
      id: "Grafik-Tasarım",
      label: "Grafik & Tasarım",
      icon: "FaPaintBrush",
    },
    {
      id: "İnternet-Reklamcılığı",
      label: "İnternet Reklamcılığı",
      icon: "FaBullhorn",
    },
    {
      id: "Yazi-Ceviri",
      label: "Yazı & Çeviri",
      icon: "FaPenNib",
    },
    {
      id: "Video-Animasyon",
      label: "Video & Animasyon",
      icon: "FaCamera",
    },
    {
      id: "Ses-Müzik",
      label: "Ses & Müzik",
      icon: "FaMusic",
    },
    {
      id: "Yazılım-Teknoloji",
      label: "Yazılım & Teknoloji",
      icon: "FaCode",
    },
    {
      id: "İş-Yönetim",
      label: "İş & Yönetim",
      icon: "FaBriefcase",
    },
  ];

  const handleNext = () => {
    if (!selected) {
      toast.error("Lütfen bir kategori seçiniz.");
      return;
    }
    next();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Hangi kategoride hizmet veriyorsun?
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categories.map((cat: { id: string; label: string; icon: string }) => {
          const Icon = FaIcons[cat.icon as keyof typeof FaIcons];
          return (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={cat.id}
              className={`cursor-pointer border p-5 rounded-xl text-center transition-all duration-200 ${
                selected === cat.id
                  ? "bg-yellow-100 border-yellow-400 shadow-md"
                  : "bg-white border-gray-300 hover:border-yellow-300 hover:shadow-sm"
              }`}
              onClick={() => {
                setSelected(cat.id);
                setCategoryId(cat.id);
              }}
            >
              <div className="text-3xl mb-3 text-[#002133]">
                {Icon ? <Icon /> : null}
              </div>
              <div className="font-medium text-sm text-gray-700">
                {cat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 text-end">
        <Button
          onClick={handleNext}
          className="bg-[#ffb900] text-[#002133] hover:bg-[#ffde59]"
        >
          Devam Et
        </Button>
      </div>
    </div>
  );
}
