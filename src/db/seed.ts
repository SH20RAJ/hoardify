import { db } from "./index";
import { hoardings, enquiries, messages } from "./schema";

const BILLBOARD_IMAGES = [
	"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
	"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
	"https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
	"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
	"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
	"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
	"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
	"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
	"https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
	"https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
	"https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
	"https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&q=80",
];

// Extra photos per hoarding (3-5 angles/views)
const EXTRA_IMAGES_POOL = [
	"https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80",
	"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
	"https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
	"https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
	"https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800&q=80",
	"https://images.unsplash.com/photo-1470723710355-95304d8aece4?w=800&q=80",
	"https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
	"https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&q=80",
	"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
	"https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80",
	"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
	"https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
];

function getExtraImages(index: number, count: number): string[] {
	const start = (index * 3) % EXTRA_IMAGES_POOL.length;
	const imgs: string[] = [];
	for (let i = 0; i < count; i++) {
		imgs.push(EXTRA_IMAGES_POOL[(start + i) % EXTRA_IMAGES_POOL.length]);
	}
	return imgs;
}

const SEED_HOARDINGS = [
	{
		title: "Albert Ekka Chowk Prime",
		imageUrl: BILLBOARD_IMAGES[0],
		price: 45000,
		location: "Kutchery Road, Ranchi",
		lat: "23.3567",
		lng: "85.3340",
		views: "125K",
		status: "For Rent" as const,
		features: ["Oversized", "City Center", "Premium Lighting", "High-Traffic"],
		videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	},
	{
		title: "Kanke Road LED Wall",
		imageUrl: BILLBOARD_IMAGES[1],
		price: 82000,
		location: "Kanke Road, Near Raj Bhavan",
		lat: "23.3730",
		lng: "85.3200",
		views: "210K",
		status: "Booked" as const,
		features: ["LED Integrated", "24/7 Visibility", "WiFi Enabled", "Digital"],
		videoUrl: null,
	},
	{
		title: "Lalpur Flyover Gantry",
		imageUrl: BILLBOARD_IMAGES[2],
		price: 65000,
		location: "Lalpur Chowk, Ranchi",
		lat: "23.3650",
		lng: "85.3350",
		views: "180K",
		status: "For Rent" as const,
		features: ["Gantry", "Double-Sided", "Highway Facing", "Reflective"],
		videoUrl: null,
	},
	{
		title: "Ratu Road Unipole",
		imageUrl: BILLBOARD_IMAGES[3],
		price: 38000,
		location: "Ratu Road, Near Mall",
		lat: "23.3780",
		lng: "85.3100",
		views: "95K",
		status: "For Rent" as const,
		features: ["Unipole", "Shopping District", "Backlit"],
		videoUrl: null,
	},
	{
		title: "Dhurwa Digital Display",
		imageUrl: BILLBOARD_IMAGES[4],
		price: 55000,
		location: "Dhurwa, HEC Colony",
		lat: "23.3900",
		lng: "85.3100",
		views: "78K",
		status: "Maintenance" as const,
		features: ["Digital Screen", "Scheduled Rotation"],
		videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
	},
	{
		title: "Harmu Bypass Billboard",
		imageUrl: BILLBOARD_IMAGES[5],
		price: 72000,
		location: "Harmu Housing Colony",
		lat: "23.3620",
		lng: "85.3050",
		views: "156K",
		status: "For Rent" as const,
		features: ["Bypass Road", "High Speed Traffic", "Oversized", "Premium"],
		videoUrl: null,
	},
	{
		title: "Doranda Bus Stand Hoarding",
		imageUrl: BILLBOARD_IMAGES[6],
		price: 22000,
		location: "Doranda, Near Bus Terminal",
		lat: "23.3440",
		lng: "85.3250",
		views: "64K",
		status: "For Rent" as const,
		features: ["Transit Hub", "Commuter Facing"],
		videoUrl: null,
	},
	{
		title: "Morabadi Hill View",
		imageUrl: BILLBOARD_IMAGES[7],
		price: 48000,
		location: "Morabadi Ground Area",
		lat: "23.3680",
		lng: "85.3520",
		views: "88K",
		status: "For Rent" as const,
		features: ["Scenic Location", "Tourist Zone", "Backlit"],
		videoUrl: null,
	},
	{
		title: "Firayalal Chowk Junction",
		imageUrl: BILLBOARD_IMAGES[8],
		price: 85000,
		location: "Firayalal Chowk, Main Road",
		lat: "23.3530",
		lng: "85.3300",
		views: "260K",
		status: "Booked" as const,
		features: ["Prime Junction", "4-Way Visibility", "LED Integrated", "Premium"],
		videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
	},
	{
		title: "Birsa Chowk Gateway",
		imageUrl: BILLBOARD_IMAGES[9],
		price: 62000,
		location: "Birsa Chowk, Station Road",
		lat: "23.3470",
		lng: "85.3170",
		views: "190K",
		status: "For Rent" as const,
		features: ["Railway Station", "Tourist Entry", "City Gateway"],
		videoUrl: null,
	},
	{
		title: "Kadru Bridge Approach",
		imageUrl: BILLBOARD_IMAGES[10],
		price: 34000,
		location: "Kadru, Bridge Approach Road",
		lat: "23.3510",
		lng: "85.3400",
		views: "72K",
		status: "For Rent" as const,
		features: ["Bridge Approach", "Government Area"],
		videoUrl: null,
	},
	{
		title: "Piska More Ring Road",
		imageUrl: BILLBOARD_IMAGES[11],
		price: 28000,
		location: "Piska More, Ring Road",
		lat: "23.3400",
		lng: "85.2900",
		views: "54K",
		status: "For Rent" as const,
		features: ["Ring Road", "Budget Friendly", "High Reach"],
		videoUrl: null,
	},
];

