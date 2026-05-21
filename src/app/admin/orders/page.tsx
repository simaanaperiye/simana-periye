import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/AdminShell";

export const dynamic = "force-dynamic";

const statusColor = (s: string) => {
  if (s === "paid") return { background: "rgba(74,158,110,0.15)", color: "#4a9e6e", border: "1px solid rgba(74,158,110,0.3)" };
  if (s === "cancelled") return { background: "rgba(248,113,113,0.1)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)" };
  return { background: "rgba(255,255,255,0.06)", color: "#888", border: "1px solid rgba(255,255,255,0.1)" };
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
          <div key={label as string} style={{ background: "var(--dark3)", border: "1px solid rgba(201,169,110,0.12)", padding: "1.5rem" }}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", marginBottom: "0.5rem" }}>{label as string}</p>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", color: "var(--gold)" }}>{value}</p>
          </div>
        ))}
      </div>

      <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.8rem", fontWeight: 400, marginBottom: "1.5rem" }}>Orders</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1.2fr 120px 100px 80px", gap: "1rem", padding: "0.75rem 1rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <span>Order ID</span><span>Customer</span><span>Trips</span><span>Amount</span><span>Status</span><span>Date</span>
        </div>

        {orders.map((order) => (
          <div key={order.id} style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1.2fr 120px 100px 80px", gap: "1rem", padding: "1rem", alignItems: "center", background: "var(--dark3)", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
            <span style={{ fontSize: "0.75rem", color: "#666", fontFamily: "monospace" }}>{order.id.slice(0, 12)}…</span>
            <div>
              <p style={{ fontSize: "0.88rem", fontWeight: 500 }}>{order.customerName}</p>
              <p style={{ fontSize: "0.75rem", color: "#888" }}>{order.customerEmail}</p>
            </div>
            <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)" }}>
              {order.items.map((item) => `${item.plan.title} ×${item.quantity}`).join(", ")}
            </div>
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", color: "var(--gold)" }}>₹{order.totalAmount.toLocaleString("en-IN")}</span>
            <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.25rem 0.6rem", ...statusColor(order.status) }}>
              {order.status}
            </span>
            <span style={{ fontSize: "0.78rem", color: "#888" }}>{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
          </div>
        ))}

        {orders.length === 0 && (
          <div style={{ padding: "4rem", textAlign: "center", color: "#888" }}>No orders yet.</div>
        )}
      </div>
    </AdminShell>
  );
}
