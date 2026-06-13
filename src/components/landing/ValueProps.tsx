"use client";

import { Eye, Shield, BarChart3, Clock, LayoutGrid, Map } from "lucide-react";

const features = [
	{
		icon: <Map size={24} strokeWidth={1.5} />,
		title: "Map Intelligence",
		description: "Visualize every hoarding in the city with high-fidelity markers and real-time availability sync."
	},
	{
		icon: <Shield size={24} strokeWidth={1.5} />,
		title: "Verified Inventory",
		description: "Every listing is physically verified by our team with high-resolution imagery and precise GPS data."
	},
	{
		icon: <BarChart3 size={24} strokeWidth={1.5} />,
		title: "Reach Analytics",
		description: "Data-driven audience insights. We estimate impressions and traffic scores for every location."
	},
	{
		icon: <Clock size={24} strokeWidth={1.5} />,
		title: "48-Hour Deployment",
		description: "From discovery to installation in record time. Our end-to-end service handles the entire lifecycle."
	},
	{
		icon: <LayoutGrid size={24} strokeWidth={1.5} />,
		title: "Full Channel List",
		description: "Filter by size, type, or price. Compare multiple nodes to build your perfect campaign."
	},
	{
		icon: <Eye size={24} strokeWidth={1.5} />,
		title: "Visual Dominance",
		description: "Select placements based on visibility scores and physical prominence in high-traffic zones."
	}
];

export default function ValueProps() {
	return (
		<section className="py-20 md:py-32 bg-white">
			<div className="container mx-auto px-4 sm:px-6 max-w-7xl">
				<div className="max-w-3xl mb-14 md:mb-24">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-brand text-[9px] font-black uppercase tracking-widest mb-6">
						Platform Capabilities
					</div>
					<h2 className="text-4xl md:text-5xl font-black text-[#111111] mb-6 tracking-tight">
						Engineered for Impact.
					</h2>
					<p className="text-lg text-text-secondary leading-relaxed">
						We&apos;ve removed the friction from traditional OOH, replacing manual agency calls with high-precision digital intelligence.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-10 md:gap-y-20">
					{features.map((feature, index) => (
					<div key={index} className="group flex flex-col items-start">
						<div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-surface-sunken flex items-center justify-center text-text-tertiary mb-5 sm:mb-8 group-hover:bg-brand group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-premium-sm group-hover:shadow-premium-md">
								{feature.icon}
							</div>
							<h3 className="text-xl font-bold text-[#111111] mb-4 group-hover:text-brand transition-colors">
								{feature.title}
							</h3>
							<p className="text-text-secondary text-base leading-relaxed font-medium">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
