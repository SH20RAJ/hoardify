import { Search, BarChart3, CalendarCheck } from "lucide-react";

const steps = [
	{
		title: "Discover Locations",
		description: "Browse curated inventory across Ranchi using our immersive map-first discovery platform.",
		icon: Search,
		color: "bg-blue-500/10 text-blue-600",
	},
	{
		title: "Analyze Reach",
		description: "Evaluate audience demographics and traffic intelligence scoring for every placement.",
		icon: BarChart3,
		color: "bg-brand/10 text-brand",
	},
	{
		title: "Instant Booking",
		description: "Secure your campaign dates with a single inquiry and get verified execution proofs.",
		icon: CalendarCheck,
		color: "bg-green-500/10 text-green-600",
	},
];

export default function ProcessSection() {
	return (
		<section className="py-24 bg-surface-sunken">
			<div className="max-w-7xl mx-auto px-4 md:px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-black tracking-tighter text-text-primary mb-4">How to Launch Your Campaign</h2>
					<p className="text-text-secondary font-medium max-w-2xl mx-auto">Digitizing the fragmented outdoor advertising market through a transparent, map-first workflow.</p>
				</div>
				
				<div className="grid md:grid-cols-3 gap-12 relative">
					{/* Connector Line (Desktop) */}
					<div className="hidden lg:block absolute top-[110px] left-[20%] right-[20%] h-[1px] bg-border-subtle" />
					
					{steps.map((step, i) => {
						const Icon = step.icon;
						return (
							<div key={i} className="relative z-10 flex flex-col items-center text-center">
								<div className={`h-24 w-24 rounded-full ${step.color} flex items-center justify-center mb-8 shadow-xl shadow-black/5 border-4 border-white`}>
									<Icon size={32} />
								</div>
								<h3 className="text-xl font-black tracking-tight text-text-primary mb-4">{step.title}</h3>
								<p className="text-sm font-medium text-text-secondary leading-relaxed px-4">{step.description}</p>
								
								{/* Step Number Badge */}
								<div className="absolute -top-4 -right-4 h-10 w-10 flex items-center justify-center rounded-full bg-white border border-border-subtle font-black text-xs text-text-tertiary shadow-sm">
									0{i + 1}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
