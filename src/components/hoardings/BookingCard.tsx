"use client";

import { formatCurrency } from "@/lib/utils";
import { Star } from "lucide-react";
import { createBooking } from "@/actions/bookings";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface BookingCardProps {
	price: number;
	hoardingId: number;
}

export default function BookingCard({ price, hoardingId }: BookingCardProps) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleBooking = async () => {
		setLoading(true);
		try {
			await createBooking(hoardingId, price);
			alert("Booking inquiry sent successfully!");
			router.push("/profile");
		} catch (error: unknown) {
			const message = error instanceof Error ? error.message : "Failed to book hoarding. Please log in first.";
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
						<div className="text-[10px] font-bold uppercase text-[#222222]">Start Date</div>
						<div className="text-sm text-[#717171]">Select date</div>
					</div>
					<div className="p-3">
						<div className="text-[10px] font-bold uppercase text-[#222222]">End Date</div>
						<div className="text-sm text-[#717171]">Select date</div>
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
				className="w-full bg-[#ff385c] text-white py-3.5 rounded-lg font-bold text-lg hover:bg-[#e00b41] transition-colors mb-4 disabled:opacity-70"
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
