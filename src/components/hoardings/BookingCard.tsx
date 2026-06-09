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
		<div className="bg-white p-6 border border-[#dddddd] rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
			<div className="flex items-center justify-between mb-6">
				<div>
					<span className="text-2xl font-bold text-[#222222]">{formatCurrency(price)}</span>
					<span className="text-[#6a6a6a] text-base font-normal"> / month</span>
				</div>
				<div className="flex items-center gap-1">
					<Star size={14} fill="currentColor" className="text-[#222222]" />
					<span className="text-sm font-semibold text-[#222222]">4.9</span>
					<span className="text-sm text-[#717171] underline">(12 inquiries)</span>
				</div>
			</div>

			<div className="border border-[#b0b0b0] rounded-xl overflow-hidden mb-6">
				<div className="grid grid-cols-2 border-b border-[#b0b0b0]">
					<div className="p-3 border-r border-[#b0b0b0]">
						<label htmlFor="startDate" className="text-[10px] font-bold uppercase text-[#222222] block mb-0.5">Start Date</label>
						<input 
							type="date" 
							id="startDate"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							className="text-sm text-[#222222] w-full bg-transparent focus:outline-none cursor-pointer" 
						/>
					</div>
					<div className="p-3">
						<label htmlFor="endDate" className="text-[10px] font-bold uppercase text-[#222222] block mb-0.5">End Date</label>
						<input 
							type="date" 
							id="endDate"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							className="text-sm text-[#222222] w-full bg-transparent focus:outline-none cursor-pointer" 
						/>
					</div>
				</div>
				<div className="p-3">
					<div className="text-[10px] font-bold uppercase text-[#222222]">Campaign Size</div>
					<div className="text-sm text-[#717171]">1 Billboard</div>
				</div>
			</div>

			<button 
				onClick={handleBooking}
				disabled={loading}
				className="w-full bg-[#082390] text-white py-3.5 rounded-lg font-bold text-lg hover:bg-[#1d4ed8] transition-colors mb-4 disabled:opacity-70"
			>
				{loading ? "Processing..." : "Check Availability"}
			</button>
			
			<p className="text-center text-sm text-[#717171] mb-6">You won&apos;t be charged yet</p>

			<div className="space-y-4">
				<div className="flex justify-between text-base text-[#222222]">
					<span className="underline italic">Rental fee (1 month)</span>
					<span>{formatCurrency(price)}</span>
				</div>
				<div className="flex justify-between text-base text-[#222222]">
					<span className="underline italic">Printing & Installation</span>
					<span>₹ 0</span>
				</div>
				<div className="pt-4 border-t border-[#dddddd] flex justify-between text-lg font-bold text-[#222222]">
					<span>Total before taxes</span>
					<span>{formatCurrency(price)}</span>
				</div>
			</div>
		</div>
	);
}
