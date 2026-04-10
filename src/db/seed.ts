import { db } from "./index";
import { hoardings } from "./schema";

async function seed() {
	console.log("🌱 Seeding database...");

	const sampleHoardings = [
		{
			title: "Ranchi Main Road Junction",
			imageUrl: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=2070&auto=format&fit=crop",
			price: 4500,
			location: "Main Road, Ranchi",
			lat: "23.344101",
			lng: "85.309562",
			views: "45",
			status: "For Rent" as const,
			features: ["LED Integrated", "High-Traffic", "24/7 Visibility"],
		},
		{
			title: "Lalpur Chowk Digital Billboard",
			imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2070&auto=format&fit=crop",
			price: 6200,
			location: "Lalpur, Ranchi",
			lat: "23.374201",
			lng: "85.334562",
			views: "120",
			status: "For Rent" as const,
			features: ["Digital", "Retail Focus", "Animated Content"],
		},
		{
			title: "Albert Ekka Chowk Prime",
			imageUrl: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=2020&auto=format&fit=crop",
			price: 8500,
			location: "Kutchery Road, Ranchi",
			lat: "23.364101",
			lng: "85.324562",
			views: "210",
			status: "Booked" as const,
			features: ["Oversized", "City Center", "Premium Lighting"],
		},
		{
			title: "Kanke Road Executive Transit",
			imageUrl: "https://images.unsplash.com/photo-1617478759367-e7e00305a41d?q=80&w=2070&auto=format&fit=crop",
			price: 3800,
			location: "Kanke Road, Ranchi",
			lat: "23.384101",
			lng: "85.314562",
			views: "28",
			status: "For Rent" as const,
			features: ["Commuter Focus", "Green Surroundings"],
		},
		{
			title: "Doranda Corporate Hub",
			imageUrl: "https://images.unsplash.com/photo-1522071823991-b99c223004be?q=80&w=2070&auto=format&fit=crop",
			price: 5500,
			location: "Doranda, Ranchi",
			lat: "23.334101",
			lng: "85.334562",
			views: "85",
			status: "For Rent" as const,
			features: ["Corporate Audience", "Evening Lighting"],
		},
		{
			title: "Hinoo Airport Road Billboard",
			imageUrl: "https://images.unsplash.com/photo-1540331547168-8b63109225b7?q=80&w=2038&auto=format&fit=crop",
			price: 4900,
			location: "Hinoo, Ranchi",
			lat: "23.314101",
			lng: "85.324562",
			views: "32",
			status: "Maintenance" as const,
			features: ["Airport Entrance", "High-Net-Worth"],
		},
	];

	for (const data of sampleHoardings) {
		await db.insert(hoardings).values(data);
	}

	console.log("✅ Seeding complete!");
}

seed().catch(console.error);
