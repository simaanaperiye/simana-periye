"use client";
import Navbar from "@/components/Navbar";
import { useCart } from "@/components/CartProvider";
import { useState } from "react";

type Trip = {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  destination: string;
  duration: string;
  durationDays: number;
  dates: string;
  price?: number;
  priceNote?: string;
  highlights?: string[];
  badge?: string;
};

const trips: { month: string; items: Trip[] }[] = [
  {
    month: "July 2026",
    items: [
      {
        id: "upcoming-jhargram",
        image: "/upcoming/jhargram-belpahari.jpg",
        title: "Jhargram · Belpahari",
        destination: "Jhargram, West Bengal",
        duration: "2N-3D",
        durationDays: 3,
        dates: "24 Jul · 21 Aug · 18 Sep",
        badge: "Monsoon Special",
      },
      {
        id: "plan-ranchi",
        image: "/upcoming/ranchi-netarhat.jpg",
        title: "Ranchi · Netarhat · Patratu",
        destination: "Ranchi & Netarhat, Jharkhand",
        duration: "3N-4D",
        durationDays: 4,
        dates: "31 Jul · 25 Sep",
        price: 10999,
        badge: "Group Tour",
      },
      {
        id: "upcoming-ghatshila",
        image: "/upcoming/ghatshila-jamshedpur.jpg",
        title: "Ghatshila · Jamshedpur",
        destination: "Ghatshila, Jharkhand",
        duration: "2N-3D",
        durationDays: 3,
        dates: "31 Jul · 21 Aug",
        price: 6299,
      },
      {
        id: "upcoming-purulia",
        image: "/upcoming/purulia.jpg",
        title: "Monsoon in Purulia",
        destination: "Purulia, West Bengal",
        duration: "2N-3D",
        durationDays: 3,
        dates: "31 Jul · 13 Aug · 14 Sep",
        highlights: ["Murguma", "Turga Dam", "Bamni Falls"],
      },
      {
        id: "upcoming-mainpat",
        image: "/upcoming/mainpat.jpg",
        title: "Mesmerizing Mainpat",
        destination: "Mainpat, Chhattisgarh",
        duration: "2N-3D",
        durationDays: 3,
        dates: "31 Jul · 14 Aug · 11 Sep",
        price: 7699,
        highlights: ["Ulta Pani", "Monasteries", "Waterfalls"],
      },
      {
        id: "upcoming-dhanbad",
        image: "/upcoming/dhanbad-topchachi.jpg",
        title: "Dhanbad · Topchachi",
        destination: "Dhanbad, Jharkhand",
        duration: "1N-2D",
        durationDays: 2,
        dates: "Weekends",
        price: 2899,
        highlights: ["Bhatinda Falls", "Usri Falls", "Topchachi Lake"],
      },
    ],
  },
  {
    month: "August 2026",
    items: [
      {
        id: "upcoming-dooars",
        image: "/upcoming/dooars.jpg",
        title: "Dooars Adventure",
        destination: "Dooars, West Bengal",
        duration: "5N-6D",
        durationDays: 6,
        dates: "13 Aug · 20 Aug · 27 Aug · 12 Sep",
        highlights: ["Buxa-Jayanti", "Jhalong", "Bindu", "Gorumara"],
        badge: "Nature Escape",
      },
      {
        id: "upcoming-sasaram",
        image: "/upcoming/sasaram.jpg",
        title: "Sasaram Heritage",
        destination: "Sasaram, Bihar",
        duration: "2N-3D",
        durationDays: 3,
        dates: "28 Aug",
        price: 7899,
        highlights: ["Rohtasgarh Fort", "Tutla Bhawani", "Shergarh Fort"],
      },
    ],
  },
  {
    month: "September 2026",
    items: [
      {
        id: "upcoming-haridwar",
        image: "/upcoming/haridwar-mussoorie.jpg",
        title: "Haridwar · Dehradun · Mussoorie",
        destination: "Uttarakhand",
        duration: "3N-4D",
        durationDays: 4,
        dates: "04 Sep · 18 Sep",
        price: 9999,
      },
      {
        id: "upcoming-varanasi-trio",
        image: "/upcoming/varanasi-prayagraj-ayodhya.jpg",
        title: "Varanasi · Prayagraj · Ayodhya",
        destination: "Uttar Pradesh",
        duration: "3N-4D",
        durationDays: 4,
        dates: "04 Sep · 25 Sep",
        price: 9599,
        priceNote: "double sharing",
      },
      {
        id: "plan-keonjhar",
        image: "/upcoming/keonjhar.jpg",
        title: "Keonjhar Waterfalls Explorer",
        destination: "Keonjhar, Odisha",
        duration: "3N-4D",
        durationDays: 4,
        dates: "17 Sep · 24 Sep",
        price: 9999,
        highlights: ["Khandadhar", "Gundichaghagi", "Tarini Temple"],
      },
    ],
  },
  {
    month: "October 2026",
    items: [
      {
        id: "upcoming-kashmir-pujo",
        image: "/upcoming/kashmir-pujo.jpg",
        title: "Kashmir Pujo Special",
        destination: "Kashmir",
        duration: "6N-7D",
        durationDays: 7,
        dates: "15 Oct · 26 Oct",
        price: 11999,
        priceNote: "Classic (Deluxe from ₹19,999)",
        badge: "Pujo Exclusive",
      },
      {
        id: "plan-arunachal",
        image: "/upcoming/arunachal.jpg",
        title: "Arunachal Pradesh",
        subtitle: "Tawang · Bomdila · Shergaon",
        destination: "Arunachal Pradesh",
        duration: "6N-7D",
        durationDays: 7,
        dates: "16 Oct · 26 Oct · 06 Nov · 23 Dec",
        price: 22499,
        highlights: ["Bumla Pass Complimentary", "All meals", "All taxes"],
        badge: "Premium",
      },
      {
        id: "plan-muktinath",
        image: "/upcoming/nepal-muktinath.jpg",
        title: "Nepal with Muktinath Darshan",
        destination: "Nepal",
        duration: "7N-8D",
        durationDays: 8,
        dates: "17 Oct · 26 Oct · 06 Nov · 24 Dec",
        price: 22000,
        badge: "Most Popular",
      },
      {
        id: "upcoming-silk-route",
        image: "/upcoming/silk-route.jpg",
        title: "Splendid Silk Route",
        destination: "Sikkim",
        duration: "4N-5D",
        durationDays: 5,
        dates: "16 Oct · 26 Oct · 07 Nov",
      },
      {
        id: "upcoming-himachal",
        image: "/upcoming/himachal.jpg",
        title: "Heavenly Himachal",
        subtitle: "Shimla · Manali · Kasol · Manikaran",
        destination: "Himachal Pradesh",
        duration: "10N-11D",
        durationDays: 11,
        dates: "17 Oct · 26 Oct · 07 Nov",
      },
    ],
  },
  {
    month: "Any Time",
    items: [
      {
        id: "upcoming-varanasi-custom",
        image: "/upcoming/varanasi-ayodhya.jpg",
        title: "Varanasi · Ayodhya",
        subtitle: "Customised Premium Tour",
        destination: "Uttar Pradesh",
        duration: "3N-4D",
        durationDays: 4,
        dates: "Flexible Dates",
        badge: "Customised",
      },
      {
        id: "upcoming-gangtok",
        image: "/upcoming/gangtok-pelling.jpg",
        title: "Gangtok · Pelling",
        destination: "Sikkim",
        duration: "6N-7D",
        durationDays: 7,
        dates: "On Request",
        highlights: ["Tsomgo Lake", "Rumtek", "Sky Walk", "Kanchenjunga Falls"],
      },
      {
        id: "upcoming-darjeeling",
        image: "/upcoming/darjeeling.jpg",
        title: "Darjeeling & Kalimpong",
        subtitle: "Classic · Offbeat options",
        destination: "Darjeeling, West Bengal",
        duration: "2N-3D / 3N-4D",
        durationDays: 3,
        dates: "Any Day",
        badge: "Always Open",
      },
      {
        id: "upcoming-andamaan",
        image: "/upcoming/andamaan.jpg",
        title: "Awesome Andamaan",
        destination: "Andaman & Nicobar Islands",
        duration: "5N-6D",
        durationDays: 6,
        dates: "On Request",
        highlights: ["Port Blair", "Rose Island", "Havelock", "Neil Island"],
      },
    ],
  },
];

