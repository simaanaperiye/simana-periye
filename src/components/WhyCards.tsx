"use client";

const features = [
  ["🌍", "Worldwide Destinations", "180+ curated destinations across 6 continents, from iconic landmarks to hidden gems."],
  ["🛡️", "Safe & Secure", "24/7 support, comprehensive travel insurance, and real-time safety monitoring."],
  ["✨", "Premium Experience", "Handpicked luxury stays and exclusive access that money can't usually buy."],
  ["⚡", "Easy Booking", "Book your dream trip in minutes with flexible payment and free cancellation."],
];

export default function WhyCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }}>
      {features.map(([icon, title, desc]) => (
        <div
          key={title}
          style={{ background: "var(--dark3)", padding: "3rem 2.2rem", borderBottom: "2px solid transparent", transition: "all 0.3s", cursor: "default" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--gold)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "1.2rem" }}>{icon}</div>
          <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 400, marginBottom: "0.8rem", color: "white" }}>{title}</h3>
          <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.8 }}>{desc}</p>
        </div>
      ))}
    </div>
  );
}
