import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const hashed = await bcrypt.hash("admin123", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@wanderlust.travel" },
    update: {},
    create: { email: "admin@wanderlust.travel", password: hashed, name: "Admin" },
  });

  // Travel plans
  const plans = [
    {
      title: "Kashmir Valley Splendour",
      destination: "Kashmir",
      region: "India",
      description: "Float on a shikara across Dal Lake, wake to snow-capped peaks, and lose yourself in Mughal gardens.",
      longDesc: "Experience the paradise on earth with our carefully curated Kashmir package. Stay in luxurious houseboats on Dal Lake, explore the iconic Mughal Gardens, take a day trip to Gulmarg for skiing or meadow walks, and visit the ancient temples of Shankaracharya. Our expert local guides ensure an authentic experience every step of the way.",
      price: 45000,
      duration: 7,
      maxPeople: 15,
      imageUrl: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=900&q=80",
      badge: "Bestseller",
      inclusions: JSON.stringify(["Houseboat accommodation", "All meals", "Shikara ride", "Gulmarg day trip", "Airport transfers", "Local guide"]),
      departureDate: new Date("2026-06-15"),
      isActive: true,
    },
    {
      title: "Nepal Everest Base Camp Trek",
      destination: "Kathmandu & Everest",
      region: "Nepal",
      description: "Stand at the foot of the world's highest peak on this legendary Himalayan adventure.",
      longDesc: "The Everest Base Camp trek is one of the world's greatest adventures. Starting from Lukla, you'll trek through Sherpa villages, rhododendron forests, and across suspension bridges draped in prayer flags. Our experienced sherpas ensure your safety and comfort throughout the 10-day journey.",
      price: 55000,
      duration: 10,
      maxPeople: 12,
      imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&q=80",
      badge: null,
      inclusions: JSON.stringify(["Teahouse accommodation", "All meals during trek", "Sherpa guides", "Porter services", "All permits", "Kathmandu hotel"]),
      departureDate: new Date("2026-09-01"),
      isActive: true,
    },
    {
      title: "Arunachal Hidden Trails",
      destination: "Arunachal Pradesh",
      region: "India",
      description: "Journey into India's unexplored northeast — tribal culture, misty valleys, and ancient monasteries await.",
      longDesc: "Arunachal Pradesh remains one of India's best-kept secrets. This package takes you through Tawang with its spectacular monastery, the living-root bridges of Ziro Valley, and the remote tribal villages of Namdapha. Inner Line Permits are fully arranged for you.",
      price: 38000,
      duration: 8,
      maxPeople: 10,
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80",
      badge: "New",
      inclusions: JSON.stringify(["All accommodation", "All meals", "Inner Line Permits", "Local guide", "All transfers", "Monastery entry fees"]),
      departureDate: new Date("2026-10-10"),
      isActive: true,
    },
    {
      title: "Goa Sun & Soul Retreat",
      destination: "Goa",
      region: "India",
      description: "Golden beaches, Portuguese architecture, and legendary nightlife — Goa has everything.",
      longDesc: "Our Goa package is the perfect blend of relaxation and exploration. Stay at a boutique beach resort in North Goa, take a spice plantation tour, explore the UNESCO-listed Old Goa churches, enjoy a sunset cruise on the Mandovi River, and savour the finest seafood the coast has to offer.",
      price: 22000,
      duration: 5,
      maxPeople: 20,
      imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=700&q=80",
      badge: null,
      inclusions: JSON.stringify(["Beach resort stay", "Breakfast daily", "Spice plantation tour", "Sunset cruise", "Airport transfers"]),
      departureDate: new Date("2026-12-20"),
      isActive: true,
    },
    {
      title: "Bali Island of the Gods",
      destination: "Bali",
      region: "Indonesia",
      description: "Sacred temples, emerald rice terraces, and world-class surf — Bali is unlike anywhere else on earth.",
      longDesc: "Immerse yourself in Bali's spiritual heartbeat. Visit the sacred Tanah Lot temple at sunset, cycle through emerald rice terraces in Ubud, take a traditional Balinese cooking class, and relax in a private pool villa. Our Bali package is perfect for couples, families, and solo travellers alike.",
      price: 65000,
      duration: 7,
      maxPeople: 15,
      imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=80",
      badge: null,
      inclusions: JSON.stringify(["Private pool villa", "Daily breakfast", "Temple tours", "Cooking class", "Rice terrace cycling", "Airport transfers"]),
      departureDate: new Date("2026-07-05"),
      isActive: true,
    },
  ];

  for (const plan of plans) {
    await prisma.travelPlan.create({ data: plan });
  }

  console.log("✅ Seed complete — admin: admin@wanderlust.travel / admin123");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
