import { getUsers } from "@/actions/admin";
import { User, Shield, ShieldCheck, Mail, Calendar, Search } from "lucide-react";
import Image from "next/image";

export default async function AdminUsersPage() {
	const users = await getUsers();

	return (
		<div className="space-y-8 animate-in fade-in duration-700">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h2 className="text-3xl font-black tracking-tighter text-text-primary">User Directory</h2>
					<p className="text-xs font-bold uppercase tracking-widest text-text-tertiary mt-1">Manage platform access and roles</p>
				</div>
				
				<div className="relative w-full md:w-80">
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
					<input 
						type="text" 
						placeholder="Search by name or email..." 
						className="w-full h-12 bg-white rounded-2xl pl-12 pr-4 text-sm font-medium border border-border-subtle focus:border-brand outline-none shadow-sm transition-all"
					/>
				</div>
			</div>

			<div className="bg-white rounded-[2.5rem] border border-border-subtle shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="bg-surface-sunken/50">
								<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Member</th>
								<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Role</th>
								<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Joined</th>
								<th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary text-right">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border-subtle">
							{users.map((user) => (
								<tr key={user.id} className="hover:bg-surface-sunken transition-colors group">
									<td className="px-8 py-6">
										<div className="flex items-center gap-3">
											<div className="h-10 w-10 rounded-full bg-surface-sunken flex items-center justify-center overflow-hidden border border-border-subtle relative">
												{user.imageUrl ? (
													<Image src={user.imageUrl} alt="" fill className="object-cover" unoptimized />
												) : (
													<User size={18} className="text-text-tertiary" />
												)}
											</div>
											<div className="flex flex-col">
												<span className="font-bold text-sm text-text-primary capitalize">{user.name || "Anonymous User"}</span>
												<div className="flex items-center gap-1.5 text-[10px] text-text-tertiary">
													<Mail size={10} />
													{user.email}
												</div>
											</div>
										</div>
									</td>
									<td className="px-8 py-6">
										<div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
											user.role === 'Admin' 
												? 'bg-purple-50 text-purple-600 border-purple-100' 
												: user.role === 'Owner'
												? 'bg-blue-50 text-blue-600 border-blue-100'
												: 'bg-zinc-50 text-zinc-600 border-zinc-100'
										}`}>
											{user.role === 'Admin' ? <ShieldCheck size={12} /> : user.role === 'Owner' ? <Shield size={12} /> : null}
											{user.role}
										</div>
									</td>
									<td className="px-8 py-6 text-xs font-bold text-text-secondary">
										<div className="flex items-center gap-2">
											<Calendar size={14} className="text-text-tertiary" />
											{new Date(user.createdAt).toLocaleDateString()}
										</div>
									</td>
									<td className="px-8 py-6 text-right">
										<button className="text-[10px] font-black uppercase tracking-widest text-brand hover:underline">Manage Role</button>
									</td>
								</tr>
							))}
							{users.length === 0 && (
								<tr>
									<td colSpan={4} className="px-8 py-20 text-center">
										<div className="flex flex-col items-center gap-3 opacity-30">
											<User size={32} />
											<p className="text-sm font-bold uppercase tracking-widest">No users found</p>
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
