"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { Check, XCircle, FileUp } from "lucide-react";

interface OrderCardProps {
  order: {
    id: string;
    status: string;
    ad: { title: string; image: string };
    offer: { message: string; price: number; deliveryDays: number };
    buyer: { username: string; image: string | null };
    seller: { username: string; image: string | null };
  };
  isIncoming: boolean;
  onStatusChange?: (orderId: string, newStatus: string) => void;
  sessionUserId: string;
}

export default function OrderCard({
  order,
  isIncoming,
  onStatusChange,
}: OrderCardProps) {
  const [loading, setLoading] = useState(false);
  const otherUser = isIncoming ? order.buyer : order.seller;

  const handleAction = async (
    action: "accept" | "deliver" | "complete" | "cancel"
  ) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${action}`, {
        method: "POST",
        body: JSON.stringify({ orderId: order.id }),
      });
      if (!res.ok) throw new Error("İşlem başarısız");
      toast.success(
        `Sipariş ${
          action === "accept"
            ? "kabul edildi"
            : action === "deliver"
            ? "teslim edildi"
            : action === "complete"
            ? "tamamlandı"
            : "iptal edildi"
        }`
      );
      onStatusChange?.(order.id, action);
      // Optimistic UI update for order status
      if (typeof window !== "undefined") {
        order.status =
          action === "accept"
            ? "accepted"
            : action === "deliver"
            ? "delivered"
            : action === "complete"
            ? "completed"
            : "cancelled";
      }
    } catch {
      toast.error("İşlem sırasında hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col gap-3 p-4 shadow-md w-full relative">
      {/* Durum */}
      <div
        className={`absolute top-4 right-4 text-sm px-3 py-1 rounded-full font-medium ${
          order.status === "pending"
            ? "bg-yellow-100 text-yellow-700"
            : order.status === "accepted"
            ? "bg-blue-100 text-blue-700"
            : order.status === "delivered"
            ? "bg-green-100 text-green-700"
            : order.status === "completed"
            ? "bg-gray-200 text-gray-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {
          {
            pending: "Bekliyor",
            accepted: "Kabul Edildi",
            delivered: "Teslim Edildi",
            completed: "Tamamlandı",
            cancelled: "İptal Edildi",
          }[order.status]
        }
      </div>

      <div className="flex items-center gap-4">
        {/* İlan Görseli */}
        <div className="w-16 h-16 relative overflow-hidden rounded-lg">
          <Image
            src={order.ad.image}
            alt="Ad Image"
            fill
            className="object-cover"
          />
        </div>

        {/* İlan Bilgileri */}
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-muted-foreground">
            {order.ad.title}
          </h3>
          <p className="text-sm mt-1">
            <strong>{order.offer.price}₺</strong> - {order.offer.deliveryDays}{" "}
            gün
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {order.offer.message}
          </p>
        </div>
      </div>

      {/* Butonlar ve Kullanıcı */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {order.status === "pending" && isIncoming && (
            <Button
              disabled={loading}
              onClick={() => handleAction("accept")}
              size="sm"
            >
              <Check className="w-4 h-4 mr-1" /> Kabul Et
            </Button>
          )}
          {order.status === "accepted" && !isIncoming && (
            <Button
              disabled={loading}
              onClick={() => handleAction("deliver")}
              size="sm"
              variant="secondary"
            >
              <FileUp className="w-4 h-4 mr-1" /> Teslim Et
            </Button>
          )}
          {order.status === "delivered" && isIncoming && (
            <Button
              disabled={loading}
              onClick={() => handleAction("complete")}
              size="sm"
            >
              <Check className="w-4 h-4 mr-1" /> Onayla
            </Button>
          )}
          {order.status !== "completed" && order.status !== "cancelled" && (
            <Button
              disabled={loading}
              onClick={() => handleAction("cancel")}
              size="sm"
              variant="destructive"
            >
              <XCircle className="w-4 h-4 mr-1" /> İptal Et
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={otherUser.image || "/default-user.png"}
            alt="Kullanıcı"
            width={32}
            height={32}
            className="rounded-full w-10 h-10"
          />
          <span className="text-sm font-medium">@{otherUser.username}</span>
        </div>
      </div>
    </Card>
  );
}
