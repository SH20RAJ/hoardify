"use client";

import { useState } from "react";
import { Edit2, Trash2, X, Save, Loader2, Plus, Building2 } from "lucide-react";
import { createAgency, updateAgency, deleteAgency } from "@/actions/agencies";
import { useRouter } from "next/navigation";

export function CreateAgencyButton() {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		logoUrl: "",
		address: "",
	});
	const router = useRouter();

	const handleSubmit = async () => {
		if (!form.name) {
			alert("Agency name is required");
			return;
		}
		setLoading(true);
		try {
			await createAgency(form);
			setOpen(false);
			setForm({
				name: "",
				email: "",
				phone: "",
				logoUrl: "",
				address: "",
			});
			router.refresh();
		} catch {
			alert("Failed to create agency");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<button 
				onClick={() => setOpen(true)}
				className="px-6 py-3 bg-[#222222] text-white rounded-xl text-sm font-bold hover:bg-black transition-colors flex items-center gap-2 shadow-sm"
			>
				<Plus size={18} />
				<span>Add New Agency</span>
			</button>

			{open && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)}>
					<div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 p-8 overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
						<div className="flex items-center justify-between mb-8">
							<h3 className="text-xl font-bold text-[#222222]">Create New Agency</h3>
							<button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-[#f7f7f7]">
								<X size={18} />
							</button>
						</div>

						<div className="space-y-6">
							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Agency Name *</label>
								<input
									value={form.name}
									onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
									placeholder="e.g. Skyline Media"
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Email Address</label>
									<input
										type="email"
										value={form.email}
										onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
										className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
										placeholder="contact@agency.com"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Phone Number</label>
									<input
										value={form.phone}
										onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
										className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
										placeholder="+91 9876543210"
									/>
								</div>
							</div>

							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Logo URL</label>
								<input
									value={form.logoUrl}
									onChange={e => setForm(p => ({ ...p, logoUrl: e.target.value }))}
									className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
									placeholder="https://..."
								/>
							</div>

							<div>
								<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Address</label>
								<textarea
									value={form.address}
									onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
									className="w-full min-h-[100px] p-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors resize-none"
									placeholder="Full office address..."
								/>
							</div>
						</div>

						<div className="flex gap-3 mt-10">
							<button
								onClick={() => setOpen(false)}
								className="flex-1 h-12 rounded-xl border border-[#dddddd] text-sm font-bold text-[#222222] hover:bg-[#f7f7f7] transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={handleSubmit}
								disabled={loading}
								className="flex-1 h-12 rounded-xl bg-[#222222] text-white text-sm font-bold hover:bg-[#000000] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
							>
								{loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
								{loading ? "Creating..." : "Create Agency"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export function EditAgencyButton({ agency }: { agency: any }) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		name: agency.name,
		email: agency.email || "",
		phone: agency.phone || "",
		logoUrl: agency.logoUrl || "",
		address: agency.address || "",
	});
	const router = useRouter();

	const handleSubmit = async () => {
		if (!form.name) {
			alert("Agency name is required");
			return;
		}
		setLoading(true);
		try {
			await updateAgency(agency.id, form);
			setOpen(false);
			router.refresh();
		} catch {
			alert("Failed to update agency");
		} finally {
			setLoading(false);
		}
	};

	if (!open) {
		return (
			<button
				onClick={() => setOpen(true)}
				className="p-2 rounded-lg bg-[#f7f7f7] text-[#717171] hover:text-blue-500 transition-colors"
				title="Edit"
			>
				<Edit2 size={16} />
			</button>
		);
	}

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)}>
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 p-8 overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
				<div className="flex items-center justify-between mb-8">
					<h3 className="text-xl font-bold text-[#222222]">Edit Agency</h3>
					<button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-[#f7f7f7]">
						<X size={18} />
					</button>
				</div>

				<div className="space-y-6">
					<div>
						<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Agency Name *</label>
						<input
							value={form.name}
							onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
							className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Email Address</label>
							<input
								type="email"
								value={form.email}
								onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
								className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
							/>
						</div>
						<div>
							<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Phone Number</label>
							<input
								value={form.phone}
								onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
								className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
							/>
						</div>
					</div>

					<div>
						<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Logo URL</label>
						<input
							value={form.logoUrl}
							onChange={e => setForm(p => ({ ...p, logoUrl: e.target.value }))}
							className="w-full h-12 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
						/>
					</div>

					<div>
						<label className="block text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Address</label>
						<textarea
							value={form.address}
							onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
							className="w-full min-h-[100px] p-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors resize-none"
						/>
					</div>
				</div>

				<div className="flex gap-3 mt-10">
					<button
						onClick={() => setOpen(false)}
						className="flex-1 h-12 rounded-xl border border-[#dddddd] text-sm font-bold text-[#222222] hover:bg-[#f7f7f7] transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						disabled={loading}
						className="flex-1 h-12 rounded-xl bg-[#222222] text-white text-sm font-bold hover:bg-[#000000] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
					>
						{loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
						{loading ? "Saving..." : "Save Changes"}
					</button>
				</div>
			</div>
		</div>
	);
}

export function DeleteAgencyButton({ id, name }: { id: number; name: string }) {
	const [confirming, setConfirming] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		setLoading(true);
		try {
			await deleteAgency(id);
			router.refresh();
		} catch {
			alert("Failed to delete agency");
		} finally {
			setLoading(false);
			setConfirming(false);
		}
	};

	if (!confirming) {
		return (
			<button
				onClick={() => setConfirming(true)}
				className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:text-blue-700 transition-colors"
				title="Delete"
			>
				<Trash2 size={16} />
			</button>
		);
	}

	return (
		<div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setConfirming(false)}>
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 text-center" onClick={e => e.stopPropagation()}>
				<div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
					<Trash2 size={20} className="text-blue-600" />
				</div>
				<h3 className="text-lg font-bold text-[#222222] mb-2">Delete Agency</h3>
				<p className="text-sm text-[#717171] mb-6">
					Are you sure you want to delete <strong>&ldquo;{name}&rdquo;</strong>? This action cannot be undone.
				</p>
				<div className="flex gap-3">
					<button
						onClick={() => setConfirming(false)}
						className="flex-1 h-11 rounded-xl border border-[#dddddd] text-sm font-bold text-[#222222] hover:bg-[#f7f7f7] transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={handleDelete}
						disabled={loading}
						className="flex-1 h-11 rounded-xl bg-blue-500 text-white text-sm font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
					>
						{loading ? <Loader2 size={16} className="animate-spin" /> : null}
						{loading ? "Deleting..." : "Delete"}
					</button>
				</div>
			</div>
		</div>
	);
}
