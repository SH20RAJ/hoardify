import { getAgencies } from "@/actions/agencies";
import { Building2, Mail, Phone, Calendar, Search, MapPin } from "lucide-react";
import { CreateAgencyButton, EditAgencyButton, DeleteAgencyButton } from "@/components/admin/AgencyActions";

export default async function AdminAgenciesPage() {
	const agencies = await getAgencies();

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold text-[#222222]">Agencies</h2>
					<p className="text-sm text-[#717171] mt-1">Manage partner agencies and their profiles</p>
				</div>
				<CreateAgencyButton />
			</div>

			<div className="bg-white rounded-2xl border border-[#ebebeb] shadow-sm overflow-hidden">
				<div className="p-5 border-b border-[#ebebeb]">
					<div className="relative max-w-md">
						<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0b0b0]" size={16} />
						<input 
							type="text" 
							placeholder="Search by agency name..." 
							className="w-full h-11 bg-[#f7f7f7] rounded-xl pl-10 pr-4 text-sm border border-[#ebebeb] focus:border-[#222222] outline-none transition-colors"
						/>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="bg-[#f7f7f7]">
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Agency</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Contact Info</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Created At</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171] text-right">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-[#f0f0f0]">
							{agencies.map((agency) => (
								<tr key={agency.id} className="hover:bg-[#fafafa] transition-colors group">
									<td className="px-6 py-5">
										<div className="flex items-center gap-3">
											<div className="h-10 w-10 rounded-xl bg-[#f7f7f7] flex items-center justify-center overflow-hidden border border-[#ebebeb] relative shrink-0">
												{agency.logoUrl ? (
													<img src={agency.logoUrl} alt="" className="h-full w-full object-contain p-1" />
												) : (
													<Building2 size={16} className="text-[#b0b0b0]" />
												)}
											</div>
											<div className="flex flex-col min-w-0">
												<span className="font-semibold text-sm text-[#222222] truncate">{agency.name}</span>
												{agency.address && (
													<div className="flex items-center gap-1 text-[10px] text-[#717171] mt-0.5">
														<MapPin size={10} />
														<span className="truncate max-w-[200px]">{agency.address}</span>
													</div>
												)}
											</div>
										</div>
									</td>
									<td className="px-6 py-5">
										<div className="flex flex-col gap-1">
											{agency.email && (
												<div className="flex items-center gap-1.5 text-xs text-[#717171]">
													<Mail size={12} className="text-[#b0b0b0]" />
													<span>{agency.email}</span>
												</div>
											)}
											{agency.phone && (
												<div className="flex items-center gap-1.5 text-xs text-[#717171]">
													<Phone size={12} className="text-[#b0b0b0]" />
													<span>{agency.phone}</span>
												</div>
											)}
										</div>
									</td>
									<td className="px-6 py-5 text-xs font-medium text-[#717171]">
										<div className="flex items-center gap-2">
											<Calendar size={14} className="text-[#b0b0b0]" />
											{new Date(agency.createdAt).toLocaleDateString()}
										</div>
									</td>
									<td className="px-6 py-5 text-right">
										<div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
											<EditAgencyButton agency={agency} />
											<DeleteAgencyButton id={agency.id} name={agency.name} />
										</div>
									</td>
								</tr>
							))}
							{agencies.length === 0 && (
								<tr>
									<td colSpan={4} className="px-6 py-20 text-center">
										<div className="flex flex-col items-center gap-3 text-[#b0b0b0]">
											<Building2 size={28} />
											<p className="text-sm font-medium">No agencies found</p>
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
