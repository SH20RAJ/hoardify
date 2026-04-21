"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function LandingHero() {
	return (
		<section className="relative pt-20 pb-32 overflow-hidden bg-white">
			<div className="container relative z-10 mx-auto px-6">
				<div className="flex flex-col items-center text-center max-w-4xl mx-auto">
					<h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tight text-[#222222] mb-10">
						Own the <br />
						<span className="text-[#ff385c]">Streets.</span>
					</h1>
					
					<p className="text-xl md:text-2xl font-medium text-[#6a6a6a] leading-relaxed mb-14 max-w-2xl">
						Deploy your brand on Ranchi&apos;s most high-impact inventory. Searchable, bookable, and physically dominant.
					</p>

					<div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center">
						<Link 
							href="/search" 
							className="px-8 py-4 rounded-lg bg-[#ff385c] text-white font-bold text-lg flex items-center gap-2 transition-all hover:bg-[#e00b41]"
						>
							Launch Campaign <ArrowRight size={20} />
						</Link>
						<Link 
							href="/filters" 
							className="px-8 py-4 rounded-lg bg-white border border-[#dddddd] text-[#222222] font-bold text-lg hover:bg-[#f7f7f7]"
						>
							Browse Inventory
						</Link>
					</div>
				</div>
			</div>

			<div className="mt-24 px-6 max-w-6xl mx-auto">
				<div className="relative rounded-2xl overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
					<Image 
						src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
						alt="Hoardify Dashboard" 
						width={2070}
						height={887}
						className="w-full aspect-[21/9] object-cover"
						priority
					/>
				</div>
			</div>
		</section>
	);
}
