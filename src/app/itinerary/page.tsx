import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function ItineraryPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 5% 6rem", textAlign: "center" }}>
        <div style={{ maxWidth: 540 }}>
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748b", display: "block", marginBottom: "0.75rem" }}>
            Detailed Plans
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, color: "#0f172a", marginBottom: "1rem" }}>
            Trip <em style={{ fontStyle: "italic", color: "var(--sky)" }}>Itineraries</em>
          </h1>
          <p style={{ color: "#64748b", lineHeight: 1.8, marginBottom: "2.5rem", fontSize: "0.95rem" }}>
            Day-by-day itineraries for all our tours are coming soon. In the meantime, reach out to us and our travel experts will share a detailed plan tailored just for you.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:simanaperiyet@gmail.com" style={{ background: "var(--sky)", color: "white", padding: "0.9rem 2.5rem", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2 }}>
              Email Us
            </a>
            <Link href="/#destinations" style={{ background: "transparent", color: "#0f172a", padding: "0.9rem 2.5rem", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid rgba(0,0,0,0.2)", textDecoration: "none", borderRadius: 2 }}>
              View Destinations
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
