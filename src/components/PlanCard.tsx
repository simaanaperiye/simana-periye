"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { useState } from "react";
import type { TravelPlan } from "@prisma/client";

// Plans that have a dedicated itinerary section
const itineraryMap: Record<string, string> = {
  "plan-kashmir":   "/itinerary#kashmir",
  "plan-muktinath": "/itinerary#muktinath",
  "plan-keonjhar":  "/itinerary#keonjhar",
};

export default function PlanCard({ plan }: { plan: TravelPlan }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    add({ planId: plan.id, title: plan.title, destination: plan.destination, imageUrl: plan.imageUrl, price: plan.price, duration: plan.duration });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const itineraryHref = itineraryMap[plan.id];

  return (
    <div style={{ position: "relative", overflow: "hidden", cursor: "pointer", height: 300, borderRadius: 4 }}
      onMouseEnter={(e) => { (e.currentTarget.querySelector(".dest-img") as HTMLElement).style.transform = "scale(1.08)"; (e.currentTarget.querySelector(".dest-meta") as HTMLElement).style.opacity = "1"; (e.currentTarget.querySelector(".dest-meta") as HTMLElement).style.transform = "translateY(0)"; }}
      onMouseLeave={(e) => { (e.currentTarget.querySelector(".dest-img") as HTMLElement).style.transform = "scale(1)"; (e.currentTarget.querySelector(".dest-meta") as HTMLElement).style.opacity = "0"; (e.currentTarget.querySelector(".dest-meta") as HTMLElement).style.transform = "translateY(10px)"; }}
    >
      <img className="dest-img" src={plan.imageUrl} alt={plan.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }} />

      {plan.badge && (
        <span style={{ position: "absolute", top: "1.2rem", right: "1.2rem", background: "var(--sky)", color: "white", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.35rem 0.75rem", borderRadius: 2 }}>
          {plan.badge}
        </span>
      )}

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.6rem" }}>
        <div style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sky-light)", marginBottom: "0.3rem" }}>{plan.region}</div>
        <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.55rem", fontWeight: 400, color: "white", lineHeight: 1.1 }}>{plan.title}</div>
        <div className="dest-meta" style={{ opacity: 0, transform: "translateY(10px)", transition: "all 0.4s 0.1s", display: "flex", gap: "1rem", marginTop: "0.8rem", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>{plan.duration} Days · Up to {plan.maxPeople} people</div>
            <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", color: "var(--sky-light)", marginTop: "0.2rem" }}>
              ₹{plan.price.toLocaleString("en-IN")}<span style={{ fontSize: "0.75rem", fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>/person</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {itineraryHref && (
              <a href={itineraryHref} style={{ background: "rgba(58,173,168,0.25)", border: "1px solid rgba(58,173,168,0.6)", color: "white", padding: "0.45rem 0.9rem", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", backdropFilter: "blur(4px)", borderRadius: 2 }}>
                Itinerary
              </a>
            )}
            <Link href={`/plans/${plan.id}`} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "0.45rem 0.9rem", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", backdropFilter: "blur(4px)", borderRadius: 2 }}>
              View
            </Link>
            <button onClick={handleAdd} style={{ background: added ? "var(--sky-dark)" : "var(--sky)", border: "none", color: "white", padding: "0.45rem 0.9rem", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit", borderRadius: 2 }}>
              {added ? "✓" : "+ Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
