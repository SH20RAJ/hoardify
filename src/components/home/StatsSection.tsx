import { Shield, Zap, TrendingUp, Users } from "lucide-react";

const stats = [
	{ label: "Active Hoardings", value: "50+", icon: Shield, description: "Premium verified placements" },
	{ label: "Weekly Reach", value: "1.2M+", icon: Users, description: "Unique audience impressions" },
	{ label: "Avg. ROI", value: "3.5x", icon: TrendingUp, description: "Marketing spend efficiency" },
	{ label: "Response Time", value: "< 2h", icon: Zap, description: "Instant booking inquiries" },
];

export default function StatsSection() {
	return (
		<section className="py-24 bg-white">
			<div className="max-w-7xl mx-auto px-4 md:px-6">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
					{stats.map((stat, i) => {
						const Icon = stat.icon;
						return (
							<div key={i} className="flex flex-col items-center text-center p-6 rounded-[2.5rem] bg-surface-sunken border border-border-subtle hover:shadow-xl transition-all hover:-translate-y-1">
								<div className="h-14 w-14 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-6">
									<Icon size={28} />
								</div>
								<h3 className="text-4xl font-black tracking-tighter text-text-primary mb-1">{stat.value}</h3>
								<p className="text-xs font-black uppercase tracking-widest text-brand mb-3">{stat.label}</p>
								<p className="text-xs font-medium text-text-tertiary leading-relaxed px-4">{stat.description}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
