// /api/balance/add/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { amount, description } = body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return new NextResponse("Invalid amount", { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  const transaction = await prisma.balanceTransaction.create({
    data: {
      userId: user.id,
      type: "add",
      amount,
      status: "pending",
      description,
    },
  });

  // Update or create balance
  const existingBalance = await prisma.balance.findUnique({
    where: { userId: user.id },
  });

  if (existingBalance) {
    await prisma.balance.update({
      where: { userId: user.id },
      data: {
        amount: {
          increment: amount,
        },
      },
    });
  } else {
    await prisma.balance.create({
      data: {
        userId: user.id,
        amount,
      },
    });
  }

  return NextResponse.json(transaction);
}