/* ── Per-card booking component ── */
function TripCard({ trip }: { trip: Trip }) {
  const { add } = useCart();
  const [open, setOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [added, setAdded] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  const totalPeople = adults + kids;
  const totalPrice = trip.price ? trip.price * totalPeople : null;

  const handleAddToCart = () => {
    add(
      {
        planId: trip.id,
        title: trip.title,
        destination: trip.destination,
        imageUrl: trip.image,
        price: trip.price ?? 0,
        duration: trip.durationDays,
      },
      totalPeople,
    );
    setAdded(true);
    setOpen(false);
    setTimeout(() => setAdded(false), 2000);
  };

  const counter = (val: number, set: (n: number) => void, min = 0) => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <button
        onClick={() => set(Math.max(min, val - 1))}
        style={cntBtn}
        disabled={val <= min}
      >−</button>
      <span style={{ minWidth: 24, textAlign: "center", fontWeight: 600, fontSize: "0.95rem", color: "var(--sky-dark)" }}>{val}</span>
      <button onClick={() => set(val + 1)} style={cntBtn}>+</button>
    </div>
  );

  return (
    <>
      <div style={{
        borderRadius: 10, overflow: "hidden", background: "white",
        boxShadow: "0 4px 20px rgba(30,58,95,0.10)",
        border: "1px solid rgba(58,173,168,0.12)",
        display: "flex", flexDirection: "column",
      }}>
        {/* Poster image — click to lightbox */}
        <div
          onClick={() => setLightbox(true)}
          style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", cursor: "zoom-in" }}
        >
          <img
            src={trip.image}
            alt={trip.title}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
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
          <div style={{
            position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.45)",
            borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
            </svg>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "1rem 1.1rem 0" }}>
          <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", fontWeight: 600, color: "var(--sky-dark)", lineHeight: 1.25, marginBottom: trip.subtitle ? "0.2rem" : "0.4rem" }}>
            {trip.title}
          </div>
          {trip.subtitle && (
            <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginBottom: "0.4rem" }}>{trip.subtitle}</div>
          )}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.7rem", background: "#f0f9ff", color: "var(--sky-dark)", padding: "0.2rem 0.55rem", borderRadius: 2, fontWeight: 600 }}>
              {trip.duration}
            </span>
            {trip.price && (
              <span style={{ fontSize: "0.7rem", background: "var(--sky-pale)", color: "var(--sky-dark)", padding: "0.2rem 0.55rem", borderRadius: 2, fontWeight: 700 }}>
                ₹{trip.price.toLocaleString("en-IN")}/pp
              </span>
            )}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--sky)", fontWeight: 500, marginBottom: "0.4rem" }}>
            🗓 {trip.dates}
          </div>
          {trip.highlights && (
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "0.4rem" }}>
              {trip.highlights.join(" · ")}
            </div>
          )}
        </div>

        {/* Booking panel toggle */}
        <div style={{ padding: "0.75rem 1.1rem 1.1rem", marginTop: "auto" }}>
          {!open ? (
            <button
              onClick={() => setOpen(true)}
              style={{
                width: "100%", padding: "0.65rem", fontSize: "0.78rem", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
                background: added ? "var(--sky-dark)" : "var(--sky)",
                color: "white", border: "none", borderRadius: 4,
                transition: "background 0.3s",
              }}
            >
              {added ? "✓ Added to Cart" : "Book Now"}
            </button>
          ) : (
            <div style={{
              background: "#f7feff", border: "1px solid rgba(58,173,168,0.2)",
              borderRadius: 8, padding: "1rem",
            }}>
              {/* Adults */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--sky-dark)" }}>Adults</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Age 12+</div>
                </div>
                {counter(adults, setAdults, 1)}
              </div>

              {/* Kids */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--sky-dark)" }}>Children</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Age 5–11</div>
                </div>
                {counter(kids, setKids, 0)}
              </div>

              {/* Summary */}
              <div style={{ borderTop: "1px solid rgba(58,173,168,0.15)", paddingTop: "0.75rem", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>
                  <span>Total travellers</span>
                  <span style={{ fontWeight: 700, color: "var(--sky-dark)" }}>{totalPeople} {totalPeople === 1 ? "person" : "people"}</span>
                </div>
                {totalPrice !== null ? (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>Estimated total</span>
                    <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", fontWeight: 600, color: "var(--sky-dark)" }}>
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                ) : (
                  <div style={{ fontSize: "0.75rem", color: "var(--sky)", fontStyle: "italic" }}>
                    Pricing confirmed on booking — contact us for exact quote.
                  </div>
                )}
                {trip.priceNote && (
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>* {trip.priceNote}</div>
                )}
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => setOpen(false)}
                  style={{ flex: 1, padding: "0.6rem", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", background: "none", border: "1px solid rgba(58,173,168,0.3)", color: "var(--text-muted)", borderRadius: 4 }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={totalPeople === 0}
                  style={{
                    flex: 2, padding: "0.6rem", fontSize: "0.78rem", fontWeight: 700,
                    letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer",
                    background: "var(--sky)", color: "white", border: "none", borderRadius: 4,
                  }}
                >
                  + Add to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 2000,
            background: "rgba(0,0,0,0.9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem", cursor: "zoom-out",
          }}
        >
          <img
            src={trip.image}
            alt={trip.title}
            style={{ maxWidth: "min(95vw, 600px)", maxHeight: "90vh", objectFit: "contain", borderRadius: 6 }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(false)}
            style={{ position: "absolute", top: "1.25rem", right: "1.5rem", background: "none", border: "none", color: "white", fontSize: "2rem", cursor: "pointer", lineHeight: 1 }}
          >×</button>
        </div>
      )}
    </>
  );
}

