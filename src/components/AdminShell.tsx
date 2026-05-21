"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function AdminShell({ name, children }: { name: string; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { href: "/admin/plans", label: "Travel Plans" },
    { href: "/admin/orders", label: "Orders" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "var(--font-inter), sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: "#0f172a", borderRight: "1px solid rgba(14,165,233,0.15)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "1.5rem 1.5rem 1rem" }}>
          <Link href="/" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 600, color: "white", textDecoration: "none" }}>
            Simana<span style={{ color: "var(--sky)" }}> Periye</span>
          </Link>
          <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", marginTop: "0.2rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Admin</p>
        </div>

        <nav style={{ flex: 1, padding: "0.5rem 0.75rem" }}>
          {navItems.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link key={href} href={href} style={{ display: "block", padding: "0.65rem 0.75rem", fontSize: "0.85rem", color: active ? "var(--sky-light)" : "rgba(255,255,255,0.5)", textDecoration: "none", background: active ? "rgba(14,165,233,0.1)" : "transparent", borderLeft: active ? "2px solid var(--sky)" : "2px solid transparent", marginBottom: "0.2rem", transition: "all 0.2s", borderRadius: "0 2px 2px 0" }}>
                {label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.6rem" }}>{name}</p>
          <button onClick={logout} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", padding: "0.5rem 1rem", fontSize: "0.78rem", cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase", width: "100%", fontFamily: "inherit" }}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: "auto", padding: "2.5rem 3rem", background: "#f8fafc" }}>
        {children}
      </main>
    </div>
  );
}
