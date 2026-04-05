import TopBar from "@/components/layout/TopBar";
import Pill from "@/components/ui/Pill";
import { Eye, SunMedium, CloudLightning } from "lucide-react";

export default function FiltersPage() {
	return (
		<div className="flex flex-col min-h-screen bg-white dark:bg-black pb-20">
			<TopBar 
				title="Filters" 
				showBack 
				rightAction={<button className="text-sm font-medium text-gray-500">Clear all</button>} 
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
						<div className="px-3 py-1 border border-gray-200 rounded-full text-sm font-semibold dark:border-gray-800">
							₹ 80,000
						</div>
						<div className="px-3 py-1 border border-gray-200 rounded-full text-sm font-semibold dark:border-gray-800">
							₹ 1,25,000
						</div>
					</div>
					<div className="px-2 mt-4">
						<div className="h-1 bg-gray-200 rounded-full relative dark:bg-gray-800">
							<div className="absolute left-[30%] right-[20%] h-full bg-brand rounded-full"></div>
							<div className="absolute left-[30%] top-1/2 -mt-2.5 -ml-2.5 h-5 w-5 bg-brand rounded-full border-2 border-white shadow"></div>
							<div className="absolute right-[20%] top-1/2 -mt-2.5 -mr-2.5 h-5 w-5 bg-brand rounded-full border-2 border-white shadow"></div>
						</div>
					</div>
				</section>

				{/* Features */}
				<section>
					<h3 className="text-sm font-semibold mb-3">Features</h3>
					<div className="flex flex-wrap gap-3">
						<button className="flex flex-col items-center justify-center p-3 border-2 border-brand text-brand bg-brand/5 rounded-2xl gap-2 w-[100px] aspect-square">
							<Eye size={24} />
							<span className="text-xs font-semibold text-center leading-tight">High visibility</span>
						</button>
						<button className="flex flex-col items-center justify-center p-3 border border-gray-200 text-gray-500 rounded-2xl gap-2 w-[100px] aspect-square dark:border-gray-800">
							<SunMedium size={24} />
							<span className="text-xs font-medium text-center leading-tight">Back lighting</span>
						</button>
						<button className="flex flex-col items-center justify-center p-3 border border-gray-200 text-gray-500 rounded-2xl gap-2 w-[100px] aspect-square dark:border-gray-800">
							<CloudLightning size={24} />
							<span className="text-xs font-medium text-center leading-tight">Weather proof</span>
						</button>
					</div>
				</section>
			</div>
		</div>
	);
}
