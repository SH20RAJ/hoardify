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
		<section className="py-24 bg-white">
			<div className="container mx-auto px-6">
				<div className="max-w-2xl mb-16">
					<h2 className="text-3xl font-semibold text-[#222222] mb-4">
						Engineered for Impact.
					</h2>
					<p className="text-[#6a6a6a]">
						We&apos;ve removed the friction from traditional OOH, replacing manual calls with digital intelligence.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
					{features.map((feature, index) => (
						<div key={index} className="flex flex-col">
							<div className="text-[#222222] mb-4">
								{feature.icon}
							</div>
							<h3 className="text-lg font-semibold text-[#222222] mb-2">
								{feature.title}
							</h3>
							<p className="text-[#6a6a6a] text-sm leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
