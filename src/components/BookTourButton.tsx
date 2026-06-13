"use client";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { useRouter } from "next/navigation";

interface Props {
  planId: string;
  title: string;
  destination: string;
  imageUrl: string;
  price: number;
  duration: number;
}

export default function BookTourButton({ planId, title, destination, imageUrl, price, duration }: Props) {
  const { add, update, items } = useCart();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [people, setPeople] = useState(1);

  const handleConfirm = () => {
    const existing = items.find(i => i.planId === planId);
    if (existing) {
      update(planId, people);
    } else {
      add({ planId, title, destination, imageUrl, price, duration });
      if (people > 1) update(planId, people);
    }
    setOpen(false);
    router.push("/cart");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ background: "#3b82f6", color: "white", padding: "0.85rem 2.5rem", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2, border: "none", cursor: "pointer", fontFamily: "inherit" }}
      >
        Book This Tour
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: "white", borderRadius: 6, padding: "2.5rem", maxWidth: 420, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
          >
            {/* Header */}
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.8rem", fontWeight: 300, color: "#0f172a", marginBottom: "0.3rem" }}>
              How many <em style={{ fontStyle: "italic", color: "var(--sky)" }}>travellers?</em>
            </h2>
            <p style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: "2rem" }}>{title}</p>

            {/* People selector */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginBottom: "2rem" }}>
              <button
                onClick={() => setPeople(p => Math.max(1, p - 1))}
                style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid #e2e8f0", background: "white", fontSize: "1.4rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f172a", transition: "all 0.2s" }}
              >−</button>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "3rem", fontWeight: 400, color: "#0f172a", lineHeight: 1 }}>{people}</span>
                <p style={{ fontSize: "0.72rem", color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.2rem" }}>
                  {people === 1 ? "Person" : "People"}
                </p>
              </div>
              <button
                onClick={() => setPeople(p => p + 1)}
                style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid #e2e8f0", background: "white", fontSize: "1.4rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f172a", transition: "all 0.2s" }}
              >+</button>
            </div>

            {/* Price breakdown */}
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 4, padding: "1rem 1.25rem", marginBottom: "1.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem", color: "#64748b", marginBottom: "0.5rem" }}>
                <span>₹{price.toLocaleString("en-IN")} × {people} {people === 1 ? "person" : "people"}</span>
                <span>₹{(price * people).toLocaleString("en-IN")}</span>
              </div>
              <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "0.6rem", display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                <span style={{ color: "#0f172a", fontSize: "0.88rem" }}>Total</span>
                <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", color: "var(--sky-dark)" }}>
                  ₹{(price * people).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => setOpen(false)}
                style={{ flex: 1, padding: "0.85rem", border: "1px solid #e2e8f0", background: "white", color: "#64748b", fontSize: "0.82rem", cursor: "pointer", borderRadius: 2, fontFamily: "inherit" }}
              >Cancel</button>
              <button
                onClick={handleConfirm}
                style={{ flex: 2, padding: "0.85rem", background: "var(--sky)", color: "white", border: "none", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, fontFamily: "inherit" }}
              >
                Add to Cart →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
