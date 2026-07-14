"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";

type Trip = {
  image: string;
  title: string;
  subtitle?: string;
  duration: string;
  dates: string;
  price?: string;
  highlights?: string[];
  badge?: string;
};

const trips: { month: string; items: Trip[] }[] = [
  {
    month: "July 2026",
    items: [
      {
        image: "/upcoming/jhargram-belpahari.jpg",
        title: "Jhargram · Belpahari",
        duration: "2N-3D",
        dates: "24 Jul · 21 Aug · 18 Sep",
        badge: "Monsoon Special",
      },
      {
        image: "/upcoming/ranchi-netarhat.jpg",
        title: "Ranchi · Netarhat · Patratu",
        duration: "3N-4D",
        dates: "31 Jul · 25 Sep",
        badge: "Group Tour",
      },
      {
        image: "/upcoming/ghatshila-jamshedpur.jpg",
        title: "Ghatshila · Jamshedpur",
        duration: "2N-3D",
        dates: "31 Jul · 21 Aug",
        price: "₹6,299/pp",
      },
      {
        image: "/upcoming/purulia.jpg",
        title: "Monsoon in Purulia",
        duration: "2N-3D",
        dates: "31 Jul · 13 Aug · 14 Sep",
        highlights: ["Murguma", "Turga Dam", "Bamni Falls"],
      },
      {
        image: "/upcoming/mainpat.jpg",
        title: "Mesmerizing Mainpat",
        duration: "2N-3D",
        dates: "31 Jul · 14 Aug · 11 Sep",
        highlights: ["Ulta Pani", "Monasteries", "Waterfalls"],
      },
      {
        image: "/upcoming/dhanbad-topchachi.jpg",
        title: "Dhanbad · Topchachi",
        duration: "1N-2D",
        dates: "Weekends",
        price: "₹2,899/pp",
        highlights: ["Bhatinda Falls", "Usri Falls", "Topchachi Lake"],
      },
    ],
  },
  {
    month: "August 2026",
    items: [
      {
        image: "/upcoming/dooars.jpg",
        title: "Dooars Adventure",
        duration: "5N-6D",
        dates: "13 Aug · 20 Aug · 27 Aug · 12 Sep",
        highlights: ["Buxa-Jayanti", "Jhalong", "Bindu", "Gorumara"],
        badge: "Nature Escape",
      },
      {
        image: "/upcoming/sasaram.jpg",
        title: "Sasaram Heritage",
        duration: "2N-3D",
        dates: "28 Aug",
        price: "₹7,899/pp",
        highlights: ["Rohtasgarh Fort", "Tutla Bhawani", "Shergarh Fort"],
      },
    ],
  },
  {
    month: "September 2026",
    items: [
      {
        image: "/upcoming/haridwar-mussoorie.jpg",
        title: "Haridwar · Dehradun · Mussoorie",
        duration: "3N-4D",
        dates: "04 Sep · 18 Sep",
        price: "₹9,999/pp",
      },
      {
        image: "/upcoming/varanasi-prayagraj-ayodhya.jpg",
        title: "Varanasi · Prayagraj · Ayodhya",
        duration: "3N-4D",
        dates: "04 Sep · 25 Sep",
        price: "₹9,599/pp (double)",
      },
      {
        image: "/upcoming/keonjhar.jpg",
        title: "Keonjhar Waterfalls Explorer",
        duration: "3N-4D",
        dates: "17 Sep · 24 Sep",
        price: "₹9,999/pp",
        highlights: ["Khandadhar", "Gundichaghagi", "Tarini Temple"],
      },
    ],
  },
  {
    month: "October 2026",
    items: [
      {
        image: "/upcoming/kashmir-pujo.jpg",
        title: "Kashmir Pujo Special",
        duration: "6N-7D",
        dates: "15 Oct · 26 Oct",
        price: "From ₹11,999/pp",
        badge: "Pujo Exclusive",
      },
      {
        image: "/upcoming/arunachal.jpg",
        title: "Arunachal Pradesh",
        subtitle: "Tawang · Bomdila · Shergaon",
        duration: "6N-7D",
        dates: "16 Oct · 26 Oct · 06 Nov · 23 Dec",
        price: "₹22,499/pp",
        highlights: ["Bumla Pass (Complimentary)", "All meals", "All taxes"],
        badge: "Premium",
      },
      {
        image: "/upcoming/nepal-muktinath.jpg",
        title: "Nepal with Muktinath Darshan",
        duration: "7N-8D (Pujo) · 8N-9D (Winter)",
        dates: "17 Oct · 26 Oct · 06 Nov · 24 Dec",
        badge: "Most Popular",
      },
      {
        image: "/upcoming/silk-route.jpg",
        title: "Splendid Silk Route",
        duration: "4N-5D",
        dates: "16 Oct · 26 Oct · 07 Nov",
      },
      {
        image: "/upcoming/himachal.jpg",
        title: "Heavenly Himachal",
        subtitle: "Shimla · Manali · Kasol · Manikaran",
        duration: "10N-11D",
        dates: "17 Oct · 26 Oct · 07 Nov",
      },
    ],
  },
  {
    month: "Any Time",
    items: [
      {
        image: "/upcoming/varanasi-ayodhya.jpg",
        title: "Varanasi · Ayodhya",
        subtitle: "Customised Premium Tour",
        duration: "3N-4D",
        dates: "Flexible Dates",
        badge: "Customised",
      },
      {
        image: "/upcoming/gangtok-pelling.jpg",
        title: "Gangtok · Pelling",
        duration: "6N-7D",
        dates: "On Request",
        highlights: ["Tsomgo Lake", "Rumtek", "Sky Walk", "Kanchenjunga Falls"],
      },
      {
        image: "/upcoming/darjeeling.jpg",
        title: "Darjeeling & Kalimpong",
        subtitle: "Classic · Offbeat options",
        duration: "2N-3D · 3N-4D",
        dates: "Any Day",
        badge: "Always Open",
      },
      {
        image: "/upcoming/andamaan.jpg",
        title: "Awesome Andamaan",
        duration: "5N-6D",
        dates: "On Request",
        highlights: ["Port Blair", "Rose Island", "Havelock", "Neil Island"],
      },
    ],
  },
];

