// src/components/events/SearchFilter.tsx
import React from "react";
import { Search, Calendar, X } from "lucide-react";

interface SearchFilterProps {
  searchTerm: string;
  filterBy: string;
  setSearchTerm: (term: string) => void;
  setFilterBy: (filter: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  filterBy,
  setSearchTerm,
  setFilterBy,
}) => {
  const filterOptions = [
    { value: "", label: "All Events" },
    { value: "today", label: "Today" },
    { value: "current-week", label: "Current Week" },
    { value: "last-week", label: "Last Week" },
    { value: "current-month", label: "Current Month" },
    { value: "last-month", label: "Last Month" },
  ];

  const clearFilters = () => {
    setSearchTerm("");
    setFilterBy("");
  };

  return (
    <div className="glass rounded-2xl p-6 mb-8 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm border border-white/20 dark:border-neutral-700/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Search Input */}
        <div>
          <label
            htmlFor="search"
            className="form-label flex items-center text-neutral-700 dark:text-neutral-300 mb-2"
          >
            <Search className="w-5 h-5 mr-2" />
            Search Events
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              className="form-input w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 pl-10"
              placeholder="Search by event title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
          </div>
        </div>

        {/* Filter Dropdown */}
        <div>
          <label
            htmlFor="filter"
            className="form-label flex items-center text-neutral-700 dark:text-neutral-300 mb-2"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Filter By Date
          </label>
          <select
            id="filter"
            className="form-input w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-neutral-700 dark:text-neutral-300"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      {(searchTerm || filterBy) && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
          >
            <X className="w-4 h-4 mr-1" />
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
