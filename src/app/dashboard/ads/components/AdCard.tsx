"use client";

import { FC, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil, CalendarDays, Folder, Layers } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";

interface AdCardProps {
  ad: {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    subcategory: string;
    createdAt: string;
  };
  onDelete: () => void;
}

const AdCard: FC<AdCardProps> = ({ ad, onDelete }) => {
  const deleteInProgressRef = useRef(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (deleteInProgressRef.current) return;

    deleteInProgressRef.current = true;

    queueMicrotask(async () => {
      try {
        const result = await Swal.fire({
          title: "Emin misiniz?",
          text: "Bu ilan kalıcı olarak silinecek!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Evet, sil!",
          cancelButtonText: "Vazgeç",
        });

        if (!result.isConfirmed) {
          deleteInProgressRef.current = false;
          return;
        }

        const res = await fetch(`/api/ads/${ad.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          toast.error("Silme işlemi başarısız oldu.");
          deleteInProgressRef.current = false;
          return;
        }

        onDelete();
        toast.success("İlan başarıyla silindi.");
      } catch (error) {
        console.error("Ağ hatası:", error);
        toast.error("Sunucuya ulaşılamadı.");
      } finally {
        deleteInProgressRef.current = false;
      }
    });
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 shadow-xl
      transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)]
      hover:scale-[1.02] hover:bg-neutral-100 cursor-pointer
      flex flex-col"
    >
      <Link
        href={`/dashboard/ads/${ad.id}`}
        className="block rounded-t-xl overflow-hidden"
      >
        <div className="relative w-full h-40">
          {ad.image ? (
            <Image
              src={ad.image}
              alt={ad.title}
              fill
              className="object-cover rounded-t-xl transition duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 text-sm italic rounded-t-xl">
              Görsel yok
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col h-[calc(100%-160px)]">
          {/* 160px resim yüksekliği */}
          <h2 className="text-lg font-semibold text-gray-900">{ad.title}</h2>
          <p className="text-sm text-gray-700 line-clamp-3 flex-grow mt-1">
            {ad.description}
          </p>

          <div className="text-sm text-gray-500 space-y-1 mt-4">
            <div className="flex items-center gap-2">
              <Folder size={16} /> {ad.category}
            </div>
            <div className="flex items-center gap-2">
              <Layers size={16} /> {ad.subcategory}
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              {new Date(ad.createdAt).toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </Link>

      <div className="flex justify-between pt-4 border-t border-gray-200 gap-4 px-5 pb-5 mt-auto">
        <Link href={`/dashboard/ads/edit/${ad.id}`} className="w-full">
          <Button
            variant="outline"
            className="text-sm bg-[#002133] gap-1 hover:bg-yellow-100 hover:text-yellow-800 text-myDarkYellow w-full"
          >
            <Pencil size={16} /> Düzenle
          </Button>
        </Link>
        <Button
          variant="destructive"
          className="text-sm gap-1 hover:bg-red-700 flex-grow"
          onClick={handleDelete}
        >
          <Trash2 size={16} /> Sil
        </Button>
      </div>
    </div>
  );
};

export default AdCard;
