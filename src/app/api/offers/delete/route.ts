// src/app/api/offers/delete/route.ts
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
    const { offerId } = body;

    if (!offerId) {
      return new NextResponse("Teklif ID gerekli", { status: 400 });
    }

    // Sadece teklifin sahibi kendi reddedilmiş teklifini silebilir
    const existingOffer = await prisma.offer.findUnique({
      where: { id: offerId },
      select: { id: true, senderId: true, status: true },
    });

    if (!existingOffer || existingOffer.senderId !== session.user.id) {
      return new NextResponse("Teklif bulunamadı veya yetkisiz", {
        status: 403,
      });
    }

    if (existingOffer.status !== "rejected") {
      return new NextResponse("Yalnızca reddedilmiş teklifler silinebilir", {
        status: 400,
      });
    }

    await prisma.offer.delete({
      where: { id: offerId },
    });

    return NextResponse.json({ message: "Teklif silindi" });
  } catch (error) {
    console.error("Silme hatası:", error);
    return new NextResponse("Sunucu hatası", { status: 500 });
  }
}
