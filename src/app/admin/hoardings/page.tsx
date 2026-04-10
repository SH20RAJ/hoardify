import { db } from "@/db";
import { hoardings } from "@/db/schema";
import { Plus, Search, Edit2, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

export default async function AdminHoardingsPage() {
	// In a real app, we'd fetch from DB:
	// const allHoardings = await db.select().from(hoardings);
	
	// For now, let's keep the UI ready with a placeholder for the data
	const allHoardings = await db.select().from(hoardings);

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-black tracking-tight text-text-primary">Inventory Management</h2>
					<p className="text-sm font-medium text-text-tertiary">Total Placements: {allHoardings.length}</p>
				</div>
				<button className="btn-brand !px-6 flex items-center gap-2">
					<Plus size={18} />
					<span>Add New Placement</span>
				</button>
			</div>

			<div className="bg-white rounded-[2.5rem] border border-border-subtle shadow-sm overflow-hidden">
				<div className="p-6 border-b border-border-subtle bg-surface-sunken/30">
					<div className="relative max-w-md">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
						<input 
							type="text" 
							placeholder="Search inventory by title or location..." 
							className="w-full h-11 bg-white rounded-xl pl-10 pr-4 text-sm font-medium border border-border-subtle focus:border-brand transition-all outline-none"
						/>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="bg-surface-sunken">
								<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Display</th>
								<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Details</th>
								<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Pricing</th>
								<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Status</th>
								<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary text-right">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border-subtle text-sm">
							{allHoardings.map((hoarding) => (
								<tr key={hoarding.id} className="hover:bg-surface-sunken/50 transition-colors group">
									<td className="px-8 py-4">
										<div className="relative h-16 w-24 rounded-lg overflow-hidden border border-border-subtle shadow-sm">
											<Image src={hoarding.imageUrl} alt={hoarding.title} fill className="object-cover" unoptimized />
										</div>
									</td>
									<td className="px-8 py-4">
										<div className="flex flex-col">
											<span className="font-bold text-text-primary line-clamp-1">{hoarding.title}</span>
											<span className="text-[11px] text-text-tertiary line-clamp-1">{hoarding.location}</span>
										</div>
									</td>
									<td className="px-8 py-4">
										<span className="font-black text-text-primary">{formatCurrency(hoarding.price)}</span>
										<span className="text-[10px] text-text-tertiary ml-1 uppercase font-bold tracking-tighter">/ mo</span>
									</td>
									<td className="px-8 py-4">
										<span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
											hoarding.status === "For Rent" 
												? "bg-green-50 text-green-600 border-green-100" 
												: hoarding.status === "Booked"
												? "bg-blue-50 text-blue-600 border-blue-100"
												: "bg-red-50 text-red-600 border-red-100"
										}`}>
											{hoarding.status}
										</span>
									</td>
									<td className="px-8 py-4 text-right">
										<div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
											<Link href={`/hoardings/${hoarding.id}`} target="_blank" className="p-2 rounded-lg bg-surface-sunken text-text-secondary hover:text-brand">
												<ExternalLink size={16} />
											</Link>
											<button className="p-2 rounded-lg bg-surface-sunken text-text-secondary hover:text-blue-500">
												<Edit2 size={16} />
											</button>
											<button className="p-2 rounded-lg bg-red-50 text-red-400 hover:text-red-600">
												<Trash2 size={16} />
											</button>
										</div>
									</td>
								</tr>
							))}
							{allHoardings.length === 0 && (
								<tr>
									<td colSpan={5} className="px-8 py-20 text-center">
										<div className="flex flex-col items-center gap-3">
											<div className="h-12 w-12 rounded-full bg-surface-sunken flex items-center justify-center text-text-tertiary">
												<Megaphone size={24} />
											</div>
											<p className="text-sm font-medium text-text-tertiary">No placements found in the database.</p>
											<button className="btn-brand !px-6 mt-2">Initialize Database</button>
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

// Re-generate some icons from parent if missing
const Megaphone = ({ size }: { size: number }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8 a3 3 0 1 1-5.8-0.8"/></svg>
);
