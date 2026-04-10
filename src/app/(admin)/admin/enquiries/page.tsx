import { getEnquiries } from "@/actions/admin";
import { Inbox, Phone, Mail, MapPin, Search, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

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
		<div className="space-y-8 animate-in fade-in duration-700">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h2 className="text-3xl font-black tracking-tighter text-text-primary">Lead Pipeline</h2>
					<p className="text-xs font-bold uppercase tracking-widest text-text-tertiary mt-1">Track and manage service enquiries</p>
				</div>
				
				<div className="relative w-full md:w-80">
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
					<input 
						type="text" 
						placeholder="Search leads..." 
						className="w-full h-12 bg-white rounded-2xl pl-12 pr-4 text-sm font-medium border border-border-subtle focus:border-brand outline-none shadow-sm transition-all"
					/>
				</div>
			</div>

			<div className="bg-white rounded-[2.5rem] border border-border-subtle shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="bg-surface-sunken/50">
								<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Lead Entity</th>
								<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Target Placement</th>
								<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Pipeline Status</th>
								<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary text-right">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border-subtle">
							{enquiries.map((enquiry) => (
								<tr key={enquiry.id} className="hover:bg-surface-sunken transition-colors group">
									<td className="px-8 py-6">
										<div className="flex flex-col gap-1">
											<span className="font-bold text-sm text-text-primary">{enquiry.name}</span>
											<div className="flex flex-col gap-0.5">
												<div className="flex items-center gap-1.5 text-[10px] text-text-tertiary font-bold">
													<Phone size={10} className="text-brand" /> {enquiry.phone}
												</div>
												<div className="flex items-center gap-1.5 text-[10px] text-text-tertiary">
													<Mail size={10} /> {enquiry.email}
												</div>
											</div>
										</div>
									</td>
									<td className="px-8 py-6">
										<div className="flex flex-col">
											<span className="text-xs font-bold text-text-primary">{enquiry.hoarding?.title || "Direct Enquiry"}</span>
											<div className="flex items-center gap-1 text-[10px] text-text-tertiary mt-0.5">
												<MapPin size={10} /> {enquiry.hoarding?.location}
											</div>
											<span className="text-[10px] font-black text-brand mt-1">{enquiry.hoarding ? formatCurrency(enquiry.hoarding.price) : "-"}</span>
										</div>
									</td>
									<td className="px-8 py-6">
										<div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
											enquiry.status === 'New' 
												? 'bg-blue-50 text-blue-600 border-blue-100' 
												: enquiry.status === 'Contacted'
												? 'bg-amber-50 text-amber-600 border-amber-100'
												: 'bg-green-50 text-green-600 border-green-100'
										}`}>
											{getStatusIcon(enquiry.status)}
											{enquiry.status}
										</div>
									</td>
									<td className="px-8 py-6 text-right">
										<button className="text-[10px] font-black uppercase tracking-widest text-brand hover:underline">Update Stage</button>
									</td>
								</tr>
							))}
							{enquiries.length === 0 && (
								<tr>
									<td colSpan={4} className="px-8 py-20 text-center">
										<div className="flex flex-col items-center gap-3 opacity-30">
											<Inbox size={32} />
											<p className="text-sm font-bold uppercase tracking-widest">No enquiries yet</p>
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