async function seed() {
	console.log("🌱 Seeding database...\n");

	// Clear existing data in correct order (respect FK constraints)
	console.log("  Clearing old data...");
	await db.delete(messages);
	await db.delete(enquiries);
	await db.delete(hoardings);

	// Insert hoardings with multi-image data
	console.log("  Inserting hoardings...");
	const insertedHoardings = [];
	for (let i = 0; i < SEED_HOARDINGS.length; i++) {
		const h = SEED_HOARDINGS[i];
		const extraImages = getExtraImages(i, 3 + (i % 3)); // 3 to 5 extra images
		const result = await db.insert(hoardings).values({
			...h,
			images: extraImages,
		}).returning({ id: hoardings.id });
		insertedHoardings.push(result[0]);
	}
	console.log(`  ✓ ${insertedHoardings.length} hoardings inserted\n`);

	// Insert enquiries with various statuses
	console.log("  Inserting enquiries...");
	const enquiryData = [
		{ hoardingId: insertedHoardings[0].id, name: "Rahul Sharma", phone: "+91 9876543210", email: "rahul@example.com", message: "Interested in a 3-month campaign for our new product launch.", status: "New" as const },
		{ hoardingId: insertedHoardings[1].id, name: "Priya Gupta", phone: "+91 9988776655", email: "priya.g@agency.com", message: "Can we get a custom size for this LED wall? Need 20x10 ft.", status: "Contacted" as const },
		{ hoardingId: insertedHoardings[2].id, name: "Amit Kumar", phone: "+91 8765432109", email: "amit@startup.io", message: "Looking for a 6-month booking with installment options.", status: "New" as const },
		{ hoardingId: insertedHoardings[4].id, name: "Sneha Patel", phone: "+91 7654321098", email: "sneha@brand.com", message: "Is there digital scheduling available? We need 4 different creatives rotating.", status: "Closed" as const },
		{ hoardingId: insertedHoardings[8].id, name: "Vikram Singh", phone: "+91 9123456789", email: "vikram@media.co", message: "Premium spot — need pricing for annual contract.", status: "Contacted" as const },
	];

	const insertedEnquiries = [];
	for (const e of enquiryData) {
		const result = await db.insert(enquiries).values(e).returning({ id: enquiries.id });
		insertedEnquiries.push(result[0]);
	}
	console.log(`  ✓ ${insertedEnquiries.length} enquiries inserted\n`);

	// Insert sample messages for conversations
	console.log("  Inserting sample messages...");
	const messageData = [
		// Conversation 1: Rahul's enquiry
		{ enquiryId: insertedEnquiries[0].id, senderRole: "customer" as const, senderName: "Rahul Sharma", content: "Hi, I'm interested in the Albert Ekka Chowk hoarding for our product launch." },
		{ enquiryId: insertedEnquiries[0].id, senderRole: "admin" as const, senderName: "Hoardify Admin", content: "Hello Rahul! Great choice. This is our premium spot with 125K daily impressions. Available from next month." },
		{ enquiryId: insertedEnquiries[0].id, senderRole: "customer" as const, senderName: "Rahul Sharma", content: "What's the pricing for a 3-month booking? Any discounts?" },
		{ enquiryId: insertedEnquiries[0].id, senderRole: "admin" as const, senderName: "Hoardify Admin", content: "For 3 months, we can offer ₹42,000/mo instead of ₹45,000. That's a 7% discount. Shall I reserve it?" },
		// Conversation 2: Priya's enquiry
		{ enquiryId: insertedEnquiries[1].id, senderRole: "customer" as const, senderName: "Priya Gupta", content: "We need a custom 20x10 setup for the Kanke Road LED wall. Is that possible?" },
		{ enquiryId: insertedEnquiries[1].id, senderRole: "admin" as const, senderName: "Hoardify Admin", content: "Yes, custom sizes are available for LED walls. The standard is 16x8 but we can accommodate 20x10. Additional ₹8,000/mo for the larger format." },
		// Conversation 3: Vikram's enquiry (longer)
		{ enquiryId: insertedEnquiries[4].id, senderRole: "customer" as const, senderName: "Vikram Singh", content: "Looking for annual pricing on Firayalal Chowk. Our client is a national brand." },
		{ enquiryId: insertedEnquiries[4].id, senderRole: "admin" as const, senderName: "Hoardify Admin", content: "For annual contracts on our premium Firayalal spot, we offer ₹75,000/mo (12% savings). Includes printing & installation." },
		{ enquiryId: insertedEnquiries[4].id, senderRole: "customer" as const, senderName: "Vikram Singh", content: "That works. Can we schedule a site visit this week?" },
		{ enquiryId: insertedEnquiries[4].id, senderRole: "admin" as const, senderName: "Hoardify Admin", content: "Absolutely! I've opened Thursday 3-5 PM. Would that work? Our site manager will meet you at the location." },
		{ enquiryId: insertedEnquiries[4].id, senderRole: "customer" as const, senderName: "Vikram Singh", content: "Thursday works. See you then!" },
	];

	for (const m of messageData) {
		await db.insert(messages).values(m);
	}
	console.log(`  ✓ ${messageData.length} messages inserted\n`);

	console.log("✅ Seed complete!\n");
	process.exit(0);
}

seed().catch((err) => {
	console.error("❌ Seed failed:", err);
	process.exit(1);
});
