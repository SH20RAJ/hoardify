import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HoardingHero() {
	return (
		<section className="mt-6 px-4">
			<div className="relative overflow-hidden rounded-[2rem] bg-zinc-950 p-8 text-white shadow-2xl shadow-zinc-950/20">
				<div className="relative z-10 max-w-[240px]">
					<h1 className="text-3xl font-black leading-[1.1] tracking-tight">
						Book the world&apos;s <span className="text-brand">biggest</span> stages.
					</h1>
					<p className="mt-3 text-sm font-medium text-zinc-400">
						Premium billboards in high-traffic locations. 
					</p>
					<Link href="/search" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-black uppercase tracking-widest text-zinc-950 transition-all hover:scale-105 active:scale-95">
						Start Exploring <ArrowRight size={14} />
					</Link>
				</div>
				
				{/* Abstract UI Elements for "Startup" feel */}
				<div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand opacity-20 blur-[80px]" />
				<div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-500 opacity-20 blur-[80px]" />
			</div>
		</section>
	);
}
