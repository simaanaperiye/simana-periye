import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
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
  const { items, customerName, customerEmail }: { items: CartItem[]; customerName: string; customerEmail: string } = await req.json();

  if (!items?.length) return NextResponse.json({ error: "No items" }, { status: 400 });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Create order in DB as pending
  const order = await prisma.order.create({
    data: {
      customerName,
      customerEmail,
      totalAmount: items.reduce((s, i) => s + i.price * i.quantity, 0),
      status: "pending",
      items: {
        create: items.map((item) => ({
          planId: item.planId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  // Create Stripe session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: customerEmail,
    metadata: { orderId: order.id, customerName },
    line_items: items.map((item) => ({
      price_data: {
        currency: "inr",
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.title,
          description: `${item.destination} · ${item.duration} Days`,
          images: [item.imageUrl],
        },
      },
      quantity: item.quantity,
    })),
    success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/checkout`,
  });

  // Save session ID
  await prisma.order.update({ where: { id: order.id }, data: { stripeSessionId: session.id } });

  return NextResponse.json({ sessionId: session.id, url: session.url });
}
