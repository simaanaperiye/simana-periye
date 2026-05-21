"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          height: 80,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 5%",
          transition: "background 0.4s, box-shadow 0.4s",
          background: scrolled ? "rgba(13,13,13,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(201,169,110,0.15)" : "none",
        }}
      >
        <Link href="/" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.7rem", fontWeight: 600, letterSpacing: "0.04em", color: "white", textDecoration: "none" }}>
          Simana<span style={{ color: "var(--gold)" }}> Periye</span>
        </Link>

        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {[["Destinations", "#destinations"], ["Experiences", "#experiences"], ["About", "#about"], ["Contact", "#contact"]].map(([label, href]) => (
            <a key={label} href={href}
              style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
            >{label}</a>
          ))}

          {/* Cart button */}
          <button
            onClick={() => setDrawerOpen(true)}
            style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: "white", padding: 0 }}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {count > 0 && (
              <span style={{ position: "absolute", top: -8, right: -8, background: "var(--gold)", color: "#0d0d0d", fontSize: "0.65rem", fontWeight: 700, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {count}
              </span>
            )}
          </button>

          <Link href="/checkout" style={{ background: "transparent", border: "1px solid var(--gold)", color: "var(--gold)", padding: "0.5rem 1.4rem", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "#0d0d0d"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
          >Book Now</Link>
        </div>
      </nav>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
