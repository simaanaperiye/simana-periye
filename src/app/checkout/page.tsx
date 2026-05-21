"use client";
import Navbar from "@/components/Navbar";
import { useCart } from "@/components/CartProvider";
import Link from "next/link";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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
      if (!res.ok) throw new Error(data.error || "Failed to create checkout session");

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe not loaded");
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", padding: "120px 5% 6rem", maxWidth: 960, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, marginBottom: "0.5rem" }}>
          Secure <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Checkout</em>
        </h1>
        <p style={{ color: "#888", marginBottom: "3rem", fontSize: "0.9rem" }}>Review your booking and complete payment via Stripe.</p>

        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 0" }}>
            <p style={{ color: "#888", marginBottom: "2rem" }}>Your cart is empty.</p>
            <Link href="/#destinations" style={{ background: "var(--gold)", color: "#0d0d0d", padding: "0.9rem 2.5rem", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Browse Destinations</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "3rem", alignItems: "start" }}>
            {/* Form */}
            <form onSubmit={handleCheckout} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ background: "var(--dark3)", padding: "2rem", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", marginBottom: "1.5rem" }}>Contact Details</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
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

              <div style={{ background: "var(--dark3)", padding: "2rem", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", marginBottom: "1.5rem" }}>Your Trips</h3>
                {items.map((item) => (
                  <div key={item.planId} style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <img src={item.imageUrl} alt={item.title} style={{ width: 70, height: 55, objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 500, fontSize: "0.9rem" }}>{item.title}</p>
                      <p style={{ fontSize: "0.78rem", color: "var(--gold)" }}>{item.destination} · {item.duration}D · ×{item.quantity}</p>
                    </div>
                    <p style={{ color: "var(--gold)", fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>

              {error && <p style={{ color: "#f87171", fontSize: "0.88rem", padding: "0.8rem", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>{error}</p>}

              <div style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)", padding: "1rem 1.5rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--gold)", fontSize: "1rem" }}>🔒</span>
                Payment is processed securely by Stripe. We never store your card details.
              </div>

              <button type="submit" disabled={loading} style={{ background: loading ? "var(--gold-dark)" : "var(--gold)", color: "#0d0d0d", border: "none", padding: "1rem 2.5rem", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.3s", fontFamily: "inherit" }}>
                {loading ? "Redirecting to Stripe…" : `Pay ₹${total.toLocaleString("en-IN")} Securely`}
              </button>
            </form>

            {/* Summary sidebar */}
            <div style={{ background: "var(--dark3)", border: "1px solid rgba(201,169,110,0.15)", padding: "2rem", position: "sticky", top: 100 }}>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 400, marginBottom: "1.5rem" }}>Order Summary</h3>
              {items.map((item) => (
                <div key={item.planId} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.7rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
                  <span style={{ maxWidth: "65%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title} ×{item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "1rem", paddingTop: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#888", marginBottom: "0.5rem" }}>
                  <span>Subtotal</span><span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#888", marginBottom: "1rem" }}>
                  <span>Taxes &amp; Fees</span><span>Included</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                  <span>Total</span>
                  <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", color: "var(--gold)" }}>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#666", marginTop: "1.2rem", lineHeight: 1.7 }}>
                By completing your purchase you agree to our Terms of Service and Cancellation Policy.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const inputStyle: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", padding: "0.75rem 1rem", fontSize: "0.9rem", outline: "none", marginTop: "0.4rem", fontFamily: "inherit" };
const labelStyle: React.CSSProperties = { fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block" };
