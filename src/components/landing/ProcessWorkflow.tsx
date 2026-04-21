"use client";

import { Search, BarChart4, Rocket } from "lucide-react";

export default function ProcessWorkflow() {
	const steps = [
		{
			icon: <Search size={32} />,
			number: "01",
			title: "Discover",
			description: "Search through Ranchi&apos;s verified premium inventory on our interactive intelligence map."
		},
		{
			icon: <BarChart4 size={32} />,
			number: "02",
			title: "Evaluate",
			description: "Analyze traffic scores, impressions, and ROI potential for your selected placements."
		},
		{
			icon: <Rocket size={32} />,
			number: "03",
			title: "Launch",
			description: "Confirm your booking and let our team handle design, printing, and professional installation."
		}
	];

	return (
		<section className="py-32 bg-background relative overflow-hidden">
			<div className="container mx-auto px-6">
				<div className="flex flex-col items-center text-center mb-24">
					<div className="text-brand text-[10px] font-black uppercase tracking-[0.4em] mb-4">Workflow</div>
					<h2 className="text-4xl md:text-6xl font-black tracking-tighter text-text-primary uppercase italic">
						From Map to <br />
						<span className="text-brand">Market.</span>
					</h2>
				</div>

				<div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
					{/* Connecting Line (Desktop) */}
					<div className="absolute top-1/2 left-0 w-full h-px bg-border-subtle hidden md:block -translate-y-12" />

					{steps.map((step, index) => (
						<div key={index} className="relative flex flex-col items-center text-center z-10 group">
							<div className="h-24 w-24 rounded-[2rem] bg-surface-raised border border-border-subtle flex items-center justify-center text-text-secondary mb-10 transition-all duration-500 group-hover:bg-brand group-hover:text-white group-hover:scale-110 group-hover:rotate-6 shadow-xl shadow-black/5">
								{step.icon}
							</div>
							
							<div className="absolute -top-6 -right-2 text-7xl font-black text-text-primary/5 italic select-none group-hover:text-brand/10 transition-colors">
								{step.number}
							</div>

							<h3 className="text-2xl font-black uppercase tracking-widest text-text-primary mb-4 italic">
								{step.title}
							</h3>
							<p className="text-sm font-medium text-text-tertiary leading-relaxed max-w-[280px]">
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
