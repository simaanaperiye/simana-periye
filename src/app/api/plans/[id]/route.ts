import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plan = await prisma.travelPlan.findUnique({ where: { id } });
  if (!plan) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(plan);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const plan = await prisma.travelPlan.update({
    where: { id },
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
  return NextResponse.json(plan);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.travelPlan.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
