// /api/balance/withdraw/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    interface WithdrawRequestBody {
      amount: number;
    }

    const body: WithdrawRequestBody = await req.json();
    const { amount } = body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return new NextResponse("Invalid amount", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const balance = await prisma.balance.findUnique({
      where: { userId: user.id },
    });

    if (!balance || balance.amount < amount) {
      return new NextResponse("Insufficient balance", { status: 400 });
    }

    const [updatedBalance, transaction] = await prisma.$transaction([
      prisma.balance.update({
        where: { userId: user.id },
        data: {
          amount: {
            decrement: amount,
          },
        },
      }),
      prisma.balanceTransaction.create({
        data: {
          userId: user.id,
          type: "withdraw",
          amount,
          status: "completed",
        },
      }),
    ]);

    return NextResponse.json({
      message: "Withdrawal successful",
      balance: updatedBalance.amount,
      transaction,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Withdrawal error:", error.message);
    } else {
      console.error("Withdrawal error:", error);
    }
    return new NextResponse("Internal server error", { status: 500 });
  }
}
