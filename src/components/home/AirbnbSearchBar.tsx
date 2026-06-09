"use client";

import React, { useState } from 'react';
import { Search, MapPin, Calendar, LayoutGrid, X, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AirbnbSearchBar() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (category) params.set("category", category);
    
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12">
      <div 
        className={`flex items-center bg-white rounded-[2.5rem] border border-[#e5e5e5] p-2 pl-6 transition-all duration-500 ${
          isFocused 
            ? "shadow-premium-xl border-[#082390]/20 -translate-y-1" 
            : "shadow-premium-lg hover:shadow-premium-xl hover:-translate-y-0.5"
        }`}
      >
        {/* Location Section */}
        <div className="flex-[1.5] flex flex-col items-start px-6 py-3 hover:bg-[#fafafa] rounded-[2rem] transition-all group relative cursor-pointer active:scale-[0.98]">
          <label className="text-[9px] font-black text-text-tertiary uppercase tracking-[0.2em] mb-1">Where</label>
          <input 
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search high-impact nodes"
            className="text-base text-[#111111] bg-transparent border-none outline-none w-full placeholder:text-text-tertiary font-bold"
          />
          {location && (
            <button 
              onClick={() => setLocation("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-[#f0f0f0] opacity-0 group-hover:opacity-100 transition-all"
            >
              <X size={14} className="text-text-secondary" />
            </button>
          )}
        </div>
        
        <div className="h-10 w-px bg-[#f0f0f0] mx-2" />
        
        {/* Category Section */}
        <div className="flex-1 flex flex-col items-start px-6 py-3 hover:bg-[#fafafa] rounded-[2rem] transition-all group relative cursor-pointer active:scale-[0.98]">
          <label className="text-[9px] font-black text-text-tertiary uppercase tracking-[0.2em] mb-1">Type</label>
          <div className="relative w-full">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="text-base text-[#111111] bg-transparent border-none outline-none w-full font-bold appearance-none cursor-pointer"
            >
              <option value="">Any Format</option>
              <option value="Unipole">Unipole</option>
              <option value="Billboard">Billboard</option>
              <option value="Gantry">Gantry</option>
              <option value="Digital">Digital</option>
              <option value="Transit">Transit</option>
            </select>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-text-tertiary group-hover:text-brand transition-colors">
              <LayoutGrid size={16} />
            </div>
          </div>
        </div>
        
        <div className="h-10 w-px bg-[#f0f0f0] mx-2" />
        
        {/* Dates Section */}
        <button 
          className="flex-1 flex flex-col items-start px-6 py-3 hover:bg-[#fafafa] rounded-[2rem] transition-all text-left active:scale-[0.98]"
          onClick={() => setIsFocused(true)}
        >
          <span className="text-[9px] font-black text-text-tertiary uppercase tracking-[0.2em] mb-1">Timeline</span>
          <span className="text-base text-text-tertiary font-bold">Select Dates</span>
        </button>
        
        {/* Search CTA */}
        <button 
          onClick={handleSearch}
          className="group relative bg-[#082390] px-8 py-4 rounded-[2rem] text-white font-bold text-sm transition-all ml-4 shadow-premium-md hover:shadow-premium-lg active:scale-90 flex items-center gap-2 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <Search size={18} strokeWidth={3} className="relative z-10" />
          <span className="relative z-10 hidden md:inline">Intelligence Search</span>
        </button>
      </div>
    </div>
  );
}
