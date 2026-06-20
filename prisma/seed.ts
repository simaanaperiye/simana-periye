import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const hashed = await bcrypt.hash("admin123", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@simanaperiye.travel" },
    update: {},
    create: { email: "admin@simanaperiye.travel", password: hashed, name: "Admin" },
  });

  // Clear existing plans to avoid duplicates on re-seed
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.travelPlan.deleteMany({});

  // Travel plans — fixed IDs so itinerary links and cart always work
  const plans = [
    {
      id: "plan-kashmir",
      title: "Kashmir Valley Splendour",
      destination: "Kashmir",
      region: "India",
      description: "Float on a shikara across Dal Lake, wake to snow-capped peaks, and lose yourself in Mughal gardens.",
      longDesc: "Experience the paradise on earth with our carefully curated Kashmir package. Stay in luxurious houseboats on Dal Lake, explore the iconic Mughal Gardens, take a day trip to Gulmarg for the Gondola ride, and visit Shankaracharya temple, Shalimar Bagh and Mughal Gardens. AC Ertiga/Innova car provided throughout.",
      price: 22500,
      duration: 7,
      maxPeople: 15,
      imageUrl: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=900&q=80",
      badge: "Bestseller",
      inclusions: JSON.stringify(["3-star accommodation", "AC Ertiga / Innova car", "3-star houseboat (1 night)", "Breakfast & dinner", "Gondola ticket", "All taxes, toll & parking"]),
      departureDate: new Date("2026-06-15"),
      isActive: true,
    },
    {
      id: "plan-everest",
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
      id: "plan-arunachal",
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
      id: "plan-spiti",
      title: "Spiti Valley Expedition",
      destination: "Spiti Valley",
      region: "India",
      description: "Ancient monasteries, lunar landscapes, and Himalayan villages frozen in time — Spiti is India's hidden high-altitude gem.",
      longDesc: "Journey into the remote Spiti Valley, a cold desert mountain valley nestled in the Himalayas. Visit the ancient Ki Monastery perched on a hilltop, explore the fossil-rich Langza village, marvel at the world's highest inhabited villages, and stargaze under some of the clearest night skies on earth.",
      price: 32000,
      duration: 8,
      maxPeople: 12,
      imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&q=80",
      badge: "New",
      inclusions: JSON.stringify(["All accommodation", "All meals", "Tempo traveller", "Experienced guide", "Inner Line Permits", "All transfers"]),
      departureDate: new Date("2026-08-10"),
      isActive: true,
    },
    {
      id: "plan-bangkok",
      title: "Bangkok City & Temples",
      destination: "Bangkok",
      region: "Thailand",
      description: "Glittering temples, vibrant street food, floating markets, and pulsating nightlife — Bangkok never sleeps.",
      longDesc: "Discover the magic of Bangkok with our curated city tour. Visit the majestic Grand Palace and Wat Phra Kaew, cruise the Chao Phraya river to see Wat Arun at golden hour, explore the famous floating markets, and indulge in authentic Thai street food throughout.",
      price: 48000,
      duration: 6,
      maxPeople: 15,
      imageUrl: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=900&q=80",
      badge: "New",
      inclusions: JSON.stringify(["Hotel accommodation", "Daily breakfast", "Grand Palace entry", "River cruise", "Floating market tour", "Airport transfers", "Tour guide"]),
      departureDate: new Date("2026-11-15"),
      isActive: true,
    },
    {
      id: "plan-vietnam",
      title: "Vietnam Discovery Tour",
      destination: "Vietnam",
      region: "Vietnam",
      description: "Ha Long Bay's emerald waters, Hoi An's lantern-lit streets, and Hanoi's timeless charm — Vietnam is endlessly beautiful.",
      longDesc: "Explore the breathtaking diversity of Vietnam on this immersive tour. Cruise through the UNESCO-listed Ha Long Bay on a traditional junk boat, wander the ancient streets of Hoi An at dusk, explore the imperial city of Hue, and soak up the energy of vibrant Hanoi.",
      price: 58000,
      duration: 9,
      maxPeople: 14,
      imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=80",
      badge: null,
      inclusions: JSON.stringify(["All hotel stays", "Ha Long Bay cruise", "Daily breakfast", "Internal flights", "Tour guide", "Airport transfers", "Hoi An lantern walk"]),
      departureDate: new Date("2026-10-01"),
      isActive: true,
    },
    {
      id: "plan-muktinath",
      title: "Nepal with Muktinath Darshan",
      destination: "Nepal",
      region: "Nepal",
      description: "Pokhara's serene lakes, Jomsom's high-altitude drama, and the sacred Muktinath temple — a soul-stirring Himalayan pilgrimage.",
      longDesc: "Travel from Raxaul through the stunning landscapes of Nepal — Pokhara's Fewa Lake, the mountain road to Jomsom, and the sacred Muktinath temple at 3,710m. Return via Manakamana and explore Kathmandu's temples, Bhaktapur Durbar Square, and the Nagarkot sunset. All meals by our own kitchen staff.",
      price: 22000,
      duration: 9,
      maxPeople: 20,
      imageUrl: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=900&q=80",
      badge: "Popular",
      inclusions: JSON.stringify(["Deluxe accommodation", "All meals (own kitchen)", "AC bus", "Muktinath permit", "Tour guide", "Tour manager", "All toll & parking"]),
      departureDate: new Date("2026-11-06"),
      isActive: true,
    },
    {
      id: "plan-keonjhar",
      title: "Keonjhar Waterfalls Explorer",
      destination: "Keonjhar",
      region: "Odisha",
      description: "Hidden waterfalls, ancient temples, and lush tribal landscapes — Keonjhar is Odisha's best-kept secret.",
      longDesc: "Journey from Kolkata into the tribal heartland of Keonjhar, Odisha. Visit the thundering Khandahar Falls, the mystical Bhimkund, Gundichaghaghi and Badasaghara waterfalls, the revered Tarini temple, and the ancient rock art at Sitabinji. All meals prepared by our own kitchen staff. Tempo traveller from Kolkata.",
      price: 9000,
      duration: 4,
      maxPeople: 20,
      imageUrl: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=900&q=80",
      badge: "New",
      inclusions: JSON.stringify(["AC accommodation", "Tempo traveller (Kolkata–Kolkata)", "All meals (own kitchen)", "All toll, driver charges & taxes", "Efficient manager"]),
      departureDate: new Date("2026-07-23"),
      isActive: true,
    },
  ];

  await prisma.travelPlan.createMany({ data: plans });

  console.log("✅ Seed complete — 8 plans seeded");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
