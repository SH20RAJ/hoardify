"use client";

import React, { useState } from 'react';
import { Search, MapPin, Calendar, LayoutGrid, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AirbnbSearchBar() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (category) params.set("category", category);
    
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 p-2 pl-4">
        {/* Location */}
        <div className="flex-1 flex flex-col items-start px-4 py-2 hover:bg-gray-100 rounded-full transition-colors group relative">
          <label className="text-[10px] font-black text-gray-800 uppercase tracking-wider">Location</label>
          <input 
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where to advertise?"
            className="text-sm text-gray-500 bg-transparent border-none outline-none w-full placeholder:text-gray-400 font-medium"
          />
          {location && (
            <button 
              onClick={() => setLocation("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} className="text-gray-500" />
            </button>
          )}
        </div>
        
        <div className="h-8 w-px bg-gray-200" />
        
        {/* Dates - Simplified for now as it's a display element for the search bar */}
        <button className="flex-1 flex flex-col items-start px-6 py-2 hover:bg-gray-100 rounded-full transition-colors text-left">
          <span className="text-[10px] font-black text-gray-800 uppercase tracking-wider">Dates</span>
          <span className="text-sm text-gray-500 font-medium">Select dates</span>
        </button>
        
        <div className="h-8 w-px bg-gray-200" />
        
        {/* Category Selection */}
        <div className="flex-1 flex flex-col items-start px-4 py-2 hover:bg-gray-100 rounded-full transition-colors group relative">
          <label className="text-[10px] font-black text-gray-800 uppercase tracking-wider">Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-sm text-gray-500 bg-transparent border-none outline-none w-full font-medium appearance-none cursor-pointer"
          >
            <option value="">Any Type</option>
            <option value="Unipole">Unipole</option>
            <option value="Billboard">Billboard</option>
            <option value="Gantry">Gantry</option>
            <option value="Digital">Digital</option>
            <option value="Transit">Transit</option>
          </select>
        </div>
        
        {/* Search Button */}
        <button 
          onClick={handleSearch}
          className="bg-[#082390] p-4 rounded-full text-white hover:bg-[#1d4ed8] transition-colors ml-2 shadow-sm active:scale-95"
        >
          <Search size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
