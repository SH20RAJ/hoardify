import { db } from "./index";
import { hoardings } from "./schema";
import { HOARDINGS } from "@/lib/mock-data";

async function seed() {
	console.log("🌱 Seeding database...");
	
	for (const hoarding of HOARDINGS) {
		await db.insert(hoardings).values({
			title: hoarding.title,
			imageUrl: hoarding.imageUrl,
			price: hoarding.price,
			location: hoarding.location,
			lat: hoarding.coordinates.lat.toString(),
			lng: hoarding.coordinates.lng.toString(),
			views: hoarding.views || "0",
			status: hoarding.status,
			features: hoarding.features || [],
		});
	}
	
	console.log("✅ Seeding completed!");
	process.exit(0);
}

seed().catch((err) => {
	console.error("❌ Seeding failed:", err);
	process.exit(1);
});
