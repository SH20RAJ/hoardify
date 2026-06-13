"use client";

import { formatCurrency } from "@/lib/utils";
import { Star } from "lucide-react";
import { createHoardingEnquiry } from "@/actions/messages";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface BookingCardProps {
	price: number;
	hoardingId: number;
}

export default function BookingCard({ price, hoardingId }: BookingCardProps) {
	const [loading, setLoading] = useState(false);
	const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
	const [endDate, setEndDate] = useState(() => {
		const d = new Date();
		d.setMonth(d.getMonth() + 1);
		return d.toISOString().split("T")[0];
	});
	const router = useRouter();

	const handleBooking = async () => {
		if (!startDate || !endDate) {
			alert("Please select both start and end dates.");
			return;
		}
		
		const start = new Date(startDate);
		const end = new Date(endDate);
		
		if (end <= start) {
			alert("End date must be after start date.");
			return;
		}

		setLoading(true);
		try {
			const enquiry = await createHoardingEnquiry(hoardingId, start, end);
			if (enquiry?.id) {
				router.push(`/inbox?conversationId=${enquiry.id}`);
			} else {
				alert("Availability request created. Check your inbox for the conversation.");
				router.push("/inbox");
			}
		} catch (error: unknown) {
			const message = error instanceof Error ? error.message : "Failed to start the chat. Please log in first.";
			alert(message);
			if (message.includes("logged in")) {
				router.push("/landing");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-surface-raised p-5 md:p-8 border border-border-subtle rounded-2xl md:rounded-3xl shadow-premium-lg transition-colors duration-300">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
				<div>
					<span className="text-2xl md:text-3xl font-black text-text-primary tracking-tighter">{formatCurrency(price)}</span>
					<span className="text-text-secondary text-sm md:text-base font-bold"> / month</span>
				</div>
				<div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-sunken rounded-full border border-border-subtle">
					<Star size={14} fill="currentColor" className="text-brand" />
					<span className="text-sm font-black text-text-primary">4.9</span>
					<span className="text-[10px] text-text-tertiary font-bold uppercase tracking-widest ml-1">(12)</span>
				</div>
			</div>

			<div className="border border-border-strong rounded-2xl overflow-hidden mb-6 md:mb-8 bg-surface-sunken">
				<div className="grid grid-cols-2 border-b border-border-strong">
					<div className="p-4 border-r border-border-strong">
						<label htmlFor="startDate" className="text-[9px] font-black uppercase text-text-tertiary block mb-1 tracking-widest">Start Date</label>
						<input 
							type="date" 
							id="startDate"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							className="text-sm font-bold text-text-primary w-full bg-transparent focus:outline-none cursor-pointer" 
						/>
					</div>
					<div className="p-4">
						<label htmlFor="endDate" className="text-[9px] font-black uppercase text-text-tertiary block mb-1 tracking-widest">End Date</label>
						<input 
							type="date" 
							id="endDate"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							className="text-sm font-bold text-text-primary w-full bg-transparent focus:outline-none cursor-pointer" 
						/>
					</div>
				</div>
				<div className="p-4">
					<div className="text-[9px] font-black uppercase text-text-tertiary tracking-widest mb-1">Campaign Size</div>
					<div className="text-sm font-bold text-text-primary flex items-center gap-2">
						<div className="h-1.5 w-1.5 rounded-full bg-brand" />
						1 Billboard Spot
					</div>
				</div>
			</div>

			<button 
				onClick={handleBooking}
				disabled={loading}
				className="w-full bg-brand text-white py-4 rounded-2xl font-black text-base md:text-lg hover:scale-[1.02] active:scale-[0.98] transition-all mb-4 disabled:opacity-70 shadow-premium-md hover:shadow-premium-lg"
			>
				{loading ? "Please wait..." : "Check if Available"}
			</button>
			
			<p className="text-center text-[10px] md:text-xs font-bold text-text-tertiary uppercase tracking-widest mb-6 md:mb-8">No payment needed now</p>

			<div className="space-y-4 pt-4 border-t border-border-subtle">
				<div className="flex justify-between text-sm md:text-base font-medium text-text-secondary">
					<span className="underline decoration-border-strong underline-offset-4">Monthly Rent</span>
					<span className="text-text-primary font-bold">{formatCurrency(price)}</span>
				</div>
				<div className="flex justify-between text-sm md:text-base font-medium text-text-secondary">
					<span className="underline decoration-border-strong underline-offset-4">Setup & Check</span>
					<span className="text-text-primary font-bold">₹ 0</span>
				</div>
				<div className="pt-4 border-t border-border-strong flex justify-between text-lg md:text-xl font-black text-text-primary tracking-tight">
					<span>Estimated Total</span>
					<span className="text-brand">{formatCurrency(price)}</span>
				</div>
			</div>
		</div>
	);
}
