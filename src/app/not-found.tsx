import Link from "next/link";
import { Compass, MapPinOff } from "lucide-react";
import NavbarSync from "@/components/layout/NavbarSync";

export default function NotFound() {
	return (
		<div className="flex flex-col min-h-screen bg-background pb-32">
			<NavbarSync isLogo showBack />
			<div className="flex flex-1 flex-col items-center justify-center p-6 text-center px-8">
				<div className="bg-brand/10 p-6 rounded-full mb-6">
					<MapPinOff size={64} className="text-brand" strokeWidth={1.5} />
				</div>
				<h1 className="text-4xl font-extrabold tracking-tight mb-2 text-text-primary">404</h1>
				<h2 className="text-xl font-semibold mb-4 text-text-secondary">Lost in the city?</h2>
				<p className="text-zinc-500 mb-8 max-w-[280px] dark:text-zinc-400">
					We couldn&apos;t find the page or hoarding you&apos;re looking for. It might have been moved or removed.
				</p>
				<Link 
					href="/" 
					className="flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
				>
					<Compass size={20} />
					Explore Hoardings
				</Link>
			</div>
		</div>
	);
}
