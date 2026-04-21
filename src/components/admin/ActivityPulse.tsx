import Image from "next/image";
import { User, Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Booking {
	id: number;
	pricePaid: number;
	startDate: Date;
	endDate: Date;
	user: {
		name: string | null;
		email: string;
		imageUrl: string | null;
	};
	hoarding: {
		title: string;
		location: string;
	} | null;
}

interface ActivityPulseProps {
	bookings: Booking[];
}

export default function ActivityPulse({ bookings }: ActivityPulseProps) {
	return (
		<div className="bg-white rounded-2xl border border-[#ebebeb] shadow-sm overflow-hidden">
			<div className="p-6 border-b border-[#ebebeb] flex items-center justify-between">
				<div>
					<h3 className="text-lg font-semibold text-[#222222]">Recent Bookings</h3>
					<p className="text-sm text-[#717171]">Live inventory sessions</p>
				</div>
				<button className="text-sm font-semibold text-[#222222] underline">View all</button>
			</div>
			
			<div className="overflow-x-auto">
				<table className="w-full text-left">
					<thead>
						<tr className="bg-[#f7f7f7]">
							<th className="px-6 py-3 text-xs font-semibold text-[#717171] uppercase tracking-wider">Customer</th>
							<th className="px-6 py-3 text-xs font-semibold text-[#717171] uppercase tracking-wider">Placement</th>
							<th className="px-6 py-3 text-xs font-semibold text-[#717171] uppercase tracking-wider">Value</th>
							<th className="px-6 py-3 text-xs font-semibold text-[#717171] uppercase tracking-wider text-right">Status</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-[#ebebeb]">
						{bookings.map((booking) => (
							<tr key={booking.id} className="hover:bg-[#f7f7f7] transition-colors">
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="h-8 w-8 rounded-full bg-[#f7f7f7] flex items-center justify-center overflow-hidden border border-[#dddddd] relative">
											{booking.user.imageUrl ? (
												<Image src={booking.user.imageUrl} alt="" fill className="object-cover" unoptimized />
											) : (
												<User size={14} className="text-[#717171]" />
											)}
										</div>
										<div className="flex flex-col">
											<span className="font-semibold text-sm text-[#222222]">{booking.user.name || "Anonymous User"}</span>
											<span className="text-xs text-[#717171]">{booking.user.email}</span>
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="flex flex-col">
										<span className="text-sm text-[#222222] font-medium">{booking.hoarding?.title || "Unknown Hoarding"}</span>
										<span className="text-xs text-[#717171]">{booking.hoarding?.location}</span>
									</div>
								</td>
								<td className="px-6 py-4">
									<span className="text-sm font-semibold text-[#222222]">{formatCurrency(booking.pricePaid)}</span>
								</td>
								<td className="px-6 py-4 text-right">
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e6f4ea] text-[#008a05]">
										Confirmed
									</span>
								</td>
							</tr>
						))}
						{bookings.length === 0 && (
							<tr>
								<td colSpan={4} className="px-6 py-12 text-center">
									<div className="flex flex-col items-center gap-2 text-[#717171]">
										<Calendar size={24} />
										<p className="text-sm">No active bookings found</p>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
