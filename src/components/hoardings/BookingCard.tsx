import { formatCurrency } from "@/lib/utils";
import { Zap, ShieldCheck } from "lucide-react";

interface BookingCardProps {
	price: number;
}

export default function BookingCard({ price }: BookingCardProps) {
	return (
		<div className="card-premium p-6 border-brand/20 bg-white shadow-2xl shadow-brand/5 relative overflow-hidden">
			{/* Accent Gradient */}
			<div className="absolute top-0 right-0 h-32 w-32 bg-brand/5 blur-3xl -z-10" />
			
			<div className="flex items-center justify-between mb-8">
				<div className="flex flex-col">
					<div className="flex items-center gap-1.5 mb-1">
						<span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Rental Price</span>
						<div className="h-1 w-1 rounded-full bg-brand animate-pulse" />
					</div>
					<span className="text-4xl font-black tracking-tighter text-text-primary">{formatCurrency(price)}</span>
				</div>
				<div className="text-right">
					<span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-1">Duration</span>
					<span className="block text-sm font-bold text-brand bg-brand/5 px-3 py-1 rounded-full">Per Month</span>
				</div>
			</div>

			<div className="flex flex-col gap-3 mb-8">
				<div className="flex items-center gap-3 text-sm font-bold text-text-secondary bg-surface-sunken p-3 rounded-xl border border-border-subtle">
					<Zap size={16} className="text-brand" fill="currentColor" />
					<span>Instant Inquiry Response</span>
				</div>
				<div className="flex items-center gap-3 text-sm font-bold text-text-secondary bg-surface-sunken p-3 rounded-xl border border-border-subtle">
					<ShieldCheck size={16} className="text-green-500" />
					<span>Price Guarantee Protection</span>
				</div>
			</div>

			<button className="btn-brand w-full !py-5 text-sm shadow-xl shadow-brand/20 group hover:scale-[1.02] active:scale-95 transition-all">
				Start Booking Process
				<span className="block text-[10px] opacity-70 font-normal mt-1 uppercase tracking-widest">No Commitment yet</span>
			</button>
			
			{/* Social Proof */}
			<div className="mt-6 pt-6 border-t border-border-subtle flex items-center justify-center gap-2">
				<div className="flex -space-x-2">
					{[1, 2, 3].map(i => (
						<div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-zinc-200 flex items-center justify-center overflow-hidden">
							<div className="h-full w-full bg-gradient-to-br from-zinc-300 to-zinc-500" />
						</div>
					))}
				</div>
				<span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">
					12 Brands inquired this week
				</span>
			</div>
		</div>
	);
}

