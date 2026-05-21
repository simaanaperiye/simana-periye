import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  const plans = await prisma.travelPlan.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(plans);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const plan = await prisma.travelPlan.create({
    data: {
      title: body.title,
      destination: body.destination,
      region: body.region,
      description: body.description,
      longDesc: body.longDesc || "",
      price: Number(body.price),
      duration: Number(body.duration),
      maxPeople: Number(body.maxPeople) || 20,
      imageUrl: body.imageUrl,
      badge: body.badge || null,
      inclusions: JSON.stringify(body.inclusions || []),
      departureDate: body.departureDate ? new Date(body.departureDate) : null,
      isActive: body.isActive ?? true,
    },
  });
  return NextResponse.json(plan, { status: 201 });
}
