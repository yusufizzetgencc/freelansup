"use client";

import { FC } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Briefcase,
  MessageSquare,
  CreditCard,
  Clock,
  Trash2,
  CheckCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "sonner";

interface Offer {
  id: string;
  createdAt?: string;
  ad: {
    id: string;
    title: string;
    image?: string;
  };
  sender: {
    id: string;
    username: string;
    image?: string;
  };
  receiver: {
    id: string;
    username: string;
    image?: string;
  };
  message: string;
  price: number;
  deliveryDays: number;
  status: string;
}

interface OfferCardProps {
  offer: Offer;
  isIncoming?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  onMessage?: () => void;
  onDelete?: () => void;
  onOrder?: () => void;
}

const OfferCard: FC<OfferCardProps> = ({
  offer,
  isIncoming = false,
  onAccept,
  onReject,
  onMessage,
  onDelete,
  onOrder,
}) => {
  const { message, price, deliveryDays, status, sender, receiver, ad } = offer;

  const username = isIncoming ? sender.username : receiver.username;
  const userImage = isIncoming ? sender.image : receiver.image;
  const adTitle = ad.title;
  const adImage = ad.image;

  const statusTextMap: { [key: string]: string } = {
    pending: "Beklemede",
    accepted: "Kabul Edildi",
    rejected: "Reddedildi",
  };

  const statusBgMap: { [key: string]: string } = {
    pending: "bg-yellow-200 text-yellow-800",
    accepted: "bg-green-200 text-green-800",
    rejected: "bg-red-200 text-red-800",
  };

  const displayStatusText = statusTextMap[status] || status;
  const displayStatusBg = statusBgMap[status] || "bg-gray-200 text-gray-800";

  return (
    <Card className="relative w-full p-4 shadow-md border bg-white rounded-xl mb-5">
      {status === "rejected" && !isIncoming && (
        <div className="absolute top-3 right-3">
          <Button
            onClick={async () => {
              const result = await Swal.fire({
                title: "Teklifi silmek istediğinize emin misiniz?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Evet, sil",
                cancelButtonText: "Vazgeç",
              });

              if (result.isConfirmed) {
                const res = await fetch("/api/offers/delete", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ offerId: offer.id }),
                });
                if (res.ok) {
                  toast.success("Teklif başarıyla silindi.");
                  if (onDelete) {
                    onDelete();
                  }
                } else {
                  toast.error("Teklif silinemedi.");
                }
              }
            }}
            variant="ghost"
            className="text-xs h-8 px-3 text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
      <div className="flex gap-4 items-start">
        <div className="flex-shrink-0">
          {userImage && (
            <Image
              src={userImage}
              alt="Kullanıcı"
              width={48}
              height={48}
              className="rounded-full w-12 h-12 object-cover"
              priority
            />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <User className="w-4 h-4 text-gray-500" />
            {isIncoming ? `Gönderen: ${username}` : `Alıcı: ${username}`}
          </div>
          <div className="text-base font-semibold flex items-center gap-1">
            <Briefcase className="w-4 h-4 text-gray-500" />
            {adTitle}
          </div>
          <p className="text-sm text-gray-700 flex items-center gap-1">
            <MessageSquare className="w-4 h-4 text-gray-500" />
            {message}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <CreditCard className="w-4 h-4 text-gray-500" />
              <span className="font-medium">₺{price}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{deliveryDays} gün</span>
            </div>
          </div>
          <div
            className={`text-xs inline-block mt-1 px-3 py-1 rounded-full ${displayStatusBg} font-medium`}
          >
            Durum: {displayStatusText}
          </div>
          {isIncoming && status === "pending" && (
            <div className="flex gap-2 mt-3">
              <Button
                onClick={async () => {
                  try {
                    const res = await fetch("/api/offers/accept", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ offerId: offer.id }),
                    });
                    if (res.ok) {
                      toast.success("Teklif kabul edildi.");
                      onAccept?.();
                    } else {
                      toast.error("Teklif kabul edilemedi.");
                    }
                  } catch (err) {
                    toast.error("Sunucu hatası." + err);
                  }
                }}
                variant="default"
                className="text-xs h-8 px-4"
              >
                Kabul Et
              </Button>
              <Button
                onClick={async () => {
                  try {
                    const res = await fetch("/api/offers/reject", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ offerId: offer.id }),
                    });
                    if (res.ok) {
                      toast.success("Teklif reddedildi.");
                      onReject?.();
                    } else {
                      toast.error("Teklif reddedilemedi.");
                    }
                  } catch (err) {
                    toast.error("Sunucu hatası." + err);
                  }
                }}
                variant="destructive"
                className="text-xs h-8 px-4"
              >
                Reddet
              </Button>
              <Button
                onClick={onMessage}
                variant="outline"
                className="text-xs h-8 px-4 flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Mesaj At
              </Button>
            </div>
          )}
          {!isIncoming && (
            <div className="flex gap-2 mt-3">
              {status === "accepted" && (
                <>
                  <Button
                    onClick={onMessage}
                    variant="outline"
                    className="text-xs h-8 px-4 flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Mesaj At
                  </Button>
                  <Button
                    onClick={async () => {
                      try {
                        const res = await fetch("/api/orders", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ offerId: offer.id }),
                        });

                        if (res.ok) {
                          toast.success("Sipariş başarıyla oluşturuldu.");
                          onOrder?.();
                        } else {
                          toast.error("Sipariş oluşturulamadı.");
                        }
                      } catch (err) {
                        toast.error("Sunucu hatası: " + err);
                      }
                    }}
                    variant="default"
                    className="text-xs h-8 px-4 flex items-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" /> Sipariş Ver
                  </Button>
                </>
              )}
            </div>
          )}
        </div>

        {adImage && (
          <div className="flex-shrink-0">
            <Image
              src={adImage}
              alt="İlan görseli"
              width={100}
              height={70}
              className="rounded-md object-cover"
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default OfferCard;
