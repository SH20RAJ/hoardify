"use client";

import React, { useState } from "react";

interface DateOption {
	day: string;
	month: string;
	fullDate: string;
}

const DATES: DateOption[] = [
	{ day: "16", month: "JUL", fullDate: "16 July" },
	{ day: "17", month: "JUL", fullDate: "17 July" },
	{ day: "18", month: "JUL", fullDate: "18 July" },
	{ day: "19", month: "JUL", fullDate: "19 July" },
	{ day: "20", month: "JUL", fullDate: "20 July" },
	{ day: "21", month: "JUL", fullDate: "21 July" },
	{ day: "22", month: "JUL", fullDate: "22 July" },
];

export default function SelectDates() {
	const [selectedDate, setSelectedDate] = useState<string>("16 July");

	return (
		<div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-y border-gray-100 py-3 dark:border-gray-800">
			{DATES.map((date, i) => {
				const isSelected = selectedDate === date.fullDate;
				return (
					<button
						key={i}
						onClick={() => setSelectedDate(date.fullDate)}
						className={`flex flex-col items-center justify-center border rounded-xl min-w-[60px] h-[70px] transition-colors ${
							isSelected
								? "border-brand bg-brand/5 text-brand"
								: "border-gray-200 text-gray-400 hover:border-brand/40 dark:border-gray-800"
						}`}
					>
						<span className={`text-xs uppercase font-semibold ${isSelected ? "text-brand" : ""}`}>
							{date.month}
						</span>
						<span className={`text-xl font-bold ${isSelected ? "text-brand" : "text-gray-900 dark:text-white"}`}>
							{date.day}
						</span>
					</button>
				);
			})}
		</div>
	);
}
