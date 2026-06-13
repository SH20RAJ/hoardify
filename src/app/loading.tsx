"use client";

export default function RootLoading() {
	return (
		<div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background gap-12 transition-colors duration-500">
			{/* High-end Minimal Loader */}
			<div className="relative">
				<div className="h-24 w-24 border-[2px] border-brand/5 rounded-full" />
				<div className="absolute top-0 h-24 w-24 border-[2px] border-brand border-t-transparent rounded-full animate-[spin_1.5s_cubic-bezier(0.16,1,0.3,1)_infinite]" />
				
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
					<div className="h-10 w-10 bg-brand rounded-xl flex items-center justify-center text-white font-black italic shadow-premium-lg">
						H
					</div>
				</div>
			</div>
			
			<div className="flex flex-col items-center gap-4">
				<div className="flex flex-col items-center">
					<p className="text-[10px] font-black text-text-primary tracking-[0.4em] uppercase mb-2">
						Hoardify Systems
					</p>
					<div className="h-px w-32 bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
				</div>
				
				<div className="flex flex-col items-center gap-2">
					<p className="text-[9px] text-text-tertiary font-bold uppercase tracking-widest animate-pulse">
						Synchronizing Intelligence
					</p>
					<div className="flex items-center gap-1.5">
						<span className="h-1 w-1 bg-brand rounded-full animate-[bounce_1s_infinite_0ms]" />
						<span className="h-1 w-1 bg-brand rounded-full animate-[bounce_1s_infinite_200ms]" />
						<span className="h-1 w-1 bg-brand rounded-full animate-[bounce_1s_infinite_400ms]" />
					</div>
				</div>
			</div>
			
			<div className="absolute bottom-12 text-[8px] text-text-tertiary font-black uppercase tracking-[0.5em]">
				Deployment Node Alpha
			</div>
		</div>
	);
}
