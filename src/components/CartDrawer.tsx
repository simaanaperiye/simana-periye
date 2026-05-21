"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";

interface Props { open: boolean; onClose: () => void; }

export default function CartDrawer({ open, onClose }: Props) {
  const { items, remove, update, total } = useCart();

  if (!open) return null;

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)", zIndex: 1999 }} />

      <div className="cart-panel" style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px, 100vw)",
        background: "white", zIndex: 2000,
        borderLeft: "1px solid rgba(14,165,233,0.2)",
        display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem", borderBottom: "1px solid rgba(14,165,233,0.12)" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 400, color: "var(--text)" }}>Your Cart</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "1.4rem", lineHeight: 1 }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "4rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✈️</div>
              <p>Your cart is empty.</p>
              <button onClick={onClose} style={{ marginTop: "1rem", background: "none", border: "none", color: "var(--sky)", cursor: "pointer", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Browse Destinations →</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.planId} style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid rgba(14,165,233,0.1)" }}>
                <img src={item.imageUrl} alt={item.title} style={{ width: 70, height: 70, objectFit: "cover", flexShrink: 0, borderRadius: 2 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, fontSize: "0.9rem", marginBottom: "0.2rem", color: "var(--text)" }}>{item.title}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--sky)", marginBottom: "0.6rem" }}>{item.destination} · {item.duration}D</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <button onClick={() => update(item.planId, item.quantity - 1)} style={qBtnStyle}>−</button>
                    <span style={{ fontSize: "0.9rem", minWidth: "1.2rem", textAlign: "center", color: "var(--text)" }}>{item.quantity}</span>
                    <button onClick={() => update(item.planId, item.quantity + 1)} style={qBtnStyle}>+</button>
                    <button onClick={() => remove(item.planId)} style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.75rem" }}>Remove</button>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ color: "var(--sky-dark)", fontWeight: 600, fontSize: "0.95rem" }}>₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(14,165,233,0.12)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.2rem" }}>
              <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Total</span>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", color: "var(--sky-dark)" }}>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <Link href="/checkout" onClick={onClose} style={{
              display: "block", textAlign: "center", background: "var(--sky)", color: "white",
              padding: "0.9rem", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.1em",
              textTransform: "uppercase", textDecoration: "none", borderRadius: 2,
            }}>Proceed to Checkout</Link>
          </div>
        )}
      </div>
    </>
  );
}

const qBtnStyle: React.CSSProperties = {
  width: 26, height: 26, border: "1px solid rgba(14,165,233,0.25)", background: "none",
  color: "var(--text)", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center",
};
