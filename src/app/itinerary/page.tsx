"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import BookTourButton from "@/components/BookTourButton";
import { useState } from "react";

/* ─── Tour data ─────────────────────────────────────────── */

const tours = [
  /* ── 1. Nepal Muktinath ── */
  {
    id: "muktinath",
    planId: "plan-muktinath",
    title: "Nepal with Muktinath Darshan",
    subtitle: "9 Days · 8 Nights",
    route: "Raxaul · Pokhara · Jomsom · Muktinath · Kathmandu · Bhaktapur · Nagarkot",
    price: 22000,
    duration: 9,
    departure: "06 Nov 2026",
    imageUrl: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=900&q=80",
    days: [
      { day: 1, title: "Raxaul → Birgunj → Pokhara", desc: "Arrive at Raxaul / Birgunj, freshen up, have breakfast and lunch, then transfer to Pokhara. Check in and overnight stay." },
      { day: 3, title: "Pokhara Sightseeing", desc: "After breakfast, visit the serene Fewa Lake. After lunch, explore Pokhara's highlights — Bat Cave, Gupteswar Mahadev, Devi's Fall, and Mahendra Cave. Evening at leisure. Overnight stay." },
      { day: 4, title: "Pokhara → Jomsom", desc: "After breakfast, depart for Jomsom. En route visit Galeswar Mahadev, Tatopani hot springs, and the stunning Rupse Waterfall. Lunch on the way. Overnight stay at Jomsom." },
      { day: 5, title: "Muktinath Darshan → Pokhara", desc: "Early morning, visit the sacred Muktinath temple and return to hotel for lunch. After lunch, transfer back to Pokhara via the charming Marpha village. Overnight stay." },
      { day: 6, title: "Pokhara → Kathmandu via Manakamana", desc: "After breakfast, travel to Kathmandu with a divine stop at Manakamana Devi temple. Lunch on the way. Arrive Kathmandu and check in. Overnight stay." },
      { day: 7, title: "Kathmandu Sightseeing", desc: "Morning puja at the revered Pashupatinath temple. After breakfast and lunch, explore Kathmandu — Swayambhunath, Budhanilkantha, and Boudhanath Stupa. Evening free for shopping. Overnight stay." },
      { day: 8, title: "Bhaktapur & Nagarkot Sunset", desc: "After lunch, visit the UNESCO-listed Bhaktapur Rajdarbar (Durbar Square). Proceed to Nagarkot to witness a breathtaking Himalayan sunset. Overnight at Kathmandu." },
      { day: 9, title: "Return Journey to Raxaul", desc: "After breakfast, begin the return journey to Raxaul / Birgunj to board your train back home." },
    ],
    inclusions: ["Deluxe accommodation", "Comfortable journey by bus", "All meals by our own kitchen staff", "Muktinath permit (Complimentary)", "Experienced driver", "Efficient tour manager", "Tour guide", "Toll, parking, driver charges & permits"],
    exclusions: ["Train fare / train food", "Flight fare", "Personal expenses", "Cost from natural calamities, road blockage, landslide etc.", "Laundry, telephone charges, room service", "Extra luxury at hotels, extra food, extra vehicle", "Entry fees", "Rides, ropeway charges", "Porterage, tips, puja charges", "Anything not mentioned in inclusions"],
    specialities: ["Special care for kids & senior citizens", "Homely atmosphere throughout the tour", "Comfort first — always", "Quality assurance on every service"],
  },

  /* ── 2. Kashmir Valley ── */
  {
    id: "kashmir",
    planId: "plan-kashmir",
    title: "Kashmir Valley Splendour",
    subtitle: "7 Days · 6 Nights",
    route: "Srinagar · Sonamarg · Gulmarg · Pahalgam · Srinagar",
    price: 22500,
    duration: 7,
    departure: "15 Jun 2026",
    imageUrl: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=900&q=80",
    days: [
      { day: 1, title: "Arrival at Srinagar", desc: "Arrive at Srinagar airport, transfer to hotel. Shikara ride on Dal Lake and evening market stroll. Overnight at Srinagar." },
      { day: 2, title: "Sonamarg", desc: "Full day excursion to Sonamarg — the 'meadow of gold'. Optional visit to Zero Point and Tajiwas Glacier via Union Cab. Overnight at Srinagar." },
      { day: 3, title: "Gulmarg", desc: "Transfer to Gulmarg. Visit Maharaja Palace, Strawberry Valley, and Shiv Mandir. Enjoy the thrilling Gondola Ride to Tangmarg and Khilanmarg. Overnight at Gulmarg." },
      { day: 4, title: "Gulmarg → Pahalgam", desc: "Drive to Pahalgam via Apple Valley, Kesar Valley, Kesar Market, and the famous Bat Factory. Check in and overnight at Pahalgam." },
      { day: 5, title: "Pahalgam Sightseeing", desc: "Full day Pahalgam excursion via Union Cab: Vaisaran Valley, Aru Valley, Betaab Valley, and Chandanwari. Overnight at Pahalgam." },
      { day: 6, title: "Pahalgam → Srinagar Sightseeing", desc: "After early breakfast, drive to Srinagar and check into the houseboat. Sightseeing: Shankaracharya Temple, Shalimar Bagh, Hazratbal, Chashme Shahi, Pari Mahal, and Mughal Garden. Overnight at Srinagar." },
      { day: 7, title: "Departure", desc: "Early morning: any remaining local sightseeing. After breakfast, drop at Srinagar airport. Tour ends with beautiful memories." },
    ],
    inclusions: ["All 3-star accommodation", "AC Ertiga or Innova car", "3-star houseboat (one night)", "Breakfast & dinner", "Gondola ticket", "All taxes, toll, driver charges & parking fees", "Meet & greet on arrival"],
    exclusions: ["Lunch", "Personal expenses", "Cost from natural calamities, road blockage, landslide etc.", "Medical emergency costs", "Laundry, telephone charges, room service", "Porterage, tips", "Extra luxury at hotels, extra food, extra car", "Entry fees", "Union Cab (Pahalgam, Sonamarg, Gulmarg)", "Anything not mentioned in inclusions"],
    specialities: ["Gondola ticket included — only with us", "3-star houseboat experience on Dal Lake", "AC private car throughout", "Special care for kids & senior citizens"],
  },

  /* ── 3. Keonjhar ── */
  {
    id: "keonjhar",
    planId: "plan-keonjhar",
    title: "Keonjhar Waterfalls Explorer",
    subtitle: "4 Days · 3 Nights",
    route: "Kolkata · Keonjhar · Waterfalls · Kolkata",
    price: 9000,
    duration: 4,
    departure: "23 Jul 2026",
    imageUrl: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=900&q=80",
    days: [
      { day: 1, title: "Kolkata → Keonjhar", desc: "Depart from Behala, Kolkata at around 7:30 AM by tempo traveller. Breakfast and lunch on the way. Arrive Keonjhar in the evening. Check in to hotel. Overnight stay." },
      { day: 2, title: "Khandahar Falls & Gonasika", desc: "After breakfast, visit the spectacular Khandahar Waterfalls. Visit Gonasika if time permits. Lunch on the way. Back to hotel in the evening. Dinner and overnight stay." },
      { day: 3, title: "Full Day Sightseeing", desc: "After breakfast, full day sightseeing — Bhimkund, Karanjia, Gundichaghaghi Waterfalls, Tarini Temple, and Sitabinji rock art site. After dinner, retire for the day." },
      { day: 4, title: "Sanaghaghra & Return Journey", desc: "After early breakfast, visit Sanaghaghra and Badaghaghra Waterfalls. Return journey starts at around 11:00 AM. Lunch on the way back to Kolkata." },
    ],
    inclusions: ["AC accommodation", "Tempo traveller (Kolkata to Kolkata)", "Breakfast, lunch & dinner", "All taxes, toll, driver charges & parking fees", "Efficient manager", "Own kitchen staff"],
    exclusions: ["Personal expenses", "Cost from natural calamities, road blockage etc.", "Medical emergency costs", "Laundry, telephone charges, room service", "Porterage, tips", "Extra luxury at hotels, extra food, extra car", "Entry fees", "Anything not mentioned in inclusions"],
    specialities: ["All meals by own kitchen staff", "Tempo traveller — door to door from Kolkata", "Offbeat & hidden waterfalls itinerary", "Special care for kids & senior citizens"],
  },

  /* ── 4. Ranchi · Netarhat · Patratu ── */
  {
    id: "ranchi",
    planId: "plan-ranchi",
    title: "Ranchi · Netarhat · Patratu Explorer",
    subtitle: "4 Days · 3 Nights",
    route: "Ranchi · Jonha · Dassam Falls · Netarhat · Lodh Falls · Patratu Valley",
    price: 10999,
    duration: 4,
    departure: "Departures on Request",
    imageUrl: "/gallery/ranchi/ranchi-01.jpg",
    days: [
      { day: 1, title: "Arrival at Ranchi & Local Sightseeing", desc: "Pick up from Ranchi railway station. Check in to hotel, freshen up and have breakfast. After lunch, proceed for sightseeing — Jonha Falls (also known as Gautamdhara) and Sita Falls. Return to hotel for dinner and overnight stay." },
      { day: 2, title: "Dassam Falls → Transfer to Netarhat", desc: "After breakfast, visit the magnificent Dassam Falls — one of Jharkhand's most spectacular waterfalls. Post lunch, transfer to Netarhat — the 'Queen of Chotanagpur'. Check in to hotel and overnight stay." },
      { day: 3, title: "Netarhat Sightseeing & Lodh Falls", desc: "Wake up early to catch the breathtaking Netarhat sunrise. After breakfast, explore the serene Netarhat plateau — viewpoints, forest trails, and the famous Magnolia Point. Post lunch, visit the stunning Lodh Falls (Burhaghaghri) — the highest waterfall in Jharkhand. Return to hotel for dinner and overnight stay." },
      { day: 4, title: "Return to Ranchi · Patratu Valley · Train", desc: "After early breakfast, begin the return journey to Ranchi. En route, visit the scenic Patratu Valley and Patratu Lake & Dam — a mesmerising landscape of water and rolling hills. Drop at Ranchi railway station in time for the 10:00 PM train. Tour ends with beautiful memories of Jharkhand." },
    ],
    inclusions: ["Family-wise AC accommodation", "AC traveller", "Sightseeing vehicle", "All meals (breakfast, lunch & dinner)", "All taxes, toll & driver charges", "1L mineral water per day per person", "Experienced tour manager"],
    exclusions: ["Train fare", "Personal expenses", "Cost from natural calamities, road blockage etc.", "Medical emergency costs", "Laundry, telephone charges, room service", "Porterage, tips", "Entry fees at monuments", "Anything not mentioned in inclusions"],
    specialities: ["AC traveller — comfortable & spacious", "All meals included throughout", "Netarhat sunrise experience", "Highest waterfall in Jharkhand — Lodh Falls", "Special care for kids & senior citizens"],
  },

  /* ── 5. Arunachal Pradesh ── */
  {
    id: "arunachal",
    planId: "plan-arunachal",
    title: "Arunachal Hidden Trails",
    subtitle: "7 Days · 6 Nights",
    route: "Guwahati · Shergaon · Dirang · Tawang · Bumla Pass · Bomdila · Guwahati",
    price: 22000,
    duration: 7,
    departure: "Departures on Request",
    imageUrl: "/gallery/arunachal/arunachal-09.jpg",
    days: [
      { day: 1, title: "Guwahati → Shergaon", desc: "May offer puja at Kamakhya Mandir (if time permits). Proceed towards Shergaon through the stunning Assam countryside — enjoy the beauty of lush tea gardens and the vast Brahmaputra river view. Lunch en route. Arrive Shergaon, check in, dinner and overnight stay." },
      { day: 2, title: "Shergaon → Dirang", desc: "Early breakfast, proceed towards Dirang through the breathtaking Arunachal landscapes. En route sightseeing: Tipi Orchidarium (one of Asia's finest orchid gardens), scenic waterfalls & pine forests, and a natural Hot Water Spring. Lunch en route. Arrive Dirang by evening — free for leisure. Dinner and overnight stay at Dirang." },
      { day: 3, title: "Dirang → Tawang via Sela Pass", desc: "Early breakfast, start early. Drive through one of the most spectacular mountain roads in India. En route: Sela Pass (13,700 ft — one of the highest motorable passes in the world) and serene Sela Lake, Jaswant Garh War Memorial (tribute to the 1962 Indo-China war), and the beautiful Jang Waterfall. Arrive Tawang by evening. Check in, freshen up, dinner and overnight stay." },
      { day: 4, title: "Tawang Local Sightseeing", desc: "After breakfast, full day local sightseeing: Tawang Monastery — the largest monastery in India and second largest in the world (400-year-old Gelug school of Tibetan Buddhism), Tawang War Memorial, Craft Centre & local market, Urgeling Monastery — the sacred birthplace of the 6th Dalai Lama. Evening free for exploring the local market. Dinner and overnight stay." },
      { day: 5, title: "Bumla Pass & Madhuri Lake (Weather Permitting)", desc: "Early morning start (depends on weather and army clearance). Visit: Bumla Pass — the India–China border at 15,200 ft (subject to army permission & weather conditions — Complimentary), Madhuri Lake (PT Tso) — a hauntingly beautiful glacial lake made famous by Bollywood, and Sangetsar Lake. Return to Tawang for evening leisure and rest. Dinner and overnight stay." },
      { day: 6, title: "Tawang → Bomdila", desc: "After breakfast, proceed towards Bomdila through scenic mountain roads. Visit: Bomdila Monastery — a peaceful Buddhist monastery with stunning valley views, Craft Centre & local market, Bomdila View Point — panoramic Himalayan vistas. Evening free for leisure. Dinner and overnight stay at Bomdila." },
      { day: 7, title: "Bomdila → Guwahati (Return Train)", desc: "After breakfast, begin the journey back to Guwahati for your return train home. Lunch en route. Drop at Guwahati railway station. Tour ends with beautiful memories of India's last frontier." },
    ],
    inclusions: ["Deluxe accommodation throughout", "Comfortable tempo traveller throughout", "All meals (breakfast, lunch & dinner)", "Experienced driver & guide", "Efficient tour manager", "1L mineral water per person per day", "All parking, permits, taxes & toll charges", "Bumla Pass visit (Complimentary — subject to conditions)"],
    exclusions: ["Train / flight fare", "Train food", "Entry fees at monuments", "Personal expenses", "Costs from natural calamities, road blockage, landslide etc.", "Laundry, telephone charges, room service", "Porterage, tips, puja charges", "Extra luxury at hotels, extra food, extra car", "Ropeway charges (if any)", "Jungle safari", "Anything not mentioned in inclusions"],
    specialities: ["Bumla Pass (India–China border) — Complimentary", "Tawang Monastery — largest in India", "Sela Pass at 13,700 ft — high-altitude experience", "Preliminary first aid support throughout", "Special care for kids & senior citizens", "Registered company — CE No: 004617102116"],
  },
];

