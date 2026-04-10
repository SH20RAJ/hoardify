import Link from "next/link";
import { MapPin, Grid, ArrowRight } from "lucide-react";

export default function MapBridge() {
	return (
		<section className="mt-12 px-6">
			<div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-100 to-zinc-200 p-8 dark:from-zinc-900 dark:to-zinc-800 border border-border-subtle">
				<div className="relative z-10">
					<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-xl shadow-brand/30 mb-6">
						<MapPin size={24} />
					</div>
					<h3 className="text-3xl font-black tracking-tight text-text-primary mb-2">Visual Planning</h3>
					<p className="text-sm font-medium text-text-secondary mb-8 max-w-[280px]">
						Use our interactive map to plan your city-wide coverage and optimize your reach effortlessly.
					</p>
					<Link href="/search" className="btn-action btn-primary w-fit inline-flex items-center gap-3 group/btn">
						<span>Open Intelligence Map</span>
						<ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
					</Link>

				</div>
				
				{/* Decorative Map Pattern or Mesh */}
				<div className="absolute -bottom-10 -right-10 h-48 w-48 opacity-10 rotate-12">
					<Grid size={120} className="text-text-primary" />
				</div>
			</div>
		</section>
	);
}
