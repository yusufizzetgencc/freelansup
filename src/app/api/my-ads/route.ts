import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const adsRaw = await prisma.ad.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        category: true,
        subcategory: true,
        createdAt: true,
        packages: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // createdAt tarihlerini ISO string olarak dön
    const ads = adsRaw.map((ad) => ({
      ...ad,
      createdAt: ad.createdAt.toISOString(),
    }));

    return NextResponse.json(ads);
  } catch (error) {
    console.error("My Ads API error:", error);
    return NextResponse.json(
      { message: "Bir hata oluştu", error: JSON.stringify(error) },
      { status: 500 }
    );
  }
}
