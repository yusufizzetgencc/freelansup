"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Star } from "lucide-react";
import Link from "next/link";

interface User {
  id: string;
  username: string;
  image?: string | null;
}

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  subcategory: string;
  createdAt: string;
  averageRating?: number;
  user: User;
}

const categories = [
  { label: "Tümü", value: "Tümü" },
  { label: "Yazılım & Teknoloji", value: "Yazılım-Teknoloji" },
  { label: "Grafik Tasarım", value: "Grafik-Tasarım" },
  { label: "Video & Animasyon", value: "Video-Animasyon" },
  { label: "Yazı & Çeviri", value: "Yazı-Çeviri" },
  { label: "Pazarlama", value: "Pazarlama" },
  { label: "Ses & Müzik", value: "Ses-Müzik" },
  { label: "İşletme", value: "İşletme" },
];

// value'dan label bulmak için helper fonksiyon
const getCategoryLabel = (value: string) => {
  const cat = categories.find((c) => c.value === value);
  return cat ? cat.label : value;
};

const sortOptions = [
  { label: "En Yeni", value: "newest" },
  { label: "En Eski", value: "oldest" },
  { label: "En Yüksek Puan", value: "rating" },
];

const AdsPage = () => {
  const { data: session } = useSession();

  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0].value);
  const [sortBy, setSortBy] = useState(sortOptions[0].value);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch("/api/ads");
        if (!res.ok) throw new Error("Veri alınamadı");
        const data: Ad[] = await res.json();
        setAds(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const searchTermLower = searchTerm.trim().toLowerCase();

  const filteredAds = ads.filter((ad) => {
    const categoryMatch =
      selectedCategory === "Tümü" ||
      ad.category.toLowerCase() === selectedCategory.toLowerCase();

    const textMatch =
      ad.title.toLowerCase().includes(searchTermLower) ||
      ad.description.toLowerCase().includes(searchTermLower);

    const isNotOwner = ad.user.id !== session?.user?.id;

    return isNotOwner && categoryMatch && textMatch;
  });

  const sortedAds = [...filteredAds].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === "rating") {
      return (b.averageRating ?? 0) - (a.averageRating ?? 0);
    }
    return 0;
  });

  return (
    <main className="max-w-7xl mx-auto p-6 mt-12 bg-gray-50 rounded-lg shadow-sm min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6">
        <input
          type="text"
          aria-label="İlan ara"
          placeholder="İlan ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
        />

        <select
          aria-label="Sıralama seç"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="mt-2 md:mt-0 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-48 text-black"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map(({ label, value }) => {
          const isSelected = selectedCategory === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedCategory(value)}
              className={`px-4 py-2 rounded-full border transition select-none ${
                isSelected
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-100 hover:text-yellow-700"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-600 font-semibold">
          Yükleniyor...
        </div>
      ) : sortedAds.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-medium">
          İlan bulunamadı.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {sortedAds.map((ad) => (
            <Link
              href={`/dashboard/ads/${ad.id}`}
              key={ad.id}
              className="block bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition transform hover:scale-[1.03] relative"
            >
              {/* İlan resmi */}
              <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
                <Image
                  src={ad.image || "/default-image.png"}
                  alt={ad.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="rounded-t-xl"
                  priority={false}
                />
                {/* Kullanıcı ve username solda resmin üstünde */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-white bg-opacity-90 rounded-full px-2 py-1 shadow z-20 border-2 border-yellow-400">
                  {ad.user.image ? (
                    <Image
                      src={ad.user.image}
                      alt={ad.user.username}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover border border-yellow-400"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold text-sm border border-yellow-400">
                      ?
                    </div>
                  )}
                  <span className="text-sm font-bold text-gray-600">
                    @{ad.user.username}
                  </span>
                </div>
                {/* Derece sağda resmin üstünde */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-400 rounded-full px-3 py-1 shadow z-20 text-black font-semibold text-sm">
                  <Star size={16} />
                  <span>{ad.averageRating?.toFixed(1) ?? "0.0"}</span>
                </div>
              </div>

              {/* İçerik */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {ad.title}
                </h3>
                <p className="text-gray-700 text-sm line-clamp-2 mt-1">
                  {ad.description}
                </p>
                {/* Kategori etiketleri label ile */}
                <div className="text-xs text-gray-500 mt-3 flex justify-between">
                  <span>{getCategoryLabel(ad.category)}</span>
                  <span>{ad.subcategory}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default AdsPage;
