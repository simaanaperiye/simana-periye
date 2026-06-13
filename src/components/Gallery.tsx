"use client";
import { useState, useCallback } from "react";

const albums = [
  {
    key: "all",
    label: "All Photos",
    folder: "",
    files: [
      ...["IMG-20260321-WA0040","IMG-20260321-WA0041","IMG-20260321-WA0042","IMG-20260321-WA0045"].map(f => `/gallery/chitwan/${f}.jpg`),
      ...["IMG-20260105-WA0015","IMG-20260105-WA0045","IMG-20260105-WA0046","IMG-20260105-WA0047","IMG-20260105-WA0048","IMG-20260105-WA0049","IMG-20260105-WA0050","IMG-20260105-WA0051","IMG-20260105-WA0052","IMG-20260105-WA0054","IMG-20260105-WA0055","IMG-20260105-WA0056","IMG-20260105-WA0057","IMG-20260105-WA0058","IMG-20260105-WA0062","IMG-20260105-WA0063","IMG-20260105-WA0065","IMG-20260105-WA0067","IMG-20260105-WA0068"].map(f => `/gallery/nepal-group-tour/${f}.jpg`),
      ...["IMG-20260521-WA0000","IMG-20260521-WA0001","IMG-20260521-WA0002","IMG-20260521-WA0003","IMG-20260521-WA0004","IMG-20260521-WA0005","IMG-20260521-WA0006","IMG-20260521-WA0007","IMG-20260521-WA0008","IMG-20260521-WA0009"].map(f => `/gallery/pokhara-stay/${f}.jpg`),
      ...["IMG-20260209-WA0015","IMG-20260209-WA0016","IMG-20260209-WA0017","IMG-20260209-WA0018","IMG-20260209-WA0019","IMG-20260209-WA0021","IMG-20260209-WA0022","IMG-20260209-WA0023","IMG-20260209-WA0026","IMG-20260209-WA0027","IMG-20260209-WA0028","IMG-20260209-WA0029","IMG-20260209-WA0030","IMG-20260321-WA0024","IMG-20260321-WA0025","IMG-20260321-WA0027","IMG-20260321-WA0029","IMG-20260321-WA0030"].map(f => `/gallery/pokhara/${f}.jpg`),
      ...["IMG-20260521-WA0010","IMG-20260521-WA0011","IMG-20260521-WA0012","IMG-20260521-WA0014","IMG-20260521-WA0015","IMG-20260521-WA0016","IMG-20260521-WA0017","IMG-20260521-WA0020","IMG-20260521-WA0021","IMG-20260521-WA0023","IMG-20260521-WA0024","IMG-20260521-WA0025"].map(f => `/gallery/kathmandu-stay/${f}.jpg`),
      ...["IMG-20250328-WA0150","IMG-20250328-WA0151","IMG-20250328-WA0165","IMG-20250328-WA0166","IMG-20250328-WA0167","IMG-20250328-WA0173","IMG-20250328-WA0174","IMG-20250328-WA0181","IMG-20250328-WA0193","IMG-20250328-WA0199"].map(f => `/gallery/sarangkot/${f}.jpg`),
    ],
  },
  {
    key: "sarangkot",
    label: "Sarangkot",
    files: ["IMG-20250328-WA0150","IMG-20250328-WA0151","IMG-20250328-WA0165","IMG-20250328-WA0166","IMG-20250328-WA0167","IMG-20250328-WA0173","IMG-20250328-WA0174","IMG-20250328-WA0181","IMG-20250328-WA0193","IMG-20250328-WA0199"].map(f => `/gallery/sarangkot/${f}.jpg`),
  },
  {
    key: "pokhara",
    label: "Pokhara",
    files: ["IMG-20260209-WA0015","IMG-20260209-WA0016","IMG-20260209-WA0017","IMG-20260209-WA0018","IMG-20260209-WA0019","IMG-20260209-WA0021","IMG-20260209-WA0022","IMG-20260209-WA0023","IMG-20260209-WA0026","IMG-20260209-WA0027","IMG-20260209-WA0028","IMG-20260209-WA0029","IMG-20260209-WA0030","IMG-20260321-WA0024","IMG-20260321-WA0025","IMG-20260321-WA0027","IMG-20260321-WA0029","IMG-20260321-WA0030"].map(f => `/gallery/pokhara/${f}.jpg`),
  },
  {
    key: "pokhara-stay",
    label: "Pokhara Stay",
    files: ["IMG-20260521-WA0000","IMG-20260521-WA0001","IMG-20260521-WA0002","IMG-20260521-WA0003","IMG-20260521-WA0004","IMG-20260521-WA0005","IMG-20260521-WA0006","IMG-20260521-WA0007","IMG-20260521-WA0008","IMG-20260521-WA0009"].map(f => `/gallery/pokhara-stay/${f}.jpg`),
  },
  {
    key: "kathmandu-stay",
    label: "Kathmandu",
    files: ["IMG-20260521-WA0010","IMG-20260521-WA0011","IMG-20260521-WA0012","IMG-20260521-WA0014","IMG-20260521-WA0015","IMG-20260521-WA0016","IMG-20260521-WA0017","IMG-20260521-WA0020","IMG-20260521-WA0021","IMG-20260521-WA0023","IMG-20260521-WA0024","IMG-20260521-WA0025"].map(f => `/gallery/kathmandu-stay/${f}.jpg`),
  },
  {
    key: "chitwan",
    label: "Chitwan",
    files: ["IMG-20260321-WA0040","IMG-20260321-WA0041","IMG-20260321-WA0042","IMG-20260321-WA0045"].map(f => `/gallery/chitwan/${f}.jpg`),
  },
  {
    key: "nepal-group-tour",
    label: "Group Tour",
    files: ["IMG-20260105-WA0015","IMG-20260105-WA0045","IMG-20260105-WA0046","IMG-20260105-WA0047","IMG-20260105-WA0048","IMG-20260105-WA0049","IMG-20260105-WA0050","IMG-20260105-WA0051","IMG-20260105-WA0052","IMG-20260105-WA0054","IMG-20260105-WA0055","IMG-20260105-WA0056","IMG-20260105-WA0057","IMG-20260105-WA0058","IMG-20260105-WA0062","IMG-20260105-WA0063","IMG-20260105-WA0065","IMG-20260105-WA0067","IMG-20260105-WA0068"].map(f => `/gallery/nepal-group-tour/${f}.jpg`),
  },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("all");
  const [lightbox, setLightbox] = useState<{ src: string; index: number } | null>(null);

  const currentAlbum = albums.find(a => a.key === activeTab) ?? albums[0];
  const photos = currentAlbum.files;

  const openLightbox = useCallback((src: string, index: number) => {
    setLightbox({ src, index });
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = "";
  }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    if (!lightbox) return;
    const next = (lightbox.index + dir + photos.length) % photos.length;
    setLightbox({ src: photos[next], index: next });
  }, [lightbox, photos]);

  return (
    <>
      {/* Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem", justifyContent: "center" }}>
        {albums.map(album => (
          <button key={album.key} onClick={() => setActiveTab(album.key)}
            style={{
              padding: "0.45rem 1.2rem", fontSize: "0.78rem", fontWeight: 500,
              letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid",
              borderColor: activeTab === album.key ? "var(--sky)" : "rgba(0,0,0,0.15)",
              background: activeTab === album.key ? "var(--sky)" : "white",
              color: activeTab === album.key ? "white" : "var(--text-muted)",
              cursor: "pointer", borderRadius: 2, transition: "all 0.2s", fontFamily: "inherit",
            }}>
            {album.label}
            <span style={{ marginLeft: "0.4rem", fontSize: "0.7rem", opacity: 0.75 }}>({album.files.length})</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "8px",
      }}>
        {photos.map((src, i) => (
          <div key={src} onClick={() => openLightbox(src, i)}
            style={{
              aspectRatio: "4/3", overflow: "hidden", cursor: "pointer", borderRadius: 2,
              background: "#f0f0f0",
            }}>
            <img src={src} alt={`Photo ${i + 1}`} loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", display: "block" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
          {/* Close */}
          <button onClick={closeLightbox}
            style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "white", fontSize: "2rem", cursor: "pointer", lineHeight: 1 }}>
            ✕
          </button>

          {/* Prev */}
          <button onClick={e => { e.stopPropagation(); navigate(-1); }}
            style={{ position: "absolute", left: 16, background: "rgba(255,255,255,0.1)", border: "none", color: "white", fontSize: "1.8rem", cursor: "pointer", padding: "0.5rem 1rem", borderRadius: 2 }}>
            ‹
          </button>

          <img src={lightbox.src} alt="Gallery" onClick={e => e.stopPropagation()}
            style={{ maxWidth: "90vw", maxHeight: "88vh", objectFit: "contain", borderRadius: 2, boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}
          />

          {/* Next */}
          <button onClick={e => { e.stopPropagation(); navigate(1); }}
            style={{ position: "absolute", right: 16, background: "rgba(255,255,255,0.1)", border: "none", color: "white", fontSize: "1.8rem", cursor: "pointer", padding: "0.5rem 1rem", borderRadius: 2 }}>
            ›
          </button>

          {/* Counter */}
          <p style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>
            {lightbox.index + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
