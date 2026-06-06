import React from 'react';
import { Search } from 'lucide-react';

export default function AirbnbSearchBar() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 p-2">
        {/* Location */}
        <button className="flex-1 flex flex-col items-start px-6 py-2 hover:bg-gray-100 rounded-full transition-colors text-left">
          <span className="text-xs font-bold text-gray-800">Location</span>
          <span className="text-sm text-gray-500">Where to advertise?</span>
        </button>
        
        <div className="h-8 w-px bg-gray-200" />
        
        {/* Dates */}
        <button className="flex-1 flex flex-col items-start px-6 py-2 hover:bg-gray-100 rounded-full transition-colors text-left">
          <span className="text-xs font-bold text-gray-800">Dates</span>
          <span className="text-sm text-gray-500">Select dates</span>
        </button>
        
        <div className="h-8 w-px bg-gray-200" />
        
        {/* Category */}
        <button className="flex-1 flex flex-col items-start px-6 py-2 hover:bg-gray-100 rounded-full transition-colors text-left">
          <span className="text-xs font-bold text-gray-800">Category</span>
          <span className="text-sm text-gray-500">Type</span>
        </button>
        
        {/* Search Button */}
        <button className="bg-[#ff385c] p-4 rounded-full text-white hover:bg-[#e00b41] transition-colors ml-2">
          <Search size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
