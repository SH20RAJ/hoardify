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
		<div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar border-y border-border-subtle py-6">
			{availableDates.map((date, i) => {
				const isSelected = selectedDate === date.fullDate;
				return (
					<button
						key={i}
						type="button"
						onClick={() => setSelectedDate(date.fullDate)}
						aria-label={`Select ${date.ariaLabel}`}
						className={`flex flex-col items-center justify-center rounded-2xl min-w-[64px] h-[80px] transition-all duration-300 active:scale-95 ${
							isSelected
								? "bg-brand text-white shadow-lg shadow-brand/30 scale-105"
								: "bg-surface-sunken text-text-tertiary hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-text-primary"
						}`}
					>
						<span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isSelected ? "text-white/80" : ""}`}>
							{date.month}
						</span>
						<span className={`text-2xl font-black tracking-tighter ${isSelected ? "text-white" : "text-text-primary"}`}>
							{date.day}
						</span>
					</button>
				);
			})}
		</div>
	);
}

