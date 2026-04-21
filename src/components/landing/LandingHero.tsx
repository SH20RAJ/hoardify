"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Globe } from "lucide-react";

export default function LandingHero() {
	return (
		<section className="relative pt-20 pb-32 overflow-hidden bg-background">
			{/* Uber Minimal Background */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,56,92,0.08),transparent_50%)]" />
				<div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
			</div>


			<div className="container relative z-10 mx-auto px-6">
				<div className="flex flex-col items-center text-center max-w-4xl mx-auto">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/5 border border-brand/10 text-brand text-[11px] font-black uppercase tracking-[0.2em] mb-12 animate-fade-in">
						<Sparkles size={14} fill="currentColor" /> The Google Ads for the Offline World
					</div>
					
					<h1 className="text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter text-text-primary mb-10 italic uppercase">
						Own the <br />
						<span className="text-brand drop-shadow-brand">Streets.</span>
					</h1>
					
					<p className="text-xl md:text-2xl font-medium text-text-secondary leading-relaxed mb-14 max-w-2xl">
						Deploy your brand on Ranchi&apos;s most high-impact inventory. Searchable, bookable, and physically dominant.
					</p>

					<div className="flex flex-col sm:flex-row items-center gap-6 mb-20 w-full justify-center">
						<Link 
							href="/search" 
							className="w-full sm:w-auto px-12 py-6 rounded-[2rem] bg-brand text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-brand/30"
						>
							Launch Campaign <ArrowRight size={20} />
						</Link>
						<Link 
							href="/filters" 
							className="w-full sm:w-auto px-12 py-6 rounded-[2rem] bg-surface-sunken border border-border-subtle text-text-primary font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all hover:bg-white dark:hover:bg-zinc-800"
						>
							Browse Inventory
						</Link>
					</div>

					{/* Trust Badges */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 opacity-40 hover:opacity-100 transition-opacity duration-700">
						<div className="flex items-center gap-3">
							<ShieldCheck size={18} />
							<span className="text-[10px] font-black uppercase tracking-widest">Verified Listings</span>
						</div>
						<div className="flex items-center gap-3">
							<Zap size={18} />
							<span className="text-[10px] font-black uppercase tracking-widest">Instant Booking</span>
						</div>
						<div className="flex items-center gap-3 border-x border-border-subtle px-8 hidden md:flex">
							<Globe size={18} />
							<span className="text-[10px] font-black uppercase tracking-widest">Central Ranchi</span>
						</div>
						<div className="flex items-center gap-3">
							<Sparkles size={18} />
							<span className="text-[10px] font-black uppercase tracking-widest">AI Intelligence</span>
						</div>
					</div>
				</div>
			</div>

			{/* Floating Dashboard Preview (Aesthetic only) */}
			<div className="mt-24 px-6 relative max-w-6xl mx-auto">
				<div className="relative rounded-[3rem] overflow-hidden border border-border-subtle shadow-2xl shadow-black/20 group">
					<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
					<Image 
						src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
						alt="Hoardify Intelligence Dashboard" 
						width={2070}
						height={887}
						className="w-full aspect-[21/9] object-cover transition-transform duration-[3000ms] group-hover:scale-110"
					/>
					
					{/* Glassmorphic Data Point Overlays */}
					<div className="absolute top-12 left-12 z-20 glass-effect p-6 rounded-3xl border border-white/10 hidden md:block animate-bounce-subtle">
						<div className="text-3xl font-black text-brand mb-1">1.2M+</div>
						<div className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Avg. Monthly Impressions</div>
					</div>

					<div className="absolute bottom-20 right-12 z-20 glass-effect p-6 rounded-3xl border border-white/10 hidden md:block animate-pulse">
						<div className="flex items-center gap-3 mb-2">
							<div className="h-2 w-2 rounded-full bg-green-500" />
							<span className="text-[9px] font-black uppercase tracking-widest">Live Inventory</span>
						</div>
						<div className="text-xl font-black">56+ Premium Nodes</div>
					</div>
				</div>
			</div>
		</section>
	);
}
