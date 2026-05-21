"use client";
import { useCart, CartItem } from "./CartProvider";
import { useState } from "react";

interface Props { plan: Omit<CartItem, "quantity">; }

export default function AddToCartButton({ plan }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(plan);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAdd}
      style={{
        background: added ? "var(--gold-dark)" : "var(--gold)",
        color: "#0d0d0d", border: "none", padding: "0.9rem 2rem",
        fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.12em",
        textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s",
        fontFamily: "var(--font-inter), sans-serif",
        width: "100%",
      }}
    >
      {added ? "✓ Added to Cart" : "Add to Cart"}
    </button>
  );
}
