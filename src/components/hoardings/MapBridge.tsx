import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export default function MapBridge() {
	return (
		<section className="px-4">
			<div className="relative overflow-hidden rounded-2xl bg-[#f7f7f7] p-6 border border-[#ebebeb]">
				<div className="relative z-10">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#082390] text-white mb-5">
						<MapPin size={22} />
					</div>
					<h3 className="text-xl font-semibold text-[#222222] mb-2">Visual Planning</h3>
					<p className="text-[#6a6a6a] mb-6 max-w-sm leading-relaxed">
						Use our interactive map to plan your city-wide coverage and optimize your reach effortlessly.
					</p>
					<Link 
						href="/search" 
						className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#222222] text-white font-bold text-sm transition-all hover:bg-black"
					>
						<span>Open Intelligence Map</span>
						<ArrowRight size={18} />
					</Link>
				</div>
			</div>
		</section>
	);
}
