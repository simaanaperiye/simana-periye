import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PlanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plan = await prisma.travelPlan.findUnique({ where: { id } });
  if (!plan) notFound();

  const inclusions: string[] = JSON.parse(plan.inclusions || "[]");

  return (
    <>
      <Navbar />
      {/* Hero */}
      <div style={{ height: "60vh", minHeight: 400, position: "relative", overflow: "hidden" }}>
        <img src={plan.imageUrl} alt={plan.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: "3rem", left: "5%", right: "5%" }}>
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#bae6fd" }}>{plan.region}</span>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, lineHeight: 1.1, color: "white", margin: "0.3rem 0 0" }}>{plan.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="plan-grid" style={{ padding: "4rem 5%", maxWidth: 1100, margin: "0 auto" }}>
        {/* Left */}
        <div>
          <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.9, marginBottom: "2.5rem" }}>{plan.longDesc || plan.description}</p>

          {inclusions.length > 0 && (
            <div style={{ marginBottom: "2.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 400, marginBottom: "1.2rem", color: "var(--text)" }}>What&apos;s Included</h3>
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
                {inclusions.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
                    <span style={{ color: "var(--sky)", fontSize: "1rem" }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link href="/#destinations" style={{ fontSize: "0.82rem", color: "var(--sky)", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>← Back to Destinations</Link>
        </div>

        {/* Booking card */}
        <div className="sticky-sidebar" style={{ background: "white", border: "1px solid rgba(0,0,0,0.1)", padding: "2rem", borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.3rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Starting from</div>
          <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.8rem", color: "var(--sky-dark)", lineHeight: 1, marginBottom: "1.5rem" }}>₹{plan.price.toLocaleString("en-IN")}</div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.8rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Duration</span><span style={{ color: "var(--text)", fontWeight: 500 }}>{plan.duration} Days</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Max Group</span><span style={{ color: "var(--text)", fontWeight: 500 }}>{plan.maxPeople} People</span></div>
            {plan.departureDate && <div style={{ display: "flex", justifyContent: "space-between" }}><span>Next Departure</span><span style={{ color: "var(--text)", fontWeight: 500 }}>{new Date(plan.departureDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span></div>}
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Region</span><span style={{ color: "var(--text)", fontWeight: 500 }}>{plan.region}</span></div>
          </div>

          <AddToCartButton plan={{ planId: plan.id, title: plan.title, destination: plan.destination, imageUrl: plan.imageUrl, price: plan.price, duration: plan.duration }} />

          <Link href="/checkout" style={{ display: "block", textAlign: "center", border: "1px solid var(--sky)", color: "var(--sky)", padding: "0.8rem", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", marginTop: "0.6rem", transition: "all 0.3s", borderRadius: 2 }}>
            Go to Checkout
          </Link>
        </div>
      </div>
    </>
  );
}
