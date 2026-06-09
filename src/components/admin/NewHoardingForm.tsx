"use client";

import { useState } from "react";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import { createHoarding } from "@/actions/hoardings";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { ImageUploader } from "@/components/ui/ImageUploader";

interface Agency {
	id: number;
	name: string;
}

export function NewHoardingForm({ agencies }: { agencies: Agency[] }) {
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		agencyId: agencies[0]?.id || 0,
		title: "",
		price: 0,
		location: "",
		status: "For Rent" as "For Rent" | "Booked" | "Maintenance",
		imageUrl: "",
		images: [] as string[],
		lat: "23.3441",
		lng: "85.3094",
		description: "",
		dimensions: "",
		category: "",
		lighting: "",
		trafficCount: 0,
		features: ["High Visibility", "Premium Location"],
	});
	const router = useRouter();

	const handleSubmit = async () => {
		if (!form.title || !form.location || !form.price || !form.imageUrl) {
			alert("Please fill in the required fields (Title, Location, Price, at least 1 Image)");
			return;
		}
		setLoading(true);
		try {
			await createHoarding({
				...form,
				agencyId: form.agencyId || undefined,
			});
			router.push("/admin/hoardings");
			router.refresh();
		} catch {
			alert("Failed to create hoarding");
		} finally {
			setLoading(false);
		}
	};


	return (
		<div className="max-w-4xl">
			<div className="mb-8 flex items-center gap-4">
				<Link 
					href="/admin/hoardings"
					className="p-2 rounded-lg hover:bg-[#f7f7f7] text-[#717171] transition-colors"
				>
					<ArrowLeft size={20} />
				</Link>
				<div>
					<h1 className="text-2xl font-bold text-[#222222]">Create New Placement</h1>
					<p className="text-sm text-[#717171]">Add a new billboard or hoarding to the platform</p>
				</div>
			</div>

			<div className="bg-white rounded-2xl shadow-sm border border-[#dddddd] p-8">
				<div className="space-y-8">
					{/* Basic Information */}
					<section>
						<h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider mb-6 pb-2 border-b border-[#f7f7f7]">
							Basic Information
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="md:col-span-2">
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Title *</label>
								<input
									value={form.title}
									onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
									placeholder="e.g. Premium Unipole at Main Road"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Agency *</label>
								<select
									value={form.agencyId}
									onChange={e => setForm(p => ({ ...p, agencyId: Number(e.target.value) }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium bg-white transition-colors"
								>
									<option value={0}>Select an Agency</option>
									{agencies.map(agency => (
										<option key={agency.id} value={agency.id}>
											{agency.name}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Location *</label>
								<input
									value={form.location}
									onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
									placeholder="e.g. Lalpur Chowk, Ranchi"
								/>
							</div>
						</div>
					</section>

					{/* Pricing & Status */}
					<section>
						<h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider mb-6 pb-2 border-b border-[#f7f7f7]">
							Pricing & Status
						</h3>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Price (₹/mo) *</label>
								<input
									type="number"
									value={form.price}
									onChange={e => setForm(p => ({ ...p, price: Number(e.target.value) }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Status</label>
								<select
									value={form.status}
									onChange={e => setForm(p => ({ ...p, status: e.target.value as typeof form.status }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium bg-white transition-colors"
								>
									<option value="For Rent">For Rent</option>
									<option value="Booked">Booked</option>
									<option value="Maintenance">Maintenance</option>
								</select>
							</div>
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Category</label>
								<input
									value={form.category}
									onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
									placeholder="e.g. Unipole"
								/>
							</div>
						</div>
					</section>

					{/* Technical Specifications */}
					<section>
						<h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider mb-6 pb-2 border-b border-[#f7f7f7]">
							Technical Specifications
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Dimensions</label>
								<input
									value={form.dimensions}
									onChange={e => setForm(p => ({ ...p, dimensions: e.target.value }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
									placeholder="e.g. 40ft x 20ft"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Lighting</label>
								<input
									value={form.lighting}
									onChange={e => setForm(p => ({ ...p, lighting: e.target.value }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
									placeholder="e.g. Front-lit LED"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Monthly Traffic</label>
								<input
									type="number"
									value={form.trafficCount}
									onChange={e => setForm(p => ({ ...p, trafficCount: Number(e.target.value) }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
								/>
							</div>
						</div>
					</section>

					{/* Media & Details */}
					<section>
						<h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider mb-6 pb-2 border-b border-[#f7f7f7]">
							Media & Details
						</h3>
						<div className="space-y-6">
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Images *</label>
								<ImageUploader 
									urls={[form.imageUrl, ...form.images].filter(Boolean)} 
									onChange={(urls) => setForm(p => ({ ...p, imageUrl: urls[0] || "", images: urls.slice(1) }))} 
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Description</label>
								<textarea
									value={form.description}
									onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
									className="w-full min-h-[120px] p-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors resize-none"
									placeholder="Describe the placement's advantages, visibility, and surrounding area..."
								/>
							</div>
						</div>
					</section>
				</div>

				<div className="flex gap-4 mt-12 pt-8 border-t border-[#f7f7f7]">
					<Link
						href="/admin/hoardings"
						className="flex-1 h-12 rounded-xl border border-[#dddddd] text-sm font-bold text-[#222222] hover:bg-[#f7f7f7] transition-colors flex items-center justify-center"
					>
						Cancel
					</Link>
					<button
						onClick={handleSubmit}
						disabled={loading}
						className="flex-[2] h-12 rounded-xl bg-[#222222] text-white text-sm font-bold hover:bg-[#000000] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
					>
						{loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
						{loading ? "Creating..." : "Create Placement"}
					</button>
				</div>
			</div>
		</div>
	);
}
