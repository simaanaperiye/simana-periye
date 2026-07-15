import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface CartItem {
  planId: string;
  title: string;
  destination: string;
  imageUrl: string;
  price: number;
  duration: number;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const { items, customerName, customerEmail }: { items: CartItem[]; customerName: string; customerEmail: string } = await req.json();

    if (!items?.length) return NextResponse.json({ error: "No items" }, { status: 400 });
    if (!customerName?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!customerEmail?.trim()) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        totalAmount: items.reduce((s, i) => s + i.price * i.quantity, 0),
        status: "pending_payment",
        items: {
          create: items.map((item) => ({
            planId: item.planId,
            planTitle: item.title,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json({ orderId: order.id, success: true });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Failed to save booking. Please try again." }, { status: 500 });
  }
}