export default function UpcomingTripsPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{
        position: "relative", minHeight: 420,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, rgba(30,58,95,0.93) 0%, rgba(58,173,168,0.82) 100%),
            url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80') center/cover no-repeat`,
        }} />
        <div style={{ position: "relative", textAlign: "center", padding: "8rem 5% 5rem", maxWidth: 760, margin: "0 auto" }}>
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", display: "block", marginBottom: "1rem" }}>
            Simana Periye Travel
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 300, color: "white", lineHeight: 1.1, margin: "0 0 1.25rem" }}>
            Upcoming <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.75)" }}>Trips</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
            Browse our curated group departures for 2026 — from weekend escapes to Himalayan expeditions. Click any poster to zoom in.
          </p>
        </div>
      </section>

      {/* Contact strip */}
      <div style={{ background: "var(--sky-dark)", padding: "1rem 5%", display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
        {[
          { label: "Call / WhatsApp", val: "+91 99031 49484" },
          { label: "Book via call", val: "+91 70038 56019" },
          { label: "Email", val: "simanaperiyet@gmail.com" },
        ].map(({ label, val }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "0.2rem" }}>{label}</div>
            <div style={{ fontSize: "0.88rem", color: "white", fontWeight: 500 }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Trip sections by month */}
      <main style={{ padding: "4rem 5% 6rem", maxWidth: 1300, margin: "0 auto" }}>
        {trips.map(({ month, items }) => (
          <section key={month} style={{ marginBottom: "5rem" }}>
            {/* Month heading */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2.5rem" }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--sky)", marginBottom: "0.25rem" }}>Departures</div>
                <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 300, color: "var(--sky-dark)", lineHeight: 1.1, margin: 0 }}>
                  {month}
                </h2>
              </div>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, var(--sky), transparent)" }} />
            </div>

            {/* Poster grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}>
              {items.map((trip) => (
                <div
                  key={trip.image}
                  onClick={() => setLightbox(trip.image)}
                  style={{
                    cursor: "pointer",
                    borderRadius: 10,
                    overflow: "hidden",
                    background: "white",
                    boxShadow: "0 4px 20px rgba(30,58,95,0.10)",
                    border: "1px solid rgba(58,173,168,0.12)",
                    transition: "transform 0.25s, box-shadow 0.25s",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 36px rgba(30,58,95,0.18)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(30,58,95,0.10)";
                  }}
                >
                  {/* Poster image */}
                  <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
                    <img
                      src={trip.image}
                      alt={trip.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }}
                    />
                    {trip.badge && (
                      <div style={{
                        position: "absolute", top: 12, left: 12,
                        background: "var(--sky)", color: "white",
                        fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", padding: "0.3rem 0.75rem", borderRadius: 2,
                      }}>
                        {trip.badge}
                      </div>
                    )}
                    {/* Zoom hint */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "rgba(30,58,95,0)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background 0.3s",
                    }} className="zoom-overlay">
                      <svg width="36" height="36" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24" style={{ opacity: 0, transition: "opacity 0.3s" }} className="zoom-icon">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                      </svg>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "1rem 1.1rem 1.25rem" }}>
                    <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", fontWeight: 600, color: "var(--sky-dark)", lineHeight: 1.25, marginBottom: trip.subtitle ? "0.2rem" : "0.5rem" }}>
                      {trip.title}
                    </div>
                    {trip.subtitle && (
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>{trip.subtitle}</div>
                    )}
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
                      <span style={{ fontSize: "0.72rem", background: "#f0f9ff", color: "var(--sky-dark)", padding: "0.2rem 0.6rem", borderRadius: 2, fontWeight: 600 }}>
                        {trip.duration}
                      </span>
                      {trip.price && (
                        <span style={{ fontSize: "0.72rem", background: "var(--sky-pale)", color: "var(--sky-dark)", padding: "0.2rem 0.6rem", borderRadius: 2, fontWeight: 700 }}>
                          {trip.price}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--sky)", fontWeight: 500, marginBottom: trip.highlights ? "0.5rem" : 0 }}>
                      🗓 {trip.dates}
                    </div>
                    {trip.highlights && (
                      <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                        {trip.highlights.join(" · ")}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "2rem", padding: "3rem 2rem", background: "linear-gradient(135deg, var(--sky-dark), var(--sky))", borderRadius: 12 }}>
          <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 300, color: "white", marginBottom: "0.75rem" }}>
            Don&apos;t see your dates?
          </h3>
          <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: "1.75rem", maxWidth: 440, margin: "0 auto 1.75rem" }}>
            We run custom departures on request. Call or WhatsApp us to plan your perfect trip.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:+919903149484" style={{ background: "white", color: "var(--sky-dark)", padding: "0.85rem 2.2rem", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 4 }}>
              Call +91 99031 49484
            </a>
            <a href="mailto:simanaperiyet@gmail.com" style={{ background: "transparent", color: "white", padding: "0.85rem 2.2rem", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.5)", textDecoration: "none", borderRadius: 4 }}>
              Email Us
            </a>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 2000,
            background: "rgba(0,0,0,0.9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem",
            cursor: "zoom-out",
          }}
        >
          <img
            src={lightbox}
            alt="Trip poster"
            style={{ maxWidth: "min(95vw, 600px)", maxHeight: "90vh", objectFit: "contain", borderRadius: 6 }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{ position: "absolute", top: "1.25rem", right: "1.5rem", background: "none", border: "none", color: "white", fontSize: "2rem", cursor: "pointer", lineHeight: 1 }}
          >×</button>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: "#f8fafc", padding: "2rem 5%", borderTop: "2px solid #e0f2fe", textAlign: "center" }}>
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>© 2026 Simana Periye Travel. All rights reserved.</p>
      </footer>

      <style>{`
        div:hover .zoom-overlay { background: rgba(30,58,95,0.25) !important; }
        div:hover .zoom-icon { opacity: 1 !important; }
      `}</style>
    </>
  );
}
