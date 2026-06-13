import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", padding: "120px 5% 6rem", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748b", display: "block", marginBottom: "0.75rem" }}>
            Our Journeys
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, color: "#0f172a", marginBottom: "1rem" }}>
            Travel <em style={{ fontStyle: "italic", color: "var(--sky)" }}>Gallery</em>
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.95rem", maxWidth: 560, margin: "0 auto 1.5rem" }}>
            Real moments from our tours — Nepal, Pokhara, Kathmandu, Chitwan and beyond.
          </p>
          <div style={{ width: 40, height: 2, background: "var(--sky)", margin: "0 auto", borderRadius: 1 }} />
        </div>
        <Gallery />
      </div>
    </>
  );
}
