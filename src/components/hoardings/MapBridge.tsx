import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export default function MapBridge() {
	return (
		<section className="px-4 md:px-8">
			<div className="relative overflow-hidden rounded-2xl bg-surface-sunken p-6 md:p-10 border border-border-subtle shadow-premium-sm transition-colors duration-300">
				<div className="relative z-10">
					<div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-brand text-white mb-5 md:mb-8">
						<MapPin size={22} />
					</div>
					<h3 className="text-xl md:text-2xl font-black text-text-primary mb-2 md:mb-4 tracking-tight">Visual Planning</h3>
					<p className="text-text-secondary mb-6 md:mb-8 max-w-sm md:max-w-md leading-relaxed text-sm md:text-base font-medium">
						Use our interactive map to plan your city-wide coverage and optimize your reach effortlessly.
					</p>
					<Link 
						href="/search" 
						className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-text-primary text-background font-bold text-sm transition-all hover:bg-brand hover:text-white active:scale-95 shadow-premium-md"
					>
						<span>Open Intelligence Map</span>
						<ArrowRight size={18} />
					</Link>
				</div>
			</div>
		</section>
	);
}
