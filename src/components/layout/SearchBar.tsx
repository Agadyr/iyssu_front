"use client";

import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь может быть логика поиска
    console.log("Searching for:", searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 ml-2">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск"
          className="w-full h-12 pl-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white rounded-r-md transition-colors"
        >
          <Search className="w-5 h-5" />
          <span className="ml-2 font-medium">Найти</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar; 