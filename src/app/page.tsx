import Link from "next/link";
import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/prisma";
import PlanCard from "@/components/PlanCard";
import WhyCards from "@/components/WhyCards";

export const dynamic = "force-dynamic";

export default async function Home() {
  const plans = await prisma.travelPlan.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "100vh", minHeight: 700, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to bottom, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.1) 40%, rgba(13,13,13,0.75) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85') center/cover no-repeat`,
        }} />
        <div style={{ position: "relative", textAlign: "center", padding: "0 1.5rem", maxWidth: 900 }}>
          <span className="anim-fade-up-1" style={{ display: "inline-block", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.5rem" }}>
            Premium Travel Experiences Since 2012
          </span>
          <h1 className="anim-fade-up-2" style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3.5rem, 8vw, 7rem)", fontWeight: 300, lineHeight: 1.05, color: "white", margin: "0 0 1.5rem" }}>
            Discover the World&apos;s<br /><em style={{ color: "var(--gold-light)" }}>Hidden Wonders</em>
          </h1>
          <p className="anim-fade-up-3" style={{ fontSize: "1.05rem", fontWeight: 300, color: "rgba(255,255,255,0.7)", maxWidth: 520, margin: "0 auto 2.8rem", lineHeight: 1.7 }}>
            Curated journeys to the world&apos;s most extraordinary destinations — crafted for the discerning traveler.
          </p>
          <div className="anim-fade-up-4" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#destinations" style={primaryBtn}>Explore Destinations</a>
            <a href="#why" style={secondaryBtn}>Why Simana Periye</a>
          </div>
        </div>
        <div className="anim-fade-in" style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Scroll</span>
          <div className="scroll-line" style={{ width: 1, height: 50, background: "linear-gradient(to bottom, var(--gold), transparent)" }} />
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ background: "var(--dark3)", borderTop: "1px solid rgba(201,169,110,0.15)", borderBottom: "1px solid rgba(201,169,110,0.15)", padding: "2.5rem 5%", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2rem" }}>
        {[["180+", "Destinations"], ["24,000+", "Happy Travelers"], ["98%", "Satisfaction"], ["12+", "Years"]].map(([num, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.8rem", fontWeight: 300, color: "var(--gold)", lineHeight: 1 }}>{num}</div>
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", marginTop: "0.4rem" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ── DESTINATIONS ── */}
      <section id="destinations" style={{ padding: "7rem 5%", background: "var(--dark2)" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={eyebrow}>Handpicked for You</span>
          <h2 style={sectionTitle}>Popular <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Destinations</em></h2>
          <p style={sectionDesc}>From the serene valleys of Kashmir to the tropical shores of Goa — we take you where your heart belongs.</p>
          <div style={{ width: 40, height: 1, background: "var(--gold)", margin: "1.5rem auto 0" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
          {plans.map((plan) => <PlanCard key={plan.id} plan={plan} />)}
        </div>
      </section>

      {/* ── WHY ── */}
      <section id="why" style={{ padding: "7rem 5%", background: "var(--dark)" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={eyebrow}>Why Simana Periye</span>
          <h2 style={sectionTitle}>Travel the Way It <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Should Be</em></h2>
          <div style={{ width: 40, height: 1, background: "var(--gold)", margin: "1.5rem auto 0" }} />
        </div>
        <WhyCards />
      </section>

      {/* ── CTA ── */}
      <section id="contact" style={{ position: "relative", padding: "8rem 5%", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80') center/cover no-repeat` }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(13,13,13,0.82)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, lineHeight: 1.1, marginBottom: "1.2rem" }}>
            Ready to Start Your <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Journey?</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: 500, margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            Let our experts craft the perfect itinerary. No cookie-cutter packages — pure personalised adventure.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:hello@simanaperiye.travel" style={primaryBtn}>Contact Us Today</a>
            <a href="tel:+919876543210" style={secondaryBtn}>Call +91 98765 43210</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#080808", padding: "4rem 5% 2rem", borderTop: "1px solid rgba(201,169,110,0.12)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
          <div>
            <Link href="/" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.7rem", fontWeight: 600, color: "white", textDecoration: "none", display: "block", marginBottom: "1rem" }}>
              Simana<span style={{ color: "var(--gold)" }}> Periye</span>
            </Link>
            <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.8, marginBottom: "1.2rem" }}>
              Crafting extraordinary journeys for curious souls since 2012.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.2rem" }}>Destinations</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {plans.slice(0, 5).map((p) => (
                <Link key={p.id} href={`/plans/${p.id}`} style={{ fontSize: "0.85rem", color: "#888", textDecoration: "none" }}>{p.destination}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.2rem" }}>Contact</h4>
            <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.8 }}>hello@simanaperiye.travel<br />+91 98765 43210<br />New Delhi, India</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.78rem", color: "#888" }}>© 2026 Simana Periye Travel. All rights reserved.</p>
          <Link href="/admin" style={{ fontSize: "0.78rem", color: "#444", textDecoration: "none" }}>Admin</Link>
        </div>
      </footer>
    </>
  );
}

const primaryBtn: React.CSSProperties = { background: "var(--gold)", color: "#0d0d0d", padding: "0.9rem 2.5rem", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", display: "inline-block", transition: "all 0.3s" };
const secondaryBtn: React.CSSProperties = { background: "transparent", color: "white", padding: "0.9rem 2.5rem", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.4)", textDecoration: "none", display: "inline-block", transition: "all 0.3s" };
const eyebrow: React.CSSProperties = { fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "1rem" };
const sectionTitle: React.CSSProperties = { fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 300, lineHeight: 1.15, color: "white" };
const sectionDesc: React.CSSProperties = { marginTop: "1rem", fontSize: "0.95rem", color: "#888", maxWidth: 540, marginLeft: "auto", marginRight: "auto", lineHeight: 1.8 };

