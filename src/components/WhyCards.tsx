"use client";

const features = [
  ["🌍", "Worldwide Destinations", "180+ curated destinations across 6 continents, from iconic landmarks to hidden gems."],
  ["🛡️", "Safe & Secure", "24/7 support, comprehensive travel insurance, and real-time safety monitoring."],
  ["✨", "Premium Experience", "Handpicked luxury stays and exclusive access that money can't usually buy."],
  ["⚡", "Easy Booking", "Book your dream trip in minutes with flexible payment and free cancellation."],
];

export default function WhyCards() {
  return (
    <div className="why-grid">
      {features.map(([icon, title, desc]) => (
        <div
          key={title}
          style={{ background: "white", padding: "3rem 2.2rem", border: "1px solid rgba(0,0,0,0.08)", borderBottom: "2px solid transparent", borderRadius: 4, transition: "all 0.3s", cursor: "default" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--sky)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "1.2rem" }}>{icon}</div>
          <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 400, marginBottom: "0.8rem", color: "var(--text)" }}>{title}</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.8 }}>{desc}</p>
        </div>
      ))}
    </div>
  );
}
