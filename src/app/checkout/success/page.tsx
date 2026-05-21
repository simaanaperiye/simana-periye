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
          <div style={{ width: 80, height: 80, borderRadius: "50%", border: "2px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", margin: "0 auto 2rem" }}>✓</div>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, marginBottom: "1rem" }}>
            Booking <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Confirmed!</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "2.5rem", fontSize: "0.95rem" }}>
            Thank you for booking with Simana Periye. A confirmation email has been sent with your itinerary details. Our travel experts will be in touch within 24 hours.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" style={{ background: "var(--gold)", color: "#0d0d0d", padding: "0.9rem 2.5rem", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Back to Home</Link>
            <Link href="/#destinations" style={{ background: "transparent", color: "white", padding: "0.9rem 2.5rem", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.3)", textDecoration: "none" }}>Explore More</Link>
          </div>
        </div>
      </div>
    </>
  );
}
