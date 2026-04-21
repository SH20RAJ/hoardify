import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export default function MapBridge() {
	return (
		<section className="px-6">
			<div className="relative overflow-hidden rounded-2xl bg-[#f7f7f7] p-8 border border-[#ebebeb]">
				<div className="relative z-10">
					<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ff385c] text-white mb-6">
						<MapPin size={24} />
					</div>
					<h3 className="text-2xl font-semibold text-[#222222] mb-2">Visual Planning</h3>
					<p className="text-[#6a6a6a] mb-8 max-w-sm leading-relaxed">
						Use our interactive map to plan your city-wide coverage and optimize your reach effortlessly.
					</p>
					<Link 
						href="/search" 
						className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#222222] text-white font-bold text-sm transition-all hover:bg-black"
					>
						<span>Open Intelligence Map</span>
						<ArrowRight size={18} />
					</Link>
				</div>
			</div>
		</section>
	);
}
