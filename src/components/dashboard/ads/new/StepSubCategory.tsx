"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface StepSubCategoryProps {
  next: () => void;
  prev: () => void;
  categoryId: string;
  setSubCategoryId: Dispatch<SetStateAction<string>>;
}

const subCategoryMap: { [key: string]: string[] } = {
  "Grafik-Tasarım": [
    "Logo Tasarımı",
    "UI/UX Tasarımı",
    "Sosyal Medya Tasarımı",
    "Kurumsal Kimlik",
    "Afiş & Broşür",
    "Kartvizit Tasarımı",
    "Katalog & Dergi Tasarımı",
  ],
  "İnternet-Reklamcılığı": [
    "Google Ads",
    "Meta Reklamları",
    "SEO Danışmanlığı",
    "Dijital Pazarlama Stratejisi",
    "E-posta Pazarlama",
    "Sosyal Medya Yönetimi",
  ],
  "yazi-ceviri": [
    "Blog Yazarlığı",
    "Metin Yazarlığı",
    "Çeviri Hizmetleri",
    "Akademik Yazım",
    "Senaryo Yazımı",
    "Ürün Açıklamaları",
  ],
  "Video-Animasyon": [
    "Video Montaj",
    "2D Animasyon",
    "Tanıtım Videosu",
    "YouTube Video Düzenleme",
    "Kısa Film Kurgu",
    "Reklam Videoları",
  ],
  "Ses-Müzik": [
    "Jingle",
    "Seslendirme",
    "Müzik Prodüksiyon",
    "Podcast Düzenleme",
    "Mix & Mastering",
    "Fon Müzikleri",
  ],
  "Yazılım-Teknoloji": [
    "Frontend",
    "Backend",
    "Full Stack",
    "Mobil Uygulama",
    "WordPress",
    "Shopify",
    "Yazılım Danışmanlığı",
  ],
  "İş-Yönetim": [
    "Sanal Asistan",
    "Proje Yönetimi",
    "İK Danışmanlığı",
    "Veri Girişi",
    "Topluluk Yönetimi",
    "Planlama & Organizasyon",
  ],
};

export default function StepSubCategory({
  next,
  prev,
  categoryId,
  setSubCategoryId,
}: StepSubCategoryProps) {
  const [sub, setSub] = useState("");
  const subCategoryOptions = subCategoryMap[categoryId] || [];

  const handleNext = () => {
    if (!sub) {
      toast.error("Alt kategori seçimi zorunludur.");
      return;
    }
    setSubCategoryId(sub);
    toast.success("Alt kategori seçildi!");
    next();
  };

  return (
    <div className="space-y-6 text-[#002133]">
      <h2 className="text-2xl font-bold mb-4 text-[#002133]">
        Alt kategori seçin
      </h2>
      <select
        value={sub}
        onChange={(e) => setSub(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-lg shadow-md bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ffb900] focus:border-[#ffb900] text-base text-[#002133] font-medium placeholder-gray-400 hover:shadow-lg"
      >
        <option value="" disabled>
          Alt kategori seçin
        </option>
        {subCategoryOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="flex items-center justify-between mt-6 space-x-4">
        <Button
          variant="ghost"
          onClick={prev}
          className="bg-white border border-gray-300 text-[#002133] hover:bg-gray-100 transition-all duration-300 px-4 py-2 rounded-md shadow-sm"
        >
          Geri
        </Button>
        <Button
          onClick={handleNext}
          className="bg-[#ffb900] text-[#002133] hover:bg-[#ffde59] font-semibold transition-all duration-300"
        >
          Devam Et
        </Button>
      </div>
    </div>
  );
}
