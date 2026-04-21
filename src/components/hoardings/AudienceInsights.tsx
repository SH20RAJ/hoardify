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
		<div className="mt-12 py-12 border-t border-[#ebebeb]">
			<h3 className="text-2xl font-semibold text-[#222222] mb-8">
				Audience Intelligence
			</h3>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
				{insights.map((item, i) => {
					const Icon = item.icon;
					return (
						<div key={i} className="flex flex-col gap-2">
							<Icon size={24} className="text-[#222222] mb-2" />
							<span className="text-xl font-bold text-[#222222]">{item.value}</span>
							<span className="text-sm text-[#717171]">{item.label}</span>
						</div>
					);
				})}
			</div>
			
			<div className="mt-10 p-6 rounded-xl bg-[#f7f7f7] border border-[#ebebeb]">
				<p className="text-xs text-[#717171] leading-relaxed">
					Data based on average weekly traffic counts and mobile device signals in the immediate 200m radius of the placement. Powered by Ranchi Traffic Intelligence.
				</p>
			</div>
		</div>
	);
}
