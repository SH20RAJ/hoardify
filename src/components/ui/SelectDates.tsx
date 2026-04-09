"use client";

import { useState, useMemo } from "react";

export default function SelectDates() {
	// Dynamically generate the next 14 days
	const availableDates = useMemo(() => {
		const dates = [];
		const today = new Date();
		for (let i = 0; i < 14; i++) {
			const futureDate = new Date(today);
			futureDate.setDate(today.getDate() + i);
			
			dates.push({
				day: futureDate.getDate().toString(),
				month: futureDate.toLocaleString('default', { month: 'short' }).toUpperCase(),
				fullDate: futureDate.toISOString().split("T")[0],
				ariaLabel: futureDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
			});
		}
		return dates;
	}, []);

	const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].fullDate);

	return (
		<div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-y border-border py-3">
			{availableDates.map((date, i) => {
				const isSelected = selectedDate === date.fullDate;
				return (
					<button
						key={i}
						type="button"
						onClick={() => setSelectedDate(date.fullDate)}
						aria-label={`Select ${date.ariaLabel}`}
						className={`flex flex-col items-center justify-center border rounded-xl min-w-[60px] h-[70px] transition-all active:scale-95 ${
							isSelected
								? "border-brand bg-brand/5 text-brand shadow-sm"
								: "border-border text-text-secondary hover:border-brand/40"
						}`}
					>
						<span className={`text-xs uppercase font-semibold ${isSelected ? "text-brand" : ""}`}>
							{date.month}
						</span>
						<span className={`text-xl font-bold ${isSelected ? "text-brand" : "text-foreground"}`}>
							{date.day}
						</span>
					</button>
				);
			})}
		</div>
	);
}
