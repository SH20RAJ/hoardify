import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HoardingHero() {
	return (
		<section className="mt-8 px-6">
			<div className="relative overflow-hidden rounded-2xl bg-[#f7f7f7] px-8 py-16 border border-[#ebebeb]">
				<div className="relative z-10 max-w-2xl">
					<h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-[#222222] mb-6">
						Own the streets <br />
						<span className="text-[#ff385c]">with Hoardify.</span>
					</h1>
					<p className="max-w-md text-lg text-[#6a6a6a] leading-relaxed mb-10">
						Deploy your brand on Ranchi&apos;s most high-impact inventory. Precision-targeted and physically dominant.
					</p>
					
					<div className="flex flex-col sm:flex-row gap-4">
						<Link 
							href="/search" 
							className="px-8 py-3 rounded-lg bg-[#ff385c] text-white font-bold text-base flex items-center justify-center gap-2 transition-all hover:bg-[#e00b41]"
						>
							Explore Map <ArrowRight size={18} />
						</Link>
						<div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-white border border-[#dddddd]">
							<div className="h-2 w-2 rounded-full bg-[#008a05]" />
							<span className="text-sm font-semibold text-[#222222]">100% Verified Ranchi Inventory</span>
						</div>
					</div>
				</div>

				{/* Minimal Stats Badge */}
				<div className="absolute top-12 right-12 hidden lg:block">
					<div className="bg-white p-8 rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,0.12)] border border-[#ebebeb]">
						<div className="text-4xl font-bold text-[#222222] mb-1">1.2M+</div>
						<div className="text-xs font-semibold text-[#6a6a6a] uppercase tracking-wider">Monthly Reach</div>
						<div className="mt-4 flex items-center gap-2">
							<div className="h-1.5 w-1.5 rounded-full bg-[#008a05]" />
							<span className="text-[10px] font-bold text-[#008a05] uppercase">Live Coverage</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
