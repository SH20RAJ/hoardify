"use client";

import { useState, useRef, useEffect } from "react";
import { sendMessage, getMessages } from "@/actions/messages";
import { Send, Loader2, ArrowLeft, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

interface ConversationData {
	id: number;
	name: string;
	email: string;
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
	messages: Array<{
		id: number;
		senderRole: string;
		senderName: string;
		content: string;
		createdAt: Date;
	}>;
}

interface Props {
	conversations: ConversationData[];
	userName: string;
	userEmail: string;
}

export default function InboxClient({ conversations, userName, userEmail }: Props) {
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [allMessages, setAllMessages] = useState<Array<{
		id: number;
		senderRole: string;
		senderName: string;
		content: string;
		createdAt: Date;
	}>>([]);
	const [input, setInput] = useState("");
	const [sending, setSending] = useState(false);
	const [loadingMessages, setLoadingMessages] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const selected = conversations.find(c => c.id === selectedId);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [allMessages]);

	const openConversation = async (id: number) => {
		setSelectedId(id);
		setLoadingMessages(true);
		try {
			const msgs = await getMessages(id);
			setAllMessages(msgs);
		} catch {
			setAllMessages([]);
		} finally {
			setLoadingMessages(false);
		}
	};

	const handleSend = async () => {
		if (!input.trim() || !selectedId) return;
		setSending(true);
		try {
			await sendMessage(selectedId, input.trim(), "customer", userName || userEmail);
			setInput("");
			// Re-fetch messages
			const msgs = await getMessages(selectedId);
			setAllMessages(msgs);
			router.refresh();
		} catch {
			alert("Failed to send message");
		} finally {
			setSending(false);
		}
	};

	// Mobile: if a conversation is selected, show it full screen
	if (selectedId && selected) {
		return (
			<div className="flex flex-col h-[calc(100vh-160px)]">
				{/* Header */}
				<div className="flex items-center gap-3 pb-4 border-b border-[#ebebeb]">
					<button onClick={() => setSelectedId(null)} className="p-2 hover:bg-[#f7f7f7] rounded-full md:hidden">
						<ArrowLeft size={20} />
					</button>
					<div className="flex-1 min-w-0">
						<h3 className="font-semibold text-[#222222] truncate">{selected.hoarding?.title || "Direct Enquiry"}</h3>
						<div className="flex items-center gap-1 text-xs text-[#717171]">
							<MapPin size={10} />
							<span>{selected.hoarding?.location}</span>
							{selected.hoarding && <span className="ml-2 font-bold text-[#ff385c]">{formatCurrency(selected.hoarding.price)}/mo</span>}
						</div>
					</div>
					<span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
						selected.status === "New" ? "bg-blue-50 text-blue-600" :
						selected.status === "Contacted" ? "bg-amber-50 text-amber-600" :
						"bg-green-50 text-green-600"
					}`}>
						{selected.status}
					</span>
				</div>

				{/* Messages */}
				<div className="flex-1 overflow-y-auto py-4 space-y-3">
					{/* Original enquiry as first message */}
					<div className="flex justify-end">
						<div className="max-w-[75%] bg-[#222222] text-white px-4 py-2.5 rounded-2xl rounded-br-md">
							<p className="text-sm">{selected.message}</p>
							<p className="text-[10px] text-white/50 mt-1">Original enquiry</p>
						</div>
					</div>

					{loadingMessages ? (
						<div className="flex justify-center py-8">
							<Loader2 size={20} className="animate-spin text-[#b0b0b0]" />
						</div>
					) : (
						allMessages.map((msg) => (
							<div key={msg.id} className={`flex ${msg.senderRole === "customer" ? "justify-end" : "justify-start"}`}>
								<div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
									msg.senderRole === "customer"
										? "bg-[#222222] text-white rounded-br-md"
										: "bg-[#f7f7f7] text-[#222222] rounded-bl-md border border-[#ebebeb]"
								}`}>
									{msg.senderRole === "admin" && (
										<div className="flex items-center gap-1.5 mb-1">
											<span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-50 text-purple-600">Admin</span>
											<span className="text-[10px] font-bold text-[#222222]">{msg.senderName}</span>
										</div>
									)}
									<p className="text-sm">{msg.content}</p>
									<p className={`text-[10px] mt-1 ${msg.senderRole === "customer" ? "text-white/50" : "text-[#b0b0b0]"}`}>
										{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
									</p>
								</div>
							</div>
						))
					)}
					<div ref={messagesEndRef} />
				</div>

				{/* Input */}
				<div className="border-t border-[#ebebeb] pt-3">
					<div className="flex gap-2">
						<input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
							placeholder="Type a message..."
							className="flex-1 h-11 px-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm transition-colors"
						/>
						<button
							onClick={handleSend}
							disabled={sending || !input.trim()}
							className="h-11 w-11 rounded-xl bg-[#222222] text-white flex items-center justify-center hover:bg-black transition-colors disabled:opacity-40"
						>
							{sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
						</button>
					</div>
				</div>
			</div>
		);
	}

	// Conversation list
	if (conversations.length === 0) {
		return (
			<div className="py-20 flex flex-col items-center justify-center text-center">
				<h2 className="text-xl font-semibold text-[#222222] mb-2">No conversations yet</h2>
				<p className="text-base text-[#717171] max-w-[320px]">
					When you inquire about a hoarding, your conversations with the team will appear here.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			{conversations.map((conv) => {
				const lastMsg = conv.messages[0];
				return (
					<button
						key={conv.id}
						onClick={() => openConversation(conv.id)}
						className="w-full flex items-center gap-4 p-4 rounded-2xl border border-[#ebebeb] hover:bg-[#fafafa] hover:border-[#dddddd] transition-all text-left"
					>
						{/* Hoarding thumbnail */}
						<div className="w-14 h-14 rounded-xl bg-[#f7f7f7] overflow-hidden relative shrink-0 border border-[#ebebeb]">
							{conv.hoarding && (
								<img src={conv.hoarding.imageUrl} alt="" className="w-full h-full object-cover" />
							)}
						</div>
						<div className="flex-1 min-w-0">
							<div className="flex items-center justify-between gap-2">
								<h4 className="font-semibold text-sm text-[#222222] truncate">{conv.hoarding?.title || "Direct Enquiry"}</h4>
								<span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${
									conv.status === "New" ? "bg-blue-50 text-blue-600" :
									conv.status === "Contacted" ? "bg-amber-50 text-amber-600" :
									"bg-green-50 text-green-600"
								}`}>
									{conv.status}
								</span>
							</div>
							<p className="text-xs text-[#717171] truncate mt-0.5">
								{lastMsg ? lastMsg.content : conv.message}
							</p>
							<p className="text-[10px] text-[#b0b0b0] mt-1">
								{new Date(lastMsg?.createdAt || conv.createdAt).toLocaleDateString()}
							</p>
						</div>
					</button>
				);
			})}
		</div>
	);
}
