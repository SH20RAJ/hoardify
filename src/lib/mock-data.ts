export type HoardingVariantType = "large" | "compact" | "banner";

export interface HoardingType {
	id: string;
	title: string;
	imageUrl: string;
	price: number;
	location: string;
	coordinates: { lat: number; lng: number };
	views?: string;
	status: "For Rent" | "Booked" | "Maintenance";
	features: string[];
}

export const HOARDINGS: HoardingType[] = [
	{
		id: "1",
		title: "Premium Digital Display",
		imageUrl: "https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?q=80&w=1600&auto=format&fit=crop",
		price: 150000,
		location: "Airport Road Route, Ranchi",
		coordinates: { lat: 23.314, lng: 85.325 },
		views: "250,000+",
		status: "For Rent",
		features: ["Digital Billboard", "Ultra Bright LED", "High Traffic", "24/7 Illumination"],
	},
	{
		id: "2",
		title: "Highway Gantry Banner",
		imageUrl: "https://images.unsplash.com/photo-1623945952611-64547bebb948?q=80&w=1600&auto=format&fit=crop",
		price: 85000,
		location: "Ratu Road Junction, Ranchi",
		coordinates: { lat: 23.364, lng: 85.320 },
		views: "180,000+",
		status: "For Rent",
		features: ["Gantry", "Overhead Span", "Double Sided", "Night Lit"],
	},
	{
		id: "3",
		title: "Urban Classic Billboard",
		imageUrl: "https://images.unsplash.com/photo-1589578082987-9cb07aa3d014?q=80&w=1600&auto=format&fit=crop",
		price: 60000,
		location: "Sujata Chowk, M.G. Road",
		coordinates: { lat: 23.351, lng: 85.326 },
		views: "120,000+",
		status: "For Rent",
		features: ["Classic Billboard", "Large 14x48 ft", "High Visibility", "Weather Proof"],
	},
	{
		id: "4",
		title: "Transit Bus Shelter Ad",
		imageUrl: "https://images.unsplash.com/photo-1601332766627-2c1a63c457fa?q=80&w=1600&auto=format&fit=crop",
		price: 25000,
		location: "Kanke Road Stop, Ranchi",
		coordinates: { lat: 23.385, lng: 85.318 },
		status: "For Rent",
		features: ["Transit Ad", "Eye Level", "Pedestrian Focus", "Backlit"],
	},
	{
		id: "5",
		title: "Ranchi Mall Facade",
		imageUrl: "https://images.unsplash.com/photo-1563212036-7c9fa19020bd?q=80&w=1600&auto=format&fit=crop",
		price: 110000,
		location: "Main Road Mall Plaza",
		coordinates: { lat: 23.361, lng: 85.327 },
		views: "300,000+",
		status: "Booked",
		features: ["Building Wrap", "Massive Scale", "Premium Shoppers"],
	},
];
