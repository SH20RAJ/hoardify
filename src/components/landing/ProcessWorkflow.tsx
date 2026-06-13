"use client";

import { Search, BarChart4, Rocket, ArrowRight } from "lucide-react";

const steps = [
	{
		icon: <Search size={28} strokeWidth={1.5} />,
		title: "Discover",
		description: "Search through verified premium inventory on our interactive intelligence map."
	},
	{
		icon: <BarChart4 size={28} strokeWidth={1.5} />,
		title: "Evaluate",
		description: "Analyze traffic scores, impressions, and ROI potential for selected placements."
	},
	{
		icon: <Rocket size={28} strokeWidth={1.5} />,
		title: "Launch",
		description: "Confirm your booking and let our team handle design, printing, and installation."
	}
];

export default function ProcessWorkflow() {
	return (
		<section className="py-20 md:py-32 bg-surface-sunken">
			<div className="container mx-auto px-4 sm:px-6 max-w-7xl">
				<div className="max-w-3xl mb-14 md:mb-24 text-center mx-auto">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border-subtle text-text-tertiary text-[9px] font-black uppercase tracking-widest mb-6">
						Deployment Pipeline
					</div>
					<h2 className="text-4xl md:text-5xl font-black text-[#111111] mb-6 tracking-tight">
						From map to market.
					</h2>
					<p className="text-lg text-text-secondary leading-relaxed">
						A high-precision three-step process to get your brand seen by thousands across the city skyline.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 relative">
					{/* Connecting Line (Desktop) */}
					<div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-border-strong -translate-y-24 z-0" />
					
					{steps.map((step, index) => (
						<div key={index} className="relative z-10 flex flex-col items-center text-center group">
							<div className="w-16 h-16 md:w-20 md:h-20 rounded-[2rem] bg-white flex items-center justify-center text-[#111111] mb-6 md:mb-10 shadow-premium-lg group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all duration-700">
								{step.icon}
								<div className="absolute -top-2 -right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#111111] text-white text-[10px] font-black flex items-center justify-center border-4 border-surface-sunken group-hover:bg-white group-hover:text-brand transition-colors">
									0{index + 1}
								</div>
							</div>
							<h3 className="text-2xl font-black text-[#111111] mb-4 group-hover:text-brand transition-colors">
								{step.title}
							</h3>
							<p className="text-text-secondary text-base leading-relaxed font-medium max-w-[280px]">
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
