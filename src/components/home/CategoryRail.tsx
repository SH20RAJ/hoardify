import { Grid, Monitor, Smartphone, Video } from "lucide-react";
import HorizontalScrollList from "@/components/hoardings/HorizontalScrollList";
import Pill from "@/components/ui/Pill";

const categories = [
	{ label: "Lit Billboards", icon: Monitor, active: true },
	{ label: "Non-lit", icon: Grid },
	{ label: "Digital", icon: Video },
	{ label: "Mobile", icon: Smartphone },
];

export default function CategoryRail() {
	return (
		<HorizontalScrollList className="px-4">
			{categories.map((category) => {
				const Icon = category.icon;
				return (
					<Pill
						key={category.label}
						variant="category"
						active={category.active}
						icon={<Icon size={20} className="mx-auto mb-1 block" />}
						label={category.label}
						className="!gap-0 rounded-2xl px-4 py-3 text-xs font-semibold"
					/>
				);
			})}
		</HorizontalScrollList>
	);
}
