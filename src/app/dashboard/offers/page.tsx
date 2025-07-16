"use client";

import { useEffect, useState } from "react";
import OfferCard from "@/components/dashboard/offers/OfferCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Offer {
  id: string;
  createdAt: string;
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

export default function OffersPage(): React.ReactElement {
  const [incoming, setIncoming] = useState<Offer[]>([]);
  const [sent, setSent] = useState<Offer[]>([]);

  const fetchOffers = async (): Promise<void> => {
    try {
      const [incomingRes, sentRes] = await Promise.all([
        fetch("/api/offers/incoming"),
        fetch("/api/offers/sent"),
      ]);

      if (!incomingRes.ok || !sentRes.ok) {
        console.error("Teklif verileri alınamadı");
        return;
      }

      const incomingData = incomingRes.headers
        .get("content-type")
        ?.includes("application/json")
        ? await incomingRes.json()
        : [];

      const sentData = sentRes.headers
        .get("content-type")
        ?.includes("application/json")
        ? await sentRes.json()
        : [];

      setIncoming(incomingData);
      setSent(sentData);
    } catch (error) {
      console.error("Teklifler alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Teklifler</h1>
      <Tabs defaultValue="incoming">
        <TabsList className="mb-4">
          <TabsTrigger value="incoming">Gelen Teklifler</TabsTrigger>
          <TabsTrigger value="sent">Gönderilen Teklifler</TabsTrigger>
        </TabsList>

        <TabsContent value="incoming">
          {incoming.length === 0 ? (
            <p>Henüz gelen teklif bulunmamaktadır.</p>
          ) : (
            <div className="space-y-4">
              {incoming.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  isIncoming={true}
                  onAccept={async () => {
                    await fetch("/api/offers/accept", {
                      method: "POST",
                      body: JSON.stringify({ offerId: offer.id }),
                    });
                    fetchOffers();
                  }}
                  onReject={async () => {
                    await fetch("/api/offers/reject", {
                      method: "POST",
                      body: JSON.stringify({ offerId: offer.id }),
                    });
                    fetchOffers();
                  }}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="sent">
          {sent.length === 0 ? (
            <p>Henüz gönderilen teklif bulunmamaktadır.</p>
          ) : (
            <div className="space-y-4">
              {sent.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  isIncoming={false}
                  onReject={async () => {
                    await fetch("/api/offers/delete", {
                      method: "POST",
                      body: JSON.stringify({ offerId: offer.id }),
                    });
                    fetchOffers();
                  }}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
