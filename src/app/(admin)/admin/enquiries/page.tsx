import { getEnquiries } from "@/actions/admin";
import { Inbox, Phone, Mail, MapPin, Search, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { UpdateEnquiryButton } from "@/components/admin/EnquiryActions";

export default async function AdminEnquiriesPage() {
	const enquiries = await getEnquiries();

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'New': return <AlertCircle size={12} className="text-blue-500" />;
			case 'Contacted': return <Clock size={12} className="text-amber-500" />;
			case 'Closed': return <CheckCircle2 size={12} className="text-green-500" />;
			default: return null;
		}
	};

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold text-[#222222]">Lead Pipeline</h2>
					<p className="text-sm text-[#717171] mt-1">Track and manage service enquiries</p>
				</div>
				
				<div className="relative w-full md:w-80">
					<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0b0b0]" size={16} />
					<input 
						type="text" 
						placeholder="Search leads..." 
						className="w-full h-11 bg-[#f7f7f7] rounded-xl pl-10 pr-4 text-sm border border-[#ebebeb] focus:border-[#222222] outline-none transition-colors"
					/>
				</div>
			</div>

			<div className="bg-white rounded-2xl border border-[#ebebeb] shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="bg-[#f7f7f7]">
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Lead Entity</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Target Placement</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Pipeline Status</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171] text-right">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-[#f0f0f0]">
							{enquiries.map((enquiry) => (
								<tr key={enquiry.id} className="hover:bg-[#fafafa] transition-colors group">
									<td className="px-6 py-5">
										<div className="flex flex-col gap-1">
											<span className="font-semibold text-sm text-[#222222]">{enquiry.name}</span>
											<div className="flex flex-col gap-0.5">
												<div className="flex items-center gap-1.5 text-[10px] text-[#717171] font-medium">
													<Phone size={10} className="text-[#ff385c]" /> {enquiry.phone}
												</div>
												<div className="flex items-center gap-1.5 text-[10px] text-[#717171]">
													<Mail size={10} /> {enquiry.email}
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-5">
										<div className="flex flex-col">
											<span className="text-xs font-semibold text-[#222222]">{enquiry.hoarding?.title || "Direct Enquiry"}</span>
											<div className="flex items-center gap-1 text-[10px] text-[#717171] mt-0.5">
												<MapPin size={10} /> {enquiry.hoarding?.location}
											</div>
											<span className="text-[10px] font-bold text-[#ff385c] mt-1">{enquiry.hoarding ? formatCurrency(enquiry.hoarding.price) : "-"}</span>
										</div>
									</td>
									<td className="px-6 py-5">
										<div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
											enquiry.status === 'New' 
												? 'bg-blue-50 text-blue-600' 
												: enquiry.status === 'Contacted'
												? 'bg-amber-50 text-amber-600'
												: 'bg-green-50 text-green-600'
										}`}>
											{getStatusIcon(enquiry.status)}
											{enquiry.status}
										</div>
									</td>
									<td className="px-6 py-5 text-right">
										<UpdateEnquiryButton id={enquiry.id} currentStatus={enquiry.status} />
									</td>
								</tr>
							))}
							{enquiries.length === 0 && (
								<tr>
									<td colSpan={4} className="px-6 py-20 text-center">
										<div className="flex flex-col items-center gap-3 text-[#b0b0b0]">
											<Inbox size={28} />
											<p className="text-sm font-medium">No enquiries yet</p>
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
