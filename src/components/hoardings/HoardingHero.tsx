import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HoardingHero() {
	return (
		<section className="mt-8 px-6">
			<div className="relative overflow-hidden rounded-2xl bg-[#f7f7f7] px-8 py-16 border border-[#ebebeb]">
				<div className="relative z-10 max-w-2xl">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#222222] mb-6">
						Book Verified Hoardings &amp; Billboards Faster
					</h1>
					<p className="max-w-xl text-lg text-[#6a6a6a] leading-relaxed mb-10">
						Discover Ranchi&apos;s premium outdoor advertising spaces, compare locations, check availability, and launch high-impact campaigns without endless vendor calls.
					</p>
					
					<div className="flex flex-col sm:flex-row gap-4 mb-8">
						<Link 
							href="/search" 
							className="px-8 py-3.5 rounded-xl bg-[#082390] text-white font-bold text-base flex items-center justify-center gap-2 transition-all hover:bg-[#1d4ed8] hover:shadow-lg hover:shadow-red-100 hover:-translate-y-0.5 duration-200"
						>
							Explore Ad Spaces <ArrowRight size={18} />
						</Link>
						<Link
							href="/profile"
							className="px-8 py-3.5 rounded-xl bg-white border border-[#dddddd] text-[#222222] font-bold text-base flex items-center justify-center gap-2 hover:border-[#222222] transition-all hover:-translate-y-0.5 duration-200"
						>
							List Your Hoarding
						</Link>
					</div>

					{/* Trust Strip */}
					<div className="border-t border-[#ebebeb] pt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#717171] font-semibold">
						<span className="flex items-center gap-1.5">✓ Verified locations</span>
						<span className="flex items-center gap-1.5">✓ Transparent pricing</span>
						<span className="flex items-center gap-1.5">✓ Campaign support</span>
						<span className="flex items-center gap-1.5">✓ Built for Indian OOH advertising</span>
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
