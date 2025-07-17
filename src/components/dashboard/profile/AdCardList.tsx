"use client";

import AdCard from "@/app/dashboard/ads/components/AdCard";
import { Ad } from "@prisma/client";

export default function AdCardList({ ads }: { ads: Ad[] }) {
  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">İlanlarım</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} onDelete={() => {}} />
        ))}
      </div>
    </div>
  );
}
