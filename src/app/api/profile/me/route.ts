import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      ads: true,
      receivedReviews: true,
      expertise: true,
      services: true,
    },
  });

  return NextResponse.json({
    id: user?.id,
    image: user?.image || null,
    about: user?.about || "",
    expertise: user?.expertise || [],
    services: user?.services || [],
    ads: user?.ads || [],
    reviews: user?.receivedReviews || [],
  });
}
