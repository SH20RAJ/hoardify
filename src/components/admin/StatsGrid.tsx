import { Megaphone, Users, Inbox, Calendar, LucideIcon } from "lucide-react";

interface StatItem {
	label: string;
	value: string | number;
	icon: LucideIcon;
	color: string;
}

interface StatsGridProps {
	stats: {
		totalPlacements: number;
		totalUsers: number;
		activeBookings: number;
		newEnquiries: number;
		totalReach: string;
	};
}

export default function StatsGrid({ stats }: StatsGridProps) {
	const items: StatItem[] = [
		{ label: "Total Placements", value: stats.totalPlacements, icon: Megaphone, color: "bg-blue-500" },
		{ label: "Total Reach", value: stats.totalReach, icon: Users, color: "bg-brand" },
		{ label: "Active Users", value: stats.totalUsers, icon: Users, color: "bg-green-500" },
		{ label: "Active Bookings", value: stats.activeBookings, icon: Calendar, color: "bg-purple-500" },
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{items.map((stat, i) => {
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
	);
}
