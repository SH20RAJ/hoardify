import { Metadata } from "next";
import { Eye, SunMedium, CloudLightning } from "lucide-react";
import NavbarSync from "@/components/layout/NavbarSync";

export const metadata: Metadata = {
	title: "Filters | Hoardify",
	description: "Filter hoardings by type, size, price, and features to find the perfect billboard for your campaign.",
};

export default function FiltersPage() {
	return (
		<div className="flex flex-col min-h-screen bg-white pb-32">
			<NavbarSync 
				title="Filters"
				showBack
				isLogo={false}
				rightAction={<button className="text-sm font-semibold text-[#222222] underline underline-offset-4">Clear all</button>}
			/>

			<div className="max-w-3xl mx-auto w-full px-6 py-10 flex flex-col gap-12">
				{/* Type of board */}
				<section>
					<h3 className="text-2xl font-semibold text-[#222222] mb-6">Type of board</h3>
					<div className="flex flex-wrap gap-3">
						{["Classic Billboard", "Digital Billboard", "Mobile Billboard", "Transit ads", "Airport ads", "Shopping Mall Hoarding"].map((type, i) => (
							<button key={i} className={`px-5 py-3 rounded-full border text-sm font-medium transition-all ${i === 0 ? "border-[#222222] bg-[#f7f7f7] text-[#222222]" : "border-[#dddddd] text-[#222222] hover:border-[#222222]"}`}>
								{type}
							</button>
						))}
					</div>
				</section>

				{/* Size */}
				<section>
					<h3 className="text-2xl font-semibold text-[#222222] mb-6">What size do you want?</h3>
					<div className="flex flex-wrap gap-3">
						{["Large 14x48 ft", "Medium 10x30 ft", "Small 8x24 ft"].map((size, i) => (
							<button key={i} className={`px-5 py-3 rounded-full border text-sm font-medium transition-all ${i === 0 ? "border-[#222222] bg-[#f7f7f7] text-[#222222]" : "border-[#dddddd] text-[#222222] hover:border-[#222222]"}`}>
								{size}
							</button>
						))}
					</div>
				</section>

				{/* Price Range */}
				<section>
					<h3 className="text-2xl font-semibold text-[#222222] mb-6">Price range</h3>
					<p className="text-[#717171] mb-8">Average monthly rate is ₹ 92,000</p>
					<div className="flex items-center gap-4">
						<div className="flex-1 p-4 border border-[#dddddd] rounded-xl">
							<div className="text-xs text-[#717171]">Minimum</div>
							<div className="text-base font-medium text-[#222222]">₹ 80,000</div>
						</div>
						<div className="w-4 h-[1px] bg-[#dddddd]" />
						<div className="flex-1 p-4 border border-[#dddddd] rounded-xl">
							<div className="text-xs text-[#717171]">Maximum</div>
							<div className="text-base font-medium text-[#222222]">₹ 1,25,000</div>
						</div>
					</div>
				</section>

				{/* Features */}
				<section>
					<h3 className="text-2xl font-semibold text-[#222222] mb-6">Features</h3>
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
						<button className="flex flex-col items-start p-4 border-2 border-[#222222] rounded-xl gap-6 aspect-square transition-all">
							<Eye size={32} className="text-[#222222]" />
							<span className="text-sm font-semibold text-[#222222]">High visibility</span>
						</button>
						<button className="flex flex-col items-start p-4 border border-[#dddddd] rounded-xl gap-6 aspect-square hover:border-[#222222] transition-all">
							<SunMedium size={32} className="text-[#222222]" />
							<span className="text-sm font-semibold text-[#222222]">Back lighting</span>
						</button>
						<button className="flex flex-col items-start p-4 border border-[#dddddd] rounded-xl gap-6 aspect-square hover:border-[#222222] transition-all">
							<CloudLightning size={32} className="text-[#222222]" />
							<span className="text-sm font-semibold text-[#222222]">Weather proof</span>
						</button>
					</div>
				</section>
			</div>

			<div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#ebebeb] flex items-center justify-between z-50">
				<button className="text-sm font-bold text-[#222222] underline underline-offset-4">Clear all</button>
				<button className="px-10 py-3.5 bg-[#222222] text-white rounded-lg font-bold">Show 56 results</button>
			</div>
		</div>
	);
}
