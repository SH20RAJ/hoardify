import { Users, Eye, TrendingUp, Clock } from "lucide-react";

interface AudienceInsightsProps {
	views?: string | null;
}

export default function AudienceInsights({ views }: AudienceInsightsProps) {
	const insights = [
		{ label: "Weekly Reach", value: views ? `${parseInt(views) * 7}K+` : "250K+", icon: Users },
		{ label: "Daily Views", value: views ? `${views}K+` : "35K+", icon: Eye },
		{ label: "Peak Time", value: "5PM - 9PM", icon: Clock },
		{ label: "Growth", value: "+12%", icon: TrendingUp },
	];

	return (
		<div className="mt-12 py-12 border-t border-border-subtle">
			<h3 className="text-xl md:text-2xl font-black text-text-primary mb-8 tracking-tight">
				Who will see your ad?
			</h3>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
				{insights.map((item, i) => {
					const Icon = item.icon;
					return (
						<div key={i} className="flex flex-col gap-2">
							<Icon size={24} className="text-text-primary mb-2" />
							<span className="text-xl font-black text-text-primary tracking-tight">{item.value}</span>
							<span className="text-[10px] font-black text-text-tertiary uppercase tracking-widest">{item.label}</span>
						</div>
					);
				})}
			</div>
			
			<div className="mt-10 p-6 rounded-2xl bg-surface-sunken border border-border-subtle">
				<p className="text-xs text-text-secondary leading-relaxed font-medium">
					This data is based on local traffic counts and mobile signals near this spot. Powered by Ranchi Traffic Data.
				</p>
			</div>
		</div>
	);
}
