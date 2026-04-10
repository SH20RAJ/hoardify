import Link from "next/link";
import { ArrowRight, Globe, Sparkles } from "lucide-react";

export default function HoardingHero() {
	return (
		<section className="mt-6 px-6">
			<div className="relative overflow-hidden rounded-[3rem] bg-zinc-950 px-8 py-16 text-white shadow-2xl shadow-zinc-950/20 group">
				<div className="relative z-10 max-w-xl">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand text-[10px] font-black uppercase tracking-widest mb-8">
						<Sparkles size={12} fill="currentColor" /> Market Dominance Refined
					</div>
					<h1 className="text-5xl md:text-7xl font-black leading-[0.85] tracking-tighter mb-8 italic">
						OWN THE <br />
						<span className="text-brand">STREETS.</span>
					</h1>
					<p className="max-w-md text-base md:text-lg font-medium text-zinc-400 leading-relaxed mb-10">
						Deploy your brand on Ranchi&apos;s most high-impact inventory. Precision-targeted, physically dominant, and ready for your next campaign.
					</p>
					
					<div className="flex flex-col sm:flex-row gap-4">
						<Link href="/search" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-brand px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand/20">
							Explore Map <ArrowRight size={18} />
						</Link>
						<div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
							<Globe className="text-zinc-500" size={20} />
							<div className="flex flex-col">
								<span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Live Coverage</span>
								<span className="text-xs font-bold">100% Verified Ranchi Inventory</span>
							</div>
						</div>
					</div>
				</div>
				
				{/* Immersive Background UI Elements */}
				<div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden pointer-events-none opacity-40 md:opacity-100">
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square bg-brand/20 blur-[120px] rounded-full animate-pulse" />
					<div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
				</div>
				
				{/* Floating Badge */}
				<div className="absolute top-12 right-12 hidden md:block rotate-12 group-hover:rotate-0 transition-transform duration-700">
					<div className="glass-effect p-6 rounded-3xl border border-white/10 shadow-2xl">
						<div className="text-4xl font-black mb-1">1.2M+</div>
						<div className="text-[10px] font-black uppercase tracking-widest opacity-50">Monthly Impressions</div>
					</div>
				</div>
			</div>
		</section>
	);
}

