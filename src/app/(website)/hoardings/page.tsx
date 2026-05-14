import { getHoardings } from "@/actions/hoardings";
import HoardingCard from "@/components/hoardings/HoardingCard";
import NavbarSync from "@/components/layout/NavbarSync";
import { Grid, Filter } from "lucide-react";
import Link from "next/link";

export default async function HoardingsListPage() {
	const allHoardings = await getHoardings();

	return (
		<div className="flex flex-col min-h-screen bg-white pb-32">
			<NavbarSync title="All Inventory" showBack />

			<div className="max-w-7xl mx-auto w-full px-4 md:px-6 mt-10">
				<div className="flex items-center justify-between mb-10">
					<div>
						<h1 className="text-3xl font-bold text-[#222222]">Inventory List</h1>
						<p className="text-sm text-[#717171] mt-1">Showing {allHoardings.length} premium placements across Ranchi</p>
					</div>
					<div className="flex gap-3">
						<Link href="/search" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f7f7f7] border border-[#ebebeb] text-sm font-semibold hover:bg-[#efefef] transition-colors">
							<Grid size={18} />
							<span>Map View</span>
						</Link>
					</div>
				</div>

				{allHoardings.length === 0 ? (
					<div className="py-20 text-center">
						<p className="text-[#717171]">No inventory found at the moment.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
						{allHoardings.map(hoarding => (
							<HoardingCard 
								key={hoarding.id} 
								id={hoarding.id} 
								title={hoarding.title} 
								imageUrl={hoarding.imageUrl} 
								images={hoarding.images} 
								price={hoarding.price} 
								location={hoarding.location} 
								views={hoarding.views} 
								lat={hoarding.lat}
								lng={hoarding.lng}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
