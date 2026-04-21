import { Sparkles, Send } from "lucide-react";

interface AIContextBarProps {
	isAIChatOpen: boolean;
	setIsAIChatOpen: (open: boolean) => void;
	activeContext: string;
	setActiveContext: (context: string) => void;
	hoardingsCount: number;
	aiQuery: string;
	setAiQuery: (query: string) => void;
}

export default function AIContextBar({
	isAIChatOpen,
	setIsAIChatOpen,
	activeContext,
	setActiveContext,
	hoardingsCount,
	aiQuery,
	setAiQuery
}: AIContextBarProps) {
	const contexts = [
		{ label: "All", count: hoardingsCount },
		{ label: "High-Traffic", count: 12 },
		{ label: "Retail Focus", count: 8 },
		{ label: "Corporate Hubs", count: 5 },
		{ label: "Transit", count: 4 },
	];

	return (
		<div className="relative">
			{/* Context Bar */}
			<div className="bg-white border-b border-[#ebebeb] px-6 py-4 flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth">
				<button
					onClick={() => setIsAIChatOpen(!isAIChatOpen)}
					className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap border ${
						isAIChatOpen 
							? "bg-[#222222] text-white border-[#222222]" 
							: "bg-white text-[#ff385c] border-[#ff385c] hover:bg-[#fff8f6]"
					}`}
				>
					<Sparkles size={14} fill="currentColor" />
					Ask Hoardify
				</button>
				
				<div className="h-6 w-[1px] bg-[#ebebeb] mx-1" />

				{contexts.map((ctx) => (
					<button
						key={ctx.label}
						onClick={() => setActiveContext(ctx.label)}
						className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
							activeContext === ctx.label 
								? "bg-[#222222] text-white" 
								: "bg-white text-[#717171] border border-[#dddddd] hover:border-[#222222] hover:text-[#222222]"
						}`}
					>
						{ctx.label}
						<span className={`text-[10px] ${activeContext === ctx.label ? "text-white/60" : "text-[#b0b0b0]"}`}>{ctx.count}</span>
					</button>
				))}
			</div>

			{/* AI Overlay */}
			{isAIChatOpen && (
				<div className="absolute top-18 left-4 right-4 z-[60] md:left-6 md:w-[400px]">
					<div className="bg-white p-6 border border-[#ebebeb] shadow-[0_12px_24px_rgba(0,0,0,0.12)] rounded-2xl">
						<div className="flex items-center gap-3 mb-4">
							<div className="h-10 w-10 rounded-full bg-[#ff385c] flex items-center justify-center text-white">
								<Sparkles size={18} fill="currentColor" />
							</div>
							<div>
								<h3 className="text-sm font-semibold text-[#222222]">AI Intelligence</h3>
								<p className="text-xs text-[#717171]">Powered by Gemini</p>
							</div>
						</div>
						
						<div className="bg-[#f7f7f7] p-4 rounded-xl mb-4 text-sm text-[#222222] leading-relaxed italic">
							&quot;Find me a high-traffic spot near Ranchi Main Road that would be visible to morning commuters...&quot;
						</div>

						<div className="relative">
							<input 
								type="text" 
								value={aiQuery}
								onChange={(e) => setAiQuery(e.target.value)}
								placeholder="Describe your target audience..." 
								className="w-full h-12 bg-white rounded-lg pl-4 pr-12 text-sm text-[#222222] border border-[#dddddd] focus:border-[#222222] outline-none transition-all"
							/>
							<button className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-[#ff385c] text-white rounded-md flex items-center justify-center transition-all hover:bg-[#e00b41] active:scale-95">
								<Send size={14} />
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
