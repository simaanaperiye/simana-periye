import Navbar from "@/components/Navbar";
import Link from "next/link";

const days = [
  {
    day: 1,
    title: "Raxaul → Birgunj → Pokhara",
    desc: "Arrive at Raxaul / Birgunj, freshen up, have breakfast and lunch, then transfer to Pokhara. Check in and overnight stay.",
  },
  {
    day: 3,
    title: "Pokhara Sightseeing",
    desc: "After breakfast, visit the serene Fewa Lake. After lunch, explore Pokhara's highlights — Bat Cave, Gupteswar Mahadev, Devi's Fall, and Mahendra Cave. Evening at leisure. Overnight stay.",
  },
  {
    day: 4,
    title: "Pokhara → Jomsom",
    desc: "After breakfast, depart for Jomsom. En route visit Galeswar Mahadev, Tatopani hot springs, and the stunning Rupse Waterfall. Lunch on the way. Overnight stay at Jomsom.",
  },
  {
    day: 5,
    title: "Muktinath Darshan → Pokhara",
    desc: "Early morning, visit the sacred Muktinath temple and return to hotel for lunch. After lunch, transfer back to Pokhara via the charming Marpha village. Overnight stay.",
  },
  {
    day: 6,
    title: "Pokhara → Kathmandu via Manakamana",
    desc: "After breakfast, travel to Kathmandu with a divine stop at Manakamana Devi temple. Lunch on the way. Arrive Kathmandu and check in. Overnight stay.",
  },
  {
    day: 7,
    title: "Kathmandu Sightseeing",
    desc: "Morning puja at the revered Pashupatinath temple. After breakfast and lunch, explore Kathmandu — Swayambhunath (Monkey Temple), Budhanilkantha, and Boudhanath Stupa. Evening free for shopping. Overnight stay.",
  },
  {
    day: 8,
    title: "Bhaktapur & Nagarkot Sunset",
    desc: "After lunch, visit the UNESCO-listed Bhaktapur Rajdarbar (Durbar Square). Proceed to Nagarkot to witness a breathtaking Himalayan sunset. Overnight at Kathmandu.",
  },
  {
    day: 9,
    title: "Return Journey to Raxaul",
    desc: "After breakfast, begin the return journey to Raxaul / Birgunj to board your train back home. Tour concludes with wonderful memories.",
  },
];

const inclusions = [
  "Deluxe accommodation",
  "Comfortable journey by bus",
  "All meals by our own kitchen staff",
  "Muktinath permit (Complimentary)",
  "Experienced driver",
  "Efficient tour manager",
  "Tour guide",
  "Toll, parking, driver charges & permits",
];

const exclusions = [
  "Train fare / train food",
  "Flight fare",
  "Personal expenses",
  "Cost from natural calamities, road blockage, landslide etc.",
  "Laundry, telephone charges, room service",
  "Extra luxury at hotels, extra food, extra vehicle",
  "Entry fees",
  "Rides, ropeway charges",
  "Porterage, tips, puja charges",
  "Anything not mentioned in inclusions",
];

const specialities = [
  "Special care for kids & senior citizens",
  "Homely atmosphere throughout the tour",
  "Comfort first — always",
  "Quality assurance on every service",
  "Assistance to the best of our ability",
];

