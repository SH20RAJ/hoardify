import { List as ListIcon, Map as MapIcon } from "lucide-react";
import NavbarSync from "@/components/layout/NavbarSync";

interface SearchHeaderProps {
	viewMode: "map" | "list";
	onViewModeChange: (mode: "map" | "list") => void;
}

export default function SearchHeader({ viewMode, onViewModeChange }: SearchHeaderProps) {
	return (
		<NavbarSync 
			title={
				<div className="flex items-center gap-2">
					<span>Explore Contexts</span>
					<div className="bg-brand/10 text-brand text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">AI Active</div>
				</div>
			}
			showBack
			isLogo={false}
			rightAction={
				<button 
					onClick={() => onViewModeChange(viewMode === "map" ? "list" : "map")}
					className="flex items-center gap-2 bg-text-primary text-background px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all active:scale-95"
				>
					{viewMode === "map" ? <><ListIcon size={14} /> List View</> : <><MapIcon size={14} /> Map View</>}
				</button>
			}
		/>
	);
}
