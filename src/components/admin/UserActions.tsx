"use client";

import { useState } from "react";
import { updateUserRole } from "@/actions/admin";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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
				className="text-[10px] font-black uppercase tracking-widest text-[#ff385c] hover:underline"
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
