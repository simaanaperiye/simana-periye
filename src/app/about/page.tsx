"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function AboutPage() {
  const services = [
    { icon: "👥", label: "Group Tour" },
    { icon: "✏️", label: "Customised Tour" },
    { icon: "💑", label: "Honeymoon Trip" },
    { icon: "🌅", label: "Weekend Trip" },
    { icon: "👩", label: "Women's Trip" },
    { icon: "🎒", label: "Student's Excursion" },
    { icon: "🏢", label: "Corporate Tour" },
    { icon: "🌳", label: "Day Out" },
  ];

  const stats = [
    ["12+", "Years Experience"],
    ["24,000+", "Happy Travellers"],
    ["180+", "Destinations"],
    ["98%", "Satisfaction Rate"],
  ];

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        position: "relative", minHeight: 480,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, rgba(30,58,95,0.92) 0%, rgba(58,173,168,0.85) 100%),
            url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80') center/cover no-repeat`,
        }} />
        <div style={{ position: "relative", textAlign: "center", padding: "8rem 5% 5rem", maxWidth: 800, margin: "0 auto" }}>
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", display: "block", marginBottom: "1rem" }}>
            Simana Periye Travel
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 300, color: "white", lineHeight: 1.1, margin: "0 0 1.25rem" }}>
            Beyond <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.75)" }}>Boundaries</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
            Exploring every corner of the globe — breath-taking destinations, hidden gems, and travel experiences that ignite your inner wanderlust.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ background: "var(--sky-dark)", padding: "2.5rem 5%" }}>
        <div className="stats-grid">
          {stats.map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.8rem", fontWeight: 300, color: "var(--sky-light)", lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginTop: "0.4rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHO WE ARE ── */}
      <section style={{ padding: "6rem 5%", background: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--sky)", display: "block", marginBottom: "1rem" }}>Our Story</span>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "var(--sky-dark)", lineHeight: 1.15, marginBottom: "1.5rem" }}>
              Who <em style={{ fontStyle: "italic", color: "var(--sky)" }}>We Are?</em>
            </h2>
            <div style={{ width: 40, height: 2, background: "var(--sky)", borderRadius: 1, marginBottom: "1.75rem" }} />
            <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.9, marginBottom: "1.25rem" }}>
              Exploring every corner of the globe. Join us for breath-taking destinations, hidden gems and travel tips that will ignite your inner wanderlust.
            </p>
            <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.9 }}>
              Founded in 2012 and headquartered in Kolkata, Simana Periye Travel has been crafting extraordinary journeys for thousands of happy travellers across India and beyond. We are a registered travel company with over a decade of expertise in group tours, customised holidays, and pilgrimage travel.
            </p>
            <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {["CE No: 004617102116", "MSME: UDYAM-WB-10-0185262", "GST: 19AORPA8912NIZA"].map(tag => (
                <span key={tag} style={{ background: "var(--sky-pale)", color: "var(--sky-dark)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", padding: "0.35rem 0.85rem", borderRadius: 2, border: "1px solid var(--sky-pale2)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div style={{ position: "relative" }}>
            <div style={{ background: "linear-gradient(135deg, var(--sky-dark) 0%, var(--sky) 100%)", borderRadius: 8, padding: "3rem 2.5rem", color: "white", boxShadow: "0 20px 60px rgba(30,58,95,0.25)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✈️</div>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.8rem", fontWeight: 300, marginBottom: "1rem" }}>
                Comfort First.<br />Quality Always.
              </h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
                Every journey we design puts your comfort at the centre — from handpicked accommodations to experienced tour managers who treat you like family.
              </p>
              <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.5rem" }}>Get in touch</p>
                <p style={{ fontSize: "0.9rem", color: "white", fontWeight: 500 }}>📞 +91 99031 49484</p>
                <p style={{ fontSize: "0.9rem", color: "white", fontWeight: 500 }}>📧 simanaperiyet@gmail.com</p>
              </div>
            </div>
            {/* Decorative corner */}
            <div style={{ position: "absolute", top: -16, right: -16, width: 80, height: 80, background: "var(--sky-pale)", borderRadius: "50%", zIndex: -1 }} />
            <div style={{ position: "absolute", bottom: -20, left: -20, width: 120, height: 120, background: "#e0f5f4", borderRadius: "50%", zIndex: -1 }} />
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section style={{ padding: "6rem 5%", background: "var(--sky-pale2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--sky)", display: "block", marginBottom: "1rem" }}>Our Services</span>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "var(--sky-dark)", lineHeight: 1.15, marginBottom: "1.25rem" }}>
              What <em style={{ fontStyle: "italic", color: "var(--sky)" }}>We Do?</em>
            </h2>
            <div style={{ width: 40, height: 2, background: "var(--sky)", borderRadius: 1, margin: "0 auto" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {services.map(({ icon, label }) => (
              <div key={label} style={{
                background: "white", borderRadius: 6, padding: "2rem 1.5rem", textAlign: "center",
                boxShadow: "0 2px 12px rgba(58,173,168,0.08)", border: "1px solid rgba(58,173,168,0.12)",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(58,173,168,0.18)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(58,173,168,0.08)"; }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.9rem" }}>{icon}</div>
                <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.25rem", fontWeight: 500, color: "var(--sky-dark)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ padding: "6rem 5%", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--sky)", display: "block", marginBottom: "1rem" }}>Why Us</span>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "var(--sky-dark)", lineHeight: 1.15 }}>
              Our <em style={{ fontStyle: "italic", color: "var(--sky)" }}>Speciality</em>
            </h2>
            <div style={{ width: 40, height: 2, background: "var(--sky)", borderRadius: 1, margin: "1.5rem auto 0" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            {[
              { icon: "🧒👴", title: "Special Care", desc: "Dedicated attention for kids and senior citizens throughout every journey." },
              { icon: "🏠", title: "Homely Atmosphere", desc: "Warm, family-like environment that makes every trip feel like home away from home." },
              { icon: "🩹", title: "Preliminary First Aid", desc: "Our team is trained in first aid so you can travel worry-free." },
              { icon: "🌟", title: "Travel & Hospitality Experts", desc: "Over 12 years of expertise crafting memorable, hassle-free travel experiences." },
              { icon: "📋", title: "Registered Company", desc: "Fully registered with CE No: 004617102116, MSME & GST certifications." },
              { icon: "💧", title: "1L Water Per Day", desc: "Complimentary 1L mineral water per person daily on all group tours." },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: 52, height: 52, background: "var(--sky-pale)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>{icon}</div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", fontWeight: 600, color: "var(--sky-dark)", marginBottom: "0.35rem" }}>{title}</h4>
                  <p style={{ fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--sky-dark)", padding: "5rem 5%", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 300, color: "white", marginBottom: "1rem" }}>
          Ready to <em style={{ fontStyle: "italic", color: "var(--sky-light)" }}>Explore?</em>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 480, margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
          Let us craft the perfect journey for you — group tours, honeymoon packages, corporate outings and more.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/#destinations" style={{ background: "var(--sky)", color: "white", padding: "0.9rem 2.5rem", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2 }}>
            View Destinations
          </Link>
          <a href="mailto:simanaperiyet@gmail.com" style={{ background: "transparent", color: "white", padding: "0.9rem 2.5rem", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.5)", textDecoration: "none", borderRadius: 2 }}>
            Contact Us
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#f8fafc", padding: "2rem 5%", borderTop: "2px solid #e0f2fe", textAlign: "center" }}>
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>© 2026 Simana Periye Travel. All rights reserved.</p>
      </footer>
    </>
  );
}
