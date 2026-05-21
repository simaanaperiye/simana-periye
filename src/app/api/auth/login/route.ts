import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const session = await getSession();
  session.isLoggedIn = true;
  session.adminId = admin.id;
  session.adminEmail = admin.email;
  session.adminName = admin.name;
  await session.save();

  return NextResponse.json({ ok: true });
}
