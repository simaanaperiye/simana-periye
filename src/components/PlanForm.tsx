"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TravelPlan } from "@prisma/client";

interface Props {
  plan?: TravelPlan;
  mode: "create" | "edit";
}

export default function PlanForm({ plan, mode }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inclusions: string[] = plan ? JSON.parse(plan.inclusions || "[]") : [];
  const [inclusionList, setInclusionList] = useState<string[]>(inclusions);
  const [newInclusion, setNewInclusion] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);

    const body = {
      title: fd.get("title"),
      destination: fd.get("destination"),
      region: fd.get("region"),
      description: fd.get("description"),
      longDesc: fd.get("longDesc"),
      price: fd.get("price"),
      duration: fd.get("duration"),
      maxPeople: fd.get("maxPeople"),
      imageUrl: fd.get("imageUrl"),
      badge: fd.get("badge") || null,
      inclusions: inclusionList,
      departureDate: fd.get("departureDate") || null,
      isActive: fd.get("isActive") === "on",
    };

    const url = mode === "edit" ? `/api/plans/${plan!.id}` : "/api/plans";
    const method = mode === "edit" ? "PUT" : "POST";

    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) {
      router.push("/admin/plans");
      router.refresh();
    } else {
      const d = await res.json();
      setError(d.error || "Failed to save");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
      <div style={{ gridColumn: "span 2" }}>
        <label style={labelStyle}>Plan Title *</label>
        <input name="title" required defaultValue={plan?.title} style={inputStyle} placeholder="e.g. Kashmir Valley Splendour" />
      </div>

      <div>
        <label style={labelStyle}>Destination *</label>
        <input name="destination" required defaultValue={plan?.destination} style={inputStyle} placeholder="e.g. Kashmir" />
      </div>

      <div>
        <label style={labelStyle}>Region *</label>
        <input name="region" required defaultValue={plan?.region} style={inputStyle} placeholder="e.g. India" />
      </div>

      <div>
        <label style={labelStyle}>Price (₹) *</label>
        <input name="price" type="number" required defaultValue={plan?.price} style={inputStyle} placeholder="45000" />
      </div>

      <div>
        <label style={labelStyle}>Duration (Days) *</label>
        <input name="duration" type="number" required defaultValue={plan?.duration} style={inputStyle} placeholder="7" />
      </div>

      <div>
        <label style={labelStyle}>Max People</label>
        <input name="maxPeople" type="number" defaultValue={plan?.maxPeople ?? 20} style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle}>Departure Date</label>
        <input name="departureDate" type="date" defaultValue={plan?.departureDate ? new Date(plan.departureDate).toISOString().split("T")[0] : ""} style={inputStyle} />
      </div>

      <div style={{ gridColumn: "span 2" }}>
        <label style={labelStyle}>Image URL *</label>
        <input name="imageUrl" required defaultValue={plan?.imageUrl} style={inputStyle} placeholder="https://images.unsplash.com/..." />
      </div>

      <div style={{ gridColumn: "span 2" }}>
        <label style={labelStyle}>Short Description *</label>
        <textarea name="description" required defaultValue={plan?.description} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      <div style={{ gridColumn: "span 2" }}>
        <label style={labelStyle}>Full Description</label>
        <textarea name="longDesc" defaultValue={plan?.longDesc || ""} rows={4} style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      <div>
        <label style={labelStyle}>Badge (optional)</label>
        <input name="badge" defaultValue={plan?.badge || ""} style={inputStyle} placeholder="e.g. Bestseller, New" />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", paddingTop: "1.5rem" }}>
        <input type="checkbox" id="isActive" name="isActive" defaultChecked={plan?.isActive ?? true} style={{ width: 16, height: 16, accentColor: "var(--sky)" }} />
        <label htmlFor="isActive" style={{ fontSize: "0.85rem", color: "var(--text-muted)", cursor: "pointer" }}>Active (visible to customers)</label>
      </div>

      {/* Inclusions */}
      <div style={{ gridColumn: "span 2" }}>
        <label style={labelStyle}>What&apos;s Included</label>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.4rem", marginBottom: "0.6rem" }}>
          <input value={newInclusion} onChange={(e) => setNewInclusion(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (newInclusion.trim()) { setInclusionList((p) => [...p, newInclusion.trim()]); setNewInclusion(""); } } }} style={{ ...inputStyle, marginTop: 0, flex: 1 }} placeholder="Add an inclusion and press Enter" />
          <button type="button" onClick={() => { if (newInclusion.trim()) { setInclusionList((p) => [...p, newInclusion.trim()]); setNewInclusion(""); } }} style={{ background: "var(--sky)", border: "none", color: "white", padding: "0 1rem", fontSize: "1.2rem", cursor: "pointer", borderRadius: 2 }}>+</button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {inclusionList.map((item, i) => (
            <span key={i} style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)", color: "var(--sky-dark)", padding: "0.3rem 0.75rem", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.4rem", borderRadius: 20 }}>
              {item}
              <button type="button" onClick={() => setInclusionList((p) => p.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "1rem", lineHeight: 1 }}>×</button>
            </span>
          ))}
        </div>
      </div>

      {error && <p style={{ gridColumn: "span 2", color: "#dc2626", fontSize: "0.85rem" }}>{error}</p>}

      <div style={{ gridColumn: "span 2", display: "flex", gap: "1rem" }}>
        <button type="submit" disabled={loading} style={{ background: "var(--sky)", color: "white", border: "none", padding: "0.85rem 2rem", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", borderRadius: 2 }}>
          {loading ? "Saving…" : mode === "edit" ? "Save Changes" : "Create Plan"}
        </button>
        <button type="button" onClick={() => router.back()} style={{ background: "none", border: "1px solid rgba(14,165,233,0.25)", color: "var(--text-muted)", padding: "0.85rem 2rem", fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit", borderRadius: 2 }}>
          Cancel
        </button>
      </div>
    </form>
  );
}

const inputStyle: React.CSSProperties = { width: "100%", background: "#f8fafc", border: "1px solid rgba(14,165,233,0.2)", color: "var(--text)", padding: "0.75rem 1rem", fontSize: "0.9rem", outline: "none", marginTop: "0.3rem", fontFamily: "inherit", borderRadius: 2 };
const labelStyle: React.CSSProperties = { fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", display: "block" };
