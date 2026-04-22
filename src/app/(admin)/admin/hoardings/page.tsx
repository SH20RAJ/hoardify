import { db } from "@/db";
import { hoardings } from "@/db/schema";
import { Plus, Search, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { EditHoardingButton, DeleteHoardingButton } from "@/components/admin/HoardingActions";
import { desc } from "drizzle-orm";

export default async function AdminHoardingsPage() {
	const allHoardings = await db.select().from(hoardings).orderBy(desc(hoardings.createdAt));

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold text-[#222222]">Inventory Management</h2>
					<p className="text-sm text-[#717171] mt-1">Total Placements: {allHoardings.length}</p>
				</div>
				<button className="px-6 py-3 bg-[#222222] text-white rounded-xl text-sm font-bold hover:bg-black transition-colors flex items-center gap-2">
					<Plus size={18} />
					<span>Add New</span>
				</button>
			</div>

			<div className="bg-white rounded-2xl border border-[#ebebeb] shadow-sm overflow-hidden">
				<div className="p-5 border-b border-[#ebebeb]">
					<div className="relative max-w-md">
						<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0b0b0]" size={16} />
						<input 
							type="text" 
							placeholder="Search by title or location..." 
							className="w-full h-11 bg-[#f7f7f7] rounded-xl pl-10 pr-4 text-sm border border-[#ebebeb] focus:border-[#222222] outline-none transition-colors"
						/>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="bg-[#f7f7f7]">
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Display</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Details</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Pricing</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Status</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171] text-right">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-[#f0f0f0] text-sm">
							{allHoardings.map((hoarding) => (
								<tr key={hoarding.id} className="hover:bg-[#fafafa] transition-colors group">
									<td className="px-6 py-4">
										<div className="relative h-14 w-20 rounded-lg overflow-hidden border border-[#ebebeb]">
											<Image src={hoarding.imageUrl} alt={hoarding.title} fill className="object-cover" unoptimized />
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="flex flex-col">
											<span className="font-semibold text-[#222222] line-clamp-1">{hoarding.title}</span>
											<span className="text-xs text-[#717171] line-clamp-1 mt-0.5">{hoarding.location}</span>
										</div>
									</td>
									<td className="px-6 py-4">
										<span className="font-bold text-[#222222]">{formatCurrency(hoarding.price)}</span>
										<span className="text-[10px] text-[#b0b0b0] ml-1">/mo</span>
									</td>
									<td className="px-6 py-4">
										<span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
											hoarding.status === "For Rent" 
												? "bg-green-50 text-green-600" 
												: hoarding.status === "Booked"
												? "bg-blue-50 text-blue-600"
												: "bg-red-50 text-red-600"
										}`}>
											{hoarding.status}
										</span>
									</td>
									<td className="px-6 py-4 text-right">
										<div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
											<Link href={`/hoardings/${hoarding.id}`} target="_blank" className="p-2 rounded-lg bg-[#f7f7f7] text-[#717171] hover:text-[#222222] transition-colors" title="View">
												<ExternalLink size={16} />
											</Link>
											<EditHoardingButton hoarding={{
												id: hoarding.id,
												title: hoarding.title,
												price: hoarding.price,
												location: hoarding.location,
												status: hoarding.status,
												imageUrl: hoarding.imageUrl,
												views: hoarding.views,
											}} />
											<DeleteHoardingButton id={hoarding.id} title={hoarding.title} />
										</div>
									</td>
								</tr>
							))}
							{allHoardings.length === 0 && (
								<tr>
									<td colSpan={5} className="px-6 py-20 text-center">
										<div className="flex flex-col items-center gap-3 text-[#b0b0b0]">
											<p className="text-sm font-medium">No placements found.</p>
										</div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
