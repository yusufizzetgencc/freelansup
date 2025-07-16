"use client";

import AdCard from "@/app/dashboard/ads/components/AdCard";

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  subcategory: string;
  createdAt: string;
}

interface MyAdsProps {
  ads: Ad[];
  loading?: boolean; // loading prop'u eklendi, opsiyonel yaptım
  onDelete?: (id: string) => void;
}

const MyAds = ({ ads, loading = false, onDelete }: MyAdsProps) => {
  if (loading) {
    return (
      <section className="mt-10">
        <p className="text-center text-gray-400 text-lg">Yükleniyor...</p>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4 text-black">İlanlarım</h2>

      {ads.length === 0 ? (
        <p className="text-sm text-gray-300">Henüz ilanınız bulunmamaktadır.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} onDelete={() => onDelete?.(ad.id)} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyAds;
