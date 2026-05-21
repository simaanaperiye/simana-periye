import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import DeletePlanButton from "@/components/DeletePlanButton";

export const dynamic = "force-dynamic";

export default async function AdminPlans() {
  const session = await getSession();
  if (!session.isLoggedIn) redirect("/admin/login");

  const plans = await prisma.travelPlan.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AdminShell name={session.adminName || "Admin"}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.8rem", fontWeight: 400 }}>Travel Plans</h1>
          <p style={{ color: "#888", fontSize: "0.85rem", marginTop: "0.2rem" }}>{plans.length} plans configured</p>
        </div>
        <Link href="/admin/plans/new" style={{ background: "var(--gold)", color: "#0d0d0d", padding: "0.65rem 1.5rem", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
          + New Plan
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 120px 100px 80px 120px 100px", gap: "1rem", padding: "0.75rem 1rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <span>Image</span><span>Title</span><span>Destination</span><span>Price</span><span>Days</span><span>Departure</span><span>Actions</span>
        </div>

        {plans.map((plan) => (
          <div key={plan.id} style={{ display: "grid", gridTemplateColumns: "60px 1fr 120px 100px 80px 120px 100px", gap: "1rem", padding: "0.9rem 1rem", alignItems: "center", background: "var(--dark3)", borderBottom: "1px solid rgba(255,255,255,0.03)", transition: "background 0.2s" }}>
            <img src={plan.imageUrl} alt={plan.title} style={{ width: 50, height: 40, objectFit: "cover" }} />
            <div>
              <p style={{ fontSize: "0.9rem", fontWeight: 500 }}>{plan.title}</p>
              {plan.badge && <span style={{ fontSize: "0.65rem", background: "var(--gold)", color: "#0d0d0d", padding: "0.1rem 0.5rem", fontWeight: 700, letterSpacing: "0.08em" }}>{plan.badge}</span>}
              {!plan.isActive && <span style={{ fontSize: "0.65rem", background: "rgba(255,255,255,0.1)", color: "#888", padding: "0.1rem 0.5rem", marginLeft: "0.3rem" }}>Inactive</span>}
            </div>
            <span style={{ fontSize: "0.85rem", color: "#888" }}>{plan.destination}</span>
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", color: "var(--gold)" }}>₹{plan.price.toLocaleString("en-IN")}</span>
            <span style={{ fontSize: "0.85rem", color: "#888" }}>{plan.duration}D</span>
            <span style={{ fontSize: "0.78rem", color: "#888" }}>{plan.departureDate ? new Date(plan.departureDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}</span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link href={`/admin/plans/${plan.id}/edit`} style={{ fontSize: "0.75rem", color: "var(--gold)", textDecoration: "none", border: "1px solid rgba(201,169,110,0.3)", padding: "0.3rem 0.6rem" }}>Edit</Link>
              <DeletePlanButton id={plan.id} />
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
