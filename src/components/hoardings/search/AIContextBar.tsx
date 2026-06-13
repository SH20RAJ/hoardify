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
			<div className="bg-background border-b border-border-subtle px-4 md:px-6 py-2.5 md:py-3.5 flex items-center gap-2 md:gap-3 overflow-x-auto no-scrollbar scroll-smooth transition-colors duration-300">
				<button
					onClick={() => setIsAIChatOpen(!isAIChatOpen)}
					className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
						isAIChatOpen 
							? "bg-brand text-white border-brand shadow-premium-md" 
							: "bg-surface-sunken text-brand border-brand/20 hover:bg-brand/5"
					}`}
				>
					<Sparkles size={14} fill="currentColor" />
					Ask Hoardify
				</button>
				
				<div className="h-6 w-[1px] bg-border-subtle mx-1" />

				{contexts.map((ctx) => (
					<button
						key={ctx.label}
						onClick={() => setActiveContext(ctx.label)}
						className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
							activeContext === ctx.label 
								? "bg-text-primary text-background" 
								: "bg-surface-sunken text-text-tertiary border border-border-subtle hover:border-brand/30 hover:text-text-primary"
						}`}
					>
						{ctx.label}
						<span className={`text-[9px] font-bold ${activeContext === ctx.label ? "text-background/60" : "text-text-tertiary/60"}`}>{ctx.count}</span>
					</button>
				))}
			</div>

			{/* AI Overlay */}
			{isAIChatOpen && (
				<div className="absolute top-14 md:top-16 left-3 right-3 z-[60] md:left-6 md:w-[400px]">
					<div className="bg-surface-raised p-6 border border-border-subtle shadow-premium-xl rounded-[2rem]">
						<div className="flex items-center gap-3 mb-4">
							<div className="h-10 w-10 rounded-xl bg-brand flex items-center justify-center text-white shadow-premium-md">
								<Sparkles size={18} fill="currentColor" />
							</div>
							<div>
								<h3 className="text-sm font-black text-text-primary uppercase tracking-tight">AI Intelligence</h3>
								<p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Powered by Gemini</p>
							</div>
						</div>
						
						<div className="bg-surface-sunken p-4 rounded-xl mb-4 text-xs md:text-sm text-text-secondary leading-relaxed italic font-medium border border-border-subtle">
							&quot;Find me a high-traffic spot near Ranchi Main Road that would be visible to morning commuters...&quot;
						</div>

						<div className="relative">
							<input 
								type="text" 
								value={aiQuery}
								onChange={(e) => setAiQuery(e.target.value)}
								placeholder="Describe your target audience..." 
								className="w-full h-12 bg-surface-sunken rounded-xl pl-4 pr-12 text-sm text-text-primary border border-border-subtle focus:border-brand outline-none transition-all placeholder:text-text-tertiary font-bold"
							/>
							<button className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-brand text-white rounded-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-premium-sm">
								<Send size={14} />
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
