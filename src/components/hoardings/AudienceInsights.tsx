import { Users, Eye, TrendingUp, Clock } from "lucide-react";

export default function AudienceInsights() {
	const insights = [
		{ label: "Weekly Reach", value: "250K+", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
		{ label: "Daily Views", value: "35K+", icon: Eye, color: "text-brand", bg: "bg-brand/5" },
		{ label: "Peak Time", value: "5PM - 9PM", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
		{ label: "Growth", value: "+12%", icon: TrendingUp, color: "text-green-500", bg: "bg-green-50" },
	];

	return (
		<div className="mt-8">
			<h3 className="text-xl font-black tracking-tight mb-6 flex items-center gap-2">
				Audience Intelligence
			</h3>
			<div className="grid grid-cols-2 gap-4">
				{insights.map((item, i) => {
					const Icon = item.icon;
					return (
						<div key={i} className="flex flex-col gap-3 p-5 rounded-3xl bg-white border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
							<div className={`h-10 w-10 rounded-2xl ${item.bg} flex items-center justify-center ${item.color}`}>
								<Icon size={20} />
							</div>
							<div>
								<span className="block text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-1">{item.label}</span>
								<span className="text-lg font-black tracking-tight text-text-primary">{item.value}</span>
							</div>
						</div>
					);
				})}
			</div>
			
			<div className="mt-4 p-4 rounded-2xl bg-surface-sunken border border-dashed border-border-subtle">
				<p className="text-[11px] font-medium text-text-secondary leading-relaxed">
					Data based on average weekly traffic counts and mobile device signals in the immediate 200m radius of the placement.
				</p>
			</div>
		</div>
	);
}
