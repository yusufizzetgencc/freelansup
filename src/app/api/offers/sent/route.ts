// File: src/app/api/offers/sent/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    const offers = await prisma.offer.findMany({
      where: {
        senderId: currentUser.id,
      },
      include: {
        receiver: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        ad: {
          select: {
            id: true,
            title: true,
            image: true,
            description: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(offers);
  } catch (error) {
    console.error("Teklifleri alırken hata oluştu:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
