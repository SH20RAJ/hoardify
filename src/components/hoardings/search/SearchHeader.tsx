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
					<span className="font-black text-sm md:text-base text-text-primary tracking-tight">Explore Billboards</span>
				</div>
			}
			showBack
			isLogo={false}
			rightAction={
				<button 
					onClick={() => onViewModeChange(viewMode === "map" ? "list" : "map")}
					className="flex items-center gap-2 bg-surface-raised border border-border-subtle text-text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-premium-sm hover:shadow-premium-md transition-all active:scale-95"
				>
					{viewMode === "map" ? <><ListIcon size={14} /> List</> : <><MapIcon size={14} /> Map</>}
				</button>
			}
		/>
	);
}
