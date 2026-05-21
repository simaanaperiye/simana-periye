"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";

interface Props { open: boolean; onClose: () => void; }

export default function CartDrawer({ open, onClose }: Props) {
  const { items, remove, update, total } = useCart();

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1999 }} />

      {/* Panel */}
      <div className="cart-panel" style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px, 100vw)",
        background: "var(--dark2)", zIndex: 2000,
        borderLeft: "1px solid rgba(201,169,110,0.15)",
        display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 400 }}>Your Cart</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "1.4rem", lineHeight: 1 }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.35)", marginTop: "4rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✈️</div>
              <p>Your cart is empty.</p>
              <button onClick={onClose} style={{ marginTop: "1rem", background: "none", border: "none", color: "var(--gold)", cursor: "pointer", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Browse Destinations →</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.planId} style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <img src={item.imageUrl} alt={item.title} style={{ width: 70, height: 70, objectFit: "cover", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, fontSize: "0.9rem", marginBottom: "0.2rem" }}>{item.title}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--gold)", marginBottom: "0.6rem" }}>{item.destination} · {item.duration}D</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <button onClick={() => update(item.planId, item.quantity - 1)} style={qBtnStyle}>−</button>
                    <span style={{ fontSize: "0.9rem", minWidth: "1.2rem", textAlign: "center" }}>{item.quantity}</span>
                    <button onClick={() => update(item.planId, item.quantity + 1)} style={qBtnStyle}>+</button>
                    <button onClick={() => remove(item.planId)} style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontSize: "0.75rem" }}>Remove</button>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ color: "var(--gold)", fontWeight: 600, fontSize: "0.95rem" }}>₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.2rem" }}>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>Total</span>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", color: "var(--gold)" }}>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <Link href="/checkout" onClick={onClose} style={{
              display: "block", textAlign: "center", background: "var(--gold)", color: "#0d0d0d",
              padding: "0.9rem", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.1em",
              textTransform: "uppercase", textDecoration: "none",
            }}>Proceed to Checkout</Link>
          </div>
        )}
      </div>
    </>
  );
}

const qBtnStyle: React.CSSProperties = {
  width: 26, height: 26, border: "1px solid rgba(255,255,255,0.15)", background: "none",
  color: "white", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center",
};
