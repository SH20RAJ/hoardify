"use client";

export default function StatsBanner() {
	const stats = [
		{ label: "OOH Inventory", value: "2.5K+" },
		{ label: "Annual Reach", value: "14.4M" },
		{ label: "Verified Nodes", value: "56+" },
		{ label: "Cost Efficiency", value: "35%" }
	];

	return (
		<section className="py-12 bg-brand overflow-hidden">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
					{stats.map((stat, index) => (
						<div key={index} className="flex flex-col items-center lg:items-start text-center lg:text-left text-white">
							<div className="text-4xl md:text-6xl font-black italic tracking-tighter mb-1">
								{stat.value}
							</div>
							<div className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] opacity-70">
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
