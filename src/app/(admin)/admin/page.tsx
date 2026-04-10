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
		<div className="space-y-8 animate-in fade-in duration-700">
			{/* Modular Stats Grid */}
			<StatsGrid stats={metrics} />

			<div className="grid lg:grid-cols-3 gap-8">
				{/* Modular Booking Activity Pulse */}
				<div className="lg:col-span-2">
					<ActivityPulse bookings={recentBookings} />
				</div>

				{/* Quick Intelligence */}
				<div className="space-y-6">
					<div className="bg-text-primary p-8 rounded-[2.5rem] text-background shadow-xl shadow-black/20 relative overflow-hidden group">
						<div className="absolute -top-12 -right-12 h-32 w-32 bg-brand/20 blur-[80px] rounded-full group-hover:bg-brand/30 transition-all duration-700" />
						<h3 className="font-black text-xl mb-2 tracking-tight">Market Velocity</h3>
						<p className="text-sm opacity-60 mb-8 font-medium leading-relaxed">System-wide booking requests have increased by <span className="text-brand font-bold underline decoration-brand/30 underline-offset-4">12%</span> this week.</p>
						<div className="space-y-4">
							<div className="p-4 rounded-2xl bg-white/5 border border-white/10">
								<div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">
									<span>Occupancy</span>
									<span>72%</span>
								</div>
								<div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
									<div className="h-full bg-brand w-[72%]" />
								</div>
							</div>
						</div>
					</div>
					
					<div className="bg-white p-8 rounded-[2.5rem] border border-border-subtle shadow-sm">
						<h3 className="font-black text-xl mb-6 tracking-tight">System Status</h3>
						<div className="space-y-6">
							<div className="flex items-center gap-4">
								<div className="h-10 w-10 rounded-xl bg-surface-sunken flex items-center justify-center text-text-tertiary">
									<TrendingUp size={18} />
								</div>
								<div>
									<p className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">DB Consistency</p>
									<p className="text-sm font-bold text-green-500">100% Synced</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<div className="h-10 w-10 rounded-xl bg-surface-sunken flex items-center justify-center text-text-tertiary">
									<Users size={18} />
								</div>
								<div>
									<p className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Active Users</p>
									<p className="text-sm font-bold text-text-primary">{metrics.totalUsers} Tracked</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

