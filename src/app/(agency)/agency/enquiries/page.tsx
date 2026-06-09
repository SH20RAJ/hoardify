import { stackServerApp } from "@/stack/server";
import { db } from "@/db";
import { hoardings, enquiries, users } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { Search, Mail, Phone, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function AgencyEnquiriesPage() {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) return null;

	const dbUser = await db.query.users.findFirst({
		where: eq(users.id, stackUser.id)
	});

	if (!dbUser || !dbUser.agencyId) return null;

	const agencyId = dbUser.agencyId;

	// Fetch enquiries for hoardings belonging to this agency
	const actualEnquiries = await db.query.enquiries.findMany({
		where: (enquiries, { exists }) => 
			exists(
				db.select()
				.from(hoardings)
				.where(sql`${hoardings.id} = ${enquiries.hoardingId} AND ${hoardings.agencyId} = ${agencyId}`)
			),
		with: { hoarding: true },
		orderBy: [desc(enquiries.createdAt)]
	});

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold text-[#222222]">Customer Enquiries</h2>
					<p className="text-sm text-[#717171] mt-1">Manage incoming leads for your properties</p>
				</div>
			</div>

			<div className="bg-white rounded-2xl border border-[#ebebeb] shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="bg-[#f7f7f7]">
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Customer</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Property</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Date</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Status</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171] text-right">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-[#f0f0f0]">
							{actualEnquiries.map((enquiry) => (
								<tr key={enquiry.id} className="hover:bg-[#fafafa] transition-colors group">
									<td className="px-6 py-5">
										<div className="flex flex-col">
											<span className="font-semibold text-sm text-[#222222]">{enquiry.name}</span>
											<div className="flex items-center gap-1.5 text-xs text-[#717171] mt-0.5">
												<Mail size={10} />
												<span>{enquiry.email}</span>
											</div>
										</div>
									</td>
									<td className="px-6 py-5">
										<div className="flex items-center gap-3">
											<div className="h-10 w-14 rounded-lg overflow-hidden border border-[#ebebeb] shrink-0 relative">
												{enquiry.hoarding?.imageUrl && <Image src={enquiry.hoarding.imageUrl} alt="" fill className="object-cover" unoptimized />}
											</div>
											<span className="text-xs font-medium text-[#222222] line-clamp-1">{enquiry.hoarding?.title}</span>
										</div>
									</td>
									<td className="px-6 py-5 text-xs text-[#717171]">
										{new Date(enquiry.createdAt).toLocaleDateString()}
									</td>
									<td className="px-6 py-5">
										<span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
											enquiry.status === "New" ? "bg-blue-50 text-blue-600" :
											enquiry.status === "Contacted" ? "bg-amber-50 text-amber-600" :
											"bg-zinc-50 text-zinc-600"
										}`}>
											{enquiry.status}
										</span>
									</td>
									<td className="px-6 py-5 text-right">
										<Link 
											href={`/inbox`} // Reusing the global inbox for now as it handles messaging
											className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#082390] hover:underline"
										>
											Reply <ArrowRight size={12} />
										</Link>
									</td>
								</tr>
							))}
							{actualEnquiries.length === 0 && (
								<tr>
									<td colSpan={5} className="px-6 py-20 text-center text-[#b0b0b0]">
										No enquiries yet.
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
