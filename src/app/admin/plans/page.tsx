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
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.8rem", fontWeight: 400, color: "var(--text)" }}>Travel Plans</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.2rem" }}>{plans.length} plans configured</p>
        </div>
        <Link href="/admin/plans/new" style={{ background: "var(--sky)", color: "white", padding: "0.65rem 1.5rem", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2 }}>
          + New Plan
        </Link>
      </div>

      <div style={{ background: "white", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 4, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 120px 100px 80px 120px 100px", gap: "1rem", padding: "0.75rem 1rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", background: "#f8fafc", borderBottom: "1px solid rgba(14,165,233,0.12)" }}>
          <span>Image</span><span>Title</span><span>Destination</span><span>Price</span><span>Days</span><span>Departure</span><span>Actions</span>
        </div>

        {plans.map((plan) => (
          <div key={plan.id} style={{ display: "grid", gridTemplateColumns: "60px 1fr 120px 100px 80px 120px 100px", gap: "1rem", padding: "0.9rem 1rem", alignItems: "center", borderBottom: "1px solid rgba(14,165,233,0.08)", transition: "background 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f0f9ff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <img src={plan.imageUrl} alt={plan.title} style={{ width: 50, height: 40, objectFit: "cover", borderRadius: 2 }} />
            <div>
              <p style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text)" }}>{plan.title}</p>
              {plan.badge && <span style={{ fontSize: "0.65rem", background: "var(--sky)", color: "white", padding: "0.1rem 0.5rem", fontWeight: 700, letterSpacing: "0.08em", borderRadius: 2 }}>{plan.badge}</span>}
              {!plan.isActive && <span style={{ fontSize: "0.65rem", background: "#f1f5f9", color: "var(--text-muted)", padding: "0.1rem 0.5rem", marginLeft: "0.3rem", borderRadius: 2 }}>Inactive</span>}
            </div>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{plan.destination}</span>
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", color: "var(--sky-dark)" }}>₹{plan.price.toLocaleString("en-IN")}</span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{plan.duration}D</span>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{plan.departureDate ? new Date(plan.departureDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}</span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link href={`/admin/plans/${plan.id}/edit`} style={{ fontSize: "0.75rem", color: "var(--sky)", textDecoration: "none", border: "1px solid rgba(14,165,233,0.3)", padding: "0.3rem 0.6rem", borderRadius: 2 }}>Edit</Link>
              <DeletePlanButton id={plan.id} />
            </div>
          </div>
        ))}

        {plans.length === 0 && (
          <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-muted)" }}>No plans yet. Create your first one.</div>
        )}
      </div>
    </AdminShell>
  );
}
