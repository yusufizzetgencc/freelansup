// src/app/api/orders/[action]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(
  req: NextRequest,
  { params }: { params: { action: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { orderId } = await req.json();
  const { action } = params;

  const validStatuses = ["accepted", "delivered", "completed", "cancelled"];
  if (!validStatuses.includes(action)) {
    return NextResponse.json({ error: "Geçersiz işlem." }, { status: 400 });
  }

  try {
    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status: action },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Sipariş güncellenemedi." },
      { status: 500 }
    );
  }
}
