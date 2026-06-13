"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
	return (
		<section className="py-20 md:py-40 px-4 md:px-6 bg-white overflow-hidden relative">
			{/* Decorative Elements */}
			<div className="absolute top-1/2 left-0 -translate-y-1/2 w-40 sm:w-64 h-40 sm:h-64 bg-brand/5 rounded-full blur-3xl" />
			<div className="absolute top-1/2 right-0 -translate-y-1/2 w-40 sm:w-64 h-40 sm:h-64 bg-brand/5 rounded-full blur-3xl" />
			
			<div className="container mx-auto relative z-10">
				<div className="group relative rounded-[2rem] md:rounded-[3rem] bg-[#111111] px-5 sm:px-8 py-16 md:py-32 text-center max-w-6xl mx-auto shadow-premium-xl overflow-hidden">
					{/* Animated Background Pulse */}
					<div className="absolute inset-0 bg-radial-gradient from-brand/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
					
					<div className="relative z-10 flex flex-col items-center">
						<div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 flex items-center justify-center text-brand mb-6 md:mb-10 shadow-premium-lg">
							<Sparkles size={32} fill="currentColor" />
						</div>
						
						<h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-5 md:mb-8 tracking-tighter leading-tight">
							Ready to scale <br className="hidden md:block" />
							your <span className="text-brand">visibility?</span>
						</h2>
						
						<p className="text-base sm:text-xl text-white/60 mb-8 md:mb-14 max-w-2xl mx-auto leading-relaxed font-medium">
							Stop guessing. Start dominating. Join the platform that&apos;s digitizing outdoor advertising for the next generation of brands.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
							<Link 
								href="/search" 
								className="w-full px-8 py-4 rounded-2xl bg-brand text-white font-bold text-base flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-premium-lg"
							>
								Launch Now <ArrowRight size={20} strokeWidth={3} />
							</Link>
							<Link 
								href="/filters" 
								className="w-full px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-base hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center backdrop-blur-sm"
							>
								Browse Map
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
