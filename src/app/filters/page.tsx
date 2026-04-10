import { Metadata } from "next";
import Pill from "@/components/ui/Pill";
import { Eye, SunMedium, CloudLightning } from "lucide-react";
import NavbarSync from "@/components/layout/NavbarSync";

export const metadata: Metadata = {
	title: "Filters | Hoardify",
	description: "Filter hoardings by type, size, price, and features to find the perfect billboard for your campaign.",
};

export default function FiltersPage() {
	return (
		<div className="flex flex-col min-h-screen bg-background pb-32">
			<NavbarSync 
				title="Filters"
				showBack
				isLogo={false}
				rightAction={<button className="text-sm font-bold text-brand hover:opacity-80 transition-opacity">Clear all</button>}
			/>

			<div className="px-5 py-4 flex flex-col gap-8">
				{/* Type of board */}
				<section>
					<h3 className="text-sm font-semibold mb-3">Type of board</h3>
					<div className="flex flex-wrap gap-2">
						<Pill label="Classic Billboard" variant="solid" active />
						<Pill label="Digital Billboard" />
						<Pill label="Mobile Billboard" />
						<Pill label="Transit ads" />
						<Pill label="Airport ads" />
						<Pill label="Shopping Mall Hoarding" />
					</div>
				</section>

				{/* Size */}
				<section>
					<h3 className="text-sm font-semibold mb-3">What size do you want?</h3>
					<div className="flex flex-wrap gap-2">
						<Pill label="Large 14x48 ft" variant="solid" active />
						<Pill label="Medium 10x30 ft" />
						<Pill label="Small 8x24 ft" />
					</div>
				</section>

				{/* Price Range */}
				<section>
					<h3 className="text-sm font-semibold mb-3">Price range</h3>
					<div className="flex justify-between items-center mb-2 px-2">
						<div className="px-3 py-1 border border-border-subtle rounded-full text-sm font-semibold">
							₹ 80,000
						</div>
						<div className="px-3 py-1 border border-border-subtle rounded-full text-sm font-semibold">
							₹ 1,25,000
						</div>
					</div>
					<div className="px-2 mt-4">
						<div className="h-1 bg-surface-sunken rounded-full relative">
							<div className="absolute left-[30%] right-[20%] h-full bg-brand rounded-full"></div>
							<div className="absolute left-[30%] top-1/2 -mt-2.5 -ml-2.5 h-5 w-5 bg-brand rounded-full border-2 border-white shadow-lg"></div>
							<div className="absolute right-[20%] top-1/2 -mt-2.5 -mr-2.5 h-5 w-5 bg-brand rounded-full border-2 border-white shadow-lg"></div>
						</div>
					</div>
				</section>

				{/* Features */}
				<section>
					<h3 className="text-sm font-semibold mb-3">Features</h3>
					<div className="flex flex-wrap gap-3">
						<button className="flex flex-col items-center justify-center p-3 border-2 border-brand text-brand bg-brand/5 rounded-2xl gap-2 w-[100px] aspect-square transition-transform active:scale-95">
							<Eye size={24} />
							<span className="text-xs font-semibold text-center leading-tight">High visibility</span>
						</button>
						<button className="flex flex-col items-center justify-center p-3 border border-border-subtle text-text-tertiary rounded-2xl gap-2 w-[100px] aspect-square hover:border-brand/40 transition-transform active:scale-95">
							<SunMedium size={24} />
							<span className="text-xs font-medium text-center leading-tight">Back lighting</span>
						</button>
						<button className="flex flex-col items-center justify-center p-3 border border-border-subtle text-text-tertiary rounded-2xl gap-2 w-[100px] aspect-square hover:border-brand/40 transition-transform active:scale-95">
							<CloudLightning size={24} />
							<span className="text-xs font-medium text-center leading-tight">Weather proof</span>
						</button>
					</div>
				</section>
			</div>
		</div>
	);
}
