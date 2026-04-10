import { Metadata } from "next";
import { HOARDINGS } from "@/lib/mock-data";
import SearchClientContainer from "@/components/hoardings/SearchClientContainer";

export const metadata: Metadata = {
	title: "Search Results | Hoardify",
	description: "Browse available billboards on our interactive map. Find high-traffic locations for your next outdoor campaign.",
};

export default function SearchMapPage() {
	return <SearchClientContainer hoardings={HOARDINGS} />;
}
