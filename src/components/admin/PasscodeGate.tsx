"use client";

import { useState, useEffect } from "react";
import { Lock, ShieldCheck, ArrowRight } from "lucide-react";

export default function PasscodeGate({ children }: { children: React.ReactNode }) {
	const [isUnlocked, setIsUnlocked] = useState(false);
	const [passcode, setPasscode] = useState("");
	const [error, setError] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const unlocked = sessionStorage.getItem("admin_unlocked") === "true";
		if (unlocked) setIsUnlocked(true);
		setMounted(true);
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (passcode === "17092006") {
			setIsUnlocked(true);
			sessionStorage.setItem("admin_unlocked", "true");
			setError(false);
		} else {
			setError(true);
			setPasscode("");
		}
	};

	if (!mounted) return null;

	if (isUnlocked) return <>{children}</>;

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 px-6">
			{/* Mesh Background for gate */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
				<div className="absolute -top-1/4 -right-1/4 w-3/4 aspect-square bg-brand/20 blur-[150px] rounded-full" />
				<div className="absolute -bottom-1/4 -left-1/4 w-3/4 aspect-square bg-blue-600/10 blur-[150px] rounded-full" />
			</div>

			<div className="relative w-full max-w-md">
				<div className="flex flex-col items-center text-center mb-10">
					<div className="h-16 w-16 rounded-3xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-6 text-brand shadow-2xl shadow-brand/10">
						<Lock className="animate-pulse" size={32} />
					</div>
					<h1 className="text-3xl font-black tracking-tighter text-white mb-2 uppercase italic">Admin Security</h1>
					<p className="text-sm font-medium text-zinc-500 uppercase tracking-widest leading-relaxed">
						Restricted Access Area <br /> Enter Security Passcode
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="relative group">
						<input
							type="password"
							value={passcode}
							onChange={(e) => setPasscode(e.target.value)}
							placeholder="Enter 8-digit code..."
							autoFocus
							className={`w-full h-16 bg-white/5 border-2 rounded-[2rem] px-8 text-center text-2xl font-black tracking-[0.5em] text-white focus:outline-none transition-all ${
								error ? "border-red-500/50 shake" : "border-white/10 focus:border-brand/50 group-hover:border-white/20"
							}`}
						/>
						{error && (
							<p className="absolute -bottom-6 left-0 right-0 text-center text-[10px] font-black uppercase tracking-widest text-red-500 animate-bounce">
								Invalid Authentication Code
							</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full h-16 bg-brand hover:bg-brand-hover text-white rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-brand/30"
					>
						Confirm Identity <ArrowRight size={18} />
					</button>
				</form>

				<div className="mt-12 flex items-center justify-center gap-2 opacity-30">
					<ShieldCheck size={14} className="text-white" />
					<span className="text-[9px] font-black uppercase tracking-[0.3em] text-white">Hoardify Intelligence Secure Node</span>
				</div>
			</div>

			<style jsx>{`
				.shake {
					animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
				}
				@keyframes shake {
					10%, 90% { transform: translate3d(-1px, 0, 0); }
					20%, 80% { transform: translate3d(2px, 0, 0); }
					30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
					40%, 60% { transform: translate3d(4px, 0, 0); }
				}
			`}</style>
		</div>
	);
}
