import { Megaphone, Users, TrendingUp, Inbox } from "lucide-react";

export default async function AdminDashboard() {
	// Mock stats for visual design
	const stats = [
		{ label: "Total Placements", value: "50", icon: Megaphone, color: "bg-blue-500" },
		{ label: "Total Reach", value: "1.2M", icon: Users, color: "bg-brand" },
		{ label: "Occupancy Rate", value: "84%", icon: TrendingUp, color: "bg-green-500" },
		{ label: "New Enquiries", value: "12", icon: Inbox, color: "bg-purple-500" },
	];

	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, i) => {
					const Icon = stat.icon;
					return (
						<div key={i} className="bg-white p-6 rounded-3xl border border-border-subtle shadow-sm flex items-center gap-4">
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
				{/* Recent Activity */}
				<div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-border-subtle shadow-sm overflow-hidden">
					<div className="p-8 border-b border-border-subtle flex items-center justify-between">
						<h3 className="font-black text-lg tracking-tight">Recent Enquiries</h3>
						<button className="text-xs font-bold text-brand uppercase tracking-widest hover:underline">View All</button>
					</div>
					<div className="p-0">
						<table className="w-full text-left">
							<thead>
								<tr className="bg-surface-sunken">
									<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Customer</th>
									<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Placement</th>
									<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Status</th>
									<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Date</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border-subtle">
								<tr className="hover:bg-surface-sunken transition-colors">
									<td className="px-8 py-6">
										<div className="flex flex-col">
											<span className="font-bold text-sm">Shaswat Raj</span>
											<span className="text-[10px] text-text-tertiary">shaswat@example.com</span>
										</div>
									</td>
									<td className="px-8 py-6 text-xs font-medium">Airport Road Route</td>
									<td className="px-8 py-6">
										<span className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest">New</span>
									</td>
									<td className="px-8 py-6 text-[10px] font-black text-text-tertiary">APR 10, 2026</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="space-y-6">
					<div className="bg-brand p-8 rounded-[2.5rem] text-white shadow-xl shadow-brand/20">
						<h3 className="font-black text-xl mb-2 tracking-tight">Post New Ad</h3>
						<p className="text-sm opacity-80 mb-6 font-medium">Add a new hoarding placement to the public marketplace index.</p>
						<button className="w-full py-4 bg-white text-brand rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg">
							Open Creator
						</button>
					</div>
					
					<div className="bg-white p-8 rounded-[2.5rem] border border-border-subtle shadow-sm">
						<h3 className="font-black text-xl mb-2 tracking-tight">System Status</h3>
						<div className="flex items-center gap-2 text-green-500 mb-6">
							<div className="h-2 w-2 rounded-full bg-current animate-pulse" />
							<span className="text-xs font-bold uppercase tracking-widest">Database Synced</span>
						</div>
						<div className="space-y-4">
							<div className="flex justify-between text-xs font-medium">
								<span className="text-text-tertiary">Drizzle ORM</span>
								<span className="text-text-primary">v0.45.2</span>
							</div>
							<div className="flex justify-between text-xs font-medium">
								<span className="text-text-tertiary">Stack Auth</span>
								<span className="text-text-primary">v2.1.0</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
