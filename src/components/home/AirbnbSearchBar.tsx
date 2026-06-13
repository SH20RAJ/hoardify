"use client";

import React, { useState } from 'react';
import { Search, MapPin, Calendar, LayoutGrid, X } from 'lucide-react';
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
    <div className="w-full max-w-5xl mx-auto px-2 md:px-6 py-4 md:py-12">
      <div 
        className={`flex flex-col md:flex-row items-stretch md:items-center bg-surface-raised rounded-[1.5rem] md:rounded-[2.5rem] border border-border-subtle p-1.5 md:p-2 transition-all duration-500 ${
          isFocused 
            ? "shadow-premium-xl border-brand/20 -translate-y-1" 
            : "shadow-premium-lg hover:shadow-premium-xl hover:-translate-y-0.5"
        }`}
      >
        {/* Location Section */}
        <div className="w-full flex flex-col items-start px-4 py-2.5 md:py-3 hover:bg-surface-sunken rounded-[1rem] md:rounded-[1.5rem] transition-all group relative cursor-pointer active:scale-[0.98]">
          <label className="text-[8px] md:text-[9px] font-black text-text-tertiary uppercase tracking-[0.2em] mb-0.5 md:mb-1">Where</label>
          <input 
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search high-impact nodes"
            className="text-sm md:text-base text-text-primary bg-transparent border-none outline-none w-full placeholder:text-text-tertiary font-bold"
          />
          {location && (
            <button 
              onClick={() => setLocation("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-border-subtle opacity-0 group-hover:opacity-100 transition-all"
            >
              <X size={14} className="text-text-secondary" />
            </button>
          )}
        </div>
        
        <div className="h-px w-full bg-border-subtle mx-0 md:h-10 md:w-px md:mx-2" />
        
        {/* Category Section */}
        <div className="w-full flex flex-col items-start px-4 py-2.5 md:py-3 hover:bg-surface-sunken rounded-[1rem] md:rounded-[1.5rem] transition-all group relative cursor-pointer active:scale-[0.98]">
          <label className="text-[8px] md:text-[9px] font-black text-text-tertiary uppercase tracking-[0.2em] mb-0.5 md:mb-1">Type</label>
          <div className="relative w-full">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="text-sm md:text-base text-text-primary bg-transparent border-none outline-none w-full font-bold appearance-none cursor-pointer"
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
        
        <div className="h-px w-full bg-border-subtle mx-0 md:h-10 md:w-px md:mx-2" />
        
        {/* Dates Section */}
        <button 
          className="w-full flex flex-col items-start px-4 py-2.5 md:py-3 hover:bg-surface-sunken rounded-[1rem] md:rounded-[1.5rem] transition-all text-left active:scale-[0.98]"
          onClick={() => setIsFocused(true)}
        >
          <span className="text-[8px] md:text-[9px] font-black text-text-tertiary uppercase tracking-[0.2em] mb-0.5 md:mb-1">Timeline</span>
          <span className="text-sm md:text-base text-text-tertiary font-bold">Select Dates</span>
        </button>
        
        {/* Search CTA */}
        <button 
          onClick={handleSearch}
          className="group relative bg-brand px-6 py-3 md:py-4 rounded-[1rem] md:rounded-[1.5rem] text-white font-bold text-sm transition-all mt-2 md:mt-0 md:ml-4 shadow-premium-md hover:shadow-premium-lg active:scale-90 flex items-center justify-center gap-2 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <Search size={18} strokeWidth={3} className="relative z-10" />
          <span className="relative z-10">Search</span>
        </button>
      </div>
    </div>
  );
}
