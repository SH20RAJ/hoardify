"use client";

import { Search, BarChart4, Rocket } from "lucide-react";

const steps = [
	{
		icon: <Search size={24} />,
		title: "Discover",
		description: "Search through our verified premium inventory on an interactive intelligence map."
	},
	{
		icon: <BarChart4 size={24} />,
		title: "Evaluate",
		description: "Analyze traffic scores, impressions, and ROI potential for your selected placements."
	},
	{
		icon: <Rocket size={24} />,
		title: "Launch",
		description: "Confirm your booking and let our team handle design, printing, and installation."
	}
];

export default function ProcessWorkflow() {
	return (
		<section className="py-24 bg-[#f7f7f7]">
			<div className="container mx-auto px-6">
				<div className="max-w-2xl mb-16 text-center mx-auto">
					<h2 className="text-3xl font-semibold text-[#222222] mb-4">
						From map to market.
					</h2>
					<p className="text-[#6a6a6a]">
						A simple three-step process to get your brand seen by thousands.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
					{steps.map((step, index) => (
						<div key={index} className="flex flex-col items-center text-center">
							<div className="mb-6 text-[#222222]">
								{step.icon}
							</div>
							<h3 className="text-lg font-semibold text-[#222222] mb-2">
								{step.title}
							</h3>
							<p className="text-[#6a6a6a] text-sm leading-relaxed max-w-xs">
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
