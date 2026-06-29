"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const pathname = usePathname();

  // On non-homepage pages, always show solid navbar (no transparent hero mode)
  const isHomepage = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > 50) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHero = isHomepage && !scrolled && !menuOpen;
  const linkColor = onHero ? "rgba(255,255,255,0.85)" : "rgba(15,23,42,0.7)";
  const linkHover = onHero ? "#ffffff" : "#0f172a";

  // Hash links prefixed with / so they work from any page
  const navLinks: [string, string][] = [
    ["Destinations", "/#destinations"],
    ["Gallery", "/gallery"],
    ["Itinerary", "/itinerary"],
    ["About", "/about"],
    ["Contact", "/#contact"],
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: 80,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5%",
        transition: "background 0.4s, box-shadow 0.4s",
        background: !onHero || menuOpen ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: !onHero || menuOpen ? "blur(20px)" : "none",
        boxShadow: !onHero ? "0 1px 0 rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.06)" : "none",
      }}>
        <Link href="/about" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <div style={{
            background: onHero ? "rgba(255,255,255,0.92)" : "transparent",
            borderRadius: onHero ? 8 : 0,
            padding: onHero ? "3px 10px" : 0,
            transition: "all 0.4s",
            backdropFilter: onHero ? "blur(8px)" : "none",
          }}>
            <img
              src="/logo.jpeg"
              alt="Simana Periye"
              style={{ height: 52, width: "auto", display: "block" }}
            />
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="nav-desktop">
          {navLinks.map(([label, href]) => (
            <a key={label} href={href}
              style={{ color: linkColor, textDecoration: "none", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
              onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
            >{label}</a>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          {/* Cart */}
          <button onClick={() => setDrawerOpen(true)}
            style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: onHero ? "white" : "#0f172a", padding: 0, transition: "color 0.4s" }}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {count > 0 && (
              <span style={{ position: "absolute", top: -8, right: -8, background: "var(--sky)", color: "white", fontSize: "0.65rem", fontWeight: 700, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {count}
              </span>
            )}
          </button>

          {/* Desktop Book Now */}
          <Link href="/checkout" className="nav-book-btn"
            style={{ background: "var(--sky)", color: "white", padding: "0.5rem 1.4rem", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2 }}
          >Book Now</Link>

          {/* Hamburger */}
          <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: onHero ? "white" : "#0f172a", padding: 4, transition: "color 0.4s" }}>
            {menuOpen
              ? <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          position: "fixed", top: 80, left: 0, right: 0, zIndex: 999,
          background: "white", borderBottom: "1px solid #e5e7eb",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)", paddingBottom: "1.25rem",
        }}>
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}
              style={{ display: "block", padding: "0.9rem 5%", color: "rgba(15,23,42,0.75)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: "1px solid rgba(0,0,0,0.04)" }}
            >{label}</a>
          ))}
          <div style={{ padding: "1rem 5% 0" }}>
            <Link href="/checkout" onClick={() => setMenuOpen(false)}
              style={{ display: "block", textAlign: "center", background: "var(--sky)", color: "white", padding: "0.8rem", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2 }}>
              Book Now
            </Link>
          </div>
        </div>
      )}

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
