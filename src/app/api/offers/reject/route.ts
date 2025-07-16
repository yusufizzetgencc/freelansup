import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Yetkisiz erişim", { status: 401 });
    }

    const { offerId } = await req.json();
    if (!offerId) {
      return new NextResponse("Teklif ID gerekli", { status: 400 });
    }

    const updatedOffer = await prisma.offer.update({
      where: { id: offerId },
      data: { status: "rejected" },
    });

    return NextResponse.json(updatedOffer);
  } catch (error) {
    console.error("Reddetme hatası:", error);
    return new NextResponse("Sunucu hatası", { status: 500 });
  }
}
