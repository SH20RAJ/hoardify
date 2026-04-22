import { getUsers } from "@/actions/admin";
import { User, Shield, ShieldCheck, Mail, Calendar, Search } from "lucide-react";
import Image from "next/image";
import { ManageRoleButton } from "@/components/admin/UserActions";

export default async function AdminUsersPage() {
	const users = await getUsers();

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold text-[#222222]">User Directory</h2>
					<p className="text-sm text-[#717171] mt-1">Manage platform access and roles</p>
				</div>
				
				<div className="relative w-full md:w-80">
					<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0b0b0]" size={16} />
					<input 
						type="text" 
						placeholder="Search by name or email..." 
						className="w-full h-11 bg-[#f7f7f7] rounded-xl pl-10 pr-4 text-sm border border-[#ebebeb] focus:border-[#222222] outline-none transition-colors"
					/>
				</div>
			</div>

			<div className="bg-white rounded-2xl border border-[#ebebeb] shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="bg-[#f7f7f7]">
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Member</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Role</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171]">Joined</th>
								<th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#717171] text-right">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-[#f0f0f0]">
							{users.map((user) => (
								<tr key={user.id} className="hover:bg-[#fafafa] transition-colors group">
									<td className="px-6 py-5">
										<div className="flex items-center gap-3">
											<div className="h-10 w-10 rounded-full bg-[#f7f7f7] flex items-center justify-center overflow-hidden border border-[#ebebeb] relative shrink-0">
												{user.imageUrl ? (
													<Image src={user.imageUrl} alt="" fill className="object-cover" unoptimized />
												) : (
													<User size={16} className="text-[#b0b0b0]" />
												)}
											</div>
											<div className="flex flex-col min-w-0">
												<span className="font-semibold text-sm text-[#222222] capitalize truncate">{user.name || "Anonymous User"}</span>
												<div className="flex items-center gap-1.5 text-[10px] text-[#717171]">
													<Mail size={10} />
													<span className="truncate">{user.email}</span>
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-5">
										<div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
											user.role === 'Admin' 
												? 'bg-purple-50 text-purple-600' 
												: user.role === 'Owner'
												? 'bg-blue-50 text-blue-600'
												: 'bg-zinc-50 text-zinc-600'
										}`}>
											{user.role === 'Admin' ? <ShieldCheck size={12} /> : user.role === 'Owner' ? <Shield size={12} /> : null}
											{user.role}
										</div>
									</td>
									<td className="px-6 py-5 text-xs font-medium text-[#717171]">
										<div className="flex items-center gap-2">
											<Calendar size={14} className="text-[#b0b0b0]" />
											{new Date(user.createdAt).toLocaleDateString()}
										</div>
									</td>
									<td className="px-6 py-5 text-right">
										<ManageRoleButton userId={user.id} currentRole={user.role} />
									</td>
								</tr>
							))}
							{users.length === 0 && (
								<tr>
									<td colSpan={4} className="px-6 py-20 text-center">
										<div className="flex flex-col items-center gap-3 text-[#b0b0b0]">
											<User size={28} />
											<p className="text-sm font-medium">No users found</p>
										</div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
