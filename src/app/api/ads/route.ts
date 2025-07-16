import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

interface PackageInput {
  name: string;
  description: string;
  price: number;
  deliveryTime: string;
}

export async function GET() {
  try {
    const ads = await prisma.ad.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        category: true,
        subcategory: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        packages: true,
      },
    });

    const formattedAds = ads.map((ad) => ({
      ...ad,
      createdAt: ad.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedAds);
  } catch (error) {
    console.error("Ads API error:", error);
    return NextResponse.json(
      { message: "Bir hata oluştu", error: JSON.stringify(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Oturum bulunamadı." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, description, category, subcategory, image, packages } = body;

    if (
      !title ||
      !description ||
      !category ||
      !subcategory ||
      typeof image !== "string" ||
      !image.trim() ||
      !Array.isArray(packages) ||
      !(packages as PackageInput[]).length
    ) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur." },
        { status: 400 }
      );
    }

    const createdAd = await prisma.ad.create({
      data: {
        user: {
          connect: { id: session.user.id },
        },
        title,
        description,
        category,
        subcategory,
        image,
        packages: {
          create: (packages as PackageInput[]).map((pkg) => ({
            name: pkg.name,
            description: pkg.description,
            price: pkg.price,
            deliveryTime: pkg.deliveryTime,
          })),
        },
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(
      { success: true, adId: createdAd.id },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "İlan kayıt hatası:",
      error instanceof Error ? error.message : error
    );
    console.error("Detaylı hata:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: "Sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}
