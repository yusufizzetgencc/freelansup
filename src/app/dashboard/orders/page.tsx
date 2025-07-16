"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Order, Ad, User } from "@prisma/client";
import { Loader2 } from "lucide-react";
import OrderCard from "@/components/dashboard/orders/OrderCard";
import { useSession } from "next-auth/react";

interface ExtendedOrder extends Order {
  ad: Ad;
  buyer: User;
  seller: User;
  offer: {
    message: string;
    price: number;
    deliveryDays: number;
  };
}

export default function OrdersPage() {
  const { data: session } = useSession();
  const [sentOrders, setSentOrders] = useState<ExtendedOrder[]>([]);
  const [receivedOrders, setReceivedOrders] = useState<ExtendedOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/orders");
        setSentOrders(res.data.sent);
        setReceivedOrders(res.data.received);
      } catch (err) {
        toast.error("Siparişler alınırken hata oluştu.: " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Siparişlerim</h1>
      <Tabs defaultValue="received" className="w-full">
        <TabsList className="w-full flex justify-start gap-4">
          <TabsTrigger value="received">Gelen Siparişler</TabsTrigger>
          <TabsTrigger value="sent">Gönderilen Siparişler</TabsTrigger>
        </TabsList>
        <TabsContent value="received">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="animate-spin" />
            </div>
          ) : receivedOrders.length === 0 ? (
            <p className="text-muted-foreground mt-4">
              Henüz gelen sipariş yok.
            </p>
          ) : (
            <div className="flex flex-col gap-4 mt-6">
              {receivedOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  isIncoming
                  sessionUserId={session?.user?.id || ""}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="sent">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="animate-spin" />
            </div>
          ) : sentOrders.length === 0 ? (
            <p className="text-muted-foreground mt-4">
              Henüz gönderilen sipariş yok.
            </p>
          ) : (
            <div className="flex flex-col gap-4 mt-6">
              {sentOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  isIncoming={false}
                  sessionUserId={session?.user?.id || ""}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
