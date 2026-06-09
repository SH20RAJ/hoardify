import { stackServerApp } from "@/stack/server";
import { db } from "@/db";
import { hoardings, bookings, enquiries, users } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import StatsGrid from "@/components/admin/StatsGrid";
import ActivityPulse from "@/components/admin/ActivityPulse";

export default async function AgencyDashboard() {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) return null;

	const dbUser = await db.query.users.findFirst({
		where: eq(users.id, stackUser.id)
	});

	if (!dbUser || !dbUser.agencyId) return null;

	const agencyId = dbUser.agencyId;

	// Fetch data scoped to this agency
	const [agencyHoardings, agencyBookings, agencyEnquiries] = await Promise.all([
		db.select().from(hoardings).where(eq(hoardings.agencyId, agencyId)),
		db.query.bookings.findMany({
			where: (bookings, { exists }) => 
				exists(
					db.select()
					.from(hoardings)
					.where(sql`${hoardings.id} = ${bookings.hoardingId} AND ${hoardings.agencyId} = ${agencyId}`)
				),
			with: { user: true, hoarding: true },
			orderBy: [desc(bookings.createdAt)],
			limit: 10
		}),
		db.select().from(enquiries).where(eq(enquiries.hoardingId, agencyId)) // This is a bit wrong in schema, enquiries link to hoardingId
	]);

	// Fix enquiries query: find enquiries for hoardings belonging to this agency
	const actualEnquiries = await db.query.enquiries.findMany({
		where: (enquiries, { exists }) => 
			exists(
				db.select()
				.from(hoardings)
				.where(sql`${hoardings.id} = ${enquiries.hoardingId} AND ${hoardings.agencyId} = ${agencyId}`)
			),
		with: { hoarding: true },
		orderBy: [desc(enquiries.createdAt)]
	});

	const metrics = {
		totalPlacements: agencyHoardings.length,
		activeBookings: agencyBookings.length, // This is technically just the last 10, but for metrics we want total
		totalUsers: 0, // Not relevant for agency
		newEnquiries: actualEnquiries.filter(e => e.status === "New").length,
		totalReach: "Scoped",
	};

	// Get actual total counts for metrics
	const [bCount, eCount] = await Promise.all([
		db.select({ count: sql<number>`count(*)` }).from(bookings).where(
			sql`exists(select 1 from hoardings where hoardings.id = bookings.hoarding_id and hoardings.agency_id = ${agencyId})`
		),
		db.select({ count: sql<number>`count(*)` }).from(enquiries).where(
			sql`exists(select 1 from hoardings where hoardings.id = enquiries.hoarding_id and hoardings.agency_id = ${agencyId})`
		)
	]);

	metrics.activeBookings = Number(bCount[0].count);
	metrics.newEnquiries = Number(eCount[0].count);

	return (
		<div className="space-y-8">
			<div className="flex flex-col gap-1">
				<h2 className="text-2xl font-bold text-[#222222]">Agency Overview</h2>
				<p className="text-sm text-[#717171]">Performance metrics for your properties</p>
			</div>

			<StatsGrid stats={metrics} />

			<div className="grid lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<ActivityPulse bookings={agencyBookings as any} />
				</div>

				<div className="space-y-6">
					<div className="bg-white p-6 rounded-2xl border border-[#ebebeb] shadow-sm">
						<h3 className="font-semibold text-lg text-[#222222] mb-4">Inventory Status</h3>
						<div className="space-y-4">
							<div className="flex justify-between items-center text-sm">
								<span className="text-[#717171]">For Rent</span>
								<span className="font-bold text-[#008a05]">{agencyHoardings.filter(h => h.status === "For Rent").length}</span>
							</div>
							<div className="flex justify-between items-center text-sm">
								<span className="text-[#717171]">Booked</span>
								<span className="font-bold text-[#082390]">{agencyHoardings.filter(h => h.status === "Booked").length}</span>
							</div>
							<div className="flex justify-between items-center text-sm">
								<span className="text-[#717171]">Maintenance</span>
								<span className="font-bold text-[#f59e0b]">{agencyHoardings.filter(h => h.status === "Maintenance").length}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
