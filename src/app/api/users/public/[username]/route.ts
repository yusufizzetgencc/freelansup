import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        firstName: true,
        lastName: true,
        username: true,
        image: true,
        about: true,
        services: {
          select: { name: true },
        },
        expertise: {
          select: { name: true },
        },
        receivedReviews: {
          select: {
            id: true,
            text: true,
            rating: true,
            createdAt: true,
            author: {
              select: {
                username: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı." },
        { status: 404 }
      );
    }

    const averageRating =
      user.receivedReviews.length > 0
        ? user.receivedReviews.reduce((acc, r) => acc + r.rating, 0) /
          user.receivedReviews.length
        : null;

    return NextResponse.json({
      ...user,
      services: user.services.map((s) => s.name),
      expertise: user.expertise.map((e) => e.name),
      reviews: user.receivedReviews.map((r) => ({
        id: r.id,
        text: r.text,
        rating: r.rating,
        createdAt: r.createdAt,
        authorName: r.author.username,
        authorImage: r.author.image,
      })),
      averageRating,
    });
  } catch (error) {
    console.error("Profil alma hatası:", error);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}
