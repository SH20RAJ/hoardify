import { X, Check } from "lucide-react";

const traditionalFlaws = [
	"Fragmented workflow across agencies.",
	"Hidden fees and non-transparent pricing.",
	"Zero performance tracking or analytics.",
	"Manual discovery and slow deployments.",
];

const hoardifyAdvantages = [
	"End-to-end automated deployment.",
	"100% transparent, upfront pricing.",
	"AI-driven reach & traffic insights.",
	"Search, compare, and book instantly.",
];

export default function AdvantageSection() {
	return (
		<section className="py-24 bg-[#ffffff]">
			<div className="container mx-auto px-6">
				<div className="max-w-2xl mb-16">
					<h2 className="text-3xl font-semibold text-[#222222] mb-4">
						A better way to deploy OOH.
					</h2>
					<p className="text-[#6a6a6a]">
						We&apos;ve replaced traditional agency chaos with a streamlined, digital-first intelligence system.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					<div>
						<h3 className="text-xs font-bold uppercase tracking-wider text-[#929292] mb-8">Traditional Agencies</h3>
						<ul className="space-y-6">
							{traditionalFlaws.map((flaw, i) => (
								<li key={i} className="flex items-start gap-4">
									<X size={18} className="text-[#ff385c] mt-0.5 shrink-0" />
									<span className="text-[#222222]">{flaw}</span>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-xs font-bold uppercase tracking-wider text-[#929292] mb-8">The Hoardify System</h3>
						<ul className="space-y-6">
							{hoardifyAdvantages.map((adv, i) => (
								<li key={i} className="flex items-start gap-4">
									<Check size={18} className="text-[#008a05] mt-0.5 shrink-0" />
									<span className="text-[#222222] font-medium">{adv}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
