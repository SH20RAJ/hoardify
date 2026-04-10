"use client";

import { useState } from "react";
import { hoardings } from "@/db/schema";

type DBHoarding = typeof hoardings.$inferSelect;

interface SearchClientContainerProps {
	hoardings: DBHoarding[];
}

import SearchHeader from "@/components/hoardings/search/SearchHeader";
import AIContextBar from "@/components/hoardings/search/AIContextBar";
import MapListView from "@/components/hoardings/search/MapListView";

export default function SearchClientContainer({ hoardings }: SearchClientContainerProps) {
	const [viewMode, setViewMode] = useState<"map" | "list">("map");
	const [activeContext, setActiveContext] = useState<string>("All");
	const [isAIChatOpen, setIsAIChatOpen] = useState(false);
	const [aiQuery, setAiQuery] = useState("");

	return (
		<>
			{/* Modular Header */}
			<SearchHeader 
				viewMode={viewMode} 
				onViewModeChange={setViewMode} 
			/>

			{/* Modular AI Context Selection */}
			<AIContextBar 
				isAIChatOpen={isAIChatOpen}
				setIsAIChatOpen={setIsAIChatOpen}
				activeContext={activeContext}
				setActiveContext={setActiveContext}
				hoardingsCount={hoardings.length}
				aiQuery={aiQuery}
				setAiQuery={setAiQuery}
			/>

			{/* Modular Map/List View Area */}
			<MapListView 
				viewMode={viewMode} 
				hoardings={hoardings} 
			/>
		</>
	);
}

