"use client";
import Navbar from "@/components/Navbar";
import { useCart } from "@/components/CartProvider";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customerName: name, customerEmail: email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to place booking");

      window.location.href = "/checkout/success";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", padding: "120px 5% 6rem", maxWidth: 960, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, marginBottom: "0.5rem", color: "var(--text)" }}>
          Confirm Your <em style={{ fontStyle: "italic", color: "var(--sky)" }}>Booking</em>
        </h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "3rem", fontSize: "0.9rem" }}>Review your trip selection and submit your booking request.</p>

        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 0" }}>
            <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Your cart is empty.</p>
            <Link href="/#destinations" style={{ background: "var(--sky)", color: "white", padding: "0.9rem 2.5rem", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2 }}>Browse Destinations</Link>
          </div>
        ) : (
          <div className="checkout-grid">
            {/* Form */}
            <form onSubmit={handleCheckout} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ background: "white", padding: "2rem", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 4 }}>
                <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", marginBottom: "1.5rem", color: "var(--text)" }}>Contact Details</h3>
                <div className="form-2col">
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input required value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} placeholder="Your full name" />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} placeholder="you@example.com" />
                  </div>
                </div>
              </div>

              <div style={{ background: "white", padding: "2rem", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 4 }}>
                <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", marginBottom: "1.5rem", color: "var(--text)" }}>Your Trips</h3>
                {items.map((item) => (
                  <div key={item.planId} style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid rgba(14,165,233,0.1)" }}>
                    <img src={item.imageUrl} alt={item.title} style={{ width: 70, height: 55, objectFit: "cover", borderRadius: 2 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 500, fontSize: "0.9rem", color: "var(--text)" }}>{item.title}</p>
                      <p style={{ fontSize: "0.78rem", color: "var(--sky)" }}>{item.destination} · {item.duration}D · ×{item.quantity}</p>
                    </div>
                    <p style={{ color: "var(--sky-dark)", fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>

              {error && <p style={{ color: "#dc2626", fontSize: "0.88rem", padding: "0.8rem", background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)", borderRadius: 4 }}>{error}</p>}

              <div style={{ background: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.15)", padding: "1rem 1.5rem", fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", gap: "0.6rem", alignItems: "flex-start", borderRadius: 4 }}>
                <span style={{ color: "var(--sky)", fontSize: "1rem" }}>✉️</span>
                Our travel experts will contact you within 24 hours to confirm your booking and arrange payment.
              </div>

              <button type="submit" disabled={loading} style={{ background: loading ? "var(--sky-dark)" : "var(--sky)", color: "white", border: "none", padding: "1rem 2.5rem", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.3s", fontFamily: "inherit", borderRadius: 2 }}>
                {loading ? "Confirming Booking…" : `Request Booking — ₹${total.toLocaleString("en-IN")}`}
              </button>
            </form>

            {/* Summary sidebar */}
            <div className="sticky-sidebar" style={{ background: "white", border: "1px solid rgba(0,0,0,0.1)", padding: "2rem", borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 400, marginBottom: "1.5rem", color: "var(--text)" }}>Booking Summary</h3>
              {items.map((item) => (
                <div key={item.planId} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.7rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  <span style={{ maxWidth: "65%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title} ×{item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(14,165,233,0.12)", marginTop: "1rem", paddingTop: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                  <span>Subtotal</span><span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                  <span>Taxes &amp; Fees</span><span>Included</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                  <span style={{ color: "var(--text)" }}>Total</span>
                  <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", color: "var(--sky-dark)" }}>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1.2rem", lineHeight: 1.7 }}>
                By submitting this request you agree to our Terms of Service and Cancellation Policy.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const inputStyle: React.CSSProperties = { width: "100%", background: "#f8fafc", border: "1px solid rgba(14,165,233,0.2)", color: "var(--text)", padding: "0.75rem 1rem", fontSize: "0.9rem", outline: "none", marginTop: "0.4rem", fontFamily: "inherit", borderRadius: 2 };
const labelStyle: React.CSSProperties = { fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", display: "block" };
