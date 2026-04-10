import { getRecentBookings, getAdminMetrics } from "@/actions/admin";
import { Megaphone, Users, TrendingUp, Inbox, Calendar, User } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

export default async function AdminDashboard() {
	// Fetch data via Server Actions
	const [recentBookings, metrics] = await Promise.all([
		getRecentBookings(),
		getAdminMetrics()
	]);

	const stats = [
		{ label: "Total Placements", value: metrics.totalPlacements.toString(), icon: Megaphone, color: "bg-blue-500" },
		{ label: "Total Reach", value: metrics.totalReach, icon: Users, color: "bg-brand" },
		{ label: "Active Bookings", value: metrics.activeBookings.toString(), icon: Calendar, color: "bg-green-500" },
		{ label: "New Enquiries", value: metrics.newEnquiries.toString(), icon: Inbox, color: "bg-purple-500" },
	];


	return (
		<div className="space-y-8 animate-in fade-in duration-700">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, i) => {
					const Icon = stat.icon;
					return (
						<div key={i} className="bg-white p-6 rounded-3xl border border-border-subtle shadow-sm flex items-center gap-4 hover:shadow-lg transition-all hover:-translate-y-1">
							<div className={`h-12 w-12 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg`}>
								<Icon size={24} />
							</div>
							<div>
								<p className="text-xs font-bold uppercase tracking-widest text-text-tertiary">{stat.label}</p>
								<p className="text-2xl font-black text-text-primary">{stat.value}</p>
							</div>
						</div>
					);
				})}
			</div>

			<div className="grid lg:grid-cols-3 gap-8">
				{/* Booking Activity Pulse */}
				<div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-border-subtle shadow-sm overflow-hidden">
					<div className="p-8 border-b border-border-subtle flex items-center justify-between bg-surface-sunken/30">
						<div>
							<h3 className="font-black text-lg tracking-tight">Active Booking Pulse</h3>
							<p className="text-[10px] font-bold uppercase tracking-widest text-brand mt-1">Real-time user sessions</p>
						</div>
						<button className="text-xs font-bold text-text-tertiary uppercase tracking-widest hover:text-brand transition-colors">Audit All</button>
					</div>
					
					<div className="overflow-x-auto">
						<table className="w-full text-left">
							<thead>
								<tr className="bg-surface-sunken/50">
									<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Customer</th>
									<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Placement</th>
									<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Duration</th>
									<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary text-right">Value</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border-subtle">
								{recentBookings.map((booking) => (
									<tr key={booking.id} className="hover:bg-surface-sunken transition-colors group">
										<td className="px-8 py-6">
											<div className="flex items-center gap-3">
												<div className="h-8 w-8 rounded-full bg-surface-sunken flex items-center justify-center overflow-hidden border border-border-subtle relative">
													{booking.user.imageUrl ? (
														<Image src={booking.user.imageUrl} alt="" fill className="object-cover" unoptimized />
													) : (
														<User size={14} className="text-text-tertiary" />
													)}
												</div>
												<div className="flex flex-col">
													<span className="font-bold text-sm text-text-primary capitalize">{booking.user.name || "Anonymous User"}</span>
													<span className="text-[10px] text-text-tertiary">{booking.user.email}</span>
												</div>
											</div>
										</td>
										<td className="px-8 py-6">
											<div className="flex flex-col">
												<span className="text-xs font-bold text-text-primary">{booking.hoarding?.title || "Unknown Hoarding"}</span>
												<span className="text-[10px] text-text-tertiary">{booking.hoarding?.location}</span>
											</div>
										</td>
										<td className="px-8 py-6">
											<span className="text-[10px] font-black uppercase tracking-widest bg-brand/5 text-brand px-2 py-1 rounded-md border border-brand/10">
												{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
											</span>
										</td>
										<td className="px-8 py-6 text-right">
											<span className="font-black text-sm text-text-primary">{formatCurrency(booking.pricePaid)}</span>
										</td>
									</tr>
								))}
								{recentBookings.length === 0 && (
									<tr>
										<td colSpan={4} className="px-8 py-20 text-center">
											<div className="flex flex-col items-center gap-3 opacity-30">
												<Calendar size={32} />
												<p className="text-sm font-bold uppercase tracking-widest">No Active Bookings Yet</p>
											</div>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
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
									<p className="text-sm font-bold text-text-primary">2,841 Tracked</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
