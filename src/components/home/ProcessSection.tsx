import { Search, BarChart3, CalendarCheck } from "lucide-react";

const steps = [
	{
		title: "Discover Locations",
		description: "Browse curated inventory using our immersive map-first discovery platform.",
		icon: Search,
	},
	{
		title: "Analyze Reach",
		description: "Evaluate audience demographics and traffic intelligence scoring for every placement.",
		icon: BarChart3,
	},
	{
		title: "Instant Booking",
		description: "Secure your campaign dates with a single inquiry and get verified execution proofs.",
		icon: CalendarCheck,
	},
];

export default function ProcessSection() {
	return (
		<section className="py-24 bg-[#f7f7f7]">
			<div className="max-w-7xl mx-auto px-6">
				<div className="mb-16">
					<h2 className="text-3xl font-semibold text-[#222222] mb-4">How it works</h2>
					<p className="text-[#6a6a6a] max-w-xl">Digitizing the fragmented outdoor advertising market through a transparent, map-first workflow.</p>
				</div>
				
				<div className="grid md:grid-cols-3 gap-12">
					{steps.map((step, i) => {
						const Icon = step.icon;
						return (
							<div key={i} className="flex flex-col gap-6">
								<div className="h-12 w-12 rounded-xl bg-white border border-[#ebebeb] flex items-center justify-center text-[#222222] shadow-sm">
									<Icon size={24} />
								</div>
								<div>
									<h3 className="text-lg font-semibold text-[#222222] mb-2">{step.title}</h3>
									<p className="text-[#6a6a6a] leading-relaxed">{step.description}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
