"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { Pencil, Trash2, Star } from "lucide-react";
import { toast } from "sonner"; // <-- Toast import

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryTime: string;
}

interface User {
  id: string;
  username: string;
  image?: string | null;
}

interface AdDetail {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  subcategory: string;
  createdAt: string;
  averageRating?: number;
  user: User;
  packages: Package[];
}

const AdDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [ad, setAd] = useState<AdDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Hover state for image, only active for owner
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(`/api/ads/${id}`);
        if (!res.ok) throw new Error("İlan bulunamadı");
        const data: AdDetail = await res.json();
        setAd(data);
      } catch (fetchError) {
        console.error(fetchError);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAd();
  }, [id]);

  const handleDelete = async (): Promise<void> => {
    if (!ad) return;

    const result = await Swal.fire({
      title: "Emin misiniz?",
      text: "İlan kalıcı olarak silinecek!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sil",
      cancelButtonText: "İptal",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/ads/${ad.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Silme başarısız");
      await Swal.fire("Başarılı", "İlan silindi", "success");

      toast.success("İlan başarıyla silindi."); // <-- Başarı toast bildirimi

      router.push("/dashboard/ads");
    } catch {
      await Swal.fire("Hata", "İlan silinirken hata oluştu", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;
    const price = (form.elements.namedItem("price") as HTMLInputElement).value;
    const deliveryDays = (
      form.elements.namedItem("deliveryDays") as HTMLInputElement
    ).value;

    try {
      const res = await fetch("/api/offers/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adId: ad?.id, message, price, deliveryDays }),
      });

      if (!res.ok) throw new Error("Teklif gönderilemedi");
      toast.success("Teklif başarıyla gönderildi");
      form.reset();
    } catch (err) {
      toast.error("Hata: Teklif gönderilemedi");
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-10">Yükleniyor...</div>;
  if (!ad) return <div className="text-center py-10">İlan bulunamadı.</div>;

  const isOwner = session?.user?.id === ad.user.id;

  return (
    <main className="mt-7 max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fade-scale bg-[#f9fafb] rounded-lg shadow-md">
      {/* Görsel + Başlık */}
      <div
        className="relative w-full h-80 rounded-xl overflow-hidden shadow-md"
        {...(isOwner
          ? {
              onMouseEnter: () => setIsHoveringImage(true),
              onMouseLeave: () => setIsHoveringImage(false),
            }
          : {})}
      >
        <Image
          src={ad.image ?? "/default-image.png"}
          alt={ad.title}
          fill
          className="object-cover"
        />

        {/* Hover karartma sadece sahibi için */}
        {isOwner && isHoveringImage && (
          <div className="absolute inset-0 bg-black/30 z-20 transition-opacity" />
        )}

        {/* Derece: sahibi hover yapıyorsa gizlenir, diğer kullanıcılar her zaman görür */}
        {(!isOwner || !isHoveringImage) && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-400 rounded-full px-3 py-1 shadow z-30 text-black font-semibold text-sm">
            <Star size={16} />
            <span>{ad.averageRating?.toFixed(1) ?? "0.0"}</span>
          </div>
        )}

        {/* Düzenleme & Silme butonları: sadece sahibi ve hover durumunda göster */}
        {isOwner && isHoveringImage && (
          <div className="absolute top-3 right-3 flex gap-2 z-40">
            <Button
              onClick={() => router.push(`/dashboard/ads/edit/${ad.id}`)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center gap-1"
            >
              <Pencil size={16} />
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        )}

        {/* Başlık alt kısımda */}
        <div className="absolute inset-0 bg-black/50 flex items-end p-4 z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-xl">
            {ad.title}
          </h1>
        </div>
      </div>

      {/* Kullanıcı bilgisi */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {ad.user.image ? (
            <Image
              src={ad.user.image}
              alt={ad.user.username}
              width={50}
              height={50}
              className="rounded-full w-15 h-15 object-cover border-2 border-yellow-400"
            />
          ) : (
            <div className="w-[50px] h-[50px] rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
              ?
            </div>
          )}
          <p className="font-semibold text-lg text-gray-800">
            @{ad.user.username}
          </p>
        </div>
      </div>

      {/* Açıklama */}
      <section>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Açıklama</h2>
        <p className="text-gray-700 bg-white rounded-md p-4 border shadow-sm leading-relaxed">
          {ad.description}
        </p>
      </section>

      {/* Paketler */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Paketler</h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {ad.packages.map((pkg) => (
            <div
              key={pkg.id}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-[1.01] bg-white group w-full max-w-xs"
            >
              <h3 className="font-bold text-lg text-black flex items-center gap-2 uppercase tracking-wide">
                📦 {pkg.name}
              </h3>
              <p className="text-gray-700 mt-2 mb-3 text-sm">
                {pkg.description}
              </p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>💰 Fiyat: {pkg.price.toFixed(2)} ₺</p>
                <p>⏱️ Teslim Süresi: {pkg.deliveryTime}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teklif Verme Alanı */}
      {!isOwner && (
        <section className="border-t pt-6 mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Teklif Ver
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-lg shadow-md p-6 max-w-2xl space-y-4"
          >
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Mesaj İçeriği
              </label>
              <textarea
                name="message"
                className="w-full border rounded-md p-2 min-h-[80px] outline-none focus:ring-2 focus:ring-yellow-400 text-black"
                placeholder="İşle ilgili detayları yazın..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Fiyat (₺)
                </label>
                <input
                  name="price"
                  type="number"
                  className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-yellow-400 text-black"
                  placeholder="Örn: 500"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Teslim Süresi (gün)
                </label>
                <input
                  name="deliveryDays"
                  type="number"
                  className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-yellow-400 text-black"
                  placeholder="Örn: 3"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-md shadow font-semibold text-lg"
            >
              💼 Teklif Ver
            </Button>
          </form>
        </section>
      )}
    </main>
  );
};

export default AdDetailPage;
