import { Megaphone, Users, Calendar, LucideIcon } from "lucide-react";

interface StatItem {
	label: string;
	value: string | number;
	icon: LucideIcon;
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
		{ label: "Placements", value: stats.totalPlacements, icon: Megaphone },
		{ label: "Total Reach", value: stats.totalReach, icon: Users },
		{ label: "Users", value: stats.totalUsers, icon: Users },
		{ label: "Bookings", value: stats.activeBookings, icon: Calendar },
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{items.map((stat, i) => {
				const Icon = stat.icon;
				return (
					<div key={i} className="bg-white p-6 rounded-2xl border border-[#ebebeb] shadow-sm flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<span className="text-sm font-semibold text-[#717171]">{stat.label}</span>
							<Icon size={20} className="text-[#222222]" />
						</div>
						<p className="text-3xl font-bold text-[#222222]">{stat.value}</p>
					</div>
				);
			})}
		</div>
	);
}
