import React, { useState, useEffect, useMemo } from 'react';
import { PROBLEMS } from '../data/problems';
import { Navbar } from '../components/layout/Navbar';
import { StatsBar } from '../components/home/StatsBar';
import { FilterBar } from '../components/home/FilterBar';
import { ProblemTable } from '../components/home/ProblemTable';
import { Sparkles, Terminal, Code2 } from 'lucide-react';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [solvedIds, setSolvedIds] = useState([]);

  // Load solved problems from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('atomcode-solved');
      if (saved) {
        setSolvedIds(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not read solved state from localStorage', e);
    }
  }, []);

  // Compute all unique tags from problems
  const availableTags = useMemo(() => {
    const set = new Set();
    PROBLEMS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  // Filter problems based on search, difficulty, status, and tag
  const filteredProblems = useMemo(() => {
    return PROBLEMS.filter((problem) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = problem.title.toLowerCase().includes(query);
        const matchesTag = problem.tags.some((t) => t.toLowerCase().includes(query));
        const matchesId = String(problem.id) === query;
        if (!matchesTitle && !matchesTag && !matchesId) return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'All' && problem.difficulty !== selectedDifficulty) {
        return false;
      }

      // Status filter
      const isSolved = solvedIds.includes(problem.id);
      if (selectedStatus === 'Solved' && !isSolved) return false;
      if (selectedStatus === 'Unsolved' && isSolved) return false;

      // Tag filter
      if (selectedTag !== 'All' && !problem.tags.includes(selectedTag)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedDifficulty, selectedStatus, selectedTag, solvedIds]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070a12] transition-colors">
      <Navbar solvedCount={solvedIds.length} totalCount={PROBLEMS.length} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Header Hero Banner */}
        <div className="relative mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900/40 to-blue-950/40 border border-cyan-500/20 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive JavaScript Algorithm Practice</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Code, Run &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">Step-by-Step Debug</span>
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Sharpen your JavaScript algorithmic intuition with 20 essential problems, Monaco Editor, and the in-browser live JS-Interpreter debugger.
            </p>
          </div>
        </div>

        {/* Stats Dashboard */}
        <StatsBar problems={PROBLEMS} solvedIds={solvedIds} />

        {/* Filter Controls */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          availableTags={availableTags}
        />

        {/* Problem List Table */}
        <ProblemTable problems={filteredProblems} solvedIds={solvedIds} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-6 text-center text-xs text-slate-500 dark:text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="AtomCode" className="w-4 h-4 object-contain" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">AtomCode</span>
            <span>— JavaScript Algorithmic Learning &amp; Live Debugger</span>
          </div>
          <span>Powered by React, Tailwind CSS, Monaco Editor &amp; Neil Fraser's JS-Interpreter</span>
        </div>
      </footer>
    </div>
  );
}
