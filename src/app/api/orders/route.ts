import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { offerId } = await req.json();

  try {
    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
      include: {
        ad: true,
        sender: true,
        receiver: true,
      },
    });

    if (!offer) {
      return NextResponse.json({ error: "Teklif bulunamadı" }, { status: 404 });
    }

    if (offer.status !== "accepted") {
      return NextResponse.json(
        { error: "Sadece kabul edilmiş teklifler siparişe dönüştürülebilir." },
        { status: 400 }
      );
    }

    // Daha önce bu teklif ile sipariş oluşturulmuş mu kontrol et
    const existingOrder = await prisma.order.findFirst({
      where: { offerId: offer.id },
    });

    if (existingOrder) {
      return NextResponse.json(
        { error: "Bu teklif için zaten bir sipariş var." },
        { status: 400 }
      );
    }

    const newOrder = await prisma.order.create({
      data: {
        offerId: offer.id,
        adId: offer.ad.id,
        buyerId: offer.sender.id,
        sellerId: offer.receiver.id,
        status: "pending",
      },
    });

    const fullOrder = await prisma.order.findUnique({
      where: { id: newOrder.id },
      include: {
        ad: {
          select: {
            title: true,
            image: true,
          },
        },
        offer: {
          select: {
            message: true,
            price: true,
            deliveryDays: true,
          },
        },
        buyer: {
          select: {
            username: true,
            image: true,
          },
        },
        seller: {
          select: {
            username: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(fullOrder, { status: 201 });
  } catch (err) {
    console.error("Order creation error:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sentOrders = await prisma.order.findMany({
      where: { buyerId: session.user.id },
      include: {
        ad: {
          select: {
            title: true,
            image: true,
          },
        },
        offer: {
          select: {
            message: true,
            price: true,
            deliveryDays: true,
          },
        },
        buyer: {
          select: {
            username: true,
            image: true,
          },
        },
        seller: {
          select: {
            username: true,
            image: true,
          },
        },
      },
    });

    const receivedOrders = await prisma.order.findMany({
      where: { sellerId: session.user.id },
      include: {
        ad: {
          select: {
            title: true,
            image: true,
          },
        },
        offer: {
          select: {
            message: true,
            price: true,
            deliveryDays: true,
          },
        },
        buyer: {
          select: {
            username: true,
            image: true,
          },
        },
        seller: {
          select: {
            username: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        sent: sentOrders,
        received: receivedOrders,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching orders:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
