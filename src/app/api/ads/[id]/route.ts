import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;
    const id = pathname.split("/").pop();

    if (!id) {
      return new NextResponse("Geçersiz istek", { status: 400 });
    }

    const ad = await prisma.ad.findUnique({
      where: { id },
      include: {
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

    if (!ad) {
      return new NextResponse("İlan bulunamadı", { status: 404 });
    }

    return NextResponse.json({
      ...ad,
      createdAt: ad.createdAt.toISOString(),
    });
  } catch (error) {
    console.error("Ad detay hatası:", error);
    return new NextResponse("Sunucu hatası", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse("Yetkisiz", { status: 401 });
  }

  try {
    const { pathname } = req.nextUrl;
    const id = pathname.split("/").pop();

    if (!id) {
      return new NextResponse("Geçersiz istek", { status: 400 });
    }

    const ad = await prisma.ad.findUnique({
      where: { id },
    });

    if (!ad || ad.userId !== session.user.id) {
      return new NextResponse("İzin yok", { status: 403 });
    }

    await prisma.$transaction([
      prisma.package.deleteMany({ where: { adId: id } }),
      prisma.ad.delete({ where: { id } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Silme hatası:", error);
    return new NextResponse("Bir hata oluştu: " + (error as Error).message, {
      status: 500,
    });
  }
}
