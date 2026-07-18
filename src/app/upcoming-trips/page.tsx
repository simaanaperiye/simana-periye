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

const pujaSpecials: Trip[] = [
  {
    id: "puja-nepal-muktinath",
    image: "/upcoming/nepal-muktinath.jpg",
    title: "Nepal with Muktinath",
    destination: "Nepal",
    duration: "7N-8D",
    durationDays: 8,
    dates: "16 Oct · 25 Oct",
    price: 21999,
    badge: "Puja Special",
  },
  {
    id: "puja-arunachal",
    image: "/upcoming/arunachal.jpg",
    title: "Arunachal Pradesh",
    subtitle: "Tawang · Bomdila · Shergaon",
    destination: "Arunachal Pradesh",
    duration: "6N-7D",
    durationDays: 7,
    dates: "16 Oct · 25 Oct",
    price: 21499,
    priceNote: "Premium ₹22,499pp",
    badge: "Puja Special",
  },
  {
    id: "puja-kashmir",
    image: "/upcoming/kashmir-pujo.jpg",
    title: "Kashmir",
    destination: "Kashmir",
    duration: "6N-7D",
    durationDays: 7,
    dates: "15 Oct · 26 Oct",
    price: 16999,
    priceNote: "Premium ₹18,999pp",
    badge: "Puja Special",
  },
  {
    id: "puja-vizag-araku",
    image: "/upcoming/vizag-araku.jpg",
    title: "Vizag · Araku",
    destination: "Visakhapatnam, Andhra Pradesh",
    duration: "3N-4D",
    durationDays: 4,
    dates: "15 Oct · 26 Oct",
    price: 9599,
    priceNote: "Premium ₹10,499pp",
    badge: "Puja Special",
  },
  {
    id: "puja-varanasi-ayodhya",
    image: "/upcoming/varanasi-ayodhya.jpg",
    title: "Varanasi · Ayodhya",
    destination: "Uttar Pradesh",
    duration: "3N-4D",
    durationDays: 4,
    dates: "17 Oct",
    price: 10699,
    badge: "Puja Special",
  },
  {
    id: "puja-ranchi-betla",
    image: "/upcoming/ranchi-netarhat.jpg",
    title: "Ranchi · Netarhat · Betla",
    destination: "Jharkhand",
    duration: "4N-5D",
    durationDays: 5,
    dates: "16 Oct · 28 Oct",
    price: 11999,
    priceNote: "Premium ₹12,999pp",
    badge: "Puja Special",
  },
  {
    id: "puja-haridwar",
    image: "/upcoming/haridwar-mussoorie.jpg",
    title: "Haridwar · Hrishikesh · Mussoorie",
    subtitle: "Dehradun included",
    destination: "Uttarakhand",
    duration: "4N-5D",
    durationDays: 5,
    dates: "16 Oct",
    price: 11999,
    priceNote: "Premium ₹12,999pp",
    badge: "Puja Special",
  },
  {
    id: "puja-meghalaya",
    image: "/upcoming/meghalaya.jpg",
    title: "Meghalaya",
    subtitle: "Shillong · Cherrapunji · Dawki",
    destination: "Meghalaya",
    duration: "5N-6D",
    durationDays: 6,
    dates: "16 Oct",
    price: 16599,
    priceNote: "Premium ₹18,299pp",
    badge: "Puja Special",
  },
  {
    id: "puja-andaman",
    image: "/upcoming/andamaan.jpg",
    title: "Andaman (Customized)",
    destination: "Andaman & Nicobar Islands",
    duration: "5N-6D",
    durationDays: 6,
    dates: "Any Date",
    price: 19199,
    badge: "Puja Special",
  },
  {
    id: "puja-darjeeling",
    image: "/upcoming/darjeeling.jpg",
    title: "Premium Darjeeling",
    destination: "Darjeeling, West Bengal",
    duration: "2N-3D",
    durationDays: 3,
    dates: "Any Date",
    price: 6250,
    badge: "Puja Special",
  },
  {
    id: "puja-silk-route",
    image: "/upcoming/silk-route.jpg",
    title: "Silk Route",
    destination: "Sikkim",
    duration: "4N-5D",
    durationDays: 5,
    dates: "27 Oct",
    price: 6399,
    priceNote: "min 8 pax",
    badge: "Puja Special",
  },
  {
    id: "puja-kerala",
    image: "/upcoming/kerala.jpg",
    title: "Kerala",
    subtitle: "Kochi · Munnar · Alleppey · Thekkady",
    destination: "Kerala",
    duration: "5N-6D",
    durationDays: 6,
    dates: "17 Oct · 26 Oct",
    price: 20499,
    badge: "Puja Special",
  },
  {
    id: "puja-shimla-manali",
    image: "/upcoming/himachal.jpg",
    title: "Shimla · Manali · Kasol",
    destination: "Himachal Pradesh",
    duration: "6N-7D",
    durationDays: 7,
    dates: "26 Oct",
    price: 15499,
    priceNote: "Premium ₹16,499pp",
    badge: "Puja Special",
  },
  {
    id: "puja-kinnaur-kalpa",
    image: "/upcoming/kinnaur-kalpa.jpg",
    title: "Kinnaur · Kalpa",
    destination: "Himachal Pradesh",
    duration: "5N-6D",
    durationDays: 6,
    dates: "16 Oct",
    price: 18999,
    badge: "Puja Special",
  },
];

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
        price: 9799,
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
        image: "/upcoming/sasaram.jpg",
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
        image: "/upcoming/dhanbad-topchachi.jpg",
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
        id: "upcoming-kerala",
        image: "/upcoming/kerala.jpg",
        title: "Kerala in Monsoon",
        subtitle: "Kochi · Munnar · Alleppey · Thekkady",
        destination: "Kerala",
        duration: "5N-6D",
        durationDays: 6,
        dates: "18 Sep · 20 Sep",
        price: 18999,
        highlights: ["Houseboat Stay at Alleppey", "Tea Gardens & Waterfalls", "Backwater Serenity", "Wildlife & Spice Plantation"],
        badge: "Monsoon Special",
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
        id: "upcoming-darjeeling-sittong",
        image: "/upcoming/darjeeling-sittong.jpg",
        title: "Darjeeling · Sittong",
        subtitle: "Group Tour · NJP to NJP",
        destination: "Darjeeling & Sittong, West Bengal",
        duration: "3N-4D",
        durationDays: 4,
        dates: "16 Oct",
        price: 6770,
        highlights: ["Tiger Hill Sunrise", "Batasia Loop & Ghoom Monastery", "HMI Museum", "Padmaja Naidu Zoo", "Sittong Orange Garden"],
        badge: "Group Tour",
        priceNote: "min 8 pax",
      },
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
              onClick={() => trip.price && setOpen(true)}
              disabled={!trip.price}
              title={!trip.price ? "Contact us for pricing" : undefined}
              style={{
                width: "100%", padding: "0.65rem", fontSize: "0.78rem", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                cursor: trip.price ? "pointer" : "not-allowed",
                background: added ? "var(--sky-dark)" : trip.price ? "var(--sky)" : "#cbd5e1",
                color: trip.price ? "white" : "#64748b",
                border: "none", borderRadius: 4,
                transition: "background 0.3s",
              }}
            >
              {added ? "✓ Added to Cart" : trip.price ? "Book Now" : "Contact for Price"}
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
                  disabled={totalPeople === 0 || !trip.price}
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

      {/* Puja Special Section */}
      <section style={{ background: "linear-gradient(160deg, #3d0a0a 0%, #7b1a1a 40%, #b8460a 100%)", padding: "4rem 5%" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,215,0,0.7)", marginBottom: "0.75rem" }}>
              Simana Periye · Celebrate. Explore. Create Memories.
            </div>
            <h2 style={{
              fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem,5vw,4rem)",
              fontWeight: 400, color: "#ffd700", lineHeight: 1.1, margin: "0 0 0.5rem",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}>
              Durga Puja Special Tours
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.92rem", maxWidth: 480, margin: "0 auto 1.5rem" }}>
              14 handpicked Puja getaways · All packages Deluxe &amp; Premium · Train ticket excluded
            </p>
            <div style={{ display: "inline-flex", gap: "0.5rem", background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: 20, padding: "0.4rem 1.2rem", fontSize: "0.72rem", color: "#ffd700", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              ★ Special Puja Offer · Book by 25 Jul 2026
            </div>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {pujaSpecials.map((trip) => (
              <div key={trip.id} style={{ position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, #ffd700, #ff8c00)", zIndex: 1, borderRadius: "10px 10px 0 0" }} />
                <TripCard trip={trip} />
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.45)", fontSize: "0.72rem", marginTop: "2rem", letterSpacing: "0.05em" }}>
            * All packages are Deluxe / Premium &nbsp;·&nbsp; Train tickets not included &nbsp;·&nbsp; Special Puja gifts for early bookings
          </p>
        </div>
      </section>

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
