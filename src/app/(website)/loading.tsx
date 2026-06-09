"use client";

export default function WebsiteLoading() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[70vh] gap-12 py-20">
			{/* High-end Minimal Loader */}
			<div className="relative">
				<div className="h-20 w-20 border-[2px] border-brand/5 rounded-full" />
				<div className="absolute top-0 h-20 w-20 border-[2px] border-brand border-t-transparent rounded-full animate-[spin_1.5s_cubic-bezier(0.16,1,0.3,1)_infinite]" />
				
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
					<div className="h-8 w-8 bg-brand rounded-lg flex items-center justify-center text-white font-black italic shadow-premium-md">
						H
					</div>
				</div>
			</div>
			
			<div className="flex flex-col items-center gap-4">
				<div className="flex flex-col items-center">
					<p className="text-[9px] font-black text-[#111111] tracking-[0.4em] uppercase mb-2">
						Hoardify Intelligence
					</p>
					<div className="h-px w-24 bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
				</div>
				
				<div className="flex flex-col items-center gap-2">
					<p className="text-[8px] text-text-tertiary font-bold uppercase tracking-widest animate-pulse">
						Mapping Inventory Nodes
					</p>
					<div className="flex items-center gap-1">
						<span className="h-1 w-1 bg-brand rounded-full animate-[bounce_1s_infinite_0ms]" />
						<span className="h-1 w-1 bg-brand rounded-full animate-[bounce_1s_infinite_200ms]" />
						<span className="h-1 w-1 bg-brand rounded-full animate-[bounce_1s_infinite_400ms]" />
					</div>
				</div>
			</div>
			
			<p className="text-[7px] text-text-tertiary font-mono tracking-widest uppercase">
				Syncing with Ranchi_HQ...
			</p>
		</div>
	);
}
