import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Atom, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';

export function Navbar({ solvedCount = 0, totalCount = 20 }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isProblems = location.pathname === '/' || location.pathname.startsWith('/problem');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#090d16]/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center p-0.5 bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 shadow-md shadow-cyan-500/10 group-hover:border-cyan-400 group-hover:shadow-cyan-500/25 transition-all">
              <img
                src="/logo.png"
                alt="AtomCode Logo"
                className="w-full h-full object-contain rounded-md filter drop-shadow"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                AtomCode
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                JS Live
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                isProblems
                  ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Problems
            </Link>
            <span className="px-3 py-1.5 text-sm font-medium text-slate-400 dark:text-slate-500 cursor-not-allowed">
              Contest
            </span>
            <span className="px-3 py-1.5 text-sm font-medium text-slate-400 dark:text-slate-500 cursor-not-allowed">
              Discuss
            </span>
          </nav>
        </div>

        {/* Right: Solved counter + Theme toggle + Actions */}
        <div className="flex items-center gap-3">
          {/* Solved Progress Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">Solved:</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {solvedCount} / {totalCount}
            </span>
          </div>

          {/* Light / Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="iconSm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
            )}
          </Button>

          {/* User Profile avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            JS
          </div>
        </div>
      </div>
    </header>
  );
}
