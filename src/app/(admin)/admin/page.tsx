import { getRecentBookings, getAdminMetrics } from "@/actions/admin";
import { TrendingUp, Users } from "lucide-react";
import StatsGrid from "@/components/admin/StatsGrid";
import ActivityPulse from "@/components/admin/ActivityPulse";

export default async function AdminDashboard() {
	// Fetch data via Server Actions
	const [recentBookings, metrics] = await Promise.all([
		getRecentBookings(),
		getAdminMetrics()
	]);

	return (
		<div className="space-y-8">
			{/* Modular Stats Grid */}
			<StatsGrid stats={metrics} />

			<div className="grid lg:grid-cols-3 gap-8">
				{/* Modular Booking Activity Pulse */}
				<div className="lg:col-span-2">
					<ActivityPulse bookings={recentBookings} />
				</div>

				{/* Quick Intelligence */}
				<div className="space-y-6">
					<div className="bg-white p-6 rounded-2xl border border-[#ebebeb] shadow-sm">
						<h3 className="font-semibold text-lg text-[#222222] mb-2">Market Velocity</h3>
						<p className="text-sm text-[#717171] mb-6">System-wide booking requests have increased by <span className="text-[#008a05] font-bold">12%</span> this week.</p>
						<div className="space-y-4">
							<div className="p-4 rounded-xl bg-[#f7f7f7] border border-[#ebebeb]">
								<div className="flex justify-between text-xs font-semibold text-[#717171] mb-2">
									<span>Occupancy</span>
									<span>72%</span>
								</div>
								<div className="h-2 w-full bg-[#dddddd] rounded-full overflow-hidden">
									<div className="h-full bg-[#ff385c] w-[72%]" />
								</div>
							</div>
						</div>
					</div>
					
					<div className="bg-white p-6 rounded-2xl border border-[#ebebeb] shadow-sm">
						<h3 className="font-semibold text-lg text-[#222222] mb-6">System Status</h3>
						<div className="space-y-6">
							<div className="flex items-center gap-4">
								<div className="h-10 w-10 rounded-lg bg-[#f7f7f7] flex items-center justify-center text-[#717171]">
									<TrendingUp size={18} />
								</div>
								<div>
									<p className="text-xs font-semibold text-[#717171]">Database</p>
									<p className="text-sm font-bold text-[#008a05]">Healthy</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<div className="h-10 w-10 rounded-lg bg-[#f7f7f7] flex items-center justify-center text-[#717171]">
									<Users size={18} />
								</div>
								<div>
									<p className="text-xs font-semibold text-[#717171]">Active Nodes</p>
									<p className="text-sm font-bold text-[#222222]">{metrics.totalUsers} Active</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
