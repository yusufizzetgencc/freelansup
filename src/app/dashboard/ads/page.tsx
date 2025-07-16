"use client";

import { useEffect, useState } from "react";
import AdCard from "./components/AdCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  subcategory: string;
  createdAt: string;
}

const EmptyAdsMessage = () => (
  <div className="flex flex-col items-center justify-center py-20 bg-yellow-50 rounded-lg border border-yellow-300 text-yellow-800">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-16 mb-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17v-2a4 4 0 018 0v2m-6 4h6a2 2 0 002-2v-6a2 2 0 00-2-2h-6a2 2 0 00-2 2v6a2 2 0 002 2z"
      />
    </svg>
    <h2 className="text-2xl font-semibold mb-2">Henüz ilan yayınlanmadı</h2>
    <p className="text-center max-w-md mb-6 text-yellow-900">
      Şu anda aktif ilanınız bulunmamaktadır. Hemen ilan yayınlayarak
      müşterilerinize ulaşabilirsiniz.
    </p>
    <Link href="/dashboard/ads/new">
      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6">
        + Yeni İlan Ekle
      </Button>
    </Link>
  </div>
);

const AdsPage = () => {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch("/api/my-ads");
        if (!res.ok) throw new Error("Veri alınamadı");
        const data = await res.json();
        setAds(data);
      } catch (error) {
        console.error("İlanlar yüklenirken hata oluştu:", error);
        toast.error("İlanlar yüklenemedi.");
      }
    };
    fetchAds();
  }, []);

  if (ads.length === 0) {
    return (
      <div className="p-6 mt-8">
        <EmptyAdsMessage />
      </div>
    );
  }

  return (
    <div className="p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">İlanlarım</h1>
        <Link href="/dashboard/ads/new" passHref>
          <Button className="bg-[#ffb900] text-[#002133] hover:bg-yellow-500">
            + Yeni İlan Ekle
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-300">
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            ad={ad}
            onDelete={() =>
              setAds((prev) => prev.filter((a) => a.id !== ad.id))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AdsPage;
