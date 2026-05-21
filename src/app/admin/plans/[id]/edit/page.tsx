import { getSession } from "@/lib/session";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/AdminShell";
import PlanForm from "@/components/PlanForm";

export const dynamic = "force-dynamic";

export default async function EditPlan({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.isLoggedIn) redirect("/admin/login");

  const { id } = await params;
  const plan = await prisma.travelPlan.findUnique({ where: { id } });
  if (!plan) notFound();

  return (
    <AdminShell name={session.adminName || "Admin"}>
      <div style={{ maxWidth: 800 }}>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.8rem", fontWeight: 400, marginBottom: "0.5rem" }}>Edit Plan</h1>
        <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: "2.5rem" }}>Update the details for <strong style={{ color: "white" }}>{plan.title}</strong></p>
        <PlanForm plan={plan} mode="edit" />
      </div>
    </AdminShell>
  );
}
