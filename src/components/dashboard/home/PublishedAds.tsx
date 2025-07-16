// Import toast and SweetAlert
"use client";

import { toast } from "sonner";
import Swal from "sweetalert2";

import { useState, useEffect, FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Megaphone, MessageCircle, DollarSign, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

interface PublishedAdsProps {
  ads: Ad[];
  loading: boolean;
}

const categoryLabels: Record<string, string> = {
  "Yazılım-Teknoloji": "Yazılım & Teknoloji",
  "Grafik-Tasarım": "Grafik & Tasarım",
  "Video-Animasyon": "Video & Animasyon",
  "Yazı-Çeviri": "Yazı & Çeviri",
  Pazarlama: "Pazarlama",
  "Müzik-Ses": "Müzik & Ses",
  İşletme: "İşletme",
  Tümü: "Tümü",
};

const getCategoryLabel = (value: string) => categoryLabels[value] ?? value;

const PublishedAdCard: FC<{ ad: Ad }> = ({ ad }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");

  const handleMessageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`Mesaj at: ${ad.title}`);
  };

  const handleOfferClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <>
      <Link
        href={`/dashboard/ads/${ad.id}`}
        className="block bg-white rounded-xl border border-gray-200 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer relative"
      >
        <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
          <Image
            src={ad.image || "/default-image.png"}
            alt={ad.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />

          {/* Derece sağ üst köşede */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-400 rounded-full px-3 py-1 shadow z-20 text-black font-semibold text-sm">
            <Star size={16} />
            <span>{ad.averageRating?.toFixed(1) ?? "0.0"}</span>
          </div>
        </div>

        {/* Kullanıcı bilgisi */}
        <div className="flex items-center gap-3 p-3 border-b border-gray-200">
          {ad.user?.image ? (
            <Image
              src={ad.user.image}
              alt={ad.user.username}
              width={50}
              height={50}
              className="w-13 h-13 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
              ?
            </div>
          )}
          <span className="font-semibold text-gray-800">
            @{ad.user?.username ?? "Freelancer"}
          </span>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {ad.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {ad.description}
          </p>

          <div className="flex items-center justify-between mt-3 text-gray-500 text-sm">
            <div>
              <span>
                {getCategoryLabel(ad.category)} &mdash; {ad.subcategory}
              </span>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleMessageClick}
              className="flex items-center gap-1 px-3 py-1 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-100 transition"
            >
              <MessageCircle size={16} />
              Mesaj At
            </button>

            <button
              onClick={handleOfferClick}
              className="flex items-center gap-1 px-3 py-1 rounded-md border border-green-600 text-green-600 hover:bg-green-100 transition"
            >
              <DollarSign size={16} />
              Teklif Ver
            </button>
          </div>
        </div>
      </Link>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle>Teklif Ver</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const res = await fetch("/api/offers/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  adId: ad.id,
                  message,
                  price: parseFloat(price),
                  deliveryDays: parseInt(deliveryDays),
                }),
              });
              if (res.ok) {
                toast.success("Teklif başarıyla gönderildi.");
                setOpen(false);
              } else {
                Swal.fire({
                  title: "Hata!",
                  text: "Bir hata oluştu. Lütfen tekrar deneyin.",
                  icon: "error",
                  confirmButtonText: "Tamam",
                });
              }
            }}
            className="space-y-3"
          >
            <Textarea
              placeholder="Mesajınız"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Fiyat (₺)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Teslim süresi (gün)"
              value={deliveryDays}
              onChange={(e) => setDeliveryDays(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
            >
              Gönder
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const PublishedAds: FC<PublishedAdsProps> = ({ ads, loading }) => {
  const { data: session } = useSession();

  // Kendi ilanımızı hariç tutuyoruz
  const filteredAds = ads.filter((ad) => ad.user.id !== session?.user.id);

  return (
    <section className="mt-10">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold border-b border-yellow-400 pb-2 inline-block animate-fade-in text-black">
          Yayındaki İlanlar
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Tüm aktif ilanları buradan inceleyebilir, mesaj gönderebilir ve teklif
          verebilirsiniz.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-600 text-lg font-medium">
          Yükleniyor...
        </div>
      ) : filteredAds.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-white/5 rounded-lg border border-gray-700 text-gray-300 text-center">
          <Megaphone size={48} className="mb-3 text-yellow-300 animate-pulse" />
          <p className="text-lg font-medium">
            Henüz yayınlanmış ilan bulunmamaktadır.
          </p>
          <p className="text-sm mt-1 text-gray-400">
            Yeni ilanlar yayınlandığında burada gözükecektir.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 transition-all">
          {filteredAds.map((ad) => (
            <PublishedAdCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}
    </section>
  );
};

export const PublishedAdsWrapper: FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch("/api/ads");
        if (!res.ok) throw new Error("Veri alınamadı");
        const data = await res.json();
        setAds(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return <PublishedAds ads={ads} loading={loading} />;
};

export default PublishedAdsWrapper;
