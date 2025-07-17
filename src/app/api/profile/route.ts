import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const body = await req.json();
  const { image, about, expertise, services } = body;

  // Safely map expertise names
  const expertiseData = Array.isArray(expertise)
    ? {
        deleteMany: {},
        create: expertise
          .filter((item) => typeof item === "string")
          .map((name) => name.trim())
          .filter((name) => name.length > 0)
          .map((name) => ({ name })),
      }
    : undefined;

  // Safely map services names
  const servicesData = Array.isArray(services)
    ? {
        deleteMany: {},
        create: services
          .filter((item) => typeof item === "string")
          .map((name) => name.trim())
          .filter((name) => name.length > 0)
          .map((name) => ({ name })),
      }
    : undefined;

  const updated = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      image,
      about,
      expertise: expertiseData,
      services: servicesData,
    },
  });

  return NextResponse.json({ success: true, updated });
}
