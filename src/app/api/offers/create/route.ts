// src/app/api/offers/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { adId, message, price, deliveryDays } = body;

    if (!adId || !message || !price || !deliveryDays) {
      return new NextResponse("Eksik alanlar var", { status: 400 });
    }

    const ad = await prisma.ad.findUnique({
      where: { id: adId },
    });

    if (!ad) {
      return new NextResponse("İlan bulunamadı", { status: 404 });
    }

    const offer = await prisma.offer.create({
      data: {
        adId,
        message,
        price: parseFloat(price),
        deliveryDays: parseInt(deliveryDays),
        senderId: session.user.id,
        receiverId: ad.userId,
      },
    });

    return NextResponse.json(offer);
  } catch (error) {
    console.error("Teklif oluşturulurken hata:", error);
    return new NextResponse("Sunucu hatası", { status: 500 });
  }
}
