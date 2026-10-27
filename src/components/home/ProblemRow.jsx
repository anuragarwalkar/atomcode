import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, Bug, ArrowRight } from 'lucide-react';
import { DifficultyBadge } from './DifficultyBadge';

export function ProblemRow({ problem, isSolved, index }) {
  return (
    <tr className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
      {/* Solved Status */}
      <td className="py-3.5 px-4 text-center w-12">
        {isSolved ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-500 inline-block drop-shadow-sm" />
        ) : (
          <Circle className="w-4 h-4 text-slate-300 dark:text-slate-700 inline-block" />
        )}
      </td>

      {/* Problem Number */}
      <td className="py-3.5 px-3 text-sm text-slate-400 dark:text-slate-500 font-mono w-14">
        {problem.id}.
      </td>

      {/* Problem Title & Tags */}
      <td className="py-3.5 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
          <Link
            to={`/problem/${problem.id}`}
            className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            {problem.title}
          </Link>
          <div className="flex items-center gap-1 flex-wrap">
            {problem.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </td>

      {/* Acceptance */}
      <td className="py-3.5 px-4 text-xs font-mono text-slate-500 dark:text-slate-400 hidden md:table-cell">
        {problem.acceptance}
      </td>

      {/* Difficulty */}
      <td className="py-3.5 px-4">
        <DifficultyBadge difficulty={problem.difficulty} />
      </td>

      {/* Quick Solve / Debug Action */}
      <td className="py-3.5 px-4 text-right">
        <Link
          to={`/problem/${problem.id}`}
          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 hover:bg-cyan-500/10 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-cyan-400 dark:hover:bg-cyan-500/10 transition-all opacity-80 group-hover:opacity-100"
        >
          <span>Solve</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </td>
    </tr>
  );
}
