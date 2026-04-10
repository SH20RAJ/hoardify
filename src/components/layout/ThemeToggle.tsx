"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState<"light" | "dark">("light");

	// Avoid hydration mismatch by only rendering after mount
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
		const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		const initialTheme = savedTheme || systemTheme;
		
		setTheme(initialTheme);
		document.documentElement.classList.toggle("dark", initialTheme === "dark");
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	if (!mounted) {
		return <div className="h-10 w-10" />;
	}

	return (
		<button
			onClick={toggleTheme}
			className="h-10 w-10 flex items-center justify-center rounded-xl bg-surface-sunken hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all active:scale-95 group"
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
		>
			{theme === "light" ? (
				<Moon size={18} className="text-text-secondary group-hover:text-brand transition-colors" />
			) : (
				<Sun size={18} className="text-text-secondary group-hover:text-brand transition-colors" />
			)}
		</button>
	);
}
