import { MetadataRoute } from "next";
import { getHoardings } from "@/actions/hoardings";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://hoardify.in";
	
	let hoardings: any[] = [];
	try {
		hoardings = await getHoardings();
	} catch (e) {
		console.error("Failed to fetch hoardings for sitemap:", e);
	}

	const hoardingUrls = hoardings.map((h) => ({
		url: `${baseUrl}/hoardings/${h.id}`,
		lastModified: h.createdAt ? new Date(h.createdAt) : new Date(),
		changeFrequency: "weekly" as const,
		priority: 0.8,
	}));

	const staticUrls = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 1.0,
		},
		{
			url: `${baseUrl}/hoardings`,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 0.9,
		},
		{
			url: `${baseUrl}/filters`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.6,
		},
		{
			url: `${baseUrl}/search`,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 0.8,
		},
	];

	return [...staticUrls, ...hoardingUrls];
}