export default function ItineraryPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        padding: "140px 5% 5rem",
        textAlign: "center",
        color: "white",
      }}>
        <span style={{ fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "1rem" }}>
          9 Days · 8 Nights
        </span>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, marginBottom: "1rem", lineHeight: 1.1 }}>
          Nepal with <em style={{ fontStyle: "italic", color: "#60a5fa" }}>Muktinath Darshan</em>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", marginBottom: "2.5rem" }}>
          Raxaul · Pokhara · Jomsom · Muktinath · Kathmandu · Bhaktapur · Nagarkot
        </p>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {[
            ["Departure", "06 Nov 2026"],
            ["Duration", "9 Days / 8 Nights"],
            ["Package Cost", "₹22,000 / person"],
          ].map(([label, value]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.3rem" }}>{label}</p>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", color: "white", fontWeight: 400 }}>{value}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:simanaperiyet@gmail.com" style={{ background: "#3b82f6", color: "white", padding: "0.85rem 2.5rem", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2 }}>
            Book This Tour
          </a>
          <a href="tel:+919903149484" style={{ background: "rgba(255,255,255,0.08)", color: "white", padding: "0.85rem 2.5rem", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2, border: "1px solid rgba(255,255,255,0.15)" }}>
            Call +91 99031 49484
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 5% 6rem" }}>

        {/* Day-by-day timeline */}
        <div style={{ marginBottom: "5rem" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 300, color: "#0f172a", marginBottom: "3rem", textAlign: "center" }}>
            Day-by-Day <em style={{ fontStyle: "italic", color: "var(--sky)" }}>Itinerary</em>
          </h2>

          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: 28, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #e2e8f0, #e2e8f0)", display: "none" }} />

            {days.map((d, i) => (
              <div key={i} style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", alignItems: "flex-start" }}>
                {/* Day badge */}
                <div style={{ flexShrink: 0, width: 56, height: 56, borderRadius: "50%", background: "var(--sky)", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                  <span style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1 }}>{d.day}</span>
                  <span style={{ opacity: 0.8 }}>Day</span>
                </div>
                {/* Content */}
                <div style={{ flex: 1, background: "white", border: "1px solid #e2e8f0", borderRadius: 4, padding: "1.25rem 1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                  <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.25rem", fontWeight: 600, color: "#0f172a", marginBottom: "0.4rem" }}>{d.title}</h3>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.8 }}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
          {/* Inclusions */}
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 4, padding: "2rem" }}>
            <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", color: "#15803d", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              ✅ What&apos;s Included
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {inclusions.map((item, i) => (
                <li key={i} style={{ fontSize: "0.875rem", color: "#166534", display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                  <span style={{ color: "#16a34a", flexShrink: 0, marginTop: 1 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div style={{ background: "#fff7f7", border: "1px solid #fecaca", borderRadius: 4, padding: "2rem" }}>
            <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", color: "#b91c1c", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              ❌ Not Included
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {exclusions.map((item, i) => (
                <li key={i} style={{ fontSize: "0.875rem", color: "#991b1b", display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, marginTop: 1 }}>✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Specialities */}
        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 4, padding: "2rem", marginBottom: "3rem" }}>
          <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", color: "#1d4ed8", marginBottom: "1.25rem" }}>
            🔷 Our Speciality
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {specialities.map((item, i) => (
              <span key={i} style={{ background: "white", border: "1px solid #bfdbfe", color: "#1e40af", fontSize: "0.82rem", padding: "0.4rem 1rem", borderRadius: 20, fontWeight: 500 }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Note */}
        <div style={{ background: "#fefce8", border: "1px solid #fef08a", borderRadius: 4, padding: "1.25rem 1.5rem", marginBottom: "3rem", fontSize: "0.85rem", color: "#854d0e" }}>
          <strong>Note:</strong> Itinerary may be altered under specified circumstances. Our team will keep you informed of any changes.
        </div>

        {/* Legal & Contact */}
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 4, padding: "2rem", display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "0.3rem" }}>📞 +91 99031 49484 &nbsp;/&nbsp; +91 70038 56019 &nbsp;/&nbsp; +91 98304 03095</p>
            <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "0.3rem" }}>📧 simanaperiyet@gmail.com</p>
            <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.5rem" }}>MSME: UDYAM-WB-10-0185262 &nbsp;|&nbsp; GST: 19AORPA8912NIZA &nbsp;|&nbsp; CE No: 0046 1710 2116</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a href="mailto:simanaperiyet@gmail.com" style={{ background: "var(--sky)", color: "white", padding: "0.8rem 2rem", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2 }}>
              Book Now
            </a>
            <Link href="/#destinations" style={{ background: "transparent", color: "#0f172a", padding: "0.8rem 2rem", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid #e2e8f0", textDecoration: "none", borderRadius: 2 }}>
              All Tours
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
