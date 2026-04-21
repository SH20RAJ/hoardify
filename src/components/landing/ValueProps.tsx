"use client";

import { Eye, Shield, BarChart3, Clock, LayoutGrid, Map } from "lucide-react";

const features = [
	{
		icon: <Map size={24} />,
		title: "Map Intelligence",
		description: "Visualize every hoarding in the city. High-fidelity markers with real-time availability sync."
	},
	{
		icon: <Shield size={24} />,
		title: "Verified Inventory",
		description: "Every listing is physically verified by our team. High-resolution imagery and precise GPS data."
	},
	{
		icon: <BarChart3 size={24} />,
		title: "Reach Analytics",
		description: "Data-driven audience insights. We estimate impressions and traffic scores for every location."
	},
	{
		icon: <Clock size={24} />,
		title: "48-Hour Deployment",
		description: "From discovery to installation in record time. Our end-to-end service handles everything."
	},
	{
		icon: <LayoutGrid size={24} />,
		title: "Full Channel List",
		description: "Filter by size, type, or price. Compare multiple nodes to build your perfect campaign."
	},
	{
		icon: <Eye size={24} />,
		title: "Visual Dominance",
		description: "Select placements based on visibility scores and physical prominence in high-traffic zones."
	}
];

export default function ValueProps() {
	return (
		<section className="py-32 bg-surface-sunken">
			<div className="container mx-auto px-6">
				<div className="flex flex-col md:flex-row items-end justify-between mb-20">
					<div className="max-w-2xl">
						<div className="text-brand text-[10px] font-black uppercase tracking-[0.34em] mb-4">Precision Engineering</div>
						<h2 className="text-4xl md:text-6xl font-black tracking-tighter text-text-primary uppercase italic">
							Engineered for <br />
							<span className="text-brand">Impact.</span>
						</h2>
					</div>
					<p className="max-w-xs text-sm font-medium text-text-secondary leading-relaxed mt-8 md:mt-0">
						We&apos;ve removed the friction from traditional OOH, replacing manual calls with digital intelligence.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<div 
							key={index}
							className="group p-10 rounded-[2.5rem] bg-background border border-border-subtle transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2"
						>
							<div className="h-16 w-16 rounded-2xl bg-surface-sunken flex items-center justify-center text-text-secondary group-hover:bg-brand group-hover:text-white transition-colors duration-500 mb-8">
								{feature.icon}
							</div>
							<h3 className="text-xl font-black uppercase tracking-widest text-text-primary mb-4 italic">
								{feature.title}
							</h3>
							<p className="text-sm font-medium text-text-tertiary leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
