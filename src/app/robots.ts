import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/admin/", "/profile/", "/inbox/", "/handler/"],
		},
		sitemap: "https://hoardify.in/sitemap.xml",
	};
}
