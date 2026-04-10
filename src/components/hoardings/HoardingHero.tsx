import Link from "next/link";
import { ArrowRight, Globe, Sparkles } from "lucide-react";

export default function HoardingHero() {
	return (
		<section className="mt-6 px-6">
			<div className="relative overflow-hidden rounded-[3.5rem] bg-zinc-950 px-8 py-20 text-white shadow-2xl shadow-zinc-950/20 group border border-white/5">
				{/* Complex Mesh Gradient Background */}
				<div className="absolute inset-0 pointer-events-none overflow-hidden">
					<div className="absolute -top-1/4 -right-1/4 w-3/4 aspect-square bg-brand/30 blur-[150px] rounded-full animate-pulse opacity-50" />
					<div className="absolute -bottom-1/4 -left-1/4 w-3/4 aspect-square bg-blue-600/20 blur-[150px] rounded-full animate-pulse delay-700 opacity-30" />
					<div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
				</div>

				<div className="relative z-10 max-w-2xl">
					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand text-[11px] font-black uppercase tracking-[0.2em] mb-10">
						<Sparkles size={14} fill="currentColor" /> Premium Context 7 Deployment
					</div>
					<h1 className="text-6xl md:text-8xl font-black leading-[0.8] tracking-tighter mb-10 italic">
						OWN THE <br />
						<span className="text-brand drop-shadow-brand">STREETS.</span>
					</h1>
					<p className="max-w-md text-base md:text-xl font-medium text-zinc-400 leading-relaxed mb-12">
						Deploy your brand on Ranchi&apos;s most high-impact inventory. Precision-targeted, physically dominant, and ready for market dominance.
					</p>
					
					<div className="flex flex-col sm:flex-row gap-5">
						<Link href="/search" className="btn-action bg-brand px-10 py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-brand/30">
							Explore Map <ArrowRight size={20} className="ml-1" />
						</Link>
						<div className="flex items-center gap-5 px-7 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
							<Globe className="text-zinc-500" size={24} />
							<div className="flex flex-col">
								<span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 opacity-80">Live Coverage</span>
								<span className="text-sm font-bold">100% Verified Ranchi Inventory</span>
							</div>
						</div>
					</div>
				</div>
				
				{/* Floating Data Badge */}
				<div className="absolute top-16 right-16 hidden lg:block rotate-6 group-hover:rotate-0 transition-transform duration-1000">
					<div className="glass-effect p-8 rounded-[2.5rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] bg-zinc-900/40 backdrop-blur-2xl">
						<div className="text-5xl font-black mb-1 tracking-tighter">1.2M+</div>
						<div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Monthly Reach</div>
						<div className="mt-6 flex items-center gap-2">
							<div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
							<span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Active Now</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}


