import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/AdminShell";

export const dynamic = "force-dynamic";

const statusColor = (s: string) => {
  if (s === "paid") return { background: "rgba(22,163,74,0.1)", color: "#16a34a", border: "1px solid rgba(22,163,74,0.25)" };
  if (s === "cancelled") return { background: "rgba(220,38,38,0.08)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.2)" };
  return { background: "#f1f5f9", color: "var(--text-muted)", border: "1px solid rgba(14,165,233,0.15)" };
};

export default async function AdminOrders() {
  const session = await getSession();
  if (!session.isLoggedIn) redirect("/admin/login");

  const orders = await prisma.order.findMany({
    include: { items: { include: { plan: { select: { title: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = orders.filter((o) => o.status === "paid").reduce((s, o) => s + o.totalAmount, 0);

  return (
    <AdminShell name={session.adminName || "Admin"}>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
        {[
          ["Total Orders", orders.length],
          ["Paid Orders", orders.filter((o) => o.status === "paid").length],
          ["Revenue", `₹${totalRevenue.toLocaleString("en-IN")}`],
        ].map(([label, value]) => (
          <div key={label as string} style={{ background: "white", border: "1px solid rgba(14,165,233,0.15)", padding: "1.5rem", borderRadius: 4 }}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.5rem" }}>{label as string}</p>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", color: "var(--sky-dark)" }}>{value}</p>
          </div>
        ))}
      </div>

      <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.8rem", fontWeight: 400, marginBottom: "1.5rem", color: "var(--text)" }}>Orders</h1>

      <div style={{ background: "white", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1.2fr 120px 100px 80px", gap: "1rem", padding: "0.75rem 1rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", background: "#f8fafc", borderBottom: "1px solid rgba(14,165,233,0.12)" }}>
          <span>Order ID</span><span>Customer</span><span>Trips</span><span>Amount</span><span>Status</span><span>Date</span>
        </div>

        {orders.map((order) => (
          <div key={order.id} style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1.2fr 120px 100px 80px", gap: "1rem", padding: "1rem", alignItems: "center", borderBottom: "1px solid rgba(14,165,233,0.08)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "monospace" }}>{order.id.slice(0, 12)}…</span>
            <div>
              <p style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--text)" }}>{order.customerName}</p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{order.customerEmail}</p>
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
              {order.items.map((item) => `${item.plan.title} ×${item.quantity}`).join(", ")}
            </div>
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", color: "var(--sky-dark)" }}>₹{order.totalAmount.toLocaleString("en-IN")}</span>
            <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.25rem 0.6rem", borderRadius: 2, ...statusColor(order.status) }}>
              {order.status}
            </span>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
          </div>
        ))}

        {orders.length === 0 && (
          <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-muted)" }}>No orders yet.</div>
        )}
      </div>
    </AdminShell>
  );
}
