import { X, Check, ShieldAlert, Sparkles } from "lucide-react";

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
		<section className="py-32 bg-white">
			<div className="container mx-auto px-6 max-w-7xl">
				<div className="text-center max-w-3xl mx-auto mb-24">
					<h2 className="text-4xl md:text-5xl font-black text-[#111111] mb-6 tracking-tight">
						A better way to deploy.
					</h2>
					<p className="text-lg text-text-secondary leading-relaxed">
						We&apos;ve replaced traditional agency chaos with a streamlined, digital-first intelligence system designed for the modern brand.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="group p-12 rounded-[2.5rem] bg-surface-sunken border border-border-subtle hover:bg-white hover:shadow-premium-xl transition-all duration-700">
						<div className="flex items-center gap-4 mb-10">
							<div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-text-tertiary shadow-premium-sm group-hover:text-red-500 transition-colors">
								<ShieldAlert size={24} />
							</div>
							<h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-tertiary">Traditional Chaos</h3>
						</div>
						<ul className="space-y-8">
							{traditionalFlaws.map((flaw, i) => (
								<li key={i} className="flex items-center gap-6 group/item">
									<div className="w-6 h-6 rounded-full border border-border-strong flex items-center justify-center text-text-tertiary group-hover/item:border-red-200 group-hover/item:bg-red-50 transition-all">
										<X size={12} strokeWidth={3} />
									</div>
									<span className="text-base text-text-secondary group-hover/item:text-[#111111] transition-colors">{flaw}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="group p-12 rounded-[2.5rem] bg-brand text-white shadow-premium-lg hover:shadow-premium-xl transition-all duration-700 hover:-translate-y-2">
						<div className="flex items-center gap-4 mb-10">
							<div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white/80 shadow-premium-sm">
								<Sparkles size={24} />
							</div>
							<h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Hoardify Advantage</h3>
						</div>
						<ul className="space-y-8">
							{hoardifyAdvantages.map((adv, i) => (
								<li key={i} className="flex items-center gap-6 group/item">
									<div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-brand transition-all">
										<Check size={12} strokeWidth={4} />
									</div>
									<span className="text-base font-bold text-white/90 group-hover/item:text-white transition-colors">{adv}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
