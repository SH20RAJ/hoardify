"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function CTASection() {
	return (
		<section className="py-32 px-6">
			<div className="container mx-auto">
				<div className="relative overflow-hidden rounded-[3.5rem] bg-zinc-950 px-8 py-24 text-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] group border border-white/5">
					{/* Energetic Background */}
					<div className="absolute inset-0 pointer-events-none overflow-hidden">
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square bg-brand/20 blur-[150px] rounded-full animate-pulse opacity-40" />
						<div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay" />
					</div>

					<div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
						<div className="h-20 w-20 rounded-3xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-10 text-brand shadow-2xl shadow-brand/10">
							<Zap size={40} fill="currentColor" className="animate-pulse" />
						</div>
						
						<h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-8">
							Ready to scale your <br />
							<span className="text-brand">Visibility?</span>
						</h2>
						
						<p className="text-lg md:text-xl font-medium text-zinc-400 mb-14 max-w-xl">
							Stop guessing. Start dominating. Join the platform that\&apos;s digitizing Indian outdoor advertising.
						</p>

						<div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
							<Link 
								href="/search" 
								className="px-12 py-6 rounded-[2rem] bg-brand text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-brand/30"
							>
								Get Started Now <ArrowRight size={20} />
							</Link>
							<Link 
								href="/about" 
								className="px-12 py-6 rounded-[2rem] bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all hover:bg-white/10"
							>
								Learn Our Story
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
