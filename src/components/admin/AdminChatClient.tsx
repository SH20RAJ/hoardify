"use client";

import { useState, useRef, useEffect } from "react";
import { sendMessage, getMessages } from "@/actions/messages";
import { Send, Loader2, ArrowLeft, MapPin, User, Mail, Phone, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

interface Message {
	id: number;
	senderRole: string;
	senderName: string;
	content: string;
	createdAt: Date;
}

interface EnquiryData {
	id: number;
	name: string;
	email: string;
	phone: string;
	message: string;
	status: string;
	createdAt: Date;
	hoarding: {
		id: number;
		title: string;
		location: string;
		price: number;
		imageUrl: string;
	} | null;
	messages: Message[];
}

interface Props {
	enquiry: EnquiryData;
	adminName: string;
}

export default function AdminChatClient({ enquiry, adminName }: Props) {
	const [allMessages, setAllMessages] = useState<Message[]>(enquiry.messages);
	const [input, setInput] = useState("");
	const [sending, setSending] = useState(false);
	const [loadingMessages, setLoadingMessages] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [allMessages]);

	const refreshMessages = async () => {
		setLoadingMessages(true);
		try {
			const msgs = await getMessages(enquiry.id);
			setAllMessages(msgs);
		} catch {
			// Fail silently
		} finally {
			setLoadingMessages(false);
		}
	};

	const handleSend = async () => {
		if (!input.trim()) return;
		setSending(true);
		try {
			await sendMessage(enquiry.id, input.trim(), "admin", adminName);
			setInput("");
			await refreshMessages();
			router.refresh();
		} catch {
			alert("Failed to send message");
		} finally {
			setSending(false);
		}
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-180px)]">
			{/* Left Column: Enquiry Details */}
			<div className="lg:col-span-1 space-y-6 overflow-y-auto pr-4">
				<div className="bg-white rounded-2xl border border-[#ebebeb] p-6 shadow-sm">
					<h3 className="text-lg font-bold text-[#222222] mb-6">Lead Details</h3>
					
					<div className="space-y-4">
						<div className="flex items-start gap-3">
							<div className="h-10 w-10 rounded-full bg-[#f7f7f7] flex items-center justify-center shrink-0 border border-[#ebebeb]">
								<User size={18} className="text-[#717171]" />
							</div>
							<div>
								<p className="text-sm font-bold text-[#222222]">{enquiry.name}</p>
								<div className="flex items-center gap-1.5 text-xs text-[#717171] mt-0.5">
									<Mail size={12} /> {enquiry.email}
								</div>
								<div className="flex items-center gap-1.5 text-xs text-[#717171] mt-0.5">
									<Phone size={12} className="text-[#ff385c]" /> {enquiry.phone}
								</div>
							</div>
						</div>

						<div className="pt-4 border-t border-[#f0f0f0]">
							<p className="text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">Original Message</p>
							<div className="bg-[#f7f7f7] rounded-xl p-4 text-sm text-[#222222] italic leading-relaxed">
								&quot;{enquiry.message}&quot;
							</div>
						</div>

						<div className="pt-4 border-t border-[#f0f0f0] flex items-center justify-between">
							<span className="text-xs font-bold text-[#717171] uppercase tracking-wider">Status</span>
							<span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
								enquiry.status === "New" ? "bg-blue-50 text-blue-600" :
								enquiry.status === "Contacted" ? "bg-amber-50 text-amber-600" :
								"bg-green-50 text-green-600"
							}`}>
								{enquiry.status}
							</span>
						</div>
					</div>
				</div>

				{enquiry.hoarding && (
					<div className="bg-white rounded-2xl border border-[#ebebeb] overflow-hidden shadow-sm">
						<div className="relative h-40">
							<Image src={enquiry.hoarding.imageUrl} alt="" fill className="object-cover" unoptimized />
						</div>
						<div className="p-6">
							<h4 className="font-bold text-[#222222] truncate">{enquiry.hoarding.title}</h4>
							<div className="flex items-center gap-1 text-xs text-[#717171] mt-1">
								<MapPin size={12} />
								<span className="truncate">{enquiry.hoarding.location}</span>
							</div>
							<div className="mt-4 flex items-center justify-between">
								<span className="text-xs font-bold text-[#ff385c]">{formatCurrency(enquiry.hoarding.price)}/mo</span>
								<div className="flex items-center gap-1 text-[10px] text-[#b0b0b0]">
									<Calendar size={10} />
									<span>{new Date(enquiry.createdAt).toLocaleDateString()}</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Right Column: Chat Thread */}
			<div className="lg:col-span-2 flex flex-col bg-white rounded-2xl border border-[#ebebeb] shadow-sm overflow-hidden">
				<div className="p-4 border-b border-[#ebebeb] bg-white sticky top-0 z-10 flex items-center gap-4">
					<button onClick={() => router.back()} className="p-2 hover:bg-[#f7f7f7] rounded-full transition-colors">
						<ArrowLeft size={18} />
					</button>
					<div>
						<h3 className="font-bold text-[#222222]">Conversation</h3>
						<p className="text-[10px] text-[#717171] font-medium uppercase tracking-wider">Chatting with {enquiry.name.split(' ')[0]}</p>
					</div>
				</div>

				<div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#fafafa]">
					{/* First message from lead */}
					<div className="flex justify-start">
						<div className="max-w-[80%] px-4 py-3 rounded-2xl bg-white border border-[#ebebeb] rounded-bl-md shadow-sm">
							<p className="text-xs font-bold text-[#ff385c] mb-1">{enquiry.name}</p>
							<p className="text-sm text-[#222222] leading-relaxed">{enquiry.message}</p>
							<p className="text-[10px] text-[#b0b0b0] mt-2">
								{new Date(enquiry.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
							</p>
						</div>
					</div>

					{allMessages.map((msg) => (
						<div key={msg.id} className={`flex ${msg.senderRole === "admin" ? "justify-end" : "justify-start"}`}>
							<div className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
								msg.senderRole === "admin"
									? "bg-[#222222] text-white rounded-br-md"
									: "bg-white text-[#222222] rounded-bl-md border border-[#ebebeb]"
							}`}>
								{msg.senderRole === "admin" && (
									<div className="flex items-center gap-1.5 mb-1">
										<span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500 text-white">Admin</span>
										<span className="text-[10px] font-bold text-white/80">{msg.senderName}</span>
									</div>
								)}
								{msg.senderRole === "customer" && (
									<p className="text-xs font-bold text-[#ff385c] mb-1">{msg.senderName}</p>
								)}
								<p className="text-sm leading-relaxed">{msg.content}</p>
								<p className={`text-[10px] mt-2 ${msg.senderRole === "admin" ? "text-white/50" : "text-[#b0b0b0]"}`}>
									{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
								</p>
							</div>
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>

				<div className="p-4 border-t border-[#ebebeb] bg-white">
					<div className="flex gap-3">
						<input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
							placeholder="Type your official response..."
							className="flex-1 h-12 px-6 rounded-xl border border-[#dddddd] shadow-inner focus:border-[#222222] outline-none text-sm transition-all"
						/>
						<button
							onClick={handleSend}
							disabled={sending || !input.trim()}
							className="h-12 px-6 rounded-xl bg-[#222222] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-40"
						>
							{sending ? <Loader2 size={18} className="animate-spin" /> : "Send"}
							<Send size={16} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
