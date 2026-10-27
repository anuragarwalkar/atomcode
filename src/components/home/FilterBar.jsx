import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '../ui/Button';

export function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedStatus,
  setSelectedStatus,
  selectedTag,
  setSelectedTag,
  availableTags = [],
}) {
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const statuses = ['All', 'Solved', 'Unsolved'];

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems by title, keywords..."
            className="w-full pl-9 pr-8 py-2 rounded-xl text-sm bg-white dark:bg-[#0d121f] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdowns / Filter buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Difficulty Filter */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-[#0d121f] p-1 border border-slate-200 dark:border-slate-800 text-xs">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-[#0d121f] p-1 border border-slate-200 dark:border-slate-800 text-xs">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedStatus === status
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Tag Pills */}
      {availableTags.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Tags:
          </span>
          <button
            onClick={() => setSelectedTag('All')}
            className={`px-2.5 py-1 rounded-full whitespace-nowrap border transition-all cursor-pointer ${
              selectedTag === 'All'
                ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 font-semibold'
                : 'bg-white dark:bg-[#0d121f] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            All
          </button>
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? 'All' : tag)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap border transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 font-semibold shadow-sm'
                  : 'bg-white dark:bg-[#0d121f] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
