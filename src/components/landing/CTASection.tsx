"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
	return (
		<section className="py-24 px-6 bg-white">
			<div className="container mx-auto">
				<div className="rounded-2xl border border-[#ebebeb] px-8 py-16 text-center max-w-4xl mx-auto shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
					<h2 className="text-3xl md:text-5xl font-semibold text-[#222222] mb-6">
						Ready to scale your visibility?
					</h2>
					
					<p className="text-lg text-[#6a6a6a] mb-10 max-w-xl mx-auto">
						Stop guessing. Start dominating. Join the platform that&apos;s digitizing outdoor advertising.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link 
							href="/search" 
							className="px-8 py-4 rounded-lg bg-[#ff385c] text-white font-bold text-lg flex items-center justify-center gap-2 transition-all hover:bg-[#e00b41]"
						>
							Get Started <ArrowRight size={20} />
						</Link>
						<Link 
							href="/filters" 
							className="px-8 py-4 rounded-lg bg-white border border-[#222222] text-[#222222] font-bold text-lg hover:bg-[#f7f7f7] flex items-center justify-center"
						>
							Browse Inventory
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
