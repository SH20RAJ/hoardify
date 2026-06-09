"use client";

import { useState } from "react";
import { updateUserRole, updateUserAgency } from "@/actions/admin";
import { useRouter } from "next/navigation";
import { Loader2, Building2, X } from "lucide-react";

const ROLES = ["Customer", "Owner", "Admin"] as const;

export function ManageRoleButton({ userId, currentRole }: { userId: string; currentRole: string }) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleUpdate = async (role: typeof ROLES[number]) => {
		setLoading(true);
		try {
			await updateUserRole(userId, role);
			setOpen(false);
			router.refresh();
		} catch {
			alert("Failed to update role");
		} finally {
			setLoading(false);
		}
	};

	if (!open) {
		return (
			<button
				onClick={() => setOpen(true)}
				className="text-[10px] font-black uppercase tracking-widest text-[#082390] hover:underline"
			>
				Manage Role
			</button>
		);
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)}>
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs mx-4 p-6" onClick={e => e.stopPropagation()}>
				<h3 className="text-base font-bold text-[#222222] mb-4">Assign Role</h3>
				<div className="space-y-2">
					{ROLES.map(role => (
						<button
							key={role}
							onClick={() => handleUpdate(role)}
							disabled={loading || role === currentRole}
							className={`w-full h-10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
								role === currentRole
									? "bg-[#f7f7f7] text-[#b0b0b0] cursor-default border border-[#ebebeb]"
									: "bg-white border border-[#dddddd] text-[#222222] hover:border-[#222222] hover:bg-[#f7f7f7]"
							}`}
						>
							{loading ? <Loader2 size={12} className="animate-spin" /> : null}
							{role} {role === currentRole ? "(current)" : ""}
						</button>
					))}
				</div>
				<button
					onClick={() => setOpen(false)}
					className="w-full mt-4 h-10 rounded-xl border border-[#dddddd] text-xs font-bold text-[#717171] hover:bg-[#f7f7f7] transition-colors"
				>
					Cancel
				</button>
			</div>
		</div>
	);
}

export function ManageAgencyButton({ 
	userId, 
	currentAgencyId, 
	agencies 
}: { 
	userId: string; 
	currentAgencyId: number | null; 
	agencies: any[] 
}) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleUpdate = async (agencyId: number | null) => {
		setLoading(true);
		try {
			await updateUserAgency(userId, agencyId);
			setOpen(false);
			router.refresh();
		} catch {
			alert("Failed to update agency association");
		} finally {
			setLoading(false);
		}
	};

	const currentAgency = agencies.find(a => a.id === currentAgencyId);

	if (!open) {
		return (
			<button
				onClick={() => setOpen(true)}
				className="flex items-center gap-2 group"
			>
				<div className="flex flex-col items-start min-w-0">
					<span className="text-xs font-semibold text-[#222222] group-hover:underline truncate max-w-[150px]">
						{currentAgency ? currentAgency.name : "Unassigned"}
					</span>
					{currentAgency && (
						<span className="text-[10px] text-[#717171] truncate max-w-[150px]">
							{currentAgency.email}
						</span>
					)}
				</div>
			</button>
		);
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)}>
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 overflow-y-auto max-h-[80vh]" onClick={e => e.stopPropagation()}>
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-lg font-bold text-[#222222]">Assign Agency</h3>
					<button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-[#f7f7f7]">
						<X size={18} />
					</button>
				</div>

				<div className="space-y-3">
					<button
						onClick={() => handleUpdate(null)}
						disabled={loading || currentAgencyId === null}
						className={`w-full p-4 rounded-xl border transition-all text-left flex items-center justify-between ${
							currentAgencyId === null
								? "bg-blue-50 border-blue-200"
								: "border-[#dddddd] hover:border-[#222222] bg-white"
						}`}
					>
						<div>
							<p className="text-sm font-bold text-[#222222]">Unassigned</p>
							<p className="text-xs text-[#717171]">No agency association</p>
						</div>
						{currentAgencyId === null && <div className="h-2 w-2 rounded-full bg-blue-500" />}
					</button>

					{agencies.map(agency => (
						<button
							key={agency.id}
							onClick={() => handleUpdate(agency.id)}
							disabled={loading || currentAgencyId === agency.id}
							className={`w-full p-4 rounded-xl border transition-all text-left flex items-center justify-between ${
								currentAgencyId === agency.id
									? "bg-blue-50 border-blue-200"
									: "border-[#dddddd] hover:border-[#222222] bg-white"
							}`}
						>
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 rounded-lg bg-[#f7f7f7] flex items-center justify-center shrink-0">
									{agency.logoUrl ? (
										<img src={agency.logoUrl} alt="" className="h-full w-full object-contain p-1" />
									) : (
										<Building2 size={16} className="text-[#b0b0b0]" />
									)}
								</div>
								<div className="min-w-0">
									<p className="text-sm font-bold text-[#222222] truncate">{agency.name}</p>
									<p className="text-xs text-[#717171] truncate">{agency.email}</p>
								</div>
							</div>
							{currentAgencyId === agency.id && <div className="h-2 w-2 rounded-full bg-blue-500" />}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
