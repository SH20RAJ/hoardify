export default function WebsiteLoading() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
			<div className="relative">
				{/* Inner moving ring */}
				<div className="h-16 w-16 border-[3px] border-[#082390]/10 rounded-full" />
				<div className="absolute top-0 h-16 w-16 border-[3px] border-[#082390] border-t-transparent rounded-full animate-spin" />
				
				{/* Center dot */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-[#082390] rounded-full animate-pulse" />
			</div>
			
			<div className="flex flex-col items-center gap-2">
				<p className="text-sm font-bold text-[#222222] tracking-[0.2em] uppercase">
					Hoardify Intelligence
				</p>
				<div className="flex items-center gap-1">
					<span className="h-1 w-1 bg-[#082390] rounded-full animate-[bounce_1s_infinite_0ms]" />
					<span className="h-1 w-1 bg-[#082390] rounded-full animate-[bounce_1s_infinite_200ms]" />
					<span className="h-1 w-1 bg-[#082390] rounded-full animate-[bounce_1s_infinite_400ms]" />
				</div>
			</div>
			
			<p className="text-xs text-[#6a6a6a] font-mono animate-pulse">
				Optimizing inventory for your location...
			</p>
		</div>
	);
}
