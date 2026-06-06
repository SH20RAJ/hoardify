export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { getHoardings } from "@/actions/hoardings";
import SearchClientContainer from "@/components/hoardings/SearchClientContainer";

export const metadata: Metadata = {
	title: "Search Results | Hoardify",
	description: "Browse available billboards on our interactive map. Find high-traffic locations for your next outdoor campaign.",
};

export default async function SearchMapPage({ searchParams }: { searchParams: Promise<{ location?: string; category?: string }> }) {
	const params = await searchParams;
	// Fetch physical data from PostgreSQL action with filters
	const allHoardings = await getHoardings({
		location: params.location,
		category: params.category,
	});
	return <SearchClientContainer hoardings={allHoardings} />;
}

