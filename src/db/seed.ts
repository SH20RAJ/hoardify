import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

async function seed() {
	console.log("🔍 Checking existing data...");

	const existingHoardings = await db.select().from(schema.hoardings);
	console.log(`   Found ${existingHoardings.length} hoardings`);

	const existingEnquiries = await db.select().from(schema.enquiries);
	console.log(`   Found ${existingEnquiries.length} enquiries`);

	// Add more hoardings if we have fewer than 10
	if (existingHoardings.length < 10) {
		console.log("\n🌱 Adding more hoardings to inventory...");

		const extraHoardings = [
			{
				title: "Kanke Road Large Format - Near Airport",
				imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format",
				price: 35000,
				location: "Kanke Road, Ranchi",
				lat: "23.3970580",
				lng: "85.3219430",
				views: "8.7K daily",
				status: "For Rent" as const,
				features: ["Backlit", "Airport Traffic", "50x25 ft", "Unobstructed View"],
			},
			{
				title: "Harmu Bypass Mega Hoarding",
				imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format",
				price: 55000,
				location: "Harmu Bypass, Ranchi",
				lat: "23.3689870",
				lng: "85.3069530",
				views: "15.1K daily",
				status: "For Rent" as const,
				features: ["Mega Format", "Highway Visibility", "60x30 ft", "Both Sides"],
			},
			{
				title: "Firayalal Chowk Premium LED Wall",
				imageUrl: "https://images.unsplash.com/photo-1495521939206-a217db9df264?w=800&auto=format",
				price: 85000,
				location: "Firayalal Chowk, Ranchi",
				lat: "23.3551720",
				lng: "85.3327140",
				views: "25.8K daily",
				status: "For Rent" as const,
				features: ["LED Wall", "Prime Location", "40x30 ft", "Video Capable"],
			},
			{
				title: "Circular Road Gantry - Dual Sided",
				imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format",
				price: 58000,
				location: "Circular Road, Ranchi",
				lat: "23.3605890",
				lng: "85.3191240",
				views: "14.7K daily",
				status: "For Rent" as const,
				features: ["Gantry", "Dual Sided", "50x10 ft", "Road Span"],
			},
			{
				title: "Kadru NH-33 Highway Mega Board",
				imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format",
				price: 48000,
				location: "Kadru, NH-33, Ranchi",
				lat: "23.3340910",
				lng: "85.3483280",
				views: "11.9K daily",
				status: "For Rent" as const,
				features: ["National Highway", "Long Distance Visibility", "60x20 ft", "Illuminated"],
			},
			{
				title: "Dhurwa Industrial Road Display",
				imageUrl: "https://images.unsplash.com/photo-1464938050520-ef2571e0d6e4?w=800&auto=format",
				price: 22000,
				location: "Dhurwa, Ranchi",
				lat: "23.4097830",
				lng: "85.3229510",
				views: "5.4K daily",
				status: "For Rent" as const,
				features: ["Industrial Zone", "Truck Route", "40x20 ft", "Budget Friendly"],
			},
		];

		await db.insert(schema.hoardings).values(extraHoardings);
		console.log(`   ✅ Inserted ${extraHoardings.length} additional hoardings`);
	}

	// Always seed enquiries if empty
	if (existingEnquiries.length === 0) {
		console.log("\n🌱 Seeding sample enquiries...");

		// Get first few hoarding IDs
		const hoardingIds = (await db.select({ id: schema.hoardings.id }).from(schema.hoardings)).map(h => h.id);

		const enquiriesData = [
			{
				hoardingId: hoardingIds[0],
				name: "Rohit Sharma",
				phone: "+91 9876543210",
				email: "rohit@example.com",
				message: "Interested in booking this billboard for a 3-month retail campaign. Please share availability.",
				status: "New" as const,
			},
			{
				hoardingId: hoardingIds[1] || hoardingIds[0],
				name: "Priya Enterprises",
				phone: "+91 9812345678",
				email: "priya@enterprises.com",
				message: "We need the display for our product launch in July. Can you share pricing for 1 month?",
				status: "Contacted" as const,
			},
			{
				hoardingId: hoardingIds[2] || hoardingIds[0],
				name: "City Hospital Marketing",
				phone: "+91 7890123456",
				email: "marketing@cityhospital.com",
				message: "Looking for annual booking for health awareness campaign. Budget is flexible.",
				status: "New" as const,
			},
			{
				hoardingId: hoardingIds[3] || hoardingIds[0],
				name: "Raj Developers",
				phone: "+91 8901234567",
				email: "sales@rajdevelopers.in",
				message: "Need this space for our upcoming real estate project launch. 2-month duration.",
				status: "New" as const,
			},
			{
				hoardingId: hoardingIds[0],
				name: "Metro Coaching Centre",
				phone: "+91 6789012345",
				email: "admin@metrocoaching.in",
				message: "Want to advertise our new batch starting in August. Looking for premium visibility.",
				status: "Closed" as const,
			},
		];

		await db.insert(schema.enquiries).values(enquiriesData);
		console.log(`   ✅ Inserted ${enquiriesData.length} enquiries`);
	}

	// Final count
	const finalHoardings = await db.select().from(schema.hoardings);
	const finalEnquiries = await db.select().from(schema.enquiries);
	console.log(`\n📊 Final state: ${finalHoardings.length} hoardings, ${finalEnquiries.length} enquiries`);
	console.log("🎉 Database is ready!");

	await client.end();
}

seed().catch((err) => {
	console.error("❌ Seed failed:", err);
	process.exit(1);
});
