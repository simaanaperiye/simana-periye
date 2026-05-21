"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@simanaperiye.travel");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      window.location.href = "/admin/plans";
    } else {
      const d = await res.json();
      setError(d.error || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "var(--dark)" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.2rem", fontWeight: 400, marginBottom: "0.4rem" }}>
            Wander<span style={{ color: "var(--gold)" }}>lust</span>
          </h1>
          <p style={{ color: "#888", fontSize: "0.85rem" }}>Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: "var(--dark3)", border: "1px solid rgba(201,169,110,0.15)", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required style={inputStyle} placeholder="••••••••" />
          </div>
          {error && <p style={{ color: "#f87171", fontSize: "0.85rem" }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ background: "var(--gold)", color: "#0d0d0d", border: "none", padding: "0.9rem", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
          <p style={{ fontSize: "0.75rem", color: "#666", textAlign: "center" }}>Default: admin@simanaperiye.travel / admin123</p>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", padding: "0.75rem 1rem", fontSize: "0.9rem", outline: "none", marginTop: "0.3rem", fontFamily: "inherit" };
const labelStyle: React.CSSProperties = { fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block" };
