import { X, Check } from "lucide-react";

// Static data extraction for optimization
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
		<section className="py-32 bg-surface-sunken">
			<div className="container mx-auto px-6">
				<div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
					<div className="text-brand text-[10px] font-black uppercase tracking-[0.4em] mb-4">The Shift</div>
					<h2 className="text-4xl md:text-6xl font-black tracking-tighter text-text-primary uppercase italic">
						Chaos vs <br />
						<span className="text-brand">Intelligence.</span>
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
					{/* Traditional */}
					<div className="p-10 md:p-14 rounded-[2rem] bg-background border border-border-subtle opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0">
						<div className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary mb-8">Traditional Agencies</div>
						<ul className="space-y-6">
							{traditionalFlaws.map((flaw, i) => (
								<li key={i} className="flex items-start gap-4">
									<div className="mt-0.5 rounded-full bg-red-500/10 p-1 text-red-500 shrink-0">
										<X size={14} strokeWidth={3} />
									</div>
									<span className="text-sm font-medium text-text-secondary">{flaw}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Hoardify */}
					<div className="p-10 md:p-14 rounded-[2rem] bg-zinc-950 text-white shadow-2xl relative overflow-hidden group">
						<div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-brand/20 transition-colors duration-1000" />
						<div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand mb-8 relative z-10">The Hoardify System</div>
						<ul className="space-y-6 relative z-10">
							{hoardifyAdvantages.map((adv, i) => (
								<li key={i} className="flex items-start gap-4">
									<div className="mt-0.5 rounded-full bg-brand/20 p-1 text-brand shrink-0">
										<Check size={14} strokeWidth={3} />
									</div>
									<span className="text-sm font-medium text-zinc-300">{adv}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
