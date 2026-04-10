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
		<div className="bg-white rounded-[2.5rem] border border-border-subtle shadow-sm overflow-hidden">
			<div className="p-8 border-b border-border-subtle flex items-center justify-between bg-surface-sunken/30">
				<div>
					<h3 className="font-black text-lg tracking-tight">Active Booking Pulse</h3>
					<p className="text-[10px] font-bold uppercase tracking-widest text-brand mt-1">Real-time user sessions</p>
				</div>
				<button className="text-xs font-bold text-text-tertiary uppercase tracking-widest hover:text-brand transition-colors">Audit All</button>
			</div>
			
			<div className="overflow-x-auto">
				<table className="w-full text-left">
					<thead>
						<tr className="bg-surface-sunken/50">
							<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Customer</th>
							<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Placement</th>
							<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Duration</th>
							<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary text-right">Value</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-border-subtle">
						{bookings.map((booking) => (
							<tr key={booking.id} className="hover:bg-surface-sunken transition-colors group">
								<td className="px-8 py-6">
									<div className="flex items-center gap-3">
										<div className="h-8 w-8 rounded-full bg-surface-sunken flex items-center justify-center overflow-hidden border border-border-subtle relative">
											{booking.user.imageUrl ? (
												<Image src={booking.user.imageUrl} alt="" fill className="object-cover" unoptimized />
											) : (
												<User size={14} className="text-text-tertiary" />
											)}
										</div>
										<div className="flex flex-col">
											<span className="font-bold text-sm text-text-primary capitalize">{booking.user.name || "Anonymous User"}</span>
											<span className="text-[10px] text-text-tertiary">{booking.user.email}</span>
										</div>
									</div>
								</td>
								<td className="px-8 py-6">
									<div className="flex flex-col">
										<span className="text-xs font-bold text-text-primary">{booking.hoarding?.title || "Unknown Hoarding"}</span>
										<span className="text-[10px] text-text-tertiary">{booking.hoarding?.location}</span>
									</div>
								</td>
								<td className="px-8 py-6">
									<span className="text-[10px] font-black uppercase tracking-widest bg-brand/5 text-brand px-2 py-1 rounded-md border border-brand/10">
										{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
									</span>
								</td>
								<td className="px-8 py-6 text-right">
									<span className="font-black text-sm text-text-primary">{formatCurrency(booking.pricePaid)}</span>
								</td>
							</tr>
						))}
						{bookings.length === 0 && (
							<tr>
								<td colSpan={4} className="px-8 py-20 text-center">
									<div className="flex flex-col items-center gap-3 opacity-30">
										<Calendar size={32} />
										<p className="text-sm font-bold uppercase tracking-widest">No Active Bookings Yet</p>
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
