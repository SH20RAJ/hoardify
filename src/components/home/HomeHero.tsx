import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";

export default function HomeHero() {
	return (
		<section className="px-4 pt-4">
			<div className="rounded-[30px] border border-[#0000000f] bg-gradient-to-br from-[#fff5f6] via-white to-[#fff9f2] p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
				<div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#ff385c]">
					<MapPin size={14} />
					India-wide inventory
				</div>
				<h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#1f1f1f]">
					Book billboard spaces
					<span className="block text-[#ff385c]">like Airbnb stays.</span>
				</h1>
				<p className="mt-2 max-w-xl text-sm text-[#5c5c5c]">
					Discover high-converting outdoor ad spots with transparent pricing, footfall insights, and one-click inquiries.
				</p>

				<Link
					href="/search"
					className="mt-5 flex h-14 items-center justify-between rounded-2xl border border-[#00000012] bg-white px-4 shadow-sm transition hover:shadow-md"
				>
					<div className="flex items-center gap-3 text-left">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff385c] text-white">
							<Search size={18} />
						</div>
						<div>
							<p className="text-sm font-semibold text-[#202020]">Where do you want visibility?</p>
							<p className="text-xs text-[#767676]">Mumbai, Bangalore, Delhi NCR…</p>
						</div>
					</div>
					<ArrowRight size={18} className="text-[#222222]" />
				</Link>
			</div>
		</section>
	);
}
