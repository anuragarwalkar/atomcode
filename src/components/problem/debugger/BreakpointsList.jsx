import React from 'react';
import { CircleDot, X, PlusCircle } from 'lucide-react';

export function BreakpointsList({ breakpoints = new Set(), onToggleBreakpoint, onClearAll }) {
  const list = Array.from(breakpoints).sort((a, b) => a - b);

  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
        <div className="flex items-center gap-1.5">
          <CircleDot className="w-3.5 h-3.5 text-rose-500" />
          <span>Breakpoints ({list.length})</span>
        </div>
        {list.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-[11px] text-slate-400 hover:text-rose-500 transition-colors font-medium cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {list.length === 0 ? (
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
          <p>No breakpoints set.</p>
          <p className="mt-1 text-[11px] text-slate-500">
            💡 Click on any line number in the Monaco editor gutter to add a breakpoint!
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {list.map((line) => (
            <div
              key={line}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800/80 text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
                <span className="text-slate-800 dark:text-slate-200 font-medium">Line {line}</span>
              </div>
              <button
                onClick={() => onToggleBreakpoint(line)}
                title="Remove breakpoint"
                className="text-slate-400 hover:text-rose-500 p-0.5 rounded transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