const cntBtn: React.CSSProperties = {
  width: 28, height: 28, borderRadius: "50%", border: "1.5px solid var(--sky)",
  background: "white", color: "var(--sky-dark)", fontSize: "1.1rem", fontWeight: 600,
  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
  lineHeight: 1,
};

/* ── Page ── */
export default function UpcomingTripsPage() {
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
            Browse our curated group departures for 2026. Click any poster to zoom in, then select your travellers and add to cart.
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
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2.5rem" }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--sky)", marginBottom: "0.25rem" }}>Departures</div>
                <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 300, color: "var(--sky-dark)", lineHeight: 1.1, margin: 0 }}>
                  {month}
                </h2>
              </div>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, var(--sky), transparent)" }} />
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}>
              {items.map((trip) => <TripCard key={trip.id} trip={trip} />)}
            </div>
          </section>
        ))}

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "3rem 2rem", background: "linear-gradient(135deg, var(--sky-dark), var(--sky))", borderRadius: 12 }}>
          <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 300, color: "white", marginBottom: "0.75rem" }}>
            Don&apos;t see your dates?
          </h3>
          <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 440, margin: "0 auto 1.75rem", lineHeight: 1.8 }}>
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

      {/* Footer */}
      <footer style={{ background: "#f8fafc", padding: "2rem 5%", borderTop: "2px solid #e0f2fe", textAlign: "center" }}>
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>© 2026 Simana Periye Travel. All rights reserved.</p>
      </footer>
    </>
  );
}