/* ─── Component ─────────────────────────────────────────── */

function TourCard({ tour }: { tour: typeof tours[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div id={tour.id} style={{ marginBottom: "2rem", scrollMarginTop: "100px" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: open ? "6px 6px 0 0" : 6, overflow: "hidden" }}>
        <div style={{ padding: "2.5rem 2.5rem 2rem", textAlign: "center", color: "white" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "0.75rem" }}>
            {tour.subtitle}
          </span>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 300, marginBottom: "0.6rem", lineHeight: 1.1 }}>
            {tour.title.split(" ").map((w, i) => i === 0 ? <em key={i} style={{ fontStyle: "italic", color: "#60a5fa" }}>{w} </em> : w + " ")}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", marginBottom: "1.75rem" }}>{tour.route}</p>

          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.75rem" }}>
            {[["Departure", tour.departure], ["Duration", `${tour.duration} Days`], ["Package Cost", `₹${tour.price.toLocaleString("en-IN")} / person`]].map(([label, value]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.25rem" }}>{label}</p>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", color: "white", fontWeight: 400 }}>{value}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <BookTourButton planId={tour.planId} title={tour.title} destination={tour.route.split(" · ")[0]} imageUrl={tour.imageUrl} price={tour.price} duration={tour.duration} />
            <a href="tel:+919903149484" style={{ background: "rgba(255,255,255,0.08)", color: "white", padding: "0.8rem 2rem", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2, border: "1px solid rgba(255,255,255,0.15)" }}>
              Call Us
            </a>
          </div>
        </div>

        {/* Toggle */}
        <button onClick={() => setOpen(o => !o)} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "none", borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", padding: "0.85rem 2rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", transition: "background 0.2s" }}>
          <span>{open ? "Hide Details" : "View Full Itinerary"}</span>
          <span style={{ fontSize: "0.9rem", transition: "transform 0.3s", display: "inline-block", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
        </button>
      </div>

      {/* Collapsible body */}
      <div style={{ overflow: "hidden", maxHeight: open ? "9999px" : "0", transition: "max-height 0.5s ease", background: "white", border: open ? "1px solid #e2e8f0" : "none", borderTop: "none", borderRadius: "0 0 6px 6px" }}>
        <div style={{ padding: "2.5rem 2rem" }}>

          {/* Days */}
          <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 300, color: "#0f172a", marginBottom: "1.5rem", textAlign: "center" }}>
            Day-by-Day <em style={{ fontStyle: "italic", color: "var(--sky)" }}>Itinerary</em>
          </h3>
          {tour.days.map((d, i) => (
            <div key={i} style={{ display: "flex", gap: "1.25rem", marginBottom: "0.9rem", alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, width: 48, height: 48, borderRadius: "50%", background: "var(--sky)", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "0.58rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 700, lineHeight: 1 }}>{d.day}</span>
                <span style={{ opacity: 0.8 }}>Day</span>
              </div>
              <div style={{ flex: 1, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 4, padding: "0.9rem 1.1rem" }}>
                <h4 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", fontWeight: 600, color: "#0f172a", marginBottom: "0.25rem" }}>{d.title}</h4>
                <p style={{ fontSize: "0.84rem", color: "#64748b", lineHeight: 1.75 }}>{d.desc}</p>
              </div>
            </div>
          ))}

          {/* Inclusions & Exclusions */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem", margin: "2rem 0" }}>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 4, padding: "1.5rem" }}>
              <h4 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", color: "#15803d", marginBottom: "0.9rem" }}>✅ What&apos;s Included</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                {tour.inclusions.map((item, i) => <li key={i} style={{ fontSize: "0.84rem", color: "#166534", display: "flex", gap: "0.5rem" }}><span style={{ color: "#16a34a", flexShrink: 0 }}>✓</span>{item}</li>)}
              </ul>
            </div>
            <div style={{ background: "#fff7f7", border: "1px solid #fecaca", borderRadius: 4, padding: "1.5rem" }}>
              <h4 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", color: "#b91c1c", marginBottom: "0.9rem" }}>❌ Not Included</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                {tour.exclusions.map((item, i) => <li key={i} style={{ fontSize: "0.84rem", color: "#991b1b", display: "flex", gap: "0.5rem" }}><span style={{ flexShrink: 0 }}>✕</span>{item}</li>)}
              </ul>
            </div>
          </div>

          {/* Specialities */}
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 4, padding: "1.25rem 1.5rem", marginBottom: "1.25rem" }}>
            <h4 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", color: "#1d4ed8", marginBottom: "0.75rem" }}>🔷 Our Speciality</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {tour.specialities.map((item, i) => <span key={i} style={{ background: "white", border: "1px solid #bfdbfe", color: "#1e40af", fontSize: "0.78rem", padding: "0.3rem 0.85rem", borderRadius: 20, fontWeight: 500 }}>{item}</span>)}
            </div>
          </div>

          <div style={{ background: "#fefce8", border: "1px solid #fef08a", borderRadius: 4, padding: "0.9rem 1.1rem", marginBottom: "1.5rem", fontSize: "0.83rem", color: "#854d0e" }}>
            <strong>Note:</strong> Itinerary may be altered under specified circumstances. Our team will keep you informed of any changes.
          </div>

          {/* Contact footer */}
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 4, padding: "1.25rem 1.5rem", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "0.25rem" }}>📞 +91 99031 49484 · +91 98304 03095 · +91 70038 56019</p>
              <p style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "0.25rem" }}>📧 simanaperiyet@gmail.com</p>
              <p style={{ fontSize: "0.7rem", color: "#94a3b8" }}>CE No: 004617102116 · MSME: UDYAM-WB-10-0185262 · GST: 19AORPA8912NIZA</p>
            </div>
            <BookTourButton planId={tour.planId} title={tour.title} destination={tour.route.split(" · ")[0]} imageUrl={tour.imageUrl} price={tour.price} duration={tour.duration} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ItineraryPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", padding: "110px 5% 6rem", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748b", display: "block", marginBottom: "0.75rem" }}>Detailed Plans</span>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 300, color: "#0f172a", marginBottom: "0.75rem" }}>
            Our Tour <em style={{ fontStyle: "italic", color: "var(--sky)" }}>Itineraries</em>
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem", maxWidth: 520, margin: "0 auto" }}>Click any tour below to view the full day-by-day plan, inclusions, and book your spot.</p>
        </div>

        {tours.map(tour => <TourCard key={tour.id} tour={tour} />)}

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/#destinations" style={{ background: "transparent", color: "#0f172a", padding: "0.8rem 2rem", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid #e2e8f0", textDecoration: "none", borderRadius: 2 }}>
            ← All Destinations
          </Link>
        </div>
      </div>
    </>
  );
}
