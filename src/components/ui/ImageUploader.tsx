"use client";

import { useState, useRef } from "react";
import { Upload, Link as LinkIcon, Loader2, X } from "lucide-react";

interface ImageUploaderProps {
	urls: string[];
	onChange: (urls: string[]) => void;
}

export function ImageUploader({ urls, onChange }: ImageUploaderProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [urlInput, setUrlInput] = useState("");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		setIsUploading(true);
		try {
			const newUrls = [...urls];
			for (let i = 0; i < files.length; i++) {
				const formData = new FormData();
				formData.append("image", files[i]);
				
				const res = await fetch(`https://api.imgbb.com/1/upload?key=c0c864f0d9aadb0f7de371582b301397`, {
					method: "POST",
					body: formData,
				});
				
				const data = (await res.json()) as { success: boolean; data: { url: string } };
				if (data.success) {
					newUrls.push(data.data.url);
				}
			}
			onChange(newUrls);
		} catch (err) {
			console.error(err);
			alert("Error uploading image(s).");
		} finally {
			setIsUploading(false);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		}
	};

	const handleAddUrl = () => {
		if (urlInput.trim()) {
			onChange([...urls, urlInput.trim()]);
			setUrlInput("");
		}
	};

	const handleRemove = (index: number) => {
		const newUrls = [...urls];
		newUrls.splice(index, 1);
		onChange(newUrls);
	};

	return (
		<div className="space-y-4">
			<div className="flex flex-col md:flex-row gap-4">
				<div className="flex-1 relative">
					<input
						type="file"
						accept="image/*"
						multiple
						onChange={handleUpload}
						ref={fileInputRef}
						className="hidden"
						id="image-upload-multi"
					/>
					<label
						htmlFor="image-upload-multi"
						className={`w-full h-12 px-4 rounded-xl border border-dashed border-[#dddddd] hover:border-[#222222] hover:bg-[#f7f7f7] flex items-center justify-center gap-2 cursor-pointer text-sm font-medium transition-colors ${isUploading ? "opacity-50 cursor-not-allowed" : "text-[#222222]"}`}
					>
						{isUploading ? (
							<><Loader2 size={16} className="animate-spin" /> <span>Uploading...</span></>
						) : (
							<><Upload size={16} /> <span>Upload Image(s)</span></>
						)}
					</label>
				</div>
				<div className="flex-1 flex gap-2">
					<div className="relative flex-1">
						<LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0b0b0]" size={16} />
						<input
							type="text"
							value={urlInput}
							onChange={(e) => setUrlInput(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddUrl())}
							placeholder="Or paste image URL"
							className="w-full h-12 pl-10 pr-4 rounded-xl border border-[#dddddd] focus:border-[#222222] outline-none text-sm font-medium transition-colors"
						/>
					</div>
					<button
						type="button"
						onClick={handleAddUrl}
						disabled={!urlInput.trim()}
						className="h-12 px-4 bg-[#f7f7f7] text-[#222222] rounded-xl text-sm font-bold border border-[#dddddd] hover:bg-[#ebebeb] disabled:opacity-50"
					>
						Add
					</button>
				</div>
			</div>

			{urls.length > 0 && (
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
					{urls.map((url, i) => (
						<div key={i} className="relative group aspect-video rounded-xl overflow-hidden border border-[#dddddd] bg-[#f7f7f7]">
							<img src={url} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
							{i === 0 && (
								<div className="absolute top-2 left-2 bg-[#082390] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
									Main Cover
								</div>
							)}
							<button
								type="button"
								onClick={() => handleRemove(i)}
								className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
							>
								<X size={14} />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
