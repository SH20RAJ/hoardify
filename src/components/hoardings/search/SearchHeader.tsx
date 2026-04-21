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
					<span className="font-semibold text-base">Explore inventory</span>
				</div>
			}
			showBack
			isLogo={false}
			rightAction={
				<button 
					onClick={() => onViewModeChange(viewMode === "map" ? "list" : "map")}
					className="flex items-center gap-2 bg-white border border-[#dddddd] text-[#222222] px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-shadow active:scale-95"
				>
					{viewMode === "map" ? <><ListIcon size={16} /> List</> : <><MapIcon size={16} /> Map</>}
				</button>
			}
		/>
	);
}
