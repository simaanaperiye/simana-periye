"use client";
import Navbar from "@/components/Navbar";
import { useCart } from "@/components/CartProvider";
import Link from "next/link";

export default function CartPage() {
  const { items, remove, update, total } = useCart();

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", padding: "120px 5% 6rem", maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, marginBottom: "0.5rem" }}>Your <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Cart</em></h1>
        <p style={{ color: "#888", marginBottom: "3rem", fontSize: "0.9rem" }}>{items.length === 0 ? "No items yet." : `${items.length} trip${items.length > 1 ? "s" : ""} selected`}</p>

        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 0" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>✈️</div>
            <p style={{ color: "#888", marginBottom: "2rem" }}>Your cart is empty. Find your next adventure.</p>
            <Link href="/#destinations" style={{ background: "var(--gold)", color: "#0d0d0d", padding: "0.9rem 2.5rem", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Browse Destinations</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "3rem", alignItems: "start" }}>
            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              {items.map((item) => (
                <div key={item.planId} style={{ display: "flex", gap: "1.5rem", background: "var(--dark3)", padding: "1.5rem" }}>
                  <img src={item.imageUrl} alt={item.title} style={{ width: 100, height: 80, objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 400, marginBottom: "0.2rem" }}>{item.title}</h3>
                    <p style={{ fontSize: "0.8rem", color: "var(--gold)", marginBottom: "1rem" }}>{item.destination} · {item.duration} Days</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                      <button onClick={() => update(item.planId, item.quantity - 1)} style={qBtn}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => update(item.planId, item.quantity + 1)} style={qBtn}>+</button>
                      <button onClick={() => remove(item.planId)} style={{ marginLeft: "auto", background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: "0.8rem", textDecoration: "underline" }}>Remove</button>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", color: "var(--gold)" }}>₹{(item.price * item.quantity).toLocaleString("en-IN")}</div>
                    <div style={{ fontSize: "0.75rem", color: "#888" }}>₹{item.price.toLocaleString("en-IN")} / person</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{ background: "var(--dark3)", border: "1px solid rgba(201,169,110,0.15)", padding: "2rem", position: "sticky", top: 100 }}>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 400, marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1rem" }}>Order Summary</h3>
              {items.map((item) => (
                <div key={item.planId} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
                  <span>{item.title} ×{item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "1rem", paddingTop: "1rem", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600 }}>Total</span>
                <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", color: "var(--gold)" }}>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <Link href="/checkout" style={{ display: "block", textAlign: "center", background: "var(--gold)", color: "#0d0d0d", padding: "0.9rem", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", marginTop: "1.5rem" }}>
                Proceed to Checkout →
              </Link>
              <Link href="/#destinations" style={{ display: "block", textAlign: "center", color: "#888", fontSize: "0.8rem", marginTop: "0.8rem", textDecoration: "none" }}>Continue Shopping</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const qBtn: React.CSSProperties = { width: 28, height: 28, border: "1px solid rgba(255,255,255,0.15)", background: "none", color: "white", cursor: "pointer", fontSize: "1rem" };
