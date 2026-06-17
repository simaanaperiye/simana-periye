"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "#f0f9ff" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "0.4rem" }}>
            <img src="/logo.jpeg" alt="Simana Periye" style={{ height: 72, width: "auto" }} />
          </Link>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: "white", border: "1px solid rgba(14,165,233,0.2)", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.2rem", borderRadius: 4, boxShadow: "0 4px 20px rgba(14,165,233,0.08)" }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required style={inputStyle} placeholder="••••••••" />
          </div>
          {error && <p style={{ color: "#dc2626", fontSize: "0.85rem" }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ background: "var(--sky)", color: "white", border: "none", padding: "0.9rem", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", borderRadius: 2 }}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>Default: admin@simanaperiye.travel / admin123</p>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = { width: "100%", background: "#f8fafc", border: "1px solid rgba(14,165,233,0.2)", color: "var(--text)", padding: "0.75rem 1rem", fontSize: "0.9rem", outline: "none", marginTop: "0.3rem", fontFamily: "inherit", borderRadius: 2 };
const labelStyle: React.CSSProperties = { fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", display: "block" };
