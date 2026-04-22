import { Shield, Zap, TrendingUp, Users } from "lucide-react";

const stats = [
	{ label: "Active Nodes", value: "50+", icon: Shield },
	{ label: "Weekly Reach", value: "1.2M+", icon: Users },
	{ label: "Avg. ROI", value: "3.5x", icon: TrendingUp },
	{ label: "Response", value: "< 2h", icon: Zap },
];

export default function StatsSection() {
	return (
		<section className="py-24 bg-white border-t border-[#ebebeb]">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
					{stats.map((stat, i) => {
						const Icon = stat.icon;
						return (
							<div key={i} className="flex flex-col gap-4">
								<div className="text-[#222222]">
									<Icon size={28} />
								</div>
								<div>
									<h3 className="text-3xl font-bold text-[#222222] mb-1">{stat.value}</h3>
									<p className="text-sm font-medium text-[#717171] uppercase tracking-wider">{stat.label}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
