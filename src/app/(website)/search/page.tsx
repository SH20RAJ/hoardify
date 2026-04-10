import { Metadata } from "next";
import { getHoardings } from "@/actions/hoardings";
import SearchClientContainer from "@/components/hoardings/SearchClientContainer";

export const metadata: Metadata = {
	title: "Search Results | Hoardify",
	description: "Browse available billboards on our interactive map. Find high-traffic locations for your next outdoor campaign.",
};

export default async function SearchMapPage() {
	// Fetch physical data from PostgreSQL action
	const allHoardings = await getHoardings();
	return <SearchClientContainer hoardings={allHoardings} />;
}

