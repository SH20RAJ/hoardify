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
			<div className="bg-white border-b border-border-subtle px-4 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
				<button
					onClick={() => setIsAIChatOpen(!isAIChatOpen)}
					className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
						isAIChatOpen 
							? "bg-text-primary text-background border-text-primary" 
							: "bg-surface-sunken text-brand border-brand/20 hover:bg-brand/5"
					}`}
				>
					<Sparkles size={12} fill="currentColor" />
					Ask Hoardify
				</button>
				
				<div className="h-6 w-[1px] bg-border-subtle mx-1" />

				{contexts.map((ctx) => (
					<button
						key={ctx.label}
						onClick={() => setActiveContext(ctx.label)}
						className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
							activeContext === ctx.label 
								? "bg-brand text-white shadow-lg shadow-brand/20" 
								: "bg-surface-sunken text-text-tertiary border border-transparent hover:border-brand/20"
						}`}
					>
						{ctx.label}
						<span className={`opacity-50 ${activeContext === ctx.label ? "text-white" : "text-text-tertiary"}`}>{ctx.count}</span>
					</button>
				))}
			</div>

			{/* AI Overlay */}
			{isAIChatOpen && (
				<div className="absolute top-16 left-4 right-4 z-[60] md:left-6 md:w-[400px]">
					<div className="glass-effect p-4 border-2 border-brand/30 shadow-2xl rounded-[2rem] animate-in slide-in-from-top-4 duration-300">
						<div className="flex items-center gap-2 mb-4">
							<div className="h-8 w-8 rounded-full bg-brand flex items-center justify-center text-white">
								<Sparkles size={14} fill="currentColor" />
							</div>
							<div>
								<h3 className="text-xs font-black uppercase tracking-widest text-text-primary">Gemini Search Context</h3>
								<p className="text-[10px] font-medium text-text-tertiary">Real-time localized intelligence active</p>
							</div>
						</div>
						
						<div className="bg-surface-sunken p-3 rounded-2xl mb-4 text-xs font-medium text-text-secondary leading-relaxed border border-border-subtle">
							&quot;Find me a high-traffic spot near Ranchi Main Road that would be visible to morning commuters...&quot;
						</div>

						<div className="relative">
							<input 
								type="text" 
								value={aiQuery}
								onChange={(e) => setAiQuery(e.target.value)}
								placeholder="Describe your target audience..." 
								className="w-full h-12 bg-white rounded-xl pl-4 pr-12 text-sm font-medium border border-border-subtle focus:border-brand outline-none transition-all"
							/>
							<button className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-brand text-white rounded-lg flex items-center justify-center transition-transform active:scale-95">
								<Send size={14} />
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
