import Link from "next/link";
import { MapPinned } from "lucide-react";

export default function ExploreMapCard() {
	return (
		<section className="mt-8 px-4 pb-6">
			<div className="card-surface rounded-3xl border border-[#00000012] bg-gradient-to-br from-[#fff7f8] to-white p-5">
				<div className="flex items-center gap-3">
					<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff385c] text-white shadow-md">
						<MapPinned size={22} />
					</div>
					<div>
						<h3 className="text-base font-semibold text-[#202020]">Open immersive map view</h3>
						<p className="text-sm text-[#6d6d6d]">Scan premium hoardings by neighborhood and traffic hotspots.</p>
					</div>
				</div>
				<Link href="/search" className="btn-primary mt-4 block w-full text-center">
					Explore on map
				</Link>
			</div>
		</section>
	);
}
