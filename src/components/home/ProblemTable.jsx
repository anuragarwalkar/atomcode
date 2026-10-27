import React from 'react';
import { ProblemRow } from './ProblemRow';
import { Code2 } from 'lucide-react';

export function ProblemTable({ problems = [], solvedIds = [] }) {
  if (problems.length === 0) {
    return (
      <div className="py-16 text-center rounded-2xl bg-white dark:bg-[#0d121f] border border-slate-200 dark:border-slate-800">
        <Code2 className="w-10 h-10 mx-auto text-slate-400 mb-2 opacity-50" />
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          No problems match your filters
        </h4>
        <p className="text-xs text-slate-400 mt-1">
          Try clearing your search query or choosing another difficulty level.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white dark:bg-[#0d121f] border border-slate-200 dark:border-slate-800/80 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-50/50 dark:bg-slate-900/40">
              <th className="py-3 px-4 text-center w-12">Status</th>
              <th className="py-3 px-3 w-14">#</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4 hidden md:table-cell">Acceptance</th>
              <th className="py-3 px-4">Difficulty</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <ProblemRow
                key={problem.id}
                problem={problem}
                index={index}
                isSolved={solvedIds.includes(problem.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
