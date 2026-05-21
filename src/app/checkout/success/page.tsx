"use client";
import { useEffect } from "react";
import { useCart } from "@/components/CartProvider";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function SuccessPage() {
  const { clear } = useCart();

  useEffect(() => { clear(); }, [clear]);

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 5%", textAlign: "center" }}>
        <div style={{ maxWidth: 540 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(14,165,233,0.08)", border: "2px solid var(--sky)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", margin: "0 auto 2rem", color: "var(--sky)" }}>✓</div>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, marginBottom: "1rem", color: "var(--text)" }}>
            Booking <em style={{ fontStyle: "italic", color: "var(--sky)" }}>Confirmed!</em>
          </h1>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2.5rem", fontSize: "0.95rem" }}>
            Thank you for booking with Simana Periye. A confirmation email has been sent with your itinerary details. Our travel experts will be in touch within 24 hours.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" style={{ background: "var(--sky)", color: "white", padding: "0.9rem 2.5rem", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2 }}>Back to Home</Link>
            <Link href="/#destinations" style={{ background: "transparent", color: "var(--sky-dark)", padding: "0.9rem 2.5rem", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid rgba(14,165,233,0.35)", textDecoration: "none", borderRadius: 2 }}>Explore More</Link>
          </div>
        </div>
      </div>
    </>
  );
}
