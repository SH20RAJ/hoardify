"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";

export default function LandingHero() {
	return (
		<section className="relative pt-32 pb-40 overflow-hidden bg-white">
			{/* Subtle Background Elements */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[100%] bg-radial-gradient from-[#082390]/5 via-transparent to-transparent opacity-50 pointer-events-none" />
			
			<div className="container relative z-10 mx-auto px-6">
				<div className="flex flex-col items-center text-center max-w-5xl mx-auto">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/5 border border-brand/10 text-brand text-[10px] font-bold uppercase tracking-[0.2em] mb-12 animate-fade-in">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
						</span>
						Live in Ranchi & Beyond
					</div>

					<h1 className="text-7xl md:text-9xl font-black leading-[0.85] tracking-tight text-[#111111] mb-12">
						DOMINATE <br />
						<span className="text-[#082390]">THE CITY.</span>
					</h1>
					
					<p className="text-xl md:text-2xl font-medium text-text-secondary leading-relaxed mb-16 max-w-3xl">
						Deploy your brand on Ranchi&apos;s most high-impact outdoor inventory. <br className="hidden md:block" />
						Verified, searchable, and physically dominant.
					</p>

					<div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center">
						<Link 
							href="/search" 
							className="group relative px-10 py-5 rounded-2xl bg-[#082390] text-white font-bold text-lg flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-premium-lg hover:shadow-premium-xl"
						>
							Launch Campaign 
							<ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
						</Link>
						<Link 
							href="/filters" 
							className="px-10 py-5 rounded-2xl bg-white border border-[#e5e5e5] text-[#111111] font-bold text-lg hover:bg-[#fafafa] transition-all active:scale-95 flex items-center gap-3"
						>
							<div className="w-8 h-8 rounded-full bg-[#f0f0f0] flex items-center justify-center">
								<Play size={14} fill="#111111" />
							</div>
							How it Works
						</Link>
					</div>
				</div>
			</div>

			<div className="mt-32 px-6 max-w-7xl mx-auto">
				<div className="relative rounded-[2.5rem] overflow-hidden shadow-premium-xl border-[8px] border-white group">
					<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
					<Image 
						src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
						alt="Hoardify Dashboard" 
						width={2070}
						height={887}
						className="w-full aspect-[21/9] object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
						priority
					/>
					<div className="absolute bottom-10 left-10 z-20 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
						<p className="text-white text-sm font-bold uppercase tracking-widest mb-1">Impact Node Alpha</p>
						<p className="text-white/70 text-xs">Albert Ekka Chowk, Ranchi — 850k Monthly Impressions</p>
					</div>
				</div>
			</div>
		</section>
	);
}
