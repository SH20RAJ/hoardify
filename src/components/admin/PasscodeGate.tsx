"use client";

import { useState, useEffect } from "react";
import { Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { validateAdminPasscode } from "@/actions/admin_auth";

export default function PasscodeGate({ children, initialUnlocked }: { children: React.ReactNode, initialUnlocked: boolean }) {
	const [isUnlocked, setIsUnlocked] = useState(initialUnlocked);
	const [passcode, setPasscode] = useState("");
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(false);
		
		const res = await validateAdminPasscode(passcode);
		if (res.success) {
			setIsUnlocked(true);
		} else {
			setError(true);
			setPasscode("");
		}
		setLoading(false);
	};

	if (!mounted) return null;

	if (isUnlocked) return <>{children}</>;

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f7f7f7] px-6">
			<div className="relative w-full max-w-md">
				<div className="flex flex-col items-center text-center mb-10">
					<div className="h-16 w-16 rounded-2xl bg-[#ff385c]/10 border border-[#ff385c]/20 flex items-center justify-center mb-6 text-[#ff385c] shadow-xl">
						<Lock className={loading ? "animate-spin" : "animate-pulse"} size={32} />
					</div>
					<h1 className="text-3xl font-bold tracking-tight text-[#222222] mb-2">Admin Access</h1>
					<p className="text-sm font-medium text-[#717171] uppercase tracking-widest">
						Enter security passcode to continue
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="relative group">
						<input
							type="password"
							value={passcode}
							onChange={(e) => setPasscode(e.target.value)}
							placeholder="••••••••"
							autoFocus
							disabled={loading}
							className={`w-full h-16 bg-white border-2 rounded-xl px-8 text-center text-2xl font-bold tracking-[0.5em] text-[#222222] focus:outline-none transition-all ${
								error ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : "border-[#dddddd] focus:border-[#222222]"
							}`}
						/>
						{error && (
							<p className="absolute -bottom-6 left-0 right-0 text-center text-xs font-semibold text-red-500">
								Invalid Authentication Code
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full h-16 bg-[#222222] text-white rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all hover:bg-black active:scale-95 disabled:opacity-70"
					>
						{loading ? "Verifying..." : "Confirm Identity"} <ArrowRight size={18} />
					</button>
				</form>

				<div className="mt-12 flex items-center justify-center gap-2 opacity-50">
					<ShieldCheck size={14} className="text-[#717171]" />
					<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#717171]">Hoardify Secure Node</span>
				</div>
			</div>
		</div>
	);
}
