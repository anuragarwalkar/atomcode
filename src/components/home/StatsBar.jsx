import React from 'react';
import { Sparkles, Trophy, Zap, Terminal } from 'lucide-react';

export function StatsBar({ problems = [], solvedIds = [] }) {
  const total = problems.length;
  const solvedCount = solvedIds.length;

  const easyTotal = problems.filter(p => p.difficulty === 'Easy').length;
  const easySolved = problems.filter(p => p.difficulty === 'Easy' && solvedIds.includes(p.id)).length;

  const mediumTotal = problems.filter(p => p.difficulty === 'Medium').length;
  const mediumSolved = problems.filter(p => p.difficulty === 'Medium' && solvedIds.includes(p.id)).length;

  const hardTotal = problems.filter(p => p.difficulty === 'Hard').length;
  const hardSolved = problems.filter(p => p.difficulty === 'Hard' && solvedIds.includes(p.id)).length;

  const pct = total > 0 ? Math.round((solvedCount / total) * 100) : 0;
  const circumference = 2 * Math.PI * 34; // radius = 34
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Main Overall Progress Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0d121f] border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center gap-5">
        <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 80 80">
            {/* Background track */}
            <circle
              cx="40"
              cy="40"
              r="34"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-slate-200 dark:text-slate-800"
            />
            {/* Animated progress ring */}
            <circle
              cx="40"
              cy="40"
              r="34"
              stroke="currentColor"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="text-cyan-500 transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-none">
              {solvedCount}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">/{total}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <Trophy className="w-3.5 h-3.5" />
            <span>Solved Progress</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
            {pct}% Completed
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {solvedCount === total ? '🎉 Mastered all problems!' : 'Keep coding and debugging!'}
          </p>
        </div>
      </div>

      {/* Easy Breakdown */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0d121f] border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Easy
          </span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            {easySolved}/{easyTotal}
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {easySolved}
            <span className="text-sm font-normal text-slate-400 ml-1">solved</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${easyTotal ? (easySolved / easyTotal) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Medium Breakdown */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0d121f] border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Medium
          </span>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
            {mediumSolved}/{mediumTotal}
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {mediumSolved}
            <span className="text-sm font-normal text-slate-400 ml-1">solved</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${mediumTotal ? (mediumSolved / mediumTotal) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Live Debugger Spotlight Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-sky-500/5 to-blue-500/10 border border-cyan-500/30 shadow-sm flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-2 right-2 p-2 opacity-15 group-hover:opacity-30 transition-opacity">
          <Terminal className="w-14 h-14 text-cyan-400" />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            JS-Interpreter
          </span>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
            Live Visual Stepping
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Click any problem to pause, step over/into, set breakpoints, and watch variables update live!
          </p>
        </div>
        <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
          <span>AST Debugger Enabled</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping ml-1" />
        </div>
      </div>
    </div>
  );
}
